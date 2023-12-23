import '../styles/main.css';
import '../styles/admin/admin.css';
import '../styles/xl.css';
import '../styles/lg.css';
import '../styles/md.css';
import '../styles/sm.css';
import '../styles/xs.css';
import '../styles/xxs.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import 'lightgallery/css/lightgallery.css';

import withApollo from '../config/next';
import {ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../components/admin/authentication/authProvider';


const UniverseIsland = ({ Component, pageProps, apollo}) =>
{

    return(
        <AuthProvider>
            <ApolloProvider client={apollo}>
                <Component {...pageProps} />
            </ApolloProvider>
        </AuthProvider>
    )
}

export default withApollo(UniverseIsland);