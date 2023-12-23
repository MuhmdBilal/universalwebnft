import { gql } from '@apollo/client';

export const GET_ALL_LINKS = gql`
    query AllLinks($limit: Int, $offset: Int, $serachText:String, $onlyActive:Boolean){
        allLinks(limit: $limit,offset: $offset,serachText: $serachText,onlyActive:$onlyActive){
            linkID
            active
            photo
            title
            niceTitle
        }
        allLinksCount(serachText: $serachText,onlyActive:$onlyActive)
    } 
`;

export const GET_LINK = gql`
    query Link($linkID: ID){
        link(linkID: $linkID){
            linkID
            active
            photo
            title
            niceTitle
            text
            metaTitle
            metaDescription
        }
    } 
`;

export const ADD_EDIT_LINK = gql`
    mutation AddEditLink(
        $linkID:ID
        $title:String, 
        $photo:Upload,
        $active:Int,
        $text:String,
        $metaTitle:String,
        $metaDescription:String
    ){
        addEditLink(
            linkID:$linkID,
            title: $title,
            photo: $photo,
            active: $active,
            text:$text,
            metaTitle:$metaTitle,
            metaDescription:$metaDescription
        ){
            linkID
            active
            title
            photo
        }
    } 
`;

export const DELETE_LINKS = gql`
    mutation DeleteLinks($linkIDs:ID){
        deleteLinks(linkIDs:$linkIDs)
    } 
`;

// data for webpage
export const GET_LINK_DATA = gql`
    query Link($linkID: ID){
        link(linkID: $linkID){
            linkID
            photo
            title
            niceTitle
            text
            metaTitle
            metaDescription
        }
        allLinks(limit: 100000,offset: 0,serachText: "",onlyActive:true){
            linkID
            title
            niceTitle
        }
    } 
`;
