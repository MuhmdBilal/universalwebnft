import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({title,metaKeywords,metaDescription,ogImage,linkNameUrl,children,isHomepage,footerLinks}) =>
{
    return(
        <>
            <Head>

                <title>{title}</title>

                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"></meta>
                <meta name="keywords" content={metaKeywords} />
                <meta name="description" content={metaDescription} />
                
                <meta property="og:image" content={ogImage} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={metaDescription} />

                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={ogImage}></meta>

                <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"></meta>
                
                <link rel="canonical" href={"https://universeisland.games/" + linkNameUrl}></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap" rel="stylesheet" />
                <link rel='icon' href='/images/favicon.ico' importance='low' />

            </Head>

            <Header linkNameUrl={linkNameUrl} isHomepage={isHomepage}/>
            {children}
            <Footer footerLinks={footerLinks} />
            
        </>
    )
}

export default Layout;