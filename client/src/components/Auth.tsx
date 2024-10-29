import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from 'react';
import { Signupformat } from "@rishabhs_17/mediom-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "./Spinner";

export const Auth = ({type}:{type:"Signup" | "Signin"}) => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState<Boolean>(false);
    const [userinputs,setUserinputs] = useState<Signupformat>({
        email:"",
        password:"",
        username:"",
    });

    async function sendRequest(){
      try{
        setLoading(true);
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="Signin"?"signin":"signup"}`,userinputs);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/blogs');
      }
      catch(e){
        console.log(e);
        alert('An error occurred while processing your request , Please try again');
        setLoading(false);
      }
    }

    if(loading){
      return <div>
          <div className="flex h-screen flex-col justify-center">
          <div className="flex justify-center">
              <Spinner />
          </div>
      </div>
      </div>
  }

    return(
        <div className="h-screen w-full flex flex-col justify-center">
            <div className="flex justify-center">
                <div className="shadow-2xl p-16 rounded-2xl">
                    <div className="text-4xl px-10  font-extrabold">
                       { type=="Signin"?"Login to Account":"Create an Account"}
                    </div>
                    <div className="text-lg text-center my-2  text-slate-300">
                       { type=="Signin" ? "Don't have an Account ? " :"Already have an Account ?"} <Link className="pt-2 underline" to={type=="Signin"?"/signup":"/signin"}>{type=="Signup" ? "Signin":"Signup"}</Link> 
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        {type=="Signup"?<InputField
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={(e) => setUserinputs(prevState => ({...prevState, username:e.target.value}))} 
                        />:null}
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your Email"
                            onChange={(e) => setUserinputs(prevState => ({...prevState, email:e.target.value}))} 
                        />
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="12345"
                            onChange={(e) => setUserinputs(prevState => ({...prevState, password:e.target.value}))} 
                        />
                        <button  onClick={sendRequest} className={`${loading==false?"bg-black":"bg-gray-500"} text-white rounded-xl h-10 text-xl mt-4`}>{type=="Signup" ? "Signup":"Signin"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const InputField = ({ label ,placeholder, type ,onChange}:{label:string,placeholder:string,type?:string,onChange:(e:ChangeEvent<HTMLInputElement>)=>void}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full my-4">
      <label className="absolute top-1 left-4 text-gray-500 text-sm">
        {label}
      </label>

      <input
        type= {type ||"text"}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full p-2 pt-6 bg-gray-100 text-gray-800 rounded-lg 
        border-2 ${isFocused ? 'border-black' : 'border-transparent'} 
        focus:outline-none focus:border-black transition-all duration-100`}
      />
    </div>
  );
};

export default InputField;
