"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton, Button } from "@mui/material"
import { motion } from "framer-motion"
import { Favorite, FavoriteBorder, ShoppingBag, ExpandMore, ExpandLess } from "@mui/icons-material"

const FoodCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const handleExpandClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpanded(!expanded)
  }

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorite(!favorite)
  }

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -10 }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        "&:hover": {
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          borderColor: "primary.main",
        },
      }}
    >
      {/* Favorite Button */}
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: favorite ? "primary.main" : "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        {favorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      {/* Popular Badge */}
      {product.popular && (
        <Chip
          label="Popüler"
          color="secondary"
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 2,
            fontWeight: 600,
            color: "background.default",
          }}
        />
      )}

      {/* Image */}
      <Box
        component={Link}
        to={`/urun/${product.id}`}
        sx={{
          position: "relative",
          height: 200,
          overflow: "hidden",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{
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
            width: "100%",
            height: "30%",
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 3, pt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography
            component={Link}
            to={`/urun/${product.id}`}
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "white",
              backgroundColor: "primary.main",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: "0.9rem",
            }}
          >
            {product.price} ₺
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<ShoppingBag />}
            sx={{ borderRadius: 8, px: 2 }}
          >
            Sepete Ekle
          </Button>
          <IconButton size="small" onClick={handleExpandClick}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FoodCard

