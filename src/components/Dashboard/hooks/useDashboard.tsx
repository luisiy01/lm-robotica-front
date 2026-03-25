import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useStore } from "../../../store/useStore";

export const useDashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [drawerItemSelected, setDrawerItemSelected] = useState(0);
  const { disSelectAlumno } = useStore();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickOption = (index: number) => {
    setDrawerItemSelected(index);
    disSelectAlumno();
  };

  return {
    open,
    drawerItemSelected,
    theme,

    handleDrawerOpen,
    handleDrawerClose,
    onClickOption
  };
};
