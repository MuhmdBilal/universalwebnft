import React from 'react';
import {useQuery } from '@apollo/client';
import { withApollo } from '@apollo/client/react/hoc';
import {GET_NOTIFICATIONS} from '../queries/notification';


const Notification = ({client}) => {

    const {data} = useQuery(GET_NOTIFICATIONS);
	      
    setTimeout(() => {
        
        const dataNotify = client.cache.readQuery({ query: GET_NOTIFICATIONS });
        if(dataNotify && dataNotify.notifications.length > 0)client.writeQuery({
            query: GET_NOTIFICATIONS,
            data:{
                notifications:dataNotify.notifications.slice(0,-1)
            }
        })
        
    },6000)

    return(
        <div id="notification">
            {data && data.notifications && data.notifications.map((item,index) => (
                <div className="notify" key={index}>
                    {item.error &&
                        <div className="admin-alert danger text-center">{item.text}</div>
                    }
                    {item.success &&
                        <div className="admin-alert success text-center">{item.text}</div>
                    }
                    
                </div>
            ))}
        </div>
    );

                
}


export default withApollo(Notification);
