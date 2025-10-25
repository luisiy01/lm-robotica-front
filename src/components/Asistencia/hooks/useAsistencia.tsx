import { useState } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function createData(id: number, nombre: string, semana: any) {
  return { id, nombre, semana };
}

const rows = [
  createData(1, "Bruno Gael Barajas Sanches", ["Lunes", "Miercoles"]),
  createData(2, "Eder Rodriguez Rodriguez", ["Lunes", "Miercoles"]),
  createData(3, "Bastian Kaleb Gaitan Ayala", ["Lunes", "Miercoles"]),
];

const paginationModel = { page: 0, pageSize: 5 };

export const useAsistencia = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().getMonth() + 1
  );
  const [yearSeleccionado, setYearSeleccionado] = useState(
    new Date().getFullYear()
  );

  const isChipSelected = (mes: number) => {
    return mesSeleccionado === mes ? true : false;
  };

  const nextYear = () => {
    setYearSeleccionado(yearSeleccionado + 1);
  };

  const backYear = () => {
    setYearSeleccionado(yearSeleccionado - 1);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", width: 210 },
    {
      field: "semana1",
      headerName: "Semana 1",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (_params) => {
        const [formats, setFormats] = useState<string[]>(() => []);

        const handleFormat = (
          _event: React.MouseEvent<HTMLElement>,
          newFormats: string[]
        ) => {
          setFormats(newFormats);
        };

        return (
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton
              style={{
                backgroundColor: "green",
                color: "white",
                width: 90,
                fontSize: 12,
              }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton
              value="fecha2"
              aria-label="italic"
              style={{ width: 90, fontSize: 12 }}
            >
              Miercoles
              <br />
              15:30 - 17:00
            </ToggleButton>
          </ToggleButtonGroup>
        );
      },
    },
    {
      field: "semana2",
      headerName: "Semana 2",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (_params) => {
        const [formats, setFormats] = useState<string[]>(() => []);

        const handleFormat = (
          _event: React.MouseEvent<HTMLElement>,
          newFormats: string[]
        ) => {
          setFormats(newFormats);
        };

        return (
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton
              style={{
                backgroundColor: "green",
                color: "white",
                width: 90,
                fontSize: 12,
              }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton
              value="fecha2"
              aria-label="italic"
              style={{ width: 90, fontSize: 12 }}
            >
              Miercoles
              <br />
              15:30 - 17:00
            </ToggleButton>
          </ToggleButtonGroup>
        );
      },
    },
    {
      field: "semana3",
      headerName: "Semana 3",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (_params) => {
        const [formats, setFormats] = useState<string[]>(() => []);

        const handleFormat = (
          _event: React.MouseEvent<HTMLElement>,
          newFormats: string[]
        ) => {
          setFormats(newFormats);
        };

        return (
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton
              style={{
                backgroundColor: "green",
                color: "white",
                width: 90,
                fontSize: 12,
              }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton
              value="fecha2"
              aria-label="italic"
              style={{ width: 90, fontSize: 12 }}
            >
              Miercoles
              <br />
              15:30 - 17:00
            </ToggleButton>
          </ToggleButtonGroup>
        );
      },
    },
    {
      field: "semana4",
      headerName: "Semana 4",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (_params) => {
        const [formats, setFormats] = useState<string[]>(() => []);

        const handleFormat = (
          _event: React.MouseEvent<HTMLElement>,
          newFormats: string[]
        ) => {
          setFormats(newFormats);
        };

        return (
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            aria-label="text formatting"
          >
            <ToggleButton
              style={{
                backgroundColor: "green",
                color: "white",
                width: 90,
                fontSize: 12,
              }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton
              value="fecha2"
              aria-label="italic"
              style={{ width: 90, fontSize: 12 }}
            >
              Miercoles
              <br />
              15:30 - 17:00
            </ToggleButton>
          </ToggleButtonGroup>
        );
      },
    },
  ];

  return {
    isChipSelected,
    setMesSeleccionado,
    nextYear,
    backYear,
    yearSeleccionado,
    rows,
    paginationModel,
    columns,
  };
};
