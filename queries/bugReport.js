import { gql } from '@apollo/client';

export const SEND_MOBILE_CRASH_REPORT = gql`
    mutation SendMobileCrashReport($data:MobileCrashData){
        sendMobileCrashReport(data:$data)
    } 
`;
export const SEND_PERFORMANCE_REPORT = gql`
    mutation SendPerformanceReport($data:PerformanceData){
        sendPerformanceReport(data:$data)
    } 
`;

export const SEND_BUG_REPORT = gql`
    mutation SendBugReport($data:BugData){
        sendBugReport(data:$data)
    } 
`;


