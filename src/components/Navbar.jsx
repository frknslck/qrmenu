"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Fade,
} from "@mui/material"
import { Menu as MenuIcon, Restaurant as RestaurantIcon, Close as CloseIcon } from "@mui/icons-material"

// Navbar'ın scroll olduğunda kaybolması için
function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navItems = [
    { title: "Ana Sayfa", path: "/" },
    { title: "Menü", path: "/menu" },
    { title: "Hakkımızda", path: "/hakkimizda" },
    { title: "İletişim", path: "/iletisim" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
          transition: "all 0.3s ease",
          color: scrolled ? "text.primary" : "white",
        }}
        elevation={0}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", padding: { xs: "0.75rem 0", md: "1rem 0" } }}>
            <Fade in={true} timeout={1000}>
              <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { transform: "scale(1.02)", transition: "transform 0.3s ease" },
                  }}
                >
                  <RestaurantIcon sx={{ fontSize: 32 }} />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    Lezzet Durağı
                  </Typography>
                </Box>
              </Link>
            </Fade>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item, index) => (
                <Fade in={true} timeout={1000 + index * 200} key={item.path}>
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "inherit",
                      fontWeight: 500,
                      position: "relative",
                      mx: 1,
                      py: 1,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: isActive(item.path) ? "100%" : "0%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "secondary.main",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                </Fade>
              ))}
              <Fade in={true} timeout={1800}>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/menu"
                  sx={{
                    ml: 2,
                    color: "primary.main",
                    fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(230, 198, 135, 0.4)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(230, 198, 135, 0.6)",
                    },
                  }}
                >
                  QR Menü
                </Button>
              </Fade>
            </Box>

            {/* Mobile Navigation */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 280,
              borderRadius: "16px 0 0 16px",
              boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          <Box
            sx={{ width: "100%", pt: 3, pb: 3 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif' }}>
                Lezzet Durağı
              </Typography>
              <IconButton onClick={toggleDrawer(false)} sx={{ color: "primary.main" }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List sx={{ px: 2 }}>
              {navItems.map((item) => (
                <ListItem
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: isActive(item.path) ? "rgba(230, 198, 135, 0.1)" : "transparent",
                    borderLeft: isActive(item.path) ? "3px solid #E6C687" : "3px solid transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(230, 198, 135, 0.05)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.path) ? 600 : 500,
                      color: isActive(item.path) ? "primary.main" : "text.primary",
                    }}
                  />
                </ListItem>
              ))}
              <ListItem sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/menu"
                  fullWidth
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    py: 1.2,
                    boxShadow: "0 4px 14px rgba(230, 198, 135, 0.4)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(230, 198, 135, 0.6)",
                    },
                  }}
                >
                  QR Menü
                </Button>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  )
}

export default Navbar

