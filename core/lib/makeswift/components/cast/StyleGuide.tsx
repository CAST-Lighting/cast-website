"use client"
import { forwardRef, type Ref } from "react"

const StyleGuide = forwardRef(function StyleGuide(
  { className }: { className?: string },
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={className} style={{ fontFamily: "'Barlow', sans-serif", background: '#f5f5f5', minHeight: '100vh' }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{ background: '#014960', color: '#fff', padding: '48px 64px' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <img src="/images/logos/cast__lighting_white.svg" alt="CAST Lighting" style={{ height: 40, marginBottom: 24 }} />
          <h1 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 48, fontWeight: 700, margin: 0, color: '#cfd8dc' }}>
            Brand Style Guide
          </h1>
          <p style={{ fontSize: 18, color: '#90a4ae', marginTop: 12, marginBottom: 0 }}>
            Typography · Colors · Buttons · Assets
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '64px' }}>

        {/* ── TYPOGRAPHY ─────────────────────────────────────────────────── */}
        <Section title="Typography">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

            {/* Headings */}
            <div>
              <Label>Essonnes — Heading Font</Label>
              <div style={{ background: '#fff', borderRadius: 12, padding: 40, border: '1px solid #e0e0e0' }}>
                {[
                  { tag: 'H1', size: 46, label: 'Display / Hero' },
                  { tag: 'H2', size: 36, label: 'Section Heading' },
                  { tag: 'H3', size: 29, label: 'Card / Sub-heading' },
                  { tag: 'H4', size: 26, label: 'Label Heading' },
                  { tag: 'H5', size: 23, label: 'Small Heading' },
                  { tag: 'H6', size: 20, label: 'Micro Heading' },
                ].map(({ tag, size, label }) => (
                  <div key={tag} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#007cb0', letterSpacing: '0.1em', textTransform: 'uppercase', width: 28 }}>{tag}</span>
                    <span style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: size, fontWeight: 700, lineHeight: 1.1, color: '#014960', flex: 1 }}>
                      CAST Lighting
                    </span>
                    <span style={{ fontSize: 12, color: '#90a4ae', whiteSpace: 'nowrap' }}>{label} / {size}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div>
              <Label>Barlow — Body Font</Label>
              <div style={{ background: '#fff', borderRadius: 12, padding: 40, border: '1px solid #e0e0e0' }}>
                {[
                  { weight: 700, label: 'Bold', sample: 'Landscape lighting built to last a lifetime.' },
                  { weight: 600, label: 'Semibold', sample: 'Solid brass & copper construction throughout.' },
                  { weight: 500, label: 'Medium', sample: 'Field-serviceable LED modules — not sealed units.' },
                  { weight: 400, label: 'Regular', sample: 'Our fixtures are engineered for the long haul, backed by a lifetime warranty on all hardware and optics.' },
                  { weight: 300, label: 'Light', sample: 'Professional-grade landscape lighting for contractors who demand quality and reliability on every install.' },
                ].map(({ weight, label, sample }) => (
                  <div key={weight} style={{ marginBottom: 20, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#546f7a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {label} / {weight}
                    </div>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, fontWeight: weight, lineHeight: 1.6, color: '#25262d', margin: 0 }}>
                      {sample}
                    </p>
                  </div>
                ))}
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#546f7a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Text Sizes</div>
                  {[
                    { size: 24, label: 'XLarge' },
                    { size: 20, label: 'Large' },
                    { size: 16, label: 'Medium (base)' },
                    { size: 14, label: 'Small' },
                    { size: 12, label: 'Tiny' },
                  ].map(({ size, label }) => (
                    <div key={size} style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: size, color: '#37474f' }}>The quick brown fox</span>
                      <span style={{ fontSize: 11, color: '#90a4ae' }}>{label} / {size}px</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── COLORS ─────────────────────────────────────────────────────── */}
        <Section title="Brand Colors">
          <div style={{ display: 'grid', gap: 32 }}>
            <div>
              <Label>Landscape Blues (Primary Palette)</Label>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <ColorSwatch hex="#7EBEE8" name="Landscape Light Blue" pantone="283 C" usage="Highlights, links, glow" />
                <ColorSwatch hex="#007CB0" name="Landscape Medium Blue" pantone="640 C" usage="Primary actions, buttons" />
                <ColorSwatch hex="#014960" name="Landscape Dark Blue" pantone="302 C" usage="Headers, dark sections" />
              </div>
            </div>
            <div>
              <Label>Brand Black</Label>
              <div style={{ display: 'flex', gap: 16 }}>
                <ColorSwatch hex="#25262D" name="Perimeter Black" pantone="Black 3 C" usage="Dark bg, text on light" />
              </div>
            </div>
            <div>
              <Label>Blue Grey Scale</Label>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <ColorSwatch hex="#CFD8DC" name="Blue Grey 100" pantone="N/A" usage="Heading text on dark bg" />
                <ColorSwatch hex="#90A4AE" name="Blue Grey 300" pantone="N/A" usage="Body text on dark bg" />
                <ColorSwatch hex="#546F7A" name="Blue Grey 600" pantone="N/A" usage="Secondary elements" />
                <ColorSwatch hex="#37474F" name="Blue Grey 800" pantone="N/A" usage="Card surfaces (dark)" />
              </div>
            </div>
            <div>
              <Label>Neutral Grey Scale</Label>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <ColorSwatch hex="#F5F5F5" name="Grey 100" pantone="N/A" usage="Light page background" />
                <ColorSwatch hex="#E0E0E0" name="Grey 300" pantone="N/A" usage="Borders on light bg" />
                <ColorSwatch hex="#757576" name="Grey 600" pantone="N/A" usage="Muted text on light bg" />
                <ColorSwatch hex="#434343" name="Grey 800" pantone="N/A" usage="Body text on light bg" />
              </div>
            </div>
          </div>
        </Section>

        {/* ── BUTTONS — DARK BACKGROUND ─────────────────────────────────── */}
        <Section title="Buttons — Dark Background">
          <div style={{ background: '#014960', borderRadius: 16, padding: 48 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7EBEE8', marginBottom: 32, marginTop: 0 }}>
              Use on dark / branded sections
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#90a4ae', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Solid</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div><button className="sg-btn-solid-dark-lg">Large Button</button><BtnLabel name="sg-btn-solid-dark-lg" /></div>
                  <div><button className="sg-btn-solid-dark-md">Medium Button</button><BtnLabel name="sg-btn-solid-dark-md" /></div>
                  <div><button className="sg-btn-solid-dark-sm">Small Button</button><BtnLabel name="sg-btn-solid-dark-sm" /></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#90a4ae', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Outline</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div><button className="sg-btn-outline-dark-lg">Large Button</button><BtnLabel name="sg-btn-outline-dark-lg" /></div>
                  <div><button className="sg-btn-outline-dark-md">Medium Button</button><BtnLabel name="sg-btn-outline-dark-md" /></div>
                  <div><button className="sg-btn-outline-dark-sm">Small Button</button><BtnLabel name="sg-btn-outline-dark-sm" /></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#90a4ae', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Underline / Text</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div><button className="sg-btn-underline-dark-lg">Large Button</button><BtnLabel name="sg-btn-underline-dark-lg" /></div>
                  <div><button className="sg-btn-underline-dark-md">Medium Button</button><BtnLabel name="sg-btn-underline-dark-md" /></div>
                  <div><button className="sg-btn-underline-dark-sm">Small Button</button><BtnLabel name="sg-btn-underline-dark-sm" /></div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── BUTTONS — LIGHT BACKGROUND ────────────────────────────────── */}
        <Section title="Buttons — Light Background">
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 48, border: '1px solid #e0e0e0' }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#546f7a', marginBottom: 32, marginTop: 0 }}>
              Use on white / light grey sections
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#546f7a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Solid</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div><button className="sg-btn-solid-lg">Large Button</button><BtnLabel name="sg-btn-solid-lg" dark /></div>
                  <div><button className="sg-btn-solid-md">Medium Button</button><BtnLabel name="sg-btn-solid-md" dark /></div>
                  <div><button className="sg-btn-solid-sm">Small Button</button><BtnLabel name="sg-btn-solid-sm" dark /></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#546f7a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Outline</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div><button className="sg-btn-outline-lg">Large Button</button><BtnLabel name="sg-btn-outline-lg" dark /></div>
                  <div><button className="sg-btn-outline-md">Medium Button</button><BtnLabel name="sg-btn-outline-md" dark /></div>
                  <div><button className="sg-btn-outline-sm">Small Button</button><BtnLabel name="sg-btn-outline-sm" dark /></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#546f7a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Underline / Text</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                  <div><button className="sg-btn-underline-lg">Large Button</button><BtnLabel name="sg-btn-underline-lg" dark /></div>
                  <div><button className="sg-btn-underline-md">Medium Button</button><BtnLabel name="sg-btn-underline-md" dark /></div>
                  <div><button className="sg-btn-underline-sm">Small Button</button><BtnLabel name="sg-btn-underline-sm" dark /></div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── LOGOS ──────────────────────────────────────────────────────── */}
        <Section title="Logo Variants">
          <div style={{ display: 'grid', gap: 16 }}>
            <Label>On Dark Background</Label>
            <div style={{ background: '#014960', borderRadius: 12, padding: 40, display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { src: '/images/logos/cast__lighting_white.svg', label: 'Lighting / White' },
                { src: '/images/logos/cast__lighting_baby-blue.svg', label: 'Lighting / Baby Blue' },
                { src: '/images/logos/cast__lighting_mid-blue.svg', label: 'Lighting / Mid Blue' },
                { src: '/images/logos/cast__landscape_white.svg', label: 'Landscape / White' },
                { src: '/images/logos/cast__graphic_white.svg', label: 'Graphic / White', tall: true },
              ].map(({ src, label, tall }) => (
                <div key={src} style={{ textAlign: 'center' }}>
                  <img src={src} alt={label} style={{ height: tall ? 48 : 36 }} />
                  <div style={{ fontSize: 11, color: '#90a4ae', marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>
            <Label>On Light Background</Label>
            <div style={{ background: '#f5f5f5', borderRadius: 12, padding: 40, display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'center', border: '1px solid #e0e0e0' }}>
              {[
                { src: '/images/logos/cast__lighting_black.svg', label: 'Lighting / Black' },
                { src: '/images/logos/cast__lighting_charcoal.svg', label: 'Lighting / Charcoal' },
                { src: '/images/logos/cast__lighting_mid-blue.svg', label: 'Lighting / Mid Blue' },
                { src: '/images/logos/cast__landscape_dark-blue.svg', label: 'Landscape / Dark Blue' },
                { src: '/images/logos/cast__graphic_mid-blue.svg', label: 'Graphic / Mid Blue', tall: true },
              ].map(({ src, label, tall }) => (
                <div key={src} style={{ textAlign: 'center' }}>
                  <img src={src} alt={label} style={{ height: tall ? 48 : 36 }} />
                  <div style={{ fontSize: 11, color: '#546f7a', marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── PHOTOS ─────────────────────────────────────────────────────── */}
        <Section title="Photo Assets">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div key={n} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <img
                  src={`/images/cast/background-${n}.jpg`}
                  alt={`CAST background ${n}`}
                  style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '12px 16px', background: '#fff', fontSize: 12, color: '#546f7a', fontWeight: 500 }}>
                  /images/cast/background-{n}.jpg
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── BUTTON CLASS REFERENCE ─────────────────────────────────────── */}
        <Section title="Button Class Reference">
          <div style={{ background: '#fff', borderRadius: 12, padding: 40, border: '1px solid #e0e0e0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Barlow', sans-serif", fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#014960', fontWeight: 700 }}>Class Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#014960', fontWeight: 700 }}>Style</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#014960', fontWeight: 700 }}>Size</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#014960', fontWeight: 700 }}>Background</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['sg-btn-solid-lg', 'Solid', 'Large (17px)', 'Light'],
                  ['sg-btn-solid-md', 'Solid', 'Medium (15px)', 'Light'],
                  ['sg-btn-solid-sm', 'Solid', 'Small (13px)', 'Light'],
                  ['sg-btn-solid-dark-lg', 'Solid', 'Large (17px)', 'Dark'],
                  ['sg-btn-solid-dark-md', 'Solid', 'Medium (15px)', 'Dark'],
                  ['sg-btn-solid-dark-sm', 'Solid', 'Small (13px)', 'Dark'],
                  ['sg-btn-outline-lg', 'Outline', 'Large (17px)', 'Light'],
                  ['sg-btn-outline-md', 'Outline', 'Medium (15px)', 'Light'],
                  ['sg-btn-outline-sm', 'Outline', 'Small (13px)', 'Light'],
                  ['sg-btn-outline-dark-lg', 'Outline', 'Large (17px)', 'Dark'],
                  ['sg-btn-outline-dark-md', 'Outline', 'Medium (15px)', 'Dark'],
                  ['sg-btn-outline-dark-sm', 'Outline', 'Small (13px)', 'Dark'],
                  ['sg-btn-underline-lg', 'Underline', 'Large (17px)', 'Light'],
                  ['sg-btn-underline-md', 'Underline', 'Medium (15px)', 'Light'],
                  ['sg-btn-underline-sm', 'Underline', 'Small (13px)', 'Light'],
                  ['sg-btn-underline-dark-lg', 'Underline', 'Large (17px)', 'Dark'],
                  ['sg-btn-underline-dark-md', 'Underline', 'Medium (15px)', 'Dark'],
                  ['sg-btn-underline-dark-sm', 'Underline', 'Small (13px)', 'Dark'],
                ].map(([cls, style, size, bg], i) => (
                  <tr key={cls} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px 16px', fontFamily: 'monospace', color: '#007cb0', fontWeight: 600 }}>.{cls}</td>
                    <td style={{ padding: '10px 16px', color: '#25262d' }}>{style}</td>
                    <td style={{ padding: '10px 16px', color: '#546f7a' }}>{size}</td>
                    <td style={{ padding: '10px 16px', color: '#546f7a' }}>{bg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </div>
    </div>
  )
})

export default StyleGuide

/* ── Helpers ─────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 28, fontWeight: 700, color: '#014960', margin: 0 }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
      </div>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: '#546f7a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
      {children}
    </div>
  )
}

function BtnLabel({ name, dark }: { name: string; dark?: boolean }) {
  return (
    <div style={{ fontSize: 10, fontFamily: 'monospace', color: dark ? '#90a4ae' : '#90a4ae', marginTop: 6 }}>
      .{name}
    </div>
  )
}

function ColorSwatch({ hex, name, pantone, usage }: { hex: string; name: string; pantone: string; usage: string }) {
  const isLight = ['#F5F5F5', '#E0E0E0', '#CFD8DC', '#7EBEE8'].includes(hex)
  return (
    <div style={{ width: 200, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
      <div style={{ background: hex, height: 80, display: 'flex', alignItems: 'flex-end', padding: '8px 12px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: isLight ? '#25262d' : '#fff' }}>
          {hex}
        </span>
      </div>
      <div style={{ padding: '12px 14px', background: '#fff' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#25262d', marginBottom: 2 }}>{name}</div>
        <div style={{ fontSize: 11, color: '#546f7a', marginBottom: 4 }}>Pantone {pantone}</div>
        <div style={{ fontSize: 11, color: '#90a4ae' }}>{usage}</div>
      </div>
    </div>
  )
}
