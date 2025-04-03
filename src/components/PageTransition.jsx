"use client"

import { motion } from "framer-motion"
import { Box } from "@mui/material"

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

const PageTransition = ({ children, location }) => {
  return (
    <Box
      component={motion.div}
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      sx={{ width: "100%" }}
    >
      {children}
    </Box>
  )
}

export default PageTransition

