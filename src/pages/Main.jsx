import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import VendorRegister from "./VendorRegister"

function Main(){
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route path="auth/register" element={<VendorRegister />} />
            </Route>
        </Routes>
    )
}
export default Main