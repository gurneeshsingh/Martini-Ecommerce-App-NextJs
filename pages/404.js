import Head from 'next/head';
import Footer from '../components/Footer';
import Link from "next/link";
import Navbar from "../components/Navbar";
import Image from "next/image";

const errorPage = () => {
    return (
        <>
            <Head>
                <title>Page Not Found</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="flex flex-col h-full w-full items-center justify-center my-6">
                <div className="h-full w-full hidden sm:flex items-center justify-center">
                    <Image src="/Images/notfound.svg" objectFit="contain" height="500rem" width="500rem" />

                </div>
                <div className="h-full w-full flex items-center justify-center sm:hidden">
                    <Image src="/Images/notfound.svg" objectFit="contain" height="200rem" width="250rem" />

                </div>
                <p className="mt-0 mb-4 text-gray-700 font-medium text-sm sm:text-lg text-center w-[90%] mx-auto">The page you are looking for has been removed or is temporarily unavailable.</p>
                <Link href="/">Homepage </Link>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default errorPage
