import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Skeleton,
  IconButton,
  Fade,
} from "@mui/material"
import { motion, useInView } from "framer-motion"
import {
  Search,
  LocalDining,
  ArrowForward,
  FilterList,
  Close,
  Restaurant,
  Cake,
  LocalCafe,
  LocalBar,
  Spa,
} from "@mui/icons-material"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import FoodCard from "../components/FoodCard"

// Kategori verileri
const categories = [
  {
    id: "kahvalti",
    name: "Kahvaltı",
    icon: <Restaurant />,
    image: "https://placehold.co/600x400/121212/FFD166?text=Kahvaltı",
  },
  {
    id: "ana-yemekler",
    name: "Ana Yemekler",
    icon: <LocalDining />,
    image: "https://placehold.co/600x400/121212/FF4D4D?text=Ana+Yemekler",
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    icon: <Cake />,
    image: "https://placehold.co/600x400/121212/06D6A0?text=Tatlılar",
  },
  {
    id: "sicak-icecekler",
    name: "Sıcak İçecekler",
    icon: <LocalCafe />,
    image: "https://placehold.co/600x400/121212/118AB2?text=Sıcak+İçecekler",
  },
  {
    id: "soguk-icecekler",
    name: "Soğuk İçecekler",
    icon: <LocalBar />,
    image: "https://placehold.co/600x400/121212/EF476F?text=Soğuk+İçecekler",
  },
  {
    id: "salatalar",
    name: "Salatalar",
    icon: <Spa />,
    image: "https://placehold.co/600x400/121212/06D6A0?text=Salatalar",
  },
]

