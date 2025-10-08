import type { Alumno } from "../../../../interfaces/Alumno";
import { addAlumno, updateAlumno } from "../../../../services/alumno.service";
import { useStore } from "../../../../store/useStore";

export const useRegistro = (toast: any) => {
  const { disSelectAlumno } = useStore();

  const agregarAlumno = (formData: any) => {
    formData["fecha1"] = `${formData["dia1"]} ${formData["hora1"]}`;
    formData["fecha2"] = `${formData["dia2"]} ${formData["hora2"]}`;
    delete formData["dia1"];
    delete formData["dia2"];
    delete formData["hora1"];
    delete formData["hora2"];

    const fetchDataPromise = new Promise((resolve, reject) => {
      addAlumno(formData)
        .then((alumnoResponse) => {
          if (alumnoResponse.status === 201) {
            resolve(alumnoResponse.data);
          }
          reject();
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        })
        .finally(() => {
          disSelectAlumno();
        });
    });

    toast.promise(fetchDataPromise, {
      pending: "Agregando Alumno",
      success: "Alumno Agregado Correctamente",
      error: "Error al Agregar Alumno",
    });
  };

  const modificarAlumno = (alumno: Alumno, formData: any) => {
    formData["fecha1"] = `${formData["dia1"]} ${formData["hora1"]}`;
    formData["fecha2"] = `${formData["dia2"]} ${formData["hora2"]}`;

    delete formData["dia1"];
    delete formData["dia2"];
    delete formData["hora1"];
    delete formData["hora2"];

    const fetchDataPromise = new Promise((resolve, reject) => {
      updateAlumno(alumno._id!, formData)
        .then((alumnoResponse) => {
          if (alumnoResponse.status === 200) {
            resolve(alumnoResponse.data);
          }
          reject();
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        })
        .finally(() => {
          disSelectAlumno();
        });
    });

    toast.promise(fetchDataPromise, {
      pending: "Actualizando Alumno",
      success: "Alumno Actualizado Correctamente",
      error: "Error al Actualizar Alumno",
    });
  };

  return {
    agregarAlumno,
    modificarAlumno,
  };
};
