import { Route, Routes } from "react-router-dom"
import Activate from "./Activate"
import EmailSent from "./EmailSent"
import Layout from "./Layout"
import PasswordReset from "./PasswordReset"
import Recovery from "./Recovery"
import RequireAuth from "./RequireAuth"
import UserLogin from "./UserLogin"
import CreateShop from "./vendor/CreateShop"
import Dash from "./vendor/Dash"
import EditShop from "./vendor/EditShop"
import ShopIndex from "./vendor/ShopIndex"
import ShopInventory from "./vendor/ShopInventory"
import ShopManager from "./vendor/ShopManager"
import Shops from "./vendor/Shops"
import VendorPage from "./vendor/VendorPage"
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
            <Route path="/vendor" element={
                <RequireAuth>
                    <VendorPage />
                </RequireAuth>
            } >
                <Route index element={<Dash />} />
                <Route path="shops" element={<Shops />} />
                <Route path="shops/create" element={<CreateShop />} />
                <Route path="shops/:shopId" element={<EditShop />} />
                {/* <Route path="account" element={<Account />} />
                <Route path="orders/create" element={<OrderCreate />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:orderId" element={<ViewOrder />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="inquiries/:inquiryId" element={<ViewInquiry />} /> */}
            </Route>
            <Route path="/vendor/shops/manage/:shopId" element={
                <RequireAuth>
                    <ShopManager />
                </RequireAuth>
            }>
                <Route index element={<ShopIndex />} />
                <Route path="parts" element={<ShopInventory />} />
            </Route>
        </Routes>
    )
}
export default Main