// Örnek ürün verileri
const sampleProducts = {
  kahvalti: [
    {
      id: "kahvalti-1",
      name: "Serpme Kahvaltı",
      description: "Zengin içerikli kahvaltı tabağı: peynir çeşitleri, zeytin, bal, tereyağı, reçel, domates, salatalık ve taze ekmek",
      price: 150,
      image: "https://placehold.co/600x400/121212/FFD166?text=Serpme+Kahvaltı",
      popular: true,
      rating: 4.8,
    },
    {
      id: "kahvalti-2",
      name: "Menemen",
      description: "Domates, biber ve yumurta ile hazırlanan geleneksel Türk kahvaltısı",
      price: 60,
      image: "https://placehold.co/600x400/121212/FFD166?text=Menemen",
      popular: false,
      rating: 4.5,
    },
    {
      id: "kahvalti-3",
      name: "Simit & Peynir Tabağı",
      description: "Taze simit, beyaz peynir, domates, salatalık ve zeytin",
      price: 70,
      image: "https://placehold.co/600x400/121212/FFD166?text=Simit+Peynir",
      popular: false,
      rating: 4.3,
    },
    {
      id: "kahvalti-4",
      name: "Omlet",
      description: "Sade veya peynirli omlet seçeneği, yanında taze ekmek ile",
      price: 50,
      image: "https://placehold.co/600x400/121212/FFD166?text=Omlet",
      popular: false,
      rating: 4.2,
    },
  ],
  "ana-yemekler": [
    {
      id: "ana-yemek-1",
      name: "Izgara Köfte",
      description: "Özel baharatlarla hazırlanmış el yapımı köfte, yanında pilav ve ızgara sebzeler ile",
      price: 85,
      image: "https://placehold.co/600x400/121212/FF4D4D?text=Izgara+Köfte",
      popular: true,
      rating: 4.7,
    },
    {
      id: "ana-yemek-2",
      name: "Mantı",
      description: "El açması mantı, yoğurt ve özel sos ile",
      price: 75,
      image: "https://placehold.co/600x400/121212/FF4D4D?text=Mantı",
      popular: true,
      rating: 4.9,
    },
    {
      id: "ana-yemek-3",
      name: "Karnıyarık",
      description: "Kıymalı patlıcan yemeği, yanında pilav ile",
      price: 80,
      image: "https://placehold.co/600x400/121212/FF4D4D?text=Karnıyarık",
      popular: false,
      rating: 4.6,
    },
    {
      id: "ana-yemek-4",
      name: "Etli Güveç",
      description: "Fırında pişirilmiş sebzeli et güveç",
      price: 95,
      image: "https://placehold.co/600x400/121212/FF4D4D?text=Etli+Güveç",
      popular: false,
      rating: 4.5,
    },
  ],
  tatlilar: [
    {
      id: "tatli-1",
      name: "Künefe",
      description: "Geleneksel tarifle hazırlanan, kadayıf ve peynir ile yapılan sıcak tatlı, üzerinde antep fıstığı ile",
      price: 60,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Künefe",
      popular: true,
      rating: 4.9,
    },
    {
      id: "tatli-2",
      name: "Baklava",
      description: "İnce yufka katları arasında fıstık, ceviz veya fındık ile hazırlanan geleneksel Türk tatlısı",
      price: 70,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Baklava",
      popular: true,
      rating: 4.8,
    },
    {
      id: "tatli-3",
      name: "Sütlaç",
      description: "Fırında pişirilmiş geleneksel pirinç sütlacı",
      price: 45,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Sütlaç",
      popular: false,
      rating: 4.4,
    },
    {
      id: "tatli-4",
      name: "Kazandibi",
      description: "Karamelize edilmiş muhallebi tatlısı",
      price: 50,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Kazandibi",
      popular: false,
      rating: 4.6,
    },
  ],
  "sicak-icecekler": [
    {
      id: "sicak-icecek-1",
      name: "Türk Kahvesi",
      description: "Geleneksel yöntemle pişirilen Türk kahvesi, yanında lokum ile",
      price: 25,
      image: "https://placehold.co/600x400/121212/118AB2?text=Türk+Kahvesi",
      popular: true,
      rating: 4.6,
    },
    {
      id: "sicak-icecek-2",
      name: "Çay",
      description: "Demli Türk çayı",
      price: 15,
      image: "https://placehold.co/600x400/121212/118AB2?text=Çay",
      popular: false,
      rating: 4.3,
    },
    {
      id: "sicak-icecek-3",
      name: "Sahlep",
      description: "Tarçın ve süt ile hazırlanan geleneksel sıcak içecek",
      price: 30,
      image: "https://placehold.co/600x400/121212/118AB2?text=Sahlep",
      popular: false,
      rating: 4.5,
    },
    {
      id: "sicak-icecek-4",
      name: "Cappuccino",
      description: "İtalyan usulü cappuccino",
      price: 35,
      image: "https://placehold.co/600x400/121212/118AB2?text=Cappuccino",
      popular: false,
      rating: 4.4,
    },
  ],
  "soguk-icecekler": [
    {
      id: "soguk-icecek-1",
      name: "Ayran",
      description: "Ev yapımı taze ayran",
      price: 15,
      image: "https://placehold.co/600x400/121212/EF476F?text=Ayran",
      popular: true,
      rating: 4.2,
    },
    {
      id: "soguk-icecek-2",
      name: "Limonata",
      description: "Ev yapımı taze limonata",
      price: 25,
      image: "https://placehold.co/600x400/121212/EF476F?text=Limonata",
      popular: false,
      rating: 4.7,
    },
    {
      id: "soguk-icecek-3",
      name: "Meyve Suyu",
      description: "Portakal, elma, vişne veya karışık meyve suyu",
      price: 20,
      image: "https://placehold.co/600x400/121212/EF476F?text=Meyve+Suyu",
      popular: false,
      rating: 4.4,
    },
    {
      id: "soguk-icecek-4",
      name: "Soğuk Kahve",
      description: "Buzlu soğuk kahve",
      price: 30,
      image: "https://placehold.co/600x400/121212/EF476F?text=Soğuk+Kahve",
      popular: false,
      rating: 4.5,
    },
  ],
  salatalar: [
    {
      id: "salata-1",
      name: "Çoban Salatası",
      description: "Domates, salatalık, biber, soğan ve maydanoz ile hazırlanan geleneksel Türk salatası",
      price: 40,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Çoban+Salatası",
      popular: true,
      rating: 4.3,
    },
    {
      id: "salata-2",
      name: "Sezar Salata",
      description: "Izgara tavuk, kruton, parmesan peyniri ve özel sos ile",
      price: 55,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Sezar+Salata",
      popular: false,
      rating: 4.6,
    },
    {
      id: "salata-3",
      name: "Mevsim Salatası",
      description: "Mevsim yeşillikleri ve sebzeleri ile hazırlanan salata",
      price: 45,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Mevsim+Salatası",
      popular: false,
      rating: 4.2,
    },
    {
      id: "salata-4",
      name: "Akdeniz Salatası",
      description: "Domates, salatalık, zeytin, peynir ve zeytinyağı ile",
      price: 50,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Akdeniz+Salatası",
      popular: false,
      rating: 4.5,
    },
  ],
}

