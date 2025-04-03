import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Skeleton,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  Fade,
} from "@mui/material"
import { motion, useInView } from "framer-motion"
import {
  Search,
  ArrowBack,
  LocalDining,
  NavigateNext,
  FilterList,
  Close,
} from "@mui/icons-material"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import FoodCard from "../components/FoodCard"

// Kategori bilgileri
const categoryInfo = {
  kahvalti: {
    name: "Kahvaltı",
    description: "Güne enerji dolu başlamak için zengin kahvaltı seçenekleri",
    image: "https://placehold.co/1920x1080/121212/FFD166?text=Kahvaltı",
  },
  "ana-yemekler": {
    name: "Ana Yemekler",
    description: "Özenle hazırlanan lezzetli ana yemekler",
    image: "https://placehold.co/1920x1080/121212/FF4D4D?text=Ana+Yemekler",
  },
  tatlilar: {
    name: "Tatlılar",
    description: "Damağınızda iz bırakacak enfes tatlılar",
    image: "https://placehold.co/1920x1080/121212/06D6A0?text=Tatlılar",
  },
  "sicak-icecekler": {
    name: "Sıcak İçecekler",
    description: "Keyifli anlarınıza eşlik edecek sıcak içecekler",
    image: "https://placehold.co/1920x1080/121212/118AB2?text=Sıcak+İçecekler",
  },
  "soguk-icecekler": {
    name: "Soğuk İçecekler",
    description: "Ferahlatıcı soğuk içecekler",
    image: "https://placehold.co/1920x1080/121212/EF476F?text=Soğuk+İçecekler",
  },
  salatalar: {
    name: "Salatalar",
    description: "Taze ve sağlıklı salata çeşitleri",
    image: "https://placehold.co/1920x1080/121212/06D6A0?text=Salatalar",
  },
}

// Örnek ürün verileri (Firestore'da veri yoksa kullanılacak)
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
      description: "Geleneksel yöntemlerle hazırlanan Türk kahvesi",
      price: 30,
      image: "https://placehold.co/600x400/121212/118AB2?text=Türk+Kahvesi",
      popular: true,
      rating: 4.7,
    },
    {
      id: "sicak-icecek-2",
      name: "Çay",
      description: "Demlenmiş taze çay",
      price: 15,
      image: "https://placehold.co/600x400/121212/118AB2?text=Çay",
      popular: true,
      rating: 4.5,
    },
    {
      id: "sicak-icecek-3",
      name: "Sahlep",
      description: "Sıcak süt ve sahlep tozu ile hazırlanan içecek, üzerine tarçın serpilerek servis edilir",
      price: 40,
      image: "https://placehold.co/600x400/121212/118AB2?text=Sahlep",
      popular: false,
      rating: 4.6,
    },
    {
      id: "sicak-icecek-4",
      name: "Sıcak Çikolata",
      description: "Sıcak süt ve çikolata ile hazırlanan içecek, isteğe göre krema ile servis edilir",
      price: 45,
      image: "https://placehold.co/600x400/121212/118AB2?text=Sıcak+Çikolata",
      popular: false,
      rating: 4.4,
    },
  ],
  "soguk-icecekler": [
    {
      id: "soguk-icecek-1",
      name: "Limonata",
      description: "Ev yapımı taze limonata",
      price: 35,
      image: "https://placehold.co/600x400/121212/EF476F?text=Limonata",
      popular: true,
      rating: 4.6,
    },
    {
      id: "soguk-icecek-2",
      name: "Ayran",
      description: "Yoğurt ve su ile hazırlanan geleneksel Türk içeceği",
      price: 25,
      image: "https://placehold.co/600x400/121212/EF476F?text=Ayran",
      popular: true,
      rating: 4.5,
    },
    {
      id: "soguk-icecek-3",
      name: "Soğuk Kahve",
      description: "Buzlu kahve",
      price: 40,
      image: "https://placehold.co/600x400/121212/EF476F?text=Soğuk+Kahve",
      popular: false,
      rating: 4.4,
    },
    {
      id: "soguk-icecek-4",
      name: "Meyve Suyu",
      description: "Karışık mevsim meyveleri ile hazırlanan taze meyve suyu",
      price: 45,
      image: "https://placehold.co/600x400/121212/EF476F?text=Meyve+Suyu",
      popular: false,
      rating: 4.3,
    },
  ],
  salatalar: [
    {
      id: "salata-1",
      name: "Çoban Salata",
      description: "Domates, salatalık, biber, soğan ve maydanoz ile hazırlanan geleneksel Türk salatası",
      price: 50,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Çoban+Salata",
      popular: true,
      rating: 4.7,
    },
    {
      id: "salata-2",
      name: "Gavurdağı Salata",
      description: "Ceviz, nar ekşisi ve özel baharatlarla zenginleştirilmiş domates, salatalık, biber ve soğan salatası",
      price: 55,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Gavurdağı+Salata",
      popular: true,
      rating: 4.8,
    },
    {
      id: "salata-3",
      name: "Akdeniz Salata",
      description: "Yeşillikler, domates, salatalık, zeytin ve beyaz peynir ile hazırlanan Akdeniz salatası",
      price: 60,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Akdeniz+Salata",
      popular: false,
      rating: 4.5,
    },
    {
      id: "salata-4",
      name: "Sezar Salata",
      description: "Marul, kruton, parmesan peyniri ve Sezar sosu ile hazırlanan Sezar salatası",
      price: 65,
      image: "https://placehold.co/600x400/121212/06D6A0?text=Sezar+Salata",
      popular: false,
      rating: 4.6,
    },
  ],
}

