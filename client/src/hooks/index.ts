import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog{
    id:string;
    title:string;
    content:string;
    author:{
        username:string;
    };
}


export const useBlog = ({id}:{id:string}) => {
    const [loading,setLoading] = useState(true);
    const [blog,setBlogs] = useState<Blog>();
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/single/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token"),
            }
        })
        .then(response => {
            setLoading(false);
            setBlogs(response.data.blog);
        })
    },[id]);

    return{
        loading,
        blog,
        
    }
}

export function useBlogs() {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token"),
            }
        })
        .then(response => {
            setLoading(false);
            setBlogs(response.data.blogs);
        })
    },[]);

    return{
        loading,
        blogs,
        
    }
}