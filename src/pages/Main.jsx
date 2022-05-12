import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"

function Main(){
    return (
        <Routes>
            <Route path="/" element={<Layout />}>

            </Route>
        </Routes>
    )
}
export default Main