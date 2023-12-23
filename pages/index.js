import { useEffect,useState,useRef } from 'react';
import Layout from '../layout/layout';
import PlayButton from '../components/playButton';
import BouncingArrow from '../components/bouncingArrow';
import DownloadSection from '../components/homepage/downloadSection';
import JoinCommunity from '../components/homepage/joinCommunity';
import GameFeatures from '../components/homepage/gameFeatures';
import Roadmap from '../components/homepage/roadmap';
import InTheNews from '../components/homepage/inTheNews';
import Link from 'next/link';
import Announcement from '../components/announcement';
import {IsScrolledIntoView,ScrollToElement,IsMobile} from '../scripts/helper';
import {GET_HOMEPAGE_DATA,SET_CLICK_COUNT} from '../queries/homepage';
import {GetApolloClient} from '../config/next';
import LightGallery from 'lightgallery/react';
import { SetNotification } from "../scripts/notification/notification";
import {useApolloClient} from '@apollo/client';
import Notification from "../components/notification";
import {useMutation} from '@apollo/client';

import Image from 'next/future/image';

const Homepage = ({head,isHomepage,hData}) => {

    const cl = useApolloClient();

    const ref = useRef([]);
    const [isPortrait,SetIsPortrair] = useState(false);

    const [SetClickCount,{data,loading,error}] = useMutation(SET_CLICK_COUNT);

    useEffect(() => {
        
        var hash = window.location.hash;
        if(hash)
        {
            if(!hash.includes("#-"))hash = hash.replace("#","#-");
            hash = hash.substring(2);
            ScrollToElement(null,hash);
            
        }

        OnResize();
        OnScroll();

        window.addEventListener('resize', OnResize);
        window.addEventListener('scroll', OnScroll);

        return () => {
            window.removeEventListener('resize', OnResize);
            window.removeEventListener('scroll', OnScroll);
        }

    },[]);

    const OnScroll = () => {

        for(var val of ref.current){
            if(!val.classList.contains("visible") && IsScrolledIntoView(val))
                val.classList.add("visible");
        }
    }

    const OnResize = (e) => {
        if(window.innerWidth / window.innerHeight < 16/9)
            SetIsPortrair(true);
        else
            SetIsPortrair(false);
    }

    const ClickCount = (type) => {
        console.log(type);
        SetClickCount({
            variables:{
                type
            }
        })
    }

    async function AddTokenToWallet() {
        
        if (IsMobile() && !window.ethereum) {
          window.location.href =
            "https://metamask.app.link/dapp/178e-2a02-a58-822e-5200-d51b-7ef0-aa1c-96d7.eu.ngrok.io";
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  address: "0x1BB132D6039b81FaEdc524a30E52586b6Ca15f48",
                  symbol: "UIM",
                  decimals: 18,
                  // image: tokenImage, // A string url of the token logo
                },
              },
            });
          } catch (error) {
                SetNotification(null,error.message,false,true,cl);  
          }
        }
      }

    return(

        <Layout 
            title = {head.title} 
            metaDescription = {head.metaDescription} 
            ogImage = {head.ogImage} 
            linkNameUrl = {head.linkNameUrl} 
            isHomepage={isHomepage}
            footerLinks = {hData.allLinks}
        >
            
            <section id="main">
                <div id="video">
                    <video className={isPortrait ? "portrait" : ""} autoPlay playsInline muted loop poster="/images/universeisland-thumbnail.webp?3">
                        <source src="/videos/universeisland.mp4?2" type="video/mp4" />
                    </video>
                    <div className="overlay"></div>
                </div>
                <div className="container">
                    <div className="welcome">
                        <div className='content'>
                            <h1>Welcome to the universe island!</h1>
                            <p className="description">We are introducing Universe Island: A crypto-powered Sci-Fi 1vs1 online shooter game with detailed maps and attractive characters.</p>
                            <div className="buttons">
                                <a className="btn btn-primary" target="_blank" href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&&outputCurrency=0x1BB132D6039b81FaEdc524a30E52586b6Ca15f48">Buy now on PancakeSwap</a>
                                <a className="btn btn-primary" target="_blank" href="https://www.dextools.io/app/bsc/pair-explorer/0xf5377aeb4223fce3ed85bd786c54af8c37d9e3e8">Chart</a>
                                <a onClick={(e) => ScrollToElement(e)} className="btn btn-yellow-transparent" href="#-contract-address">Contract</a>
                            </div>
                            <div className="bigger-buttons">
                                <a onClick={(e) => ScrollToElement(e)} className="btn btn-yellow biggest download" href="#-download">
                                    Download game 
                                    <img className="apple" alt="apple" src="/images/apple_icon.webp" />
                                    <img alt="windows" src="/images/win_icon.webp" />
                                    <img alt="android" src="/images/android_icon.webp" />
                                    <span className="badge red text-center">Play and earn without any initital investment</span>
                                </a>
                                <a onClick={(e) => AddTokenToWallet()} className="btn btn-yellow biggest token-integration" href="#-download">
                                    Metamask <br /> integration
                                </a>
                            </div>
                        </div>
                        <div className="play">
                            <PlayButton href={"https://www.youtube.com/watch?v=ooZQ3ItHo6Q"} />
                        </div>
                    </div>
                    <div className="download-beta-game">
                        <div className="panel">
                            <div className="row">
                                <div className="col-6 col-xxs-12">
                                    <h2>Download <span>universe island</span> game</h2>
                                    <a onClick={(e) => ScrollToElement(e)} className="btn btn-yellow" href="#-download">Download now</a>
                                </div>
                            </div>
                            <img src="/images/characters/download_universe_island_game.webp" />
                        </div>
                    </div>
                </div>
            </section>

            <section ref={(el) => ref.current[0] = el} id="contract-address">
                <div className="container">
                    <div className="panel text-center">
                       
                        <h2>Contract address</h2>
                        <BouncingArrow color="yellow" />
                        <div className="address">
                            0x1BB132D6039b81FaEdc524a30E52586b6Ca15f48
                        </div>
                        <p className="no-bottom-margin">Please double check on <a target="_blank" href="https://bscscan.com/address/0x1BB132D6039b81FaEdc524a30E52586b6Ca15f48">BSC Scan</a></p>
                        <img className="girl" src="/images/characters/universe_island_character_1.webp" />  
                            <Image
                                className="token"
                                src={"/images/uim_token.webp"}
                                height="200"
                                width="300"
                                alt="contract girl"
                            />  
                    </div>
                </div>
            </section>

            <section ref={(el) => ref.current[1] = el} id="download">
                <div className="container">
                    <h2 className="text-center yellow">Download game</h2>
                    <div className="panel">
                        <div className="row">
                            <div className="col-6 col-xs-12 desktop">
                                <h3>Desktop versions</h3>
                                <p className="text-blue">UNIVERSE ISLAND can be played on almost all Windows and macOS devices. <br /> Just download the installer!</p>
                                
                                {hData.gameData.macUrl ?
                                    <a onMouseDown={() => ClickCount("macClickCount")} target="_blank" href={hData.gameData.macUrl}><img className="first" alt="macOS" src="/images/web_mac_button.png" /></a>
                                :null}
                                {hData.gameData.winUrl ?
                                    <a onMouseDown={() => ClickCount("winClickCount")} target="_blank" href={hData.gameData.winUrl}><img alt="windows" src="/images/web_windows_button.png" /></a>
                                :null}

                                <p className="text-uppercase text-bigger no-bottom-margin">ACTION / ONLINE SHOOTER</p>
                                <p className="text-uppercase text-bigger no-top-margin no-bottom-margin">PUBLISHER: UNIVERSAL ISLAND LLC</p>
                            </div>
                            <div className="col-6 col-xs-12 mobile">
                                <h3>Mobile versions</h3>
                                <p className="text-blue">UNIVERSE ISLAND can be played on almost all Android and iOS mobile phones. <br /> Just download the app!</p>
                                
                                {hData.gameData.iPhoneUrl ?
                                    <a onMouseDown={() => ClickCount("iOSClickCount")} target="_blank" href={hData.gameData.iPhoneUrl}><img className="first" alt="iOS" src="/images/appstore.svg" /></a>
                                :null}
                                {hData.gameData.androidUrl ?
                                    <a onMouseDown={() => ClickCount("androidClickCount")} target="_blank" href={hData.gameData.androidUrl}><img alt="android" src="/images/android_button.png" /></a>
                                :null}

                                <p className="text-uppercase text-bigger no-bottom-margin">UNIVERSE ISLAND</p>
                                <p className="text-uppercase text-bigger no-top-margin no-bottom-margin">INCLUDES UIM REWARDS</p>
                            </div>
                        </div>
                    </div>
                    <div className="glow yellow"></div>
                </div>

                {false ? <DownloadSection hData={hData} /> : null}
            </section>

            <section ref={(el) => ref.current[2] = el} id="highlights">
                <div className="container">
                    <div className="row">
                        <div className="col-4 col-xs-12">
                            <div className="panel blue">
                                <img src="/images/highlights/nft.webp" />
                                <h3>NFT Driven Metaverse</h3>
                                <p>Experience Universe Islands Immersive 3D Metaverse with NFTs that boost your gameplay.</p>
                            </div>
                        </div>
                        <div className="col-4 col-xs-12">
                            <div className="panel yellow">
                                <img src="/images/highlights/token.webp" />
                                <h3>Crypto Powered P2E Ecosystem</h3>
                                <p>In Universe Island, players get rewarded in $UIM tokens for their wins and time spend in the game.</p>
                            </div>
                        </div>
                        <div className="col-4 col-xs-12">
                            <div className="panel green">
                                <img src="/images/highlights/transfer.webp" />
                                <h3>Story Driven Gaming</h3>
                                <p>Enjoy and live the story plot as you fight your enemy in the Universe Island.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={(el) => ref.current[3] = el} id="join-community">
                <JoinCommunity color={"green"} />
            </section>

            <section ref={(el) => ref.current[4] = el} id="game-features">
                <GameFeatures />
            </section>

            <section ref={(el) => ref.current[5] = el} id="collection">
                <div className="container">
                    <h2 className="orange text-center">Collection</h2>
                    <div className="row">
                        <div className="col-4 col-xxs-12">
                            <h3>"First timer armor"</h3>
                            <p><strong>Basic attributes:</strong></p>
                            <p className="text-bigger text-normal no-bottom-margin">Type:</p>
                            <p className="text-biggest no-top-margin">Armor</p>
                            <p className="text-bigger text-normal no-bottom-margin">Skills:</p>
                            <p className="text-biggest no-top-margin">No Skills</p>
                            <p className="text-bigger text-normal no-bottom-margin">Ability:</p>
                            <p className="text-biggest no-top-margin">+ 100 to Def</p>
                        </div>
                        <div className="col-8  col-xxs-12 d-flex-center-all">
                            <img src="/images/card.webp" alt="collection" />
                        </div>
                    </div>
                    <div className="row nft">
                        <div className="col-6 col-xxs-12 img">
                            <Image
                                className="nft"
                                src={"/images/card_animated.webp?2"}
                                height="200"
                                width="300"
                                loading="lazy"
                                alt="nft card"
                            />
                            
                        </div>
                        <div className="col-6 col-xxs-12 d-flex-center-all">
                            <div>
                                <h3>3D NFT infinity collection</h3>
                                <p className="text-bigger text-normal">Introducing our first of its kind, 3D NFTs – uniquely made for both marketplace and in-game experiences.</p>
                                <a className="btn btn-yellow" target="_blank" href="https://opensea.io/collection/universe-island-nft">Purchase NFT</a>
                            </div>
                        </div>
                    </div>
                    <div className="glow orange"></div>
                    <div className="glow yellow"></div>
                </div>
            </section>
            
            <section ref={(el) => ref.current[6] = el} id="roadmap">
                <Roadmap />
            </section>

            {false ?
                <>                        
                    <section ref={(el) => ref.current[7] = el} id="our-rockstars">
                        <div className="container">
                            <h2 className="orange text-center">Our rockstars</h2>
                            <div className="row">
                                <div className="col-4 col-sm-6 col-xxs-12">
                                    <div className="panel blue">
                                        <img src="/images/people/1.webp" />
                                        <h3>Ladislav <br />Liska</h3>
                                        <p>Electrical engineer with years of programming experiences in many programming languages, such as C, SQL, Delphi, Pascal,…</p>
                                        <a target="_blank" className="btn btn-primary smaller linkedin" href="https://www.linkedin.com/in/ladislav-liska-736319221/">LinkedIn</a>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-6 col-xxs-12">
                                    <div className="panel blue">
                                        <img src="/images/people/2.webp" />
                                        <h3>Myat Shwe <br />Thit</h3>
                                        <p>Bachelor of computer science, experiences as executive assistant of CEO, in bank industry and as a accountant. Marketing strategies and more.</p>
                                        <a target="_blank" className="btn btn-primary smaller linkedin" href="https://www.linkedin.com/in/myat-shwe-yee-thit-0163ab223/">LinkedIn</a>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-6 col-xxs-12">
                                    <div className="panel blue">
                                        <img src="/images/people/3.webp" />
                                        <h3>Ales <br />Vovk</h3>
                                        <p>Master's degree in multimedia systems, software engineer with many years experiences in C, C++, C#. Heavily focused on Crypto world and all its aspects.</p>
                                        <a target="_blank" className="btn btn-primary smaller linkedin" href="https://www.linkedin.com/in/ale%C5%A1-vovk-471969223/">LinkedIn</a>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-6 col-xxs-12">
                                    <div className="panel blue">
                                        <img src="/images/people/5.webp" />
                                        <h3>Zdenek <br />Novotny</h3>
                                        <p>Software developer specialist with many years of experience in most used programming languages as C, C++, C#, Javascript, Python, Perl,…</p>
                                        <a target="_blank" className="btn btn-primary smaller linkedin" href="https://www.linkedin.com/in/zden%C4%9Bk-novotn%C3%BD-99356011b/">LinkedIn</a>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-6 col-xxs-12">
                                    <div className="panel blue">
                                        <img src="/images/people/10.webp" />
                                        <h3>Jan <br />Prochazka</h3>
                                        <p>Software developer specialist with many years of experience with game and VR applications development.</p>
                                        <a target="_blank" className="btn btn-primary smaller linkedin" href="https://www.linkedin.com/in/jan-proch%C3%A1zka-369a7292/">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                            <div className="glow yellow"></div>
                        </div>
                    </section>

                    <section ref={(el) => ref.current[8] = el} id="advisors">
                        <div className="container">
                            <h2 className="orange text-center">Advisors</h2>
                            <div className="row">
                                <div className="col-3 col-sm-6 col-xxs-12">
                                    <div className="panel yellow">
                                        <img src="/images/people/6.webp" />
                                        <h3>Lester Lim</h3>
                                    </div>
                                </div>
                                <div className="col-3 col-sm-6 col-xxs-12">
                                    <div className="panel yellow">
                                        <img src="/images/people/7.webp" />
                                        <h3>Richard</h3>
                                    </div>
                                </div>
                                <div className="col-3 col-sm-6 col-xxs-12">
                                    <div className="panel yellow">
                                        <img src="/images/people/8.webp" />
                                        <h3>Allan</h3>
                                    </div>
                                </div>
                                <div className="col-3 col-sm-6 col-xxs-12">
                                    <div className="panel yellow">
                                        <img src="/images/people/9.webp" />
                                        <h3>Kevin abdulrahman</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="glow yellow"></div>
                        </div>
                    </section>
                </>
            :null}

            <section ref={(el) => ref.current[7] = el} id="blog">
                <div className="container">
                    <h2 className="blue text-center">Game news</h2>
                    {hData.homepageArticles.length > 0 ?
                        <div className="row margin">
                            {hData.homepageArticles.map((item,index) => (

                                <div key={index} className="col-4 col-xs-12">
                                    <article className="panel">
                                        <Link href={"/blog/"+ item.articleID + "-" + item.niceTitle}>
                                            <a className="img"><img src={"/api/article/stredni_"+item.photo} /></a>
                                        </Link>
                                        <h3>{item.title}</h3>
                                        <div dangerouslySetInnerHTML={{__html:item.perex}}></div>
                                        <Link href={"/blog/"+ item.articleID + "-" + item.niceTitle}><a>Read more</a></Link>
                                    </article>
                                </div>

                            ))}
                        </div>
                    :null}
                    <div className="glow blue"></div>
                </div>
            </section>
            
            <section ref={(el) => ref.current[8] = el} id="in-the-news">
                <InTheNews hData={hData} />
            </section>

            <section ref={(el) => ref.current[9] = el} id="our-partnership">
                <div className="container">
                    <h2 className="green text-center">Our partnership</h2>
                    {hData.allPartners.length > 0 ?

                        <LightGallery elementClassNames="grid-list"
                            speed={500}
                        >
                            {hData.allPartners.map((item,index) => (
                                <a key={index} title={item.title ? item.title : ""} href={"/api/partner/stredni_" + item.photo}><img alt="" src={"/api/partner/mala_" + item.photo} /></a>
                            ))}
                        
                        </LightGallery>

                    :null}
                    <div className="glow green"></div>
                </div>
            </section>

            <Announcement />
            <Notification />

        </Layout>
    )

}

export const getServerSideProps = async () => {

    var client = GetApolloClient();

    var hData = await client.query({
        query:GET_HOMEPAGE_DATA,
        fetchPolicy: 'network-only',
    });
    
    return { 
        props:{
            head: {
                title:"UniverseIsland",
                metaDescription: "We are introducing Universe Island: A crypto-powered Sci-Fi 1vs1 online shooter game with detailed maps and attractive characters.",
                ogImage:"/images/share.png",
                linkNameUrl:""
            },
            isHomepage:true,
            hData:hData.data
        }
    }
}

export default Homepage;


