import { gql } from '@apollo/client';

export const GET_HOMEPAGE_DATA = gql`
    query HomepageData{
        homepageArticles{
            articleID
            photo
            title
            niceTitle
            perex
        }
        allNews(limit: 100000,offset: 0,serachText: "",onlyActive:true){
            photo
            title
            text
            url
        }
        allPartners(limit: 100000,offset: 0,serachText: "",onlyActive:true){
            title
            photo
            url
        }
        gameData{
            androidUrl
            iPhoneUrl
            macUrl
            winUrl
        }
        allLinks(limit: 100000,offset: 0,serachText: "",onlyActive:true){
            linkID
            title
            niceTitle
        }
    } 
`;

export const SET_CLICK_COUNT = gql`
    mutation SetClickCount($type:String){
        incrementStatisticValue(type:$type)
    }
`;