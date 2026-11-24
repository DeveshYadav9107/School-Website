/**
 * Aurelia Global Academy - Main Application Script
 * Single-Page Application (SPA) Controller & Interactive Features
 */

// Application State
const state = {
  currentView: 'home',
  galleryFilter: 'all',
  currentLightboxIndex: 0,
  filteredGallery: [...AGA_DATA.gallery],
  noticeFilter: 'All',
  testimonialIndex: 0,
  testimonialInterval: null,
  erpLoggedIn: false,
  chatMessages: [
    {
      sender: 'bot',
      text: "Namaste! Welcome to Aurelia Global Academy. I am Aurelia's Admissions Assistant. How may I help you today? You can select a quick question below or type your query.",
      time: formatTime(new Date())
    }
  ]
};

// Helper: Format Time
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Helper: Format Currency to Indian Rupee (INR)
function formatINR(amount) {
  return '₹ ' + Number(amount).toLocaleString('en-IN');
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if available
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set up SPA Routing
  initRouter();

  // Initialize Sections & Interactive Components
  initNoticeBoard();
  initUpcomingEvents();
  initGallery();
  initTestimonials();
  initFeeEstimator();
  initEnquiryForm();
  initMandatoryDisclosure();
  initErpPortal();
  initChatWidget();
  initTourBooking();
  initNewsletter();

  // Global Keyboard Navigation
  document.addEventListener('keydown', handleGlobalKeydown);
});

/* ==========================================================================
   SPA ROUTER & NAVIGATION
   ========================================================================== */
function initRouter() {
  // Handle Hash Change
  window.addEventListener('hashchange', handleHashRouting);

  // Check initial hash
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateTo(initialHash, false);

  // Mobile menu drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden');
    });
  }

  if (closeMobileMenuBtn && mobileDrawer) {
    closeMobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });
}

function handleHashRouting() {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash, false);
}

function navigateTo(viewName, updateHash = true) {
  const validViews = ['home', 'about', 'academics', 'admissions', 'gallery', 'disclosure', 'contact'];
  const targetView = validViews.includes(viewName) ? viewName : 'home';

  state.currentView = targetView;

  if (updateHash) {
    window.location.hash = targetView;
  }

  // Toggle active view container
  validViews.forEach(view => {
    const el = document.getElementById(`view-${view}`);
    if (el) {
      if (view === targetView) {
        el.classList.remove('hidden');
        el.classList.add('block');
      } else {
        el.classList.add('hidden');
        el.classList.remove('block');
      }
    }
  });

  // Update Navigation Highlighting
  document.querySelectorAll('.nav-link').forEach(link => {
    const viewAttr = link.getAttribute('data-view');
    if (viewAttr === targetView) {
      link.classList.add('text-gold-500', 'font-semibold');
      link.classList.remove('text-slate-300', 'text-slate-600');
    } else {
      link.classList.remove('text-gold-500', 'font-semibold');
      link.classList.add('text-slate-300');
    }
  });

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   NOTICE BOARD & UPCOMING EVENTS
   ========================================================================== */
function initNoticeBoard() {
  const container = document.getElementById('notices-list');
  const filterButtons = document.querySelectorAll('.notice-filter-btn');

  function renderNotices(category = 'All') {
    if (!container) return;

    const filtered = category === 'All'
      ? AGA_DATA.notices
      : AGA_DATA.notices.filter(n => n.category.toLowerCase() === category.toLowerCase());

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 text-slate-500">
          <p class="text-sm">No circulars found for this category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(notice => `
      <div onclick="openNoticeModal('${notice.id}')" 
           class="group p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 bg-navy-50 text-navy-800 rounded-lg flex flex-col items-center justify-center border border-navy-100 group-hover:bg-gold-50 group-hover:border-gold-300 transition-colors">
          <span class="text-xs font-bold uppercase leading-none">${notice.date.split(' ')[1]}</span>
          <span class="text-base font-extrabold leading-none mt-1 text-gold-600">${notice.date.split(' ')[0]}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <span class="px-2 py-0.5 text-xs font-medium rounded-full ${
              notice.badge === 'High Priority' ? 'bg-red-100 text-red-700 font-semibold' :
              notice.badge === 'Competition' ? 'bg-purple-100 text-purple-700' :
              notice.badge === 'PTM' ? 'bg-blue-100 text-blue-700' :
              'bg-slate-100 text-slate-700'
            }">${notice.badge}</span>
            <span class="text-xs text-slate-600 font-medium">${notice.category}</span>
            ${notice.isNew ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white animate-pulse">NEW</span>' : ''}
          </div>
          <h4 class="text-sm font-semibold text-slate-900 group-hover:text-navy-800 transition-colors line-clamp-2">
            ${notice.title}
          </h4>
          <p class="text-xs text-slate-600 mt-1 line-clamp-1">${notice.summary}</p>
        </div>
        <div class="text-slate-400 group-hover:text-gold-500 transition-colors self-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
      </div>
    `).join('');
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-navy-800', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });
      btn.classList.add('bg-navy-800', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const cat = btn.getAttribute('data-category') || 'All';
      state.noticeFilter = cat;
      renderNotices(cat);
    });
  });

  renderNotices('All');
}

