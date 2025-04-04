"use client"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)

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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar scrolled={scrolled} />
      <Box component="main" sx={{ flexGrow: 1, pt: "64px" }}>
        {" "}
        {/* Navbar yüksekliği kadar padding-top ekle */}
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

