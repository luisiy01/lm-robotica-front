import { useState } from "react"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material"

const dias: string[] = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
]

const horas: string[] = [
  '15:00',
  '17:00',
  '19:00',
]

const marginGridItem = {
  marginBottom: 24
}

export const Registro = () => {

  const [dia1, setDia1] = useState('')
  const [dia2, setDia2] = useState('')
  const [hora1, setHora1] = useState('')
  const [hora2, setHora2] = useState('')


  const handleDia1Change = (event: SelectChangeEvent) => {
    setDia1(event.target.value as string);
  };

  const handleDia2Change = (event: SelectChangeEvent) => {
    setDia2(event.target.value as string);
  };

  const handleHora1Change = (event: SelectChangeEvent) => {
    setHora1(event.target.value as string);
  };

  const handleHora2Change = (event: SelectChangeEvent) => {
    setHora2(event.target.value as string);
  };


  return (
    <Grid container spacing={2} >
      <Grid size={12} style={marginGridItem} >
        <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" />
      </Grid>


      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Dia</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dia1}
            label="Age"
            onChange={handleDia1Change}
          >
            {
              dias.map(dia => (
                <MenuItem value={dia}>{dia}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Hora</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={hora1}
            label="Age"
            onChange={handleHora1Change}
          >
            {
              horas.map(hora => (
                <MenuItem value={hora}>{hora}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>



      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Dia</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dia2}
            label="Age"
            onChange={handleDia2Change}
          >
            {
              dias.map(dia => (
                <MenuItem value={dia}>{dia}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid size={6} style={marginGridItem}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Hora</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={hora2}
            label="Age"
            onChange={handleHora2Change}
          >
            {
              horas.map(hora => (
                <MenuItem value={hora}>{hora}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid size={12} style={marginGridItem}>
        <TextField fullWidth id="outlined-basic" label="# Contacto" variant="outlined" />
      </Grid>

      <Grid size={2}>
        <Button style={{ backgroundColor: 'green' }} variant="contained">Agregar</Button>
      </Grid>

      <Grid size={2}>
        <Button variant="contained">Modificar</Button>
      </Grid>

      <Grid size={2}>
        <Button style={{ backgroundColor: 'red' }} variant="contained">Eliminar</Button>
      </Grid>




    </Grid>

  )
}
