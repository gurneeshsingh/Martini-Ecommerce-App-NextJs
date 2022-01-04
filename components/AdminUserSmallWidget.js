import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";



const AdminUserSmallWidget = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        async function getUsersFromDb() {
            try {
                setLoading(true)
                const response = await axios.get('https://martiniapi.herokuapp.com/api/user/?new=true', {
                    headers: {
                        'auth-token': currentUser.authToken
                    }
                });
                setUsers(response.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        currentUser && getUsersFromDb()
    }, [currentUser])

   
    return (
        <main className="p-6  flex-1 flex flex-col hover:border-[#9356cc] shadow-md transition-all rounded-lg border-[1.5px]">
            <h2 className="text-purple-600 font-semibold text-base sm:text-lg mb-2 uppercase tracking-wide">New Joined Users</h2>
                {loading ? <img src="/Images/loading.gif" alt="loading" className="text-center flex items-center justify-center mx-auto mt-3" /> :
                    users?.map((user) => (
                        <div key={user._id} className="flex flex-col mt-4 items-center">
                            <div className="  flex items-center justify-between w-full  ">
                                <p className=" text-sm sm:text-base font-semibold">{ user?.username}</p>
                                <p className="text-gray-600 text-xs font-medium ">Joined  {format(new Date(user?.createdAt?.slice(0,10).replace('-',',')),'dd-MMM-yyyy') }</p>
                            </div>
                        </div>
                    ))}
           
        </main>
    )
}

export default AdminUserSmallWidget
