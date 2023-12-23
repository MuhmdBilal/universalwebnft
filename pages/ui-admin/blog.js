import { useState } from "react";
import AdminLayout from "../../layout/admin";
import AddEditArticle from "../../components/admin/blog/addEditArticle";
import {GET_ALL_ARTICLES,DELETE_ARTICLES,UPDATE_ARTICLE_PRIORITIES } from "../../queries/blog";
import Loading from "../../components/loading";
import {useQuery,useMutation,useApolloClient} from '@apollo/client';
import { GetApolloErrorText } from "../../scripts/helper";
import Error from "../../components/error";
import { UseDeleteArticle,UpdateListAfterDelete } from "../../scripts/blog/article";
import ModalNotification from "../../components/admin/modalNotification";
import { SetNotification } from "../../scripts/notification/notification";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Blog = ({linkName}) => {

    const cl = useApolloClient();
    const listVariables = {
        limit:30,
        offset:0,
        searchText:"",
        onlyActive:false
    }

    const {data,loading,error,fetchMore,refetch} = useQuery(GET_ALL_ARTICLES,{
        variables:listVariables,
        fetchPolicy: 'network-only'
    });

    const [DelArticles,{error:deleteErr}] = useMutation(DELETE_ARTICLES,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně smazáno",true,false,cl);  
        },
        update:(cache,response) => {
            UpdateListAfterDelete(cache,response,listVariables);
        }
    });

    const [UpdateArticlePriorities,{error:updateErr}] = useMutation(UPDATE_ARTICLE_PRIORITIES,{
        onCompleted:(data) => {
            SetNotification(null,"Úspěšně upraveno",true,false,cl);  
        },
        update:(cache,response) => {
            refetch();
        }
    });

    const [showAdd,SetShowAdd] = useState(false);
    const [selectedArticleID,SetSelectedArticleID] = useState(0);
    const {selectedArticles,showDeleteNotifi,SelectArticle,ShowDelNotify,DeleteArticles} = UseDeleteArticle(DelArticles);

    const EditArticle = (articleID) => {
        SetShowAdd(true);
        SetSelectedArticleID(articleID);
    }
    const AddArticle = () => {
        SetShowAdd(true);
        SetSelectedArticleID(0);
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
        UpdateArticlePriorities({
            variables:{
                articleID: IDs[1],
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
                    <h1>Blog</h1>
                    <button onClick={() => AddArticle()} className="btn btn-primary ml-auto">Přidat</button>
                    <button className="btn btn-red" onClick={() => ShowDelNotify(cl)}>Odstranit označené</button>
                </div>
                <div className="panel-content">

                    {!loading ?
                        (err ?
                            <Error text={err} />
                        :
                            (data && data.allArticles.length > 0 ?
                                <div className="data-list">
                                    <div className="data-list-header">
                                        <div>Název článku</div>
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
                                                        {data.allArticles.map((item,index) => {

                                                            var checked = false;
                                                            for(let val of selectedArticles){
                                                                if(val == item.articleID)checked = true;
                                                            }

                                                            return(
                                                                <Draggable key={"id-" + item.articleID} draggableId={"id-" + item.articleID} index={index}>
                                                                    {(provided, snapshot) => (
                                                                    <div className="data-list-item" 
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                    >
                                                                        <div {...provided.dragHandleProps}>
                                                                            <img className="move" src="/images/admin/svg/move.svg" />
                                                                            <img className="article" src={"/api/article/mala_" + item.photo} />
                                                                            {item.title}
                                                                        </div>
                                                                        <div><a href={"https://www.universeisland.games/blog/" +item.articleID + "-" + item.niceTitle}>{"https://www.universeisland.games/blog/" +item.articleID + "-" + item.niceTitle}</a></div>
                                                                        <div className="justify-content-center s-200">
                                                                            {item.active == 1 ?
                                                                                <span className="badge badge-success">Ano</span>
                                                                            :
                                                                                <span className="badge badge-danger">Ne</span>
                                                                            }
                                                                        </div>
                                                                        <div className="text-right s-200 options">
                                                                            <img onClick={() => EditArticle(item.articleID)} className="edit-icon" src="/images/admin/svg/edit.svg" />
                                                                            <input type="checkbox" name="delete[]" checked={checked} value={item.articleID} onChange={(e) => SelectArticle(e,item.articleID)} />
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

                                    {data.allArticlesCount > data.allArticles.length ?
                                        <div className="data-list-footer text-center">
                                            <button className="btn btn-primary" onClick={() => fetchMore({
                                                variables: {
                                                    offset: data.allArticles.length
                                                },
                                                updateQuery: (prev, { fetchMoreResult }) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        allArticles: [...prev.allArticles, ...fetchMoreResult.allArticles]
                                                    });
                                                }
                                            })}> Načíst další články </button>
                                        </div>
                                    :null}

                                </div>
                            :
                                <div className="admin-alert warning text-center no-top-margin">Momentálně zde nejsou žádné články</div>
                            )
                        )
                    :
                        <Loading />
                    }
                </div>
            </div>
            {showAdd ?
                <AddEditArticle SetShow={SetShowAdd} articleID={selectedArticleID} listVariables={listVariables} />
            :null}
            {showDeleteNotifi ?
                <ModalNotification callback={DeleteArticles} yesNo={true} text="Opravdu chcete odebrat vybrané články?" />
            :null}
        </AdminLayout>
    )

}
Blog.getInitialProps = (ctx) => {
    
    return { 
        linkName:"blog"
    }
}

export default Blog;