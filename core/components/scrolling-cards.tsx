'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface Card {
  id: string;
  title?: string;
  description?: string;
  author?: string;
  rating?: number;
}

export interface ScrollingCardsProps {
  cards: Card[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  transitionDuration?: number;
  backgroundColor?: string;
  dotActiveColor?: string;
  dotInactiveColor?: string;
}

export function ScrollingCards({
  cards,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  showDots = true,
  showArrows = true,
  transitionDuration = 500,
  backgroundColor = 'transparent',
  dotActiveColor = '#9f1e22',
  dotInactiveColor = '#F2F4F7',
}: ScrollingCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [isTransitioning, transitionDuration]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % cards.length;
    goToSlide(nextIndex);
  }, [currentIndex, cards.length, goToSlide]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    goToSlide(prevIndex);
  }, [currentIndex, cards.length, goToSlide]);

  useEffect(() => {
    if (!autoAdvance || cards.length <= 1) return;
    const interval = setInterval(goToNext, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [autoAdvance, autoAdvanceInterval, goToNext, cards.length]);

  if (cards.length === 0) {
    return <div className="p-8 text-center">No cards to display</div>;
  }

  return (
    <div className="relative w-full overflow-hidden py-8" style={{ backgroundColor }}>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className="min-w-full bg-white p-8">
                <div className="text-center">
                  {card.rating && card.rating > 0 && (
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < (card.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}
                  {card.title && <h3 className="text-2xl font-bold mb-4">{card.title}</h3>}
                  {card.description && <p className="text-gray-700 mb-4">{card.description}</p>}
                  {card.author && <p className="text-sm font-semibold">— {card.author}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showArrows && cards.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {showDots && cards.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: index === currentIndex ? dotActiveColor : dotInactiveColor,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
