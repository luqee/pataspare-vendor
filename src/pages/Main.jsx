import { Route, Routes } from "react-router-dom"
import Activate from "./Activate"
import EmailSent from "./EmailSent"
import Layout from "./Layout"
import PasswordReset from "./PasswordReset"
import Recovery from "./Recovery"
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
                <Route path="auth/recovery" element={<Recovery />} />
                <Route path="auth/reset/:token/:email" element={<PasswordReset />} />
            </Route>
        </Routes>
    )
}
export default Main