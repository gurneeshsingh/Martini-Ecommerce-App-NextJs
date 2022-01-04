import Head from 'next/head';
import Announcement from '../../components/Announcement';
import Footer from '../../components/Footer';
import Navbar from "../../components/Navbar";
import Newsletter from '../../components/Newsletter';
import Products from '../../components/Products';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { VscClose } from "react-icons/vsc";
import { ToastContainer } from 'react-toastify';



const productlist = () => {
    // fetch the category name passed as parameter in the url , we will use useRouter hook of nextjs
    const router = useRouter();
    const { category } = router.query;

    // store the filters in a state with an empty object
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("Newest");

    function handleFilters(e) {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    };

    function handleSort(e) {
        const value = e.target.value;
        setSort(value)
    }

    function removeFilters() {
        setFilters({});
    }


    return (
        <>
            <Head>
                <title>{category && category.toString().toUpperCase() } </title>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
                <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>
            <main>
                <Navbar />
                <Announcement />
                <ToastContainer toastStyle={{ backgroundColor: "#7C3AED", boxShadow: "none" }} />

                <section>
                    {/* title  */}
                    <h1 className="m-5 font-bold text-xl sm:text-3xl">{ category && category.toString().toUpperCase() }</h1>
                    {/* filtercontainer  */}
                    <div className="flex m-5 justify-between my-5 mb-10 items-center">
                        <div className="flex sm:flex-row sm:space-x-3 flex-col space-y-2 sm:space-y-0 ">
                            {/* filter text  */}
                            <p className="font-semibold tracking-wide sm:text-lg text-base">Filter Products:</p>
                            <label htmlFor="color" className="flex items-center font-medium text-sm sm:text-base">Color</label>
                            <select name="color" id="color" className="p-1 border border-black outline-none text-xs sm:text-base tracking-wide mr-2" onChange={handleFilters}>
                                <option disabled className="text-gray-400">Color</option>
                                <option value="white">White</option>
                                <option value="blue">Blue</option>
                                <option value="red">Red</option>
                                <option value="yellow">Yellow</option>
                                <option value="pink">Pink</option>
                                <option value="black">Black</option>
                                <option value="mustard">Mustard</option>
                                <option value="olive">Olive</option>
                                <option value="rose">Rose</option>
                                <option value="green">Green</option>
                                <option value="purple">Purple</option>
                            </select>
                            <label htmlFor="size" className="flex items-center font-medium text-sm sm:text-base">Size</label>

                            <select name="size" id="size" className="p-1 border border-black outline-none text-xs sm:text-base tracking-wide mr-2" onChange={handleFilters}>
                                <option disabled className="text-gray-400">Size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="40">40</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        {/* remove filter button  */}
                        {Object.keys(filters).length !== 0 && <button type="button" className="flex items-center justify-center tracking-wide bg-gray-800 text-white sm:px-3 sm:py-2 px-2 py-1 transition font-medium text-xs sm:text-base" onClick={removeFilters}>Remove Filters<VscClose fontSize="1.2rem" color="red" style={{ marginLeft: "2px" }} /></button>}


                        <div className="flex sm:space-x-3 space-y-2 sm:space-y-0 flex-col sm:flex-row">
                            {/* filter text  */}
                            <p className="font-semibold tracking-wide sm:text-lg text-base">Sort Products:</p>
                            <select name="sort" id="sort" className="p-1 border border-black outline-none text-xs sm:text-base tracking-wide mr-2" onChange={handleSort}>
                                <option value="new"  >Newest</option>
                                <option value="low">Price (Low to High)</option>
                                <option value="high">Price (High to Low)</option>
                            </select>

                        </div>
                    </div>
                    {category && <Products category={category} filter={filters} sort={sort} />}
                </section>
                <section>
                    <Newsletter />
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default productlist
