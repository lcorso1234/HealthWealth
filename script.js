const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");

const particleCount = 120;
const particles = [];
const maxDistance = 180;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function createParticles() {
  for (let i = 0; i < particleCount; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
    });
  }
}

createParticles();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
    gradient.addColorStop(0, "rgba(255, 122, 26, 0.95)");
    gradient.addColorStop(0.6, "rgba(92, 255, 61, 0.4)");
    gradient.addColorStop(1, "rgba(92, 255, 61, 0)");
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        const opacity = 1 - dist / maxDistance;
        ctx.strokeStyle = `rgba(92, 255, 61, ${opacity * 0.35})`;
        ctx.lineWidth = opacity * 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

const flares = document.querySelectorAll(".flare[data-flare]");

flares.forEach((node) => {
  const short = node.textContent.trim();
  const extended = node.getAttribute("data-flare");

  if (!extended || !short) {
    return;
  }

  node.dataset.short = short;

  const open = () => {
    node.textContent = extended;
    node.classList.add("flare--open");
  };

  const close = () => {
    node.textContent = node.dataset.short || short;
    node.classList.remove("flare--open");
  };

  node.addEventListener("mouseenter", open);
  node.addEventListener("mouseleave", close);
  node.addEventListener("focus", open);
  node.addEventListener("blur", close);
  node.addEventListener("touchstart", open, { passive: true });
  node.addEventListener("touchend", close);
  node.addEventListener("touchcancel", close);
});
