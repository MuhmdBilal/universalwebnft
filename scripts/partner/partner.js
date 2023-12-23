import {SetNotification} from '../notification/notification';
import { GET_ALL_PARTNERS,GET_PARTNER } from '../../queries/partner';
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

export const GetPartner = async (client,partnerID,SetFormData,SetMainPhoto) => {

    var {data} = await client.query({ 
        query: GET_PARTNER,
        errorPolicy:"all",
        variables:{partnerID:partnerID}, 
        fetchPolicy: 'network-only'
    });

    if(data)
    {
        SetFormData({
            title:data.partner.title,
            active:data.partner.active,
            url:data.partner.url,
            photo:null
        })
        SetMainPhoto("/api/partner/mala_" + data.partner.photo);
    }

}

export const AddPartner = (AddEditPartner,formData,partnerID,client) => {

    if((formData.photo != null && partnerID == 0) || partnerID != 0){

        //if(formData.url != ""){
            
            AddEditPartner({
                variables:{
                    partnerID:       partnerID,
                    title:           formData.title,
                    photo:           formData.photo,
                    active:          parseInt(formData.active),
                    url:             formData.url,
                }
            }) 
        //}
        //else
            //SetNotification(null,"Nevyplnili jste URL",false,true,client);  
    }
    else
        SetNotification(null,"Nevybrali jste fotku",false,true,client);
}

export const UseDeletePartner = (DelPartners) => {

    const [selectedPartners, SetSelectedPartner] = useState([]);
    const [showDeleteNotifi, SetShowDeleteNotifi] = useState(false);

    const SelectPartner = (e,partnerID) => {

        var checked = e.target.checked;
        var arr = [...selectedPartners];

        if(!checked){
            for(let i in selectedPartners){
                if(selectedPartners[i] == partnerID){
                    arr.splice(i,1);
                }
            }
        }else{
            arr = [partnerID,...arr];
        }

        SetSelectedPartner(arr);
    }

    const DeletePartners = (action) => {

        if(action){

            let partnerIDs = selectedPartners.join(",");
            DelPartners({
                variables:{
                    partnerIDs: partnerIDs
                }
            })
        }
        SetShowDeleteNotifi(false); 
    }

    const ShowDelNotify = (client) => {
        if(selectedPartners.length > 0){
            SetShowDeleteNotifi(true);
        }else{
            SetNotification(null,'Nevybrali jste článek.',false,true,client);
        }
    }

    return{
        showDeleteNotifi,
        selectedPartners,
        showDeleteNotifi,
        SelectPartner,
        DeletePartners,
        ShowDelNotify
    }
}

export const UpdateListAfterDelete = (cache, response,variables) => {

    var resp = response.data.deletePartners.split(",");

    const { allPartners,allPartnersCount } = cache.readQuery({ query: GET_ALL_PARTNERS ,variables});
    var arr = [...allPartners];

    resp.forEach((it,ind) => {
        arr.forEach((item,index) => {
            if(item.partnerID == it){
                arr = [...arr.slice(0,index),...arr.slice(index + 1)]
            }
        });
    }) 

    cache.writeQuery({ 
        query:GET_ALL_PARTNERS,
        variables,
        data:{
            allPartners: [...arr],
            allPartnersCount: allPartnersCount - resp.length
        } 
    });

}

export const UpdateList = (cache,response,listVariables,partnerID) => {

    const { allPartners,allPartnersCount} = cache.readQuery({ query: GET_ALL_PARTNERS,variables:listVariables });
        
    if(!(partnerID && partnerID != 0))
    {
        const arr = [response.data.addEditPartner,...allPartners]   ;
        cache.writeQuery(
        { 
            query:GET_ALL_PARTNERS,
            variables:listVariables,
            data:{
                allPartners: arr,
                allPartnersCount: allPartnersCount + 1
            } 
        });

    }
    else
    {
        var arr = [...allPartners];
        
        arr.forEach((item,index) => {
            
            if(item.partnerID == response.data.addEditPartner.partnerID)
            {          
                
                if(response.data.addEditPartner.photo)
                {
                    arr[index]  = {
                        ...arr[index], 
                        partnerID: response.data.addEditPartner.partnerID,
                        active: response.data.addEditPartner.active,
                        title: response.data.addEditPartner.title,
                        url:response.data.addEditPartner.url,
                        photo : response.data.addEditPartner.photo
                    };
                }
                else
                {
                    arr[index]  = {
                        ...arr[index], 
                        partnerID: response.data.addEditPartner.partnerID,
                        active: response.data.addEditPartner.active,
                        title: response.data.addEditPartner.title,
                        url:response.data.addEditPartner.url
                    };
                }
            }
        });

        cache.writeQuery(
        { 
            query:GET_ALL_PARTNERS,
            variables:listVariables,
            data:{
                allPartners: arr,
                allPartnersCount
            } 
        });
    }

}