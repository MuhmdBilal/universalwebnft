import { useState,useEffect } from "react";
import AdminLayout from "../../layout/admin";
import {UPDATE_GAME_DATA } from "../../queries/game";
import Loading from "../../components/loading";
import {useMutation,useApolloClient} from '@apollo/client';
import { GetApolloErrorText } from "../../scripts/helper";
import Error from "../../components/error";
import { SetNotification } from "../../scripts/notification/notification";
import { GetGameData,FormHandle } from "../../scripts/game/game";

const INIT_FORM_DATA = {
    androidUrl:"",
    iPhoneUrl:"",
    macUrl:"",
    winUrl:""
}

const INIT_STATISTIC_DATA = {
    macClickCount:     0,
    winClickCount:     0,
    iOSClickCount:     0,
    androidClickCount: 0
}

const Game = ({linkName}) => {

    const cl = useApolloClient();
    const [formData,SetFormData] = useState(INIT_FORM_DATA);
    const [statisticData,SetStatisticData] = useState(INIT_STATISTIC_DATA);

    const [UpdateGameData,{error,loading}] = useMutation(UPDATE_GAME_DATA,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně upraveno",true,false,cl);  
        }
    });

    useEffect(() => {

        GetGameData(cl,SetFormData,SetStatisticData);

    },[])

    const SaveData = () => {
        UpdateGameData({
            variables:{
                gameData:formData
            }
        })
    }

    var err = "";
    if(error)
        err = GetApolloErrorText(error);

    return(
        <AdminLayout linkName={linkName}>

            <div className="panel form-group">
                <div className="panel-header">
                    <h1>Statistika stažení</h1>
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            <div className="row admin-row-align">
                                <div className="col-2 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Android</label>
                                        <p className="text-blue">
                                            {statisticData.androidClickCount} x
                                        </p>
                                    </div>
                                </div>
                                <div className="col-2 col-xs-12 col">
                                    <div className="form-group">
                                        <label>iPhone</label>
                                        <p className="text-blue">
                                            {statisticData.iOSClickCount} x
                                        </p>
                                    </div>
                                </div>
                                <div className="col-2 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Mac</label>
                                        <p className="text-blue">
                                            {statisticData.macClickCount} x
                                        </p>
                                    </div>
                                </div>
                                <div className="col-2 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Windows</label>
                                        <p className="text-blue">
                                            {statisticData.winClickCount} x
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    :
                        <Loading />
                    }
                </div>
            </div>

            <div className="panel">
                <div className="panel-header">
                    <h1>Hra</h1>
                    <button onClick={() => SaveData()} className="btn btn-primary ml-auto">Uložit</button>
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            <div className="row admin-row-align">
                                <div className="col-6 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Android URL</label>
                                        <div>
                                            <input value={formData.androidUrl} onChange={(e) => FormHandle(e,formData,SetFormData)} type="text" name="androidUrl" placeholder="Vyplňte URL pro stažení Android verze" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-xs-12 col">
                                    <div className="form-group">
                                        <label>iPhone URL</label>
                                        <div>
                                            <input value={formData.iPhoneUrl} onChange={(e) => FormHandle(e,formData,SetFormData)} type="text" name="iPhoneUrl" placeholder="Vyplňte URL pro stažení iPhone verze" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Mac URL</label>
                                        <div>
                                            <input value={formData.macUrl} onChange={(e) => FormHandle(e,formData,SetFormData)} type="text" name="macUrl" placeholder="Vyplňte URL pro stažení Mac verze" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-xs-12 col">
                                    <div className="form-group">
                                        <label>Windows URL</label>
                                        <div>
                                            <input value={formData.winUrl} onChange={(e) => FormHandle(e,formData,SetFormData)} type="text" name="winUrl" placeholder="Vyplňte URL pro stažení Windows verze" />
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
        linkName:"game"
    }
}

export default Game;