// =====================================================
// Medicare — Shared JS Utilities (Sequential Flow)
// =====================================================

const API_BASE = '';

// ---------- Auth Token Management ----------
function getToken() {
  return localStorage.getItem('sc_token');
}

function setToken(token) {
  localStorage.setItem('sc_token', token);
}

function getUser() {
  const data = localStorage.getItem('sc_user');
  return data ? JSON.parse(data) : null;
}

function setUser(user) {
  localStorage.setItem('sc_user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('sc_token');
  localStorage.removeItem('sc_user');
  localStorage.removeItem('sc_last_result');
  window.location.href = '/login';
}

function isLoggedIn() {
  return !!getToken();
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

// ---------- Auth Guard ----------
// All pages except login require authentication
function requireAuth() {
  const currentPage = window.location.pathname;
  const publicPages = ['/login', '/'];

  if (!publicPages.includes(currentPage) && !isLoggedIn()) {
    showToast('Please login to continue', 'warning');
    setTimeout(() => { window.location.href = '/login'; }, 500);
    return false;
  }

  // If on login page and already logged in, go to checker
  if (currentPage === '/login' && isLoggedIn()) {
    window.location.href = '/checker';
    return false;
  }

  return true;
}

// ---------- Sequential Flow Steps ----------
const FLOW_STEPS = [
  { path: '/checker', label: 'Symptom Checker', icon: '🩺', step: 1 },
  { path: '/result', label: 'Diagnosis Result', icon: '📋', step: 2 },
  { path: '/doctors', label: 'Find Doctors', icon: '👨‍⚕️', step: 3 },
  { path: '/history', label: 'Medical History', icon: '📊', step: 4 }
];

function getCurrentStep() {
  const current = window.location.pathname;
  const step = FLOW_STEPS.find(s => s.path === current);
  return step ? step.step : 0;
}

// ---------- API Calls ----------
async function apiCall(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        logout();
        return;
      }
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      throw new Error('Unable to connect to server. Please make sure the server is running.');
    }
    throw err;
  }
}

// ---------- Toast Notifications ----------
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ---------- Step Progress Bar ----------
function buildStepProgress() {
  const currentStep = getCurrentStep();
  if (currentStep === 0) return '';

  return `
    <div class="step-progress-bar">
      ${FLOW_STEPS.map(s => `
        <div class="step-progress-item ${s.step === currentStep ? 'active' : ''} ${s.step < currentStep ? 'completed' : ''}">
          <div class="step-progress-dot">${s.step < currentStep ? '✓' : s.step}</div>
          <span class="step-progress-label">${s.label}</span>
        </div>
        ${s.step < FLOW_STEPS.length ? '<div class="step-progress-line ' + (s.step < currentStep ? 'completed' : '') + '"></div>' : ''}
      `).join('')}
    </div>
  `;
}

// ---------- Navbar Injection ----------
function initNavbar() {
  const user = getUser();
  const currentPage = window.location.pathname;

  // Don't show navbar on login page
  if (currentPage === '/login' || currentPage === '/') return;

  const isActive = (path) => currentPage === path ? 'active' : '';

  const adminLink = user && user.role === 'admin'
    ? `<a href="/admin" class="${isActive('/admin')}">Admin</a>`
    : '';

  const navHTML = `
    <nav class="navbar" id="mainNav">
      <div class="nav-container">
        <a href="/checker" class="nav-logo">
          <div class="nav-logo-icon">🏥</div>
          <span>Medicare <small style="font-weight:500;font-size:0.65em;opacity:0.7;">Symptom Analysis</small></span>
        </a>
        <div class="nav-links" id="navLinks">
          <a href="/checker" class="${isActive('/checker')}">🩺 Symptom Checker</a>
          <a href="/result" class="${isActive('/result')}">📋 Results</a>
          <a href="/doctors" class="${isActive('/doctors')}">👨‍⚕️ Doctors</a>
          <a href="/history" class="${isActive('/history')}">📊 History</a>
          ${adminLink}
        </div>
        <div class="nav-auth">
          <div class="nav-user-badge">
            <div class="nav-user-avatar">${user && user.name ? user.name[0].toUpperCase() : 'U'}</div>
            <span>${user ? user.name || 'User' : 'Guest'}</span>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="logout()">Logout</button>
        </div>
        <div class="hamburger" id="hamburger" onclick="toggleMobileNav()">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Add step progress bar after navbar
  const stepBar = buildStepProgress();
  if (stepBar) {
    const stepContainer = document.createElement('div');
    stepContainer.style.cssText = 'max-width:740px;margin:0 auto;padding:calc(var(--nav-height) + 16px) 24px 0;';
    stepContainer.innerHTML = stepBar;
    document.body.insertBefore(stepContainer, document.body.children[1]);
  }

  // Scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }
  });
}

function toggleMobileNav() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// ---------- Footer Injection ----------
function initFooter() {
  const currentPage = window.location.pathname;
  // Don't show footer on login page
  if (currentPage === '/login' || currentPage === '/') return;

  const footerHTML = `
    <footer class="footer">
      <div class="footer-container">
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// ---------- Init on DOM Ready ----------
document.addEventListener('DOMContentLoaded', () => {
  if (requireAuth()) {
    initNavbar();
    initFooter();
  }
});

// ---------- Utilities ----------
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function getDateParts(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
    year: d.getFullYear()
  };
}

function symptomIdToLabel(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
