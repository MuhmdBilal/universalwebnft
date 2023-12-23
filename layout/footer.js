import JoinCommunity from "../components/homepage/joinCommunity";
import Link from 'next/link';
import SocialNetworks from "../components/socialNetworks";

const Footer = ({footerLinks}) => {

    return(
        <footer>

            <section id="join-community" className="visible">
                <JoinCommunity color={"orange"} />
            </section>

            <section className="logo">
                <div className="container text-center">
                    <img className="logo" src="/images/logo.webp" />
                </div>
            </section>
            <section id="links">
                <div className="container">
                    <div className="row">
                        <div className="col-4 col-xs-6 col-xxs-12 item">
                            <h3>Useful links</h3>
                            <ul>
                                <li>
                                    <Link href="/partnership-request"><a> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg> Partnership Request</a></Link>
                                </li>
                                <li>
                                    <Link href="/bug-report-form"><a> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg> Bug Report Form</a></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4 col-xs-6 col-xxs-12 item">
                            <h3>Policy and terms</h3>
                            <ul>
                                {footerLinks && footerLinks.map((item,index) => (
                                    <li key={index}>
                                        <Link href={"/" + item.linkID + "-" + item.niceTitle}><a> <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg> {item.title}</a></Link>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                        <div className="col-4 col-xs-12 item">
                            <h3>Official socials</h3>
                            <SocialNetworks size="big" />
                        </div>
                    </div>
                </div>
            </section>

            <p className="text-center">COPYRIGHT © 2022 UNIVERSE ISLAND LLC ALL RIGHTS RESERVED</p>

        </footer>
    )

}

export default Footer;