const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const moment        = require("moment");
const {NEWS_IMAGE_PATH}   = require("../../../../config/index");
var getSlug 	   		  = require('speakingurl');
const UploadImages 		  = require('../../../../scripts/uploadImages');
const fs                  = require('fs');

const TABLE_NAME = "news";

class News extends DataSource {

    initialize(config){
        this.config = config;
    }

	GetNews(newsID){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT newsID, photo, title, active, text, url, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE newsID = ? ";
            
            con.query(query, [newsID], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
			
		});

    }

    GetAllNews(limit, offset, searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql += " AND active = 1";

            let query = 
            "SELECT newsID, photo, title, url, active, text "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " " +
            "ORDER BY priority LIMIT ?,?";
            
            con.query(query, [offset,limit], (err, result) => {

                if(err)return rejected(err);
                resolve(result);

            });
			
		});

    }

	GetAllNewsCount(searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql = " AND active = 1";

            let query = 
            "SELECT Count(newsID) as 'count' "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " ";
            
            con.query(query, (err, result) => {

                if(err)return rejected(err);
                resolve(result[0].count);

            });
			
		});

    }

    AddEditNews(data){

		return new Promise(async (resolve,rejected) => {
		
			const post = {				
				title:   data.title,
				url:     data.url,	
				active:  data.active,
                text:    data.text,
			};

			if(data.newsID != '0'){

				var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE newsID = ?";
				con.query(query,[post,data.newsID], async (err, result) => {	
	
					if(err)return rejected(err);

					try{

						let photo = "";
						if(data.photo) {
							photo = await this.UpdateImage(data.newsID,data.photo);
						}
						
						resolve({
							newsID: data.newsID,
							title:  data.title,
							active: data.active,
							text:   data.text,
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
					
						await this.ReindexNewsPriority(result.insertId);
							
						let photo = "";
						if(data.photo) photo = await this.UploadImage(result.insertId,data.photo);

						resolve({
							newsID:	result.insertId,
							title:  data.title,
							text:   data.text,
							active: data.active,
							photo
						}); 

					}catch(err){
						rejected(err);
					}
				});
			}
		});
	}

	ReindexNewsPriority(newsID){
		
		return new Promise(function(resolve,rejected){
			
			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = priority + 1 WHERE deleted = 0 AND newsID <> ?";

			con.query(query, newsID, (err, result) => {
				
				if(err)return rejected(err);			
				resolve("");
	            
	        });
		});
	}

	UpdatePriorities(newsID,fromIndex,toIndex){

		return new Promise(async (resolve,rejected) => {

			var article = await this.GetNews(newsID);

			var fIndex = fromIndex;
			var length = toIndex - fromIndex;

			if(fromIndex > toIndex){
				fIndex = toIndex;
				length = fromIndex - toIndex;
			}
			
			var query = "SELECT newsID FROM `" + prefix + "_" + TABLE_NAME + "` WHERE deleted = 0 AND newsID <> ? ORDER BY priority LIMIT " + fIndex + "," + length + " ";
			con.query(query,[newsID],async (err, result) => {	

				if(err)return rejected(err);

				if(result){

					try{

						var priority =  article.priority;
						if(fromIndex > toIndex)
							priority =  article.priority - length + 1;

						for(let i = 0; i < result.length; i++){
							await this.UpdateNewsPriority((priority + i), result[i].newsID);
						}

						priority =  article.priority + length;
						if(fromIndex > toIndex)
							priority =  article.priority - length;

						await this.UpdateNewsPriority(priority, newsID);

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

	UpdateNewsPriority(priority, newsID){

		return new Promise(async (resolve,rejected) => {

			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = ? WHERE newsID = ?";
			con.query(query,[priority,newsID], (err, res) => {	
			
				if(err)return rejected(err);
				resolve("");
			
			});
		});
	}

    UploadImage(newsID,f){

		return new Promise(async function(resolve,rejected){

			var path = "./" + NEWS_IMAGE_PATH;
			if(!fs.existsSync(path))
			{
				await fs.mkdir(path, err => {console.log(err)});
			}

			var uploadImages = new UploadImages();
			uploadImages.middleWidth = 250;

			const { file } = await uploadImages.storeFile(f,path,["mala","stredni"]);
			
			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET photo = ? WHERE newsID = ?";
			con.query(query,[file,newsID], (err, res) => {

				if(err)return rejected(err);
				resolve(file)

			});

		});

	}

	UpdateImage(newsID,f){

		return new Promise((resolve,rejected) => {

			var path = "./" + NEWS_IMAGE_PATH;

			let query = "SELECT photo FROM `" + prefix + "_" + TABLE_NAME + "` WHERE newsID = ?";
			con.query(query,newsID, (err, r) => {
				
				if(err) return rejected(err);

				r = r[0];

				if(f){

					if(r.photo){
						fs.unlinkSync(path + "/mala_" + r.photo);
						fs.unlinkSync(path + "/stredni_" + r.photo);
					}

					resolve(this.UploadImage(newsID,f));
				
				}else{
					resolve(true);
				}

			});

		});

	}	

	DeleteNews(ids){

		return new Promise(function(resolve,rejected){

			const post = {
				deleted:1,
				dateDeleted:moment().format("YYYY-MM-DD HH:mm:ss")
			}

			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE newsID IN (" + ids + ")";
			con.query(query,post, (err, result) => {	
				
				if(err)return rejected(err);
				resolve(ids);
				
			});	
		});
	}
}

module.exports = News;