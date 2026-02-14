import { ScrollingCards } from '~/components/scrolling-cards';
import { runtime } from '~/lib/makeswift/runtime';
import { Number, Checkbox, Color } from '@makeswift/runtime/controls';

function ScrollingCardsMakeswift(props: any) {
  const {
    autoAdvance = true,
    autoAdvanceInterval = 5000,
    showDots = true,
    showArrows = true,
    transitionDuration = 500,
    backgroundColor = 'transparent',
    dotActiveColor = '#9f1e22',
    dotInactiveColor = '#F2F4F7',
  } = props;

  const sampleCards = [
    {
      id: '1',
      title: 'Outstanding Service',
      description: 'CAST Lighting transformed our outdoor space with stunning illumination.',
      author: 'Sarah Johnson',
      rating: 5,
    },
    {
      id: '2',
      title: 'Premium Quality',
      description: 'The bronze fixtures are beautiful and incredibly durable.',
      author: 'Michael Chen',
      rating: 5,
    },
    {
      id: '3',
      title: 'Expert Installation',
      description: 'The team was knowledgeable and respectful of our property.',
      author: 'Jennifer Martinez',
      rating: 5,
    },
  ];

  return (
    <ScrollingCards
      cards={sampleCards}
      autoAdvance={autoAdvance}
      autoAdvanceInterval={autoAdvanceInterval}
      showDots={showDots}
      showArrows={showArrows}
      transitionDuration={transitionDuration}
      backgroundColor={backgroundColor}
      dotActiveColor={dotActiveColor}
      dotInactiveColor={dotInactiveColor}
    />
  );
}

runtime.registerComponent(ScrollingCardsMakeswift, {
  type: 'cast-scrolling-cards',
  label: 'CAST Scrolling Cards',
  props: {
    autoAdvance: Checkbox({
      label: 'Auto-Advance',
      defaultValue: true,
    }),
    autoAdvanceInterval: Number({
      label: 'Auto-Advance Interval (ms)',
      defaultValue: 5000,
      min: 1000,
      max: 30000,
      step: 1000,
    }),
    showDots: Checkbox({
      label: 'Show Dot Navigation',
      defaultValue: true,
    }),
    showArrows: Checkbox({
      label: 'Show Arrow Navigation',
      defaultValue: true,
    }),
    transitionDuration: Number({
      label: 'Transition Duration (ms)',
      defaultValue: 500,
      min: 200,
      max: 2000,
      step: 100,
    }),
    backgroundColor: Color({
      label: 'Background Color',
      defaultValue: 'transparent',
    }),
    dotActiveColor: Color({
      label: 'Active Dot Color',
      defaultValue: '#9f1e22',
    }),
    dotInactiveColor: Color({
      label: 'Inactive Dot Color',
      defaultValue: '#F2F4F7',
    }),
  },
});
