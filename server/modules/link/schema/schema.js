const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server');
const resolvers              = require('../resolvers/resolvers.js');

const linkSchema = makeExecutableSchema({  
    typeDefs: gql`
    
        scalar Upload

        type Query {
            allLinks(limit: Int,offset: Int,serachText: String,onlyActive:Boolean):[Link]
            allLinksCount(serachText: String,onlyActive:Boolean):Int
            link(linkID:ID):Link
        }

        type Mutation {
            addEditLink(
                linkID:ID,
                title:String,
                photo:Upload,
                active:Int,
                text:String,
                metaTitle:String,
                metaDescription:String
            ):Link
            deleteLinks(linkIDs: ID): String 
        }
       
        type Link {
            linkID:ID
            active:Int
            title:String
            niceTitle:String
            photo:String
            text:String
            metaTitle:String
            metaDescription:String
        }

    `,
    resolvers
});

module.exports = linkSchema;
