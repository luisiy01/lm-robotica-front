import { useState } from "react";
import { pagarAlumno } from "../../../services/pagos.service";

export const useRegistroPago = (
  alumno: any,
  toast: any,
  handleClose: any,
  listaDePagos: any
) => {
  const [isDisabledButtons, setIsDisabledButtons] = useState(false);

  const registrarPago = async (totalPagado: number, nombrePaquete: string) => {
    setIsDisabledButtons(true);
    const patchDataPromise = new Promise((resolve, reject) => {
      pagarAlumno(alumno.responseData.pago._id, {
        alumnoId: alumno.responseData.pago.alumnoId,
        periodoPagado: alumno.responseData.pago.periodoDePago,
        totalPagado: totalPagado,
        nombrePaquete: nombrePaquete,
        pagado: true,
      })
        .then((respuestaPago) => {
          console.log("respuestaPago", respuestaPago);
          if (respuestaPago.status === 200) {
            resolve("");
          }
          reject();
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        })
        .finally(() => {
          setIsDisabledButtons(false);
          handleClose();
          listaDePagos();
        });
    });

    toast.promise(patchDataPromise, {
      pending: "Guardando Pago",
      success: "Pago Guardado Correctamente",
      error: "Error al Pagar Alumno",
    });
  };
  return {
    registrarPago,
    isDisabledButtons,
  };
};
