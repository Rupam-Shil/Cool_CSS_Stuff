var rule = CSSRulePlugin.getRule('span::after');

// gsap.from('.anim1', {
// 	opacity: 0,
// 	duration: 2.5,
// 	y: -50,
// 	stagger: 0.6,
// });
// gsap.from('img', { duration: 1, y: 30, opacity: 0, delay: 1.4 });
// gsap.from('aside', {
// 	duration: 1,
// 	backgroundPosition: '200px 0px',
// 	opacity: 0,
// 	delay: 1.1,
// });
// gsap.to(rule, { cssRule: { scaleY: 0 }, duration: 1 });
// gsap.from('aside', {
// 	duration: 1,
// 	backgroundPosition: '200px 0px',
// 	opacity: 0,
// 	delay: 1.1,
// });

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.from('.anim1', { y: -50, stagger: 0.6, opacity: 0 })
	.to(
		rule,
		{
			duration: 1.8,
			cssRule: { scaleY: 0 },
		},
		'-=2.2'
	)
	.from('aside', { backgroundPosition: '200px 0px', opacity: 0 }, '-=1.5')
	.from('img', { y: 50, opacity: 0 }, '-=.5');

document.querySelector('#cta').addEventListener('click', () => {
	tl.reversed() ? tl.play() : tl.reverse();
});
