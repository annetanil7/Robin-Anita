// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. PRELOADER ANIMATION
    const tlPreloader = gsap.timeline();
    tlPreloader
        .to(".preloader-monogram", { opacity: 1, y: -20, duration: 1.2, ease: "power3.out" })
        .to(".preloader-heart-svg", { opacity: 1, duration: 0.2 }, "-=0.5")
        .to(".preloader-heart-path", { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" }, "<")
        .to(".preloader", { yPercent: -100, duration: 1.5, ease: "power4.inOut" }, "+=0.8")
        .from(".hero .logo-monogram", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-top-text", { opacity: 0, y: 20, duration: 1, ease: "power3.out", stagger: 0.2 }, "-=0.6")
        .from(".hero .title", { opacity: 0, y: 40, duration: 1.2, ease: "power3.out" }, "-=0.8")
        .from(".hero-scroll-cue", { opacity: 0, y: 10, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // 2. SIDE PAGE PROGRESS SLIDER
    const sideProgressFill = document.querySelector(".side-progress-fill");
    if (sideProgressFill) {
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
                sideProgressFill.style.transform = `scaleY(${self.progress})`;
            }
        });
    }

    // 3. SIDE WEDDING ORNAMENT (Starts after hero)
    gsap.set(".side-scroll-ornament", { autoAlpha: 0, x: 12 });
    gsap.set(".ornament-line", { scaleY: 0, transformOrigin: "top center" });

    gsap.to(".side-scroll-ornament", {
        autoAlpha: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".section",
            start: "top 88%",
            end: "top 60%",
            scrub: true
        }
    });

    gsap.to(".ornament-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".section",
            start: "top 88%",
            endTrigger: ".footer",
            end: "top 70%",
            scrub: true
        }
    });

    // 4. (Removed Parallax effect to make text proportionate and stable)
    
    // 5. FADE UP ON SCROLL (Replaces old IntersectionObserver)
    const fadeUpElements = gsap.utils.toArray('.fade-up');
    fadeUpElements.forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Triggers when the top of the element hits 85% down the viewport
                    toggleActions: "play none none reverse" // Fades out if scrolled back up
                }
            }
        );
    });

    // 6. STAGGERED FADE UP FOR GRID/CARDS
    gsap.from(".event-card", {
        scrollTrigger: {
            trigger: ".events-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });

    // 7. DIVIDER LINE EXPAND ON SCROLL
    const dividers = gsap.utils.toArray('.vert-divider');
    dividers.forEach(divider => {
        gsap.fromTo(divider, 
            { scaleY: 0, transformOrigin: 'top' }, 
            { 
                scaleY: 1, 
                duration: 1.5, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: divider,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

});