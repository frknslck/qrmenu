"use client"

import { Card, CardMedia, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { ArrowForward } from "@mui/icons-material"
import { motion } from "framer-motion"

const CategoryCard = ({ category }) => {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
      <Card
        component={Link}
        to={`/kategori/${category.id}`}
        sx={{
          height: 280,
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
              transform: "scale(1.05)",
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
  )
}

export default CategoryCard

