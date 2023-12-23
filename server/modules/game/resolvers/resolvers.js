const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');

const resolvers = {
	Query:{
        gameData: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.gameData.GetGameData();
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	}		
	},
    Mutation:{
    	updateGameData: async (source, args,context,info) => {

    		try{
				if(context.user != null){	
					var data = await context.dataSources.gameData.UpdateGameData(args.gameData);										
					return data;
				}
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
    }		
}

module.exports = resolvers;