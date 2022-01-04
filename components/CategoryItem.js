import Image from "next/image";
import Link from "next/link";

const CategoryItem = ({ item }) => {
    return (
        <>
            {/* for large devices  */}
            <Link href={`/productlist/${item.category}`}>
                <a>
                    <div className="hidden sm:flex sm:flex-col sm:m-5 py-5 sm:relative hover:opacity-80 transition cursor-pointer  ">
                        <Image src={item.img} height="400rem" width="330rem" objectFit="cover" />
                        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
                            <h1 className="font-bold text-white text-xs sm:text-3xl mb-3">{item.title}</h1>
                            <button type="button" className=" font-semibold sm:p-2 p-1 bg-themePink sm:tracking-wider text-[10px] sm:text-base">EXPLORE</button>
                        </div>
                    </div>
                </a>
            </Link>

            {/* for mobile devices  */}
            <Link href={`/productlist/${item.category}`}>
                <a>
                    <div className="flex flex-col py-3 relative hover:opacity-80 transition sm:hidden cursor-pointer ">
                        <Image src={item.img} height="260rem" width="330rem" objectFit="cover" />
                        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
                            <h1 className="font-bold text-white text-2xl mb-3">{item.title}</h1>
                            <button type="button" className=" font-semibold  p-2 bg-themePink tracking-wider text-xs">EXPLORE</button>
                        </div>
                    </div>
                </a>
            </Link>
        </>
    )
}

export default CategoryItem
