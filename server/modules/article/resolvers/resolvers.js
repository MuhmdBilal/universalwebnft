const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');
const{GraphQLUpload} = require('graphql-upload');

const resolvers = {

	Upload: GraphQLUpload,
	Query:{
		article: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.article.GetArticle(args.articleID);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		nextArticle: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.article.GetNextArticle(args.priority);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		previousArticle: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.article.GetPreviousArticle(args.priority);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		articleByUrl: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.article.GetArticleByUrl(args.url);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
        allArticles: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return [];
				return await context.dataSources.article.GetAllArticles(args.limit,args.offset,args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		allArticlesCount: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return 0;
				return await context.dataSources.article.GetAllArticlesCount(args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},	
		homepageArticles: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.article.GetHomepageArticles();
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	}
	},
	Mutation:{
		addEditArticle: async (source, args,context,info) => {
    		try{
				if(context.user != null){	
					var data = await context.dataSources.article.AddEditArticle(args);										
					return data;
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		deleteArticles: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.article.DeleteArticles(args.articleIDs);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		updateArticlePriorities: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.article.UpdatePriorities(args.articleID,args.fromIndex,args.toIndex);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
	}
}

module.exports = resolvers;