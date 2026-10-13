/**
 * Dynamic GPA Meter & Animated Progress Bars Controller
 * Uses IntersectionObserver to trigger smooth percentage fills when scrolled into view
 */
class GpaAndSkillsAnimator {
  constructor() {
    this.gpaCircle = document.querySelector('.gpa-meter-bar');
    this.gpaDisplay = document.querySelector('.gpa-value-display');
    this.gpaScaleText = document.querySelector('.gpa-scale');
    this.gpaTabButtons = document.querySelectorAll('.gpa-tab-btn');

    this.currentMode = '10.0'; // Default to 10.0 CGPA as in university curriculum
    this.gpaValues = {
      '10.0': { value: 8.45, max: 10.0, text: '8.45', scale: '/ 10.00 Cumulative CGPA' },
      '4.0': { value: 3.38, max: 4.0, text: '3.38', scale: '/ 4.00 US Scale Equivalent' }
    };

    this.circumference = 2 * Math.PI * 90; // r = 90 => ~565.48

    this.initGpaTabs();
    this.initObservers();
  }

  initGpaTabs() {
    this.gpaTabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.gpaTabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentMode = btn.dataset.scale;
        this.animateGpa();
      });
    });
  }

  animateGpa() {
    if (!this.gpaCircle || !this.gpaDisplay) return;

    const config = this.gpaValues[this.currentMode];
    const percentage = config.value / config.max;
    const offset = this.circumference - percentage * this.circumference;

    // Animate SVG stroke
    this.gpaCircle.style.strokeDashoffset = offset;
    if (this.gpaScaleText) {
      this.gpaScaleText.textContent = config.scale;
    }

    // Number roll-up animation
    let startVal = 0;
    const targetVal = config.value;
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = (startVal + (targetVal - startVal) * easeProgress).toFixed(2);
      this.gpaDisplay.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        this.gpaDisplay.textContent = config.text;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  initObservers() {
    // Observer for GPA Widget
    const gpaCard = document.querySelector('.gpa-widget-card');
    if (gpaCard) {
      const gpaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateGpa();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      gpaObserver.observe(gpaCard);
    }


    // Observer for About Stats Counters
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length > 0) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateStatCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      statCards.forEach((stat) => statsObserver.observe(stat));
    }
  }

  animateStatCounter(counterEl) {
    const target = parseInt(counterEl.dataset.target, 10) || 0;
    const duration = 1500;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);
      counterEl.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counterEl.textContent = target;
      }
    };

    requestAnimationFrame(update);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GpaAndSkillsAnimator();
});
