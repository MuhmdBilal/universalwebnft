const jwt = require('jsonwebtoken');
const {ApolloError} = require('apollo-server-micro');

const resolvers = {
	Query:{
        adminUser: async (source, args,context,info) => {
					
    		try{
				return await context.dataSources.adminUser.getAdminUser(args.adminUserID);
    		}catch(err){
    			throw new ApolloError(err);
    		}
    	}		
	},
    Mutation:{
    	adminLogin: async (source, args,context,info) => {
				
    		try{
				const user = await context.dataSources.adminUser.adminLogin(args.email,args.password);
				if(user){

					const token = jwt.sign({adminUserID:user.adminUserID,isAdminLogin:true},context.jwtSecretKey);
					return {
						loginToken: token,
						adminUser: user
					};

				}else{
					return {
						loginToken: '',
						adminUser: null
					};
				}
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
		changePassword: async (source, args,context,info) => {
						
    		try{

				if(context.user != null){	

					var data = await context.dataSources.adminUser.ChangePassword(args.oldPassword,args.newPassword,context.user.adminUserID);
					return data;
				}

				return "";
				
				
    		}catch(err){
    			throw new ApolloError(err);
    		}
    		
		},
    }		
}

module.exports = resolvers;