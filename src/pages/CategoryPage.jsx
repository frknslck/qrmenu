"use client"

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const CategoryPage = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Kategori sayfasına tıklandığında menü sayfasına yönlendir
    navigate(`/menu?category=${categoryId}`)
  }, [categoryId, navigate])

  return null // Bu bileşen sadece yönlendirme yapar, bir şey göstermez
}

export default CategoryPage

