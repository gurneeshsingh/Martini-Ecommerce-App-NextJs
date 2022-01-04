import Head from 'next/head';
import { useState, useEffect } from "react";
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Image from "next/image";
import { VscAdd, VscRemove } from "react-icons/vsc";
import { BsHeart } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { deleteProduct, decreaseQuantity, increaseQuantity, getTotals, saveStripeData } from '../Redux/cartSlice';
import { ToastContainer } from 'react-toastify';



const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const stripePublishKey = process.env.stripe_publish_key;
    const router = useRouter();
    const dispatch = useDispatch();
    const [stripeClientToken, setStripeClientToken] = useState(null);
    const user = useSelector((state) => state.user.currentUser);



    // we will make a side effect whenever we get a stripe token , we will make a call to backend to verify the client stripe token to  make the payment 
    useEffect(() => {
        async function makeRequestToServer() {
            try {
                const response = await axios.post("https://martiniapi.herokuapp.com/api/checkout/payment", { tokenId: stripeClientToken.id, amount: cart.cartTotalAmount * 100 });
                dispatch(saveStripeData(response.data))
                router.push(`/success`)

            } catch (error) {
                dispatch(saveStripeData('error'))
                router.push('/error')
                
            }
        };
        // call the above function only whe there is stripeclienttoken
        stripeClientToken && makeRequestToServer()
    }, [stripeClientToken, cart.cartTotalAmount, router])

    useEffect(() => {
        dispatch(getTotals())
    }, [cart, dispatch])

    async function onToken(token) {
        // this function will return a token which we will send to the sever to verify and the process the payment 
        setStripeClientToken(token)

    }

    function handleDelete(index) {
        dispatch(deleteProduct(index))
    }

    function decQuantity(index) {
        dispatch(decreaseQuantity(index))
    }
    function incQuantity(index) {
        dispatch(increaseQuantity(index))
    }


    return (
        <>
            <Head>
                <title>Cart</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <main>
                <Navbar />
                <Announcement />
                <ToastContainer toastStyle={{ backgroundColor: "#D22B2B", boxShadow: "none" }} />

                <section className="bg-[whitesmoke] w-full ">
                    {/* wrapper div  */}
                    {cart.cartTotalQuantity !== 0 ?
                        <div className="px-5 py-5 text-center ">
                            {/* heading  */}
                            <h1 className="text-xl sm:text-3xl  tracking-wide  bg-white pt-4">SHOPPING BAG</h1>
                            {/* top div  */}
                            <div className="flex justify-between items-center sm:px-5 sm:py-8 px-2 py-5  bg-white">
                                {/* top button  */}
                                <button className="font-medium sm:p-3 p-2  tracking-wide border-2 border-themePink outline-none text-xs sm:text-base" onClick={() => router.push('/productlist/women')} >COUTINUE SHOPPING</button>
                                {/* top texts div  */}
                                <div className="sm:flex hidden underline ">
                                    <p className="mx-4 tracking-wide text-sm sm:text-base flex items-center cursor-pointer"><BsBag style={{ marginRight: "5px" }} />Shopping Bag ({cart.cartTotalQuantity})</p>
                                    <p className="mx-4 tracking-wide text-sm sm:text-base flex items-center cursor-pointer" onClick={()=>router.push('/wishlist')}><BsHeart style={{ marginRight: "5px" }}  /> Wishlist (0)</p>
                                </div>
                                <StripeCheckout
                                    name="Martini"
                                    image="https://cdn-icons.flaticon.com/png/512/5343/premium/5343420.png?token=exp=1636715134~hmac=6fa2179ff6d39aada58b7f88da790d5b"
                                    billingAddress
                                    shippingAddress
                                    description={`Your total is INR ${cart.cartTotalAmount}`}
                                    amount={cart.cartTotalAmount * 100}
                                    stripeKey={stripePublishKey}
                                    token={onToken}
                                    currency="INR"
                                >
                                    <button className="font-medium sm:p-3 p-2 tracking-wide bg-black text-white outline-none text-xs sm:text-base disabled:bg-gray-400 disabled:pointer-events-none" disabled={!user}>CHECKOUT NOW</button>
                                </StripeCheckout>

                            </div>
                            <div className="flex flex-col sm:flex-row sm:p-5 p-0 justify-between  my-3">
                                {/* info div  */}
                                <div className="flex-3 ">
                                    {/* product div  */}
                                    {cart.products?.map((product, index) => (
                                        <div className="flex flex-col sm:flex-row justify-between mb-3 py-3 px-4 bg-white" key={new Date().getTime() + product._id + Math.random() * 100}>
                                            {/* product detail div  */}
                                            <div className="flex-1 flex sm:space-x-0 relative ">
                                                {/* image  */}
                                                {/* large screen  */}
                                                <MdDelete size="1.5rem" cursor="pointer" className="inline-flex sm:hidden absolute right-0" onClick={() => handleDelete(index)} />

                                                <div className="sm:inline-flex hidden cursor-pointer" onClick={()=>router.push(`/products/${product?._id}`)}>
                                                    <Image src={product.img} width="150rem" height="140rem" objectFit="contain" />
                                                </div>
                                                {/* mobile devices  */}
                                                <div className="inline-flex sm:hidden  mr-4 cursor-pointer" onClick={()=>router.push(`/products/${product?._id}`)}>
                                                    <Image src={product.img} width="90rem" height="70rem" objectFit="contain" />
                                                </div>
                                                {/* details div  */}
                                                <div className="sm:p-4 sm:flex-1  flex flex-col text-left justify-around items-start sm:space-y-2 space-y-1 tracking-wide">
                                                    {/* product name  */}
                                                    <h1 className="text-sm sm:text-base"><b>{product.brand}</b></h1>
                                                    <h1 className="text-[13px] sm:text-base">{product.title}</h1>
                                                    {/* color  */}
                                                    <p className="text-[13px] sm:text-base"><b>Size: </b>{product.size}</p>
                                                    <p className="text-[13px] sm:text-base"><b>Color: </b>{product.color} </p>
                                                </div>
                                            </div>
                                            {/* pricedetail div  */}
                                            <div className="flex-1 flex justify-center flex-col mt-4 sm:mt-0  sm:items-center">
                                                {/* amount container  */}
                                                <div className="flex items-center sm:justify-end justify-between space-x-0 sm:space-x-14  sm:text-xl">
                                                    <div className="flex items-center space-x-4 ml-[110px] sm:ml-0 ">
                                                        <VscRemove cursor="pointer" className="hover:font-extrabold hover:scale-110 transition-all h-4" onClick={() => decQuantity(index)} />
                                                        <p className="bg-themePink sm:p-2 p-1 w-6 sm:w-8 text-center text-sm ">{product.productQuantity}</p>
                                                        <VscAdd cursor="pointer" className="hover:font-extrabold hover:scale-110 transition-all h-4 " onClick={() => incQuantity(index)} />
                                                    </div>
                                                    <p className="font-light sm:text-2xl text-xl tracking-wide ">&#8377; {product.price * product.productQuantity}</p>
                                                    <MdDelete size="1.5rem" cursor="pointer" className="sm:inline-flex hidden" onClick={() => handleDelete(index)} />
                                                </div>
                                                {/* actual price  */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* summary div  */}
                                <div className="flex-1 p-5  sm:ml-5 h-[57vh]  mt-5 sm:mt-0 text-left bg-white border-double border-t-[7px] border-gray-600 sm:border-none shadow-md">
                                    {/* title  */}
                                    <h1 className="text-base sm:text-2xl tracking-wide mb-8">ORDER SUMMARY</h1>
                                    {/* summary item  */}
                                    <div className="my-4 flex justify-between">
                                        <h1>Subtotal</h1>
                                        <p>&#8377; {cart.cartTotalAmount}</p>
                                    </div>
                                    <div className="my-4 flex justify-between">
                                        <h1>Estimated Shipping</h1>
                                        <p>&#8377; 5.90</p>
                                    </div>
                                    <div className="my-4 flex justify-between">
                                        <h1>Shipping Discount</h1>
                                        <p>&#8377; -5.90</p>
                                    </div>
                                    <div className="my-4 flex justify-between font-semibold text-xl mb-8">
                                        <h1>Total</h1>
                                        <p>&#8377; {cart.cartTotalAmount}</p>
                                    </div>
                                    <StripeCheckout
                                        name="Martini"
                                        image="https://cdn-icons.flaticon.com/png/512/5343/premium/5343420.png?token=exp=1636715134~hmac=6fa2179ff6d39aada58b7f88da790d5b"
                                        billingAddress
                                        shippingAddress
                                        description={`Your total is INR ${cart.cartTotalAmount}`}
                                        amount={cart.cartTotalAmount * 100}
                                        stripeKey={stripePublishKey}
                                        token={onToken}
                                        currency="INR"
                                    >
                                        <button className="bg-black text-white p-3 tracking-wide font-semibold w-full disabled:bg-gray-400 disabled:pointer-events-none" disabled={!user}>CHECKOUT</button>
                                        {!user && <p className="text-sm text-red-600 font-semibold mt-3 tracking-wide text-center">Login to place your order</p>}
                                    </StripeCheckout>
                                </div>
                            </div>

                        </div> :
                        <div className="flex flex-col  p-5  justify-between  my-3">
                            <Image src="/Images/emptycart.svg" height="200rem" width="200rem" objectFit="contain" />
                            <p className="mt-8 tracking-wide font-light text-center text-base sm:text-xl mb-10">Oops, looks like your cart is empty, Add items to proceed to checkout.</p>
                            <button type="button" onClick={() => router.push('/productlist/women')} className="bg-themePink py-2.5 px-5 w-max mx-auto text-base sm:text-lg transition shadow-md hover:font-medium">Browse Products</button>
                        </div>}
                </section>
                <div className="w-full h-5 bg-white shadow-md" />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Cart
