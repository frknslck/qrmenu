"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Divider,
  IconButton,
  Rating,
  Avatar,
  Paper,
  Breadcrumbs,
  Tabs,
  Tab,
  Card,
  CardMedia,
} from "@mui/material"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  Favorite,
  FavoriteBorder,
  Share,
  NavigateNext,
  Add,
  Remove,
  Star,
  AccessTime,
} from "@mui/icons-material"

// Örnek ürün verileri
const sampleProducts = {
  "kahvalti-1": {
    id: "kahvalti-1",
    name: "Serpme Kahvaltı",
    description:
      "Zengin içerikli kahvaltı tabağı: peynir çeşitleri, zeytin, bal, tereyağı, reçel, domates, salatalık ve taze ekmek",
    longDescription:
      "Güne enerji dolu başlamanız için özenle hazırladığımız kahvaltı tabağımız, en taze ve kaliteli malzemelerle sunuluyor. İçerisinde çeşitli peynirler, siyah ve yeşil zeytin, organik bal, köy tereyağı, ev yapımı reçel çeşitleri, domates, salatalık, biber ve fırından yeni çıkmış taze ekmek bulunmaktadır. Tüm ürünlerimiz yerel üreticilerden temin edilmektedir.",
    price: 150,
    image: "https://placehold.co/400x300?text=Serpme+Kahvaltı",
    gallery: [
      "https://placehold.co/400x300?text=Kahvaltı+1",
      "https://placehold.co/400x300?text=Kahvaltı+2",
      "https://placehold.co/400x300?text=Kahvaltı+3",
    ],
    category: "kahvalti",
    categoryName: "Kahvaltı",
    rating: 4.8,
    reviews: 24,
    popular: true,
    ingredients: [
      "Beyaz Peynir",
      "Kaşar Peyniri",
      "Siyah Zeytin",
      "Yeşil Zeytin",
      "Bal",
      "Tereyağı",
      "Reçel",
      "Domates",
      "Salatalık",
      "Taze Ekmek",
    ],
    allergens: ["Süt", "Gluten"],
    nutritionalInfo: {
      calories: 450,
      protein: 15,
      carbs: 40,
      fat: 25,
    },
    prepTime: "15 dakika",
  },
  "ana-yemek-1": {
    id: "ana-yemek-1",
    name: "Izgara Köfte",
    description: "Özel baharatlarla hazırlanmış el yapımı köfte, yanında pilav ve ızgara sebzeler ile",
    longDescription:
      "Özel baharatlarla marine edilmiş, günlük olarak hazırlanan el yapımı köftelerimiz, odun ateşinde ızgara yapılarak servis edilmektedir. Yanında tereyağlı pirinç pilavı ve mevsim sebzelerinden oluşan ızgara sebze tabağı ile sunulmaktadır. Köftelerimiz %100 dana etinden hazırlanmaktadır.",
    price: 85,
    image: "https://placehold.co/400x300?text=Izgara+Köfte",
    gallery: [
      "https://placehold.co/400x300?text=Köfte+1",
      "https://placehold.co/400x300?text=Köfte+2",
      "https://placehold.co/400x300?text=Köfte+3",
    ],
    category: "ana-yemekler",
    categoryName: "Ana Yemekler",
    rating: 4.7,
    reviews: 36,
    popular: true,
    ingredients: [
      "Dana Kıyma",
      "Soğan",
      "Sarımsak",
      "Maydanoz",
      "Kırmızı Biber",
      "Kimyon",
      "Karabiber",
      "Pirinç",
      "Tereyağı",
      "Mevsim Sebzeleri",
    ],
    allergens: ["Et"],
    nutritionalInfo: {
      calories: 650,
      protein: 35,
      carbs: 45,
      fat: 30,
    },
    prepTime: "25 dakika",
  },
  "tatli-1": {
    id: "tatli-1",
    name: "Künefe",
    description: "Geleneksel tarifle hazırlanan, kadayıf ve peynir ile yapılan sıcak tatlı, üzerinde antep fıstığı ile",
    longDescription:
      "Hatay yöresinin meşhur tatlısı olan künefemiz, özel tel kadayıf ve tuzsuz Hatay peyniri kullanılarak geleneksel tarifle hazırlanmaktadır. Bakır tavalarda pişirilen künefemiz, üzerine antep fıstığı serpilerek ve şerbet dökülerek sıcak olarak servis edilmektedir.",
    price: 60,
    image: "https://placehold.co/400x300?text=Künefe",
    gallery: [
      "https://placehold.co/400x300?text=Künefe+1",
      "https://placehold.co/400x300?text=Künefe+2",
      "https://placehold.co/400x300?text=Künefe+3",
    ],
    category: "tatlilar",
    categoryName: "Tatlılar",
    rating: 4.9,
    reviews: 42,
    popular: true,
    ingredients: ["Tel Kadayıf", "Hatay Peyniri", "Tereyağı", "Şeker", "Su", "Limon", "Antep Fıstığı"],
    allergens: ["Süt", "Kuruyemiş"],
    nutritionalInfo: {
      calories: 450,
      protein: 10,
      carbs: 55,
      fat: 20,
    },
    prepTime: "20 dakika",
  },
}

