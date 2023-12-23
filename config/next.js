import { ApolloClient, InMemoryCache,ApolloLink,concat } from '@apollo/client';
//import {ApolloLink,concat} from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import {GRAPHQL_SERVER_URL} from './index';
import withApollo from 'next-with-apollo';

// URl adresa na server pro graphql
const httpLink = new createUploadLink({ 
	uri: GRAPHQL_SERVER_URL,
	headers:{'Apollo-Require-Preflight': 'true'}
});

//prostředník, který při každém requestu zasílá token na server z localstorage
const authMiddleware = new ApolloLink((operation, forward) => {
	
	// add the authorization to the headers
	operation.setContext({
	  headers: {
		authorization: "Bearer " + (typeof localStorage !== 'undefined' && localStorage !== null ? (localStorage.getItem('uitoken') || null) : null),
	  }
	});
  
	return forward(operation);
});

const GetClient = () => {

	var cache = new InMemoryCache();

	var apolloClient = new ApolloClient({
		link: concat(authMiddleware, httpLink), 
		//link: httpLink,
        cache: cache	
	})

	return apolloClient;

}

export const GetApolloClient = () => {
	return GetClient();
}

export default withApollo(({ ctx, headers, initialState }) =>{

    return GetClient();

})