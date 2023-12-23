import {GET_NOTIFICATIONS} from '../../queries/notification';
 
export const SetNotification = (cache,text,success,error,client) => {
 
    cache = cache || client;
    
    const data = cache.readQuery({ query: GET_NOTIFICATIONS });

    if(data)
    {
        cache.writeQuery({ 
            query:GET_NOTIFICATIONS,
            data:{
                notifications: [{text,success,error,__typename:"Notification"},...data.notifications]
            } 
        });
    }
    else
    {
        cache.writeQuery({ 
            query:GET_NOTIFICATIONS,
            data:{
                notifications: [{text,success,error,__typename:"Notification"}]
            } 
        });
    }

}
