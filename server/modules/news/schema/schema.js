const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server');
const resolvers              = require('../resolvers/resolvers.js');

const newsSchema = makeExecutableSchema({  
    typeDefs: gql`
    
        scalar Upload

        type Query {
            allNews(limit: Int,offset: Int,serachText: String,onlyActive:Boolean):[News]
            allNewsCount(serachText: String,onlyActive:Boolean):Int
            news(newsID:ID):News
        }

        type Mutation {
            addEditNews(
                newsID:ID,
                title:String,
                url:String,
                photo:Upload,
                active:Int,
                text:String,
            ):News
            deleteNews(newsIDs: ID): String 
            updateNewsPriorities(newsID: ID,fromIndex:ID,toIndex:ID):String
        }
       
        type News {
            newsID:ID
            active:Int
            title:String
            url:String
            photo:String
            text:String
        }

    `,
    resolvers
});

module.exports = newsSchema;
