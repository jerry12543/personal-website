const canvasHost = document.getElementById("infiniteCanvasHost");

const loadImageDimensions = (item) =>
  new Promise((resolve) => {
    const image = new Image();

    image.onload = () =>
      resolve({ ...item, href: item.url, url: item.image, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => resolve(null);
    image.src = item.image;
  });

const loadMedia = async () => {
  const response = await fetch("data/interests.json");
  const groups = await response.json();
  const items = groups.flatMap((group) => Object.values(group).flat());
  const media = await Promise.all(items.map(loadImageDimensions));

  return media.filter(Boolean);
};

void loadMedia()
  .then((media) => {
    if (canvasHost && media.length && window.InfiniteCanvasModal) {
      window.InfiniteCanvasModal.mount(
        canvasHost,
        media,
        getComputedStyle(document.documentElement).getPropertyValue("--color-modal-bg").trim()
      );
    }
  })
  .catch((error) => console.warn("Unable to initialize infinite canvas:", error));
