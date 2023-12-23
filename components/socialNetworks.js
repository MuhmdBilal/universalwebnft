const SocialNetworks = ({size,align}) => {

    return(
        <div className={"social-networks" + (size == "big" ? " big" : "") + (align == "center" ? " justify-content-center" : "")}>
            <a title="Twitter" target="_blank" href="https://twitter.com/_UNIVERSEISLAND"><img src="/images/svg/twitter.svg" /></a>
            <a target="_blank" href="https://t.me/UNIVERSEISLAND"><img src="/images/svg/telegram.svg" /></a>
            <a title="Discord" target="_blank" href="https://discord.com/invite/hCBZu7M5Mq"><img src="/images/svg/discord.svg" /></a>
            <a target="_blank" href="https://www.youtube.com/channel/UCc8MY23n9CiJv0Hs0oddCJA/videos"><img src="/images/svg/youtube.svg" /></a>
            <a target="_blank" href="https://t.me/UNIVERSEISLANDA"><img src="/images/svg/telegram.svg" /></a>
            <a target="_blank" href="https://medium.com/@UniverseIsland"><img src="/images/svg/medium.svg" /></a>
        </div>
    )

}

export default SocialNetworks;