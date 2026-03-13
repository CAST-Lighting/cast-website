"use client"
import { forwardRef, type Ref } from "react"
import { Lightbulb, Sun, CircleDot, Lamp, SquareAsterisk, Zap, Focus } from "lucide-react"

const categories = [
  { name: "Path Lights", icon: Lamp },
  { name: "Spot Lights", icon: Zap },
  { name: "Wall Wash", icon: Sun },
  { name: "Well Lights", icon: CircleDot },
  { name: "Deck Lights", icon: SquareAsterisk },
  { name: "Flood Lights", icon: Zap },
  { name: "Accent Lights", icon: Focus },
  { name: "Transformers", icon: Lightbulb },
]

const CategoryGrid = forwardRef(function CategoryGrid(
  { className }: { className?: string },
  ref: Ref<HTMLElement>
) {
  return (
    <section ref={ref} className={`relative py-24 overflow-hidden ${className || ""}`}>
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-dark-blue/85" />
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3 opacity-100">
            Product <span className="text-gradient-warm">Categories</span>
          </h2>
          <p className="section-desc">
            Explore our full range of professional landscape lighting solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) =>
            <a
              key={cat.name}
              href="#"
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-secondary hover:border-primary/40 hover:bg-secondary/80 transition-all duration-300">

              <cat.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-size-small font-medium text-secondary-foreground group-hover:text-primary text-center transition-colors">
                {cat.name}
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
})

export default CategoryGrid
