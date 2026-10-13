/**
 * Main Application Orchestrator
 * ScrollSpy, Header Blur, Mobile Drawer, Theme Switcher, Skills Category Filter, Back to Top, Profile Photo Upload
 */

class PortfolioApp {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.mobileToggle = document.querySelector('.mobile-nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.backToTopBtn = document.getElementById('back-to-top-btn');
    this.themeButtons = document.querySelectorAll('.color-dot-btn');

    this.init();
  }

  init() {
    this.initScrollEvents();
    this.initMobileMenu();
    this.initThemeSwitcher();
    this.initSkillsFilter();
  }

  initScrollEvents() {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      // Header glassmorphism blur toggle
      if (scrollY > 50) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }

      // Back to top button visibility
      if (scrollY > 400) {
        this.backToTopBtn?.classList.add('visible');
      } else {
        this.backToTopBtn?.classList.remove('visible');
      }

      // ScrollSpy Active Link Update
      this.updateActiveNavLink(scrollY);
    });

    // Back to top click
    this.backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  updateActiveNavLink(scrollY) {
    const headerHeight = 90;

    this.sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  initMobileMenu() {
    if (!this.mobileToggle || !this.navMenu) return;

    this.mobileToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
      const expanded = this.navMenu.classList.contains('active');
      this.mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking link
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
        this.mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  initThemeSwitcher() {
    const root = document.documentElement;

    this.themeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.themeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const theme = btn.dataset.theme;

        if (theme === 'cyan') {
          root.style.setProperty('--accent-cyan', '#06B6D4');
          root.style.setProperty('--accent-cyan-light', '#22D3EE');
          root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)');
          if (window.canvasBgInstance) window.canvasBgInstance.setThemeColor('cyan');
        } else if (theme === 'violet') {
          root.style.setProperty('--accent-cyan', '#8B5CF6');
          root.style.setProperty('--accent-cyan-light', '#A78BFA');
          root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)');
          if (window.canvasBgInstance) window.canvasBgInstance.setThemeColor('violet');
        } else if (theme === 'emerald') {
          root.style.setProperty('--accent-cyan', '#10B981');
          root.style.setProperty('--accent-cyan-light', '#34D399');
          root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)');
          if (window.canvasBgInstance) window.canvasBgInstance.setThemeColor('emerald');
        }

        if (window.toastInstance) {
          window.toastInstance.show(`Theme updated to ${theme.toUpperCase()} accent!`, 'info', 'Theme Switcher');
        }
      });
    });
  }

  initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skills-filter-nav .filter-chip-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.skillCat || 'all';

        skillCards.forEach((card) => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = 'block';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 200);
          }
        });
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
