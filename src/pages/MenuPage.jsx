"use client"

import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material"
import { motion } from "framer-motion"
import { Search, LocalDining, FilterList, Close, Restaurant, Cake, LocalCafe, LocalBar, Spa } from "@mui/icons-material"
import HeroSection from "../components/HeroSection"
import SectionTitle from "../components/SectionTitle"
import FoodCard from "../components/FoodCard"

// Kategori verileri
const categories = [
  {
    id: "kahvalti",
    name: "Kahvaltı",
    icon: <Restaurant />,
    image: "https://placehold.co/400x300?text=Kahvaltı",
  },
  {
    id: "ana-yemekler",
    name: "Ana Yemekler",
    icon: <LocalDining />,
    image: "https://placehold.co/400x300?text=Ana+Yemekler",
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    icon: <Cake />,
    image: "https://placehold.co/400x300?text=Tatlılar",
  },
  {
    id: "sicak-icecekler",
    name: "Sıcak İçecekler",
    icon: <LocalCafe />,
    image: "https://placehold.co/400x300?text=Sıcak+İçecekler",
  },
  {
    id: "soguk-icecekler",
    name: "Soğuk İçecekler",
    icon: <LocalBar />,
    image: "https://placehold.co/400x300?text=Soğuk+İçecekler",
  },
  {
    id: "salatalar",
    name: "Salatalar",
    icon: <Spa />,
    image: "https://placehold.co/400x300?text=Salatalar",
  },
]

// Örnek ürün verileri
const sampleProducts = {
  kahvalti: [
    {
      id: "kahvalti-1",
      name: "Serpme Kahvaltı",
      description:
        "Zengin içerikli kahvaltı tabağı: peynir çeşitleri, zeytin, bal, tereyağı, reçel, domates, salatalık ve taze ekmek",
      price: 150,
      image: "https://placehold.co/400x300?text=Serpme+Kahvaltı",
      popular: true,
      rating: 4.8,
    },
    {
      id: "kahvalti-2",
      name: "Menemen",
      description: "Domates, biber ve yumurta ile hazırlanan geleneksel Türk kahvaltısı",
      price: 60,
      image: "https://placehold.co/400x300?text=Menemen",
      popular: false,
      rating: 4.5,
    },
    {
      id: "kahvalti-3",
      name: "Simit & Peynir Tabağı",
      description: "Taze simit, beyaz peynir, domates, salatalık ve zeytin",
      price: 70,
      image: "https://placehold.co/400x300?text=Simit+Peynir",
      popular: false,
      rating: 4.3,
    },
    {
      id: "kahvalti-4",
      name: "Omlet",
      description: "Sade veya peynirli omlet seçeneği, yanında taze ekmek ile",
      price: 50,
      image: "https://placehold.co/400x300?text=Omlet",
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
      image: "https://placehold.co/400x300?text=Izgara+Köfte",
      popular: true,
      rating: 4.7,
    },
    {
      id: "ana-yemek-2",
      name: "Mantı",
      description: "El açması mantı, yoğurt ve özel sos ile",
      price: 75,
      image: "https://placehold.co/400x300?text=Mantı",
      popular: true,
      rating: 4.9,
    },
    {
      id: "ana-yemek-3",
      name: "Karnıyarık",
      description: "Kıymalı patlıcan yemeği, yanında pilav ile",
      price: 80,
      image: "https://placehold.co/400x300?text=Karnıyarık",
      popular: false,
      rating: 4.6,
    },
    {
      id: "ana-yemek-4",
      name: "Etli Güveç",
      description: "Fırında pişirilmiş sebzeli et güveç",
      price: 95,
      image: "https://placehold.co/400x300?text=Etli+Güveç",
      popular: false,
      rating: 4.5,
    },
  ],
  tatlilar: [
    {
      id: "tatli-1",
      name: "Künefe",
      description:
        "Geleneksel tarifle hazırlanan, kadayıf ve peynir ile yapılan sıcak tatlı, üzerinde antep fıstığı ile",
      price: 60,
      image: "https://placehold.co/400x300?text=Künefe",
      popular: true,
      rating: 4.9,
    },
    {
      id: "tatli-2",
      name: "Baklava",
      description: "İnce yufka katları arasında fıstık, ceviz veya fındık ile hazırlanan geleneksel Türk tatlısı",
      price: 70,
      image: "https://placehold.co/400x300?text=Baklava",
      popular: true,
      rating: 4.8,
    },
    {
      id: "tatli-3",
      name: "Sütlaç",
      description: "Fırında pişirilmiş geleneksel pirinç sütlacı",
      price: 45,
      image: "https://placehold.co/400x300?text=Sütlaç",
      popular: false,
      rating: 4.4,
    },
    {
      id: "tatli-4",
      name: "Kazandibi",
      description: "Karamelize edilmiş muhallebi tatlısı",
      price: 50,
      image: "https://placehold.co/400x300?text=Kazandibi",
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
      image: "https://placehold.co/400x300?text=Türk+Kahvesi",
      popular: true,
      rating: 4.6,
    },
    {
      id: "sicak-icecek-2",
      name: "Çay",
      description: "Demli Türk çayı",
      price: 15,
      image: "https://placehold.co/400x300?text=Çay",
      popular: false,
      rating: 4.3,
    },
    {
      id: "sicak-icecek-3",
      name: "Sahlep",
      description: "Tarçın ve süt ile hazırlanan geleneksel sıcak içecek",
      price: 30,
      image: "https://placehold.co/400x300?text=Sahlep",
      popular: false,
      rating: 4.5,
    },
    {
      id: "sicak-icecek-4",
      name: "Cappuccino",
      description: "İtalyan usulü cappuccino",
      price: 35,
      image: "https://placehold.co/400x300?text=Cappuccino",
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
      image: "https://placehold.co/400x300?text=Ayran",
      popular: true,
      rating: 4.2,
    },
    {
      id: "soguk-icecek-2",
      name: "Limonata",
      description: "Ev yapımı taze limonata",
      price: 25,
      image: "https://placehold.co/400x300?text=Limonata",
      popular: false,
      rating: 4.7,
    },
    {
      id: "soguk-icecek-3",
      name: "Meyve Suyu",
      description: "Portakal, elma, vişne veya karışık meyve suyu",
      price: 20,
      image: "https://placehold.co/400x300?text=Meyve+Suyu",
      popular: false,
      rating: 4.4,
    },
    {
      id: "soguk-icecek-4",
      name: "Soğuk Kahve",
      description: "Buzlu soğuk kahve",
      price: 30,
      image: "https://placehold.co/400x300?text=Soğuk+Kahve",
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
      image: "https://placehold.co/400x300?text=Çoban+Salatası",
      popular: true,
      rating: 4.3,
    },
    {
      id: "salata-2",
      name: "Sezar Salata",
      description: "Izgara tavuk, kruton, parmesan peyniri ve özel sos ile",
      price: 55,
      image: "https://placehold.co/400x300?text=Sezar+Salata",
      popular: false,
      rating: 4.6,
    },
    {
      id: "salata-3",
      name: "Mevsim Salatası",
      description: "Mevsim yeşillikleri ve sebzeleri ile hazırlanan salata",
      price: 45,
      image: "https://placehold.co/400x300?text=Mevsim+Salatası",
      popular: false,
      rating: 4.2,
    },
    {
      id: "salata-4",
      name: "Akdeniz Salatası",
      description: "Domates, salatalık, zeytin, peynir ve zeytinyağı ile",
      price: 50,
      image: "https://placehold.co/400x300?text=Akdeniz+Salatası",
      popular: false,
      rating: 4.5,
    },
  ],
}

