import {useState} from 'react';

const Roadmap = () =>{

    const d = new Date();
    const year = d.getFullYear();
    const m = d.getMonth();

    const [selectedTab, SetTab] = useState(year);

    return(
        
        <div className="container">
            <div className="panel">
                <h2 className="green text-center">Roadmap</h2>

                <ul className="tabs green bigger">
                    <li className={selectedTab == 2021 ? "selected" : ""} onClick={() => SetTab(2021)}>2021</li>
                    <li className={selectedTab == 2022 ? "selected" : ""} onClick={() => SetTab(2022)}>2022</li>
                    <li className={selectedTab == 2023 ? "selected" : ""} onClick={() => SetTab(2023)}>2023</li>
                    <li className={selectedTab == 2024 ? "selected" : ""} onClick={() => SetTab(2024)}>2024</li>
                </ul>
                <div className="tabs-content">

                    <div className={"row content" + (selectedTab === 2021 ? " show" : "")}>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2021 && m >= 1 && m <= 3 ? " selected" : "")}>
                                <h3>Q1</h3>
                                <p>The main idea of the project appears</p>
                                <p>Website launch / start on the NFT market</p>
                                <p>Researching and developing resources</p>
                            </div>
                        </div>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2021 && m >= 4 && m <= 6 ? " selected" : "")}>
                                <h3>Q2</h3>
                                <p>New high-tech NFT cards</p>
                                <p>Team expansion</p>
                                <p>Testing of the NFT market/start of a basic game development</p>
                            </div>
                        </div>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2021 && m >= 7 && m <= 9 ? " selected" : "")}>
                                <h3>Q3</h3>
                                <p>Developing design of NFT 3D Game and basic game logic</p>
                                <p>Beta NFT Marketplace V1</p>
                            </div>
                        </div>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2021 && m >= 10 && m <= 12 ? " selected" : "")}>
                                <h3>Q4</h3>
                                <p>Seed round</p>
                                <p>Website V2</p>
                                <p>Marketing campaign</p>
                                <p>Private round</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className={"row content" + (selectedTab === 2022 ? " show" : "")}>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2022 && m >= 1 && m <= 3 ? " selected" : "")}>
                                <h3>Q1</h3>
                                <p>Launching NFT Market place v2</p>
                                <p>Token listing</p>
                                <p>Start works in animated miniseries</p>
                                <p>BETA 3D PlayToEarn mobile game</p>
                            </div>
                        </div>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2022 && m >= 4 && m <= 6 ? " selected" : "")}>
                                <h3>Q2</h3>
                                <p>Launching the full mobile game</p>
                                <p>NFT special items edition release</p>
                            </div>
                        </div>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2022 && m >= 7 && m <= 9 ? " selected" : "")}>
                                <h3>Q3</h3>
                                <p>Metaverse world</p>
                                <p>Universe city, universe arena</p>
                                <p>Upgraded loot boxes</p>
                            </div>
                        </div>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2022 && m >= 10 && m <= 12 ? " selected" : "")}>
                                <h3>Q4</h3>
                                <p>New characters + weapons and accessories</p>
                                <p>co-op mode</p>
                                <p>A pilot episode of new TV series</p>
                            </div>
                        </div>
                        </div>
                
                    
                    <div className={"row content" + (selectedTab === 2023 ? " show" : "")}>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2023 && m >= 1 && m <= 3 ? " selected" : "")}>
                                <h3>Q1</h3>
                                <p>Vehicles and fly machines</p>
                                <p>4x new type of UFO</p>
                                <p>2x new character</p>
                            </div>
                        </div>
                        
                        
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2023 && m >= 4 && m <= 6 ? " selected" : "")}>
                                <h3>Q2</h3>
                                <p>Game performance for low end devices</p>
                                <p>Graphic optimalization</p>
                                <p>UFO race arena</p>
                            </div>
                        </div>

                       
                       
                        
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2023 && m >= 7 && m <= 9 ? " selected" : "")}>
                                <h3>Q3</h3>
                                <p>Editor island</p>
                                <p>Lootbox reward system in openworld</p>
                                <p>UFO race arena, reward system</p>
                            </div>
                        </div>


                       
                        
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2023 && m >= 10 && m <= 12 ? " selected" : "")}>
                                <h3>Q4</h3>
                                <p>Online world system rebuild</p>
                                <p>High end graphic for gaming phones</p>
                                <p>Main boss islands</p>
                            </div>
                        </div>
                        

                        </div>
                        <div className={"row content" + (selectedTab === 2024 ? " show" : "")}>
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2024 && m >= 1 && m <= 3 ? " selected" : "")}>
                                <h3>Q1</h3>
                                <p>Add login with metamask</p>
                                <p>Land sale</p>
                                <p>Land generator + save progress</p>
                                <p>Universe media in game</p>
                            </div>
                        </div>   
                          
                        
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2024 && m >= 4 && m <= 6 ? " selected" : "")}>
                                <h3>Q2</h3>
                                <p>UIM token burn</p>
                                <p>Emoticons available for NFT holders</p>
                                <p>Clans features</p>
                                <p>Volatile energy as a consumable</p>
                                <p>gUIm rewards for time spend in game</p>
                            </div>
                        </div>  

                         
                        
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2024 && m >= 7 && m <= 9 ? " selected" : "")}>
                                <h3>Q3</h3>
                                <p>Ai bots in openworld</p>
                                <p>Clans features</p>
                                <p>PvP arena Bots enemies</p>
                               
                            </div>
                        </div>  


                         
                       
                        <div className="col-3 col-sm-6 col-xxs-12">
                            <div className={"panel" + (year == 2024 && m >= 10 && m <= 12 ? " selected" : "")}>
                                <h3>Q4</h3>
                                <p>Video onboarding</p>
                                <p>Spaceship attack mode</p>
                                <p>Daily reward system</p>
                               
                            </div>
                            </div>
                            
                            
                            
                            
                            
                        
                    </div>
                </div>
            </div>
            <div className="glow green"></div>
        </div>
        
    )
}

export default Roadmap;