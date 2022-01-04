import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import { Redirect } from "../signin";
import { useState} from "react";
import { addProduct } from '../../Redux/productSlice';
import { ToastContainer } from 'react-toastify';




const createproduct = () => {

    const user = useSelector((state) => state.user.currentUser);
    const [hamburgerToggle, setHamburgerToggle] = useState(false);
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.product);

    if (!user || !user?.isAdmin) {
        return <Redirect to="/" />
    }

    const [inputvalues, setInputvalues] = useState({
        brand: "",
        title: "",
        desc: "",
        img: "" ,
        price: 0,

    });


    function handleChange(e) {
        setInputvalues({
            ...inputvalues, [e.target.name]: e.target.value
        })
    };



    function handleformSubmit(e) {
        e.preventDefault()
        let myform = new FormData(e.target)
        const values = Object.fromEntries(myform.entries())
        const categories = values.categories.toString().split(',')
        const size = values.size.toString().toUpperCase().split(',')
        const color = values.color.toString().split(',')

        // dispatch action
        dispatch(addProduct({ ...inputvalues, categories, size, color }))


    }

    return (
        <>
            <Head>
                <title>Create Product</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <AdminNavbar toggle={hamburgerToggle} setToggle={setHamburgerToggle} />
            <main className="flex w-full h-full ">
                <AdminSidebar toggle={hamburgerToggle} />
                <ToastContainer toastStyle={{ backgroundColor: "#00FF00", boxShadow: "none" }} />

                <section className="flex flex-col w-screen h-screen my-1 p-6">
                    <div className="flex w-full items-center justify-between pb-3 border-b border-purple-600">
                        <h1 className="font-bold text-xl sm:text-3xl">Create Product </h1>
                    </div>

                    {/* main form  */}

                    <div className="flex flex-col w-[90%] mx-auto my-8 py-8 px-10 shadow-lg rounded-lg bg-[whitesmoke] items-center sm:items-start">
                        <form className="flex flex-col  w-full" onSubmit={handleformSubmit}>
                            <label htmlFor="brand" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Brand</label>
                            <input type="text" id="brand" className="text-gray-500 text-xs sm:text-sm  outline-none  mb-5  p-1 rounded-md" name="brand" required onChange={handleChange} autoComplete="off" />
                            <label htmlFor="title" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Product Name</label>
                            <input type="text" id="title" name="title" className="text-gray-500 text-xs sm:text-sm  outline-none  mb-5 p-1 rounded-md" required onChange={handleChange} autoComplete="off" />
                            <label htmlFor="desc" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Product Description</label>
                            <input type="text" id="desc" name="desc" className="text-gray-500 text-xs sm:text-sm  outline-none  mb-5 p-1 rounded-md" required onChange={handleChange} autoComplete="off" />

                            <label htmlFor="price" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Price</label>
                            <input type="number" id="price" name="price" className="text-gray-500 text-xs sm:text-sm  outline-none mb-5 p-1 rounded-md" required onChange={handleChange} autoComplete="off" />
                            <label htmlFor="categories" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Categories</label>
                            <input type="text" id="categories" name="categories" className="text-gray-500 text-xs sm:text-sm  outline-none  mb-2 p-1 rounded-md" required autoComplete="off" />
                            <p className="text-gray-500 text-xs tracking-wide font-semibold mb-5">Add multiple categories seperated by a comma (,). women is a must category</p>
                            <label htmlFor="color" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Color</label>
                            <input type="text" id="color" name="color" className="text-gray-500 text-xs sm:text-sm  outline-none  mb-2 p-1 rounded-md" required autoComplete="off" />
                            <p className="text-gray-500 text-xs tracking-wide font-semibold mb-5">Add multiple colors seperated by a comma (,)</p>
                            <label htmlFor="size" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Size</label>
                            <input type="text" id="size" name="size" className="text-gray-500 text-xs sm:text-sm  outline-none  mb-2 p-1 rounded-md" required autoComplete="off" />
                            <p className="text-gray-500 text-xs tracking-wide font-semibold mb-5">Add multiple sizes seperated by a comma (,)</p>
                            <label htmlFor="img" className="text-gray-600 font-medium text-base sm:text-lg mb-1">Upload Image</label>
                            <input type="text" id="img" name="img" placeholder="Image Url" className="text-gray-500 text-xs sm:text-sm  outline-none mb-5 p-1 rounded-md" required onChange={handleChange} autoComplete="off" />
                            <button type="submit" disabled={isFetching} className="py-2 px-3 rounded-lg text-sm sm:text-base bg-green-700 text-white shadow-lg my-3 disabled:bg-gray-300 disabled:text-gray-100 disabled:pointer-events-none" >Create</button>

                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default createproduct
