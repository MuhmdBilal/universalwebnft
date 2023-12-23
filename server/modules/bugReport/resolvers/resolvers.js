const {ApolloError} = require('apollo-server-micro');
const{GraphQLUpload} = require('graphql-upload');

const resolvers = {
	
	Mutation:{
		sendMobileCrashReport: async (source, args,context,info) => {
    		try{
				
                var data = await context.dataSources.bugReport.SendMobileCrashReport(args.data);										
                return data;
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
        sendPerformanceReport: async (source, args,context,info) => {
    		try{
				
                var data = await context.dataSources.bugReport.SendPerformanceReport(args.data);										
                return data;
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
        sendBugReport: async (source, args,context,info) => {
    		try{
				
                var data = await context.dataSources.bugReport.SendBugReport(args.data);										
                return data;
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
	
	}
}

module.exports = resolvers;