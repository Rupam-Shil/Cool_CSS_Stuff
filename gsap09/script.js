const tl = gsap.timeline();
tl.from('.img', { duration: 1, x: -1500, stagger: 0.1 });
tl.from('.site', { duration: 1, opacity: 0, x: -1500, stagger: 0.1 }, 0.5);
tl.to('.img', { duration: 1, scale: 0, opacity: 0 }, 1.5);
tl.to('.site', { duration: 1, opacity: 0, x: 1500 }, 2);
tl.to('.container', { duration: 1, y: '-100%' }, 3);
tl.from('h1', { duration: 1, opacity: 0, y: 20 }, 3);
