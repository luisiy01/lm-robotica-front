import { Route, Routes } from "react-router";
import { Login } from "../components/Login/Login";
import { NewDashboard } from "../components/NewDashboard/NewDashboard";

export const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<NewDashboard />} />
        </Routes>
    )
}
