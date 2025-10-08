import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Chip,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

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
    { field: "nombre", headerName: "Nombre", width: 250 },
    {
      field: "semana1",
      headerName: "Semana 1",
      width: 250,
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
              style={{ backgroundColor: "green", color: "white" }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton value="fecha2" aria-label="italic">
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
      width: 250,
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
              style={{ backgroundColor: "green", color: "white" }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton value="fecha2" aria-label="italic">
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
      width: 250,
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
              style={{ backgroundColor: "green", color: "white" }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton value="fecha2" aria-label="italic">
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
      width: 250,
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
              // style={{ backgroundColor: "green", color: "white" }}
              value="fecha1"
              aria-label="bold"
            >
              Lunes
              <br />
              15:30 - 17:00
            </ToggleButton>
            <ToggleButton value="fecha2" aria-label="italic">
              Miercoles
              <br />
              15:30 - 17:00
            </ToggleButton>
          </ToggleButtonGroup>
        );
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Septiembre 2025"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
          <Chip
            label="Octubre 2025"
            component="a"
            href="#basic-chip"
            clickable
          />
          <Chip
            label="Noviembre 2025"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
          <Chip
            label="Diciembre 2025"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <DataGrid
          rowHeight={120}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Grid>
    </Grid>
  );
};
