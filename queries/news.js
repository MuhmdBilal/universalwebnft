import { gql } from '@apollo/client';

export const GET_ALL_NEWS = gql`
    query AllNews($limit: Int, $offset: Int, $serachText:String, $onlyActive:Boolean){
        allNews(limit: $limit,offset: $offset,serachText: $serachText,onlyActive:$onlyActive){
            newsID
            active
            photo
            title
            url
        }
        allNewsCount(serachText: $serachText,onlyActive:$onlyActive)
    } 
`;

export const GET_NEWS = gql`
    query News($newsID: ID){
        news(newsID: $newsID){
            newsID
            active
            photo
            title
            url
            text
        }
    } 
`;

export const ADD_EDIT_NEWS = gql`
    mutation AddEditNews(
        $newsID:ID
        $title:String, 
        $photo:Upload,
        $active:Int,
        $text:String,
        $url:String,
    ){
        addEditNews(
            newsID:$newsID,
            title: $title,
            photo: $photo,
            active: $active,
            text:$text,
            url:$url,
        ){
            newsID
            active
            title
            photo
        }
    } 
`;

export const DELETE_NEWS = gql`
    mutation DeleteNews($newsIDs:ID){
        deleteNews(newsIDs:$newsIDs)
    } 
`;

export const UPDATE_NEWS_PRIORITIES = gql`
    mutation UpdateNewsPriorities($newsID:ID,$fromIndex:ID,$toIndex:ID){
        updateNewsPriorities(newsID:$newsID,fromIndex:$fromIndex,toIndex:$toIndex)
    } 
`;