"use client"
import { createContext, useContext, type ReactNode } from "react"

/**
 * CMS Data Context — passes dynamic page data to Makeswift components.
 *
 * Usage:
 * 1. Code pages wrap <MakeswiftPageShim> in <CmsDataProvider data={...}>
 * 2. CMS components call useCmsData() to read dynamic content
 * 3. In Makeswift editor (no provider), components show their Makeswift-edited defaults
 */

export interface CmsPageData {
  /** Page type identifier */
  type?: "blog" | "product" | "category" | "search" | "blog-category"

  /** Dynamic heading — overrides component default */
  heading?: string

  /** Dynamic description — overrides component default */
  description?: string

  /** Additional metadata fields */
  meta?: {
    /** Blog: author name */
    author?: string
    /** Blog: publish date string */
    date?: string
    /** Blog: tags */
    tags?: string[]
    /** Blog: featured image URL */
    featuredImage?: string
    /** Blog: HTML body content */
    htmlBody?: string
    /** Product: price display */
    price?: string
    /** Product: brand name */
    brand?: string
    /** Product: images */
    images?: { src: string; alt: string }[]
    /** Category: product count */
    productCount?: number
    /** Search: result count */
    resultCount?: number
    /** Search: search term */
    searchTerm?: string
    /** Blog category: category name */
    categoryName?: string
  }
}

const CmsDataContext = createContext<CmsPageData | null>(null)

export function CmsDataProvider({ data, children }: { data: CmsPageData; children: ReactNode }) {
  return <CmsDataContext.Provider value={data}>{children}</CmsDataContext.Provider>
}

/**
 * Read CMS data from context.
 * Returns null when not inside a CmsDataProvider (e.g., in Makeswift editor).
 * Components should fall back to their Makeswift-edited defaults when null.
 */
export function useCmsData(): CmsPageData | null {
  return useContext(CmsDataContext)
}
