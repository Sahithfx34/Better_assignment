import { Routes,Route } from "react-router-dom"
import Login from "../pages/Login"
import Signup from "../pages/Signup"


const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
    </Routes>
  )
}

export default Routing