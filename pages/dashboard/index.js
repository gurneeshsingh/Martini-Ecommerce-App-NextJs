
import Head from 'next/head';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Redirect } from "../signin";
import AdminUserSmallWidget from '../../components/AdminUserSmallWidget';
import AdminOrdersBigWidget from '../../components/AdminOrdersBigWidget';



const dashboard = () => {

    const user = useSelector((state) => state.user.currentUser);
    const [hamburgerToggle, setHamburgerToggle] = useState(false);

    if (!user || !user?.isAdmin) {
        return <Redirect to="/" />
    }


    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <AdminNavbar toggle={hamburgerToggle} setToggle={setHamburgerToggle} />
            <main className="flex w-full h-full ">
                <AdminSidebar toggle={hamburgerToggle} />
                {/* right side section  */}
                <div className="w-full h-full flex flex-col">
                    <section className="w-full h-full p-5 flex-col flex sm:flex-row space-y-5 space-x-0 sm:space-x-5 sm:space-y-0 ">
                        <AdminUserSmallWidget />
                        <AdminOrdersBigWidget />
                    </section>
                </div>

            </main>

        </>
    )
}

export default dashboard;
