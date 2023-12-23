import React,{ Component } from 'react';

const Error = ({text}) => {
	
    return (
    	<div className="admin-alert danger">	
    		{text}
    	</div>
    );
  
  
}

export default Error;
