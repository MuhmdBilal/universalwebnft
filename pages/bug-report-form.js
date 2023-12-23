import {useState} from 'react';
import {useMutation} from '@apollo/client';
import Layout from "../layout/layout"
import { ScrollToElement } from "../scripts/helper"
import { useMobileCrashReport,usePerformanceReport,useBugReport } from '../scripts/bugReport';
import { SEND_MOBILE_CRASH_REPORT,SEND_PERFORMANCE_REPORT,SEND_BUG_REPORT } from '../queries/bugReport';
import Loading from '../components/loading';
import {GET_ALL_LINKS} from '../queries/link';
import {GetApolloClient} from '../config/next';

const INIT_MOBILE_CRASH_REPORT = {
    name:"",
    crashLink:"",
    device: "",
    beforeCrash: "",
    errorCode: "",
    crashKind: "",
    otherApps: "",
    installedDrivers: "",
    peripherals: ""
}
const INIT_PERFORMANCE_REPORT = {
    name:"",
    device: "",
    crashLink:"",
    beforeCrash: "",
    errorCode: "",
    graphicalSettings: "",
    audioSettings: ""
}
const INIT_BUG_REPORT = {
    name:"",
    device: "",
    crashLink:"",
    beforeCrash: "",
    expectToHappen: "",
    reproduceSteps: "",
    enabledSteps: ""
}

