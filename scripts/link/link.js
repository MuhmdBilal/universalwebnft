import {SetNotification} from '../notification/notification';
import { GET_ALL_LINKS,GET_LINK } from '../../queries/link';
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

export const GetLink = async (client,linkID,SetFormData,SetMainPhoto) => {

    var {data} = await client.query({ 
        query: GET_LINK,
        errorPolicy:"all",
        variables:{linkID:linkID}, 
        fetchPolicy: 'network-only'
    });

    if(data)
    {
        SetFormData({
            title:data.link.title,
            active:data.link.active,
            text:data.link.text,
            photo:null,
            metaTitle:data.link.metaTitle,
            metaDescription:data.link.metaDescription,
        })
        if(data.link.photo)
            SetMainPhoto("/api/link/stredni_" + data.link.photo);
        else 
            SetMainPhoto("");
    }

}

export const AddLink = (AddEditLink,formData,linkID,client) => {

    
    if(formData.title != ""){
        if(formData.text != ""){

            AddEditLink({
                variables:{
                    linkID:       linkID,
                    title:           formData.title,
                    photo:           formData.photo,
                    active:          parseInt(formData.active),
                    text:            formData.text,
                    metaTitle:       formData.metaTitle,
                    metaDescription: formData.metaDescription
                }
            })
        }
        else
            SetNotification(null,"Nevyplnili jste text",false,true,client);
    }
    else
        SetNotification(null,"Nevyplnili jste název odkazu",false,true,client);   

}

export const UseDeleteLink = (DelLinks) => {

    const [selectedLinks, SetSelectedLink] = useState([]);
    const [showDeleteNotifi, SetShowDeleteNotifi] = useState(false);

    const SelectLink = (e,linkID) => {

        var checked = e.target.checked;
        var arr = [...selectedLinks];

        if(!checked){
            for(let i in selectedLinks){
                if(selectedLinks[i] == linkID){
                    arr.splice(i,1);
                }
            }
        }else{
            arr = [linkID,...arr];
        }

        SetSelectedLink(arr);
    }

    const DeleteLinks = (action) => {

        if(action){

            let linkIDs = selectedLinks.join(",");
            DelLinks({
                variables:{
                    linkIDs: linkIDs
                }
            })
        }
        SetShowDeleteNotifi(false); 
    }

    const ShowDelNotify = (client) => {
        if(selectedLinks.length > 0){
            SetShowDeleteNotifi(true);
        }else{
            SetNotification(null,'Nevybrali jste článek.',false,true,client);
        }
    }

    return{
        showDeleteNotifi,
        selectedLinks,
        showDeleteNotifi,
        SelectLink,
        DeleteLinks,
        ShowDelNotify
    }
}

export const UpdateListAfterDelete = (cache, response,variables) => {

    var resp = response.data.deleteLinks.split(",");

    const { allLinks,allLinksCount } = cache.readQuery({ query: GET_ALL_LINKS ,variables});
    var arr = [...allLinks];

    resp.forEach((it,ind) => {
        arr.forEach((item,index) => {
            if(item.linkID == it){
                arr = [...arr.slice(0,index),...arr.slice(index + 1)]
            }
        });
    }) 

    cache.writeQuery({ 
        query:GET_ALL_LINKS,
        variables,
        data:{
            allLinks: [...arr],
            allLinksCount: allLinksCount - resp.length
        } 
    });

}

export const UpdateList = (cache,response,listVariables,linkID) => {

    const { allLinks,allLinksCount} = cache.readQuery({ query: GET_ALL_LINKS,variables:listVariables });
        
    if(!(linkID && linkID != 0))
    {
        const arr = [response.data.addEditLink,...allLinks]   ;
        cache.writeQuery(
        { 
            query:GET_ALL_LINKS,
            variables:listVariables,
            data:{
                allLinks: arr,
                allLinksCount: allLinksCount + 1
            } 
        });

    }
    else
    {
        var arr = [...allLinks];
        
        arr.forEach((item,index) => {
            
            if(item.linkID == response.data.addEditLink.linkID)
            {          
                
                if(response.data.addEditLink.photo)
                {
                    arr[index]  = {
                        ...arr[index], 
                        linkID: response.data.addEditLink.linkID,
                        active: response.data.addEditLink.active,
                        title: response.data.addEditLink.title,
                        photo : response.data.addEditLink.photo
                    };
                }
                else
                {
                    arr[index]  = {
                        ...arr[index], 
                        linkID: response.data.addEditLink.linkID,
                        active: response.data.addEditLink.active,
                        title: response.data.addEditLink.title
                    };
                }
            }
        });

        cache.writeQuery(
        { 
            query:GET_ALL_LINKS,
            variables:listVariables,
            data:{
                allLinks: arr,
                allLinksCount
            } 
        });
    }

}