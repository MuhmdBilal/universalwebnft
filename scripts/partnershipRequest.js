import {useState} from 'react';
import {ValidateEmail,ValidatePhone} from './helper';

const usePartnershipRequest = (initFormData,SendPartnershipRequest) => {

    const partnershipTypes = [
        "I am an Influencer or talking on behalf of one",
        "I am a representative from a Project",
        "I am a representative from a Platform (Exchange, Media Platform, Etc.)",
        "I am a representative on behalf of a Marketing Agency",
        "Other"
    ]

    const [step, SetStep] = useState(1);
    const [error, SetError] = useState("");
    const [formData,SetFormdata] = useState(initFormData);

    const OpenFile = (e) =>{

        var file = e.target.files[0];        
        var reader = new FileReader();

        reader.onload = () => {
            SetFormdata({...formData,file:file});
        };
        reader.readAsDataURL(file);
    }

    const FormHandle = (e) => {
	  
        const t = e.target;
        const v = t.type === 'checkbox' ? t.checked : t.value;
        const n = t.name;
        
        SetFormdata({...formData,[n]: v});
              
    }

    const CheckStep1 = () => {
        if(formData.email != "" && ValidateEmail(formData.email))
        {
            if(formData.phone != "" && ValidatePhone(formData.phone))
                SetStep(2);
            else
                SetErrorText("Invalid phone number.");
        }
        else
            SetErrorText("Invalid email address.");
    }
    const CheckStep2 = () => {

        if(formData.partnershipType || formData.partnershipType == 0)
        {
            if(formData.brandName != "")
                if(formData.aboutYou != "")
                    SetStep(3);
                else
                    SetErrorText("Please fill some words about you.");
            else
                SetErrorText("Please fill your brand name.");
        }
        else
            SetErrorText("Please select who you are.");
    }

    const CheckStep3 = () => {
        SetStep(step + 1);
    }

    const CheckStep4 = () => {

        if(formData.propose != "")
        {

            formData.partnershipType = partnershipTypes[formData.partnershipType];

            SendPartnershipRequest({
                variables:{
                    data:formData
                }
            })
        }
        else
            SetErrorText("Please fill what is it that you propose");
    }

    const PreviousStep = () => {
        SetStep(step - 1);
    }

    const SetErrorText = (text) => {
        SetError(text);
        setTimeout(() => {
            SetError("");
        },3000)
    }

    return {
        step,
        formData,
        error,
        partnershipTypes,
        FormHandle,
        OpenFile,
        PreviousStep,
        CheckStep1,
        CheckStep2,
        CheckStep3,
        CheckStep4
    }
}

export default usePartnershipRequest;