const CategoryPage = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const categoryRef = useRef(null)
  const inView = useInView(categoryRef)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    document.title = `${
      categoryInfo[category]?.name || "Kategori"
    } - QR Menü`
  }, [category])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const productsCollection = collection(db, "products")
        const q = query(
          productsCollection,
          where("category", "==", category)
        )
        const querySnapshot = await getDocs(q)
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        // Firestore'dan veri çekme başarısız olursa örnek ürünleri kullan
        setProducts(sampleProducts[category] || [])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  useEffect(() => {
    // Arama terimi değiştiğinde veya ürünler yüklendiğinde filtrelenmiş ürünleri güncelle
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const breadcrumbs = [
    <Link key="1" to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Typography variant="body2">
        <ArrowBack fontSize="small" sx={{ mr: 0.5 }} />
        Anasayfa
      </Typography>
    </Link>,
    <Typography key="2" variant="body2" color="text.primary">
      <LocalDining fontSize="small" sx={{ mr: 0.5 }} />
      {categoryInfo[category]?.name || "Kategori"}
    </Typography>,
  ]

  const handleFilterOpen = () => {
    setIsFilterOpen(true)
  }

  const handleFilterClose = () => {
    setIsFilterOpen(false)
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Paper
        component={motion.div}
        ref={categoryRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "grey.50",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {categoryInfo[category]?.name || "Kategori"}
        </Typography>
        <Typography variant="body1">
          {categoryInfo[category]?.description ||
            "Bu kategoriye ait ürünler yakında eklenecektir."}
        </Typography>
        <Box mt={2}>
          <img
            src={categoryInfo[category]?.image || "/placeholder.svg"}
            alt={categoryInfo[category]?.name || "Kategori"}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ürün Ara..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: isMobile ? "100%" : "400px" }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterOpen}
        >
          Filtreler
        </Button>
      </Box>

      <Fade in={loading} style={{ transitionDelay: loading ? "800ms" : "0ms" }}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={250}
                  sx={{ borderRadius: 2 }}
                />
              ))
            : filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <FoodCard key={product.id} product={product} />
              ))
            : products.length > 0 ? (
              products.map((product) => (
                <FoodCard key={product.id} product={product} />
              ))
            ) : (
              <Typography variant="subtitle1">
                Bu kategoride henüz ürün bulunmamaktadır.
              </Typography>
            )}
        </Box>
      </Fade>

      {/* Filtreleme Paneli (Drawer veya Modal olarak uygulanabilir) */}
      {/* <Drawer anchor="right" open={isFilterOpen} onClose={handleFilterClose}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filtreler</Typography>
            <IconButton onClick={handleFilterClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" gutterBottom>Popülerlik</Typography>
          <FormControlLabel control={<Checkbox />} label="En Popüler" />
          <FormControlLabel control={<Checkbox />} label="En Yeniler" />
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" gutterBottom>Fiyat Aralığı</Typography>
          <Slider
            value={[20, 80]}
            onChange={(e, newValue) => console.log(newValue)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
          <Button variant="contained" fullWidth sx={{ mt: 3 }}>Uygula</Button>
        </Box>
      </Drawer> */}
    </Container>
  )
}

export default CategoryPage
