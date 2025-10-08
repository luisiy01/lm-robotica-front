import { addAlumno } from "../../../../services/alumno.service";

export const useRegistro = () => {
  const agregarAlumno = (formData: any) => {
    formData["fecha1"] = `${formData["dia1"]} ${formData["hora1"]}`;
    formData["fecha2"] = `${formData["dia2"]} ${formData["hora2"]}`;
    delete formData["dia1"];
    delete formData["dia2"];
    delete formData["hora1"];
    delete formData["hora2"];

    addAlumno(formData)
      .then((alumnoResponse) => {
        if (alumnoResponse.status === 201) {
          // alumno creado
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return {
    agregarAlumno,
  };
};
