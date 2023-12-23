const {DataSource}  = require("apollo-datasource");
const {con,prefix}  = require("../../../mysql/mysql");
const Email = require("../../email/email"); 


class BugReport extends DataSource {

    initialize(config){
        this.config = config;
    }

	SendMobileCrashReport(data){

        return new Promise(async (resolve,rejected) => {

            try{

                var email = new Email();
                await email.SendMobileCrashReport(data);

                resolve("");

            }catch(err){
                rejected(err);
            }
			
		});
    }

    SendPerformanceReport(data){

        return new Promise(async (resolve,rejected) => {

            try{

                var email = new Email();
                await email.SendPerformanceReport(data);

                resolve("");

            }catch(err){
                rejected(err);
            }
			
		});
    }
    SendBugReport(data){

        return new Promise(async (resolve,rejected) => {

            try{

                var email = new Email();
                await email.SendBugReport(data);

                resolve("");

            }catch(err){
                rejected(err);
            }
			
		});
    }
}

module.exports = BugReport;