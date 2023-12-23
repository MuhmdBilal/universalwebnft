import { useState } from "react";
import AdminLayout from "../../layout/admin";
import {CHANGE_PASSWORD } from "../../queries/settings";
import Loading from "../../components/loading";
import {useMutation,useApolloClient} from '@apollo/client';
import { GetApolloErrorText } from "../../scripts/helper";
import Error from "../../components/error";
import { SetNotification } from "../../scripts/notification/notification";
import { FormHandle } from "../../scripts/settings/settings";

const INIT_FORM_DATA = {
    oldPassword:"",
    newPassword:'',
	checkNewPassword:'',
}

const Game = ({linkName}) => {

    const cl = useApolloClient();
    const [formData,SetFormData] = useState(INIT_FORM_DATA);

    const [UpdateGameData,{error,loading}] = useMutation(CHANGE_PASSWORD,{
        onCompleted:(data) => {

            if(data.changePassword)
                SetNotification(null,data.changePassword,false,true,cl);
            else
                SetNotification(null,"Úspěšně uloženo",true,false,cl); 
 
        }
    });

    const SaveData = () => {

        if(formData.newPassword == formData.checkNewPassword)
        {
            UpdateGameData({
                variables:{
                    oldPassword:formData.oldPassword,
                    newPassword:formData.newPassword
                }
            })
        }
        else
        {
            SetNotification(null,"Zadná nová hesla nejsou stejná",false,true,cl);
        }
    }

    var err = "";
    if(error)
        err = GetApolloErrorText(error);

    return(
        <AdminLayout linkName={linkName}>
            <div className="panel">
                <div className="panel-header">
                    <h1>Změna hesla</h1>
                    <button onClick={() => SaveData()} className="btn btn-primary ml-auto">Uložit</button>
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            <div className="row admin-row-align">
                                <div className="col-4 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Staré heslo</label>
                                        <div>
                                            <input value={formData.oldPassword} onChange={(e) => FormHandle(e,formData,SetFormData)} type="password" name="oldPassword" placeholder="Vyplňte své staré heslo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Nové heslo</label>
                                        <div>
                                            <input value={formData.newPassword} onChange={(e) => FormHandle(e,formData,SetFormData)} type="password" name="newPassword" placeholder="Vyplňte nové heslo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Zopakovat nové heslo</label>
                                        <div>
                                            <input value={formData.checkNewPassword} onChange={(e) => FormHandle(e,formData,SetFormData)} type="password" name="checkNewPassword" placeholder="Zadejte opět své nové heslo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    :
                        <Loading />
                    }
                </div>
            </div>
        </AdminLayout>
    )

}
Game.getInitialProps = (ctx) => {
    
    return { 
        linkName:"settings"
    }
}

export default Game;