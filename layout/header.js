import Link from 'next/link';
import { useState } from 'react';
import SocialNetworks from '../components/socialNetworks';
import {ScrollToElement } from '../scripts/helper';
import Image from 'next/future/image';
import { IsSafari } from '../scripts/helper';
import { useEffect } from 'react';

const Header = ({isHomepage}) => {

    const [openMenu, SetOpenMenu] = useState(false);
    const [isSafari, SetIsSafari] = useState(false);

    useEffect(() => {
        if(IsSafari())
            SetIsSafari(true);
        else 
            SetIsSafari(false); 
    },[])

    const menu = [
        {title:"Game",href:"main"},
        {title:"Collection",href:"collection"},
        {title:"Roadmap",href:"roadmap"},
        {title:"Blog",href:"blog"},
        {title:"In the news",href:"in-the-news"},
    ]

    const OnLinkClick = (e) => {
        SetOpenMenu(false);
        ScrollToElement(e);
    }

    return(
        <header>

            <div className="community">
                <div className="container">
                    <div>
                        <a onClick={(e) => ScrollToElement(e)} href="/#-download" className="download">Download the new game.</a>
                    </div>
                    <div className="socials">
                        <span>JOIN UNIVERSE ISLAND NOW!</span>
                       
                    </div>
                </div>
            </div>
            <div className="menu">
                <div className="container">
                    <Link href="/">
                        <a id="logo" >
                            <Image
                                src={"/images/LogoAnimated." + (isSafari ? "apng" : "webp?2" )}
                                height="200"
                                width="300"
                                priority
                                alt="universe island logo"
                            />
                        </a>
                    </Link>
                    <nav className={(openMenu ? "open" : "")}>
                        <ul>
                            <li className="mobile-close"><img onClick={() => SetOpenMenu(false)} alt="" src="/images/svg/close.svg" /></li>
                            {menu.map((item,index) => {

                                if(isHomepage)
                                {
                                    return(<li key={index}><a onClick={(e) => OnLinkClick(e)} href={"/#-" + item.href}>{item.title}</a></li>);
                                }
                                else
                                {
                                    return(<li key={index}><Link onClick={() => SetOpenMenu(false)} href={"/#-" + item.href}><a>{item.title}</a></Link></li>);
                                }
                                
                            })}
                            <li className="market"><a className="btn btn-yellow" target="_blank" href="https://opensea.io/collection/universe-island-nft">Purchase NFT</a></li>
                        </ul>
                    </nav>
                    <div className="mobile-menu-button">
                        <img onClick={() => SetOpenMenu(true)} className="arrow" src="/images/svg/hamburger.svg" />
                        <a className="btn btn-yellow" target="_blank" href="https://opensea.io/collection/universe-island-nftt">Purchase NFT</a>
                        <div onClick={() => SetOpenMenu(false)} className={"mobile-menu-ovelay" + (openMenu ? " open" : "")}></div>
                    </div>
                </div>
            </div>
            
        </header>
    )

}

export default Header;