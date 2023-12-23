import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Editor } from '@tinymce/tinymce-react';
import {OpenImage,FormHandle,GetPartner,AddPartner,UpdateList} from '../../../scripts/partner/partner';
import {useMutation} from '@apollo/client';
import { withApollo } from '@apollo/client/react/hoc';
import { ADD_EDIT_PARTNER } from '../../../queries/partner';
import { SetNotification } from '../../../scripts/notification/notification';
import { GetApolloErrorText } from '../../../scripts/helper';
import Loading from '../../loading';
import Error from '../../error';

Modal.setAppElement("#modal-root");

const INIT_FORM_DATA = {
    title:"",
    active:1,
    url:"",
    photo:null
}

const AddEditPartner = ({SetShow,partnerID,client,listVariables}) => {

    const [mainPhoto, SetMainPhoto] = useState("");
    const [formData,SetFormData] = useState(INIT_FORM_DATA);

    const [AddEditPartner,{loading,error}] = useMutation(ADD_EDIT_PARTNER,{
        onCompleted:(data) => {
            
            SetNotification(null,"Úspěšně uloženo",true,false,client);
            
        },
        update:(cache,response) => {
            UpdateList(cache,response,listVariables,partnerID);
            SetFormData(INIT_FORM_DATA);
            SetMainPhoto("");
            SetShow(false);
        }
    });

    useEffect(() => {

        if(partnerID != 0)
        {
            GetPartner(client,partnerID,SetFormData,SetMainPhoto);
        }

    },[])
   
    var err = "";
    if(error)
        err = GetApolloErrorText(error);

    return(
        <Modal
            isOpen = {true}
            onRequestClose={() => SetShow(false)}
        >
            <div id="admin-modal-content">

                <div className="header">
                    <h3>{partnerID != 0 ? "Upravit článek" : "Přidat článek"}</h3>
                    <button onClick={() => SetShow(false)} className="close-button ml-auto"></button>
                </div>
                <div className="content">

                    {loading ?
                        <Loading />
                    :
                        (err ?
                            <Error text={err} /> 
                        :
                            <>
                                <div className="form-group">                           
                                    <label className="required" htmlFor="customFile">Vyberte fotku</label>
                                    <div className="custom-file">
                                                                
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="customFile"
                                            name="file"
                                            required
                                            multiple
                                            onChange={(e) => OpenImage(e,formData,SetFormData,SetMainPhoto)}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">Vyberte fotku</label>
                                    </div>
                                </div>

                                {mainPhoto ?

                                    <>
                                        <div className="row form-group">
                                            <div className="col-3">
                                                <div className="add-article-img h-100">
                                                    <img className = "w-50" src={mainPhoto} />     
                                                </div>       
                                            </div>
                                            <div className="col-9">

                                                <div className="form-group">
                                                    <label>Název partnera</label>
                                                    <div>
                                                        <input type="text" name="title" value={formData.title} onChange={(e) => FormHandle(e,formData,SetFormData)} />
                                                    </div>
                                                </div>
                                                {false ?
                                                    <div className="form-group">
                                                        <label className="required">URL</label>
                                                        <div>
                                                            <input type="text" name="url" value={formData.url} onChange={(e) => FormHandle(e,formData,SetFormData)} />
                                                        </div>
                                                    </div>
                                                :null}
                                                <div className="form-group">
                                                    <label className="required">Aktivní</label>
                                                    <div>
                                                        <input onChange={(e) => FormHandle(e,formData,SetFormData)} checked={(formData.active == 1)} type="radio" name="active" value="1" htmlFor="activeYes"  /> <label id="activeYes">Ano</label>
                                                        <input onChange={(e) => FormHandle(e,formData,SetFormData)} checked={(formData.active == 0)} type="radio" name="active" value="0" htmlFor="activeNo" /> <label id="activeNo">Ne</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                :null}
                            </>
                        )
                    }
                                       
                </div>
                {!loading && !err ?
                    <div className="footer">
                        <button type="button" className="btn btn-primary smaller" onClick={() => AddPartner(AddEditPartner,formData,partnerID,client)}>{(partnerID && partnerID != 0 ? "Uložit" : "Přidat")}</button>
                        <button type="button" className="btn btn-red smaller" onClick={() => SetShow(false)}>Zavřít</button>
                    </div>
                :null}

            </div>
        </Modal>
    )

}

export default withApollo(AddEditPartner);