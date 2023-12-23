import { useState } from "react";
import AdminLayout from "../../layout/admin";
import AddEditNews from "../../components/admin/news/addEditNews";
import {GET_ALL_NEWS,DELETE_NEWS,UPDATE_NEWS_PRIORITIES } from "../../queries/news";
import Loading from "../../components/loading";
import {useQuery,useMutation,useApolloClient} from '@apollo/client';
import { GetApolloErrorText } from "../../scripts/helper";
import Error from "../../components/error";
import { UseDeleteNews,UpdateListAfterDelete,UpdateListAfterDrag } from "../../scripts/news/news";
import ModalNotification from "../../components/admin/modalNotification";
import { SetNotification } from "../../scripts/notification/notification";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const InTheNews = ({linkName}) => {

    const cl = useApolloClient();

    const listVariables = {
        limit:30,
        offset:0,
        searchText:"",
        onlyActive:false
    }

    const {data,loading,error,fetchMore,refetch} = useQuery(GET_ALL_NEWS,{
        variables:listVariables
    });

    const [DelNews,{loading:deleteLoading,error:deleteErr}] = useMutation(DELETE_NEWS,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně smazáno",true,false,cl);  
        },
        update:(cache,response) => {
            UpdateListAfterDelete(cache,response,listVariables);
        }
    });

    const [UpdateNewsPriorities,{error:updateErr}] = useMutation(UPDATE_NEWS_PRIORITIES,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně upraveno",true,false,cl);  
        },
        update:(cache,response) => {
            refetch();
        }
    });

    const [showAdd,SetShowAdd] = useState(false);
    const [selectedNewsID,SetSelectedNewsID] = useState(0);
    const {selectedNews,showDeleteNotifi,SelectNews,ShowDelNotify,DeleteNews} = UseDeleteNews(DelNews);

    const EditNews = (newsID) => {
        SetShowAdd(true);
        SetSelectedNewsID(newsID);
    }

    const AddNews = () => {
        SetShowAdd(true);
        SetSelectedNewsID(0);
    }

    const OnDragEnd = result => {

		const IDs = result.draggableId.split("-");
        UpdateNewsPriorities({
            variables:{
                newsID: IDs[1],
                fromIndex:result.source.index,
                toIndex:  result.destination.index
            }
        });
	};

    var err = "";
    if(error)
        err = GetApolloErrorText(error);

    return(
        <AdminLayout linkName={linkName}>
            <div className="panel">
                <div className="panel-header">
                    <h1>Novinky</h1>
                    <button onClick={() => AddNews(true)} className="btn btn-primary ml-auto">Přidat</button>
                    <button className="btn btn-red" onClick={() => ShowDelNotify(cl)}>Odstranit označené</button>
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            (data && data.allNews.length > 0 ?
                                <div className="data-list">
                                    <div className="data-list-header">
                                        <div>Název novinky</div>
                                        <div>URL</div>
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
                                                        {data.allNews.map((item,index) => {

                                                            var checked = false;
                                                            for(let val of selectedNews){
                                                                if(val == item.newsID)checked = true;
                                                            }

                                                            return(
                                                                <Draggable key={"id-" + item.newsID} draggableId={"id-" + item.newsID} index={index}>
                                                                    {(provided, snapshot) => (
                                                                    <div className="data-list-item" 
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div {...provided.dragHandleProps}>
                                                                            <img className="move" src="/images/admin/svg/move.svg" />
                                                                            <img className="article" src={"/api/news/mala_" + item.photo} />
                                                                            {item.title}
                                                                        </div>
                                                                        <div><a target="_blank" href={item.url}>{item.url}</a></div>
                                                                        <div className="justify-content-center s-200">
                                                                            {item.active == 1 ?
                                                                                <span className="badge badge-success">Ano</span>
                                                                            :
                                                                                <span className="badge badge-danger">Ne</span>
                                                                            }
                                                                        </div>
                                                                        <div className="text-right s-200 options">
                                                                            <img onClick={() => EditNews(item.newsID)} className="edit-icon" src="/images/admin/svg/edit.svg" />
                                                                            <input type="checkbox" name="delete[]" checked={checked} value={item.newsID} onChange={(e) => SelectNews(e,item.newsID)} />
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

                                    {data.allNewsCount > data.allNews.length ?
                                        <div className="data-list-footer text-center">
                                            <button className="btn btn-primary" onClick={() => fetchMore({
                                                variables: {
                                                    offset: data.allNews.length
                                                },
                                                updateQuery: (prev, { fetchMoreResult }) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        allNews: [...prev.allNews, ...fetchMoreResult.allNews]
                                                    });
                                                }
                                            })}> Načíst další novinky </button>
                                        </div>
                                    :null}

                                </div>
                            :
                                <div className="admin-alert warning text-center no-top-margin">Momentálně zde nejsou žádné novinky</div>
                            )
                        )
                    :
                        <Loading />
                    }
                </div>
            </div>
            {showAdd ?
                <AddEditNews SetShow={SetShowAdd} newsID={selectedNewsID} listVariables={listVariables} />
            :null}
            {showDeleteNotifi ?
                <ModalNotification callback={DeleteNews} yesNo={true} text="Opravdu chcete odebrat vybrané novinky?" />
            :null}
        </AdminLayout>
    )

}
InTheNews.getInitialProps = (ctx) => {
    
    return { 
        linkName:"in-the-news"
    }
}

export default InTheNews;