"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Badge,
  Divider,
  ListItemIcon,
  Container,
} from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  Restaurant,
  Info,
  ContactMail,
  ShoppingBag,
  Instagram,
  Facebook,
  Twitter,
} from "@mui/icons-material"

const navItems = [
  { title: "Ana Sayfa", path: "/", icon: <Home /> },
  { title: "Menü", path: "/menu", icon: <Restaurant /> },
  { title: "Hakkımızda", path: "/hakkimizda", icon: <Info /> },
  { title: "İletişim", path: "/iletisim", icon: <ContactMail /> },
]

const MobileNav = ({ scrolled }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const [cartCount] = useState(0)

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
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: scrolled ? "rgba(30, 30, 30, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        }}
        elevation={0}
      >
        <Container>
          <Toolbar sx={{ justifyContent: "space-between", padding: "12px 0" }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Avatar
                    src="https://placehold.co/100x100/FF4D4D/FFFFFF?text=LD"
                    alt="Lezzet Durağı"
                    sx={{ width: 40, height: 40, border: "2px solid", borderColor: "primary.main" }}
                  />
                </motion.div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    fontFamily: '"Playfair Display", serif',
                    background: "linear-gradient(90deg, #FF4D4D, #FFD166)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Lezzet Durağı
                </Typography>
              </Box>
            </Link>

            {/* Mobile Menu and Cart Buttons */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                sx={{ mr: 1 }}
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingBag />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "background.paper",
            backgroundImage: "linear-gradient(rgba(255, 77, 77, 0.05), rgba(0, 0, 0, 0))",
          },
        }}
      >
        <AnimatePresence>
          {drawerOpen && (
            <Box
              sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src="https://placehold.co/100x100/FF4D4D/FFFFFF?text=LD"
                    alt="Lezzet Durağı"
                    sx={{ width: 40, height: 40, border: "2px solid", borderColor: "primary.main" }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif' }}>
                    Lezzet Durağı
                  </Typography>
                </Box>
                <IconButton
                  onClick={toggleDrawer(false)}
                  component={motion.button}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <List sx={{ flexGrow: 1 }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ListItem
                      component={Link}
                      to={item.path}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        backgroundColor: isActive(item.path) ? "rgba(255, 77, 77, 0.1)" : "transparent",
                        color: isActive(item.path) ? "primary.main" : "text.primary",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 77, 77, 0.05)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive(item.path) ? "primary.main" : "text.secondary",
                          minWidth: 40,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: isActive(item.path) ? 600 : 500,
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>

              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                  Bizi Takip Edin
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{ color: "#E1306C" }}
                    component={motion.button}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#4267B2" }}
                    component={motion.button}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#1DA1F2" }}
                    component={motion.button}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  © {new Date().getFullYear()} Lezzet Durağı
                </Typography>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Drawer>
    </>
  )
}

export default MobileNav