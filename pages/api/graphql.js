// const { ApolloServer } = require('apollo-server-micro');
// const {mergeSchemas} = require('@graphql-tools/schema');
// import { processRequest } from "graphql-upload";
// import jwt  from 'jsonwebtoken';

// // Schemas
// const articleSchema             = require('../../server/modules/article/schema/schema.js');
// const adminSchema               = require('../../server/modules/admin/schema/schema.js');
// const newsSchema                = require('../../server/modules/news/schema/schema.js');
// const linkSchema                = require('../../server/modules/link/schema/schema.js');
// const partnerSchema             = require('../../server/modules/partner/schema/schema.js');
// const gameSchema                = require('../../server/modules/game/schema/schema.js');
// const partnershipRequestSchema  = require('../../server/modules/partnershipRequest/schema/schema.js');
// const bugReportSchema           = require('../../server/modules/bugReport/schema/schema.js');
// const statisticSchema           = require('../../server/modules/statistic/schema/schema.js');

// const articleExtendedResolver   = require('../../server/modules/article/resolvers/extendedResolvers.js');

// // Models
// const Article               = require('../../server/modules/article/models/article');
// const AdminUser             = require('../../server/modules/admin/models/adminUser');
// const News                  = require('../../server/modules/news/models/news');
// const Link                  = require('../../server/modules/link/models/link');
// const Partner               = require('../../server/modules/partner/models/partner');
// const GameData              = require('../../server/modules/game/models/gameData');
// const PartnershipRequest    = require('../../server/modules/partnershipRequest/models/partnershipRequest');
// const BugReport             = require('../../server/modules/bugReport/models/bugReport');
// const Statistic             = require('../../server/modules/statistic/models/statistic');

// const dataSources = () => ({
//     adminUser : new AdminUser(),
//     article : new Article(),
//     news : new News(),
//     link : new Link(),
//     partner : new Partner(),
//     gameData : new GameData(),
//     partnershipRequest : new PartnershipRequest(),
//     bugReport: new BugReport(),
//     statistic: new Statistic()
// });

// //context, který se dá načítat v resolverech
// const context = async ({ req,connection }) => {

//     if (connection) {
//         //console.log(connection);
//         // check connection for metadata
//         return null;
//     } else {

//         // tajný klíč pro jsonwebtoken
//         const JWT_SECRET_KEY = "ˇunI98BVehrs!Is_?é+sanDVěT-žuI1#";

//         // kontroluje se při každém requestu
//         var auth = (req.headers && req.headers.authorization) || null;
//         var user = null;

//         if(auth != null && auth != "null"){

//             auth = auth.split(" ");

//             if(auth[0] == "Bearer"){

//                 if(auth[1] != "null")
//                 {
//                     const parsedToken = jwt.verify(auth[1], JWT_SECRET_KEY);

//                     if(parsedToken.isAdminLogin == true && parsedToken.adminUserID){

//                         const adminUser = new AdminUser();
//                         user = await adminUser.getAdminUser(parsedToken.adminUserID);
//                         user = user ? user : null;

//                     }
//                     /*
//                     else if(parsedToken.isAdminLogin == false && parsedToken.customerID){

//                         const cust = new Customer();
//                         user = await cust.getCustomer(parsedToken.customerID);
//                         user = user ? user : null;

//                     }*/
//                 }
//             }
//         }
//         return { user, jwtSecretKey:JWT_SECRET_KEY};
//     }
// };

// const schema = mergeSchemas({

//     schemas: [
//         articleSchema,
//         adminSchema,
//         newsSchema,
//         linkSchema,
//         partnerSchema,
//         gameSchema,
//         partnershipRequestSchema,
//         bugReportSchema,
//         statisticSchema
//     ],
//     resolvers:[
//         articleExtendedResolver
//     ]

// });

// const apolloServer = new ApolloServer({ 
//     schema,
//     dataSources,
//     context
// });

// export  const  config  =  {
//     api:  {
//         bodyParser:  false
//     }
// };

// const startServer = apolloServer.start();

// export default async function handler(req, res) {

//   const contentType = req.headers["content-type"]
//   if (contentType && contentType.startsWith("multipart/form-data")) {
//     req.filePayload = await processRequest(req, res);
//   }

//   await startServer;
//   await apolloServer.createHandler({
//     path: "/api/graphql",
//   })(req, res);
// }