function openNoticeModal(noticeId) {
  const notice = AGA_DATA.notices.find(n => n.id === noticeId);
  if (!notice) return;

  const modal = document.getElementById('notice-modal');
  const modalContent = document.getElementById('notice-modal-body');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <!-- Official CBSE Circular Header -->
    <div class="border-b-2 border-navy-800 pb-4 mb-5 text-center">
      <div class="flex items-center justify-center gap-3 mb-2">
        <div class="w-10 h-10 text-navy-800">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
            <path d="M50 5 L85 20 V50 C85 75 50 95 50 95 C50 95 15 75 15 50 V20 L50 5Z" fill="#0F2547" stroke="#D99B26" stroke-width="3"/>
            <path d="M30 45 Q50 35 70 45 V68 Q50 58 30 68 Z" fill="#FFFFFF"/>
            <circle cx="50" cy="30" r="10" fill="#D99B26"/>
          </svg>
        </div>
        <div class="text-left">
          <h2 class="text-lg font-bold text-navy-800 tracking-tight leading-none">${AGA_DATA.school.name}</h2>
          <p class="text-[11px] text-slate-500 font-medium">CBSE Affiliation No. ${AGA_DATA.school.affiliationNo} | School Code: ${AGA_DATA.school.schoolCode}</p>
        </div>
      </div>
      <p class="text-xs text-slate-500">${AGA_DATA.school.address}</p>
      <div class="mt-3 inline-block bg-navy-50 text-navy-900 px-4 py-1 rounded text-xs font-bold uppercase tracking-wider border border-navy-200">
        Official School Circular
      </div>
    </div>

    <!-- Meta Details -->
    <div class="flex justify-between items-center text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
      <div><strong>Circular Ref:</strong> ${notice.id}</div>
      <div><strong>Date of Issuance:</strong> ${notice.date}</div>
      <div><strong>Category:</strong> ${notice.category}</div>
    </div>

    <!-- Subject & Title -->
    <div class="mb-4">
      <span class="text-xs font-bold uppercase text-gold-600 tracking-wide">Subject:</span>
      <h3 class="text-base font-bold text-slate-900 mt-0.5">${notice.title}</h3>
    </div>

    <!-- Circular Body -->
    <div class="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
      ${notice.content}
    </div>

    <!-- Official Authority Signature -->
    <div class="border-t border-slate-200 pt-4 flex justify-between items-end">
      <div class="text-xs text-slate-500">
        <p>Aurelia Global Academy Portal Copy</p>
        <p>Verified & Dispatched to Registered Parents</p>
      </div>
      <div class="text-right">
        <div class="font-serif-signature text-xl text-navy-800 italic font-semibold">Dr. Meera Krishnan</div>
        <p class="text-xs font-bold text-slate-800">Principal</p>
        <p class="text-[10px] text-slate-500">Aurelia Global Academy, Gurugram</p>
      </div>
    </div>
  `;

  openModal('notice-modal');
}

function initUpcomingEvents() {
  const container = document.getElementById('events-list');
  if (!container) return;

  container.innerHTML = AGA_DATA.events.map(event => `
    <div class="p-4 bg-white border border-slate-200 rounded-xl hover:border-gold-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-start gap-4">
        <div class="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 text-white rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-sm border-2 border-gold-400">
          <span class="text-[10px] font-bold uppercase text-gold-300 tracking-wider">${event.month}</span>
          <span class="text-xl font-extrabold leading-none text-white">${event.date}</span>
        </div>
        <div>
          <span class="inline-block px-2 py-0.5 text-[11px] font-semibold text-navy-800 bg-navy-50 rounded-full mb-1">${event.category}</span>
          <h4 class="text-sm font-bold text-slate-900 hover:text-navy-800 transition-colors">${event.title}</h4>
          <div class="flex items-center gap-3 text-xs text-slate-600 mt-1 flex-wrap">
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              ${event.time}
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              ${event.venue}
            </span>
          </div>
          <p class="text-xs text-slate-600 mt-1.5">${event.description}</p>
        </div>
      </div>
      <button onclick="addEventReminder('${event.id}')" 
              class="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold text-navy-800 bg-gold-50 border border-gold-300 rounded-lg hover:bg-gold-500 hover:text-white transition-colors flex items-center justify-center gap-1.5 flex-shrink-0">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        Add Reminder
      </button>
    </div>
  `).join('');
}

function addEventReminder(eventId) {
  const event = AGA_DATA.events.find(e => e.id === eventId);
  if (!event) return;

  showToast(`Reminder saved: "${event.title}" on ${event.date} ${event.month} ${event.year}.`, 'success');
}

/* ==========================================================================
   CAMPUS & FILTERABLE GALLERY WITH LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  renderGalleryGrid('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-navy-800', 'text-white', 'shadow');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-navy-800', 'text-white', 'shadow');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      const filter = btn.getAttribute('data-filter') || 'all';
      state.galleryFilter = filter;
      renderGalleryGrid(filter);
    });
  });
}

function renderGalleryGrid(filter = 'all') {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  state.filteredGallery = filter === 'all'
    ? AGA_DATA.gallery
    : AGA_DATA.gallery.filter(item => item.category === filter);

  container.innerHTML = state.filteredGallery.map((item, index) => `
    <div onclick="openLightbox(${index})"
         class="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-900 cursor-pointer aspect-[4/3]">
      <img src="${item.thumb}" 
           alt="${item.title}" 
           loading="lazy"
           onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'"
           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"/>
      <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
      
      <div class="absolute top-3 left-3">
        <span class="px-2.5 py-1 text-xs font-semibold bg-white/90 backdrop-blur-md text-navy-900 rounded-full shadow">
          ${item.categoryLabel}
        </span>
      </div>

      <div class="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
        <h4 class="text-white font-bold text-sm sm:text-base leading-snug drop-shadow">${item.title}</h4>
        <p class="text-xs text-slate-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">${item.caption}</p>
        <div class="mt-2 flex items-center text-gold-400 text-xs font-semibold gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Click to enlarge</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </div>
      </div>
    </div>
  `).join('');
}

function openLightbox(index) {
  state.currentLightboxIndex = index;
  updateLightboxContent();
  openModal('gallery-lightbox-modal');
}

function updateLightboxContent() {
  const item = state.filteredGallery[state.currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');
  const badgeEl = document.getElementById('lightbox-badge');
  const counterEl = document.getElementById('lightbox-counter');

  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.title;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (captionEl) captionEl.textContent = item.caption;
  if (badgeEl) badgeEl.textContent = item.categoryLabel;
  if (counterEl) {
    counterEl.textContent = `${state.currentLightboxIndex + 1} / ${state.filteredGallery.length}`;
  }
}

function nextLightboxImage() {
  if (state.filteredGallery.length === 0) return;
  state.currentLightboxIndex = (state.currentLightboxIndex + 1) % state.filteredGallery.length;
  updateLightboxContent();
}

function prevLightboxImage() {
  if (state.filteredGallery.length === 0) return;
  state.currentLightboxIndex = (state.currentLightboxIndex - 1 + state.filteredGallery.length) % state.filteredGallery.length;
  updateLightboxContent();
}

/* ==========================================================================
   TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonials() {
  renderTestimonial(0);

  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      state.testimonialIndex = (state.testimonialIndex - 1 + AGA_DATA.testimonials.length) % AGA_DATA.testimonials.length;
      renderTestimonial(state.testimonialIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      state.testimonialIndex = (state.testimonialIndex + 1) % AGA_DATA.testimonials.length;
      renderTestimonial(state.testimonialIndex);
    });
  }

  // Auto rotate every 7 seconds
  startTestimonialAutoplay();
}

function startTestimonialAutoplay() {
  if (state.testimonialInterval) clearInterval(state.testimonialInterval);
  state.testimonialInterval = setInterval(() => {
    state.testimonialIndex = (state.testimonialIndex + 1) % AGA_DATA.testimonials.length;
    renderTestimonial(state.testimonialIndex);
  }, 7000);
}

function renderTestimonial(index) {
  const item = AGA_DATA.testimonials[index];
  if (!item) return;

  const quoteEl = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  const desigEl = document.getElementById('testimonial-designation');
  const parentOfEl = document.getElementById('testimonial-parentof');
  const avatarEl = document.getElementById('testimonial-avatar');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (quoteEl) quoteEl.textContent = `“${item.quote}”`;
  if (authorEl) authorEl.textContent = item.author;
  if (desigEl) desigEl.textContent = item.designation;
  if (parentOfEl) parentOfEl.textContent = item.parentOf;
  if (avatarEl) {
    avatarEl.src = item.avatar;
    avatarEl.alt = item.author;
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = AGA_DATA.testimonials.map((_, i) => `
      <button onclick="setTestimonial(${i})" class="w-3 h-3 rounded-full transition-all ${
        i === index ? 'bg-gold-500 w-8' : 'bg-slate-300 hover:bg-slate-400'
      }" aria-label="Go to testimonial ${i + 1}"></button>
    `).join('');
  }
}

function setTestimonial(index) {
  state.testimonialIndex = index;
  renderTestimonial(index);
  startTestimonialAutoplay();
}

/* ==========================================================================
   INTERACTIVE ANNUAL FEE ESTIMATOR
   ========================================================================== */
function initFeeEstimator() {
  const gradeSelect = document.getElementById('calc-grade');
  const transportSelect = document.getElementById('calc-transport');
  const mealCheckbox = document.getElementById('calc-meal');
  const sportsCheckbox = document.getElementById('calc-sports');

  function calculateFee() {
    if (!gradeSelect || !transportSelect) return;

    const gradeKey = gradeSelect.value || 'primary';
    const transportKey = transportSelect.value || 'none';
    const isMealSelected = mealCheckbox ? mealCheckbox.checked : false;
    const isSportsSelected = sportsCheckbox ? sportsCheckbox.checked : false;

    const gradeData = AGA_DATA.feeSchedule.grades[gradeKey] || AGA_DATA.feeSchedule.grades.primary;
    const transportFee = (AGA_DATA.feeSchedule.transport[transportKey] || { fee: 0 }).fee;
    const mealFee = isMealSelected ? AGA_DATA.feeSchedule.addons.meals.fee : 0;
    const sportsFee = isSportsSelected ? AGA_DATA.feeSchedule.addons.sportsAcademy.fee : 0;

    const tuition = gradeData.tuition;
    const development = gradeData.development;
    const activity = gradeData.activity;
    const admissionOneTime = gradeData.admissionOneTime;

    const totalAnnual = tuition + development + activity + transportFee + mealFee + sportsFee;
    const quarterlyEstimate = Math.round(totalAnnual / 4);

    // Update UI elements
    updateElementText('fee-tuition', formatINR(tuition));
    updateElementText('fee-development', formatINR(development));
    updateElementText('fee-activity', formatINR(activity));
    updateElementText('fee-transport', formatINR(transportFee));
    updateElementText('fee-addons', formatINR(mealFee + sportsFee));
    updateElementText('fee-total-annual', formatINR(totalAnnual));
    updateElementText('fee-quarterly', formatINR(quarterlyEstimate));
    updateElementText('fee-admission-onetime', formatINR(admissionOneTime));
  }

  function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  if (gradeSelect) gradeSelect.addEventListener('change', calculateFee);
  if (transportSelect) transportSelect.addEventListener('change', calculateFee);
  if (mealCheckbox) mealCheckbox.addEventListener('change', calculateFee);
  if (sportsCheckbox) sportsCheckbox.addEventListener('change', calculateFee);

  // Initial calculation
  calculateFee();

  // "Apply with this Estimate" button
  const applyEstimateBtn = document.getElementById('apply-with-estimate-btn');
  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const selectedGrade = gradeSelect ? gradeSelect.value : 'primary';
      const formGradeSelect = document.getElementById('enquiry-grade');
      if (formGradeSelect) {
        formGradeSelect.value = selectedGrade;
      }
      const formSection = document.getElementById('admission-form-card');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Selected grade transferred to admission enquiry form.', 'info');
      }
    });
  }
}

/* ==========================================================================
   ONLINE ADMISSION ENQUIRY FORM
   ========================================================================== */
function initEnquiryForm() {
  const form = document.getElementById('admission-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Field values
    const studentName = document.getElementById('enquiry-student-name').value.trim();
    const dob = document.getElementById('enquiry-dob').value;
    const grade = document.getElementById('enquiry-grade').value;
    const parentName = document.getElementById('enquiry-parent-name').value.trim();
    const mobile = document.getElementById('enquiry-mobile').value.trim();
    const email = document.getElementById('enquiry-email').value.trim();
    const area = document.getElementById('enquiry-area').value.trim();
    const comments = document.getElementById('enquiry-comments').value.trim();

    // Validation
    if (!studentName || !dob || !grade || !parentName || !mobile || !email) {
      showToast('Please fill all mandatory fields marked with an asterisk (*).', 'error');
      return;
    }

    // Phone validation (10 digits Indian)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanMobile = mobile.replace(/[^0-9]/g, '').slice(-10);
    if (!phoneRegex.test(cleanMobile)) {
      showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Generate dynamic application reference
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `AGA-2027-${randomNum}`;
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Populate Confirmation Modal
    const refEl = document.getElementById('conf-ref-number');
    const nameEl = document.getElementById('conf-student-name');
    const gradeEl = document.getElementById('conf-grade');
    const parentEl = document.getElementById('conf-parent');
    const mobileEl = document.getElementById('conf-mobile');
    const emailEl = document.getElementById('conf-email');
    const dateEl = document.getElementById('conf-date');

    if (refEl) refEl.textContent = refNumber;
    if (nameEl) nameEl.textContent = studentName;
    if (gradeEl) {
      const gradeLabels = {
        nursery: 'Nursery / KG',
        primary: 'Grades I to V',
        middle: 'Grades VI to VIII',
        secondary: 'Grades IX & X',
        senior_science: 'Grade XI - Science',
        senior_commerce_hum: 'Grade XI - Commerce / Arts'
      };
      gradeEl.textContent = gradeLabels[grade] || grade;
    }
    if (parentEl) parentEl.textContent = parentName;
    if (mobileEl) mobileEl.textContent = '+91 ' + cleanMobile;
    if (emailEl) emailEl.textContent = email;
    if (dateEl) dateEl.textContent = submissionDate;

    // Reset Form
    form.reset();

    // Open Confirmation Modal
    openModal('admission-confirmation-modal');
    showToast(`Application submitted successfully! Ref: ${refNumber}`, 'success');
  });
}

/* ==========================================================================
   CBSE MANDATORY PUBLIC DISCLOSURE MODAL & TABLES
   ========================================================================== */
function initMandatoryDisclosure() {
  const container = document.getElementById('disclosure-documents-tbody');
  if (!container) return;

  container.innerHTML = AGA_DATA.disclosureDocs.map(doc => `
    <tr class="hover:bg-slate-50 border-b border-slate-200 transition-colors">
      <td class="px-4 py-3.5 text-xs font-semibold text-slate-800 text-center">${doc.number}</td>
      <td class="px-4 py-3.5 text-xs text-slate-900 font-medium">${doc.title}</td>
      <td class="px-4 py-3.5 text-xs text-slate-600">${doc.authority}</td>
      <td class="px-4 py-3.5 text-xs text-slate-600 font-mono">${doc.fileNo}</td>
      <td class="px-4 py-3.5 text-xs text-emerald-700 font-medium">${doc.validity}</td>
      <td class="px-4 py-3.5 text-xs text-right whitespace-nowrap">
        <button onclick="openDisclosureDocModal('${doc.id}')" 
                class="inline-flex items-center gap-1 px-3 py-1 bg-navy-800 hover:bg-gold-500 hover:text-white text-white rounded text-xs font-semibold transition-colors shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          View Document
        </button>
      </td>
    </tr>
  `).join('');
}

function openDisclosureDocModal(docId) {
  const doc = AGA_DATA.disclosureDocs.find(d => d.id === docId);
  if (!doc) return;

  const modalBody = document.getElementById('disclosure-modal-body');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <!-- Official Certificate Simulation -->
    <div class="border-4 border-double border-navy-800 p-6 bg-amber-50/30 rounded-xl relative overflow-hidden">
      <!-- Watermark -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <span class="text-7xl font-extrabold text-navy-950 uppercase rotate-[-25deg]">AURELIA ACADEMY</span>
      </div>

      <div class="text-center pb-4 border-b border-navy-300 mb-4">
        <p class="text-xs uppercase tracking-widest text-slate-500 font-bold">${doc.authority}</p>
        <h2 class="text-xl font-bold text-navy-800 font-heading mt-1">${doc.title}</h2>
        <p class="text-xs text-slate-500 mt-1">Official Mandatory Public Document for CBSE Affiliation Compliance</p>
      </div>

      <div class="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
        <div><strong>Certificate / Order No:</strong> <span class="font-mono text-navy-800 font-bold">${doc.fileNo}</span></div>
        <div><strong>Date of Issuance:</strong> <span>${doc.date}</span></div>
        <div><strong>Issued In Favor Of:</strong> <span class="font-bold text-slate-800">Aurelia Global Academy</span></div>
        <div><strong>Status & Validity:</strong> <span class="text-emerald-700 font-bold">${doc.validity}</span></div>
      </div>

      <div class="text-sm text-slate-700 leading-relaxed space-y-3 mb-6 bg-white p-5 rounded-lg border border-slate-200">
        <p><strong>Compliance Summary:</strong></p>
        <p>${doc.summary}</p>
        <p class="text-xs text-slate-500 leading-normal">
          This document has been scrutinized and verified as part of the CBSE Mandatory Public Disclosure norms under Appendix-IX. The physical original copy is preserved at the school registrar archives and is available for physical inspection upon lawful request.
        </p>
      </div>

      <!-- Stamp and Signatures -->
      <div class="flex justify-between items-end border-t border-slate-200 pt-4">
        <div class="text-center">
          <div class="w-16 h-16 border-2 border-emerald-600 text-emerald-700 rounded-full flex flex-col items-center justify-center p-1 text-[8px] font-bold uppercase rotate-[-12deg] mx-auto bg-emerald-50">
            <span>GOVT SEAL</span>
            <span class="text-[7px]">VERIFIED</span>
            <span class="text-[6px]">GURUGRAM</span>
          </div>
          <p class="text-[10px] text-slate-500 mt-1">Official Registry Stamp</p>
        </div>
        
        <div class="text-right">
          <div class="inline-block p-1 bg-white border border-slate-200 rounded mb-1">
            <svg class="w-12 h-12 text-slate-800" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="20" height="20"/>
              <rect x="70" y="10" width="20" height="20"/>
              <rect x="10" y="70" width="20" height="20"/>
              <rect x="40" y="20" width="10" height="10"/>
              <rect x="40" y="40" width="20" height="20"/>
              <rect x="20" y="40" width="10" height="10"/>
              <rect x="70" y="40" width="10" height="20"/>
              <rect x="40" y="70" width="10" height="10"/>
              <rect x="60" y="70" width="20" height="20"/>
            </svg>
          </div>
          <p class="text-[10px] text-slate-400 font-mono">CBSE-VERIFIED-QR</p>
        </div>
      </div>
    </div>
  `;

  openModal('disclosure-doc-modal');
}

