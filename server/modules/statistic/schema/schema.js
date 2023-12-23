const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server-micro');
const resolvers              = require('../resolvers/resolvers.js');

const gameSchema = makeExecutableSchema({  
    typeDefs: gql`
        type Query {
            getStatisticData : Statistic
        }
        type Mutation {
            incrementStatisticValue(type: String): String 
        }
        
        type Statistic {
            macClickCount: Int
            winClickCount: Int
            iOSClickCount: Int
            androidClickCount: Int
        }
        
    `,
    resolvers
});


module.exports = gameSchema;