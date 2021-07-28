let tl = new gsap.timeline({ delay: 0.5, ease: Power1.easeOut });
tl.from('.loader', { duration: 1, y: 200, height: 0, ease: Power1.easeIn });
tl.to('.loader', { duration: 1, y: -200, height: 0, ease: Power1.easeOut });
tl.to('.wrapper', { duration: 1, y: -1000 }, 2);
tl.from('nav', { duration: 1, y: 100, opacity: 0 }, 2.5);
tl.from('.header', { duration: 1, y: 100, opacity: 0 }, 2.5);
tl.from('.right-side', { duration: 1, y: 100, opacity: 0 }, 2.5);
tl.to('.img-box', { duration: 1.5, height: 0 }, 2.5);
