"use strict";

const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-links a");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const progress = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});
const typingText = document.getElementById("typingText");

const words = [
    "Computer Science Student",
    "Web Developer",
    "Problem Solver",
    "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);
            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const scrollPercentage =
        (scrollTop / documentHeight) * 100;

    progress.style.width =
        `${scrollPercentage}%`;


    if (scrollTop > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }


    if (scrollTop > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }


    updateActiveSection();

});

function updateActiveSection() {

    const sections =
        document.querySelectorAll("section[id]");

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }

    });

}

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});

const skillSection =
    document.getElementById("skills");


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    document
                        .querySelectorAll(".progress-bar")
                        .forEach(bar => {

                            bar.style.width =
                                bar.dataset.width;

                        });

                    skillObserver.disconnect();

                }

            });

        },
        {
            threshold: .25
        }
    );


skillObserver.observe(skillSection);

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const increment =
                    Math.max(1, Math.ceil(target / 50));


                const updateCounter = () => {

                    current += increment;

                    if (current >= target) {
                        counter.textContent = target;
                        return;
                    }

                    counter.textContent = current;

                    requestAnimationFrame(updateCounter);

                };


                updateCounter();

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: .7
        }
    );


counters.forEach(counter => {
    counterObserver.observe(counter);
});

document.addEventListener("mousemove", event => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});
const cards = document.querySelectorAll(
    ".project-card, .skill-card, .stat-card, .hero-card"
);


cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;


        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

const projectButtons =
    document.querySelectorAll(".project-btn");


projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const project =
            button.dataset.project;

        if (!project) {

            alert("This project is coming soon!");

            return;
        }

        alert(
            `${project}\n\nProject details will be added soon.`
        );

    });

});
const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.style.color =
            "#ff4d57";

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.style.color =
            "#ff4d57";

        return;
    }


    formMessage.textContent =
        "Message validated successfully!";

    formMessage.style.color =
        "#00ff88";


    contactForm.reset();

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");


    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );


    themeToggle.innerHTML =
        isLight
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

});

document.getElementById("year").textContent =
    new Date().getFullYear();
window.addEventListener("mousemove", event => {

    const x =
        (event.clientX / window.innerWidth - .5) * 20;

    const y =
        (event.clientY / window.innerHeight - .5) * 20;


    document.querySelector(".glow-one").style.transform =
        `translate(${x}px, ${y}px)`;

    document.querySelector(".glow-two").style.transform =
        `translate(${-x}px, ${-y}px)`;

});
