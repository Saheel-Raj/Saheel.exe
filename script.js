gsap.registerPlugin(ScrollTrigger);

document.documentElement.classList.add('intro-scroll-lock');
window.setTimeout(() => {
    document.documentElement.classList.remove('intro-scroll-lock');
}, 2500);

const raceIntro = gsap.timeline({ defaults: { ease: 'power2.out' } });
const introCount = document.querySelector('.race-intro__count');

raceIntro
    .set('.race-intro__lights i', { backgroundColor: '#e63b24', boxShadow: '0 0 22px #e63b24' })
    .to(introCount, { textContent: '4', duration: .45 })
    .to(introCount, { textContent: '3', duration: .45 })
    .to(introCount, { textContent: '2', duration: .45 })
    .to(introCount, { textContent: '1', duration: .45 })
    .to(introCount, { textContent: 'GO', color: '#e63b24', scale: 1.15, duration: .35 })
    .set('.race-intro__lights i', { backgroundColor: '#3a211e', boxShadow: 'none' })
    .to('.race-intro', { yPercent: -100, duration: .85, ease: 'power4.inOut' })
    .set('.race-intro', { display: 'none' });

const releaseIntro = () => {
    if (raceIntro.progress() < 1) {
        raceIntro.progress(1);
    }
};

window.addEventListener('wheel', releaseIntro, { once: true, passive: true });
window.addEventListener('touchstart', releaseIntro, { once: true, passive: true });
window.addEventListener('pointerdown', releaseIntro, { once: true, passive: true });
window.addEventListener('keydown', releaseIntro, { once: true });
window.addEventListener('scroll', releaseIntro, { once: true, passive: true });

const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 3.2 });

intro
    .from('#nav', { y: -24, opacity: 0, duration: 0.7 })
    .from('#elem2 .eyebrow, #elem2 h2, #elem2 h3, #elem2 .text-link', {
        y: 35,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1
    }, '-=0.35')
    .from('#elem1, #elem3', { y: 45, opacity: 0, duration: 0.7, stagger: 0.14 }, '-=0.55')
    .from('.hero-lockup > span, .hero-lockup strong', { opacity: 0, duration: 0.5 }, '-=0.3')
    .from('.hero-lockup h1', {
        yPercent: 120,
        scale: .72,
        skewX: -8,
        opacity: 0,
        duration: 1.15,
        ease: 'power4.out'
    }, '-=0.35')
    .to('.hero-lockup h1', { skewX: 0, duration: .35, ease: 'power2.out' }, '-=0.25');

gsap.from('.track-grid', { opacity: 0, y: 80, duration: 1.4, ease: 'power2.out' });
gsap.from('.start-lights i', { scale: 0, opacity: 0, duration: 0.35, stagger: 0.12, ease: 'back.out(2)' }, '-=0.8');

gsap.utils.toArray('#page2-left, #page2-right, #page4-left, #page4-right').forEach((section) => {
    gsap.from(section, {
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
        y: 55,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    });
});

const projectsMotion = gsap.matchMedia();

projectsMotion.add('(min-width: 761px)', () => {
    const projectsIntro = gsap.timeline({
        scrollTrigger: { trigger: '#page3', start: 'top 78%', once: true }
    });

    projectsIntro
        .from('#page3 .section-kicker', { y: 20, opacity: 0, duration: .45 })
        .from('#page3 .section-heading h1', { yPercent: 100, opacity: 0, duration: .9, ease: 'power4.out' }, '-=.2')
        .from('#page3 .section-heading h1 span', { rotation: -120, scale: 0, duration: .55, ease: 'back.out(2)' }, '-=.45')
        .from('#page3 img', { x: 120, rotation: 14, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, '-=.55');

    gsap.to('#page3 .section-heading h1', {
        scrollTrigger: { trigger: '#page3', start: 'top bottom', end: 'bottom top', scrub: 1 },
        x: -45,
        ease: 'none'
    });

    gsap.to('#page3 img', {
        scrollTrigger: { trigger: '#page3', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        y: -35,
        rotation: -2,
        ease: 'none'
    });
});

projectsMotion.add('(max-width: 760px)', () => {
    const projectsIntro = gsap.timeline({
        scrollTrigger: { trigger: '#page3', start: 'top 84%', once: true }
    });

    projectsIntro
        .from('#page3 .section-kicker', { y: 18, opacity: 0, duration: .4 })
        .from('#page3 .section-heading h1', { y: 55, scale: .86, opacity: 0, duration: .75, ease: 'power3.out' }, '-=.15')
        .from('#page3 .section-heading h1 span', { rotation: -90, scale: 0, duration: .5, ease: 'back.out(2)' }, '-=.35')
        .from('#page3 img', { y: 70, rotation: 8, opacity: 0, duration: .8, ease: 'back.out(1.2)' }, '-=.25');

    gsap.to('#page3 img', {
        scrollTrigger: { trigger: '#page3', start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -18,
        ease: 'none'
    });
});

document.querySelectorAll('#image-div img').forEach((image) => {
    image.addEventListener('mousemove', (event) => {
        const bounds = image.getBoundingClientRect();
        const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
        const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
        gsap.to(image, { rotateX, rotateY, transformPerspective: 700, duration: 0.35 });
    });
    image.addEventListener('mouseleave', () => gsap.to(image, { rotateX: 0, rotateY: 0, duration: 0.5 }));
});