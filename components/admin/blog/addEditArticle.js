import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Editor } from '@tinymce/tinymce-react';
import {OpenImage,FormHandle,GetArticle,AddArticle,UpdateList} from '../../../scripts/blog/article';
import {useMutation} from '@apollo/client';
import { withApollo } from '@apollo/client/react/hoc';
import { ADD_EDIT_ARTICLE } from '../../../queries/blog';
import { SetNotification } from '../../../scripts/notification/notification';
import { GetApolloErrorText } from '../../../scripts/helper';
import Loading from '../../loading';
import Error from '../../error';

Modal.setAppElement("#modal-root");

const INIT_FORM_DATA = {
    title:"",
    active:1,
    perex:"",
    text:"",
    oldUrl:"",
    photo:null,
    metaTitle:"",
    metaDescription:""
}

const AddEditArticle = ({SetShow,articleID,client,listVariables}) => {

    const [mainPhoto, SetMainPhoto] = useState("");
    const [formData,SetFormData] = useState(INIT_FORM_DATA);

    const [AddEditArticle,{loading,error}] = useMutation(ADD_EDIT_ARTICLE,{
        onCompleted:(data) => {
            
            SetNotification(null,"Úspěšně uloženo",true,false,client);
            
        },
        update:(cache,response) => {
            UpdateList(cache,response,listVariables,articleID);
            SetFormData(INIT_FORM_DATA);
            SetMainPhoto("");
            SetShow(false);
        }
    });

    useEffect(() => {

        if(articleID != 0)
        {
            GetArticle(client,articleID,SetFormData,SetMainPhoto);
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
                    <h3>{articleID != 0 ? "Upravit článek" : "Přidat článek"}</h3>
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
                                            <div className="col-4">
                                                <div className="add-article-img">
                                                    <img className = "w-100" src={mainPhoto} />     
                                                </div>       
                                            </div>
                                            <div className="col-8">

                                                <div className="form-group">
                                                    <label className="required">Název článku</label>
                                                    <div>
                                                        <input type="text" name="title" value={formData.title} onChange={(e) => FormHandle(e,formData,SetFormData)} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="required">Aktivní</label>
                                                    <div>
                                                        <input onChange={(e) => FormHandle(e,formData,SetFormData)} checked={(formData.active == 1)} type="radio" name="active" value="1" htmlFor="activeYes"  /> <label id="activeYes">Ano</label>
                                                        <input onChange={(e) => FormHandle(e,formData,SetFormData)} checked={(formData.active == 0)} type="radio" name="active" value="0" htmlFor="activeNo" /> <label id="activeNo">Ne</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="required">Perex</label>
                                            <Editor
                                                name="perex"
                                                apiKey = '9z3phhnyq7jkeeqztql1euovfotvpd2gdduygtdpk14wu4ij'
                                                value={formData.perex}
                                                init={{
                                                    plugins: 'link code paste emoticons',
                                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect | link | blockquote | emoticons | code',
                                                    paste_as_text: true,
                                                    language_url : '/langs/cs.js',
                                                    language: "cs",
                                                    link_assume_external_targets: true,
                                                }}
                                                onEditorChange={(content) => SetFormData({...formData,perex:content})}
                                            />
                                            
                                        </div>
                                        <div className="form-group">
                                            <label className="required">Text</label>
                                            <Editor
                                                name="perex"
                                                apiKey = '9z3phhnyq7jkeeqztql1euovfotvpd2gdduygtdpk14wu4ij'
                                                value={formData.text}
                                                init={{
                                                    plugins: 'link code paste emoticons',
                                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | formatselect | link | blockquote | emoticons | code',
                                                    paste_as_text: true,
                                                    language_url : '/langs/cs.js',
                                                    language: "cs",
                                                    link_assume_external_targets: true,
                                                }}
                                                onEditorChange={(content) => SetFormData({...formData,text:content})}
                                            />
                                        </div>

                                        <hr />

                                        <div className="form-group">
                                            <label>URL článku z původního webu</label>
                                            <div>
                                                <input type="text" name="oldUrl" value={formData.oldUrl} onChange={(e) => FormHandle(e,formData,SetFormData)} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Meta title</label>
                                            <div>
                                                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={(e) => FormHandle(e,formData,SetFormData)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Meta description</label>
                                            <div>
                                                <input type="text" name="metaDescription" value={formData.metaDescription} onChange={(e) => FormHandle(e,formData,SetFormData)} />
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
                        <button type="button" className="btn btn-primary smaller" onClick={() => AddArticle(AddEditArticle,formData,articleID,client)}>{(articleID && articleID != 0 ? "Uložit" : "Přidat")}</button>
                        <button type="button" className="btn btn-red smaller" onClick={() => SetShow(false)}>Zavřít</button>
                    </div>
                :null}

            </div>
        </Modal>
    )

}

export default withApollo(AddEditArticle);