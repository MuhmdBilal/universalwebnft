const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');
const{GraphQLUpload} = require('graphql-upload');

const resolvers = {

	Upload: GraphQLUpload,
	Query:{
		partner: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return {};
				return await context.dataSources.partner.GetPartner(args.partnerID);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
        allPartners: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.partner.GetAllPartners(args.limit,args.offset,args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},
		allPartnersCount: async (source, args,context,info) => {
					
    		try{
                if(context.user == null)return 0;
				return await context.dataSources.partner.GetAllPartnersCount(args.searchText,args.onlyActive);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	},		
	},
	Mutation:{
		addEditPartner: async (source, args,context,info) => {
    		try{
				if(context.user != null){	
					var data = await context.dataSources.partner.AddEditPartner(args);										
					return data;
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		deletePartners: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.partner.DeletePartners(args.partnerIDs);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		updatePartnerPriorities: async (source, args,context,info) => {						
    		
    		try{
				if(context.user != null){					
					return await context.dataSources.partner.UpdatePriorities(args.partnerID,args.fromIndex,args.toIndex);
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
	}
}

module.exports = resolvers;