import { useState } from "react";
import AdminLayout from "../../layout/admin";
import AddEditLink from "../../components/admin/link/addEditLink";
import {GET_ALL_LINKS,DELETE_LINKS } from "../../queries/link";
import Loading from "../../components/loading";
import {useQuery,useMutation,useApolloClient} from '@apollo/client';
import { GetApolloErrorText } from "../../scripts/helper";
import Error from "../../components/error";
import { UseDeleteLink,UpdateListAfterDelete,UpdateListAfterDrag } from "../../scripts/link/link";
import ModalNotification from "../../components/admin/modalNotification";
import { SetNotification } from "../../scripts/notification/notification";

const Links = ({linkName}) => {

    const cl = useApolloClient();
    const listVariables = {
        limit:30,
        offset:0,
        searchText:"",
        onlyActive:false
    }

    const {data,loading,error,fetchMore,refetch} = useQuery(GET_ALL_LINKS,{
        variables:listVariables
    });

    const [DelLinks,{error:deleteErr}] = useMutation(DELETE_LINKS,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně smazáno",true,false,cl);  
        },
        update:(cache,response) => {
            UpdateListAfterDelete(cache,response,listVariables);
        }
    });

    const [showAdd,SetShowAdd] = useState(false);
    const [selectedLinkID,SetSelectedLinkID] = useState(0);
    const {selectedLinks,showDeleteNotifi,SelectLink,ShowDelNotify,DeleteLinks} = UseDeleteLink(DelLinks);

    const EditLink = (linkID) => {
        SetShowAdd(true);
        SetSelectedLinkID(linkID);
    }

    const AddLink = () => {
        SetShowAdd(true);
        SetSelectedLinkID(0);
    }

    var err = "";
    if(error || deleteErr)
        err = GetApolloErrorText(error || deleteErr);

    return(
        <AdminLayout linkName={linkName}>
            <div className="panel">
                <div className="panel-header">
                    <h1>Odkazy</h1>
                    {false ?
                        <>
                        <button onClick={() => AddLink()} className="btn btn-primary ml-auto">Přidat</button>
                        <button className="btn btn-red" onClick={() => ShowDelNotify(cl)}>Odstranit označené</button>
                        </>
                    :null}
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            (data && data.allLinks.length > 0 ?
                                <div className="data-list">
                                    <div className="data-list-header">
                                        <div>Název odkazu</div>
                                        <div className="text-center s-200">Aktivní</div>
                                        <div className="text-right s-200">Možnosti</div>
                                    </div>
                                    <div className="data-list-content">

                                        {data.allLinks.map((item,index) => {

                                            var checked = false;
                                            for(let val of selectedLinks){
                                                if(val == item.linkID)checked = true;
                                            }

                                            return(
                                               
                                                <div key={index} className="data-list-item">
                                                    <div>
                                                        {item.photo ? <img className="article" src={"/api/link/mala_" + item.photo} />:null}
                                                        {item.title}
                                                    </div>
                                                    <div className="justify-content-center s-200">
                                                        {item.active == 1 ?
                                                            <span className="badge badge-success">Ano</span>
                                                        :
                                                            <span className="badge badge-danger">Ne</span>
                                                        }
                                                    </div>
                                                    <div className="text-right s-200 options">
                                                        <img onClick={() => EditLink(item.linkID)} className="edit-icon" src="/images/admin/svg/edit.svg" />
                                                        {false ? <input type="checkbox" name="delete[]" checked={checked} value={item.linkID} onChange={(e) => SelectLink(e,item.linkID)} /> : null}
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>

                                    {data.allLinksCount > data.allLinks.length ?
                                        <div className="data-list-footer text-center">
                                            <button className="btn btn-primary" onClick={() => fetchMore({
                                                variables: {
                                                    offset: data.allLinks.length
                                                },
                                                updateQuery: (prev, { fetchMoreResult }) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        allLinks: [...prev.allLinks, ...fetchMoreResult.allLinks]
                                                    });
                                                }
                                            })}> Načíst další odkazy </button>
                                        </div>
                                    :null}

                                </div>
                            :
                                <div className="admin-alert warning text-center no-top-margin">Momentálně zde nejsou žádné odkazy</div>
                            )
                        )
                    :
                        <Loading />
                    }
                </div>
            </div>
            {showAdd ?
                <AddEditLink SetShow={SetShowAdd} linkID={selectedLinkID} listVariables={listVariables} />
            :null}
            {showDeleteNotifi ?
                <ModalNotification callback={DeleteLinks} yesNo={true} text="Opravdu chcete odebrat vybrané odkazy?" />
            :null}
        </AdminLayout>
    )

}
Links.getInitialProps = (ctx) => {
    
    return { 
        linkName:"links"
    }
}

export default Links;