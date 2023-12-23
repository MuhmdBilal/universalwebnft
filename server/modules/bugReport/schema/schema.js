const {makeExecutableSchema} = require('@graphql-tools/schema');
const { gql }                = require('apollo-server');
const resolvers              = require('../resolvers/resolvers.js');

const partnershipRequestSchema = makeExecutableSchema({  
    typeDefs: gql`
    
        scalar Upload

        type Mutation {
            sendMobileCrashReport(data:MobileCrashData):String
            sendPerformanceReport(data:PerformanceData):String  
            sendBugReport(data:BugData):String  
        }
       
        input MobileCrashData {
            name: String
            crashLink: String
            device: String
            beforeCrash: String
            errorCode: String
            crashKind: String
            otherApps: String
            installedDrivers: String
            peripherals: String
        }

        input PerformanceData {
            name: String
            crashLink: String
            device: String
            beforeCrash: String
            errorCode: String
            graphicalSettings: String
            audioSettings: String
        }
        input BugData {
            name: String
            crashLink: String
            device: String
            beforeCrash: String
            expectToHappen: String
            reproduceSteps: String
            enabledSteps: String
        }

    `,
    resolvers
});

module.exports = partnershipRequestSchema;
