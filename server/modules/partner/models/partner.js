const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const moment        = require("moment");
const {PARTNER_IMAGE_PATH} = require("../../../../config/index");
var getSlug 	   		  = require('speakingurl');
const UploadImages 		  = require('../../../../scripts/uploadImages');
const fs                  = require('fs');

const TABLE_NAME = "partner";

class Partner extends DataSource {

    initialize(config){
        this.config = config;
    }

	GetPartner(partnerID){

        return new Promise(function(resolve,rejected){

            let query = 
            "SELECT partnerID, photo, title, active, url, priority "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE partnerID = ? ";
            
            con.query(query, [partnerID], (err, result) => {

                if(err)return rejected(err);
                resolve(result[0]);

            });
			
		});

    }

    GetAllPartners(limit, offset, searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql += " AND active = 1";

            let query = 
            "SELECT partnerID, photo, title, active, url "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " " +
            "ORDER BY priority LIMIT ?,?";
            
            con.query(query, [offset,limit], (err, result) => {

                if(err)return rejected(err);
                resolve(result);

            });
			
		});

    }

	GetAllPartnersCount(searchText, onlyActive){

        return new Promise(function(resolve,rejected){

            var whereSql = "deleted = 0";
            if(onlyActive)whereSql = " AND active = 1";

            let query = 
            "SELECT Count(partnerID) as 'count' "+
            "FROM `" + prefix + "_" + TABLE_NAME + "` "+
            "WHERE " + whereSql + " ";
            
            con.query(query, (err, result) => {

                if(err)return rejected(err);
                resolve(result[0].count);

            });
			
		});

    }

    AddEditPartner(data){

		return new Promise(async (resolve,rejected) => {

			if(!data.url.includes("http://") && !data.url.includes("https://"))
				data.url = "http://" + data.url;

			const post = {				
				title:            data.title,
				active:           data.active,
                url:              data.url,
			};

			if(data.partnerID != '0'){

				var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE partnerID = ?";
				con.query(query,[post,data.partnerID], async (err, result) => {	
	
					if(err)return rejected(err);

					try{

						let photo = "";
						if(data.photo) {
							photo = await this.UpdateImage(data.partnerID,data.photo);
						}
						
						resolve({
							partnerID: data.partnerID,
							title:     data.title,
							active:    data.active,
							url:       data.url,
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
					
						await this.ReindexPartnerPriority(result.insertId);
							
						let photo = "";
						if(data.photo) photo = await this.UploadImage(result.insertId,data.photo);

						resolve({
							partnerID:	result.insertId,
							title:      data.title,
							active:     data.active,
							url:        data.url,
							photo
						}); 

					}catch(err){
						rejected(err);
					}
				});
			}
		});
	}

	ReindexPartnerPriority(partnerID){
		
		return new Promise(function(resolve,rejected){
			
			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = priority + 1 WHERE deleted = 0 AND partnerID <> ?";

			con.query(query, partnerID, (err, result) => {
				
				if(err)return rejected(err);			
				resolve("");
	            
	        });
		});
	}

	UpdatePriorities(partnerID,fromIndex,toIndex){

		return new Promise(async (resolve,rejected) => {

			var partner = await this.GetPartner(partnerID);

			var fIndex = fromIndex;
			var length = toIndex - fromIndex;

			if(fromIndex > toIndex){
				fIndex = toIndex;
				length = fromIndex - toIndex;
			}
			
			var query = "SELECT partnerID FROM `" + prefix + "_" + TABLE_NAME + "` WHERE deleted = 0 AND partnerID <> ? ORDER BY priority LIMIT " + fIndex + "," + length + " ";
			con.query(query,[partnerID],async (err, result) => {	

				if(err)return rejected(err);

				if(result){

					try{

						var priority =  partner.priority;
						if(fromIndex > toIndex)
							priority =  partner.priority - length + 1;

						for(let i = 0; i < result.length; i++){
							await this.UpdateArtilcePriority((priority + i), result[i].partnerID);
						}

						priority =  partner.priority + length;
						if(fromIndex > toIndex)
							priority =  partner.priority - length;

						await this.UpdateArtilcePriority(priority, partnerID);

						resolve(fromIndex + "-" + toIndex);

					}catch(err){
						return rejected(err);
					}
				}
				else
				{
					return rejected("No partner");
				}

	        });
		});
	}

	UpdateArtilcePriority(priority, partnerID){

		return new Promise(async (resolve,rejected) => {

			var query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET priority = ? WHERE partnerID = ?";
			con.query(query,[priority,partnerID], (err, res) => {	
			
				if(err)return rejected(err);
				resolve("");
			
			});
		});
	}

    UploadImage(partnerID,f){

		return new Promise(async function(resolve,rejected){

			var path = "./" + PARTNER_IMAGE_PATH;
			if(!fs.existsSync(path))
				await fs.mkdir(path, err => {});

			var uploadImages = new UploadImages();
			uploadImages.smallWidth = 100; 
        	uploadImages.smallHeight = null;
			uploadImages.middleWidth = null; 
        	uploadImages.middleHeight = null;

			const { file } = await uploadImages.storeFile(f,path,["mala","stredni"]);
			
			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET photo = ? WHERE partnerID = ?";
			con.query(query,[file,partnerID], (err, res) => {

				if(err)return rejected(err);
				resolve(file)

			});

		});

	}

	UpdateImage(partnerID,f){

		return new Promise((resolve,rejected) => {

			var path = "./" + PARTNER_IMAGE_PATH;

			let query = "SELECT photo FROM `" + prefix + "_" + TABLE_NAME + "` WHERE partnerID = ?";
			con.query(query,partnerID, (err, r) => {
				
				if(err) return rejected(err);

				r = r[0];

				if(f){

					if(r.photo){
						if(fs.existsSync(path + "/mala_" + r.photo))fs.unlinkSync(path + "/mala_" + r.photo);
						if(fs.existsSync(path + "/stredni_" + r.photo))fs.unlinkSync(path + "/stredni_" + r.photo);
					}

					resolve(this.UploadImage(partnerID,f));
				
				}else{
					resolve(true);
				}

			});

		});

	}	

	DeletePartners(ids){

		return new Promise(function(resolve,rejected){

			const post = {
				deleted:1,
				dateDeleted:moment().format("YYYY-MM-DD HH:mm:ss")
			}

			let query = "UPDATE `" + prefix + "_" + TABLE_NAME + "` SET ? WHERE partnerID IN (" + ids + ")";
			con.query(query,post, (err, result) => {	
				
				if(err)return rejected(err);
				resolve(ids);
				
			});	
		});
	}
}

module.exports = Partner;