/* ==========================================================================
   PARENT ERP PORTAL MODAL (DEMO MODE)
   ========================================================================== */
function initErpPortal() {
  const loginForm = document.getElementById('erp-login-form');
  const demoFillBtn = document.getElementById('erp-demo-fill-btn');
  const logoutBtn = document.getElementById('erp-logout-btn');

  // Trigger login modal from buttons
  document.querySelectorAll('.open-erp-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('erp-portal-modal');
    });
  });

  // Demo Autofill Button
  if (demoFillBtn) {
    demoFillBtn.addEventListener('click', () => {
      const userEl = document.getElementById('erp-username');
      const passEl = document.getElementById('erp-password');
      if (userEl) userEl.value = AGA_DATA.erpDemoUser.username;
      if (passEl) passEl.value = AGA_DATA.erpDemoUser.password;
      showToast('Demo parent credentials filled. Click "Sign In" to enter.', 'info');
    });
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userEl = document.getElementById('erp-username');
      const passEl = document.getElementById('erp-password');

      const username = userEl ? userEl.value.trim() : '';
      const password = passEl ? passEl.value.trim() : '';

      if (!username || !password) {
        showToast('Please enter Parent ID and Password or click "Fill Demo Credentials".', 'error');
        return;
      }

      // Simulate authentication
      state.erpLoggedIn = true;
      renderErpDashboard();
      showToast(`Welcome back, Sharma family! Accessing ${AGA_DATA.erpDemoUser.student.name}'s records.`, 'success');
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.erpLoggedIn = false;
      const loginView = document.getElementById('erp-login-view');
      const dashView = document.getElementById('erp-dashboard-view');
      if (loginView) loginView.classList.remove('hidden');
      if (dashView) dashView.classList.add('hidden');
      showToast('Successfully logged out of Parent ERP.', 'info');
    });
  }
}

