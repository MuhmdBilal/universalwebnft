import { useState } from "react";
import AdminLayout from "../../layout/admin";
import AddEditPartner from "../../components/admin/partner/addEditPartner";
import {GET_ALL_PARTNERS,DELETE_PARTNERS,UPDATE_PARTNER_PRIORITIES } from "../../queries/partner";
import Loading from "../../components/loading";
import {useQuery,useMutation,useApolloClient} from '@apollo/client';
import { GetApolloErrorText } from "../../scripts/helper";
import Error from "../../components/error";
import { UseDeletePartner,UpdateListAfterDelete } from "../../scripts/partner/partner";
import ModalNotification from "../../components/admin/modalNotification";
import { SetNotification } from "../../scripts/notification/notification";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Partners = ({linkName}) => {

    const cl = useApolloClient();
    const listVariables = {
        limit:50,
        offset:0,
        searchText:"",
        onlyActive:false
    }

    const {data,loading,error,fetchMore,refetch} = useQuery(GET_ALL_PARTNERS,{
        variables:listVariables
    });

    const [DelPartners,{error:deleteErr}] = useMutation(DELETE_PARTNERS,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně smazáno",true,false,cl);  
        },
        update:(cache,response) => {
            UpdateListAfterDelete(cache,response,listVariables);
        }
    });

    const [UpdatePartnerPriorities,{error:updateErr}] = useMutation(UPDATE_PARTNER_PRIORITIES,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně upraveno",true,false,cl);  
        },
        update:(cache,response) => {
            refetch();
        }
    });

    const [showAdd,SetShowAdd] = useState(false);
    const [selectedPartnerID,SetSelectedPartnerID] = useState(0);
    const {selectedPartners,showDeleteNotifi,SelectPartner,ShowDelNotify,DeletePartners} = UseDeletePartner(DelPartners);

    const EditPartner = (partnerID) => {
        SetShowAdd(true);
        SetSelectedPartnerID(partnerID);
    }
    const AddPartner = () => {
        SetShowAdd(true);
        SetSelectedPartnerID(0);
    }

    const OnDragEnd = result => {

        if(!result.destination)
            return

        if(
            result.destination.droppableId === result.source.droppableId &&
            result.destination.index === result.source.index
        )
            return
        
		const IDs = result.draggableId.split("-");
        UpdatePartnerPriorities({
            variables:{
                partnerID: IDs[1],
                fromIndex:result.source.index,
                toIndex:  result.destination.index
            }
        });
	};

    var err = "";
    if(error || deleteErr || updateErr)
        err = GetApolloErrorText(error || deleteErr || updateErr);

    return(
        <AdminLayout linkName={linkName}>
            <div className="panel">
                <div className="panel-header">
                    <h1>Partneři</h1>
                    <button onClick={() => AddPartner()} className="btn btn-primary ml-auto">Přidat</button>
                    <button className="btn btn-red" onClick={() => ShowDelNotify(cl)}>Odstranit označené</button>
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            (data && data.allPartners.length > 0 ?
                                <div className="data-list">
                                    <div className="data-list-header">
                                        <div>Název partnera</div>
                                        {false ? <div>URL</div> :null}
                                        <div className="text-center s-200">Aktivní</div>
                                        <div className="text-right s-200">Možnosti</div>
                                    </div>
                                    <div className="data-list-content">

                                        <DragDropContext onDragEnd={(result) => OnDragEnd(result)}>
                                            <Droppable droppableId="droppable">
                                                {(provided, snapshot) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {data.allPartners.map((item,index) => {

                                                            var checked = false;
                                                            for(let val of selectedPartners){
                                                                if(val == item.partnerID)checked = true;
                                                            }

                                                            return(
                                                                <Draggable key={"id-" + item.partnerID} draggableId={"id-" + item.partnerID} index={index}>
                                                                    {(provided, snapshot) => (
                                                                    <div className="data-list-item" 
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div {...provided.dragHandleProps}>
                                                                            <img className="move" src="/images/admin/svg/move.svg" />
                                                                            <img className="article" src={"/api/partner/mala_" + item.photo} />
                                                                            {item.title}
                                                                        </div>
                                                                        {false ? <div><a target="_blank" href={item.url}>{item.url}</a></div>:null}
                                                                        <div className="justify-content-center s-200">
                                                                            {item.active == 1 ?
                                                                                <span className="badge badge-success">Ano</span>
                                                                            :
                                                                                <span className="badge badge-danger">Ne</span>
                                                                            }
                                                                        </div>
                                                                        <div className="text-right s-200 options">
                                                                            <img onClick={() => EditPartner(item.partnerID)} className="edit-icon" src="/images/admin/svg/edit.svg" />
                                                                            <input type="checkbox" name="delete[]" checked={checked} value={item.partnerID} onChange={(e) => SelectPartner(e,item.partnerID)} />
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                </Draggable>
                                                            )
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>

                                    </div>

                                    {data.allPartnersCount > data.allPartners.length ?
                                        <div className="data-list-footer text-center">
                                            <button className="btn btn-primary" onClick={() => fetchMore({
                                                variables: {
                                                    offset: data.allPartners.length
                                                },
                                                updateQuery: (prev, { fetchMoreResult }) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        allPartners: [...prev.allPartners, ...fetchMoreResult.allPartners]
                                                    });
                                                }
                                            })}> Načíst další partnery </button>
                                        </div>
                                    :null}

                                </div>
                            :
                                <div className="admin-alert warning text-center no-top-margin">Momentálně zde nejsou žádní partneři</div>
                            )
                        )
                    :
                        <Loading />
                    }
                </div>
            </div>
            {showAdd ?
                <AddEditPartner SetShow={SetShowAdd} partnerID={selectedPartnerID} listVariables={listVariables} />
            :null}
            {showDeleteNotifi ?
                <ModalNotification callback={DeletePartners} yesNo={true} text="Opravdu chcete odebrat vybrané partnery?" />
            :null}
        </AdminLayout>
    )

}
Partners.getInitialProps = (ctx) => {
    
    return { 
        linkName:"partners"
    }
}

export default Partners;