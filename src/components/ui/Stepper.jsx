import React, { useState } from 'react';
import './Stepper.css';

export function Stepper({
  steps = [],
  initialStep = 0,
  backButtonText = 'Previous Level',
  nextButtonText = 'Next Level',
  onStepChange,
  className = ''
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onStepChange?.(next);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onStepChange?.(prev);
    }
  };

  const activeStepData = steps[currentStep];

  return (
    <div className={`dojo-stepper ${className}`}>
      {/* Step Indicator Navigation Tabs */}
      <div className="stepper-nav" role="tablist">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isPassed = idx < currentStep;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`stepper-nav-item ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
              onClick={() => {
                setCurrentStep(idx);
                onStepChange?.(idx);
              }}
            >
              <div className="stepper-nav-badge">
                <span className="stepper-nav-index">{idx + 1}</span>
              </div>
              <div className="stepper-nav-text">
                <span className="stepper-nav-title">{step.title}</span>
                <span className="stepper-nav-sub">{step.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Container */}
      <div className="stepper-body" role="tabpanel">
        {activeStepData && (
          <div className="stepper-content-card">
            <div className="stepper-card-header">
              <div className="stepper-belt-rank-badge" style={{ borderColor: activeStepData.beltColor || 'var(--gold)' }}>
                <span className="belt-color-dot" style={{ backgroundColor: activeStepData.beltColor || 'var(--gold)' }} />
                <span>{activeStepData.beltLabel || activeStepData.title}</span>
              </div>
              <h3 className="stepper-card-title">{activeStepData.headline}</h3>
            </div>

            <p className="stepper-card-desc">{activeStepData.description}</p>

            {/* Schedule & Syllabus Breakdown in JetBrains Mono */}
            <div className="stepper-meta-grid">
              <div className="stepper-meta-col">
                <h4 className="stepper-meta-label">WEEKLY SCHEDULE</h4>
                <ul className="stepper-schedule-list">
                  {activeStepData.schedule?.map((item, i) => (
                    <li key={i} className="stepper-schedule-item">
                      <span className="schedule-day">{item.days}:</span>
                      <span className="schedule-time mono-text">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stepper-meta-col">
                <h4 className="stepper-meta-label">FOCUS & CURRICULUM</h4>
                <ul className="stepper-curriculum-list">
                  {activeStepData.curriculum?.map((c, i) => (
                    <li key={i} className="stepper-curriculum-item">
                      <span className="curriculum-bullet">✦</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stepper-meta-col">
                <h4 className="stepper-meta-label">ADVANCEMENT TARGET</h4>
                <div className="stepper-target-box">
                  <div className="target-duration mono-text">{activeStepData.duration}</div>
                  <div className="target-grading">{activeStepData.gradingInfo}</div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="stepper-actions">
              <button
                type="button"
                className="btn-stepper-nav"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                ← {backButtonText}
              </button>

              <div className="stepper-progress-dots">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`progress-dot ${i === currentStep ? 'is-active' : ''}`}
                    onClick={() => setCurrentStep(i)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="btn-stepper-nav btn-stepper-next"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                {nextButtonText} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
