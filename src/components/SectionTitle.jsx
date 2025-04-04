"use client"

import { Box, Typography } from "@mui/material"
import { motion } from "framer-motion"

const SectionTitle = ({ title, subtitle, center = true, light = false }) => {
  return (
    <Box
      sx={{
        mb: { xs: 4, md: 6 },
        textAlign: center ? "center" : "left",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            position: "relative",
            display: center ? "inline-block" : "block",
            color: light ? "white" : "text.primary",
            fontSize: { xs: "2rem", md: "2.5rem" },
            "&::after": {
              content: '""',
              position: "absolute",
              width: "60px",
              height: "3px",
              bottom: -10,
              left: center ? "50%" : 0,
              transform: center ? "translateX(-50%)" : "none",
              background: "linear-gradient(90deg, #D4AF37, #E6C687)",
            },
          }}
        >
          {title}
        </Typography>
      </motion.div>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              maxWidth: center ? "700px" : "100%",
              mx: center ? "auto" : 0,
              mt: 3,
              color: light ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
            }}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
    </Box>
  )
}

export default SectionTitle

