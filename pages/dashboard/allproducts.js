import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Redirect } from "../signin";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../Redux/productSlice";
import { DataGrid } from "@material-ui/data-grid";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { ToastContainer } from 'react-toastify';



const allproducts = () => {

    const user = useSelector((state) => state.user.currentUser);
    const [hamburgerToggle, setHamburgerToggle] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
   

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


    if (!user || !user?.isAdmin) {
        return <Redirect to="/" />
    }

    function handleDelete(id) {
        const index = products.findIndex((item) => item._id === id)
        dispatch(deleteProduct(index))
    }

    // for data grid we have to define the columns  

    const columns = [
        {
            field: "_id", headerName: "ID", width: 200,
            renderCell: (params) => {
                return (
                    <p className="text-xs text-gray-700">{params.row._id}</p>
                )
            }
        },
        {
            field: "product", headerName: "Product", width: 340,
            renderCell: (params) => {
                return (
                    <div className="flex items-center ">
                        <Image src={params.row.img || "http://trueveda.in/productimages/mainImg_63760262400000000081461c840bfa49138df89022f74e1c54.png"} height="45" width="50" objectFit="contain" />
                        <p className="text-xs  text-gray-700 font-medium ml-2">{params.row.title}</p>
                    </div>
                )
            }
        },
        { field: "inStock", headerName: "Stock", width: 120 },
        {
            field: "price", headerName: "Price", width: 120,
            renderCell: (params) => {
                return (
                    <p className="font-semibold">{params.row.price}</p>
                )
            }
        },
        {
            field: "action", headerName: "Action", width: 160,
            renderCell: (params) => {
                return (
                    <>
                        <Link href={`/dashboard/${params.row._id}`}>
                            <button className="py-1.5 px-3 rounded-full mr-10 bg-[whitesmoke] text-gray-700 font-semibold text-xs hover:shadow-md">EDIT</button>
                        </Link>
                        <button type="button" onClick={()=>handleDelete(params.row._id)}><MdDelete size="1.2rem" color="red"/></button>
                        
                    </>
                )
            }
        }

    ]

    return (
        <>
            <Head>
                <title>Admin - Products</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <AdminNavbar toggle={hamburgerToggle} setToggle={setHamburgerToggle} />
            <main className="flex w-full h-full ">
                <AdminSidebar toggle={hamburgerToggle} />
                <ToastContainer toastStyle={{ backgroundColor: "#D22B2B", boxShadow: "none" }} />

                {/* right side section  */}
                <div className="flex-grow h-screen w-screen ">
                    <DataGrid
                        rows={products}
                        disableSelectionOnClick
                        checkboxSelection
                        pageSize={8}
                        columns={columns}
                        getRowId={(row) => row?._id}
                    />
                </div>

            </main>
        </>
    )
}

export default allproducts
