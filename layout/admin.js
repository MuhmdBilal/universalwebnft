import AdminHeader from "./adminHeader";
import AdminMenu from "./adminMenu";
import Notification from "../components/notification";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../components/admin/authentication/authProvider";
import { ADMIN_URL } from "../config";
import Head from "next/head";

const AdminLayout = ({children,linkName}) => {

    const router = useRouter();
    const {IsSignedIn,loading} = useAuth();
    
    useEffect(() =>{
        if(!IsSignedIn() && !loading)router.push("/" + ADMIN_URL);
    },[IsSignedIn,loading])

    if(IsSignedIn() && !loading){

        return(
            <>
                <Head>

                    <title>Admin - Universe Island</title>

                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
                    <link rel='icon' href='/images/favicon.ico' importance='low' />

                </Head>
                <div id="admin-container">
                    <>
                        <AdminMenu linkName={linkName} />
                        <div className="header-and-content">
                            <AdminHeader />
                            <div className="content">
                                {children}
                            </div>
                        </div>
                        <Notification />
                    </>
                    
                    <div id="modal-root" ></div>
                </div>
            </>
        )

    }else{
        return(<div id="modal-root" ></div>);
    }
}

export default AdminLayout;