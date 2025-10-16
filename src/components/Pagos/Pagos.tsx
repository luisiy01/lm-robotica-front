import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Chip, Grid, Modal, Typography } from "@mui/material";
import { usePagos } from "./hooks/usePagos";

const paginationModel = { page: 0, pageSize: 5 };

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Pagos = () => {
  const {
    rows,
    columns,
    open,
    handleClose,
    alumno,
    isChipSelected,
    setMesSeleccionado,
  } = usePagos();

  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <Chip
          label="Enero 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(1)}
          variant={isChipSelected(1) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Febrero 2025"
          component="a"
          href="#basic-chip"
          clickable
          onClick={() => setMesSeleccionado(2)}
          variant={isChipSelected(2) ? "filled" : "outlined"}
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Marzo 2025"
          component="a"
          href="#basic-chip"
          clickable
          onClick={() => setMesSeleccionado(3)}
          variant={isChipSelected(3) ? "filled" : "outlined"}
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Abril 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(4)}
          variant={isChipSelected(4) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Mayo 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(5)}
          variant={isChipSelected(5) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Junio 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(6)}
          variant={isChipSelected(6) ? "filled" : "outlined"}
          clickable
        />
      </Grid>

      <Grid size={2}>
        <Chip
          label="Julio 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(7)}
          variant={isChipSelected(7) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Agosto 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(8)}
          variant={isChipSelected(8) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Septiembre 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(9)}
          variant={isChipSelected(9) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Octubre 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(10)}
          variant={isChipSelected(10) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Noviembre 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(11)}
          variant={isChipSelected(11) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={2}>
        <Chip
          label="Diciembre 2025"
          component="a"
          href="#basic-chip"
          onClick={() => setMesSeleccionado(12)}
          variant={isChipSelected(12) ? "filled" : "outlined"}
          clickable
        />
      </Grid>
      <Grid size={12}>
        <DataGrid
          rows={rows}
          //getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
            columns: {
              columnVisibilityModel: {
                _id: false,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </Grid>
      <Grid>
        <Button variant="contained">Reporte de Pagos</Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Registrar pago para ${alumno ? alumno?.nombre : ""}`}
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginBottom: 8 }}
            sx={{ mt: 2 }}
          >
            {`Fecha: ${new Date().toLocaleString("es-MX", {
              month: "long",
            })} ${new Date().getFullYear()}`}
          </Typography>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            1 Mes - $1,100
          </Button>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            3 Mes - $2,400
          </Button>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            6 Mes - $4,000
          </Button>
          <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
            Monto Personalizado ($1000.00)
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};
