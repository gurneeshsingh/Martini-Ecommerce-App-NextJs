import Image from "next/image";
import { BsEye, BsBag } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Redux/cartSlice";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { getWishlist } from "../Redux/wishlistSlice";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const SingleProduct = ({ product }) => {


    const [color] = useState(product.color);
    const [size, setSize] = useState(null);
    const [addpopup, setAddpopup] = useState(false);
    const [popupmessage, setPopupmessage] = useState(false);
    const wishlist = useSelector((state) => state.wishlist.products);
    const user = useSelector((state) => state.user.currentUser);


    const dispatch = useDispatch();

    function handleClick() {
        setAddpopup(true)
    };

    function handleAddtocart() {
        if (size !== null) {
            setPopupmessage(false)
            setAddpopup(false)
            dispatch(addProduct({ ...product, color, size }))
        }
        else {
            setPopupmessage(true)
        }
    }

    function handleClose() {
        setSize(null)
        setPopupmessage(false)
        setAddpopup(false)
    };

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

    async function handleAddToWishlist() {
        const myObj = {
            userId: user?.id,
            products: [{
                _id: product?._id,
                title: product?.title,
                brand: product?.brand,
                img: product?.img,
                price: product?.price
            }]
        };
        try {
            if (!user) {
                toast.info('Please Signin first', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                })
            } else {
                const response = await axios.post(`https://martiniapi.herokuapp.com/api/wishlist`, myObj, {
                    headers: {
                        'auth-token': user?.authToken
                    }
                });
                toast.success('Product added to wishlist', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                if (response) {
                    getWishlistFromServer();
                }

            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer toastStyle={{ backgroundColor: "#7C3AED", boxShadow: "none" }} />
            <div className="m-5 p-3  w-64 flex flex-col items-center justify-center relative  ">

                {/* product image  */}
                <Image src={product.img} height="310rem" width="240rem" objectFit="cover" className="z-20" />
                {/* product info div  */}
                {addpopup ? <div className="flex items-center justify-center flex-col text-center h-full w-full absolute top-0 left-0 z-30  opacity-100  transition border shadow-lg bg-[whitesmoke] bg-opacity-90" >
                    <h1 className="font-semibold mb-5 sm:text-xl text-lg tracking-wide">Select Size</h1>
                    {product.size.map((item, index) => (<div className="flex sm:h-10 sm:w-10 h-8 w-8 bg-white rounded-full shadow-md p-2 items-center text-center justify-center sm:m-2 m-1 cursor-pointer hover:bg-themePink hover:transform  hover:scale-110 focus:bg-themePink" key={index} tabIndex={index} onClick={() => setSize(item)} >{item}</div>))}
                    <div className="flex items-center  w-full ">
                        <button onClick={handleClose} className="font-bold mt-5   tracking-wide transition active:animate-ping flex-1 bg-themePink sm:p-3 p-2 " type='button'>Close</button>
                        <button onClick={handleAddtocart} className="font-bold mt-5  tracking-wide transition active:animate-ping flex-1 bg-themePink sm:p-3 p-2  " type='button'>Add to Cart</button>

                    </div>
                    {popupmessage && <p className="mt-3 text-sm text-red-500 tracking-wide font-medium">Select size first</p>}
                </div> :
                    <div className="flex justify-center items-center h-full w-full absolute top-0 left-0 z-30  opacity-0 hover:opacity-100 transition hover:border hover:shadow-lg">
                        {/* three icons  */}
                        <button type="button" className="h-12 w-12 rounded-full bg-white flex justify-center items-center mx-1  hover:bg-themePink hover:transform  hover:scale-110 transition  active:animate-ping disabled:pointer-events-none disabled:bg-gray-200 disabled:text-red-600" onClick={handleAddToWishlist} disabled={wishlist?.findIndex((item) => item._id === product._id) >= 0} >
                            <FiHeart size="1.3rem" />

                        </button>
                        <Link href={`/products/${product?._id}`} >
                            <a >
                                <div className="h-12 w-12 rounded-full bg-white flex justify-center items-center mx-1 cursor-pointer hover:bg-themePink hover:transform  hover:scale-110  transition active:animate-ping ">
                                    <BsEye size="1.3rem" />

                                </div>
                            </a>
                        </Link>
                        <button className="h-12 w-12 rounded-full bg-white flex justify-center items-center mx-1 cursor-pointer hover:bg-themePink hover:transform  hover:scale-110 transition active:animate-ping" type="button" onClick={handleClick}>
                            <BsBag size="1.3rem" />
                        </button>

                    </div>}
                {/* details  */}
                <div className="flex flex-wrap flex-col items-center my-3  ">
                    <h1 className="text-xs sm:text-sm font-semibold ">{product?.brand}</h1>
                    <p className="text-xs sm:text-sm font-light text-gray-500 tracking-wide text-center  mb-1">{product?.title}</p>
                    <p className="text-xs sm:text-sm font-semibold ">&#8377; {product?.price}</p>
                </div>
                {/* addpopup  */}


            </div>



        </>
    )
}

export default SingleProduct
