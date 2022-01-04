const Newsletter = () => {
    return (
        <section className="bg-[#fcf5f5] flex items-center justify-center h-72 flex-col sm:my-6 my-4 ">
            {/* title  */}
                <h1 className="font-bold text-2xl sm:text-4xl uppercase tracking-wide mb-4">Newsletter</h1>
                {/* description  */}
                <p className="font-semibold text-gray-600 text-sm sm:text-base tracking-wide mb-5 sm:text-justify text-center p-3 sm:p-0">Get timely updates about your favourite products and new trends.</p>
                {/* input div  */}
            
                <div className="flex sm:min-w-[25rem] min-w-[15rem] space-x-5">
                    <input type="email" placeholder="Your Email"  className="px-3 py-1.5 bg-white flex-grow outline-none border border-black text-sm sm:text-base"  />
                    <button type="button" className="bg-gray-800 text-white px-2 tracking-wider text-sm sm:text-base">Notify Me</button>
                </div>
            

        </section>
    )
}

export default Newsletter
