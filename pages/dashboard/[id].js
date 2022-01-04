import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Redirect } from "../signin";
import { useState } from "react"
import { useRouter } from 'next/router';
import Image from "next/image";
import { editProduct } from '../../Redux/productSlice';
import { ToastContainer } from 'react-toastify';


const adminProduct = () => {


    const user = useSelector((state) => state.user.currentUser);
    const [hamburgerToggle, setHamburgerToggle] = useState(false);
    const router = useRouter();
    const id = router.query.id;
    const dispatch = useDispatch()
    const singleProduct = useSelector((state) => state.product.products.find((item) => item._id === id));
    console.log(singleProduct);
    const [values, setValues] = useState({
        brand: "",
        title: "",
        desc: "",
        price: 0,
        img: ""
    })


    function handleChange(e) {
        setValues((preval) => {
            return {
                ...preval, [e.target.name]: e.target.value
            }
        })
    }

    if (!user || !user?.isAdmin) {
        return <Redirect to="/" />
    }

    function handleSubmit(e) {
        e.preventDefault();
        const product = {
            ...singleProduct, ...values
        }
        id && dispatch(editProduct(id, product))
    }


    return (
        <>
            <Head>
                <title>Edit Product</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <AdminNavbar toggle={hamburgerToggle} setToggle={setHamburgerToggle} />
            <main className="flex w-full h-full ">
                <AdminSidebar toggle={hamburgerToggle} />
                <ToastContainer toastStyle={{ backgroundColor: "##FFFF00", boxShadow: "none" }} />

                <section className="flex flex-col w-screen h-screen my-1 p-6">
                    <div className="flex w-full items-center justify-between pb-3 border-b border-purple-600">
                        <h1 className="font-bold text-xl sm:text-3xl">Product <span className="text-gray-500 font-medium text-sm sm:text-base"> (ID : {singleProduct?._id})</span></h1>
                        <button className="py-1 px-3 rounded-lg text-sm sm:text-base bg-green-700 text-white shadow-md" onClick={() => router.push('/dashboard/createproduct')}>Create</button>
                    </div>
                    {/* product div  */}
                    <div className="w-full flex my-10 rounded-lg p-8 shadow-lg border border-gray-300">
                        {/* left  */}
                        <div className="flex flex-col flex-2">
                            <form className="flex flex-col sm:w-80 w-52" onSubmit={handleSubmit}>
                                <label htmlFor="brand" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Brand</label>
                                <input type="text" id="brand" placeholder={singleProduct?.brand} className="text-gray-500 text-xs sm:text-sm border-b outline-none border-black mb-5" autoComplete="off" value={values?.brand} name="brand" onChange={handleChange} required />
                                <label htmlFor="title" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Product Name</label>
                                <input type="text" id="title" placeholder={singleProduct?.title} className="text-gray-500 text-xs sm:text-sm border-b outline-none border-black mb-5" autoComplete="off" value={values?.title} name="title" onChange={handleChange} required />
                                <label htmlFor="desc" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Product Description</label>
                                <input type="text" id="desc" placeholder={singleProduct?.desc} className="text-gray-500 text-xs sm:text-sm border-b outline-none border-black mb-5" autoComplete="off" value={values?.desc} name="desc" onChange={handleChange} required />
                                <label htmlFor="stock" className="text-gray-600 font-medium text-base sm:text-lg mb-1">In Stock</label>
                                <select name="stock" id="stock" className="border border-gray-700 outline-none text-gray-500 text-xs sm:text-sm mb-5" >
                                    <option value="true" defaultChecked>Yes</option>
                                    <option value="false">No</option>
                                </select>
                                <label htmlFor="price" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Price</label>
                                <input type="number" id="price" name="price" onChange={handleChange} required placeholder={singleProduct?.price} className="text-gray-500 text-xs sm:text-sm border-b outline-none border-black mb-5" autoComplete="off" value={values?.price} />

                                <label htmlFor="img" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Upload Image</label>
                                <input type="text" id="img" name="img" onChange={handleChange} required placeholder="Image Url" className="text-gray-500 text-xs sm:text-sm border outline-none border-black mb-5 p-1" autoComplete="off" value={values?.img} />
                                <button type="submit" className="py-2 px-3 rounded-lg text-sm sm:text-base bg-green-700 text-white shadow-lg my-3" >Update</button>

                            </form>
                        </div>
                        {/* right  */}
                        <div className="flex flex-col flex-1 ">
                            <Image src={singleProduct?.img || "http://trueveda.in/productimages/mainImg_63760262400000000081461c840bfa49138df89022f74e1c54.png"} height="300" width="300" objectFit="contain" />


                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default adminProduct
