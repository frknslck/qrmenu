"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton, Button, Rating } from "@mui/material"
import { Favorite, FavoriteBorder, ShoppingBag, Star } from "@mui/icons-material"

const FoodCard = ({ product }) => {
  const [favorite, setFavorite] = useState(false)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorite(!favorite)
  }

  return (
    <Card
      sx={{
        width: 250, // Sabit yükseklik
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Favorite Button */}
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: favorite ? "error.main" : "text.secondary",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        size="small"
      >
        {favorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      </IconButton>

      {/* Popular Badge */}
      {product.popular && (
        <Chip
          label="Popüler"
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
            fontWeight: 600,
          }}
        />
      )}

      {/* Image */}
      <Box
        component={Link}
        to={`/urun/${product.id}`}
        sx={{
          position: "relative",
          height: 180, // Sabit yükseklik
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
          sx={{
            transition: "transform 0.5s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography
            component={Link}
            to={`/urun/${product.id}`}
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              textDecoration: "none",
              fontSize: "1rem",
              "&:hover": { color: "primary.main" },
              lineHeight: 1.2,
              mb: 0.5,
              height: 40, // Sabit yükseklik
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              whiteSpace: "nowrap",
              ml: 1,
            }}
          >
            {product.price} ₺
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            size="small"
            readOnly
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.rating})
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: 40, // Sabit yükseklik
            lineHeight: 1.3,
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Button variant="contained" color="primary" size="small" fullWidth startIcon={<ShoppingBag />}>
            Sepete Ekle
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FoodCard

