"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material"

const navItems = [
  { title: "Ana Sayfa", path: "/" },
  { title: "Menü", path: "/menu" },
  { title: "Hakkımızda", path: "/hakkimizda" },
  { title: "İletişim", path: "/iletisim" },
]

const Navbar = ({ scrolled }) => {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", padding: "10px 0" }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: scrolled ? "primary.main" : "white",
                textShadow: scrolled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Lezzet Durağı
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: scrolled ? "text.primary" : "white",
                    fontWeight: 500,
                    position: "relative",
                    textShadow: scrolled ? "none" : "0 1px 2px rgba(0, 0, 0, 0.5)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: location.pathname === item.path ? "100%" : "0%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "primary.main",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {item.title}
                </Button>
              ))}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                }}
              >
                Rezervasyon
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{
                color: scrolled ? "text.primary" : "white",
                textShadow: scrolled ? "none" : "0 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div" sx={{ color: "primary.main", fontWeight: 700 }}>
            Lezzet Durağı
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                backgroundColor: location.pathname === item.path ? "rgba(212, 175, 55, 0.1)" : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(212, 175, 55, 0.05)",
                },
              }}
            >
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  color: location.pathname === item.path ? "primary.main" : "text.primary",
                }}
              />
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth>
              Rezervasyon
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  )
}

export default Navbar

