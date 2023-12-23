import { GET_GAME_DATA } from '../../queries/game';

export const FormHandle = (e,formData,SetForm) => {
	  
    const t = e.target;
    const v = t.type === 'checkbox' ? t.checked : t.value;
    const n = t.name;
    
    SetForm({...formData,[n]: v});
          
}

export const GetGameData = async (client,SetFormData,SetStatisticData) => {

    var {data} = await client.query({ 
        query: GET_GAME_DATA,
        errorPolicy:"all",
        fetchPolicy: 'network-only'
    });

    if(data)
    {
        SetFormData({
            androidUrl:data.gameData.androidUrl,
            iPhoneUrl:data.gameData.iPhoneUrl,
            macUrl:data.gameData.macUrl,
            winUrl:data.gameData.winUrl
        })

        SetStatisticData({
            macClickCount:     data.getStatisticData.macClickCount,
            winClickCount:     data.getStatisticData.winClickCount,
            iOSClickCount:     data.getStatisticData.iOSClickCount,
            androidClickCount: data.getStatisticData.androidClickCount
        })

    }

}