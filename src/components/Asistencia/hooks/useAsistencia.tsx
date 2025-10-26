import { useEffect, useState } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getAllAsistencias } from "../../../services/asistencia.service";

/* function createData(id: number, nombre: string, semana: any) {
  return { id, nombre, semana };
}

const rows = [
  createData(1, "Bruno Gael Barajas Sanches", ["Lunes", "Miercoles"]),
  createData(2, "Eder Rodriguez Rodriguez", ["Lunes", "Miercoles"]),
  createData(3, "Bastian Kaleb Gaitan Ayala", ["Lunes", "Miercoles"]),
]; */

const paginationModel = { page: 0, pageSize: 5 };

export const useAsistencia = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().getMonth() + 1
  );
  const [yearSeleccionado, setYearSeleccionado] = useState(
    new Date().getFullYear()
  );
  const [rowsAsistencia, setRowsAsistencia] = useState<any[]>([]);

  const renderButtons = (params) => {
    const [formats, setFormats] = useState<string[]>(() => []);
    const handleFormat = (
      _event: React.MouseEvent<HTMLElement>,
      newFormats: string[]
    ) => {
      setFormats(newFormats);
    };

    const semanaActual = params.row.semana.find(
      (item: any) => item.numSemana === 1
    );
    return (
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton
          style={{
            backgroundColor: semanaActual.dia1 ? "green" : "",
            color: semanaActual.dia1 ? "white" : "",
            width: 90,
            fontSize: 12,
          }}
          value="fecha1"
          aria-label="bold"
        >
          {params.row.fecha1.split(" ")[0]}
          <br />
          {params.row.fecha1.split(" ").slice(1)}
        </ToggleButton>
        <ToggleButton
          value="fecha2"
          aria-label="italic"
          style={{
            backgroundColor: semanaActual.dia2 ? "green" : "",
            color: semanaActual.dia2 ? "white" : "",
            width: 90,
            fontSize: 12,
          }}
        >
          {params.row.fecha2.split(" ")[0]}
          <br />
          {params.row.fecha2.split(" ").slice(1)}
        </ToggleButton>
      </ToggleButtonGroup>
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
        return renderButtons(params);
      },
    },
    {
      field: "semana2",
      headerName: "Semana 2",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params);
      },
    },
    {
      field: "semana3",
      headerName: "Semana 3",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params);
      },
    },
    {
      field: "semana4",
      headerName: "Semana 4",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => {
        return renderButtons(params);
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
      return renderButtons(params);
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
