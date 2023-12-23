import Head from "next/head";

const AdminLoginLayout = ({children}) => {

    return(
        <>
            <Head>

                <title>Admin - Universe Island</title>

                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap" rel="stylesheet" />
                <link rel='icon' href='/images/favicon.ico' importance='low' />

            </Head>
            <div id="admin-container">
                {children}
            </div>
            <div id="modal-root" ></div>
        </>
    )
}

export default AdminLoginLayout;