const MenuPage = () => {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedTab, setSelectedTab] = useState(() => {
    if (categoryParam) {
      const index = categories.findIndex((cat) => cat.id === categoryParam)
      return index >= 0 ? index : 0
    }
    return 0
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("popular")

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

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
    if (!currentCategory || !sampleProducts[currentCategory]) return []

    return sampleProducts[currentCategory]
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
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
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="Menümüz"
        subtitle="Özenle hazırlanan lezzetli yemeklerimiz ve içeceklerimiz ile sizleri ağırlamaktan mutluluk duyuyoruz."
        image="https://placehold.co/1920x1080?text=Menümüz"
        height="50vh"
        showButtons={false}
      />

      {/* Search and Filter Section */}
      <Box sx={{ backgroundColor: "background.paper", py: 3, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
        <Container maxWidth="lg">
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}
          >
            <TextField
              placeholder="Menüde ara..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              sx={{
                maxWidth: "500px",
                width: { xs: "100%", sm: "auto", flexGrow: 1 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={toggleFilters}
              startIcon={showFilters ? <Close /> : <FilterList />}
            >
              {showFilters ? "Filtreleri Kapat" : "Filtrele"}
            </Button>
          </Box>

          {/* Filters */}
          <Fade in={showFilters}>
            <Box sx={{ mt: 3 }}>
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
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
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
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 200])}
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
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Menu Categories Tabs */}
      <Box
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 10,
          bgcolor: "background.default",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
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
      <Box sx={{ py: 6, backgroundColor: "background.paper" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
              {categories[selectedTab]?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts().length} ürün bulundu
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {filteredProducts().map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: "flex" }}>
                <Box sx={{ width: "100%" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
                  >
                    <FoodCard product={product} />
                  </motion.div>
                </Box>
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
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 6, backgroundColor: "background.default" }}>
        <Container maxWidth="lg">
          <SectionTitle title="Tüm Kategoriler" subtitle="Tüm menü kategorilerimizi keşfedin" />

          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={category.id}>
                <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                  <Paper
                    component={Link}
                    to={`/menu?category=${category.id}`}
                    elevation={2}
                    sx={{
                      p: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      textDecoration: "none",
                      color: "text.primary",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        "& .MuiSvgIcon-root": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: "background.default",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: "text.secondary", transition: "color 0.3s ease" }}>{category.icon}</Box>
                    </Box>
                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>
                  </Paper>
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

