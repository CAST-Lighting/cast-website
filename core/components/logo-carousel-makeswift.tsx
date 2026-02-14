'use client';

import { LogoCarousel } from './logo-carousel';
import { runtime } from '~/lib/makeswift/runtime';
import { Number, Checkbox, Color } from '@makeswift/runtime/controls';

function LogoCarouselMakeswift(props: any) {
  const {
    speed = 35,
    gap = 48,
    logoHeight = 80,
    pauseOnHover = true,
    backgroundColor = 'transparent',
    showTopRow = true,
    showBottomRow = true,
  } = props;

  const sampleLogos = [
    { src: '/images/logo-1.png', alt: 'Partner 1', width: 200, height: logoHeight },
    { src: '/images/logo-2.png', alt: 'Partner 2', width: 200, height: logoHeight },
    { src: '/images/logo-3.png', alt: 'Partner 3', width: 200, height: logoHeight },
    { src: '/images/logo-4.png', alt: 'Partner 4', width: 200, height: logoHeight },
    { src: '/images/logo-5.png', alt: 'Partner 5', width: 200, height: logoHeight },
    { src: '/images/logo-6.png', alt: 'Partner 6', width: 200, height: logoHeight },
  ];

  return (
    <LogoCarousel
      logos={sampleLogos}
      speed={speed}
      gap={gap}
      logoHeight={logoHeight}
      pauseOnHover={pauseOnHover}
      backgroundColor={backgroundColor}
      showTopRow={showTopRow}
      showBottomRow={showBottomRow}
    />
  );
}

runtime.registerComponent(LogoCarouselMakeswift, {
  type: 'cast-logo-carousel',
  label: 'CAST Logo Carousel',
  props: {
    speed: Number({
      label: 'Animation Speed (seconds)',
      defaultValue: 35,
      min: 10,
      max: 120,
      step: 5,
    }),
    gap: Number({
      label: 'Gap Between Logos (px)',
      defaultValue: 48,
      min: 16,
      max: 128,
      step: 8,
    }),
    logoHeight: Number({
      label: 'Logo Height (px)',
      defaultValue: 80,
      min: 40,
      max: 200,
      step: 10,
    }),
    pauseOnHover: Checkbox({
      label: 'Pause on Hover',
      defaultValue: true,
    }),
    backgroundColor: Color({
      label: 'Background Color',
      defaultValue: 'transparent',
    }),
    showTopRow: Checkbox({
      label: 'Show Top Row',
      defaultValue: true,
    }),
    showBottomRow: Checkbox({
      label: 'Show Bottom Row',
      defaultValue: true,
    }),
  },
});

export default LogoCarouselMakeswift;
