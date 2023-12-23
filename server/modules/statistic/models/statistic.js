const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const md5           = require("md5");

const TABLE_NAME = "statistic";

class GameData extends DataSource {

    // initialize(config){
    //     this.config = config;
    // }

    // GetStatisticData(){

    //     return new Promise(function(resolve,rejected){
			
	// 		let query = 
    //             "SELECT label,value "+
    //             "FROM `"+prefix+"_" + TABLE_NAME + "` ";
			
    //         con.query(query, (err, result) => {

    //             if(err)return rejected(err);

    //             var data = {};

    //             for(let i in result){
    //                 data[result[i].label] = result[i].value;
    //             }

	// 			resolve(data);
	            
	//         });
			
	// 	});

    // }

    // IncrementStatisticValue(type){

    //     return new Promise((resolve,rejected) => {
			
	// 		let query = 
				
	// 			"UPDATE `" + prefix + "_" + TABLE_NAME + "` SET value = value + 1 " +
	// 			"WHERE label = ?";             
                
	// 		con.query(query, type,(err, result) => {

	// 			if(err)rejected(err);
	// 			resolve("");
	            
	//         });
			

	// 	});

    // }

}

module.exports = GameData;