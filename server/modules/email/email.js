const {DOMAIN}   = require("../../../config/index");
const sgMail     = require('@sendgrid/mail');
var toArray      = require('stream-to-array');

const EMAIL    = "no-reply@universeisland.games";
const TO       = "marketing@universeisland.games";
const FROM     = {name:"Universe Island",email:EMAIL};

const SENDGRID_API_KEY = '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';

class Email {

    SendPartnershipRequest(data){

        return new Promise(async (resolve,rejected) => {

            let html = '<p style="color:#333333;line-height:25px;margin:0 0 25px 0;font-size:14px;">New parthership request has been made. All information is bellow.</p>';
            html += '<div style="padding:20px;border:1px solid #dddddd;font-size:14px;">' +
                '<p><strong>Email:</strong> ' + data.email + '</p>' +
                '<p><strong>Phone:</strong> ' + data.phone + '</p>' +
                '<p><strong>PartnershipType:</strong> ' + data.partnershipType + '</p>' +
                '<p><strong>BrandName:</strong> ' + data.brandName + '</p>' +
                '<p><strong>AboutYou:</strong> <br /> ' + data.aboutYou + '</p>' +
                '<p><strong>Twitter:</strong> ' + data.twitter + '</p>' +
                '<p><strong>Telegram:</strong> ' + data.telegram + '</p>' +
                '<p><strong>Discord:</strong> ' + data.discord + '</p>' +
                '<p><strong>Youtube:</strong> ' + data.youtube + '</p>' +
                '<p><strong>Instagram:</strong> ' + data.instagram + '</p>' +
                '<p><strong>Facebook:</strong> ' + data.facebook + '</p>' +
                '<p><strong>Propose:</strong> <br /> ' + data.propose + '</p>'+
            '</div>';

            html += this.HtmmlSignature();
            html = this.EmailLayout(html);

            let text = "New parthership request has been made. All information is bellow." + this.TextSignature();

            sgMail.setApiKey(SENDGRID_API_KEY);
            const msg = {
                to: TO,
                from: FROM,
                subject: "Partnership request",
                text,
                html,
            };

            if(data.file)
            {
                var fileData = await data.file;
                var { createReadStream, filename,mimeType} = fileData.file;

                toArray(createReadStream(), function (err, arr) {

                    var buffer = Buffer.concat(arr).toString('base64');

                    msg.attachments = [{
                        filename: filename,
                        type: mimeType,
                        content: buffer
                    }];

                    sgMail.send(msg).then((data)=>{
                        resolve("");
                    }).catch(function(error) {
                        rejected(error);
                    });
                })

            }
            else
            {
                sgMail.send(msg).then((data)=>{
                    resolve("");
                }).catch(function(error) {
                    rejected(error);
                });
            }

            


        });
    }

    SendBugReport(data){

        return new Promise(async (resolve,rejected) => {

            let html = '<p style="color:#333333;line-height:25px;margin:0 0 25px 0;font-size:14px;">New bug report has been made. All information is bellow.</p>';
            html += '<div style="padding:20px;border:1px solid #dddddd;font-size:14px;">' +
                '<p><strong>Name:</strong> ' + data.name + '</p>' +
                '<p><strong>Device:</strong> ' + data.device + '</p>' +
                '<p><strong>Please copy link to image/video of the crash or Performance issues.</strong> <br /> ' + data.crashLink + '</p>' +
                '<p><strong>Describe in detail what you were doing before you experienced the bug.</strong> <br /> ' + data.beforeCrash + '</p>' +
                '<p><strong>What did you expect to happen when you performed the steps you described previously?</strong> <br /> ' + data.expectToHappen + '</p>' +
                '<p><strong>Are you able to reproduce the issue you are describing and if so, what are the steps to reproduce the issue?</strong> <br /> ' + data.reproduceSteps + '</p>' +
                '<p><strong>Were you able to find a work around that enabled you to continue playing and if so, what were the steps?</strong> <br /> ' + data.enabledSteps + '</p>' +
            '</div>';

            html += this.HtmmlSignature();
            html = this.EmailLayout(html);

            let text = "New bug report has been made. All information is bellow." + this.TextSignature();

            sgMail.setApiKey(SENDGRID_API_KEY);
            const msg = {
                to: TO,
                from: FROM,
                subject: "Bug report",
                text,
                html,
            };

            sgMail.send(msg).then((data)=>{
                resolve("");
            }).catch(function(error) {
                rejected(error);
            });

        });
    }