const MenuPage = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("popular")
  
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  
  // Refs for animations
  const headerRef = useRef(null)
  const productsRef = useRef(null)
  
  // Check if sections are in view
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 })
  const productsInView = useInView(productsRef, { once: true, amount: 0.1 })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Firestore'dan ürünleri çekmeye çalış
        const querySnapshot = await getDocs(collection(db, "urunler"))

        const fetchedProducts = {}
        querySnapshot.forEach((doc) => {
          const product = doc.data()
          if (!fetchedProducts[product.category]) {
            fetchedProducts[product.category] = []
          }
          fetchedProducts[product.category].push({ id: doc.id, ...product })
        })

        // Eğer Firestore'da henüz veri yoksa örnek verileri kullan
        if (Object.keys(fetchedProducts).length === 0) {
          setProducts(sampleProducts)
        } else {
          setProducts(fetchedProducts)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching products: ", error)
        setProducts(sampleProducts) // Hata durumunda örnek verileri kullan
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const filteredProducts = () => {
    const currentCategory = categories[selectedTab]?.id
    if (!currentCategory || !products[currentCategory]) return []

    return products[currentCategory]
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
      .sort((a, b) => {
        if (sortBy === "popular") return b.popular - a.popular
        if (sortBy === "priceAsc") return a.price - b.price
        if (sortBy === "priceDesc") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0
      })
  }

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Hero Section */}
      <Box
        ref={headerRef}
        sx={{
          position: "relative",
          height: { xs: 300, md: 400 },
          overflow: "hidden",
          color: "white",
          display: "flex",
          alignItems: "center",
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
              background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8))",
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src="https://placehold.co/1920x1080/121212/FF4D4D?text=Menümüz"
            alt="Menu Background"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: "center",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              Menümüz
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h6"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                mb: 4,
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              Özenle hazırlanan lezzetli yemeklerimiz ve içeceklerimiz ile sizleri ağırlamaktan mutluluk duyuyoruz.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
              <TextField
                placeholder="Menüde ara..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                size="small"
                sx={{
                  maxWidth: "500px",
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={toggleFilters}
                startIcon={showFilters ? <Close /> : <FilterList />}
                sx={{ height: 40 }}
              >
                {showFilters ? "Filtreleri Kapat" : "Filtrele"}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Filters Section */}
      <Fade in={showFilters}>
        <Box
          sx={{
            py: 3,
            backgroundColor: "background.paper",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Fiyat Aralığı
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Min"
                    type="number"
                    size="small"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">₺</InputAdornment>,
                    }}
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    label="Max"
                    type="number"
                    size="small"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200])}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">₺</InputAdornment>,
                    }}
                    sx={{ width: "50%" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Sırala
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Chip
                    label="Popüler"
                    clickable
                    color={sortBy === "popular" ? "primary" : "default"}
                    onClick={() => setSortBy("popular")}
                  />
                  <Chip
                    label="Fiyat (Artan)"
                    clickable
                    color={sortBy === "priceAsc" ? "primary" : "default"}
                    onClick={() => setSortBy("priceAsc")}
                  />
                  <Chip
                    label="Fiyat (Azalan)"
                    clickable
                    color={sortBy === "priceDesc" ? "primary" : "default"}
                    onClick={() => setSortBy("priceDesc")}
                  />
                  <Chip
                    label="Puan"
                    clickable
                    color={sortBy === "rating" ? "primary" : "default"}
                    onClick={() => setSortBy("rating")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "flex-end" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSearchTerm("")
                    setPriceRange([0, 200])
                    setSortBy("popular")
                  }}
                  sx={{ mr: 2 }}
                >
                  Filtreleri Temizle
                </Button>
                <Button variant="contained" color="primary" onClick={toggleFilters}>
                  Uygula
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* Menu Categories Tabs */}
      <Box
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 10,
          bgcolor: "background.paper",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Container>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="menu categories"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
                py: 2,
                minHeight: "auto",
                fontSize: "0.9rem",
                color: "text.secondary",
              },
              "& .Mui-selected": {
                color: "primary.main",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {category.icon}
                    <span>{category.name}</span>
                  </Box>
                }
                id={`tab-${index}`}
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* Menu Items */}
      <Box ref={productsRef} sx={{ py: 6 }}>
        <Container>
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                  <Paper sx={{ p: 2, borderRadius: 4, height: 350 }}>
                    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
                    <Skeleton variant="text" height={30} width="70%" />
                    <Skeleton variant="text" height={20} width="40%" />
                    <Skeleton variant="text" height={60} />
                    <Skeleton variant="rectangular" height={40} width="60%" sx={{ mt: 2, borderRadius: 2 }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                  {categories[selectedTab]?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {filteredProducts().length} ürün bulundu
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {filteredProducts().map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={productsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
                    >
                      <FoodCard product={product} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {filteredProducts().length === 0 && (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <LocalDining sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                  <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                    {searchTerm ? "Aramanıza uygun ürün bulunamadı." : "Bu kategoride henüz ürün bulunmamaktadır."}
                  </Typography>
                  {searchTerm && (
                    <Button variant="outlined" color="primary" onClick={() => setSearchTerm("")}>
                      Aramayı Temizle
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 6, backgroundColor: "background.paper" }}>
        <Container>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "60px",
                  height: "3px",
                  bottom: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #FF4D4D, #FFD166)",
                },
              }}
            >
              Tüm Kategoriler
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mt: 3 }}>
              Tüm menü kategorilerimizi keşfedin
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={category.id}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card
                    component={Link}
                    to={`/kategori/${category.id}`}
                    sx={{
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 4,
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
                        p: 2,
                        zIndex: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" component="h3" sx={{ color: "white", fontWeight: 600, mb: 0.5 }}>
                        {category.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                          fontWeight: 500,
                          fontSize: "0.8rem",
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
    </Box>
  )
}

export default MenuPage
