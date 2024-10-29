import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Sigin"
import { Signup } from "./pages/Signup"
import { Blogs } from "./pages/Blogs"
import { Createblog } from "./pages/Createblog"
import { Blog } from "./pages/Blog"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/create" element={<Createblog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
