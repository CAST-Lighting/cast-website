"use client"
import { forwardRef, type Ref } from "react"

interface CastSiteThemeProps {
  className?: string
  // Colors
  primaryColor?: string
  accentColor?: string
  secondaryColor?: string
  lightColor?: string
  titleColor?: string
  bodyColor?: string
  // Typography — sizes in px, rendered as rem (divide by htmlBasePx)
  htmlBasePx?: number
  h1Px?: number
  h2Px?: number
  h3Px?: number
  h4Px?: number
  h5Px?: number
  h6Px?: number
  bodyPx?: number
  bodyLgPx?: number
  bodySmPx?: number
  headingWeight?: number
  bodyLineHeight?: number
  headingLineHeight?: number
}

export default forwardRef(function CastSiteTheme(
  {
    className,
    primaryColor = "#004960",
    accentColor = "#057cb0",
    secondaryColor = "#005c7a",
    lightColor = "#7fbee8",
    titleColor = "#1a2332",
    bodyColor = "#3c3c47",
    htmlBasePx = 18,
    h1Px = 46,
    h2Px = 36,
    h3Px = 29,
    h4Px = 26,
    h5Px = 23,
    h6Px = 20,
    bodyPx = 18,
    bodyLgPx = 20,
    bodySmPx = 16,
    headingWeight = 700,
    bodyLineHeight = 1.5,
    headingLineHeight = 1.1,
  }: CastSiteThemeProps,
  _ref: Ref<HTMLDivElement>,
) {
  const base = htmlBasePx || 18

  const css = `
html { font-size: ${base}px; }
:root {
  --color-primary: ${primaryColor};
  --color-accent: ${accentColor};
  --color-secondary: ${secondaryColor};
  --color-light: ${lightColor};
  --color-title: ${titleColor};
  --color-content: ${bodyColor};
  --color-theme-primary: ${accentColor};
  --color-theme-secondary: ${primaryColor};
  --h1-size: ${(h1Px / base).toFixed(4)}em;
  --h2-size: ${(h2Px / base).toFixed(4)}em;
  --h3-size: ${(h3Px / base).toFixed(4)}em;
  --h4-size: ${(h4Px / base).toFixed(4)}em;
  --h5-size: ${(h5Px / base).toFixed(4)}em;
  --h6-size: ${(h6Px / base).toFixed(4)}em;
  --body-size: ${bodyPx}px;
  --body-lg-size: ${bodyLgPx}px;
  --body-sm-size: ${bodySmPx}px;
  --heading-weight: ${headingWeight};
  --body-line-height: ${bodyLineHeight};
  --heading-line-height: ${headingLineHeight};
}
`.trim()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  )
})
