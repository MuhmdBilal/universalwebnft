const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const moment        = require("moment");
const {ARTICLE_IMAGE_PATH} = require("../../../../config/index");
var getSlug 	   		  = require('speakingurl');
const UploadImages 		  = require('../../../../scripts/uploadImages');
const fs                  = require('fs');

const TABLE_NAME = "article";

class Article extends DataSource {

    initialize(config){
        this.config = config;
    }

	GetArticle(articleID){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT articleID, photo, title, niceTitle, active, perex, text, oldUrl, metaTitle, metaDescription, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE articleID = ? AND deleted = 0 ";
            
            con.query(query, [articleID], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
			
		});

    }

	GetPreviousArticle(priority){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT articleID, photo, title, niceTitle, active, perex, text, oldUrl, metaTitle, metaDescription, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE priority < ? AND deleted = 0 " + 
			"ORDER by priority DESC LIMIT 1";
            
            con.query(query, [priority], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
		});
    }

	GetNextArticle(priority){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT articleID, photo, title, niceTitle, active, perex, text, oldUrl, metaTitle, metaDescription, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE priority > ? AND deleted = 0 " + 
			"ORDER by priority LIMIT 1";
            
            con.query(query, [priority], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
		});
    }

	GetArticleByUrl(url){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT articleID, photo, title, niceTitle, active, perex, text, oldUrl, metaTitle, metaDescription, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE oldUrl = ? AND deleted = 0 ";
            
            con.query(query, [url], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
			
		});

    }

    GetAllArticles(limit, offset, searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql += " AND active = 1";

            let query = 
            "SELECT articleID, photo, title, niceTitle, active, perex, text, oldUrl, metaTitle, metaDescription "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " " +
            "ORDER BY priority LIMIT ?,?";
            
            con.query(query, [offset,limit], (err, result) => {

                if(err)return rejected(err);
                resolve(result);

            });
			
		});

    }

	GetAllArticlesCount(searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql = " AND active = 1";

            let query = 
            "SELECT Count(articleID) as 'count' "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " ";
            
            con.query(query, (err, result) => {

                if(err)return rejected(err);
                resolve(result[0].count);

            });
			
		});

    }

	GetHomepageArticles(){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT articleID, photo, title, niceTitle, active, perex, text, metaTitle, metaDescription "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE deleted = 0 AND active = 1 " +
            "ORDER BY priority LIMIT 3";
            
            con.query(query, (err, result) => {

                if(err)return rejected(err);
                resolve(result);

            });
			
		});

    }

    AddEditArticle(data){

		return new Promise(async (resolve,rejected) => {

			if(data.oldUrl && data.oldUrl.charAt(data.oldUrl.length - 1) == "/"){
				data.oldUrl = data.oldUrl.slice(0, -1);
			}
		
			const post = {				
				title:            data.title,
				niceTitle:        getSlug(data.title),
				active:           data.active,
                perex:            data.perex,
                text:             data.text,
				oldUrl:           data.oldUrl.replace("www.",""),
                metaTitle:        data.metaTitle,
                metaDescription:  data.metaDescription
			};

			if(data.articleID != '0'){

				var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE articleID = ?";
				con.query(query,[post,data.articleID], async (err, result) => {	
	
					if(err)return rejected(err);

					try{

						let photo = "";
						if(data.photo) {
							photo = await this.UpdateImage(data.articleID,data.photo);
						}
						
						resolve({
							articleID: data.articleID,
							title:     data.title,
							niceTitle: post.niceTitle,
							active:    data.active,
							photo
							
						}); 

					}catch(err){
						rejected(err);
					}
					
				});

			}else{

				post.dateAdd = moment().format("YYYY-MM-DD HH:mm:ss");
				post.priority = 1;
				post.photo = "";

				var query = "INSERT INTO `" + prefix + "_" + TABLE_NAME + "` SET ?";
				
				con.query(query,post, async (err, result) => {	
	
					if(err)return rejected(err);	
					
					try{
					
						await this.ReindexArticlePriority(result.insertId);
							
						let photo = "";
						if(data.photo) photo = await this.UploadImage(result.insertId,data.photo);

						resolve({
							articleID:	result.insertId,
							title:      data.title,
							niceTitle:  post.niceTitle,
							active:     data.active,
							photo
						}); 

					}catch(err){
						rejected(err);
					}
				});
			}
		});
	}

	ReindexArticlePriority(articleID){
		
		return new Promise(function(resolve,rejected){
			
			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = priority + 1 WHERE deleted = 0 AND articleID <> ?";

			con.query(query, articleID, (err, result) => {
				
				if(err)return rejected(err);			
				resolve("");
	            
	        });
		});
	}

	UpdatePriorities(articleID,fromIndex,toIndex){

		return new Promise(async (resolve,rejected) => {

			var article = await this.GetArticle(articleID);

			var fIndex = fromIndex;
			var length = toIndex - fromIndex;

			if(fromIndex > toIndex){
				fIndex = toIndex;
				length = fromIndex - toIndex;
			}
			
			var query = "SELECT articleID FROM `" + prefix + "_" + TABLE_NAME + "` WHERE deleted = 0 AND articleID <> ? ORDER BY priority LIMIT " + fIndex + "," + length + " ";
			con.query(query,[articleID],async (err, result) => {	

				if(err)return rejected(err);

				if(result){

					try{

						var priority =  article.priority;
						if(fromIndex > toIndex)
							priority =  article.priority - length + 1;

						for(let i = 0; i < result.length; i++){
							await this.UpdateArtilcePriority((priority + i), result[i].articleID);
						}

						priority =  article.priority + length;
						if(fromIndex > toIndex)
							priority =  article.priority - length;

						await this.UpdateArtilcePriority(priority, articleID);

						resolve(fromIndex + "-" + toIndex);

					}catch(err){
						return rejected(err);
					}
				}
				else
				{
					return rejected("No article");
				}

	        });
		});
	}

	UpdateArtilcePriority(priority, articleID){

		return new Promise(async (resolve,rejected) => {

			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = ? WHERE articleID = ?";
			con.query(query,[priority,articleID], (err, res) => {	
			
				if(err)return rejected(err);
				resolve("");
			
			});
		});
	}

    UploadImage(articleID,f){

		return new Promise(async function(resolve,rejected){

			var path = "./" + ARTICLE_IMAGE_PATH;
			if(!fs.existsSync(path))
			{
				await fs.mkdir(path, err => {console.log(err)});
			}

			var uploadImages = new UploadImages();
			const { file } = await uploadImages.storeFile(f,path,["mala","stredni","velka"]);
			
			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET photo = ? WHERE articleID = ?";
			con.query(query,[file,articleID], (err, res) => {

				if(err)return rejected(err);
				resolve(file)

			});

		});

	}

	UpdateImage(articleID,f){

		return new Promise((resolve,rejected) => {

			var path = "./" + ARTICLE_IMAGE_PATH;

			let query = "SELECT photo FROM `" + prefix + "_" + TABLE_NAME + "` WHERE articleID = ?";
			con.query(query,articleID, (err, r) => {
				
				if(err) return rejected(err);

				r = r[0];

				if(f){

					if(r.photo){
						fs.unlinkSync(path + "/mala_" + r.photo);
						fs.unlinkSync(path + "/stredni_" + r.photo);
						fs.unlinkSync(path + "/velka_" + r.photo);
					}

					resolve(this.UploadImage(articleID,f));
				
				}else{
					resolve(true);
				}

			});

		});

	}	

	DeleteArticles(ids){

		return new Promise(function(resolve,rejected){

			const post = {
				deleted:1,
				dateDeleted:moment().format("YYYY-MM-DD HH:mm:ss")
			}

			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE articleID IN (" + ids + ")";
			con.query(query,post, (err, result) => {	
				
				if(err)return rejected(err);
				resolve(ids);
				
			});	
		});
	}
}

module.exports = Article;