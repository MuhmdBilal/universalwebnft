const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server-micro');
const resolvers              = require('../resolvers/resolvers.js');

const gameSchema = makeExecutableSchema({  
    typeDefs: gql`
        type Query {
            gameData : GameData
        }
        type Mutation {
            updateGameData(gameData: GameDataInput): String 
        }
        
        type GameData {
            androidUrl: String
            iPhoneUrl: String
            macUrl: String
            winUrl: String
        }
        
        input GameDataInput {
            androidUrl: String
            iPhoneUrl: String
            macUrl: String
            winUrl: String
        }
    `,
    resolvers
});


module.exports = gameSchema;