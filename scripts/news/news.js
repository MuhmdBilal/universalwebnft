import {SetNotification} from '../notification/notification';
import { GET_ALL_NEWS,GET_NEWS } from '../../queries/news';
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

export const GetNews = async (client,newsID,SetFormData,SetMainPhoto) => {

    var {data} = await client.query({ 
        query: GET_NEWS,
        errorPolicy:"all",
        variables:{newsID:newsID}, 
        fetchPolicy: 'network-only'
    });

    if(data)
    {
        SetFormData({
            title:data.news.title,
            active:data.news.active,
            text:data.news.text,
            url:data.news.url,
            photo:null,
        })
        SetMainPhoto("/api/news/stredni_" + data.news.photo);
    }

}

export const AddNews = (AddEditNews,formData,newsID,client) => {

    if((formData.photo != null && newsID == 0) || newsID != 0){
        if(formData.title != ""){
            if(formData.text != ""){

                AddEditNews({
                    variables:{
                        newsID:       newsID,
                        title:        formData.title,
                        photo:        formData.photo,
                        active:       parseInt(formData.active),
                        url:          formData.url,
                        text:         formData.text,
                    }
                })
            }
            else
                SetNotification(null,"Nevyplnili jste text",false,true,client);
        }
        else
            SetNotification(null,"Nevyplnili jste název článku",false,true,client);   
    }
    else
        SetNotification(null,"Nevybrali jste fotku",false,true,client);
}

export const UseDeleteNews = (DelNews) => {

    const [selectedNews, SetSelectedNews] = useState([]);
    const [showDeleteNotifi, SetShowDeleteNotifi] = useState(false);

    const SelectNews = (e,newsID) => {

        var checked = e.target.checked;
        var arr = [...selectedNews];

        if(!checked){
            for(let i in selectedNews){
                if(selectedNews[i] == newsID){
                    arr.splice(i,1);
                }
            }
        }else{
            arr = [newsID,...arr];
        }

        SetSelectedNews(arr);
    }

    const DeleteNews = (action) => {

        if(action){

            let newsIDs = selectedNews.join(",");
            DelNews({
                variables:{
                    newsIDs: newsIDs
                }
            })
        }
        SetShowDeleteNotifi(false); 
    }

    const ShowDelNotify = (client) => {
        if(selectedNews.length > 0){
            SetShowDeleteNotifi(true);
        }else{
            SetNotification(null,'Nevybrali jste novinku.',false,true,client);
        }
    }

    return{
        showDeleteNotifi,
        selectedNews,
        showDeleteNotifi,
        SelectNews,
        DeleteNews,
        ShowDelNotify
    }
}

export const UpdateListAfterDelete = (cache, response,variables) => {

    var resp = response.data.deleteNews.split(",");

    const { allNews,allNewsCount } = cache.readQuery({ query: GET_ALL_NEWS ,variables});
    var arr = [...allNews];

    resp.forEach((it,ind) => {
        arr.forEach((item,index) => {
            if(item.newsID == it){
                arr = [...arr.slice(0,index),...arr.slice(index + 1)]
            }
        });
    }) 

    cache.writeQuery({ 
        query:GET_ALL_NEWS,
        variables,
        data:{
            allNews: [...arr],
            allNewsCount: allNewsCount - resp.length
        } 
    });

}

export const UpdateList = (cache,response,listVariables,newsID) => {

    const { allNews,allNewsCount} = cache.readQuery({ query: GET_ALL_NEWS,variables:listVariables });
        
    if(!(newsID && newsID != 0))
    {
        const arr = [response.data.addEditNews,...allNews]   ;
        cache.writeQuery(
        { 
            query:GET_ALL_NEWS,
            variables:listVariables,
            data:{
                allNews: arr,
                allNewsCount: allNewsCount + 1
            } 
        });

    }
    else
    {
        var arr = [...allNews];
        
        arr.forEach((item,index) => {
            
            if(item.newsID == response.data.addEditNews.newsID)
            {          
                
                if(response.data.addEditNews.photo)
                {
                    arr[index]  = {
                        ...arr[index], 
                        newsID: response.data.addEditNews.newsID,
                        active: response.data.addEditNews.active,
                        title: response.data.addEditNews.title,
                        url: response.data.addEditNews.url,
                        photo : response.data.addEditNews.photo
                    };
                }
                else
                {
                    arr[index]  = {
                        ...arr[index], 
                        newsID: response.data.addEditNews.newsID,
                        active: response.data.addEditNews.active,
                        title: response.data.addEditNews.title,
                        url: response.data.addEditNews.url,
                    };
                }
            }
        });

        cache.writeQuery(
        { 
            query:GET_ALL_NEWS,
            variables:listVariables,
            data:{
                allNews: arr,
                allNewsCount
            } 
        });
    }

}