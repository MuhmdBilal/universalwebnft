import { gql } from '@apollo/client';

export const GET_GAME_DATA = gql`
    query GetGameData{
        gameData{
            androidUrl
            iPhoneUrl
            macUrl
            winUrl
        }
        getStatisticData{
            macClickCount
            winClickCount
            iOSClickCount
            androidClickCount
        }
    } 
`;

export const UPDATE_GAME_DATA = gql`
mutation UpdateGameData($gameData:GameDataInput){
    updateGameData(gameData:$gameData)
} 
`;