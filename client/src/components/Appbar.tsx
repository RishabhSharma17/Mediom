import { useNavigate } from "react-router-dom";
import { Avatar } from "../pages/BlogCard";

export function Appbar() {
    const navigate = useNavigate()
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="font-extrabold flex flex-col justify-center text-3xl">Mediom</div>
        <div>
            <button onClick={()=>{
                localStorage.removeItem("token");
                navigate('/signin');
            }}
             className="mr-8 text-white bg-red-700 hover:bg-red-800 focus:outline-none 
                focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg px-5 py-2.5 
                text-center me-2">
                Logout
            </button>
            <button onClick={()=>{
                navigate('/create');
            }} 
            className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4
                focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 
                text-center me-2 ">
                Publish
            </button>
            <Avatar name={"Rishabh"} size={"big"}/>
        </div>
    </div>
}