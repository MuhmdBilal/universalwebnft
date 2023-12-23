import { useEffect,useState } from "react";
import SocialNetworks from "./socialNetworks";

var documentHeight = 0;

const Announcement = () => {

    const [isVisible,SetIsVisible] = useState(false);
    const [isClosed,SetIsClosed] = useState(false);

    const OnScroll = (e) => {
        if(documentHeight / 2 < window.scrollY && !isVisible && !isClosed)
            SetIsVisible(true);
    }

    useEffect(() => {

        var body = document.body, html = document.documentElement;
        documentHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

        window.addEventListener("scroll",OnScroll);
        return () => {
            window.removeEventListener("scroll",OnScroll);
        }

    },[isVisible,isClosed])

    const Close = () => {
        SetIsClosed(true);
        SetIsVisible(false);
    }

    return(
        <div id="announcement" className={isVisible ? "open" : ""}>

            <img className="close" onClick={() => Close()} src="/images/svg/close.svg" />
            <h3>Announcement</h3>
            <p className="text-smaller no-top-margin">LANDSALE STARTED</p>
            <a href="https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&&outputCurrency=0x1BB132D6039b81FaEdc524a30E52586b6Ca15f48" target="_blank" className="btn btn-primary">Purchase your land now</a>
            <p className="text-smaller">Limited by 500 NFTs</p>
            <p className="text-smaller">Please check out our twitter to learn more about our official announcements.</p>
        

           

        </div>
    )
}

export default Announcement;