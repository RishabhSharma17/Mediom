import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { BlogCard } from "./BlogCard";

export function Blogs() {
    const {loading,blogs}= useBlogs();

    if(loading){
        return <>
        <Appbar />
        <div className="flex justify-center">
            <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            </div>
        </div>
        </>
    }

    return<div >
        <Appbar />
        <div className="flex justify-center">
            <div className="flex flex-col justify-center max-w-2xl">
                {
                    blogs.map(blog=>(
                        <BlogCard 
                        key={blog.id}
                        authorName={blog.author.username} 
                        title={blog.title}
                        content={blog.content}
                        publishedDate={""}
                        id={blog.id}
                        />
                    ))
                }
                <BlogCard 
                authorName={"rishabh"} 
                title={"Title of the Blog"}
                content={"Content of this blog only for practice"}
                publishedDate={"21-08-2024"}
                id={'1'}
                />
            </div>
        </div>
    </div> 
}