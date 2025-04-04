import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material"
import { Facebook, Instagram, Twitter, Phone, Email, LocationOn } from "@mui/icons-material"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ bgcolor: "secondary.main", color: "white", pt: 6, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, mb: 2 }}
            >
              Lezzet Durağı
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Geleneksel lezzetleri modern dokunuşlarla buluşturan, eşsiz bir gastronomi deneyimi sunan restoranımızda
              sizleri ağırlamaktan mutluluk duyarız.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ color: "white", "&:hover": { color: "primary.light" } }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: "white", "&:hover": { color: "primary.light" } }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: "white", "&:hover": { color: "primary.light" } }}>
                <Twitter />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Hızlı Erişim
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { title: "Ana Sayfa", path: "/" },
                { title: "Menü", path: "/menu" },
                { title: "Hakkımızda", path: "/hakkimizda" },
                { title: "İletişim", path: "/iletisim" },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  underline="none"
                  color="inherit"
                  sx={{
                    opacity: 0.8,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      color: "primary.light",
                      pl: 0.5,
                    },
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              İletişim
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Bağdat Caddesi No:123, Kadıköy, İstanbul
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +90 (212) 123 45 67
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@lezzetduragi.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Lezzet Durağı. Tüm hakları saklıdır.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" underline="none" color="inherit" sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}>
              Gizlilik Politikası
            </Link>
            <Link href="#" underline="none" color="inherit" sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}>
              Kullanım Koşulları
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

