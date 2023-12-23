import {useState} from 'react';

const DownloadAndroid = ({url}) => {

    const [selectedTab, SetTab] = useState(1);

    return(
        <div className="panel">
            <ul className="tabs nested">
                <li className={selectedTab == 1 ? "selected" : ""} onClick={() => SetTab(1)}>Game</li>
                <li className={selectedTab == 2 ? "selected" : ""} onClick={() => SetTab(2)}>System requirements</li>
            </ul>
            <div className="tabs-content">

                {selectedTab === 1 ?
                    <div className="row">
                        <div className="col-6 col-xs-12">
                            <h3>Android version</h3>
                            <p className="text-blue">UNIVERSE ISLAND can be played on almost all Android phones. Just download the app!</p>
                            <ul className="list">
                                <li><img src="/images/svg/plus.svg" alt="" /> Added new security layer</li>
                                <li><img src="/images/svg/plus.svg" alt="" /> Added new island</li>
                                <li><img src="/images/svg/bug.svg" alt="" /> Bug fix</li>
                                <li><img src="/images/svg/countdown.svg" alt="" /> New countdown</li>
                            </ul>
                            <a className="btn btn-yellow biggest" target="_blank" href={url}>Download now</a>
                            <p className="text-uppercase text-bigger no-bottom-margin">ACTION / ONLINE SHOOTER</p>
                            <p className="text-uppercase text-bigger no-top-margin no-bottom-margin">PUBLISHER: UNIVERSAL ISLAND LLC</p>
                        </div>
                        <div className="col-6 col-xs-12 text-center d-flex justify-content-center align-items-end">
                            <img className="to-bottom" src="/images/characters/universe_island_character_7.webp" />
                        </div>
                    </div>
                :null}

                {selectedTab === 2 ?
                    <table>
                        <thead>
                            <tr>
                                <th>System</th>
                                <th className="yellow-bg">Minimum</th>
                                <th className="green-bg">Recommended</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>OS:</td>
                                <td>Android 7.0</td>
                                <td>Android 11</td>
                            </tr>
                            <tr>
                                <td>CPU:</td>
                                <td>Dimensity 700 or Snapdragon 665</td>
                                <td>Dimensity 820 or Snapdragon 778G</td>
                            </tr>
                            <tr>
                                <td>RAM:</td>
                                <td>4GB</td>
                                <td>8GB</td>
                            </tr>
                            <tr>
                                <td>GPU:</td>
                                <td>Mali-G52 or Adreno 618</td>
                                <td>Mali-G68 or Adreno 642L</td>
                            </tr>
                            <tr>
                                <td>Storage:</td>
                                <td>1GB</td>
                                <td>1GB</td>
                            </tr>
                        </tbody>
                    </table>
                :null}
            </div>
        </div>
    )
}

export default DownloadAndroid;