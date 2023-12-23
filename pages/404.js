import Layout from '../layout/layout';
import {GET_ALL_LINKS} from '../queries/link';
import {useQuery} from '@apollo/client';

const NotFound = () => {

    const {data,loading,error} = useQuery(GET_ALL_LINKS,{
        variables:{
            limit:100000,
            offset:0,
            searchText:"",
            onlyActive:true
        },
        fetchPolicy: 'network-only'
    });

    return(
        <Layout 
            title = {"Not found - UniverseIsland"} 
            metaDescription = {""} 
            ogImage = {"/images/share.png"} 
            isHomepage={false}
            footerLinks = {data && data.allLinks} 
        >
            <section id="page-not-found">

                <div className="page container">
                    <div className="text-center">
                        <h1>We are very sorry...</h1>
                        <p>We couldn't find this page.</p>
                    </div>
                </div>

            </section>
        </Layout>
    )

}

export default NotFound;