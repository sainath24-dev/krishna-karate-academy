import React, { useState } from 'react';
import './03-Facility.css';

const GALLERY_MEDIA = [
  {
    id: 1,
    type: 'image',
    src: '/images/IMG_20220717_090645.jpg',
    alt: 'Krishna Karate Academy Class Training',
    bentoClass: 'bento-featured'
  },
  {
    id: 2,
    type: 'image',
    src: '/images/IMG_20220717_091025.jpg',
    alt: 'Krishna Karate Academy Batch Photo',
    bentoClass: 'bento-wide'
  },
  {
    id: 3,
    type: 'image',
    src: '/images/IMG_20220717_091158.jpg',
    alt: 'Krishna Karate Academy Students in Gi',
    bentoClass: 'bento-standard'
  },
  {
    id: 4,
    type: 'image',
    src: '/images/IMG_20220821_164916.jpg',
    alt: 'Krishna Karate Academy Practice Session',
    bentoClass: 'bento-standard'
  },
  {
    id: 5,
    type: 'image',
    src: '/images/IMG_20220619_082458.jpg',
    alt: 'Krishna Karate Academy Outdoor Training',
    bentoClass: 'bento-wide'
  },
  {
    id: 6,
    type: 'video',
    src: '/images/video_20220717_082446.mp4',
    poster: '/images/IMG_20220717_090645.jpg',
    alt: 'Krishna Karate Academy Live Practice Video',
    bentoClass: 'bento-wide'
  },
  {
    id: 7,
    type: 'image',
    src: '/images/IMG_20220910_175930.jpg',
    alt: 'Krishna Karate Academy Group Training',
    bentoClass: 'bento-wide'
  },
  {
    id: 8,
    type: 'image',
    src: '/images/IMG_20221103_130155.jpg',
    alt: 'Krishna Karate Academy Belt Ceremony',
    bentoClass: 'bento-standard'
  },
  {
    id: 9,
    type: 'image',
    src: '/images/IMG_20180211_080644236_HDR.jpg',
    alt: 'Krishna Karate Academy Early Batch',
    bentoClass: 'bento-standard'
  },
  {
    id: 10,
    type: 'image',
    src: '/images/IMG_20181209_082431197.jpg',
    alt: 'Krishna Karate Academy Training Event',
    bentoClass: 'bento-wide'
  }
];

const INITIAL_COUNT = 6;

export function FacilitySection() {
  const [showAll, setShowAll] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  const displayedMedia = showAll ? GALLERY_MEDIA : GALLERY_MEDIA.slice(0, INITIAL_COUNT);

  const openLightbox = (index) => {
    setSelectedMediaIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMediaIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedMediaIndex((prev) => (prev > 0 ? prev - 1 : GALLERY_MEDIA.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedMediaIndex((prev) => (prev < GALLERY_MEDIA.length - 1 ? prev + 1 : 0));
  };

  const activeMedia = selectedMediaIndex !== null ? GALLERY_MEDIA[selectedMediaIndex] : null;

  return (
    <section id="gallery" className="content-band-soft bento-gallery-section">
      <div className="section-wrapper">
        <div className="section-heading-block">
          <span className="eyebrow-uppercase">ACADEMY MOMENTS</span>
          <h2 className="display-lg gallery-heading">
            Class Gallery
          </h2>
          <p className="body-md section-subtitle">
            Glimpses of daily training, belt promotions, kids batches, and martial arts practice at Krishna Karate Academy Bidar.
          </p>
        </div>

        {/* Dynamic Scalable Bento Grid */}
        <div className="bento-grid">
          {displayedMedia.map((item, idx) => (
            <div
              key={item.id}
              className={`bento-item ${item.bentoClass || 'bento-standard'}`}
              onClick={() => openLightbox(idx)}
            >
              {item.type === 'video' ? (
                <div className="bento-video-wrap">
                  <img
                    src={item.poster}
                    alt={item.alt}
                    loading="lazy"
                    className="bento-img"
                  />
                  <div className="bento-video-play-badge">
                    <span>▶ Play Video</span>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="bento-img"
                />
              )}
              <div className="bento-hover-glow" />
            </div>
          ))}
        </div>

        {/* Scalable View More / Show Less Button */}
        {GALLERY_MEDIA.length > INITIAL_COUNT && (
          <div className="bento-actions-row">
            <button
              type="button"
              className="btn-outline-ink bento-toggle-btn"
              onClick={() => setShowAll(!showAll)}
            >
              <span>{showAll ? 'Show Less ↑' : `View All (${GALLERY_MEDIA.length} Photos & Videos) ↓`}</span>
            </button>
          </div>
        )}

        {/* Interactive Lightbox Modal with Next / Prev */}
        {activeMedia && (
          <div className="gallery-lightbox-modal" onClick={closeLightbox}>
            <div className="bento-lightbox-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close"
              >
                ✕
              </button>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-prev"
                onClick={handlePrev}
                aria-label="Previous"
              >
                ‹
              </button>

              {activeMedia.type === 'video' ? (
                <video
                  key={activeMedia.src}
                  src={activeMedia.src}
                  controls
                  autoPlay
                  className="bento-lightbox-video"
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  className="bento-lightbox-img"
                />
              )}

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-next"
                onClick={handleNext}
                aria-label="Next"
              >
                ›
              </button>

              <div className="lightbox-footer-counter caption">
                <span>{selectedMediaIndex + 1} of {GALLERY_MEDIA.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