function renderErpDashboard() {
  const loginView = document.getElementById('erp-login-view');
  const dashView = document.getElementById('erp-dashboard-view');

  if (loginView) loginView.classList.add('hidden');
  if (dashView) dashView.classList.remove('hidden');

  const stu = AGA_DATA.erpDemoUser.student;

  // Student Profile Card
  updateElementText('erp-stu-name', stu.name);
  updateElementText('erp-stu-adm', stu.admissionNo);
  updateElementText('erp-stu-grade', stu.grade);
  updateElementText('erp-stu-roll', stu.rollNo);
  updateElementText('erp-stu-house', stu.house);
  updateElementText('erp-stu-att', `${stu.attendancePercent}% (${stu.presentDays}/${stu.totalWorkingDays} Days)`);
  updateElementText('erp-stu-gpa', stu.gpa);
  updateElementText('erp-stu-mentor', stu.classTeacher);

  // Fee History Table
  const feeTbody = document.getElementById('erp-fee-tbody');
  if (feeTbody) {
    feeTbody.innerHTML = AGA_DATA.erpDemoUser.feeHistory.map(item => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td class="py-2.5 px-3 text-xs font-semibold text-slate-800">${item.term}</td>
        <td class="py-2.5 px-3 text-xs font-bold text-slate-900">${item.amount}</td>
        <td class="py-2.5 px-3 text-xs">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            item.status.includes('Paid') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
          }">${item.status}</span>
        </td>
        <td class="py-2.5 px-3 text-xs text-slate-500 font-mono">${item.receiptNo}</td>
        <td class="py-2.5 px-3 text-xs text-right">
          ${item.status.includes('Paid') ? `
            <button onclick="viewFeeReceipt('${item.receiptNo}', '${item.term}', '${item.amount}')"
                    class="text-xs font-semibold text-navy-800 hover:text-gold-600 underline">
              View Receipt
            </button>
          ` : `
            <button onclick="payPendingFee('${item.term}', '${item.amount}')"
                    class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors">
              Pay Online
            </button>
          `}
        </td>
      </tr>
    `).join('');
  }

  // Report Card Table
  const gradesTbody = document.getElementById('erp-grades-tbody');
  if (gradesTbody) {
    gradesTbody.innerHTML = AGA_DATA.erpDemoUser.grades.map(g => `
      <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td class="py-2 px-3 text-xs font-medium text-slate-800">${g.subject}</td>
        <td class="py-2 px-3 text-xs text-center font-bold text-navy-800">${g.midTerm} / ${g.max}</td>
        <td class="py-2 px-3 text-xs text-center font-bold text-emerald-700">${g.grade}</td>
        <td class="py-2 px-3 text-xs text-slate-500">${g.teacher}</td>
      </tr>
    `).join('');
  }

  // Teacher Remarks
  const remarksContainer = document.getElementById('erp-remarks-container');
  if (remarksContainer) {
    remarksContainer.innerHTML = AGA_DATA.erpDemoUser.remarks.map(r => `
      <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs font-bold text-navy-800">${r.author}</span>
          <span class="text-[11px] text-slate-400">${r.date}</span>
        </div>
        <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gold-100 text-gold-800 mb-1.5">${r.tag}</span>
        <p class="text-xs text-slate-700 leading-relaxed">${r.text}</p>
      </div>
    `).join('');
  }
}

function viewFeeReceipt(receiptNo, term, amount) {
  const modal = document.getElementById('receipt-modal');
  const body = document.getElementById('receipt-modal-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="p-6 bg-white border border-slate-300 rounded-xl printable-area">
      <div class="flex items-center justify-between border-b-2 border-navy-800 pb-4 mb-4">
        <div>
          <h2 class="text-lg font-bold text-navy-800">${AGA_DATA.school.name}</h2>
          <p class="text-xs text-slate-500">${AGA_DATA.school.address}</p>
          <p class="text-[11px] text-slate-500">CBSE Affiliation No: ${AGA_DATA.school.affiliationNo}</p>
        </div>
        <div class="text-right">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">Official Receipt</span>
          <p class="text-xs font-mono font-bold text-slate-700 mt-2">Receipt No: ${receiptNo}</p>
          <p class="text-[11px] text-slate-500">Date: ${new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
        <div><strong>Student Name:</strong> Aarav Sharma</div>
        <div><strong>Admission No:</strong> AGA-2021-1402</div>
        <div><strong>Grade & Section:</strong> Grade VIII - A</div>
        <div><strong>Parent Name:</strong> Dr. Vikramaditya Sharma</div>
      </div>

      <table class="w-full text-xs border border-slate-200 mb-4">
        <thead class="bg-navy-800 text-white">
          <tr>
            <th class="py-2 px-3 text-left">Description</th>
            <th class="py-2 px-3 text-right">Amount (INR)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr>
            <td class="py-2 px-3">Tuition Fee (${term})</td>
            <td class="py-2 px-3 text-right font-medium">₹ 35,000</td>
          </tr>
          <tr>
            <td class="py-2 px-3">Development & IT Charges</td>
            <td class="py-2 px-3 text-right font-medium">₹ 6,500</td>
          </tr>
          <tr>
            <td class="py-2 px-3">GPS Transport Fee (Zone 1)</td>
            <td class="py-2 px-3 text-right font-medium">₹ 7,000</td>
          </tr>
          <tr class="bg-slate-100 font-bold text-slate-900">
            <td class="py-2.5 px-3">Total Amount Paid</td>
            <td class="py-2.5 px-3 text-right text-emerald-700">${amount}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-end pt-4 border-t border-slate-200 text-xs text-slate-500">
        <div>
          <p>Payment Mode: Digital Online Transaction (Success)</p>
          <p class="text-[10px] text-slate-400 mt-1">Computer-generated receipt, no signature required.</p>
        </div>
        <div class="text-right">
          <p class="font-bold text-slate-800">Accounts Department</p>
          <p class="text-[10px]">Aurelia Global Academy</p>
        </div>
      </div>
    </div>
  `;

  openModal('receipt-modal');
}

function payPendingFee(term, amount) {
  showToast(`Initiating secure payment gateway simulation for ${amount}...`, 'info');
  setTimeout(() => {
    showToast(`Payment of ${amount} for ${term} successful! Receipt generated.`, 'success');
  }, 1200);
}

function updateElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ==========================================================================
   FLOATING ADMISSIONS HELP ASSISTANT (CHATBOT)
   ========================================================================== */
function initChatWidget() {
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickChips = document.querySelectorAll('.chat-quick-chip');

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
      if (!chatWindow.classList.contains('hidden')) {
        renderChatMessages();
        if (chatInput) chatInput.focus();
      }
    });
  }

  if (chatCloseBtn && chatWindow) {
    chatCloseBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
    });
  }

  // Quick chip click
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question') || chip.textContent.trim();
      handleUserChatMessage(question);
    });
  });

  // Handle Form Submit
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      chatInput.value = '';
      handleUserChatMessage(message);
    });
  }
}

