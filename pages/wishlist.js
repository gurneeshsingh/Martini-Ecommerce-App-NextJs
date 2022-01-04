import { Redirect } from "./signin";
import { useSelector, useDispatch } from "react-redux";
import Head from 'next/head';
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import Image from "next/image";
import { useRouter } from "next/router";
import { CgCloseO } from "react-icons/cg";
import { deleteFromWishlist, getWishlist } from "../Redux/wishlistSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from "react";



const wishlist = () => {
    const user = useSelector((state) => state.user.currentUser);
    const wishlist = useSelector((state) => state.wishlist.products);
    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        async function getWishlistFromServer() {
            try {
                const response = await axios.get(`https://martiniapi.herokuapp.com/api/wishlist/find/${user?.id}`, {
                    headers: {
                        'auth-token': user?.authToken
                    }
                });
                dispatch(getWishlist(response.data))
                return response.data
            } catch (error) {
                console.log(error);
            }
        }
        user && getWishlistFromServer();
    }, [user, dispatch])


    async function handleDelete(item) {
        try {

            const response = await axios.delete(`https://martiniapi.herokuapp.com/api/wishlist/delete/${user?.id}`, {
                data: {
                    'productId': item?._id
                },
                headers: {
                    'auth-token': user?.authToken
                },

            });
            dispatch(deleteFromWishlist(item))
            toast.warn('Product removed from wishlist', {
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

    };

    if (user === null) {
        return <Redirect to="/" />
    }

    return (
        <>
            <Head>
                <title>Wishlist</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <main>
                <ToastContainer toastStyle={{ backgroundColor: "#FF0000", boxShadow: "none" }} />

                <Announcement />
                <Navbar />

                {/* wishlist section  */}
                <section className="w-[90%] mx-auto h-full flex flex-col items-center my-10">
                    <h1 className="text-base sm:text-xl text-gray-700 pb-4 border-b border-gray-200 w-full"><strong>My Wishlist</strong>{` (${wishlist?.length} Items)`}</h1>

                    <section className="w-full h-full flex flex-wrap items-center mx-auto ">
                        {wishlist.length === 0 ?
                            <div className="flex items-center justify-center w-full h-full my-16 flex-col">
                                <Image src="/Images/wishlist.svg" objectFit="contain" width="300rem" height="200rem" />
                                <p className="my-10 text-sm sm:text-lg tracking-wide text-center text-gray-700">Your wishlist is empty. Browser products to save them to your wishlist.</p>
                                <button type="button" onClick={() => router.push('/productlist/women')} className="bg-themePink py-2.5 px-5 w-max mx-auto text-base sm:text-lg transition shadow-md hover:font-medium">Browse Products</button>
                            </div> :
                            wishlist?.map((product, index) => (
                                <div className="m-5 p-3  sm:w-48 w-28 flex flex-col items-center justify-center relative flex-grow flex-shrink border shadow-md " key={index}>
                                    {/* product image  */}
                                    <Image src={product.img} height="310rem" width="240rem" objectFit="cover" className="z-20" />
                                    {/* delete button  */}
                                    <button type="button" className="absolute z-30 top-0 right-0"><CgCloseO size="1.4rem" color="gray" onClick={() => handleDelete(product)} /></button>
                                    <div className="flex flex-wrap flex-col items-center my-3  ">
                                        <h1 className="text-xs sm:text-sm font-semibold ">{product?.brand}</h1>
                                        <p className="text-xs sm:text-sm font-light text-gray-500 tracking-wide text-center  mb-1">{product?.title}</p>
                                        <p className="text-xs sm:text-sm font-semibold ">&#8377; {product?.price}</p>
                                    </div>
                                    <button type="button" className="my-1  w-full flex items-center justify-center py-2 cursor-pointer bg-themePink z-30" onClick={() => router.push(`/products/${product._id}`)}>View Product</button>


                                </div>

                            ))}

                    </section>



                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default wishlist
