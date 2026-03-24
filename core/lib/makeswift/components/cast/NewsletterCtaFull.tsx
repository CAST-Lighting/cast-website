"use client"
import { forwardRef } from "react"

interface NewsletterCtaFullProps {
  className?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
  containerBgColor?: string
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
  heading?: string
  description?: string
  buttonText?: string
  items?: Array<{ text?: string }>
}

const NewsletterCtaFull = forwardRef(function NewsletterCtaFull(_props: NewsletterCtaFullProps, ref: any) {
  return null
})
export default NewsletterCtaFull
