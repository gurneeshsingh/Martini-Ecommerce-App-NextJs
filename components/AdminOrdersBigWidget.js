import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const AdminOrdersBigWidget = () => {

    const [loading, setLoading] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        async function getOrdersFromDb() {
            try {
                setLoading(true)
                const response = await axios.get('https://martiniapi.herokuapp.com/api/order/?new=true', {
                    headers: {
                        'auth-token': currentUser.authToken
                    }
                });
                setOrders(response.data)
                setLoading(false)
                
            } catch (error) {
                console.log(error);
            }
        };
        
        currentUser && getOrdersFromDb()
    },[currentUser])

    const Button = ({ type }) => {
        return <button className={"widgetBtn " + type}> {type} </button> 
    };

   
    return (
        <main className="p-6 flex-2 flex flex-col  hover:border-[#9356cc] shadow-md transition-all rounded-lg border-[1.5px]">
            <h2 className="text-purple-600 font-semibold text-base sm:text-lg mb-3 uppercase tracking-wide ">Latest Orders</h2>
            <table className="w-full text-left ">
                <thead className="bg-[whitesmoke] ">
                <tr className=" tracking-wide text-sm sm:text-base ">
                    <th className="text-left">Customer ID</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Status</th>
                </tr>
                </thead>
                <br />
                {loading ? <img src="/Images/loading.gif" alt="loading" className="text-center flex items-center justify-center mx-auto mt-3 " /> :
                    orders?.map((order) => (
                        <tbody key={order._id} >
                            <tr >
                                <td className="flex items-center font-medium text-gray-600 my-1.5 text-[11px] sm:text-sm text-left">
                                    <span>{ order?.userId}</span>
                                </td>
                                <td className="my-1.5  font-medium text-gray-600 text-xs sm:text-sm text-center">{ format(order?.createdAt)}</td>
                                <td className="my-1.5  font-semibold text-xs sm:text-base text-center">&#8377; { order?.amount}</td>
                                <td className="my-1.5 text-xs sm:text-sm text-center">
                                    <Button type={order?.status}></Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                
            </table>
            
            
        </main>
    )
}

export default AdminOrdersBigWidget
