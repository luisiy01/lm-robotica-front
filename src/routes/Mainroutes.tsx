import { Route, Routes } from "react-router";
import { Login } from "@components/Login/Login";
import { NewDashboard } from "@components/NewDashboard/NewDashboard";
import { Alumnos } from "@components/NewDashboard/components/Alumnos/Alumnos";
import { NuevoAlumno } from "@components/NewDashboard/components/Alumnos/NuevoAlumno/NuevoAlumno";
import { EditarAlumno } from "@components/NewDashboard/components/Alumnos/EditarAlumno/EditarAlumno";

export const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<NewDashboard />} >
                <Route index element={<Alumnos />} />
                <Route path="alumnos" element={<Alumnos />} />
                <Route path="alumnos/nuevo" element={<NuevoAlumno />} />
                <Route path="alumnos/editar/:id" element={<EditarAlumno />} />
            </Route>
        </Routes>
    )
}
