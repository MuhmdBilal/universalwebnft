import {useState} from 'react';
import {useMutation} from '@apollo/client';
import Layout from "../layout/layout"
import usePartnershipRequest from '../scripts/partnershipRequest';
import Loading from '../components/loading';
import {SEND_PARTNERSHIP_REQUEST} from '../queries/partnershipRequest';
import { GetApolloErrorText } from '../scripts/helper';
import {GET_ALL_LINKS} from '../queries/link';
import {GetApolloClient} from '../config/next';

const INIT_FORM_DATA = {
    email:"",
    phone:"",
    partnershipType:0,
    brandName:"",
    aboutYou:"",
    twitter:"",
    telegram:"",
    discord:"",
    youtube:"",
    instagram:"",
    facebook:"",
    propose:"",
    file:null
}

const PartnershipRequest = ({head,isHomepage,allLinks}) => {

    const [success,SetSuccess] = useState("");

    var [SendPartnershipRequest,{loading,error:sendError}] = useMutation(SEND_PARTNERSHIP_REQUEST,{
        onCompleted:() => {
            SetSuccess("The form has been successfuly sent");
        }
    });

    const {
        formData,
        step,
        error,
        partnershipTypes,
        OpenFile,
        FormHandle,
        PreviousStep,
        CheckStep1,
        CheckStep2,
        CheckStep3,
        CheckStep4
    } = usePartnershipRequest(INIT_FORM_DATA,SendPartnershipRequest);

    if(sendError)
    {
        sendError = GetApolloErrorText(sendError);
    }

    return(
        <Layout 
            title = {head.title} 
            metaDescription = {head.metaDescription} 
            ogImage = {head.ogImage} 
            isHomepage={isHomepage} 
            footerLinks = {allLinks} 
            linkNameUrl = {head.linkNameUrl}
        >
            <div id="partnership-request" className="container page">
                <div className="row">
                    <div className="text-content">

                        <h1><span>Partnership request</span> <span>with universal island</span></h1>
                        
                        <p>Please use the form below to initiate a partnership process. Our team will get back to you within 2 business days in regards to your proposed plan.</p>
                        <p>Please use your official email ID if possible. We strongly prefer an organizational email over a public email such as Gmail or Yahoo.</p>
                        <p>Fill the contact form</p>

                        <div className="progress">
                            <div className="step">
                                <div className={"circle" + (step == 1 ? " selected" : "")}>1</div>
                                <div className="title">Contact details</div>
                            </div>
                            <div className="step">
                                <div className={"circle" + (step == 2 ? " selected" : "")}>2</div>
                                <div className="title">About you</div>
                            </div>
                            <div className="step">
                                <div className={"circle" + (step == 3 ? " selected" : "")}>3</div>
                                <div className="title">Your socials</div>
                            </div>
                            <div className="step">
                                <div className={"circle" + (step == 4 ? " selected" : "")}>4</div>
                                <div className="title">Proposal</div>
                            </div>
                        </div>

                        {loading ?
                            <Loading />
                        :
                            (success ?
                                <div className="alert alert-success text-center">{success}</div>
                            :
                                <div className="form">

                                    {step == 1 ?
                                        <>
                                            <div className="row">
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label className="required">Email</label>
                                                        <div>
                                                            <input type="text" name="email" value={formData.email} placeholder="Your email" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label className="required">Mobile number with country code</label>
                                                        <div>
                                                            <input type="text" name="phone" value={formData.phone} placeholder="Your phone number" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="text-right">
                                                <button onClick={() => CheckStep1()} className="btn btn-primary">Next</button>
                                            </div>
                                        </>
                                    :null}

                                    {step == 2 ?
                                        <>
                                            
                                            <div className="form-group">
                                                <label className="required">Are you an Influencer, a Project, a Platform or an Marketing agency?</label>
                                                <div>
                                                    <select name="partnershipType" value={formData.partnershipType} onChange={(e) => FormHandle(e)}>
                                                        {partnershipTypes.map((item,index) => (
                                                            <option key={index} value={index}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        
                                            <div className="form-group">
                                                <label className="required">Name of the Brand (Influencer, Project, Platform, Agency or Others)</label>
                                                <div>
                                                    <input type="text" name="brandName" value={formData.brandName} placeholder="Your answer" onChange={(e) => FormHandle(e)} />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="required">Please tell us something about you.</label>
                                                <div>
                                                    <textarea name="aboutYou" placeholder="Your answer" onChange={(e) => FormHandle(e)} >{formData.aboutYou}</textarea>
                                                </div>
                                            </div>
                                                
                                            <div className="text-right">
                                                <button onClick={() => PreviousStep()} className="btn btn-primary mr-1">Previous</button>
                                                <button onClick={() => CheckStep2()} className="btn btn-primary">Next</button>
                                            </div>
                                        </>
                                    :null}

                                    {step == 3 ?
                                        <>
                                            <div className="row">
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label>Twitter Handle</label>
                                                        <div>
                                                            <input type="text" name="twitter" value={formData.twitter} placeholder="URL adress" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label>Telegram Handle</label>
                                                        <div>
                                                            <input type="text" name="telegram" value={formData.telegram} placeholder="URL adress" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="row">
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label>Discord Group</label>
                                                        <div>
                                                            <input type="text" name="discord" value={formData.discord} placeholder="URL adress" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label>YouTube Channel</label>
                                                        <div>
                                                            <input type="text" name="youtube" value={formData.youtube} placeholder="URL adress" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="row">
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label>Instagram Handle</label>
                                                        <div>
                                                            <input type="text" name="instagram" value={formData.instagram} placeholder="URL adress" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-xs-12 item">
                                                    <div className="form-group">
                                                        <label>Facebook Page</label>
                                                        <div>
                                                            <input type="text" name="facebook" value={formData.facebook} placeholder="URL adress" onChange={(e) => FormHandle(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="text-right">
                                                <button onClick={() => PreviousStep()} className="btn btn-primary mr-1">Previous</button>
                                                <button onClick={() => CheckStep3()} className="btn btn-primary">Next</button>
                                            </div>
                                        </>
                                    :null}

                                    {step == 4 ?
                                        <>
                                            
                                            <div className="form-group">
                                                <label className="required">What is it that you propose?</label>
                                                <div>
                                                    <textarea name="propose" placeholder="Your answer" onChange={(e) => FormHandle(e)} >{formData.propose}</textarea>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label>Please attach any file you feel would be relevant to this proposal</label>
                                                <div>
                                                    <input type="file" name="file" onChange={(e) => OpenFile(e)} />
                                                </div>
                                            </div>
                                                
                                            <div className="text-right">
                                                <button onClick={() => PreviousStep()} className="btn btn-primary mr-1">Previous</button>
                                                <button onClick={() => CheckStep4()} className="btn btn-primary">Submit</button>
                                            </div>
                                        </>
                                    :null}

                                    {error || sendError ? 
                                        <div className="alert alert-danger">{error || sendError}</div>
                                    :null}
                                    {success ? 
                                        <div className="alert alert-success">{success}</div>
                                    :null}

                                </div>
                            )
                        }

                    </div>
                    <div className="img-panel">
                        <img src="/images/characters/universe_island_character_1_big.webp" />
                    </div>
                </div>
                <div className="glow page green"></div>
            </div>
        </Layout>
    )

}


export const getServerSideProps = async (ctx) => {

    var client = GetApolloClient();

    var hData = await client.query({
        query:GET_ALL_LINKS,
        variables:{
            limit:100000,
            offset:0,
            searchText:"",
            onlyActive:true
        },
        fetchPolicy: 'network-only',
    });

    return { 
        props:{
            allLinks: hData.data.allLinks,
            head: {
                title:"Partnership Request - UniverseIsland",
                metaDescription: "Please use the form below to initiate a partnership process. Our team will get back to you within two business days regarding your proposed plan.",
                ogImage:"/images/share.png",
                linkNameUrl:"partnership-request"
            },
            isHomepage:false
        }
    }
}

export default PartnershipRequest;