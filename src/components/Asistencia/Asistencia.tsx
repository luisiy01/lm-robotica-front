import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAsistencia } from "./hooks/useAsistencia";
import { ChipsMeses } from "../Pagos/ChipsMeses";

function createData(id: number, nombre: string, semana: any) {
  return { id, nombre, semana };
}

const rows = [
  createData(1, "Bruno Gael Barajas Sanches", ["Lunes", "Miercoles"]),
  createData(2, "Eder Rodriguez Rodriguez", ["Lunes", "Miercoles"]),
  createData(3, "Bastian Kaleb Gaitan Ayala", ["Lunes", "Miercoles"]),
];

const paginationModel = { page: 0, pageSize: 5 };

export const Asistencia = () => {
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

  const {
    isChipSelected,
    setMesSeleccionado,
    nextYear,
    backYear,
    yearSeleccionado,
  } = useAsistencia();

  return (
    <Grid container spacing={2}>
      <ChipsMeses
        {...{
          isChipSelected,
          setMesSeleccionado,
          nextYear,
          backYear,
          yearSeleccionado,
        }}
      />

      <Grid size={12}>
        <DataGrid
          rowHeight={120}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Grid>
    </Grid>
  );
};
