const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server');
const resolvers              = require('../resolvers/resolvers.js');

const partnershipRequestSchema = makeExecutableSchema({  
    typeDefs: gql`
    
        scalar Upload

        type Mutation {
            sendPartnershipRequest(data:PartnershipData):String
            
        }
       
        input PartnershipData {
            email:String
            phone:String
            partnershipType:String,
            brandName:String,
            aboutYou:String,
            twitter:String,
            telegram:String,
            discord:String,
            youtube:String,
            instagram:String,
            facebook:String,
            propose:String,
            file:Upload
        }

    `,
    resolvers
});

module.exports = partnershipRequestSchema;