    SendPerformanceReport(data){

        return new Promise(async (resolve,rejected) => {

            let html = '<p style="color:#333333;line-height:25px;margin:0 0 25px 0;font-size:14px;">New performance issue has been made. All information is bellow.</p>';
            html += '<div style="padding:20px;border:1px solid #dddddd;font-size:14px;">' +
                '<p><strong>Name:</strong> ' + data.name + '</p>' +
                '<p><strong>Device:</strong> ' + data.device + '</p>' +
                '<p><strong>Please copy link to image/video of the crash or Performance issues.</strong> <br /> ' + data.crashLink + '</p>' +
                '<p><strong>Describe in detail what you were doing before you experience performance issues.</strong> <br /> ' + data.beforeCrash + '</p>' +
                '<p><strong>Did you receive an error message? Please provide us with the Error Code in that case.</strong> <br /> ' + data.errorCode + '</p>' +
                '<p><strong>What graphical settings are you using? You can find these in the settings menu under “Graphics”.</strong> <br /> ' + data.graphicalSettings + '</p>' +
                '<p><strong>What are your audio settings? You can find these in the settings menu under “Audio”.</strong> <br /> ' + data.audioSettings + '</p>' +
            '</div>';

            html += this.HtmmlSignature();
            html = this.EmailLayout(html);

            let text = "New performance issue has been made. All information is bellow." + this.TextSignature();

            sgMail.setApiKey(SENDGRID_API_KEY);
            const msg = {
                to: TO,
                from: FROM,
                subject: "Performance issue report",
                text,
                html,
            };

            sgMail.send(msg).then((data)=>{
                resolve("");
            }).catch(function(error) {
                rejected(error);
            });

        });
    }

    SendMobileCrashReport(data){

        return new Promise(async (resolve,rejected) => {

            let html = '<p style="color:#333333;line-height:25px;margin:0 0 25px 0;font-size:14px;">New mobile crash report has been made. All information is bellow.</p>';
            html += '<div style="padding:20px;border:1px solid #dddddd;font-size:14px;">' +
                '<p><strong>Name:</strong> ' + data.name + '</p>' +
                '<p><strong>Device:</strong> ' + data.device + '</p>' +
                '<p><strong>Link to image/video of the crash or Performance issues.:</strong> <br /> ' + data.crashLink + '</p>' +
                '<p><strong>Describe in detail what you were doing before the crash occurred.:</strong> <br /> ' + data.beforeCrash + '</p>' +
                '<p><strong>Did you receive an error message? Please provide us with the Error Code in that case?</strong> <br /> ' + data.errorCode + '</p>' +
                '<p><strong>What kind of crash is it? For example hard freeze, crash to desktop, black-screen, system reboot, etc.</strong> <br /> ' + data.crashKind + '</p>' +
                '<p><strong>What other applications were running in the background?</strong> <br /> ' + data.otherApps + '</p>' +
                '<p><strong>Have you installed or updated any drivers recently? If so which ones and what version?</strong> <br /> ' + data.installedDrivers + '</p>' +
                '<p><strong>Are you using any specialized peripherals such as Tobii Eye Tracker, Third-party controllers, joysticks, etc. If yes, Please list it for us.</strong> <br /> ' + data.peripherals + '</p>' +
            '</div>';

            html += this.HtmmlSignature();
            html = this.EmailLayout(html);

            let text = "New mobile crash report has been made. All information is bellow." + this.TextSignature();

            sgMail.setApiKey(SENDGRID_API_KEY);
            const msg = {
                to: TO,
                from: FROM,
                subject: "Mobile crash report",
                text,
                html,
            };

            sgMail.send(msg).then((data)=>{
                resolve("");
            }).catch(function(error) {
                rejected(error);
            });

        });
    }

    EmailLayout(text){

        var layout = 

        '<center>'+
            '<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">'+
                '<tr>'+
                    '<td align="center" valign="top" style="border-collapse:collapse;color:#525252;background-color:#efefef;">'+
                        '<table border="0" style="border-collapse:collapse;background-color:#ffffff;max-width:620px;">'+
                            '<tr>'+
                                '<td style="text-align: center;padding:0 40px;background-color:#ffffff;vertical-align:middle;font-size: 15px;"><div style="padding:40px 0 0 0;text-align:center;"><img style="height:50px" alt="logo3" src="' + DOMAIN + '/images/logo.webp" /></div></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td style="padding:0px 40px 30px 40px;">'+ text + '</td>'+
                            '</tr>'+
                        '</table>'+
                    '</td>'+
                '</tr>'+
            '</table>'+
        '</center>';

        return layout;

    }


    HtmmlSignature(){
        return '<p style="line-height:20px;margin:35px 0 15px 0;font-size:14px;color: #999999;">Universe Island</p>';
    }

    TextSignature(){
        return "Universe Island";
    }

}

module.exports = Email;