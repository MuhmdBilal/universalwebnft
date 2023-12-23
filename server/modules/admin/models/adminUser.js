const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const md5           = require("md5");

const TABLE_NAME = "admin_user";
const PASS_SUFFIX = "_uni#VeRse#78!4_57IslAnd!";

class AdminUser extends DataSource {

    // initialize(config){
    //     this.config = config;
    // }

    // adminLogin(email,password){

    //     return new Promise(function(resolve,rejected){
			
	// 		let query = 
    //             "SELECT adminUserID,email,name,surname "+
    //             "FROM `"+prefix+"_" + TABLE_NAME + "` "+
    //             "WHERE email = ? AND password = ?";
			
    //         con.query(query, [email,md5(password + PASS_SUFFIX)], (err, result) => {

    //             if(err)return rejected(err);
	// 			resolve(result[0]);
	            
	//         });
			
	// 	});

    // }

    // getAdminUser(id){
    //     return new Promise(function(resolve,rejected){
			
	// 		let query = 
    //             "SELECT adminUserID, email, name, surname "+
    //             "FROM `"+prefix+"_" + TABLE_NAME + "` "+
    //             "WHERE adminUserID = ?";
                
	// 		con.query(query, [id], (err, result) => {
	            
    //             if(err)return rejected(err);
	// 			return resolve(result[0]);
	            
	//         });
			
	// 	});
    // }

    // ChangePassword(oldPassword, newPassword, adminUserID){

    //     return new Promise(function(resolve,rejected){

    //         let query = "SELECT password FROM `"+prefix+"_" + TABLE_NAME + "` WHERE adminUserID = ?";
    //         con.query(query, adminUserID, (err, result) => {

    //             if(err)return rejected(err);

    //             console.log(result[0].password + " - " + md5(oldPassword + PASS_SUFFIX));

    //             if(result[0] && result[0].password == md5(oldPassword + PASS_SUFFIX)){

    //                 newPassword = md5(newPassword + PASS_SUFFIX);
                    
    //                 query = "UPDATE `"+prefix+"_" + TABLE_NAME + "` SET password = ? WHERE adminUserID = ?";
    //                 con.query(query, [newPassword,adminUserID], (err, res) => {
                        
    //                     if(err)return rejected(err);
    //                     return resolve("");
                        
    //                 });

    //             }else{
    //                 resolve("Staré heslo nebylo zadáno správně.");
    //             }

    //         });
			
	// 	});

    // }

}

module.exports = AdminUser;