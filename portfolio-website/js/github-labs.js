/**
 * Dynamic GitHub Lab Section Controller
 * Interactive Star & Fork counter with state persistence, micro-feedback,
 * lab category filtering, and specific repository URL routing.
 */

const LAB_REGISTRY = {
  'javascript-interactive-lab': 'https://github.com/AashleshaS/JAVASCRIPT_LAB',
  'compiler-construction-lex-lab': 'https://github.com/AashleshaS/Compiler-Construction-Lab',
  'operating-systems-lab': 'https://github.com/AashleshaS/Operating-Systems-Lab',
  'dbms-sql-plsql-lab': 'https://github.com/AashleshaS/DBMS-LAB-SEM-4',
  'java-oop-concurrent-lab': 'https://github.com/AashleshaS/Java-SEM4',
  'dsa-algorithms-lab': 'https://github.com/AashleshaS/Design-and-Analysis-of-Algorithms-Lab',
  'machine-learning-scikit-lab': 'https://github.com/AashleshaS/Machine-Learning-Lab',
  'python-programming-foundations-lab': 'https://github.com/AashleshaS/Programming-and-problem-Solving-in-Python'
};

class GitHubLabsController {
  constructor() {
    this.starButtons = document.querySelectorAll('.interactive-star-btn');
    this.filterButtons = document.querySelectorAll('.labs-filter-nav .filter-chip-btn');
    this.repoCards = document.querySelectorAll('.github-repo-card');
    this.storageKey = 'ashlesha_portfolio_github_stars';
    this.starredRepos = this.loadStars();

    this.initStars();
    this.initFilters();
    this.initLabRepoLinks();
  }

  loadStars() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveStars() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.starredRepos));
    } catch (e) {
      console.warn('LocalStorage unavailable');
    }
  }

  /**
   * Dynamically attaches and verifies specific lab repository URLs on the GitHub buttons,
   * guaranteeing that clicking them opens that specific lab's dedicated repository.
   */
  initLabRepoLinks() {
    this.repoCards.forEach((card) => {
      const starBtn = card.querySelector('.interactive-star-btn');
      const repoId = card.dataset.repoId || (starBtn && starBtn.dataset.repoId);
      const specificUrl = card.dataset.repoUrl || (repoId && LAB_REGISTRY[repoId]);

      const githubBtn = card.querySelector('.lab-github-link, .lab-github-btn, .repo-actions a');
      if (githubBtn && specificUrl) {
        githubBtn.setAttribute('href', specificUrl);
        githubBtn.setAttribute('target', '_blank');
        githubBtn.setAttribute('rel', 'noopener noreferrer');

        githubBtn.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
    });
  }

  initStars() {
    this.starButtons.forEach((btn) => {
      const repoId = btn.dataset.repoId;
      const countEl = btn.querySelector('.star-count');
      let baseCount = parseInt(countEl?.textContent, 10) || 0;

      // Restore user starred state
      if (this.starredRepos[repoId]) {
        btn.classList.add('starred');
        if (countEl) countEl.textContent = baseCount + 1;
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isStarred = btn.classList.contains('starred');
        let currentCount = parseInt(countEl?.textContent, 10) || 0;

        if (isStarred) {
          // Unstar
          btn.classList.remove('starred');
          if (countEl) countEl.textContent = Math.max(0, currentCount - 1);
          delete this.starredRepos[repoId];
          if (window.toastInstance) {
            window.toastInstance.show('Unstarred repository', 'info');
          }
        } else {
          // Star
          btn.classList.add('starred');
          if (countEl) countEl.textContent = currentCount + 1;
          this.starredRepos[repoId] = true;
          // Pulse scale animation
          btn.style.transform = 'scale(1.2)';
          setTimeout(() => { btn.style.transform = ''; }, 200);

          if (window.toastInstance) {
            window.toastInstance.show(`Starred ${repoId}! Thanks for the support ⭐`, 'success');
          }
        }

        this.saveStars();
      });
    });
  }

  initFilters() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.labFilter || 'all';

        this.repoCards.forEach((card) => {
          if (cat === 'all' || card.dataset.labCategory === cat) {
            card.style.display = 'flex';
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
  new GitHubLabsController();
});
