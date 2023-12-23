import {useState} from 'react';

const DownloadMac = ({url}) => {

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
                            <h3>Mac version</h3>
                            <p className="text-blue">UNIVERSE ISLAND game is now available for download on Mac!</p>
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
                            <img className="to-bottom w-100" src="/images/characters/universe_island_character.webp" />
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
                        </tbody>
                    </table>
                :null}
            </div>
        </div>
    )
}

export default DownloadMac;