const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const md5           = require("md5");

const TABLE_NAME = "game_data";

class GameData extends DataSource {

    initialize(config){
        this.config = config;
    }

    GetGameData(){

        return new Promise(function(resolve,rejected){
			
			let query = 
                "SELECT label,value "+
                "FROM `"+prefix+"_" + TABLE_NAME + "` ";
			
            con.query(query, (err, result) => {

                if(err)return rejected(err);

                var data = {};

                for(let i in result){
                    data[result[i].label] = result[i].value;
                }

				resolve(data);
	            
	        });
			
		});

    }

    UpdateGameData(data){

        return new Promise((resolve,rejected) => {
			
			let query = 
				
				"UPDATE `" + prefix + "_" + TABLE_NAME + "` SET value = (" +
				"CASE "+

				"WHEN gameDataID = '1' THEN '" + data.androidUrl + "' " + 
				"WHEN gameDataID = '2' THEN '" + data.iPhoneUrl + "' " +
                "WHEN gameDataID = '3' THEN '" + data.macUrl + "' " +
                "WHEN gameDataID = '4' THEN '" + data.winUrl + "' " +
				
				"END) "+
				"WHERE gameDataID IN ('1','2','3','4')";             
                
			con.query(query, (err, result) => {

				if(err)rejected(err);
				resolve("");
	            
	        });
			

		});

    }

}

module.exports = GameData;