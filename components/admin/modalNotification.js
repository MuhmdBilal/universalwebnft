import React,{ Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#modal-root");

const ModalNotification = ({callback,yesNo,text}) => {
	  	
    return (
    	<Modal
	        closeTimeoutMS={150}
	        isOpen={true}
	        onRequestClose={() => callback(false)}
	    >
	        <div id="admin-modal-content">
	          <div className="header">
	            <h3>Upozornění</h3>
	            <button onClick={() => callback(false)} className="close-button ml-auto"></button>
	          </div>
	          <div className="content">
	          
	                {yesNo ? 
                        <p className="text-center">{text}</p> 
                    : 
                        <div className="admin-alert alert-danger no-margin">{text}</div>
                    }	
	                    
	          </div>
			  {yesNo ? 
				<div className="footer"> 
					<button type="button" className="btn btn-primary smaller w-50" onClick={() => callback(true)}>ANO</button>
					<button type="button" className="btn btn-red smaller  w-50" onClick={() => callback(false)}>Ne</button>
				</div>
			  :
				<div className="footer"> 
					<button type="button" className="btn btn-red smaller" onClick={() => callback(false)}>Zavřít</button>
				</div>
			  }
	        </div>
	    </Modal>
    );
}


export default ModalNotification;
