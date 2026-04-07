import { Route, Routes } from "react-router";
import { Login } from "@components/Login/Login";
import { NewDashboard } from "@components/NewDashboard/NewDashboard";
import { Alumnos } from "@components/NewDashboard/components/Alumnos/Alumnos";
import { NuevoAlumno } from "@components/NewDashboard/components/Alumnos/NuevoAlumno/NuevoAlumno";
import { EditarAlumno } from "@components/NewDashboard/components/Alumnos/EditarAlumno/EditarAlumno";
import { ProtectedRoute } from "./ProtectedRoute";
import { Pagos } from "@components/NewDashboard/components/Pagos/Pagos";
import { Asistencias } from "@components/NewDashboard/components/Asistencias/Asistencias";
import { Configuracion } from "@components/NewDashboard/components/Configuracion/Configuracion";

export const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<NewDashboard />}>
          <Route index element={<Alumnos />} />
          <Route path="alumnos" element={<Alumnos />} />
          <Route path="alumnos/nuevo" element={<NuevoAlumno />} />
          <Route path="alumnos/editar/:id" element={<EditarAlumno />} />
          <Route path="pagos" element={<Pagos />} />
          <Route path="asistencias" element={<Asistencias />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Route>
    </Routes>
  );
};
