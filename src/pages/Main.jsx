import { Route, Routes } from "react-router-dom"
import Activate from "./Activate"
import EmailSent from "./EmailSent"
import Layout from "./Layout"
import UserLogin from "./UserLogin"
import VendorRegister from "./VendorRegister"

function Main(){
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="auth/register" element={<VendorRegister />} />
                <Route path="auth/email" element={<EmailSent />} />
                <Route path="auth/activate" element={<Activate />} />
                <Route path="auth/login" element={<UserLogin />} />
            </Route>
        </Routes>
    )
}
export default Main