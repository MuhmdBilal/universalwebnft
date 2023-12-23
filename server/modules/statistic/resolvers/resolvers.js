const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');

const resolvers = {
	Query:{
        getStatisticData: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.statistic.GetStatisticData();
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	}		
	},
    Mutation:{
    	incrementStatisticValue: async (source, args,context,info) => {

    		try{
				console.log(args.type);
				var data = await context.dataSources.statistic.IncrementStatisticValue(args.type);										
				return data;
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
    }		
}

module.exports = resolvers;