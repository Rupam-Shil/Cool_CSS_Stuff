let tl = new gsap.timeline({ delay: 0.5 });

tl.to('.text-spread', { opacity: 1, duration: 0.5 });
tl.to(
	'.t__1',
	{
		scale: 3,
		top: 160,
		left: 60,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
tl.to(
	'.t__2',
	{
		scale: 1.5,
		bottom: 160,
		left: 160,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
tl.to(
	'.t__3',
	{
		scale: 2,
		top: 60,
		left: 560,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
tl.to(
	'.t__4',
	{
		scale: 1,
		bottom: 120,
		left: 760,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
tl.to(
	'.circle',
	{
		scale: 1,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
tl.from(
	'.box',
	{
		height: 0,
		duration: 1,
		ease: Expo.easeIn,
	},
	1
);
tl.from(
	'header',
	{
		y: 100,
		opacity: 0,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
tl.from(
	'a',
	{
		y: -100,
		opacity: 0,
		ease: Expo.easeIn,
		duration: 1,
	},
	1
);
