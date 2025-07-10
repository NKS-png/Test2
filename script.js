document.addEventListener("DOMContentLoaded", function () {
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                observer.unobserve(iframe);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0.1
    });

    lazyIframes.forEach(iframe => observer.observe(iframe));
});

// Parallax Neon Background Animation
window.addEventListener('scroll', function() {
  const parallax = document.querySelector('.parallax-bg');
  if (parallax) {
    const scrollY = window.scrollY;
    parallax.style.backgroundPosition = `calc(20% + ${scrollY * 0.04}px) calc(30% + ${scrollY * 0.03}px), calc(80% - ${scrollY * 0.03}px) calc(70% - ${scrollY * 0.04}px)`;
  }
});

// Advanced Scroll Animation for Gallery Items
function animateGalleryOnScroll() {
  document.querySelectorAll('.gallery iframe').forEach((el, idx) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      setTimeout(() => el.classList.add('show'), idx * 60);
    }
  });
}
window.addEventListener('scroll', animateGalleryOnScroll);
window.addEventListener('DOMContentLoaded', animateGalleryOnScroll);

// Smooth fade navigation (unchanged)
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = link.href;
    }, 500);
    e.preventDefault();
  });
});

// Top Button logic (unchanged)
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile tap pop-out effect for gallery iframes
function enableMobilePopout() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return;
  document.querySelectorAll('.gallery iframe').forEach(iframe => {
    iframe.addEventListener('touchstart', function(e) {
      document.querySelectorAll('.gallery iframe').forEach(el => el.classList.remove('popout'));
      this.classList.add('popout');
      // Optional: remove popout on second tap
      setTimeout(() => {
        this.classList.remove('popout');
      }, 1200);
    });
  });
}
window.addEventListener('DOMContentLoaded', enableMobilePopout);

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Lazy load iframes using IntersectionObserver
function lazyLoadIframes() {
  const iframes = document.querySelectorAll('iframe[data-src]');
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all iframes
    iframes.forEach(iframe => {
      iframe.src = iframe.dataset.src;
    });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  }, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.1
  });
  iframes.forEach(iframe => observer.observe(iframe));
}
window.addEventListener('DOMContentLoaded', lazyLoadIframes);

// Progressive lazy loading for gallery iframes
function progressiveLazyLoadIframes() {
  const iframes = Array.from(document.querySelectorAll('iframe[data-src]'));
  if (iframes.length === 0) return;

  // Load the first iframe
  iframes[0].src = iframes[0].dataset.src;

  for (let i = 0; i < iframes.length - 1; i++) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Load the next iframe
          iframes[i + 1].src = iframes[i + 1].dataset.src;
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '0px 0px 200px 0px',
      threshold: 0.1
    });
    observer.observe(iframes[i]);
  }
}
window.addEventListener('DOMContentLoaded', progressiveLazyLoadIframes);
