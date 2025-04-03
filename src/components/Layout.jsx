"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import Navbar from "./Navbar"
import Footer from "./Footer"
import MobileNav from "./MobileNav"
import PageTransition from "./PageTransition"
import ScrollToTop from "./ScrollToTop"

const Layout = () => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      <ScrollToTop />

      {/* Navbar */}
      {!isMobile ? <Navbar scrolled={scrolled} /> : <MobileNav scrolled={scrolled} />}

      {/* Main Content with Page Transitions */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <PageTransition location={location}>
          <Outlet />
        </PageTransition>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default Layout

