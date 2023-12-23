const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server-micro');
const resolvers              = require('../resolvers/resolvers.js');

const adminUserSchema = makeExecutableSchema({  
    typeDefs: gql`
        type Query {
            adminUser : AdminUser!
        }
        type Mutation {
            adminLogin(email: String!,password: String!): AdminLogin 
            changePassword(oldPassword:String,newPassword:String):String
        }
        
        type AdminUser {
            adminUserID: ID!
            name: String
            surname: String
            email: String
        }
        
        type AdminLogin {
            loginToken: String!
            adminUser: AdminUser
        }
    `,
    resolvers
});


module.exports = adminUserSchema;