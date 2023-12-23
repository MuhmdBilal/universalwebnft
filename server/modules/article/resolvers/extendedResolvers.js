const {ApolloError} = require('apollo-server-micro');
const resolvers = {  
	Article:{
		nextArticle:{
			
			async resolve(article, args, context, info) {
				
                try{
                    return await context.dataSources.article.GetNextArticle(article.priority);
                }catch(err){
                    throw new ApolloError(err);
                }
			}
		},
		previousArticle:{
			async resolve(article, args, context, info) {
				
                try{
                    return await context.dataSources.article.GetPreviousArticle(article.priority);
                }catch(err){
                    throw new ApolloError(err);
                }
			}
		}
	}
}

module.exports = resolvers;