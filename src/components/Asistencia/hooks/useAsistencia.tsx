import { useEffect, useState } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  actualizarAsistencia,
  getAllAsistencias,
} from "../../../services/asistencia.service";
import { toast } from "react-toastify";

const paginationModel = { page: 0, pageSize: 5 };

export const useAsistencia = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().getMonth() + 1
  );
  const [yearSeleccionado, setYearSeleccionado] = useState(
    new Date().getFullYear()
  );
  const [rowsAsistencia, setRowsAsistencia] = useState<any[]>([]);

  const onClickAsistencia = async (
    row: any,
    numFecha: number,
    numSemana: number
  ) => {
    //  setIsDisabledButtons(true);

    const valFechas = row.semana.find(
      (sem: any) => sem.numSemana === numSemana
    );

    const patchDataPromise = new Promise((resolve, reject) => {
      actualizarAsistencia(row.id, {
        alumnoId: row.alumnoId,
        numSemana: numSemana,
        fecha1: numFecha === 1 ? !valFechas.dia1 : valFechas.dia1,
        fecha2: numFecha === 2 ? !valFechas.dia2 : valFechas.dia2,
      })
        .then((respuestaAsistencia) => {
          console.log("respuesta Asistencia", respuestaAsistencia);
          if (respuestaAsistencia.status === 200) {
            resolve("");
          }
          reject();
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        })
        .finally(() => {
          //setIsDisabledButtons(false);
          //handleClose();
          listaDeAsistencia();
        });
    });

    toast.promise(patchDataPromise, {
      pending: "Guardando Asistencia",
      success: "Asistencia Actualizada",
      error: "Error al Actualizar la asistencia",
    });
  };

  const renderButtons = (params: any, semana: number) => {
    const semanaActual = params.row.semana.find(
      (item: any) => item.numSemana === semana
    );
    console.log("params", params);
    return (
      <>
        <Button
          style={{
            backgroundColor: semanaActual.dia1 ? "green" : "",
            color: semanaActual.dia1 ? "white" : "",
            width: 90,
            fontSize: 12,
          }}
          value="fecha1"
          aria-label="bold"
          variant="outlined"
          onClick={() => onClickAsistencia(params.row, 1, semana)}
        >
          {params.row.fecha1.split(" ")[0]}
          <br />
          {params.row.fecha1.split(" ").slice(1)}
        </Button>
        <Button
          variant="outlined"
          value="fecha2"
          aria-label="italic"
          style={{
            backgroundColor: semanaActual.dia2 ? "green" : "",
            color: semanaActual.dia2 ? "white" : "",
            width: 90,
            fontSize: 12,
          }}
          onClick={() => onClickAsistencia(params.row, 2, semana)}
        >
          {params.row.fecha2.split(" ")[0]}
          <br />
          {params.row.fecha2.split(" ").slice(1)}
        </Button>
      </>
    );
  };

  const semanasDefault = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 210 },
    {
      field: "semana1",
      headerName: "Semana 1",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params, 1);
      },
    },
    {
      field: "semana2",
      headerName: "Semana 2",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params, 2);
      },
    },
    {
      field: "semana3",
      headerName: "Semana 3",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params, 3);
      },
    },
    {
      field: "semana4",
      headerName: "Semana 4",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params, 4);
      },
    },
  ];

  const [columns, setColumns] = useState<GridColDef[]>(semanasDefault);

  const isChipSelected = (mes: number) => {
    return mesSeleccionado === mes ? true : false;
  };

  const nextYear = () => {
    setYearSeleccionado(yearSeleccionado + 1);
  };

  const backYear = () => {
    setYearSeleccionado(yearSeleccionado - 1);
  };

  const semana5 = {
    field: "semana5",
    headerName: "Semana 5",
    width: 200,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => {
      return renderButtons(params, 5);
    },
  };

  const listaDeAsistencia = async () => {
    //setLoading(true);
    getAllAsistencias({
      fecha: `${mesSeleccionado}-${yearSeleccionado}`,
    })
      .then((listaAsistencia) => {
        if (listaAsistencia.status === 200) {
          console.log(listaAsistencia.data);
          const newData: any[] = [];
          listaAsistencia.data.forEach((data: any) => {
            newData.push({
              id: data.asistencia._id,
              nombre: data.alumno.name,
              fecha1: data.alumno.fecha1,
              fecha2: data.alumno.fecha2,
              semana: data.asistencia.semanas,
              alumnoId: data.alumno._id,
            });
          });
          if (newData[0].semana.length === 5) {
            const newColumns = semanasDefault;
            if (newColumns.length === 6) {
              newColumns.push(semana5);
            }
            setColumns(newColumns);
          } else {
            setColumns(semanasDefault);
          }

          setRowsAsistencia(newData);
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
        setRowsAsistencia([]);
        setColumns(semanasDefault);
      })
      .finally(() => {
        //setLoading(false);
      });
  };

  useEffect(() => {
    listaDeAsistencia();
  }, [mesSeleccionado, yearSeleccionado]);

  return {
    isChipSelected,
    setMesSeleccionado,
    nextYear,
    backYear,
    yearSeleccionado,
    rowsAsistencia,
    paginationModel,
    columns,
  };
};
