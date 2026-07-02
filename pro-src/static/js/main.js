(function () {
	"use strict";

	const html = document.documentElement;
	const toggle = document.getElementById("theme-toggle");

	/* ---- Theme ---- */
	function getTheme() {
		return localStorage.getItem("theme") || "dark";
	}

	function setTheme(t) {
		html.setAttribute("data-theme", t);
		localStorage.setItem("theme", t);
		if (toggle) toggle.innerHTML = t === "dark" ? "&#9788;" : "&#9790;";
	}

	setTheme(getTheme());

	if (toggle) {
		toggle.addEventListener("click", function () {
			setTheme(getTheme() === "dark" ? "light" : "dark");
		});
	}

	/* ---- Mobile nav toggle ---- */
	var navToggle = document.getElementById("nav-toggle");
	var navLinks = document.getElementById("nav-links");

	if (navToggle && navLinks) {
		navToggle.addEventListener("click", function () {
			navLinks.classList.toggle("open");
		});

		document.addEventListener("click", function (e) {
			if (
				!navToggle.contains(e.target) &&
				!navLinks.contains(e.target)
			) {
				navLinks.classList.remove("open");
			}
		});
	}

	/* ---- Mode toggle ---- */
	(function () {
		var modeBtn = document.createElement("a");
		modeBtn.href = "/";
		modeBtn.className = "mode-toggle";
		modeBtn.title = "Switch to fun mode";
		modeBtn.innerHTML = "&#x1F9B7; Fun Mode";
		modeBtn.style.cssText = "position:fixed;bottom:20px;right:20px;z-index:9999;background:#39ff14;color:#0a0a0a;padding:8px 16px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:0.8rem;font-family:sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:all 0.2s;";
		modeBtn.addEventListener("mouseenter", function () {
			modeBtn.style.background = "#ffff00";
			modeBtn.style.transform = "scale(1.1)";
		});
		modeBtn.addEventListener("mouseleave", function () {
			modeBtn.style.background = "#39ff14";
			modeBtn.style.transform = "scale(1)";
		});
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(modeBtn); });
		} else {
			document.body.appendChild(modeBtn);
		}
	})();

	/* ---- Contact form ---- */
	var contactForm = document.getElementById("contact-form");
	if (contactForm) {
		var fsId = contactForm.dataset.formspree;

		function showSuccess() {
			contactForm.outerHTML =
				'<div id="contact-form" class="form-success">' +
				'<div class="check">&#10003;</div>' +
				"<h3>Message sent!</h3>" +
				"<p>Thank you for reaching out. I&rsquo;ll get back to you within 24 hours.</p>" +
				"</div>";
		}

		if (fsId) {
			contactForm.addEventListener("submit", function (e) {
				e.preventDefault();
				var btn = contactForm.querySelector("button[type=submit]");
				if (btn) {
					btn.disabled = true;
					btn.textContent = "Sending...";
				}
				fetch("https://formspree.io/f/" + fsId, {
					method: "POST",
					body: new FormData(contactForm),
					headers: { Accept: "application/json" },
				})
					.then(function (resp) {
						if (resp.ok) {
							showSuccess();
						} else {
							throw new Error("Form error");
						}
					})
					.catch(function () {
						if (btn) {
							btn.disabled = false;
							btn.textContent = "Send Message";
						}
						alert("Something went wrong. Please try again or email me directly at kylereynoldsdev@gmail.com.");
					});
			});
		} else if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
			var btn = contactForm.querySelector("button[type=submit]");
			contactForm.addEventListener("submit", function (e) {
				e.preventDefault();
				if (btn) {
					btn.disabled = true;
					btn.textContent = "Sending...";
				}
				fetch("/contact", {
					method: "POST",
					body: new FormData(contactForm),
				})
					.then(function (resp) {
						if (resp.ok) return resp.text();
						throw new Error("Server error");
					})
					.then(function (html) {
						contactForm.outerHTML = html;
					})
					.catch(function () {
						if (btn) {
							btn.disabled = false;
							btn.textContent = "Send Message";
						}
						alert("Something went wrong. Please try again.");
					});
			});
		} else {
			contactForm.addEventListener("submit", function (e) {
				e.preventDefault();
				alert("Contact form not configured. Please email me directly at kylereynoldsdev@gmail.com.");
			});
		}
	}

	/* ---- Active nav link on HTMX navigation ---- */
	function updateActiveNav() {
		var links = document.querySelectorAll(".nav-links a");
		var path = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
		links.forEach(function (link) {
			var href = (link.getAttribute("href") || "").replace(/\/+$/, "") || "/";
			if (href === path) {
				link.classList.add("active");
			} else {
				link.classList.remove("active");
			}
		});
	}

	/* ---- HTMX lifecycles ---- */
	document.body.addEventListener("htmx:afterSettle", function () {
		updateActiveNav();
	});
	// Also handle popstate (browser back/forward) since hx-push-url is used
	window.addEventListener("popstate", function () {
		updateActiveNav();
	});
})();
