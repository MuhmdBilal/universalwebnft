import {useState} from 'react';

import DownloadAndroid from './downloadAndroid';
import DownloadIos from './downloadIos';
import DownloadMac from './downloadMac';
import DownloadWindows from './downloadWindows';

const DownloadSection = ({hData}) => {

    const [selectedTab, SetTab] = useState(1);

    return(
        
        <div className="container">
            <ul className="tabs">
                <li className={selectedTab == 1 ? "selected" : ""} onClick={() => SetTab(1)}>Android</li>
                <li className={selectedTab == 2 ? "selected" : ""} onClick={() => SetTab(2)}>iOS</li>
                <li className={selectedTab == 3 ? "selected" : ""} onClick={() => SetTab(3)}>Mac</li>
                <li className={selectedTab == 4 ? "selected" : ""} onClick={() => SetTab(4)}>Windows</li>
            </ul>
            <div className="tabs-content">

                <div className={"content" + (selectedTab === 1 ? " show" : "")}>
                    <DownloadAndroid url={hData.gameData.androidUrl} />
                </div>
                <div className={"content" + (selectedTab === 2 ? " show" : "")}>
                    <DownloadIos url={hData.gameData.iPhoneUrl} />
                </div>
                <div className={"content" + (selectedTab === 3 ? " show" : "")}>
                    <DownloadMac url={hData.gameData.macUrl} />
                </div>
                <div className={"content" + (selectedTab === 4 ? " show" : "")}>
                    <DownloadWindows url={hData.gameData.winUrl} />
                </div>
                
            </div>
        </div>
        
    )
}

export default DownloadSection;