import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Table from "./Table";

const drawerWidth = 240; // drawer width defined
function Homepage() {
  const [mobileOpen, setMobileOpen] = React.useState(false); // state defined for opening sidebar
  const [isClosing, setIsClosing] = React.useState(false); // state defined for closing sidebar

  // Arrow function to close sidebar
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  // Arrow function for sidebar transition
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // Arrow function for drawer button click
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      {/* Logo Image */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxVlKiObkc78TE6qLuV9ee1B2eIVAUCDDJ6g&s"
        alt=""
        style={{ width: "150px", marginLeft: "10px" }}
      />
      {/* Sidebar Items */}
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", width: "100vw", overflowX: "auto" }}>
      <CssBaseline />
      {/* Appbar including message, notification and user name and avatar from MUI*/}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: { xs: "space-between", md: "end" },
            paddingRight: "20px",
            marginTop: "10px",
          }}
        >
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon sx={{ fill: "gray" }} />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={7} color="error">
                  <NotificationsIcon sx={{ fill: "gray" }} />
                </Badge>
              </IconButton>
            </Box>
            <Typography sx={{ color: "black", fontSize: "1rem" }}>
              Deepraj Pagare
            </Typography>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Deepraj Pagare"
                  src="https://mui.com/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* Table heading */}
        <Typography
          sx={{
            color: "black",
            fontSize: { md: "1.5rem", xs: "1rem" },
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "20px",
            marginTop: { xs: "20px", md: "0" },
          }}
        >
          Mumbai Weather Forecast
        </Typography>
        <Table />
      </Box>
    </Box>
  );
}

export default Homepage;
