import { useState, useCallback, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Review {
  name: string;
  source: string;
  sourceLabel: { hu: string; en: string };
  rating: number;
  meta: { hu: string; en: string };
  text: { hu: string; en: string };
}

const reviews: Review[] = [
  {
    name: 'Bal\u00e1zs',
    source: 'Google',
    sourceLabel: { hu: 'Google-v\u00e9lem\u00e9ny', en: 'Google review' },
    rating: 5,
    meta: { hu: '5 napja', en: '5 days ago' },
    text: {
      hu: 'Sz\u00e9p, tiszta, otthonos sz\u00e1ll\u00e1s. A tulajdonosok nagyon kedvesek, bar\u00e1ts\u00e1gosak \u00e9s seg\u00edt\u0151k\u00e9szek. Mindenkinek aj\u00e1nlom a sz\u00e1ll\u00e1st! K\u00e9t gyerekkel \u00e9rkezt\u00fcnk n\u00e9gyen, k\u00e9nyelmesen elf\u00e9rt\u00fcnk.',
      en: 'Beautiful, clean, cozy accommodation. The owners are very kind, friendly and helpful. I recommend it to everyone! We arrived as a family of four with two children and had plenty of space.',
    },
  },
  {
    name: 'Vikt\u00f3ria',
    source: 'Booking.com',
    sourceLabel: { hu: 'Booking.com vend\u00e9gv\u00e9lem\u00e9ny', en: 'Booking.com guest review' },
    rating: 5,
    meta: { hu: 'Magyarorsz\u00e1g', en: 'Hungary' },
    text: {
      hu: 'Gy\u00f6ny\u00f6r\u0171, tiszta, kultur\u00e1lt sz\u00e1ll\u00e1s, minden ig\u00e9nyt kiel\u00e9g\u00edtett, egy karny\u00fajt\u00e1snyira van a Balaton partt\u00f3l. Nem besz\u00e9lve a sz\u00e1ll\u00e1sad\u00f3k kedvess\u00e9g\u00fckr\u0151l, \u00e9s seg\u00edt\u0151 k\u00e9szs\u00e9g\u00fckr\u0151l.',
      en: 'Beautiful, clean, well-maintained accommodation that met all our needs, just a stone\'s throw from the shore of Lake Balaton. Not to mention the kindness and helpfulness of the hosts.',
    },
  },
  {
    name: 'Laura',
    source: 'Booking.com',
    sourceLabel: { hu: 'Booking.com vend\u00e9gv\u00e9lem\u00e9ny', en: 'Booking.com guest review' },
    rating: 5,
    meta: { hu: 'Ausztria', en: 'Austria' },
    text: {
      hu: 'Nagyszer\u0171, \u00faj \u00e9s tiszta apartman egy kedves k\u00f6rny\u00e9ken. T\u00e1rsasj\u00e1t\u00e9kok is rendelkez\u00e9sre \u00e1llnak, a f\u00fcrd\u0151szoba pedig teljesen felszerelt (sampon, test\u00e1pol\u00f3, tusf\u00fcrd\u0151). Kiv\u00e1l\u00f3 elhelyezked\u00e9s\u0171, t\u00e1gas \u00e9s modern sz\u00e1ll\u00e1s.',
      en: 'Great, new clean apartment in a lovely neighbourhood. Board games, bathroom fully equipped (shampoo, lotion, shower gel). Great location, spacious, new.',
    },
  },
];

export default function Testimonials() {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % reviews.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + reviews.length) % reviews.length);
  }, [current, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const sectionTitle = language === 'hu' ? 'Vend\u00e9geink v\u00e9lem\u00e9nye' : 'Guest reviews';
  const sectionHeadingBefore = language === 'hu' ? 'Akik m\u00e1r ' : 'Those who have already ';
  const sectionHeadingBold = language === 'hu' ? 'n\u00e1lunk pihentek' : 'stayed with us';

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-medium tracking-widest uppercase mb-4 inline-block" style={{ color: '#B8B8B8' }}>
            {sectionTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" style={{ color: '#111828' }}>
            {sectionHeadingBefore}<span className="font-semibold">{sectionHeadingBold}</span>
          </h2>
        </div>

        {/* Desktop: 3 cards side by side */}
        <div className="hidden md:grid max-w-6xl mx-auto mb-10 grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} language={language} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden max-w-lg mx-auto mb-10">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.name} className="w-full flex-shrink-0 px-1">
                  <ReviewCard review={review} language={language} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-full border transition-colors hover:bg-gray-100"
              style={{ borderColor: '#D1D5DB' }}
              aria-label={language === 'hu' ? 'El\u0151z\u0151 v\u00e9lem\u00e9ny' : 'Previous review'}
            >
              <ChevronLeft size={20} style={{ color: '#374151' }} />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: idx === current ? '#111828' : '#D1D5DB',
                    transform: idx === current ? 'scale(1.2)' : 'scale(1)',
                  }}
                  aria-label={`${language === 'hu' ? 'V\u00e9lem\u00e9ny' : 'Review'} ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border transition-colors hover:bg-gray-100"
              style={{ borderColor: '#D1D5DB' }}
              aria-label={language === 'hu' ? 'K\u00f6vetkez\u0151 v\u00e9lem\u00e9ny' : 'Next review'}
            >
              <ChevronRight size={20} style={{ color: '#374151' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, language }: { review: Review; language: 'hu' | 'en' }) {
  return (
    <div
      className="relative bg-white rounded-2xl border p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
      style={{ borderColor: '#E5E7EB' }}
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 opacity-10" style={{ color: '#111828' }} />
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: '#111828' }}>{review.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex" aria-label={`${review.rating} / 5 ${language === 'hu' ? '\u00e9rt\u00e9kel\u00e9s' : 'rating'}`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? 'fill-current' : ''}
                  style={{ color: i < review.rating ? '#D4A017' : '#D1D5DB' }}
                />
              ))}
            </div>
            <span className="text-xs font-medium tracking-wide uppercase" style={{ color: '#6b7280' }}>
              {review.source}
            </span>
          </div>
        </div>
      </div>
      <blockquote className="text-base md:text-lg leading-relaxed italic flex-1" style={{ color: '#374151' }}>
        &bdquo;{review.text[language]}&rdquo;
      </blockquote>
      <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: '#F3F4F6', color: '#9CA3AF' }}>
        <span>{review.sourceLabel[language]}</span>
        <span>{review.meta[language]}</span>
      </div>
    </div>
  );
}
