"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  Rating,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton,
} from "@mui/material"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  AccessTime,
  LocalDining,
  Favorite,
  ArrowForward,
  Restaurant,
  Coffee,
  EmojiEvents,
  Star,
  KeyboardArrowDown,
} from "@mui/icons-material"
import { collection, getDocs, query, limit } from "firebase/firestore"
import { db } from "../../firebase"
import FoodCard from "../components/FoodCard"

const featuredCategories = [
  {
    id: "kahvalti",
    name: "Kahvaltı",
    icon: <Restaurant />,
    description: "Güne enerji dolu başlamak için zengin kahvaltı seçenekleri",
    image: "https://placehold.co/600x400/121212/FFD166?text=Kahvaltı",
  },
  {
    id: "ana-yemekler",
    name: "Ana Yemekler",
    icon: <LocalDining />,
    description: "Özenle hazırlanan lezzetli ana yemekler",
    image: "https://placehold.co/600x400/121212/FF4D4D?text=Ana+Yemekler",
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    icon: <Favorite />,
    description: "Damağınızda iz bırakacak enfes tatlılar",
    image: "https://placehold.co/600x400/121212/06D6A0?text=Tatlılar",
  },
  {
    id: "icecekler",
    name: "İçecekler",
    icon: <Coffee />,
    description: "Ferahlatıcı sıcak ve soğuk içecekler",
    image: "https://placehold.co/600x400/121212/118AB2?text=İçecekler",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    rating: 5,
    comment:
      "Harika bir deneyimdi! Yemekler çok lezzetli, servis hızlı ve personel çok ilgiliydi. Kesinlikle tekrar geleceğim.",
    image: "https://placehold.co/100x100/121212/FF4D4D?text=AY",
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    rating: 4.5,
    comment: "Kahvaltı menüsü çok zengin ve taze. Özellikle simit ve peynir tabağı favorim oldu. Kahveleri de harika!",
    image: "https://placehold.co/100x100/121212/FFD166?text=AK",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    rating: 5,
    comment: "Tatlıları bir harika! Özellikle künefe ve baklava çok başarılı. Ambiyans da çok güzel, rahat bir ortam.",
    image: "https://placehold.co/100x100/121212/06D6A0?text=MD",
  },
]

