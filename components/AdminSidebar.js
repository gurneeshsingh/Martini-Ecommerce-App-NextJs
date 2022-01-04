import Link from 'next/link';


const AdminSidebar = ({toggle}) => {
    return (
        <main className=" h-screen my-1 ">
            {/* left section vertical bar  */}
            {toggle &&
                <section className="bg-[whitesmoke] h-screen w-44 flex sm:hidden flex-col transition-all shadow-lg p-4 z-30 absolute ">
                    <h2 className="text-xs sm:text-sm text-gray-400 font-semibold">Dashboard</h2>
                    <div className="flex flex-col my-2 ml-3 transition-all ">
                        <Link href="/dashboard"  >
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold ">Home</a>
                        </Link>
                        <Link href="/dashboard/analytics">
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Analytics</a>
                        </Link>
                        <Link href="/dashboard/sales">
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Sales</a>
                        </Link>
                    </div>
                    <h2 className="text-xs sm:text-sm text-gray-400 font-semibold mt-3">Quick Menu</h2>
                    <div className="flex flex-col my-2 ml-3 transition-all ">
                        <Link href="/dashboard/users" >
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Users</a>
                        </Link>
                        <Link href="/dashboard/allproducts">
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Products</a>
                        </Link>
                        <Link href="/dashboard/createproduct">
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Create Product</a>
                        </Link>
                        <Link href="/dashboard/transactions">
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Transactions</a>
                        </Link>
                        <Link href="/dashboard/reports">
                            <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Reports</a>
                        </Link>
                    </div>
                </section>}
            <section className="h-screen sm:flex hidden flex-col bg-[whitesmoke] w-[20vw] shadow-md p-5">
                <h2 className="text-xs sm:text-sm text-gray-400 font-semibold">Dashboard</h2>
                <div className="flex flex-col my-2 ml-3 transition-all ">
                    <Link href="/dashboard" >
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Home</a>
                    </Link>
                    <Link href="/dashboard/analytics">
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Analytics</a>
                    </Link>
                    <Link href="/dashboard/sales">
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Sales</a>
                    </Link>
                </div>
                <h2 className="text-xs sm:text-sm text-gray-400 font-semibold mt-3">Quick Menu</h2>
                <div className="flex flex-col my-2 ml-3 transition-all ">
                    <Link href="/dashboard/users" >
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Users</a>
                    </Link>
                    <Link href="/dashboard/allproducts">
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold " tabIndex="3">Products</a>
                    </Link>
                    <Link href="/dashboard/createproduct">
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold " tabIndex="3">Create Product</a>
                    </Link>
                    <Link href="/dashboard/transactions">
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold ">Transactions</a>
                    </Link>
                    <Link href="/dashboard/reports">
                        <a className="text-sm sm:text-base font-medium  px-3 rounded-lg tracking-wide hover:bg-purple-200 focus:text-purple-700 focus:font-semibold">Reports</a>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default AdminSidebar
