import { useSelector } from "react-redux";
import { Redirect } from "./signin";
import Head from 'next/head';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCartArrowDown } from "react-icons/fa";
import Image from 'next/image';
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/router";




const orders = () => {

    const user = useSelector((state) => state.user.currentUser);
    const [orders, setOrders] = useState([])
    const router = useRouter();
    

    if (user === null) {
        return <Redirect to="/" />
    }

    useEffect(() => {
        async function makeRequestToServerAndGetOrders() {
            try {
                const response = await axios.get(`https://martiniapi.herokuapp.com/api/order/find/${user.id}`, {
                    headers: {
                        'auth-token': user.authToken
                    }
                }, { userId: user.id });
                setOrders(response.data);

            } catch (err) {
                console.log(err);
            }

        }
        user && makeRequestToServerAndGetOrders()
    }, [user])

  
    return (
        <>
            <Head>
                <title>Orders</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <main>
                <Announcement />
                <Navbar />

                {/* orders section  */}
                <section className="sm:w-[90%] w-[95%] h-full flex flex-wrap items-center mx-auto my-10 ">
                    <div className="flex flex-col w-full -space-y-1 border-b border-gray-300 py-4">
                        <h1 className="font-semibold text-gray-800 text-lg sm:text-2xl">Account</h1>
                        <p className="text-gray-700 text-xs ">{user?.username}</p>
                    </div>

                    {/* inside main section  */}
                    <section className="flex  w-full h-full">
                        {/* left div  */}
                        <div className="hidden sm:flex flex-col border-r border-gray-300 h-screen pt-8 pr-6 flex-1">
                            <p className="tracking-wide text-green-600 font-semibold py-3 border-b border-gray-300 w-full">Orders</p>
                        </div>

                        {/* right div  */}
                        <div className="flex flex-col w-full py-6 px-6 flex-3">
                            <div className="w-full">
                                <p className="text-gray-700 text-sm sm:text-base">Showing <strong>All Orders</strong></p>
                            </div>

                            {orders.length===0 && <div className="flex items-center justify-center w-full h-full my-16 flex-col">
                                <Image src="/Images/order.svg" objectFit="contain" width="300rem" height="200rem" />
                                <p className="my-10 text-sm sm:text-lg tracking-wide text-center text-gray-700">There are no orders. Browser products to make a purchase.</p>
                                <button type="button" onClick={() => router.push('/productlist/women')} className="bg-themePink py-2.5 px-5 w-max mx-auto text-base sm:text-lg transition shadow-md hover:font-medium">Browse Products</button>
                            </div>}
                            {/* main order div  */}
                            {orders !== null && orders.map((order, index) => (
                                <div className="w-full bg-gray-100 mt-8 mb-0 flex flex-col p-4" key={index}>
                                    <p className="py-3 text-gray-700 border-b border-gray-400 mb-5 text-sm sm:text-base">Order Id : <strong># {order._id}</strong> </p>
                                    <div className="bg-white flex flex-col w-full py-3">
                                        {/* heading div with icon and order placed date  */}
                                        <div className="flex p-3 items-start">
                                            <FaCartArrowDown size="1.3rem" style={{ marginTop: "1px" }} />
                                            <div className="flex flex-col w-full ml-6 text-gray-700">
                                                <p className="text-xs sm:text-base font-medium tracking-wide">Ordered on {format(new Date(order?.createdAt?.slice(0,10).replace('-',',')),'dd-MMMM-yyyy') }</p>
                                                <p className="font-medium text-xs sm:text-base">Status : <strong className="text-yellow-400">{order.status.toUpperCase()}</strong></p>
                                            </div>
                                        </div>
                                        {order?.products?.map((singleOrder) => (
                                            <div className="flex  py-2 px-1 sm:p-3 shadow-md border mx-4  my-1 hover:border-black transition-all" key={singleOrder.productId}>
                                                <Image src={singleOrder?.img || 'https://cdn-icons.flaticon.com/png/512/5343/premium/5343420.png?token=exp=1636715134~hmac=6fa2179ff6d39aada58b7f88da790d5b'} objectFit="contain" height="70rem" width="100rem" alt="image"/>
                                                <div className="flex flex-col flex-3">
                                                    <p className="text-sm sm:text-base font-semibold text-gray-700">{singleOrder.brand}</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">{singleOrder.title}</p>
                                                    <p className="text-xs sm:text-sm text-gray-500 font-semibold">Size : {singleOrder.size} ,  Quantity: {singleOrder.quantity }</p>
                                                </div>
                                            </div>
                                        ))
                                        }


                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </section>
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default orders
