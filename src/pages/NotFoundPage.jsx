"use client"

import { Box, Container, Typography, Button } from "@mui/material"
import { Home, ArrowBack } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: { xs: "6rem", md: "10rem" }, fontWeight: 700, color: "primary.main", mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Sayfa Bulunamadı
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, maxWidth: "600px", mx: "auto" }}>
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönebilir veya geri gidebilirsiniz.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="contained" color="primary" size="large" component={Link} to="/" startIcon={<Home />}>
            Ana Sayfaya Dön
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
          >
            Geri Git
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default NotFoundPage

