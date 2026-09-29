function updateTime() {
  const timeElement = document.getElementById("time");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

async function loadFooterSocials() {
  const container = document.getElementById("footerSocials");
  const response = await fetch("data/socials.json");
  const socials = await response.json();

  socials.forEach((social) => {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "footer-social-link";
    link.setAttribute("aria-label", social.name);

    const iconWrapper = document.createElement("span");
    iconWrapper.className = "social-icon";
    iconWrapper.setAttribute("aria-hidden", "true");
    iconWrapper.innerHTML = social.icon;

    const nameSpan = document.createElement("span");
    nameSpan.className = "social-name";
    nameSpan.textContent = social.name;

    link.appendChild(iconWrapper);
    link.appendChild(nameSpan);
    container.appendChild(link);
  });
}

loadFooterSocials();

const modal = document.getElementById("wasteTimeModal");
const openBtn = document.getElementById("wasteTimeBtn");
const closeBtn = document.getElementById("modalClose");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});

const wasteTimeSection = document.querySelector(".waste-time-section");
const wasteTimeVideo = openBtn.querySelector(".waste-time-hover-video");
let isScrubbingVideo = false;
let scrollSyncFrame = 0;

function getWasteTimeScrollProgress() {
  const scrollRange = wasteTimeSection.offsetHeight - window.innerHeight;
  if (scrollRange <= 0) return 0;

  const sectionTop = wasteTimeSection.getBoundingClientRect().top + window.scrollY;
  return Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollRange));
}

function syncWasteTimeVideo() {
  scrollSyncFrame = 0;
  if (
    !isScrubbingVideo ||
    wasteTimeVideo.readyState < HTMLMediaElement.HAVE_METADATA ||
    !Number.isFinite(wasteTimeVideo.duration)
  ) {
    return;
  }

  const targetTime = getWasteTimeScrollProgress() * wasteTimeVideo.duration;
  const nextTime = Math.min(
    targetTime,
    Math.max(0, wasteTimeVideo.duration - 0.01),
  );
  if (Math.abs(wasteTimeVideo.currentTime - nextTime) > 0.04) {
    wasteTimeVideo.currentTime = nextTime;
  }
}

function queueWasteTimeVideoSync() {
  if (!scrollSyncFrame) {
    scrollSyncFrame = window.requestAnimationFrame(syncWasteTimeVideo);
  }
}

function setWasteTimeScrubbing(active) {
  isScrubbingVideo = active;
  wasteTimeVideo.pause();
  openBtn.classList.toggle(
    "is-scrubbing",
    active && wasteTimeVideo.readyState >= HTMLMediaElement.HAVE_METADATA,
  );
  queueWasteTimeVideoSync();
}

wasteTimeVideo.addEventListener("loadedmetadata", () => {
  if (isScrubbingVideo) {
    openBtn.classList.add("is-scrubbing");
  }
  queueWasteTimeVideoSync();
});
wasteTimeVideo.addEventListener("seeked", queueWasteTimeVideoSync);

openBtn.addEventListener("pointerenter", () => setWasteTimeScrubbing(true));
openBtn.addEventListener("pointerleave", () => {
  setWasteTimeScrubbing(openBtn.matches(":focus"));
});
openBtn.addEventListener("focus", () => setWasteTimeScrubbing(true));
openBtn.addEventListener("blur", () => {
  setWasteTimeScrubbing(openBtn.matches(":hover"));
});
window.addEventListener("scroll", queueWasteTimeVideoSync, { passive: true });
window.addEventListener("resize", queueWasteTimeVideoSync);
