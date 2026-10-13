/**
 * Contact Form Validation & Toast Notification System
 * Pure Vanilla JavaScript Client-Side Validation with Real-time Feedback & Toasts
 */

class ToastNotification {
  constructor(containerId = 'toast-container') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'info', title = null, duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    let defaultTitle = 'Notification';
    if (type === 'success') {
      icon = '✓';
      defaultTitle = 'Success';
    } else if (type === 'error') {
      icon = '✕';
      defaultTitle = 'Error';
    }

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <div class="toast-title">${title || defaultTitle}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    this.container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, duration);
  }
}

// Global toast instance
window.toastInstance = new ToastNotification();

class ContactFormValidator {
  constructor(formId = 'contact-form') {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.nameInput = document.getElementById('contact-name');
    this.emailInput = document.getElementById('contact-email');
    this.subjectInput = document.getElementById('contact-subject');
    this.messageInput = document.getElementById('contact-message');
    this.submitBtn = document.getElementById('contact-submit-btn');

    this.init();
  }

  init() {
    // Real-time blur and input listeners
    this.nameInput?.addEventListener('input', () => this.validateName());
    this.emailInput?.addEventListener('input', () => this.validateEmail());
    this.subjectInput?.addEventListener('input', () => this.validateSubject());
    this.messageInput?.addEventListener('input', () => this.validateMessage());

    this.nameInput?.addEventListener('blur', () => this.validateName());
    this.emailInput?.addEventListener('blur', () => this.validateEmail());
    this.subjectInput?.addEventListener('blur', () => this.validateSubject());
    this.messageInput?.addEventListener('blur', () => this.validateMessage());

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  validateName() {
    const val = this.nameInput.value.trim();
    if (val.length < 2) {
      this.setError(this.nameInput, 'Please enter your name (at least 2 characters).');
      return false;
    }
    this.setSuccess(this.nameInput);
    return true;
  }

  validateEmail() {
    const val = this.emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) {
      this.setError(this.emailInput, 'Please provide a valid email address (e.g., name@domain.com).');
      return false;
    }
    this.setSuccess(this.emailInput);
    return true;
  }

  validateSubject() {
    const val = this.subjectInput.value.trim();
    if (val.length < 3) {
      this.setError(this.subjectInput, 'Subject must be at least 3 characters.');
      return false;
    }
    this.setSuccess(this.subjectInput);
    return true;
  }

  validateMessage() {
    const val = this.messageInput.value.trim();
    if (val.length < 10) {
      this.setError(this.messageInput, 'Message must be at least 10 characters.');
      return false;
    }
    this.setSuccess(this.messageInput);
    return true;
  }

  setError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const errEl = input.parentElement.querySelector('.error-message');
    if (errEl) errEl.textContent = message;
  }

  setSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errEl = input.parentElement.querySelector('.error-message');
    if (errEl) errEl.textContent = '';
  }

  handleSubmit() {
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isSubjectValid = this.validateSubject();
    const isMessageValid = this.validateMessage();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      window.toastInstance.show('Please resolve the highlighted form errors.', 'error', 'Validation Failed');
      return;
    }

    // Simulate sending with loading state
    const originalText = this.submitBtn.innerHTML;
    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = `
      <span style="display:inline-block; animation:spin 1s linear infinite;">⏳</span> Sending Message...
    `;

    setTimeout(() => {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = originalText;

      // Reset form
      this.form.reset();
      [this.nameInput, this.emailInput, this.subjectInput, this.messageInput].forEach((inp) => {
        inp.classList.remove('is-valid');
      });

      // Show toast
      window.toastInstance.show(
        'Thank you! Your message has been sent successfully. I will get back to you shortly.',
        'success',
        'Message Sent!'
      );
    }, 1200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactFormValidator();
});
