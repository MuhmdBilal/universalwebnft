const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');
const{GraphQLUpload} = require('graphql-upload');

const resolvers = {

	Upload: GraphQLUpload,
	Query:{
		news: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return {};
				return await context.dataSources.news.GetNews(args.newsID);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
        allNews: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.news.GetAllNews(args.limit,args.offset,args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		allNewsCount: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return 0;
				return await context.dataSources.news.GetAllNewsCount(args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},		
	},
	Mutation:{
		addEditNews: async (source, args,context,info) => {
    		try{
				if(context.user != null){	
					var data = await context.dataSources.news.AddEditNews(args);										
					return data;
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		deleteNews: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.news.DeleteNews(args.newsIDs);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		updateNewsPriorities: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.news.UpdatePriorities(args.newsID,args.fromIndex,args.toIndex);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
	}
}

module.exports = resolvers;