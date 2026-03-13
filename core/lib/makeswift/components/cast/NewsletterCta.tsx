"use client"
import { forwardRef, type Ref } from "react"
import { Mail } from "lucide-react"

const NewsletterCta = forwardRef(function NewsletterCta(
  { className }: { className?: string },
  ref: Ref<HTMLElement>
) {
  return (
    <section ref={ref} className={`py-20 bg-card ${className || ""}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="icon-box icon-box-lg mx-auto mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="section-heading text-3xl md:text-4xl text-foreground mb-3">Stay in the Loop</h2>
          <p className="section-desc mb-8">
            Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input flex-1"
            />
            <button type="submit" className="btn-primary glow-warm-sm hover:glow-warm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
})

export default NewsletterCta