// Benzer ürünler için örnek veri
const relatedProducts = [
  {
    id: "kahvalti-2",
    name: "Menemen",
    description: "Domates, biber ve yumurta ile hazırlanan geleneksel Türk kahvaltısı",
    price: 60,
    image: "https://placehold.co/400x300?text=Menemen",
    category: "kahvalti",
    rating: 4.5,
  },
  {
    id: "kahvalti-3",
    name: "Simit & Peynir Tabağı",
    description: "Taze simit, beyaz peynir, domates, salatalık ve zeytin",
    price: 70,
    image: "https://placehold.co/400x300?text=Simit+Peynir",
    category: "kahvalti",
    rating: 4.3,
  },
  {
    id: "kahvalti-4",
    name: "Omlet",
    description: "Sade veya peynirli omlet seçeneği, yanında taze ekmek ile",
    price: 50,
    image: "https://placehold.co/400x300?text=Omlet",
    category: "kahvalti",
    rating: 4.2,
  },
]

const ProductDetailPage = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [favorite, setFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    // Ürün verilerini al
    if (productId && sampleProducts[productId]) {
      setProduct(sampleProducts[productId])
    }
  }, [productId])

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleFavoriteClick = () => {
    setFavorite(!favorite)
  }

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4">Ürün bulunamadı</Typography>
        <Button component={Link} to="/menu" variant="contained" color="primary" sx={{ mt: 3 }}>
          Menüye Dön
        </Button>
      </Container>
    )
  }

  return (
    <Box>
      {/* Breadcrumbs */}
      <Box sx={{ backgroundColor: "background.default", py: 2 }}>
        <Container maxWidth="lg">
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Ana Sayfa
            </Link>
            <Link to="/menu" style={{ color: "inherit", textDecoration: "none" }}>
              Menü
            </Link>
            <Link to={`/menu?category=${product.category}`} style={{ color: "inherit", textDecoration: "none" }}>
              {product.categoryName}
            </Link>
            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Product Detail Section */}
      <Box sx={{ py: 6, backgroundColor: "background.paper" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Product Images */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    height: 400,
                  }}
                >
                  <Box
                    component="img"
                    src={product.gallery ? product.gallery[selectedImage] : product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {product.popular && (
                    <Chip
                      label="Popüler"
                      color="primary"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>

                {/* Thumbnail Gallery */}
                {product.gallery && (
                  <Box sx={{ display: "flex", mt: 2, gap: 1, overflowX: "auto", pb: 1 }}>
                    {product.gallery.map((image, index) => (
                      <Box
                        key={index}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(index)}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          overflow: "hidden",
                          cursor: "pointer",
                          border: selectedImage === index ? "2px solid" : "2px solid transparent",
                          borderColor: selectedImage === index ? "primary.main" : "transparent",
                        }}
                      >
                        <Box
                          component="img"
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </motion.div>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  {product.name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    icon={<Star fontSize="inherit" sx={{ color: "primary.main" }} />}
                  />
                  <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
                    ({product.reviews} değerlendirme)
                  </Typography>
                  <Chip
                    label={product.categoryName}
                    size="small"
                    sx={{ ml: 2, backgroundColor: "rgba(212, 175, 55, 0.1)", color: "primary.main" }}
                  />
                </Box>

                <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 700, mb: 3 }}>
                  {product.price} ₺
                </Typography>

                <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
                  {product.longDescription || product.description}
                </Typography>

                {/* Ingredients */}
                {product.ingredients && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      İçindekiler:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {product.ingredients.map((ingredient, index) => (
                        <Chip key={index} label={ingredient} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Allergens */}
                {product.allergens && product.allergens.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      Alerjenler:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {product.allergens.map((allergen, index) => (
                        <Chip key={index} label={allergen} size="small" color="error" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Add to Cart */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      mr: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      sx={{ color: "text.secondary" }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography sx={{ px: 2, minWidth: 40, textAlign: "center" }}>{quantity}</Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(1)} sx={{ color: "text.secondary" }}>
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ShoppingBag />}
                    sx={{ flexGrow: 1, py: 1.5 }}
                  >
                    Sepete Ekle
                  </Button>

                  <IconButton
                    onClick={handleFavoriteClick}
                    sx={{
                      ml: 2,
                      color: favorite ? "error.main" : "text.secondary",
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    {favorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>

                  <IconButton
                    sx={{
                      ml: 1,
                      color: "text.secondary",
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <Share />
                  </IconButton>
                </Box>

                {/* Preparation Time */}
                {product.prepTime && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTime sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      Hazırlama Süresi: <strong>{product.prepTime}</strong>
                    </Typography>
                  </Box>
                )}
              </motion.div>
            </Grid>
          </Grid>

          {/* Product Details Tabs */}
          <Box sx={{ mt: 8 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 4,
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
                },
              }}
            >
              <Tab label="Detaylar" />
              <Tab label="Besin Değerleri" />
              <Tab label="Yorumlar" />
            </Tabs>

            {/* Details Tab */}
            {activeTab === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {product.longDescription || product.description}
                </Typography>

                {product.ingredients && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      İçindekiler
                    </Typography>
                    <ul>
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          <Typography variant="body1">{ingredient}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}

                {product.allergens && product.allergens.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "error.main" }}>
                      Alerjen Uyarısı
                    </Typography>
                    <Typography variant="body1">Bu ürün aşağıdaki alerjenleri içermektedir:</Typography>
                    <ul>
                      {product.allergens.map((allergen, index) => (
                        <li key={index}>
                          <Typography variant="body1">{allergen}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </motion.div>
            )}

            {/* Nutritional Info Tab */}
            {activeTab === 1 && product.nutritionalInfo && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Besin Değerleri (1 porsiyon)
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        backgroundColor: "background.default",
                        borderRadius: 4,
                      }}
                    >
                      <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 700 }}>
                        {product.nutritionalInfo.calories}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kalori (kcal)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        backgroundColor: "background.default",
                        borderRadius: 4,
                      }}
                    >
                      <Typography variant="h4" sx={{ color: "secondary.main", fontWeight: 700 }}>
                        {product.nutritionalInfo.protein}g
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Protein
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        backgroundColor: "background.default",
                        borderRadius: 4,
                      }}
                    >
                      <Typography variant="h4" sx={{ color: "success.main", fontWeight: 700 }}>
                        {product.nutritionalInfo.carbs}g
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Karbonhidrat
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: "center",
                        backgroundColor: "background.default",
                        borderRadius: 4,
                      }}
                    >
                      <Typography variant="h4" sx={{ color: "info.main", fontWeight: 700 }}>
                        {product.nutritionalInfo.fat}g
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Yağ
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Müşteri Yorumları
                  </Typography>

                  {/* Sample Reviews */}
                  {[
                    {
                      name: "Ahmet Yılmaz",
                      rating: 5,
                      date: "10 Mart 2023",
                      comment: "Harika bir lezzet! Kesinlikle tavsiye ederim.",
                      avatar: "https://placehold.co/100x100?text=AY",
                    },
                    {
                      name: "Ayşe Kaya",
                      rating: 4,
                      date: "5 Nisan 2023",
                      comment: "Çok lezzetli ve doyurucu. Servis biraz geç geldi ama beklemeye değdi.",
                      avatar: "https://placehold.co/100x100?text=AK",
                    },
                    {
                      name: "Mehmet Demir",
                      rating: 5,
                      date: "20 Mayıs 2023",
                      comment: "Fiyat-performans açısından mükemmel. Tekrar geleceğim.",
                      avatar: "https://placehold.co/100x100?text=MD",
                    },
                  ].map((review, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 3,
                        mb: 3,
                        backgroundColor: "background.default",
                        borderRadius: 4,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Avatar src={review.avatar} alt={review.name} sx={{ mr: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {review.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {review.date}
                            </Typography>
                          </Box>
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            icon={<Star fontSize="inherit" sx={{ color: "primary.main" }} />}
                          />
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {review.comment}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}

                  <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Tüm Yorumları Gör
                  </Button>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Related Products */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
              Benzer Ürünler
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                  <Card
                    component={Link}
                    to={`/urun/${relatedProduct.id}`}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <CardMedia component="img" height="200" image={relatedProduct.image} alt={relatedProduct.name} />
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        {relatedProduct.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating
                          value={relatedProduct.rating}
                          precision={0.5}
                          size="small"
                          readOnly
                          icon={<Star fontSize="inherit" sx={{ color: "primary.main" }} />}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          ({relatedProduct.rating})
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {relatedProduct.description}
                      </Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        {relatedProduct.price} ₺
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default ProductDetailPage

