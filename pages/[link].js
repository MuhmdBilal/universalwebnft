import {useState} from 'react';
import Layout from "../layout/layout";
import PageSidePanel from "../components/pageSidePanel";
import {ScrollToElement } from "../scripts/helper";
import {GetApolloClient} from '../config/next';
import {GET_LINK_DATA} from '../queries/link';

const Link = ({head,isHomepage,link,allLinks}) => {

    const [isOpen, SetIsOpen] = useState(false);

    const LinkClick = (e) => {
        SetIsOpen(false);
        ScrollToElement(e);
    }

    const headings = [];

    const contentWithHeadingIds = link.text.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, html) => {
        const text = html.replace(/<.*?>/g, "").replace(/&amp;/g, "&");
        const id = text
        .replace(/\s/g, "-")
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "");
        headings.push({ id, text });
        return `<h${level} id="${id}">${html}</h${level}>`;
    });

    return(
        <Layout 
            title = {head.title} 
            metaDescription = {head.metaDescription} 
            ogImage = {head.ogImage} 
            isHomepage={isHomepage} 
            footerLinks = {allLinks}
            linkNameUrl = {head.linkNameUrl}
        >
            <div className="page container">
                <div className="row with-side-panel">
                    <div className="col-8 col-xs-12">
                        
                        <div className="text-content">
                            
                            <h1>{link.title}</h1>
                            <div dangerouslySetInnerHTML={{__html:contentWithHeadingIds}}></div>
                            
                        </div>

                    </div>
                    <div className="col-4 col-xs-12">
                        
                        <PageSidePanel clName="scroll">
                            <h4 onClick={() => SetIsOpen(!isOpen)}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
                                    Table of Contents
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
                            </h4>
                            <ul className={(isOpen ? "open" :"")}>
                                {headings.map((item,index) => (
                                    <li><a onClick={(e) => LinkClick(e)} href={"#-" + item.id}>{item.text}</a></li>
                                ))}
                                
                            </ul>
                        </PageSidePanel>
                        
                    </div>
                </div>
                <div className="glow page green"></div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {

    var url = ctx.params.link;
    url = url.split("-");
    url = url[0];

    var er = /^[0-9]+$/;
    if(er.test(url)){
        url = parseInt(url);
    }else{
        url = 0;
    }

    var client = GetApolloClient();

    var hData = await client.query({
        query:GET_LINK_DATA,
        variables:{
            linkID:url
        },
        fetchPolicy: 'network-only',
    });

    if(!hData.data.link){
        return { notFound: true }
    }

    var link = hData.data.link;
    
    return { 
        props:{
            head: {
                title:(link.metaTitle ? link.metaTitle : link.title) + " - UniverseIsland",
                metaDescription: link.metaDescription,
                ogImage:(link.photo ? "/images/link/stredni_" + link.photo : ""),
                linkNameUrl:  + hData.data.link.linkID + "-" + hData.data.link.niceTitle
            },
            isHomepage:false,
            link:link,
            allLinks: hData.data.allLinks
        }
    }
}

export default Link;