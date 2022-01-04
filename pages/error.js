import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from "next/image";
import { useSelector } from 'react-redux';
import { Redirect } from "./signin";



const error = () => {

    const router = useRouter();
    const stripeError = useSelector((state) => state.cart.cartStripeData);

    if (stripeError !== "error") {
        return <Redirect to="/"/>
    }
    return (
        <>
            <Head>
                <title>Error </title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <main className="h-screen w-full flex justify-center items-center flex-col">
                <Image src="/Images/card.svg" objectFit="contain" height="200rem" width="200rem" />
                <p className="text-center text-sm sm:text-lg text-gray-700 font-medium my-4">There was an error processing your payment. Try again </p>
                <button type="button" className="mt-2 px-3 py-2 outline-none bg-themePink rounded-lg text-sm sm:text-base" onClick={()=>router.push('/cart')}>Go to Cart</button>
            </main>
        </>
    )
}

export default error
