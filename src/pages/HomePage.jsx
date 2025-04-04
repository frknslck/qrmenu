"use client"
import { Link } from "react-router-dom"
import { Container, Typography, Box, Button, Grid, Paper, Rating, Avatar, Divider } from "@mui/material"
import { motion } from "framer-motion"
import { ArrowForward, LocalDining, AccessTime, EmojiEvents, Star } from "@mui/icons-material"
import HeroSection from "../components/HeroSection"
import SectionTitle from "../components/SectionTitle"
import CategoryCard from "../components/CategoryCard"
import FoodCard from "../components/FoodCard"

// Örnek veriler
const featuredCategories = [
  {
    id: "kahvalti",
    name: "Kahvaltı",
    description: "Güne enerji dolu başlamak için zengin kahvaltı seçenekleri",
    image: "https://placehold.co/400x300?text=Kahvaltı",
  },
  {
    id: "ana-yemekler",
    name: "Ana Yemekler",
    description: "Özenle hazırlanan lezzetli ana yemekler",
    image: "https://placehold.co/400x300?text=Ana+Yemekler",
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    description: "Damağınızda iz bırakacak enfes tatlılar",
    image: "https://placehold.co/400x300?text=Tatlılar",
  },
  {
    id: "icecekler",
    name: "İçecekler",
    description: "Ferahlatıcı sıcak ve soğuk içecekler",
    image: "https://placehold.co/400x300?text=İçecekler",
  },
]

const popularItems = [
  {
    id: "item1",
    name: "Karışık Kahvaltı Tabağı",
    description:
      "Zengin içerikli kahvaltı tabağı: peynir çeşitleri, zeytin, bal, tereyağı, reçel, domates, salatalık ve taze ekmek",
    price: 120,
    image: "https://placehold.co/400x300?text=Kahvaltı+Tabağı",
    category: "kahvalti",
    rating: 4.8,
    popular: true,
  },
  {
    id: "item2",
    name: "Izgara Köfte",
    description: "Özel baharatlarla hazırlanmış el yapımı köfte, yanında pilav ve ızgara sebzeler ile",
    price: 85,
    image: "https://placehold.co/400x300?text=Izgara+Köfte",
    category: "ana-yemekler",
    rating: 4.7,
    popular: true,
  },
  {
    id: "item3",
    name: "Künefe",
    description: "Geleneksel tarifle hazırlanan, kadayıf ve peynir ile yapılan sıcak tatlı, üzerinde antep fıstığı ile",
    price: 60,
    image: "https://placehold.co/400x300?text=Künefe",
    category: "tatlilar",
    rating: 4.9,
    popular: true,
  },
  {
    id: "item4",
    name: "Türk Kahvesi",
    description: "Geleneksel yöntemle pişirilen Türk kahvesi, yanında lokum ile",
    price: 25,
    image: "https://placehold.co/400x300?text=Türk+Kahvesi",
    category: "icecekler",
    rating: 4.6,
    popular: true,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    rating: 5,
    comment:
      "Harika bir deneyimdi! Yemekler çok lezzetli, servis hızlı ve personel çok ilgiliydi. Kesinlikle tekrar geleceğim.",
    image: "https://placehold.co/100x100?text=AY",
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    rating: 4.5,
    comment: "Kahvaltı menüsü çok zengin ve taze. Özellikle simit ve peynir tabağı favorim oldu. Kahveleri de harika!",
    image: "https://placehold.co/100x100?text=AK",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    rating: 5,
    comment: "Tatlıları bir harika! Özellikle künefe ve baklava çok başarılı. Ambiyans da çok güzel, rahat bir ortam.",
    image: "https://placehold.co/100x100?text=MD",
  },
]

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="Lezzet Durağı"
        subtitle="Geleneksel lezzetleri modern dokunuşlarla buluşturan eşsiz bir gastronomi deneyimi"
        image="https://placehold.co/1920x1080?text=Lezzet+Durağı"
        scrollToContentId="content-section"
      />

      {/* Content Section */}
      <Box id="content-section">
        {/* Features Section */}
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
          <Container maxWidth="lg">
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        textAlign: "center",
                        p: 4,
                        height: "100%",
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-10px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
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
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.paper" }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Menü Kategorileri"
              subtitle="Zengin menümüzde yer alan kategorileri keşfedin ve damak zevkinize uygun lezzetleri bulun."
            />

            <Grid container spacing={3}>
              {featuredCategories.map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <CategoryCard category={category} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Popular Items Section */}
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.default" }}>
          <Container maxWidth="lg">
            <SectionTitle
              title="Popüler Ürünlerimiz"
              subtitle="Müşterilerimizin en çok tercih ettiği lezzetleri keşfedin."
            />

            <Grid container spacing={3}>
              {popularItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={item.id} sx={{ display: "flex" }}>
                  <Box sx={{ width: "100%" }}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <FoodCard product={item} />
                    </motion.div>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 5 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
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
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
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
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "background.paper" }}>
          <Container maxWidth="lg">
            <SectionTitle title="Müşteri Yorumları" subtitle="Müşterilerimizin deneyimleri ve değerlendirmeleri." />

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 4,
                        height: "100%",
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
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
                            icon={<Star fontSize="inherit" sx={{ color: "primary.main" }} />}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ mb: 3 }} />
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
                background: "linear-gradient(to bottom, rgba(42, 51, 66, 0.8), rgba(42, 51, 66, 0.9))",
                zIndex: 1,
              },
            }}
          >
            <Box
              component="img"
              src="https://placehold.co/1920x1080?text=Lezzet+Durağı"
              alt="Restaurant Ambiance"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>

          <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Lezzetli Bir Deneyim İçin Bize Katılın
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" sx={{ mb: 5, fontWeight: 400, opacity: 0.9 }}>
                Özel anlarınızı bizimle paylaşın, unutulmaz bir deneyim yaşayın.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
                    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    "&:hover": {
                      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
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
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
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

