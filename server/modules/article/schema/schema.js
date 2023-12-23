const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server');
const resolvers              = require('../resolvers/resolvers.js');

const articleSchema = makeExecutableSchema({  
    typeDefs: gql`
    
        scalar Upload

        type Query {
            allArticles(limit: Int,offset: Int,serachText: String,onlyActive:Boolean):[Article]
            allArticlesCount(serachText: String,onlyActive:Boolean):Int
            article(articleID:ID):Article
            nextArticle(priority:ID):Article
            previousArticle(priority:ID):Article
            articleByUrl(url:String):Article
            homepageArticles:[Article]
        }

        type Mutation {
            addEditArticle(
                articleID:ID,
                title:String,
                photo:Upload,
                active:Int,
                perex:String,
                text:String,
                oldUrl:String,
                metaTitle:String,
                metaDescription:String
            ):Article
            deleteArticles(articleIDs: ID): String 
            updateArticlePriorities(articleID: ID,fromIndex:ID,toIndex:ID):String
        }
       
        type Article {
            articleID:ID
            active:Int
            title:String
            niceTitle:String
            photo:String
            perex:String
            text:String
            oldUrl:String,
            metaTitle:String
            metaDescription:String
            nextArticle:Article
            previousArticle:Article
        }

    `,
    resolvers
});

module.exports = articleSchema;
