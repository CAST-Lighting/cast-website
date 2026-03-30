"use client"
import { forwardRef, type Ref } from "react"

interface FeatureItem {
  title?: string
  desc?: string
}

interface AboutContentProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  sectionHeading?: string
  sectionBody?: string
  features?: FeatureItem[]
  missionHeading?: string
  missionBody?: string
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    title: "Founded 2001",
    desc: "Over two decades of innovation in landscape lighting design and manufacturing.",
  },
  {
    title: "Made in the USA",
    desc: "Every CAST fixture is designed and manufactured in Pine Brook, New Jersey.",
  },
  {
    title: "Lifetime Warranty",
    desc: "We stand behind every product with a comprehensive lifetime warranty — no fine print.",
  },
  {
    title: "Solid Brass & Copper",
    desc: "Premium materials that develop a beautiful patina and never corrode or deteriorate.",
  },
  {
    title: "Contractor Trusted",
    desc: "Over 10,000 landscape lighting professionals rely on CAST fixtures for their projects.",
  },
  {
    title: "LED Innovation",
    desc: "Integrated LED technology engineered for optimal light output, efficiency, and longevity.",
  },
]

const AboutContent = forwardRef(function AboutContent(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 80,
    paddingBottom = 80,
    sectionHeading = "Built to Last. Built in America.",
    sectionBody = "Since 2001, CAST Lighting has been designing and manufacturing professional-grade landscape lighting fixtures in the USA. Every product is crafted from solid brass or copper — materials chosen for their beauty and ability to withstand decades of outdoor exposure without corroding or deteriorating.",
    features: featuresProp,
    missionHeading = "Our Mission",
    missionBody = "To provide landscape lighting professionals with the highest-quality fixtures available — products that are beautiful, durable, and easy to install. We believe outdoor lighting should enhance properties for a lifetime, and we build every product with that standard in mind.",
    btn1Label = "Shop Products",
    btn1Href = "/shop",
    btn2Label = "Contact Us",
    btn2Href = "/contact",
  }: AboutContentProps,
  ref: Ref<HTMLElement>
) {
  const features = featuresProp && featuresProp.length > 0 ? featuresProp : DEFAULT_FEATURES

  return (
    <section
      ref={ref}
      className={className || ""}
      style={{ background: bgColor || "#0f1923", paddingTop, paddingBottom }}
    >
      <div className="site-container">
        <div className="max-w-3xl mx-auto flex flex-col gap-16">

          {/* Intro */}
          <div className="flex flex-col gap-6 text-center">
            <h2
              className="heading-style-h2"
              style={{ color: "var(--color-blue-grey-100)" }}
            >
              {sectionHeading}
            </h2>
            <p
              className="body-lg"
              style={{ color: "var(--color-blue-grey-300)", lineHeight: 1.8 }}
            >
              {sectionBody}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-6 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <h3
                  className="heading-style-h4"
                  style={{ color: "var(--color-blue-grey-100)" }}
                >
                  {item.title || "Feature Title"}
                </h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "var(--color-blue-grey-400)", lineHeight: 1.7 }}>
                  {item.desc || "Feature description goes here."}
                </p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div
            className="text-center flex flex-col gap-6 p-10 rounded-lg"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <h2
              className="heading-style-h3"
              style={{ color: "var(--color-blue-grey-100)" }}
            >
              {missionHeading}
            </h2>
            <p
              className="body-lg"
              style={{ color: "var(--color-blue-grey-300)", lineHeight: 1.8 }}
            >
              {missionBody}
            </p>
            <div className="flex flex-wrap gap-3 justify-center" style={{ marginTop: 8 }}>
              {btn1Label && (
                <a href={btn1Href || "#"} className="sg-btn-solid-md">
                  {btn1Label}
                </a>
              )}
              {btn2Label && (
                <a href={btn2Href || "#"} className="sg-btn-outline-dark-md">
                  {btn2Label}
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

export default AboutContent
