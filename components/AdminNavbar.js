import { GiHamburgerMenu } from 'react-icons/gi';
import React from 'react'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../Redux/userSlice";
import { useState } from "react";
import { VscPackage } from "react-icons/vsc";
import { FiHeart } from "react-icons/fi";
import { AiOutlineControl } from "react-icons/ai";


const AdminNavbar = ({toggle, setToggle}) => {

    // get quantity from the cart state in redux store using useselector hook 
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const wishlist = useSelector((state) => state.wishlist.products);

    // state for toggleling user profile 
    const [profiletoggle, setProfiletoggle] = useState(false);

    function handleLogout() {
        dispatch(logout());
        router.push('/signin')
    }


    return (
        <header className="flex sm:h-20 h-14 sm:px-5 px-1.5 py-5 justify-between items-center shadow-md bg-[whitesmoke]" >
            {/* hamburgermenu on small screen  */}
            <div className="flex sm:hidden items-center mr-3 cursor-pointer transition-all active:animate-ping" onClick={()=>setToggle(!toggle)}>
                <GiHamburgerMenu color="gray" size="1.2rem"/>
            </div>
            <div className="flex-grow items-center flex  font-semibold sm:text-3xl text-xl tracking-wide text-purple-700">
                <Link href="/dashboard">Dashboard</Link>
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
                    { user.isAdmin && <div className="w-full flex items-center my-3 cursor-pointer hover:bg-themePink p-1 rounded-lg transition-all" onClick={() => router.push('/orders')}><AiOutlineControl size="1.1rem" /> <p className="sm:text-sm text-xs font-medium ml-3">Dashboard</p></div>}
                        <div className="w-full flex items-center my-3 cursor-pointer hover:bg-themePink p-1 rounded-lg transition-all" onClick={() => router.push('/orders')}><VscPackage size="1.1rem" /> <p className="sm:text-sm text-xs font-medium ml-3">My Orders</p></div>
                        <div className="w-full flex items-center my-2 cursor-pointer hover:bg-themePink p-1 rounded-lg transition-all" onClick={() => router.push('/wishlist')}><FiHeart size="1rem" /> <p className="sm:text-sm text-xs font-medium ml-3">Wishlist ({wishlist.length})</p></div>
                    </div>}

            </div>
        </header>
    )
}

export default AdminNavbar;
