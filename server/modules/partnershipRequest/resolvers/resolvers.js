const {ApolloError} = require('apollo-server-micro');
const{GraphQLUpload} = require('graphql-upload');

const resolvers = {

	Upload: GraphQLUpload,
	
	Mutation:{
		sendPartnershipRequest: async (source, args,context,info) => {
    		try{
				
                var data = await context.dataSources.partnershipRequest.SendPartnershipRequest(args.data);										
                return data;
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		}
	
	}
}

module.exports = resolvers;