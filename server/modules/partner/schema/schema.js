const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server');
const resolvers              = require('../resolvers/resolvers.js');

const partnerSchema = makeExecutableSchema({  
    typeDefs: gql`
    
        scalar Upload

        type Query {
            allPartners(limit: Int,offset: Int,serachText: String,onlyActive:Boolean):[Partner]
            allPartnersCount(serachText: String,onlyActive:Boolean):Int
            partner(partnerID:ID):Partner
        }

        type Mutation {
            addEditPartner(
                partnerID:ID,
                title:String,
                photo:Upload,
                active:Int,
                url:String,
            ):Partner
            deletePartners(partnerIDs: ID): String 
            updatePartnerPriorities(partnerID: ID,fromIndex:ID,toIndex:ID):String
        }
       
        type Partner {
            partnerID:ID
            active:Int
            title:String
            photo:String
            url:String
        }

    `,
    resolvers
});

module.exports = partnerSchema;
