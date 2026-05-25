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

async function loadInterestCollage() {
  const container = document.getElementById("interestCollage");
  const response = await fetch("data/interests.json");
  const data = await response.json();

  const items = data.flatMap((group) => Object.values(group).flat());

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  items.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "interest-card";
    link.setAttribute("aria-label", item.name);

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.loading = "lazy";

    link.appendChild(img);
    container.appendChild(link);
  });
}

loadInterestCollage();

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
