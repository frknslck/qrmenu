"use client"

import { useState } from "react"
import { Container, Typography, Box, Grid, Paper, TextField, Button, Snackbar, Alert, Divider } from "@mui/material"
import { Phone, Email, LocationOn, AccessTime, Send } from "@mui/icons-material"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "İsim alanı zorunludur"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta alanı zorunludur"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon alanı zorunludur"
    }

    if (!formData.date) {
      newErrors.date = "Tarih seçimi zorunludur"
    }

    if (!formData.time) {
      newErrors.time = "Saat seçimi zorunludur"
    }

    if (!formData.guests) {
      newErrors.guests = "Kişi sayısı zorunludur"
    } else if (Number.parseInt(formData.guests) < 1) {
      newErrors.guests = "Kişi sayısı en az 1 olmalıdır"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Form verilerini gönder (burada Firebase'e gönderebilirsiniz)
      console.log("Form verileri:", formData)

      // Başarılı mesajı göster
      setSnackbar({
        open: true,
        message: "Rezervasyon talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
        severity: "success",
      })

      // Formu temizle
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        message: "",
      })
    } else {
      // Hata mesajı göster
      setSnackbar({
        open: true,
        message: "Lütfen formdaki hataları düzeltin.",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }))
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            İletişim
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}>
            Rezervasyon yapmak veya sorularınız için bizimle iletişime geçin
          </Typography>
        </Container>
      </Box>

      {/* Contact Info & Form */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
                İletişim Bilgilerimiz
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <LocationOn color="primary" sx={{ fontSize: 28, mr: 2 }} />
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Adres
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ pl: 5 }}>
                  Bağdat Caddesi No:123, Kadıköy, İstanbul
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Phone color="primary" sx={{ fontSize: 28, mr: 2 }} />
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Telefon
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ pl: 5 }}>
                  +90 (212) 123 45 67
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Email color="primary" sx={{ fontSize: 28, mr: 2 }} />
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    E-posta
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ pl: 5 }}>
                  info@lezzetduragi.com
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <AccessTime color="primary" sx={{ fontSize: 28, mr: 2 }} />
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Çalışma Saatleri
                  </Typography>
                </Box>
                <Box sx={{ pl: 5 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Pazartesi - Pazar:</strong> 08:00 - 23:00
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Kahvaltı:</strong> 08:00 - 11:00
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Öğle Yemeği:</strong> 12:00 - 15:00
                  </Typography>
                  <Typography variant="body1">
                    <strong>Akşam Yemeği:</strong> 18:00 - 23:00
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Bizi Takip Edin
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" color="primary" href="#" target="_blank">
                  Facebook
                </Button>
                <Button variant="outlined" color="primary" href="#" target="_blank">
                  Instagram
                </Button>
                <Button variant="outlined" color="primary" href="#" target="_blank">
                  Twitter
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
                  Rezervasyon Formu
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Adınız Soyadınız"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="E-posta Adresiniz"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Telefon Numaranız"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Kişi Sayısı"
                        name="guests"
                        type="number"
                        value={formData.guests}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ min: 1 }}
                        error={!!errors.guests}
                        helperText={errors.guests}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Tarih"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date}
                        helperText={errors.date}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Saat"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.time}
                        helperText={errors.time}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Mesajınız (İsteğe bağlı)"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        startIcon={<Send />}
                        sx={{ py: 1.5 }}
                      >
                        Rezervasyon Yap
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Map */}
      <Box sx={{ height: "500px", width: "100%" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24087.477386898!2d29.05476395!3d40.9703825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a2a2c3b963%3A0x7671d1b9817b8519!2zQmHEn2RhdCBDZC4sIEthZMSxa8O2eS_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1650000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lezzet Durağı Konum"
        ></iframe>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ContactPage

