"use client"

import { Box, Container, Typography, Button, IconButton } from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const HeroSection = ({ title, subtitle, image, height = "80vh", showButtons = true, scrollToContentId }) => {
  const scrollToContent = () => {
    if (scrollToContentId) {
      const element = document.getElementById(scrollToContentId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <Box
      sx={{
        height: height,
        position: "relative",
        display: "flex",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
        mt: "-64px", // Navbar yüksekliği kadar negatif margin ekle
        pt: "64px", // Navbar yüksekliği kadar padding-top ekle
      }}
    >
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
            zIndex: 1,
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt="Hero Background"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            {title}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 4,
              fontWeight: 400,
              maxWidth: "800px",
              mx: "auto",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>

        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/menu"
                sx={{
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                Menüyü Görüntüle
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/iletisim"
                sx={{
                  borderColor: "white",
                  color: "white",
                  borderWidth: 2,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Rezervasyon Yap
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Scroll Down Indicator */}
        {scrollToContentId && (
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
            }}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <IconButton
                onClick={scrollToContent}
                sx={{ color: "white", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <KeyboardArrowDown />
              </IconButton>
            </motion.div>
            <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.7 }}>
              Kaydır
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default HeroSection

