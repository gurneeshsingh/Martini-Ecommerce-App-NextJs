import axios from "axios";
import { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import Image from "next/image";
import { useRouter } from "next/router";



const Products = ({ category, filter, sort }) => {

    const [products, setproducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get(category ? `https://martiniapi.herokuapp.com/api/product?category=${category}` : `https://martiniapi.herokuapp.com/api/product`);
                setproducts(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        getProducts()
    }, [category]);

    useEffect(() => {
        category && setFilteredProducts(
            products.filter((item) =>
                Object.entries(filter).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )
    }, [category, filter, products]);

    useEffect(() => {
        if (sort === "Newest") {
            setFilteredProducts((prev) => (
                [...prev].sort((a,b)=>a.createdAt - b.createdAt)
            ))
        } else if (sort === "low") {
            setFilteredProducts((prev) => (
                [...prev].sort((a,b)=>a.price - b.price)
            ))
        } else {
            setFilteredProducts((prev) => (
                [...prev].sort((a,b)=>b.price - a.price)
            ))
        }
    },[sort])



    return (
        <>

            <section className="flex mx-4 sm:my-4 my-2 flex-wrap items-center sm:justify-between justify-center ">
                {category ? filteredProducts?.map((product) => (
                    <SingleProduct key={product._id} product={product} />
                )) : products?.slice(0, 8).map((product) => (
                    <SingleProduct key={product._id} product={product} />
                ))}
                {filteredProducts?.length === 0 && products?.length === 0 && <div className="h-full w-full flex items-center justify-center flex-col my-12">
                    <Image src="/Images/blank.svg" objectFit="contain" width="300rem" height="300rem" />
                    <p className="my-8 text-gray-700 tracking-wide text-sm sm:text-lg font-medium capitalize">No products found for  {category} category.</p>
                    <button type="button" onClick={() => router.push('/productlist/women')} className="bg-themePink py-2.5 px-5 w-max mx-auto text-sm sm:text-lg transition shadow-md hover:font-medium">Browse Products</button>
                </div>}
            </section>
        </>
    )
}

export default Products
