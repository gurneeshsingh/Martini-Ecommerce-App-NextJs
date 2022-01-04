import Head from 'next/head';
import { useSelector } from 'react-redux';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Redirect } from "../signin";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { MdDelete } from "react-icons/md";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const users = () => {

    const [allusers, setAllusers] = useState([]);
    const [hamburgerToggle, setHamburgerToggle] = useState(false);

    const adminUser = useSelector((state) => state.user.currentUser);

    if (!adminUser || !adminUser?.isAdmin) {
        return <Redirect to="/" />
    }

    useEffect(() => {
        async function getAllUsersFromDb() {
            try {
                const response = await axios.get('https://martiniapi.herokuapp.com/api/user', {
                    headers: {
                        'auth-token': adminUser?.authToken
                    }
                })
                setAllusers(response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        adminUser && getAllUsersFromDb()
    }, [adminUser]);

   

    async function handleDelete(id) {
        const index = allusers?.findIndex((item) => item._id === id)
        if (index >= 0) {
            const copy = [...allusers]
            copy?.splice(index, 1)
        }
        try {
            const response = await axios.delete(`https://martiniapi.herokuapp.com/api/user/${id}`, {
                headers: {
                    'auth-token': adminUser?.authToken
                }
            })

            toast.info("User Deleted", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        } catch (error) {
            console.log(error);
        }
    }

    const COLUMNS = [
        {
            field: "_id", headerName: "ID", width: 170,
            renderCell: (params) => {
                return (
                    <p className="text-xs text-gray-700 ">{params.row._id}</p>
                )
            }
        },
        {
            field: "username", headerName: "USERNAME", width: 170,
            renderCell: (params) => {
                return (
                    <p className="text-xs text-gray-700 ml-6">{params.row.username}</p>
                )
            }
        },
        {
            field: "email", headerName: "EMAIL", width: 170,
            renderCell: (params) => {
                return (
                    <p className="text-xs text-gray-700">{params.row.email}</p>
                )
            }
        },
        {
            field: "isAdmin", headerName: "ADMIN", width: 130,
            renderCell: (params) => {
                return (

                    <p className="text-xs text-gray-700 font-semibold">{params.row.isAdmin.toString()}</p>
                )
            }
        },
        {
            field: "createdAt", headerName: "JOINED", width: 150,
            renderCell: (params) => {
                return (
                    <p className="text-xs text-gray-700">{format(params.row.createdAt)}</p>

                )
            }
        },
        {
            field: "action", headerName: "ACTION", width: 130,
            renderCell: (params) => {
                return (
                    <button type="button" onClick={() => handleDelete(params.row._id)}><MdDelete size="1.2rem" color="red" /></button>
                )
            }
        }
    ]

    return (
        <>
            <Head>
                <title>Admin - Users</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <AdminNavbar toggle={hamburgerToggle} setToggle={setHamburgerToggle} />
            <main className="flex w-full h-full ">
                <AdminSidebar toggle={hamburgerToggle} />
                <ToastContainer toastStyle={{ backgroundColor: "#D22B2B", boxShadow: "none" }} />
                <div className="flex-grow h-screen w-screen">
                    {allusers && <DataGrid
                        rows={allusers}
                        pageSize={8}
                        disableSelectionOnClick
                        checkboxSelection
                        getRowId={(row) => row?._id}
                        columns={COLUMNS}
                    />}
                </div>
            </main>

        </>
    )
}

export default users
