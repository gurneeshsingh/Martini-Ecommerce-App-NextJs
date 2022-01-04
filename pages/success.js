import Head from 'next/head';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const success = () => {

    const router = useRouter();
    const cart = useSelector((state) => state.cart);
    let stripeData = useSelector((state) => state.cart.cartStripeData);
    const [orderId, setOrderId] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        async function createorder() {
            try {
                const response = await axios.post('https://martiniapi.herokuapp.com/api/order', {
                    userId: currentUser.id,
                    products: cart.products.map((product) => ({ productId: product._id, quantity: product.productQuantity, brand: product.brand, title: product.title, img: product.img, size:product.size })),
                    amount: cart.cartTotalAmount,
                    address: stripeData?.billing_details.address

                }, {
                    headers: {
                        'auth-token': currentUser.authToken
                    }
                })

                setOrderId(response.data._id)
            } catch (err) {
                console.log(err);
            }
        };
        createorder()
    }, [cart, currentUser])



    return (
        <>
            <Head>
                <title>Martini - Payment Successfull</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <main
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="hidden sm:block">
                    <Image src="/Images/purchase.svg" objectFit="contain" width="300rem" height="350rem" />

                </div>
                <div className="sm:hidden block">
                    <Image src="/Images/purchase.svg" objectFit="contain" width="200rem" height="250rem" />

                </div>
                <div className="text-center">

                    {orderId !== null
                        ?
                        `Order has been created successfully. Your order number is ${orderId}`
                        : `Successfull. Your order is being prepared...`

                    }
                </div>
                <div className="flex w-full mx-auto items-center justify-center space-x-6 ">
                <button className="mt-8 px-3 py-2 outline-none bg-themePink rounded-lg" onClick={() => router.push('/')}>Go to Homepage</button>
                <button className="mt-8 px-3 py-2 outline-none bg-themePink rounded-lg" onClick={() => router.push('/orders')}>Go to My Orders</button>

                </div>

            </main>
        </>
    )
}

export default success
