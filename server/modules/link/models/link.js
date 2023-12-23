const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const moment        = require("moment");
const {LINK_IMAGE_PATH} = require("../../../../config/index");
var getSlug 	   		  = require('speakingurl');
const UploadImages 		  = require('../../../../scripts/uploadImages');
const fs                  = require('fs');

const TABLE_NAME = "link";

class Link extends DataSource {

    initialize(config){
        this.config = config;
    }

	GetLink(linkID){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT linkID, photo, title, niceTitle, active, text, metaTitle, metaDescription, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE linkID = ? ";
            
            con.query(query, [linkID], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
			
		});

    }

    GetAllLinks(limit, offset, searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql += " AND active = 1";

            let query = 
            "SELECT linkID, photo, title, niceTitle, active, text, metaTitle, metaDescription "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " " +
            "ORDER BY priority LIMIT ?,?";
            
            con.query(query, [offset,limit], (err, result) => {

                if(err)return rejected(err);
                resolve(result);

            });
			
		});

    }

	GetAllLinksCount(searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql = " AND active = 1";

            let query = 
            "SELECT Count(linkID) as 'count' "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " ";
            
            con.query(query, (err, result) => {

                if(err)return rejected(err);
                resolve(result[0].count);

            });
			
		});

    }

    AddEditLink(data){

		return new Promise(async (resolve,rejected) => {
		
			const post = {				
				title:            data.title,
				niceTitle:        getSlug(data.title),
				active:           data.active,
                text:             data.text,
                metaTitle:        data.metaTitle,
                metaDescription:  data.metaDescription
			};

			if(data.linkID != '0'){

				var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE linkID = ?";
				con.query(query,[post,data.linkID], async (err, result) => {	
	
					if(err)return rejected(err);

					try{

						let photo = "";
						if(data.photo) {
							photo = await this.UpdateImage(data.linkID,data.photo);
						}
						
						resolve({
							linkID: data.linkID,
							title:     data.title,
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
					
						await this.ReindexLinkPriority(result.insertId);
							
						let photo = "";
						if(data.photo) photo = await this.UploadImage(result.insertId,data.photo);

						resolve({
							linkID:	result.insertId,
							title:      data.title,
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

	ReindexLinkPriority(linkID){
		
		return new Promise(function(resolve,rejected){
			
			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = priority + 1 WHERE deleted = 0 AND linkID <> ?";

			con.query(query, linkID, (err, result) => {
				
				if(err)return rejected(err);			
				resolve("");
	            
	        });
		});
	}

    UploadImage(linkID,f){

		return new Promise(async function(resolve,rejected){

			var path = "./" + LINK_IMAGE_PATH;
			if(!fs.existsSync(path)) 
				await fs.mkdir(path, err => {});

			var uploadImages = new UploadImages();
			const { file } = await uploadImages.storeFile(f,path,["mala","stredni","velka"]);
			
			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET photo = ? WHERE linkID = ?";
			con.query(query,[file,linkID], (err, res) => {

				if(err)return rejected(err);
				resolve(file)

			});

		});

	}

	UpdateImage(linkID,f){

		return new Promise((resolve,rejected) => {

			var path = "./" + LINK_IMAGE_PATH;

			let query = "SELECT photo FROM `" + prefix + "_" + TABLE_NAME + "` WHERE linkID = ?";
			con.query(query,linkID, (err, r) => {
				
				if(err) return rejected(err);

				r = r[0];

				if(f){

					if(r.photo){
						fs.unlinkSync(path + "/mala_" + r.photo);
						fs.unlinkSync(path + "/stredni_" + r.photo);
						fs.unlinkSync(path + "/velka_" + r.photo);
					}

					resolve(this.UploadImage(linkID,f));
				
				}else{
					resolve(true);
				}

			});

		});

	}	

	DeleteLinks(ids){

		return new Promise(function(resolve,rejected){

			const post = {
				deleted:1,
				dateDeleted:moment().format("YYYY-MM-DD HH:mm:ss")
			}

			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE linkID IN (" + ids + ")";
			con.query(query,post, (err, result) => {	
				
				if(err)return rejected(err);
				resolve(ids);
				
			});	
		});
	}
}

module.exports = Link;