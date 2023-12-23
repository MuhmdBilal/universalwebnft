const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const Email = require("../../email/email"); 


class PartnershipRequest extends DataSource {

    // initialize(config){
    //     this.config = config;
    // }

	SendPartnershipRequest(data){

        return new Promise(async (resolve,rejected) => {

            try{

                var email = new Email();
                await email.SendPartnershipRequest(data);

                resolve("");

            }catch(err){
                rejected(err);
            }
			
		});

    }

}

module.exports = PartnershipRequest;