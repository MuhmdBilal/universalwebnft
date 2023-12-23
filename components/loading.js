import React,{ Component } from 'react';

const Loading = ({displayText}) => {
	
    if(typeof displayText == "undefined"){
        displayText = true;
    }

    return (
        <div className="whole-loading">	
        <div className="loading"><div className="spinner"><div className="rect1"></div><div className="rect2"></div><div className="rect3"></div><div className="rect4"></div><div className="rect5"></div></div>{displayText && <div className="text">Zpracovávám...</div>}</div>
        </div>
    );
  

}


export default Loading;
