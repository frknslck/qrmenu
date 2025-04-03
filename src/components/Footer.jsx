import { Box, Container, Grid, Typography, Link, IconButton, Divider, TextField, InputAdornment } from "@mui/material"
import { Facebook, Instagram, Twitter, Phone, LocationOn, Email, Send, ArrowForward } from "@mui/icons-material"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box sx={{ bgcolor: "#F8F9FA", color: "text.primary", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontFamily: '"Playfair Display", serif',
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "40%",
                    height: "2px",
                    bottom: -5,
                    left: 0,
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Lezzet Durağı
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: "text.secondary", maxWidth: "90%" }}>
                Eşsiz lezzetleri ve özenle hazırlanan menüsüyle unutulmaz bir deneyim sunuyoruz. Geleneksel tatları
                modern dokunuşlarla buluşturuyoruz.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <IconButton
                  color="primary"
                  aria-label="Facebook"
                  sx={{
                    bgcolor: "rgba(42, 51, 66, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Instagram"
                  sx={{
                    bgcolor: "rgba(42, 51, 66, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="Twitter"
                  sx={{
                    bgcolor: "rgba(42, 51, 66, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontFamily: '"Playfair Display", serif' }}>
              Hızlı Erişim
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { title: "Ana Sayfa", path: "/" },
                { title: "Menü", path: "/menu" },
                { title: "Hakkımızda", path: "/hakkimizda" },
                { title: "İletişim", path: "/iletisim" },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  color="inherit"
                  underline="none"
                  sx={{
                    color: "text.secondary",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(5px)",
                      display: "inline-block",
                    },
                    display: "inline-block",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ArrowForward sx={{ fontSize: 14, mr: 1, opacity: 0.6 }} />
                    {item.title}
                  </Box>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontFamily: '"Playfair Display", serif' }}>
              Kategoriler
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { title: "Kahvaltı", path: "/kategori/kahvalti" },
                { title: "Ana Yemekler", path: "/kategori/ana-yemekler" },
                { title: "Tatlılar", path: "/kategori/tatlilar" },
                { title: "İçecekler", path: "/kategori/icecekler" },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  color="inherit"
                  underline="none"
                  sx={{
                    color: "text.secondary",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(5px)",
                      display: "inline-block",
                    },
                    display: "inline-block",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ArrowForward sx={{ fontSize: 14, mr: 1, opacity: 0.6 }} />
                    {item.title}
                  </Box>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontFamily: '"Playfair Display", serif' }}>
              İletişim
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <LocationOn sx={{ color: "primary.main" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Bağdat Caddesi No:123, Kadıköy, İstanbul
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Phone sx={{ color: "primary.main" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  +90 (212) 123 45 67
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Email sx={{ color: "primary.main" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  info@lezzetduragi.com
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Bültenimize Abone Olun
                </Typography>
                <TextField
                  placeholder="E-posta adresiniz"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          color="primary"
                          sx={{
                            bgcolor: "secondary.main",
                            color: "primary.main",
                            "&:hover": {
                              bgcolor: "secondary.dark",
                            },
                          }}
                        >
                          <Send fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(0,0,0,0.08)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            © {currentYear} Lezzet Durağı. Tüm hakları saklıdır.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              underline="none"
              sx={{ color: "text.secondary", fontSize: "0.875rem", "&:hover": { color: "primary.main" } }}
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              sx={{ color: "text.secondary", fontSize: "0.875rem", "&:hover": { color: "primary.main" } }}
            >
              Kullanım Koşulları
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

