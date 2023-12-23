import {useState} from 'react';

const DownloadIos = ({url}) => {

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
                            <h3>iOS version</h3>
                            <p className="text-blue">UNIVERSE ISLAND game is now available for download on iOS devices!</p>
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
                            <img className="to-bottom" src="/images/characters/universe_island_character_5.webp" />
                        </div>
                    </div>
                :null}

                {selectedTab === 2 ?
                    <table>
                        <thead>
                            <tr>
                                <th className="w-20">System</th>
                                <th className="yellow-bg w-40">Minimum</th>
                                <th className="green-bg w-40">Recommended</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>OS:</td>
                                <td>iOS 10.0.1</td>
                                <td>iOS 13</td>
                            </tr>
                            <tr>
                                <td>CPU:</td>
                                <td>Apple A10 Fusion</td>
                                <td>Apple A13 Bionic (7 nm+)</td>
                            </tr>
                            <tr>
                                <td>RAM:</td>
                                <td>2GB</td>
                                <td>4GB</td>
                            </tr>
                            <tr>
                                <td>GPU:</td>
                                <td>PowerVR Series7XT Plus (six-core graphics)</td>
                                <td>Apple GPU (4-core graphics)</td>
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

export default DownloadIos;