function handleUserChatMessage(text) {
  state.chatMessages.push({
    sender: 'user',
    text: text,
    time: formatTime(new Date())
  });
  renderChatMessages();

  // Find matching answer
  const lower = text.toLowerCase();
  let matched = AGA_DATA.botKnowledge.find(item =>
    item.keywords.some(keyword => lower.includes(keyword))
  );

  let replyText = matched ? matched.answer : `
    Thank you for your enquiry regarding "<em>${text}</em>". 
    For specific questions, our Admissions Counselors are available at <strong>+91 124 482 9100</strong> 
    or via email at <strong>admissions@aureliaglobal.edu.in</strong>. You can also book a campus tour to explore our facilities in person!
  `;

  // Typing simulation delay
  setTimeout(() => {
    state.chatMessages.push({
      sender: 'bot',
      text: replyText,
      time: formatTime(new Date())
    });
    renderChatMessages();
  }, 400);
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  container.innerHTML = state.chatMessages.map(msg => `
    <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} mb-3">
      <div class="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
        msg.sender === 'user'
          ? 'bg-navy-800 text-white rounded-br-none'
          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
      }">
        <div>${msg.text}</div>
        <div class="text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'}">${msg.time}</div>
      </div>
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

/* ==========================================================================
   CAMPUS TOUR BOOKING & NEWSLETTER
   ========================================================================== */
function initTourBooking() {
  const tourForm = document.getElementById('tour-booking-form');
  if (!tourForm) return;

  tourForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('tour-name').value.trim();
    const date = document.getElementById('tour-date').value;
    const slot = document.getElementById('tour-slot').value;
    const phone = document.getElementById('tour-phone').value.trim();

    if (!name || !date || !slot || !phone) {
      showToast('Please provide all details to schedule your campus tour.', 'error');
      return;
    }

    tourForm.reset();
    showToast(`Campus Tour confirmed for ${name} on ${date} (${slot})! Our team will call you to confirm gate entry pass.`, 'success');
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput || !emailInput.value.trim()) return;

    emailInput.value = '';
    showToast('Thank you for subscribing to Aurelia Academic Digest & Circulars!', 'success');
  });
}

/* ==========================================================================
   MODAL UTILITIES & TOAST SYSTEM
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function handleGlobalKeydown(e) {
  if (e.key === 'Escape') {
    // Close any visible modal
    document.querySelectorAll('.app-modal:not(.hidden)').forEach(modal => {
      modal.classList.add('hidden');
    });
    // Close lightbox
    const lightbox = document.getElementById('gallery-lightbox-modal');
    if (lightbox && !lightbox.classList.contains('hidden')) {
      lightbox.classList.add('hidden');
    }
    document.body.classList.remove('overflow-hidden');
  }

  // Lightbox arrow key navigation
  const lightbox = document.getElementById('gallery-lightbox-modal');
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  }
}

// Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastId = 'toast-' + Date.now();
  const bgStyles = {
    success: 'bg-emerald-900 border-emerald-500 text-white',
    error: 'bg-red-900 border-red-500 text-white',
    info: 'bg-navy-900 border-gold-500 text-white'
  };

  const icons = {
    success: '<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
    error: '<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
    info: '<svg class="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  };

  const toastEl = document.createElement('div');
  toastEl.id = toastId;
  toastEl.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl text-xs font-medium transition-all duration-300 transform translate-y-2 opacity-0 ${bgStyles[type] || bgStyles.info}`;
  toastEl.innerHTML = `
    <span class="flex-shrink-0">${icons[type] || icons.info}</span>
    <span class="flex-1">${message}</span>
    <button onclick="document.getElementById('${toastId}').remove()" class="text-slate-400 hover:text-white transition-colors ml-2">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  `;

  container.appendChild(toastEl);

  // Trigger animation
  requestAnimationFrame(() => {
    toastEl.classList.remove('translate-y-2', 'opacity-0');
  });

  // Auto remove after 4.5 seconds
  setTimeout(() => {
    toastEl.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toastEl.remove(), 300);
  }, 4500);
}
