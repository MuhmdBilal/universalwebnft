const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');
const{GraphQLUpload} = require('graphql-upload');

const resolvers = {

	Upload: GraphQLUpload,
	Query:{
		link: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.link.GetLink(args.linkID);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
        allLinks: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.link.GetAllLinks(args.limit,args.offset,args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		allLinksCount: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return 0;
				return await context.dataSources.link.GetAllLinksCount(args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},		
	},
	Mutation:{
		addEditLink: async (source, args,context,info) => {
    		try{
				if(context.user != null){	
					var data = await context.dataSources.link.AddEditLink(args);										
					return data;
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		deleteLinks: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.link.DeleteLinks(args.linkIDs);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		}
	}
}

module.exports = resolvers;