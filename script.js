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

window.addEventListener("scroll", () => {
  document.querySelectorAll(".gallery iframe").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    document.body.style.opacity = 0;
    setTimeout(() => {
      window.location.href = link.href;
    }, 500);
    e.preventDefault();
  });
});
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
const loadingText = document.querySelector(".loading-text");
const dots = ["", ".", "..", "..."];
let i = 0;
setInterval(() => {
  loadingText.textContent = "Loading" + dots[i % dots.length];
  i++;
}, 400);
