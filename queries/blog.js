import { gql } from '@apollo/client';

export const GET_ALL_ARTICLES = gql`
    query AllArticles($limit: Int, $offset: Int, $serachText:String, $onlyActive:Boolean){
        allArticles(limit: $limit,offset: $offset,serachText: $serachText,onlyActive:$onlyActive){
            articleID
            active
            photo
            title
            niceTitle
        }
        allArticlesCount(serachText: $serachText,onlyActive:$onlyActive)
    } 
`;

export const GET_ARTICLE = gql`
    query Article($articleID: ID){
        article(articleID: $articleID){
            articleID
            active
            photo
            title
            perex
            text
            oldUrl
            metaTitle
            metaDescription
        }
    } 
`;
export const ADD_EDIT_ARTICLE = gql`
    mutation AddEditArticle(
        $articleID:ID
        $title:String, 
        $photo:Upload,
        $active:Int,
        $perex:String,
        $text:String,
        $oldUrl:String,
        $metaTitle:String,
        $metaDescription:String
    ){
        addEditArticle(
            articleID:$articleID,
            title: $title,
            photo: $photo,
            active: $active,
            perex:$perex,
            text:$text,
            oldUrl:$oldUrl,
            metaTitle:$metaTitle,
            metaDescription:$metaDescription
        ){
            articleID
            active
            title
            niceTitle
            photo
        }
    } 
`;

export const DELETE_ARTICLES = gql`
    mutation DeleteArticles($articleIDs:ID){
        deleteArticles(articleIDs:$articleIDs)
    } 
`;

export const UPDATE_ARTICLE_PRIORITIES = gql`
    mutation UpdateArticlePriorities($articleID:ID,$fromIndex:ID,$toIndex:ID){
        updateArticlePriorities(articleID:$articleID,fromIndex:$fromIndex,toIndex:$toIndex)
    } 
`;

//data for webpage

export const GET_ARTICLE_DATA = gql`
    query Article($articleID: ID){
        article(articleID: $articleID){
            articleID
            active
            photo
            title
            niceTitle
            perex
            text
            oldUrl
            metaTitle
            metaDescription
            previousArticle{
                title
                niceTitle
                articleID
            }
            nextArticle{
                title
                niceTitle
                articleID
            }
        }
        allLinks(limit: 100000,offset: 0,serachText: "",onlyActive:true){
            linkID
            title
            niceTitle
        }
    } 
`;
export const GET_ARTICLE_BY_URL = gql`
    query ArticleByUrl($url: String){
        articleByUrl(url: $url){
            articleID
            active
            photo
            title
            niceTitle
            perex
            text
            oldUrl
            metaTitle
            metaDescription
        }
    } 
`;