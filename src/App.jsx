import { Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import MenuPage from "./pages/MenuPage"
import CategoryPage from "./pages/CategoryPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import "./App.css"

// Tema oluşturma
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D4AF37", // Altın rengi
      light: "#E6C687",
      dark: "#B38728",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2A3342", // Koyu lacivert
      light: "#3E4A5E",
      dark: "#1A202C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2A3342",
      secondary: "#6B7280",
    },
    error: {
      main: "#EF4444",
    },
    success: {
      main: "#10B981",
    },
    warning: {
      main: "#F59E0B",
    },
    info: {
      main: "#3B82F6",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.6,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/kategori/:categoryId" element={<CategoryPage />} />
          <Route path="/urun/:productId" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App

