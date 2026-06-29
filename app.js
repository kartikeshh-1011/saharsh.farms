/**
 * Saharsh Farms - Interactive Website Logic
 * Handles: Scroll effects, Mobile menu, Form validation, Lightbox gallery, and WhatsApp integrations
 */

// 1. WhatsApp Configuration
// Change this to the farm's active WhatsApp number (include country code, no space or symbols)
const WHATSAPP_PHONE = "918623057575"; 

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLinkScroll();
  initQuickBookingForm();
  initRoomBookingButtons();
  initContactForm();
  initLightboxGallery();
});

/**
 * Update all WhatsApp anchors dynamically based on the central config number
 */
function initWhatsAppLinks() {
  const floatingBtn = document.getElementById("floatingWhatsappBtn");
  if (floatingBtn) {
    const defaultText = encodeURIComponent("Hi Saharsh Farms, I'm checking out your staycation website and want to ask a question.");
    floatingBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${defaultText}`;
  }
}

/**
 * Handle navbar visual feedback on scrolling down
 */
function initNavbarScroll() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/**
 * Handle mobile slide-out navigation menu
 */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburgerMenu");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/**
 * Dynamically highlight active navigation links based on scroll position
 */
function initActiveNavLinkScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Detect section when it fills middle portion
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Handle quick stay availability checks and compile redirect to WhatsApp
 */
function initQuickBookingForm() {
  const form = document.getElementById("quickBookingForm");
  if (!form) return;

  // Set default check-in date to today and check-out to tomorrow
  const checkInInput = document.getElementById("checkInDate");
  const checkOutInput = document.getElementById("checkOutDate");
  
  if (checkInInput && checkOutInput) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Format YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split("T")[0];

    checkInInput.value = formatDate(today);
    checkInInput.min = formatDate(today);
    checkOutInput.value = formatDate(tomorrow);
    checkOutInput.min = formatDate(tomorrow);

    checkInInput.addEventListener("change", () => {
      checkOutInput.min = checkInInput.value;
      if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
        const nextDay = new Date(checkInInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.value = formatDate(nextDay);
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkIn = document.getElementById("checkInDate").value;
    const checkOut = document.getElementById("checkOutDate").value;
    const guests = document.getElementById("guestCount").value;

    // Build the descriptive text message
    const message = `Hi Saharsh Farms! 👋\n\n` + 
                    `I am checking availability for a staycation:\n` +
                    `🏡 *Stay Option:* Saharsh Farms Private Estate\n` +
                    `📅 *Check-In:* ${checkIn}\n` +
                    `📅 *Check-Out:* ${checkOut}\n` +
                    `👥 *Guests:* ${guests}\n\n` +
                    `Please let me know if these dates are open!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  });
}

/**
 * Handle individual card booking clicks
 */
function initRoomBookingButtons() {
  const bookButtons = document.querySelectorAll(".room-book-btn");

  bookButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const stayName = btn.getAttribute("data-stay");
      const startPrice = btn.getAttribute("data-price");

      const message = `Hi Saharsh Farms! 👋\n\n` +
                      `I am interested in booking the *${stayName}* (starting at ${startPrice} per night).\n\n` +
                      `Could you please share details regarding availability and customization options?`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    });
  });
}

/**
 * Compile contact enquiry and redirect to WhatsApp
 */
function initContactForm() {
  const form = document.getElementById("contactInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const email = document.getElementById("contactEmail").value;
    const notes = document.getElementById("contactMessage").value;

    const message = `Hi Saharsh Farms! 👋\n\n` +
                    `I have submitted an enquiry from your website:\n` +
                    `👤 *Name:* ${name}\n` +
                    `📞 *Phone:* ${phone}\n` +
                    `✉️ *Email:* ${email}\n` +
                    `💬 *Inquiry Details:* ${notes}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    form.reset();
  });
}

/**
 * Interactive Lightbox Gallery logic with keyboard accessibility
 */
function initLightboxGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || !lightboxImg) return;

  let currentIndex = 0;
  const images = [];

  // Build the array of image objects
  galleryItems.forEach((item, index) => {
    images.push({
      src: item.getAttribute("data-src"),
      caption: item.getAttribute("data-caption")
    });

    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling behind
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxContent();
  }

  function updateLightboxContent() {
    const current = images[currentIndex];
    lightboxImg.src = current.src;
    lightboxCaption.textContent = current.caption;
  }

  // Click Events
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);

  // Close when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    }
  });
}
