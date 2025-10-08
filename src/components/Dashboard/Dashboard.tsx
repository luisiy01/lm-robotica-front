import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Asistencia } from "../Asistencia/Asistencia";
import { Pagos } from "../Pagos/Pagos";
import { Drawer } from "./Drawer";
import { AppBar } from "./AppBar";
import { DrawerHeader } from "./DrawerHeader";
import logo from "../../assets/lmrobotica.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Alumnos } from "../Alumnos/Alumnos";
import { menuOptions } from "../../lib/Constants";
import { useDashboard } from "./hooks/useDashboard";
import { ToastContainer } from "react-toastify";

export const Dashboard = () => {
  const {
    open,
    handleDrawerOpen,
    drawerItemSelected,
    handleDrawerClose,
    theme,
    onClickOption,
  } = useDashboard();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuOptions[drawerItemSelected]}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img style={{ height: "65px", width: "65px" }} src={logo} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuOptions.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
                onClick={() => onClickOption(index)}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {(() => {
                    switch (index) {
                      case 0:
                        return <CalendarMonthIcon />;
                      case 1:
                        return <AttachMoneyIcon />;
                      case 2:
                        return <AccountCircleIcon />;
                      default:
                        return null;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {drawerItemSelected === 0 && <Asistencia />}
        {drawerItemSelected === 1 && <Pagos />}
        {drawerItemSelected === 2 && <Alumnos />}
      </Box>
      <ToastContainer />
    </Box>
  );
};
