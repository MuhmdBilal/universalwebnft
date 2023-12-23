const sharp = require('sharp');
const fs 	= require('fs');
var getSlug  = require('speakingurl');

class UploadImages{

    constructor(){
        sharp.cache(false);

        this.smallWidth = null; 
        this.smallHeight = 100;
        this.middleWidth = 420; 
        this.middleHeight = null; 
        this.bigWidth = 850; 
        this.bigHeight = null;
        this.maxWidth = null; 
        this.maxHeight = 1080;
    }

    async storeFile(file,path,types){

        var fData = await file;
        var { createReadStream, filename, mimetype } = fData.file;
        
        const stream = createReadStream();

        filename = filename.split(".");
        var extension = filename.pop();

        filename = getSlug(filename.join("."));
        filename = filename + "." + extension;

        var i = 0;
        var f = filename;

        do {

            if(i != 0){
                f = Math.floor(Math.random() * 1000) + "_" + filename;
            }
            i++;

        }while (fs.existsSync(path + "/mala_" + f) || fs.existsSync(path + "/stredni_" + f) || fs.existsSync(path + "/velka_" + f) || fs.existsSync(path + "/maxi_" + f));
        
        return new Promise((resolve, reject) =>
            stream.on('error', error => {
                console.log(error);
                if (stream.truncated)
                    fs.unlinkSync(path + "/" + f);
                reject(error)
            })
            .pipe(fs.createWriteStream(path + "/" + f))
            .on('error', error => {console.log(error);reject(error)})
            .on('finish', () => {

                if(types){
                    var allPromises = [];
                    types.forEach(item => {
                        allPromises.push(this.resize(item,path,f,mimetype));
                    });

                    if(allPromises.length > 0){
                        Promise.all(allPromises).then((values) => {

                            fs.unlinkSync(path + "/" + f);
                            resolve({file:f});

                        });
                    }else{
                        resolve({file:f});
                    }
                }else{
                    resolve({file:f});
                }

            })
        )
    }

    resize(type,path,f,mimetype){

        var width = 0;
        var height = 0;

        switch(type){
            case "mala": width = this.smallWidth; height = this.smallHeight; break;
            case "stredni": width = this.middleWidth; height = this.middleHeight; break;
            case "velka": width = this.bigWidth; height = this.bigHeight; break;
            case "maxi": width = this.maxWidth; height = this.maxHeight; break;
        }

        const config = {
            jpeg: { quality: 80 },
            webp: { quality: 75 },
            png: {compressionLevel: 8},
        }

        return new Promise(async(resolve,rejected) => {

            var animated = false;
            if(mimetype == "image/gif" || mimetype == "image/webp")
                animated = true;

            const image = sharp(path + "/" + f, { animated: animated});
            const meta = await image.metadata();
            const { format } = meta

            image[format](config[format]).resize(width, height).toFile(path + "/" + type +'_'+f, (err, info) => { 
                if(err)rejected(err);
                resolve(true); 
            });

		});
        
    }

    crop(originalImage,outputImage,width,height,left,top){
        return sharp(originalImage).extract({ width: width, height: height, left: left, top: top }).toFile(outputImage);
    }

    mirror(originalImage,outputImage){
        return sharp(originalImage).flop().toFile(outputImage);
    }
}

module.exports = UploadImages;