import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/Sigin"
import { Signup } from "./pages/Signup"
import { Blogs } from "./pages/Blogs"
import { Createblog } from "./pages/Createblog"
import { Blog } from "./pages/Blog"
import { ProtectedPath } from "./components/ProtectedPath"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/create" element={<ProtectedPath>
              <Createblog/>
            </ProtectedPath>} />
          <Route path="/blogs" element={<ProtectedPath>
              <Blogs/>
            </ProtectedPath>} />
          <Route path="/blog/:id" element={<ProtectedPath>
              <Blog/>
            </ProtectedPath>} />
          <Route path='/' element={
            localStorage.getItem('token') ? <Navigate to={'/blogs'} replace={true}/> :
            <Navigate to={'/signup'} replace={true}/>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
