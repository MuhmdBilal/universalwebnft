// import fs from "fs";

// export default function handler(req, res) {

//   const image    = req.query.image;
//   const location = req.query.imageLocation;

//   const imageBuffer = fs.readFileSync("./public/images/" + location + "/" + image);
//   res.setHeader("Content-Type", "image/jpg");
//   return res.send(imageBuffer);

// }