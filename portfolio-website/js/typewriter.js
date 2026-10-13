/**
 * Dynamic Typewriter Text Animation
 * Smoothly loops through developer titles with realistic typing cadence
 */
class TypewriterEffect {
  constructor(elementId, words, options = {}) {
    this.el = document.getElementById(elementId);
    if (!this.el) return;

    this.words = words || [
      'AIML',
      'Agentic AI',
      'Geospatial Data Science'
    ];
    this.typeSpeed = options.typeSpeed || 85;
    this.deleteSpeed = options.deleteSpeed || 45;
    this.pauseDelay = options.pauseDelay || 1800;

    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;

    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex % this.words.length];

    if (this.isDeleting) {
      this.txt = currentWord.substring(0, this.txt.length - 1);
    } else {
      this.txt = currentWord.substring(0, this.txt.length + 1);
    }

    this.el.textContent = this.txt;

    let delta = this.typeSpeed;

    if (this.isDeleting) {
      delta = this.deleteSpeed;
    }

    if (!this.isDeleting && this.txt === currentWord) {
      delta = this.pauseDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      delta = 450;
    }

    setTimeout(() => this.type(), delta);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TypewriterEffect('typewriter-text', [
    'AIML',
    'Agentic AI',
    'Geospatial Data Science'
  ]);
});
