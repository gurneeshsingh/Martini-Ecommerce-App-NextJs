import Head from 'next/head';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/userSlice';
import { ToastContainer } from 'react-toastify';
import { Redirect } from './signin';


const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.currentUser);
   


    function handleRegister(e) {
        e.preventDefault();
        dispatch(registerUser({ username, email, password, cpassword }))
        setUsername("")
        setEmail("")
        setPassword("")
        setCpassword("")

    };

    if (user) {
        return <Redirect to="/"/>
    }


    return (
        <>
            <Head>
                <title>Martini - Create An Account</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <ToastContainer toastStyle={{ backgroundColor: "#F9DBE0", color:"black",  boxShadow:"none" }}/>

            <main className="w-full h-screen  register_gradient ">
                <section className="sm:p-7 p-5 sm:w-[45%] w-[80%] bg-white">
                    {/* heading  */}
                    <h1 className="text-base text-center sm:text-left sm:text-2xl  tracking-wide mb-4">CREATE AN ACCOUNT</h1>
                    {/* form  */}
                    <form className="flex flex-wrap flex-col sm:flex-row" onSubmit={handleRegister} >
                        <input type="text" placeholder="Username" className="flex-1 min-w-[40%] my-2 border border-black sm:p-2 p-2 mx-2 outline-none text-sm sm:text-base" required onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" className="flex-1 min-w-[40%] my-2 border border-black sm:p-2 p-2 mx-2 outline-none text-sm sm:text-base" required onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="flex-1 min-w-[40%] my-2 border border-black sm:p-2 p-2 mx-2 outline-none text-sm sm:text-base" required onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" className="flex-1 min-w-[40%] my-2 border border-black sm:p-2 p-2 mx-2 outline-none text-sm sm:text-base" required onChange={(e) => setCpassword(e.target.value)} />
                        <p className="mt-4 text-gray-500 text-[11px] text-center sm:text-left sm:text-sm tracking-wide mb-4 font-light">By creating an account, I consent to the processing of my personal data in  accordance with the  <b className="text-black">PRIVATE POLICY</b></p>
                        <button className="w-32 sm:p-2 p-2 bg-themePink tracking-wide hover:font-medium transition-all text-xs sm:text-base self-center sm:self-start disabled:bg-gray-200 disabled:cursor-not-allowed" disabled={isFetching}>CREATE</button>
                    </form>
                    

                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Register
