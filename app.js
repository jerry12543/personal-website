function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // if entry is in viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((e1) => observer.observe(e1));

async function loadFooterSocials() {
    const container = document.getElementById('footerSocials');
    if (!container) return;

    const response = await fetch('data/socials.json');
    const socials = await response.json();

    socials.forEach((social) => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'footer-social-link';
        link.setAttribute('aria-label', social.name);

        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'social-icon';
        iconWrapper.setAttribute('aria-hidden', 'true');
        iconWrapper.innerHTML = social.icon;

        const nameSpan = document.createElement('span');
        nameSpan.className = 'social-name';
        nameSpan.textContent = social.name;

        link.appendChild(iconWrapper);
        link.appendChild(nameSpan);
        container.appendChild(link);
    });
}

loadFooterSocials();