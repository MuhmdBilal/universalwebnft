import {SetNotification} from '../notification/notification';
import { GET_ALL_ARTICLES,GET_ARTICLE } from '../../queries/blog';
import { useState } from 'react';

export const OpenImage = (e,formData,SetFormData,SetMainPhoto) =>{

    var photo = e.target.files[0];        
    var reader = new FileReader();

    reader.onload = () => {

        var dataURL = reader.result;
        SetMainPhoto(dataURL);
        SetFormData({...formData,photo:photo});
    };
    reader.readAsDataURL(photo);
}

export const FormHandle = (e,formData,SetForm) => {
	  
    const t = e.target;
    const v = t.type === 'checkbox' ? t.checked : t.value;
    const n = t.name;
    
    SetForm({...formData,[n]: v});
          
}

export const GetArticle = async (client,articleID,SetFormData,SetMainPhoto) => {

    var {data} = await client.query({ 
        query: GET_ARTICLE,
        errorPolicy:"all",
        variables:{articleID:articleID}, 
        fetchPolicy: 'network-only'
    });

    if(data)
    {
        SetFormData({
            title:data.article.title,
            active:data.article.active,
            perex:data.article.perex,
            text:data.article.text,
            photo:null,
            oldUrl:data.article.oldUrl,
            metaTitle:data.article.metaTitle,
            metaDescription:data.article.metaDescription,
        })
        SetMainPhoto("/api/article/stredni_" + data.article.photo);
    }

}

export const AddArticle = (AddEditArticle,formData,articleID,client) => {

    if((formData.photo != null && articleID == 0) || articleID != 0){
        if(formData.title != ""){
            if(formData.perex != ""){
                if(formData.text != ""){

                    AddEditArticle({
                        variables:{
                            articleID:       articleID,
                            title:           formData.title,
                            photo:           formData.photo,
                            active:          parseInt(formData.active),
                            perex:           formData.perex,
                            text:            formData.text,
                            oldUrl:          formData.oldUrl,
                            metaTitle:       formData.metaTitle,
                            metaDescription: formData.metaDescription
                        }
                    })
                }
                else
                    SetNotification(null,"Nevyplnili jste text",false,true,client);
            }
            else
                SetNotification(null,"Nevyplnili jste perex",false,true,client); 
        }
        else
            SetNotification(null,"Nevyplnili jste název článku",false,true,client);   
    }
    else
        SetNotification(null,"Nevybrali jste fotku",false,true,client);
}

export const UseDeleteArticle = (DelArticles) => {

    const [selectedArticles, SetSelectedArticle] = useState([]);
    const [showDeleteNotifi, SetShowDeleteNotifi] = useState(false);

    const SelectArticle = (e,articleID) => {

        var checked = e.target.checked;
        var arr = [...selectedArticles];

        if(!checked){
            for(let i in selectedArticles){
                if(selectedArticles[i] == articleID){
                    arr.splice(i,1);
                }
            }
        }else{
            arr = [articleID,...arr];
        }

        SetSelectedArticle(arr);
    }

    const DeleteArticles = (action) => {

        if(action){

            let articleIDs = selectedArticles.join(",");
            DelArticles({
                variables:{
                    articleIDs: articleIDs
                }
            })
        }
        SetShowDeleteNotifi(false); 
    }

    const ShowDelNotify = (client) => {
        if(selectedArticles.length > 0){
            SetShowDeleteNotifi(true);
        }else{
            SetNotification(null,'Nevybrali jste článek.',false,true,client);
        }
    }

    return{
        showDeleteNotifi,
        selectedArticles,
        showDeleteNotifi,
        SelectArticle,
        DeleteArticles,
        ShowDelNotify
    }
}

export const UpdateListAfterDelete = (cache, response,variables) => {

    var resp = response.data.deleteArticles.split(",");

    const { allArticles,allArticlesCount } = cache.readQuery({ query: GET_ALL_ARTICLES ,variables});
    var arr = [...allArticles];

    resp.forEach((it,ind) => {
        arr.forEach((item,index) => {
            if(item.articleID == it){
                arr = [...arr.slice(0,index),...arr.slice(index + 1)]
            }
        });
    }) 

    cache.writeQuery({ 
        query:GET_ALL_ARTICLES,
        variables,
        data:{
            allArticles: [...arr],
            allArticlesCount: allArticlesCount - resp.length
        } 
    });

}

export const UpdateList = (cache,response,listVariables,articleID) => {

    const { allArticles,allArticlesCount} = cache.readQuery({ query: GET_ALL_ARTICLES,variables:listVariables });
        
    if(!(articleID && articleID != 0))
    {
        const arr = [response.data.addEditArticle,...allArticles]   ;
        cache.writeQuery(
        { 
            query:GET_ALL_ARTICLES,
            variables:listVariables,
            data:{
                allArticles: arr,
                allArticlesCount: allArticlesCount + 1
            } 
        });

    }
    else
    {
        var arr = [...allArticles];
        
        arr.forEach((item,index) => {
            
            if(item.articleID == response.data.addEditArticle.articleID)
            {          
                
                if(response.data.addEditArticle.photo)
                {
                    arr[index]  = {
                        ...arr[index], 
                        articleID: response.data.addEditArticle.articleID,
                        active: response.data.addEditArticle.active,
                        title: response.data.addEditArticle.title,
                        niceTitle:response.data.addEditArticle.niceTitle,
                        photo : response.data.addEditArticle.photo
                    };
                }
                else
                {
                    arr[index]  = {
                        ...arr[index], 
                        articleID: response.data.addEditArticle.articleID,
                        active: response.data.addEditArticle.active,
                        title: response.data.addEditArticle.title,
                        niceTitle:response.data.addEditArticle.niceTitle
                    };
                }
            }
        });

        cache.writeQuery(
        { 
            query:GET_ALL_ARTICLES,
            variables:listVariables,
            data:{
                allArticles: arr,
                allArticlesCount
            } 
        });
    }

}