const HomePage = () => {
  const [popularItems, setPopularItems] = useState([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // Refs for scroll animations
  const featuredRef = useRef(null)
  const popularRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  // Check if sections are in view
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 })
  const popularInView = useInView(popularRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  // Scroll animations
  const { scrollY } = useScroll()
  const heroTextY = useTransform(scrollY, [0, 300], [0, 100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        // Firestore'dan popüler ürünleri çek
        const q = query(collection(db, "urunler"), limit(4))
        const querySnapshot = await getDocs(q)

        const items = []
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() })
        })

        // Eğer Firestore'da henüz veri yoksa örnek veriler kullan
        if (items.length === 0) {
          setPopularItems([
            {
              id: "item1",
              name: "Karışık Kahvaltı Tabağı",
              description:
                "Zengin içerikli kahvaltı tabağı: peynir çeşitleri, zeytin, bal, tereyağı, reçel, domates, salatalık ve taze ekmek",
              price: 120,
              image: "https://placehold.co/600x400/121212/FFD166?text=Kahvaltı+Tabağı",
              category: "kahvalti",
              rating: 4.8,
            },
            {
              id: "item2",
              name: "Izgara Köfte",
              description: "Özel baharatlarla hazırlanmış el yapımı köfte, yanında pilav ve ızgara sebzeler ile",
              price: 85,
              image: "https://placehold.co/600x400/121212/FF4D4D?text=Izgara+Köfte",
              category: "ana-yemekler",
              rating: 4.7,
            },
            {
              id: "item3",
              name: "Künefe",
              description:
                "Geleneksel tarifle hazırlanan, kadayıf ve peynir ile yapılan sıcak tatlı, üzerinde antep fıstığı ile",
              price: 60,
              image: "https://placehold.co/600x400/121212/06D6A0?text=Künefe",
              category: "tatlilar",
              rating: 4.9,
            },
            {
              id: "item4",
              name: "Türk Kahvesi",
              description: "Geleneksel yöntemle pişirilen Türk kahvesi, yanında lokum ile",
              price: 25,
              image: "https://placehold.co/600x400/121212/118AB2?text=Türk+Kahvesi",
              category: "icecekler",
              rating: 4.6,
            },
          ])
        } else {
          setPopularItems(items)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching popular items: ", error)
        setLoading(false)
      }
    }

    fetchPopularItems()
  }, [])

  return (
    <Box>
      {/* Hero Section - Parallax Effect */}
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {/* Background Video or Image */}
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
              background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src="https://placehold.co/1920x1080/121212/FF4D4D?text=Lezzet+Durağı"
            alt="Restaurant Interior"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.7)",
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
            <Box sx={{ textAlign: "center" }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    background: "linear-gradient(90deg, #FF4D4D, #FFD166)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Lezzet Durağı
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
                    lineHeight: 1.5,
                  }}
                >
                  Geleneksel lezzetleri modern dokunuşlarla buluşturan eşsiz bir gastronomi deneyimi
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mt: 2 }}>
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
                      boxShadow: "0 4px 14px rgba(255, 77, 77, 0.4)",
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
                        backgroundColor: "rgba(255, 77, 77, 0.1)",
                      },
                    }}
                  >
                    Rezervasyon Yap
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Container>

        {/* Scroll Down Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <IconButton onClick={scrollToContent} sx={{ color: "white", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              <KeyboardArrowDown />
            </IconButton>
          </motion.div>
          <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.7 }}>
            Kaydır
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box id="content-section">
        {/* Features Section */}
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            backgroundColor: "background.default",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255, 77, 77, 0.5), transparent)",
            },
          }}
        >
          <Container>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: <LocalDining />,
                  title: "Özenle Seçilmiş Malzemeler",
                  description: "Taze ve kaliteli malzemelerle hazırlanan lezzetli yemekler sunuyoruz.",
                },
                {
                  icon: <AccessTime />,
                  title: "Hızlı Servis",
                  description: "Siparişleriniz özenle ve hızlıca hazırlanıp servis edilir.",
                },
                {
                  icon: <EmojiEvents />,
                  title: "Özel Tarifler",
                  description: "Şeflerimizin özel tarifleriyle hazırlanan eşsiz lezzetler.",
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        textAlign: "center",
                        p: 4,
                        height: "100%",
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        backgroundColor: "background.paper",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          borderRadius: "50%",
                          backgroundColor: "primary.main",
                          color: "white",
                          mb: 3,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Categories Section */}
        <Box
          ref={featuredRef}
          sx={{
            py: { xs: 6, md: 10 },
            backgroundColor: "background.paper",
            position: "relative",
          }}
        >
          <Container>
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "80px",
                      height: "3px",
                      bottom: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #FF4D4D, #FFD166)",
                    },
                  }}
                >
                  Menü Kategorileri
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={featuredInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mt: 3 }}>
                  Zengin menümüzde yer alan kategorileri keşfedin ve damak zevkinize uygun lezzetleri bulun.
                </Typography>
              </motion.div>
            </Box>

            <Grid container spacing={3}>
              {featuredCategories.map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={featuredInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card
                      component={Link}
                      to={`/kategori/${category.id}`}
                      sx={{
                        height: 320,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        textDecoration: "none",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.8))",
                          zIndex: 1,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={category.image}
                        alt={category.name}
                        sx={{
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 3,
                          zIndex: 2,
                        }}
                      >
                        <Typography variant="h5" component="h3" sx={{ color: "white", fontWeight: 600, mb: 1 }}>
                          {category.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mb: 2, fontSize: "0.9rem" }}>
                          {category.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "primary.main",
                            fontWeight: 500,
                          }}
                        >
                          <Typography variant="button" sx={{ mr: 0.5 }}>
                            Keşfet
                          </Typography>
                          <ArrowForward fontSize="small" />
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Popular Items Section */}
        <Box
          ref={popularRef}
          sx={{
            py: { xs: 6, md: 10 },
            backgroundColor: "background.default",
            position: "relative",
          }}
        >
          <Container>
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={popularInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "80px",
                      height: "3px",
                      bottom: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #FF4D4D, #FFD166)",
                    },
                  }}
                >
                  Popüler Ürünlerimiz
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={popularInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mt: 3 }}>
                  Müşterilerimizin en çok tercih ettiği lezzetleri keşfedin.
                </Typography>
              </motion.div>
            </Box>

            <Grid container spacing={3}>
              {popularItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={popularInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <FoodCard product={item} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 5 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={popularInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/menu"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 20px rgba(255, 77, 77, 0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Tüm Menüyü Görüntüle
                </Button>
              </motion.div>
            </Box>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box
          ref={testimonialsRef}
          sx={{
            py: { xs: 6, md: 10 },
            backgroundColor: "background.paper",
            position: "relative",
          }}
        >
          <Container>
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "80px",
                      height: "3px",
                      bottom: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #FF4D4D, #FFD166)",
                    },
                  }}
                >
                  Müşteri Yorumları
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={testimonialsInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mt: 3 }}>
                  Müşterilerimizin deneyimleri ve değerlendirmeleri.
                </Typography>
              </motion.div>
            </Box>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: "100%",
                        borderRadius: 4,
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        backgroundColor: "background.default",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Avatar
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{
                            width: 60,
                            height: 60,
                            mr: 2,
                            border: "2px solid",
                            borderColor: "primary.main",
                          }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </Typography>
                          <Rating
                            value={testimonial.rating}
                            precision={0.5}
                            size="small"
                            readOnly
                            icon={<Star fontSize="inherit" sx={{ color: "secondary.main" }} />}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ mb: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: "italic",
                          color: "text.secondary",
                          position: "relative",
                          pl: 2,
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 3,
                            backgroundColor: "primary.main",
                            borderRadius: 3,
                          },
                        }}
                      >
                        "{testimonial.comment}"
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          ref={ctaRef}
          sx={{
            py: { xs: 8, md: 12 },
            position: "relative",
            overflow: "hidden",
            color: "white",
            textAlign: "center",
          }}
        >
          {/* Background Image */}
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
                background: "linear-gradient(to bottom, rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 0.9))",
                zIndex: 1,
              },
            }}
          >
            <Box
              component="img"
              src="https://placehold.co/1920x1080/121212/FF4D4D?text=Lezzet+Durağı"
              alt="Restaurant Ambiance"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.7)",
              }}
            />
          </Box>

          <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Lezzetli Bir Deneyim İçin Bize Katılın
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 5, fontWeight: 400, opacity: 0.9 }}>
                Özel anlarınızı bizimle paylaşın, unutulmaz bir deneyim yaşayın.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/iletisim"
                  sx={{
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    boxShadow: "0 4px 14px rgba(255, 77, 77, 0.4)",
                    "&:hover": {
                      boxShadow: "0 10px 20px rgba(255, 77, 77, 0.6)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Rezervasyon Yap
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/menu"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    borderWidth: 2,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "rgba(255, 77, 77, 0.1)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Menüyü Görüntüle
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage

