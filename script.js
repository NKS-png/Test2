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
