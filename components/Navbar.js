
import React from 'react'
import { BsBag } from "react-icons/bs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../Redux/userSlice";
import { useState } from "react";
import { VscPackage } from "react-icons/vsc";
import { FiHeart } from "react-icons/fi";
import { AiOutlineControl } from "react-icons/ai";
import { resetWishlist } from '../Redux/wishlistSlice';



const Navbar = () => {

    // get quantity from the cart state in redux store using useselector hook 
    const router = useRouter();
    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.cart.cartTotalQuantity);
    const user = useSelector((state) => state.user.currentUser);
    const wishlist = useSelector((state) => state.wishlist.products);

    // state for toggleling user profile 
    const [profiletoggle, setProfiletoggle] = useState(false);

    function handleLogout() {
        dispatch(logout());
        dispatch(resetWishlist());
        router.push('/signin')
    }


    return (
        <header className="flex sm:h-20 h-14 sm:px-5 px-1.5 py-5 justify-between items-center shadow-md " >
            <div className="flex-grow  flex items-center sm:justify-between sm:w-48">
                <Link href="/productlist/women"><a className="items-center tracking-wide text-xs sm:text-base  hover:bg-themePink transition-all rounded-lg py-1 px-2 uppercase">All Products</a></Link>
                <Link href="/productlist/top"><a className="items-center tracking-wide text-xs sm:text-base  hidden sm:inline-flex hover:bg-themePink transition-all rounded-lg py-1 px-2 uppercase" >Tops</a></Link>
                <Link href="/productlist/dress"><a className="items-center tracking-wide text-xs sm:text-base hidden sm:inline-flex hover:bg-themePink transition-all rounded-lg py-1 px-2 uppercase">Dresses</a></Link>
                <Link href="/productlist/footwear"><a className="items-center tracking-wide hidden sm:inline-flex text-xs sm:text-base uppercase hover:bg-themePink transition-all rounded-lg py-1 px-2">Footwear</a></Link>
            </div>
            <div className="flex-grow items-center flex justify-center font-bold sm:text-3xl text-xl tracking-wide">
                <Link href="/">MARTINI.</Link>
            </div>
            <div className="flex-grow items-center flex sm:space-x-7 space-x-3 sm:justify-end justify-end sm:tracking-wide sm:text-base text-xs relative">
                {!user ? <>
                    <Link href="/register" >REGISTER</Link>
                    <Link href="/signin" >SIGN IN</Link>
                </> :
                    <button type="button" onClick={handleLogout}>SIGN OUT</button>
                }
                {/* user logo or avatar  */}
                {user && <div className="sm:h-10 sm:w-10 h-7 w-7 cursor-pointer font-medium rounded-full bg-themePink flex items-center justify-center text-center" onClick={() => setProfiletoggle(!profiletoggle)}>{user.username.slice(0, 1).toUpperCase()}</div>}
                {user && profiletoggle &&
                    <div className="absolute flex flex-col sm:w-48 w-40 drop-shadow-md p-3 sm:right-0 sm:top-14 right-0 top-10 z-50 rounded-lg bg-white transition-all ">
                        <p className="text-xs sm:text-[14px] tracking-wide mb-2">Welcome <strong>{user?.username.toUpperCase()}</strong></p>
                        <hr />
                    { user.isAdmin && <div className="w-full flex items-center my-3 cursor-pointer hover:bg-themePink p-1 rounded-lg transition-all" onClick={() => router.push('/dashboard')}><AiOutlineControl size="1.1rem" /> <p className="sm:text-sm text-xs font-medium ml-3">Dashboard</p></div>}
                        <div className="w-full flex items-center my-3 cursor-pointer hover:bg-themePink p-1 rounded-lg transition-all" onClick={() => router.push('/orders')}><VscPackage size="1.1rem" /> <p className="sm:text-sm text-xs font-medium ml-3">My Orders</p></div>
                        <div className="w-full flex items-center my-2 cursor-pointer hover:bg-themePink p-1 rounded-lg transition-all" onClick={() => router.push('/wishlist')}><FiHeart size="1rem" /> <p className="sm:text-sm text-xs font-medium ml-3">Wishlist ({wishlist.length})</p></div>
                    </div>}

                <BsBag fontSize="1.5rem" cursor="pointer" className="sm:w-7 w-[15px]" onClick={() => router.push('/cart')} />

                {/* custom badge for cart quantity  */}
                {quantity > 0 && <span className="hidden absolute -right-2 -top-2 h-6 w-6 rounded-full  bg-purple-600 text-white font-semibold text-xs sm:flex items-center justify-center transition">{quantity}</span>}
                {quantity > 0 && <span className="flex absolute -right-2 -top-1 h-4 w-4 rounded-full  bg-purple-600 text-white font-semibold text-[9px] sm:hidden items-center justify-center transition ">{quantity}</span>}


            </div>
        </header>
    )
}

export default Navbar
