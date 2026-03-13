"use client"
import { forwardRef, type Ref } from "react"
import { Shield, Award, Wrench } from "lucide-react"

const ContentMedia = forwardRef(function ContentMedia(
  { className }: { className?: string },
  ref: Ref<HTMLElement>
) {
  return (
    <section ref={ref} className={`py-24 bg-gradient-dark relative overflow-hidden ${className || ""}`}>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Unmatched Quality, Technology &{" "}
              <span className="text-gradient-warm">Durability</span>
            </h2>
            <p className="section-desc mb-8">
              Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our proprietary LED technology delivers superior color rendering and energy efficiency.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Shield, title: "Lifetime Warranty", desc: "Every fixture backed by our industry-leading lifetime warranty." },
                { icon: Award, title: "Solid Brass & Copper", desc: "Premium alloys that never rust, corrode, or degrade over time." },
                { icon: Wrench, title: "Field Serviceable", desc: "Designed for easy maintenance and component replacement in the field." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="icon-box">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="card-title text-foreground mb-1">{item.title}</h4>
                    <p className="text-size-small text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#" className="btn-primary">Shop Products</a>
              <a href="#" className="btn-outline">Learn More →</a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden glow-warm">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WcXgQ"
                title="Quality landscape lighting showcase"
                className="w-full h-[500px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-5 glow-warm-sm">
              <div className="heading-style-h3 text-primary">25+</div>
              <div className="text-size-small text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ContentMedia
