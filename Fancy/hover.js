var hoverEffect = function (e) {
	var t = window.THREE;
	function n() {
		for (var e = 0; e < arguments.length; e++)
			if (void 0 !== arguments[e]) return arguments[e];
	}
	var i = e.parent,
		a = e.displacementImage,
		r = e.image1,
		o = e.image2,
		s = n(e.intensity1, e.intensity, 1),
		d = n(e.intensity2, e.intensity, 1),
		l = n(e.angle, Math.PI / 4),
		f = n(e.angle1, l),
		v = n(e.angle2, 3 * -l),
		p = n(e.speedIn, e.speed, 1.6),
		u = n(e.speedOut, e.speed, 1.2),
		c = n(e.hover, !0),
		m = n(e.easing, Expo.easeOut);
	if (i)
		if (r && o && a) {
			var g = new t.Scene(),
				h = new t.OrthographicCamera(
					i.offsetWidth / -2,
					i.offsetWidth / 2,
					i.offsetHeight / 2,
					i.offsetHeight / -2,
					1,
					1e3
				);
			h.position.z = 1;
			var x = new t.WebGLRenderer({ antialias: !1 });
			x.setPixelRatio(window.devicePixelRatio),
				x.setClearColor(16777215, 0),
				x.setSize(i.offsetWidth, i.offsetHeight),
				i.appendChild(x.domElement);
			var y = function () {
					x.render(g, h);
				},
				w = new t.TextureLoader();
			w.crossOrigin = '';
			var F = w.load(r, y),
				E = w.load(o, y),
				M = w.load(a, y);
			(M.wrapS = M.wrapT = t.RepeatWrapping),
				(F.magFilter = E.magFilter = t.LinearFilter),
				(F.minFilter = E.minFilter = t.LinearFilter);
			var P = new t.ShaderMaterial({
					uniforms: {
						intensity1: { type: 'f', value: s },
						intensity2: { type: 'f', value: d },
						dispFactor: { type: 'f', value: 0 },
						angle1: { type: 'f', value: f },
						angle2: { type: 'f', value: v },
						texture1: { type: 't', value: F },
						texture2: { type: 't', value: E },
						disp: { type: 't', value: M },
					},
					vertexShader:
						'\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n',
					fragmentShader:
						'\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n',
					transparent: !0,
					opacity: 1,
				}),
				L = new t.PlaneBufferGeometry(i.offsetWidth, i.offsetHeight, 1),
				R = new t.Mesh(L, P);
			g.add(R),
				c &&
					(i.addEventListener('mouseenter', U),
					i.addEventListener('touchstart', U),
					i.addEventListener('mouseleave', C),
					i.addEventListener('touchend', C)),
				window.addEventListener('resize', function (e) {
					x.setSize(i.offsetWidth, i.offsetHeight);
				}),
				(this.next = U),
				(this.previous = C);
		} else console.warn('One or more images are missing');
	else console.warn('Parent missing');
	function U() {
		TweenMax.to(P.uniforms.dispFactor, p, {
			value: 1,
			ease: m,
			onUpdate: y,
			onComplete: y,
		});
	}
	function C() {
		TweenMax.to(P.uniforms.dispFactor, u, {
			value: 0,
			ease: m,
			onUpdate: y,
			onComplete: y,
		});
	}
};