const BugReportForm = ({head,isHomepage,allLinks}) => {

    const [success,SetSuccess] = useState("");
    const [perSuccess,SetPerSuccess] = useState("");
    const [bugSuccess,SetBugSuccess] = useState("");

    var [SendPartnershipReport,{loading,error:sendError}] = useMutation(SEND_MOBILE_CRASH_REPORT,{
        onCompleted:() => {
            SetSuccess("The form has been successfuly sent");
        }
    });

    var [SendPerformanceReport,{loading:perfLoading,error:sendPerfError}] = useMutation(SEND_PERFORMANCE_REPORT,{
        onCompleted:() => {
            SetPerSuccess("The form has been successfuly sent");
        }
    });

    var [SendBugReport,{loading:bugLoading,error:sendBugError}] = useMutation(SEND_BUG_REPORT,{
        onCompleted:() => {
            SetBugSuccess("The form has been successfuly sent");
        }
    });

    const {error,formData,SendData,FormHandle} = useMobileCrashReport(INIT_MOBILE_CRASH_REPORT,SendPartnershipReport);
    const {error:perError,formData:perFormData,SendData:PerSend,FormHandle:PerFormHandle} = usePerformanceReport(INIT_PERFORMANCE_REPORT,SendPerformanceReport);
    const {error:bugError,formData:bugFormData,SendData:BugSend,FormHandle:BugFormHandle} = useBugReport(INIT_BUG_REPORT,SendBugReport);

    return(
        <Layout 
            title = {head.title} 
            metaDescription = {head.metaDescription} 
            ogImage = {head.ogImage} 
            isHomepage={isHomepage} 
            footerLinks = {allLinks} 
            linkNameUrl = {head.linkNameUrl} 
        >
            <div id="bug-report-form" className="container page">
                <div className="row">
                    <div className="text-content">

                        <h1>Bug report form</h1>
                        
                        <p>To provide you with the best support for any technical issues or bugs you may encounter in-game, we need to investigate several factors.</p>
                        <p>You can skip sections if it is not relevant to the problem you faced in the game.</p>
                        <p>To help us identify the cause of the issue, please provide answers to the questions relevant to your situation. Once we receive that information, we will be able to understand the problem better and give a possible solution.</p>
                        <p>If you need further assistance or have any other questions, feel free to get in touch!</p>

                    </div>
                    <div className="img-panel">
                        <img className="alien" src="/images/characters/universe_island_character_3.webp" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 col-xs-12">
                        <div className="panel blue">
                            <h2 className="blue">Experienced mobile crash</h2>
                            <p className="no-top-margin">Please fill in the section only if you have experienced a Mobile Crash during the game.</p>
                            <a onClick={(e) => ScrollToElement(e)} href="#form1" className="btn btn-white">Fill form</a>
                        </div>
                    </div>
                    <div className="col-4 col-xs-12">
                        <div className="panel green">
                            <h2 className="green">Experienced performance issues during the game</h2>
                            <p className="no-top-margin">Please fill in the section only if you have experienced a Performance Issues during the game.</p>
                            <a onClick={(e) => ScrollToElement(e)} href="#form2" className="btn btn-white">Fill form</a>
                        </div>
                    </div>
                    <div className="col-4 col-xs-12">
                        <div className="panel yellow">
                            <h2 className="yellow">Discover bug in the game</h2>
                            <p className="no-top-margin">Please fill in the section only if you have discovered a Performance Issues during the game.</p>
                            <a onClick={(e) => ScrollToElement(e)} href="#form3" className="btn btn-white">Fill form</a>
                        </div>
                    </div>
                </div>

                <div id="form1" className="row report">
                    <div className="text-content">

                        <h2 className="blue">Experienced mobile crash</h2>
                        <p>Please fill in the section only if you have experienced a Mobile Crash during the game.</p>

                        {loading ?
                            <Loading />
                        :
                            <div className="form">
                                <div className="row">
                                    <div className="col-6 col-xs-12 item">
                                        <div className="form-group">
                                            <label>Your name</label>
                                            <div>
                                                <input onChange={(e) => FormHandle(e)} type="text" name="name" value={formData.name} placeholder="Your name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xs-12 item">
                                        <div className="form-group">
                                            <label className="required">Model of the device used.</label>
                                            <div>
                                                <input onChange={(e) => FormHandle(e)} type="text" name="device" value={formData.device} placeholder="Your answer" />
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="form-group">
                                    <label>Please copy link to image/video of the crash or Performance issues.</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="crashLink" value={formData.crashLink} placeholder="URL address" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">Describe in detail what you were doing before the crash occurred.</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="beforeCrash" value={formData.beforeCrash} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">Did you receive an error message? Please provide us with the Error Code in that case.</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="errorCode" value={formData.errorCode} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">What kind of crash is it? For example hard freeze, crash to desktop, black-screen, system reboot, etc.</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="crashKind" value={formData.crashKind} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">What other applications were running in the background?</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="otherApps" value={formData.otherApps} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Have you installed or updated any drivers recently? If so which ones and what version?</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="installedDrivers" value={formData.installedDrivers} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Are you using any specialized peripherals such as Tobii Eye Tracker, Third-party controllers, joysticks, etc. If yes, Please list it for us.</label>
                                    <div>
                                        <input onChange={(e) => FormHandle(e)} type="text" name="peripherals" value={formData.peripherals} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="text-right"><button onClick={() => SendData()} className="btn btn-primary">Submit</button></div>
                            </div>
                        }

                        {success ?
                            <div className="alert alert-success text-center">{success}</div>
                        :null}

                        {error || sendError ?
                            <div className="alert alert-danger">{error || sendError}</div>
                        :null}

                    </div>
                    <div className="img-panel">
                        <img src="/images/characters/universe_island_character_1_big.webp" />
                    </div>
                    <div className="glow page blue"></div>
                </div>


                <div id="form2" className="row report">
                    <div className="text-content">

                        <h2 className="green">Experienced performance issues during the game</h2>
                        <p>Please fill in the section only if you have experienced a Performance Issues during the game.</p>

                        {perfLoading ?
                            <Loading />
                        :
                            <div className="form">
                                <div className="row">
                                    <div className="col-6 col-xs-12 item">
                                        <div className="form-group">
                                            <label>Your name</label>
                                            <div>
                                                <input onChange={(e) => PerFormHandle(e)} type="text" name="name" value={perFormData.name} placeholder="Your name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xs-12 item">
                                        <div className="form-group">
                                            <label className="required">Model of the device used.</label>
                                            <div>
                                                <input onChange={(e) => PerFormHandle(e)} type="text" name="device" value={perFormData.device} placeholder="Your answer" />
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="form-group">
                                    <label>Please copy link to image/video of the crash or Performance issues.</label>
                                    <div>
                                        <input onChange={(e) => PerFormHandle(e)} type="text" name="crashLink" value={perFormData.crashLink} placeholder="URL address" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">Describe in detail what you were doing before you experience performance issues.</label>
                                    <div>
                                        <input onChange={(e) => PerFormHandle(e)} type="text" name="beforeCrash" value={perFormData.beforeCrash} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">Did you receive an error message? Please provide us with the Error Code in that case.</label>
                                    <div>
                                        <input onChange={(e) => PerFormHandle(e)} type="text" name="errorCode" value={perFormData.errorCode} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">What graphical settings are you using? You can find these in the settings menu under “Graphics”.</label>
                                    <div>
                                        <input onChange={(e) => PerFormHandle(e)} type="text" name="graphicalSettings" value={perFormData.graphicalSettings} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">What are your audio settings? You can find these in the settings menu under “Audio”.</label>
                                    <div>
                                        <input onChange={(e) => PerFormHandle(e)} type="text" name="audioSettings" value={perFormData.audioSettings} placeholder="Your answer" />
                                    </div>
                                </div>

                                <div onClick={() => PerSend()} className="text-right"><button className="btn btn-primary">Submit</button></div>
                                
                            </div>
                        }
                        {perSuccess ?
                            <div className="alert alert-success text-center">{perSuccess}</div>
                        :null}

                        {perError || sendPerfError ?
                            <div className="alert alert-danger">{perError || sendPerfError}</div>
                        :null}

                    </div>
                    <div className="img-panel">
                        <img src="/images/characters/universe_island_character_6.webp" />
                    </div>
                    <div className="glow page green"></div>
                </div>


                <div id="form3" className="row report">
                    <div className="text-content">

                        <h2 className="yellow">Discovered bug in the game.</h2>
                        <p>Please fill in the section only if you have experienced a Performance Issues during the game.</p>

                        {bugLoading ?
                            <Loading />
                        :
                            <div className="form">
                                <div className="row">
                                    <div className="col-6 col-xs-12 item">
                                        <div className="form-group">
                                            <label>Your name</label>
                                            <div>
                                                <input onChange={(e) => BugFormHandle(e)} type="text" name="name" value={bugFormData.name} placeholder="Your name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xs-12 item">
                                        <div className="form-group">
                                            <label className="required">Model of the device used.</label>
                                            <div>
                                                <input onChange={(e) => BugFormHandle(e)} type="text" name="device" value={bugFormData.device} placeholder="Your answer" />
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="form-group">
                                    <label>Please copy link to image/video of the crash or Performance issues.</label>
                                    <div>
                                        <input onChange={(e) => BugFormHandle(e)} type="text" name="crashLink" value={bugFormData.crashLink} placeholder="URL address" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">Describe in detail what you were doing before you experienced the bug.</label>
                                    <div>
                                        <input onChange={(e) => BugFormHandle(e)} type="text" name="beforeCrash" value={bugFormData.beforeCrash} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="required">What did you expect to happen when you performed the steps you described previously?</label>
                                    <div>
                                        <input onChange={(e) => BugFormHandle(e)} type="text" name="expectToHappen" value={bugFormData.expectToHappen} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Are you able to reproduce the issue you are describing and if so, what are the steps to reproduce the issue?</label>
                                    <div>
                                        <input onChange={(e) => BugFormHandle(e)} type="text" name="reproduceSteps" value={bugFormData.reproduceSteps} placeholder="Your answer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Were you able to find a work around that enabled you to continue playing and if so, what were the steps?</label>
                                    <div>
                                        <input onChange={(e) => BugFormHandle(e)} type="text" name="enabledSteps" value={bugFormData.enabledSteps} placeholder="Your answer" />
                                    </div>
                                </div>

                                <div className="text-right"><button onClick={() => BugSend()} className="btn btn-primary">Submit</button></div>
                                
                            </div>
                        }
                        {bugSuccess ?
                            <div className="alert alert-success text-center">{bugSuccess}</div>
                        :null}

                        {bugError || sendBugError ?
                            <div className="alert alert-danger">{bugError || sendBugError}</div>
                        :null}
                        
                    </div>
                    <div className="img-panel">
                        <img src="/images/characters/universe_island_character_4.webp" />
                    </div>
                    <div className="glow page yellow"></div>
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
                title:"Bug Report Form - UniverseIsland",
                metaDescription: "To provide you with the best support for any technical issues or bugs you may encounter in-game, we need to investigate several factors.",
                ogImage:"/images/share.png",
                linkNameUrl:"bug-report-form"
            },
            isHomepage:false
        }
    }
}

export default BugReportForm;