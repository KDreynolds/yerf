// ── STATUS ROTATOR ──
const statuses = [
  "Soaking in a hot spring, thinking about edge cases",
  "Napping. Probably found a bug in its sleep.",
  "Staring at your production logs. It knows.",
  "Eating water hyacinth. QA can wait.",
  "Walking across a keyboard somewhere in Brazil",
  "In a meeting with the pelicans. No capybaras allowed.",
  "Running a full regression suite (it's just walking in circles)",
  "Judging your code coverage report",
  "Writing a bug report entirely in squeaks",
  "Researching the ISO standard for capybara-based testing",
];

function rotateStatus() {
  const el = document.getElementById("status-text");
  if (!el) return;
  const current = statuses.indexOf(el.textContent);
  const next = (current + 1) % statuses.length;
  el.style.opacity = "0";
  setTimeout(() => {
    el.textContent = statuses[next];
    el.style.opacity = "1";
  }, 300);
}
document.getElementById("status-text")?.addEventListener("click", rotateStatus);
document.getElementById("status-text")?.style.setProperty("cursor", "pointer");
document.getElementById("status-text")?.style.setProperty("transition", "opacity 0.3s");

// ── TESTIMONIAL ROTATION ──
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");

function rotateTestimonial() {
  testimonials.forEach((t) => t.classList.remove("active"));
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial]?.classList.add("active");
}
setInterval(rotateTestimonial, 5000);

// ── BUDGET SLIDER ──
const budgetMessages = [
  { max: 0, msg: "Yerf works for exposure. Good luck." },
  { max: 100, msg: "You get one squeak. Final offer." },
  { max: 500, msg: "Modest bug budget" },
  { max: 1000, msg: "Yerf is mildly interested" },
  { max: 5000, msg: "Now we're talking. Yerf will actually wake up." },
  { max: 7500, msg: "VIP treatment. Yerf brings a friend." },
  { max: 10000, msg: "Yerf personally guarantees at least 3 bugs found" },
];

function updateBudget(val) {
  const display = document.getElementById("budget-display");
  const msgEl = document.getElementById("budget-message");
  if (display) display.textContent = "$" + Number(val).toLocaleString();
  if (msgEl) {
    const msg =
      budgetMessages.find((m) => val <= m.max)?.msg ||
      budgetMessages[budgetMessages.length - 1].msg;
    msgEl.textContent = msg;
  }
}

window.updateBudget = updateBudget;

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── CONTACT FORM HANDLER ──
const responseMessages = [
  "Your message has been forwarded to Yerf's team of pelican assistants. Response time: 3-5 business weeks. Yerf appreciates your patience and your snack offerings.",
  "📬 SQUEAK! (Translation: Yerf received your message and will evaluate your case after the next nap cycle.)",
  "Your bug budget has been noted. Yerf will dispatch a junior capybara to your office within 2-4 business days. Please prepare a shallow water dish.",
  "Thank you for contacting Yerf's QA. Due to high volume of existential software crises, Yerf is currently at capacity. Your position in queue: #" + Math.floor(Math.random() * 9000 + 100),
  "Yerf has received your inquiry and has already begun QA. Your application is now displaying upside down. You're welcome.",
];

async function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const response = document.getElementById("form-response");
  if (!form || !response) return;

  const btn = form.querySelector("button[type='submit']");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "🦫 Yerf is receiving...";
  }

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      response.textContent = pick(responseMessages);
      response.classList.remove("hidden");
      response.classList.add("success");
      form.reset();
      updateBudget(500);
    } else {
      response.textContent = "Yerf sneezed on the keyboard. Your message didn't go through. Try again?";
      response.classList.remove("hidden");
      response.classList.add("error");
    }
  } catch {
    response.textContent = "Yerf fell asleep on the network cable. Please try again.";
    response.classList.remove("hidden");
    response.classList.add("error");
  }

  if (btn) {
    btn.disabled = false;
    btn.textContent = "🦫 Send to Yerf";
  }

  response.scrollIntoView({ behavior: "smooth" });
}

window.handleSubmit = handleSubmit;

// ── MAXIMUM CHAOS ──
let chaosActive = false;
let chaosInterval = null;

function activateChaos() {
  if (chaosActive) {
    stopChaos();
    return;
  }

  chaosActive = true;
  const btn = document.querySelector(".chaos-nav .chaos-btn");
  if (btn) btn.textContent = "🧯 STOP THE MADNESS";

  document.body.style.animation = "none";
  document.body.offsetHeight;
  document.body.style.transition = "all 0.5s";

  chaosInterval = setInterval(() => {
    // Random background color
    const hue = Math.random() * 360;
    document.body.style.backgroundColor = `hsl(${hue}, 80%, 5%)`;

    // Random logo color
    const logo = document.querySelector(".logo");
    if (logo)
      logo.style.color = `hsl(${Math.random() * 360}, 100%, 60%)`;

    // Spawn particles
    spawnParticle();

    // Random rotation on a card
    const cards = document.querySelectorAll(".service-card");
    if (cards.length) {
      const card = cards[Math.floor(Math.random() * cards.length)];
      card.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.4})`;
      setTimeout(() => {
        if (chaosActive) card.style.transform = "";
      }, 300);
    }

    // Random tilt on headings
    const h2s = document.querySelectorAll(".section-title");
    if (h2s.length) {
      const h2 = h2s[Math.floor(Math.random() * h2s.length)];
      h2.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
      setTimeout(() => {
        if (chaosActive) h2.style.transform = "";
      }, 200);
    }
  }, 400);
}

function stopChaos() {
  chaosActive = false;
  clearInterval(chaosInterval);

  const btn = document.querySelector(".chaos-nav .chaos-btn");
  if (btn) btn.textContent = "🔥 MAXIMUM CHAOS";

  document.body.style.backgroundColor = "";
  document.body.style.transition = "";

  const logo = document.querySelector(".logo");
  if (logo) logo.style.color = "";
}

function spawnParticle() {
  const overlay =
    document.querySelector(".chaos-overlay") || createOverlay();

  const particle = document.createElement("span");
  particle.className = "chaos-particle";
  particle.textContent = pick(["🦫", "🐛", "🐹", "💥", "🐾", "🌿", "🔥", "💀", "😂", "🫠"]);
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = 2 + Math.random() * 3 + "s";
  particle.style.fontSize = 1 + Math.random() * 3 + "rem";

  overlay.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 5000);
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "chaos-overlay";
  document.body.appendChild(overlay);
  return overlay;
}

window.activateChaos = activateChaos;

// ── EASTER EGGS ──
let konamiProgress = 0;
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === konamiCode.length) {
      konamiProgress = 0;
      document.body.style.backgroundImage = `
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext y='80' font-size='80'%3E🦫%3C/text%3E%3C/svg%3E")
      `;
      document.body.style.backgroundSize = "80px 80px";
      setTimeout(() => {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundSize = "";
      }, 3000);
    }
  } else {
    konamiProgress = 0;
  }
});

// ── INIT ──
document.getElementById("contact-form")?.addEventListener("submit", handleSubmit);
console.log(
  "%c🦫 YERF'S QA %c— %cYou really shouldn't be looking here.%c But since you are: %cs q e a k%c",
  "font-size: 20px; font-weight: bold;",
  "",
  "color: #ff00ff;",
  "",
  "color: #ffff00; font-style: italic;",
  ""
);
console.log(
  "%cHiring a capybara for QA? Bold choice. We respect that.",
  "color: #39ff14;"
);
