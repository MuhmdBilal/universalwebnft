import Layout from "../../layout/layout";
import BouncingArrow from "../../components/bouncingArrow";
import SocialNetworks from "../../components/socialNetworks";
import PageSidePanel from "../../components/pageSidePanel";
import {GetApolloClient} from '../../config/next';
import {GET_ARTICLE_DATA,GET_ARTICLE_BY_URL} from '../../queries/blog';
import Link from 'next/link';

const Article = ({head,isHomepage,article,allLinks}) => {

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
                        
                        <article className="text-content">
                            
                            <h1>{article.title}</h1>
                            <img src={"/api/article/velka_" + article.photo} />
                            <div dangerouslySetInnerHTML={{__html:article.text}}></div>

                                                        
                        </article>

                    </div>
                    <div className="col-4 col-xs-12">

                        <PageSidePanel>
                            <h4>Join to Offical Community</h4>
                            <BouncingArrow color="green" />
                            <SocialNetworks size={"big"} align={"center"} />
                            <img className="bg" src={"/images/characters/universe_island_character_2.webp"} alt="" />
                        </PageSidePanel>
                        
                    </div>
                </div>
                <div className="row article-next-previous-links">
                    <div className="col-6 col-xxs-12">
                        {article.previousArticle ?
                            <Link href={"/blog/" + article.previousArticle.articleID + "-" + article.previousArticle.niceTitle}>
                                <a className="d-flex align-items-center">
                                    <img src="/images/svg/double_left_arrow.svg" />
                                    <p>
                                        <span>Previous</span>
                                        {article.previousArticle.title}
                                    </p>
                                </a>
                            </Link>
                        :null}
                    </div>
                    <div className="col-6  col-xxs-12">
                        {article.nextArticle ?
                            <Link href={"/blog/" + article.nextArticle.articleID + "-" + article.nextArticle.niceTitle}>
                                <a className="d-flex align-items-center justify-content-end">
                                    <p className="right">
                                        <span>Next</span>
                                        {article.nextArticle.title}
                                    </p>
                                    <img className="right" src="/images/svg/double_right_arrow.svg" />
                                </a>
                            </Link>
                        :null}
                    </div>
                </div>
                <div className="glow page green"></div>
            </div>
        </Layout>
    )

}

export const getServerSideProps = async (ctx) => {

    var url = ctx.params.article;
    url = url.split("-");
    url = url[0];

    var er = /^[0-9]+$/;
    if(er.test(url)){
        url = parseInt(url);
    }else{
        url = 0;
    }

    var query = GET_ARTICLE_DATA;
    var variables = {articleID:url};

    if(url == 0)
    {
        var articleUrl = "https://universeisland.games" + ctx.req.url;
        articleUrl     = articleUrl.split("?");
        articleUrl     = articleUrl[0];

        if(articleUrl.charAt(articleUrl.length - 1) == "/"){
            articleUrl = articleUrl.slice(0, -1);
        }

        query     = GET_ARTICLE_BY_URL;
        variables = {url:articleUrl};
       
    }

    var client = GetApolloClient();

    var hData = await client.query({
        query:query,
        variables:variables,
        fetchPolicy: 'network-only',
    });

    if(url == 0)
    {
        if(hData.data.articleByUrl){

            return {
                redirect: {
                    permanent: false,
                    destination: "/blog/" + hData.data.articleByUrl.articleID + "-" + hData.data.articleByUrl.niceTitle
                }
            }

        }else{
            return { notFound: true }
        }
    }

    if(!hData.data.article){
        return { notFound: true }
    }

    var article = hData.data.article;
    
    return { 
        props:{
            head: {
                title:(article.metaTitle ? article.metaTitle : article.title) + " - UniverseIsland",
                metaDescription: article.metaDescription,
                ogImage:"/api/article/stredni_" + article.photo,
                linkNameUrl:  "blog/" + hData.data.article.articleID + "-" + hData.data.article.niceTitle
            },
            isHomepage:false,
            article:article,
            allLinks: hData.data.allLinks
        }
    }
}

export default Article;