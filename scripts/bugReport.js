import {useState} from 'react';
import {ValidateEmail,ValidatePhone} from './helper';

export const useMobileCrashReport = (initFormData,SendMobileCrashReport) => {

    const [formData,SetFormData] = useState(initFormData);
    const [error, SetError] = useState("");

    const FormHandle = (e) => {
	  
        const t = e.target;
        const v = t.type === 'checkbox' ? t.checked : t.value;
        const n = t.name;
        
        SetFormData({...formData,[n]: v});
              
    }

    const SendData = () => {
        if(formData.device != "")
        {
            if(formData.beforeCrash != "")
            {
                if(formData.errorCode != "")
                {
                    if(formData.crashKind != "")
                    {
                        if(formData.otherApps != "")
                        { 
                            SendMobileCrashReport({
                                variables:{
                                    data:formData
                                }
                            })  
                        }
                        else
                            SetErrorText("Please fill what other applications were running in the background.");
                    }
                    else
                        SetErrorText("Please fill what kind of crash is it.");
                }
                else
                    SetErrorText("Please fill if you receive an error message.");
            }
            else
                SetErrorText("Please fill what you were doing before the crash occurred.");
        }
        else
            SetErrorText("Please fill your device model.");
    }

    const SetErrorText = (text) => {
        SetError(text);
        setTimeout(() => {
            SetError("");
        },3000)
    }

    return {
        formData,
        error,
        SendData,
        FormHandle
    }
}


export const usePerformanceReport = (initFormData,SendPerformanceReport) => {

    const [formData,SetFormData] = useState(initFormData);
    const [error, SetError] = useState("");

    const FormHandle = (e) => {
	  
        const t = e.target;
        const v = t.type === 'checkbox' ? t.checked : t.value;
        const n = t.name;
        
        SetFormData({...formData,[n]: v});
              
    }

    const SendData = () => {
        if(formData.device != "")
        {
            if(formData.beforeCrash != "")
            {
                if(formData.errorCode != "")
                {
                    if(formData.graphicalSettings != "")
                    {
                        if(formData.audioSettings != "")
                        { 
                            SendPerformanceReport({
                                variables:{
                                    data:formData
                                }
                            })  
                        }
                        else
                            SetErrorText("Please fill what are your audio settings.");
                    }
                    else
                        SetErrorText("Please fill what graphical settings are you using.");
                }
                else
                    SetErrorText("Please fill if you receive an error message.");
            }
            else
                SetErrorText("Please fill what you were doing before the crash occurred.");
        }
        else
            SetErrorText("Please fill your device model.");
    }

    const SetErrorText = (text) => {
        SetError(text);
        setTimeout(() => {
            SetError("");
        },3000)
    }

    return {
        formData,
        error,
        SendData,
        FormHandle
    }

}

export const useBugReport = (initFormData,SendBugReport) => {

    const [formData,SetFormData] = useState(initFormData);
    const [error, SetError] = useState("");

    const FormHandle = (e) => {
	  
        const t = e.target;
        const v = t.type === 'checkbox' ? t.checked : t.value;
        const n = t.name;
        
        SetFormData({...formData,[n]: v});
              
    }

    const SendData = () => {
        if(formData.device != "")
        {
            if(formData.beforeCrash != "")
            {
                if(formData.expectToHappen != "")
                {
                    SendBugReport({
                        variables:{
                            data:formData
                        }
                    })      
                }
                else
                    SetErrorText("Please fill what did you expect to happen when you performed the steps you described previously.");
            }
            else
                SetErrorText("Please fill what you were doing before the crash occurred.");
        }
        else
            SetErrorText("Please fill your device model.");
    }

    const SetErrorText = (text) => {
        SetError(text);
        setTimeout(() => {
            SetError("");
        },3000)
    }

    return {
        formData,
        error,
        SendData,
        FormHandle
    } 

}