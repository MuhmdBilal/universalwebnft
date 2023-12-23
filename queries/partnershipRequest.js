import { gql } from '@apollo/client';

export const SEND_PARTNERSHIP_REQUEST = gql`
    mutation SendPartnershipRequest($data:PartnershipData){
        sendPartnershipRequest(data:$data)
    } 
`;