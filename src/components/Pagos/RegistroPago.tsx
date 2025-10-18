import { Box, Button, Modal, Typography } from "@mui/material";
import { useRegistroPago } from "./hooks/useRegistroPago";
import { toast } from "react-toastify";

interface myProps {
  open: boolean;
  handleClose: () => void;
  alumno: any;
  listaDePagos: () => void;
  mesSeleccionado: number;
  yearSeleccionado: number;
}

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

export const RegistroPago = ({
  open,
  handleClose,
  alumno,
  listaDePagos,
  mesSeleccionado,
  yearSeleccionado,
}: myProps) => {
  const { registrarPago, isDisabledButtons } = useRegistroPago(
    alumno,
    toast,
    handleClose,
    listaDePagos,
    mesSeleccionado,
    yearSeleccionado
  );

  return (
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
        <Button
          fullWidth
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => registrarPago(1100, "1 mes")}
          disabled={isDisabledButtons}
        >
          1 Mes - $1,100
        </Button>
        <Button
          fullWidth
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => registrarPago(2400, "3 meses")}
          disabled={isDisabledButtons}
        >
          3 Mes - $2,400
        </Button>
        <Button
          fullWidth
          variant="contained"
          style={{ marginBottom: 8 }}
          onClick={() => registrarPago(4000, "6 meses")}
          disabled={isDisabledButtons}
        >
          6 Mes - $4,000
        </Button>
        <Button fullWidth variant="contained" style={{ marginBottom: 8 }}>
          Monto Personalizado ($1000.00)
        </Button>
      </Box>
    </Modal>
  );
};
