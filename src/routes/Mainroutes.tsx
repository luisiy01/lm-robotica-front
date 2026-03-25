import { Route, Routes } from "react-router";
import { Login } from "../components/Login/Login";
import { NewDashboard } from "../components/NewDashboard/NewDashboard";
import { Alumnos } from "../components/NewDashboard/components/Alumnos/Alumnos";
import { NuevoAlumno } from "../components/NewDashboard/components/Alumnos/NuevoAlumno/NuevoAlumno";

export const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<NewDashboard />} >
                <Route index element={<NewDashboard />} />
                <Route path="alumnos" element={<Alumnos />} />
                <Route path="alumnos/nuevo" element={<NuevoAlumno />} />
            </Route>
        </Routes>
    )
}
