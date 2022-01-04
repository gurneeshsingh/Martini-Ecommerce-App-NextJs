import Head from 'next/head';
import Footer from '../components/Footer';
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/userSlice';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';



export  function Redirect({ to }) {
    const router = useRouter();
    useEffect(() => {
        router.push(to)
    }, [to])
    return null;
};

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.currentUser);
   

    function handleLogin(e) {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
       
    }

    //  to redirect the user to homepage if logged in 
    if (user) {
        return <Redirect to="/"/>
    }
    
    return (
        <>
            <Head>
                <title>Martini - SignIn</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <ToastContainer toastStyle={{ backgroundColor: "#F9DBE0", color: "black", boxShadow: "none" }} />
            <main className="w-full h-screen  signin_gradient ">
                <section className="sm:p-7 p-5 sm:w-[35%] w-[80%] bg-white">
                    {/* heading  */}
                    <h1 className="text-base text-center sm:text-left sm:text-2xl  tracking-wide mb-4">SIGN IN</h1>
                    {/* form  */}
                    <form className="flex  flex-col" onSubmit={handleLogin} >

                        <input type="email" placeholder="Email" className="flex-1 min-w-[40%] my-2 border border-black sm:p-2 p-2 mx-2 outline-none text-sm sm:text-base" onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" className="flex-1 min-w-[40%] my-2 border border-black sm:p-2 p-2 mx-2 outline-none text-sm sm:text-base" onChange={(e) => setPassword(e.target.value)} required />

                        <button className="w-32 sm:p-2 p-2 bg-themePink tracking-wide hover:font-medium transition-all text-sm sm:text-base self-center sm:self-start mt-4 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed" disabled={isFetching}>SIGN IN</button>
                    </form>
                    {/* links  */}
                    <div className="flex items-center sm:space-x-5 space-y-2  sm:space-y-0 mt-4 text-gray-500 font-light text-sm sm:text-base tracking-wide underline transition-all flex-col sm:flex-row ">
                        <Link href="#">Forgot your password ?</Link>
                        <Link href="/register">Create a new account</Link>
                    </div>

                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Signin
