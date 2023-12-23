import { gql } from '@apollo/client';

export const GET_ALL_PARTNERS = gql`
    query AllPartners($limit: Int, $offset: Int, $serachText:String, $onlyActive:Boolean){
        allPartners(limit: $limit,offset: $offset,serachText: $serachText,onlyActive:$onlyActive){
            partnerID
            active
            photo
            title
            url
        }
        allPartnersCount(serachText: $serachText,onlyActive:$onlyActive)
    } 
`;

export const GET_PARTNER = gql`
    query Partner($partnerID: ID){
        partner(partnerID: $partnerID){
            partnerID
            active
            photo
            title
            url
        }
    } 
`;

export const ADD_EDIT_PARTNER = gql`
    mutation AddEditPartner(
        $partnerID:ID
        $title:String, 
        $photo:Upload,
        $active:Int,
        $url:String
    ){
        addEditPartner(
            partnerID:$partnerID,
            title: $title,
            photo: $photo,
            active: $active,
            url:$url
        ){
            partnerID
            active
            title
            url
            photo
        }
    } 
`;

export const DELETE_PARTNERS = gql`
    mutation DeletePartners($partnerIDs:ID){
        deletePartners(partnerIDs:$partnerIDs)
    } 
`;

export const UPDATE_PARTNER_PRIORITIES = gql`
    mutation UpdatePartnerPriorities($partnerID:ID,$fromIndex:ID,$toIndex:ID){
        updatePartnerPriorities(partnerID:$partnerID,fromIndex:$fromIndex,toIndex:$toIndex)
    } 
`;