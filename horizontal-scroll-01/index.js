!(function (t) {
	if ('object' == typeof exports && 'undefined' != typeof module)
		module.exports = t();
	else if ('function' == typeof define && define.amd) define([], t);
	else {
		var e;
		(e =
			'undefined' != typeof window
				? window
				: 'undefined' != typeof global
				? global
				: 'undefined' != typeof self
				? self
				: this),
			(e.HorizontalScroll = t());
	}
})(function () {
	return (function t(e, n, i) {
		function r(o, a) {
			if (!n[o]) {
				if (!e[o]) {
					var l = 'function' == typeof require && require;
					if (!a && l) return l(o, !0);
					if (s) return s(o, !0);
					var u = new Error("Cannot find module '" + o + "'");
					throw ((u.code = 'MODULE_NOT_FOUND'), u);
				}
				var h = (n[o] = { exports: {} });
				e[o][0].call(
					h.exports,
					function (t) {
						var n = e[o][1][t];
						return r(n ? n : t);
					},
					h,
					h.exports,
					t,
					e,
					n,
					i
				);
			}
			return n[o].exports;
		}
		for (
			var s = 'function' == typeof require && require, o = 0;
			o < i.length;
			o++
		)
			r(i[o]);
		return r;
	})(
		{
			1: [
				function (t, e, n) {
					'use strict';
					function i(t, e) {
						return function () {
							return t.apply(e, arguments);
						};
					}
					var r = Object.prototype.toString,
						s = Object.prototype.hasOwnProperty;
					e.exports = function (t) {
						if (!t)
							return console.warn('bindAll requires at least one argument.');
						var e = Array.prototype.slice.call(arguments, 1);
						if (0 === e.length)
							for (var n in t)
								s.call(t, n) &&
									'function' == typeof t[n] &&
									'[object Function]' == r.call(t[n]) &&
									e.push(n);
						for (var o = 0; o < e.length; o++) {
							var a = e[o];
							t[a] = i(t[a], t);
						}
					};
				},
				{},
			],
			2: [
				function (t, e, n) {
					function i() {
						(this._events = this._events || {}),
							(this._maxListeners = this._maxListeners || void 0);
					}
					function r(t) {
						return 'function' == typeof t;
					}
					function s(t) {
						return 'number' == typeof t;
					}
					function o(t) {
						return 'object' == typeof t && null !== t;
					}
					function a(t) {
						return void 0 === t;
					}
					(e.exports = i),
						(i.EventEmitter = i),
						(i.prototype._events = void 0),
						(i.prototype._maxListeners = void 0),
						(i.defaultMaxListeners = 10),
						(i.prototype.setMaxListeners = function (t) {
							if (!s(t) || 0 > t || isNaN(t))
								throw TypeError('n must be a positive number');
							return (this._maxListeners = t), this;
						}),
						(i.prototype.emit = function (t) {
							var e, n, i, s, l, u;
							if (
								(this._events || (this._events = {}),
								'error' === t &&
									(!this._events.error ||
										(o(this._events.error) && !this._events.error.length)))
							) {
								if (((e = arguments[1]), e instanceof Error)) throw e;
								var h = new Error(
									'Uncaught, unspecified "error" event. (' + e + ')'
								);
								throw ((h.context = e), h);
							}
							if (((n = this._events[t]), a(n))) return !1;
							if (r(n))
								switch (arguments.length) {
									case 1:
										n.call(this);
										break;
									case 2:
										n.call(this, arguments[1]);
										break;
									case 3:
										n.call(this, arguments[1], arguments[2]);
										break;
									default:
										(s = Array.prototype.slice.call(arguments, 1)),
											n.apply(this, s);
								}
							else if (o(n))
								for (
									s = Array.prototype.slice.call(arguments, 1),
										u = n.slice(),
										i = u.length,
										l = 0;
									i > l;
									l++
								)
									u[l].apply(this, s);
							return !0;
						}),
						(i.prototype.addListener = function (t, e) {
							var n;
							if (!r(e)) throw TypeError('listener must be a function');
							return (
								this._events || (this._events = {}),
								this._events.newListener &&
									this.emit('newListener', t, r(e.listener) ? e.listener : e),
								this._events[t]
									? o(this._events[t])
										? this._events[t].push(e)
										: (this._events[t] = [this._events[t], e])
									: (this._events[t] = e),
								o(this._events[t]) &&
									!this._events[t].warned &&
									((n = a(this._maxListeners)
										? i.defaultMaxListeners
										: this._maxListeners),
									n &&
										n > 0 &&
										this._events[t].length > n &&
										((this._events[t].warned = !0),
										console.error(
											'(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',
											this._events[t].length
										),
										'function' == typeof console.trace && console.trace())),
								this
							);
						}),
						(i.prototype.on = i.prototype.addListener),
						(i.prototype.once = function (t, e) {
							function n() {
								this.removeListener(t, n),
									i || ((i = !0), e.apply(this, arguments));
							}
							if (!r(e)) throw TypeError('listener must be a function');
							var i = !1;
							return (n.listener = e), this.on(t, n), this;
						}),
						(i.prototype.removeListener = function (t, e) {
							var n, i, s, a;
							if (!r(e)) throw TypeError('listener must be a function');
							if (!this._events || !this._events[t]) return this;
							if (
								((n = this._events[t]),
								(s = n.length),
								(i = -1),
								n === e || (r(n.listener) && n.listener === e))
							)
								delete this._events[t],
									this._events.removeListener &&
										this.emit('removeListener', t, e);
							else if (o(n)) {
								for (a = s; a-- > 0; )
									if (n[a] === e || (n[a].listener && n[a].listener === e)) {
										i = a;
										break;
									}
								if (0 > i) return this;
								1 === n.length
									? ((n.length = 0), delete this._events[t])
									: n.splice(i, 1),
									this._events.removeListener &&
										this.emit('removeListener', t, e);
							}
							return this;
						}),
						(i.prototype.removeAllListeners = function (t) {
							var e, n;
							if (!this._events) return this;
							if (!this._events.removeListener)
								return (
									0 === arguments.length
										? (this._events = {})
										: this._events[t] && delete this._events[t],
									this
								);
							if (0 === arguments.length) {
								for (e in this._events)
									'removeListener' !== e && this.removeAllListeners(e);
								return (
									this.removeAllListeners('removeListener'),
									(this._events = {}),
									this
								);
							}
							if (((n = this._events[t]), r(n))) this.removeListener(t, n);
							else if (n)
								for (; n.length; ) this.removeListener(t, n[n.length - 1]);
							return delete this._events[t], this;
						}),
						(i.prototype.listeners = function (t) {
							var e;
							return (e =
								this._events && this._events[t]
									? r(this._events[t])
										? [this._events[t]]
										: this._events[t].slice()
									: []);
						}),
						(i.prototype.listenerCount = function (t) {
							if (this._events) {
								var e = this._events[t];
								if (r(e)) return 1;
								if (e) return e.length;
							}
							return 0;
						}),
						(i.listenerCount = function (t, e) {
							return t.listenerCount(e);
						});
				},
				{},
			],
			3: [
				function (t, e, n) {
					(function () {
						var t;
						(t = 'undefined' != typeof n && null !== n ? n : this),
							(t.Lethargy = (function () {
								function t(t, e, n, i) {
									(this.stability = null != t ? Math.abs(t) : 8),
										(this.sensitivity = null != e ? 1 + Math.abs(e) : 100),
										(this.tolerance = null != n ? 1 + Math.abs(n) : 1.1),
										(this.delay = null != i ? i : 150),
										(this.lastUpDeltas = function () {
											var t, e, n;
											for (
												n = [], t = 1, e = 2 * this.stability;
												e >= 1 ? e >= t : t >= e;
												e >= 1 ? t++ : t--
											)
												n.push(null);
											return n;
										}.call(this)),
										(this.lastDownDeltas = function () {
											var t, e, n;
											for (
												n = [], t = 1, e = 2 * this.stability;
												e >= 1 ? e >= t : t >= e;
												e >= 1 ? t++ : t--
											)
												n.push(null);
											return n;
										}.call(this)),
										(this.deltasTimestamp = function () {
											var t, e, n;
											for (
												n = [], t = 1, e = 2 * this.stability;
												e >= 1 ? e >= t : t >= e;
												e >= 1 ? t++ : t--
											)
												n.push(null);
											return n;
										}.call(this));
								}
								return (
									(t.prototype.check = function (t) {
										var e;
										return (
											(t = t.originalEvent || t),
											null != t.wheelDelta
												? (e = t.wheelDelta)
												: null != t.deltaY
												? (e = -40 * t.deltaY)
												: (null != t.detail || 0 === t.detail) &&
												  (e = -40 * t.detail),
											this.deltasTimestamp.push(Date.now()),
											this.deltasTimestamp.shift(),
											e > 0
												? (this.lastUpDeltas.push(e),
												  this.lastUpDeltas.shift(),
												  this.isInertia(1))
												: (this.lastDownDeltas.push(e),
												  this.lastDownDeltas.shift(),
												  this.isInertia(-1))
										);
									}),
									(t.prototype.isInertia = function (t) {
										var e, n, i, r, s, o, a;
										return (
											(e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas),
											null === e[0]
												? t
												: this.deltasTimestamp[2 * this.stability - 2] +
														this.delay >
														Date.now() && e[0] === e[2 * this.stability - 1]
												? !1
												: ((i = e.slice(0, this.stability)),
												  (n = e.slice(this.stability, 2 * this.stability)),
												  (a = i.reduce(function (t, e) {
														return t + e;
												  })),
												  (s = n.reduce(function (t, e) {
														return t + e;
												  })),
												  (o = a / i.length),
												  (r = s / n.length),
												  Math.abs(o) < Math.abs(r * this.tolerance) &&
												  this.sensitivity < Math.abs(r)
														? t
														: !1)
										);
									}),
									(t.prototype.showLastUpDeltas = function () {
										return this.lastUpDeltas;
									}),
									(t.prototype.showLastDownDeltas = function () {
										return this.lastDownDeltas;
									}),
									t
								);
							})());
					}.call(this));
				},
				{},
			],
			4: [
				function (t, e, n) {
					'use strict';
					function i(t) {
						if (null === t || void 0 === t)
							throw new TypeError(
								'Object.assign cannot be called with null or undefined'
							);
						return Object(t);
					}
					function r() {
						try {
							if (!Object.assign) return !1;
							var t = new String('abc');
							if (((t[5] = 'de'), '5' === Object.getOwnPropertyNames(t)[0]))
								return !1;
							for (var e = {}, n = 0; 10 > n; n++)
								e['_' + String.fromCharCode(n)] = n;
							var i = Object.getOwnPropertyNames(e).map(function (t) {
								return e[t];
							});
							if ('0123456789' !== i.join('')) return !1;
							var r = {};
							return (
								'abcdefghijklmnopqrst'.split('').forEach(function (t) {
									r[t] = t;
								}),
								'abcdefghijklmnopqrst' !==
								Object.keys(Object.assign({}, r)).join('')
									? !1
									: !0
							);
						} catch (s) {
							return !1;
						}
					}
					var s = Object.getOwnPropertySymbols,
						o = Object.prototype.hasOwnProperty,
						a = Object.prototype.propertyIsEnumerable;
					e.exports = r()
						? Object.assign
						: function (t, e) {
								for (var n, r, l = i(t), u = 1; u < arguments.length; u++) {
									n = Object(arguments[u]);
									for (var h in n) o.call(n, h) && (l[h] = n[h]);
									if (s) {
										r = s(n);
										for (var c = 0; c < r.length; c++)
											a.call(n, r[c]) && (l[r[c]] = n[r[c]]);
									}
								}
								return l;
						  };
				},
				{},
			],
			5: [
				function (t, e, n) {
					(function (t) {
						(function () {
							var n, i, r;
							'undefined' != typeof performance &&
							null !== performance &&
							performance.now
								? (e.exports = function () {
										return performance.now();
								  })
								: 'undefined' != typeof t && null !== t && t.hrtime
								? ((e.exports = function () {
										return (n() - r) / 1e6;
								  }),
								  (i = t.hrtime),
								  (n = function () {
										var t;
										return (t = i()), 1e9 * t[0] + t[1];
								  }),
								  (r = n()))
								: Date.now
								? ((e.exports = function () {
										return Date.now() - r;
								  }),
								  (r = Date.now()))
								: ((e.exports = function () {
										return new Date().getTime() - r;
								  }),
								  (r = new Date().getTime()));
						}.call(this));
					}.call(this, t('_process')));
				},
				{ _process: 7 },
			],
			6: [
				function (t, e, n) {
					function i(t) {
						if (
							((t = t.replace(/-([a-z])/g, function (t, e) {
								return e.toUpperCase();
							})),
							void 0 !== o[t])
						)
							return t;
						for (
							var e = t.charAt(0).toUpperCase() + t.slice(1), n = a.length;
							n--;

						) {
							var i = a[n] + e;
							if (void 0 !== o[i]) return i;
						}
						return t;
					}
					function r(t) {
						return t in u ? u[t] : (u[t] = i(t));
					}
					function s(t) {
						return (
							(t = i(t)),
							l.test(t) && ((t = '-' + t.replace(l, '-$1')), (l.lastIndex = 0)),
							t.toLowerCase()
						);
					}
					var o =
							'undefined' != typeof document
								? document.createElement('p').style
								: {},
						a = ['O', 'ms', 'Moz', 'Webkit'],
						l = /([A-Z])/g,
						u = {};
					(e.exports = r), (e.exports.dash = s);
				},
				{},
			],
			7: [
				function (t, e, n) {
					function i() {
						throw new Error('setTimeout has not been defined');
					}
					function r() {
						throw new Error('clearTimeout has not been defined');
					}
					function s(t) {
						if (c === setTimeout) return setTimeout(t, 0);
						if ((c === i || !c) && setTimeout)
							return (c = setTimeout), setTimeout(t, 0);
						try {
							return c(t, 0);
						} catch (e) {
							try {
								return c.call(null, t, 0);
							} catch (e) {
								return c.call(this, t, 0);
							}
						}
					}
					function o(t) {
						if (f === clearTimeout) return clearTimeout(t);
						if ((f === r || !f) && clearTimeout)
							return (f = clearTimeout), clearTimeout(t);
						try {
							return f(t);
						} catch (e) {
							try {
								return f.call(null, t);
							} catch (e) {
								return f.call(this, t);
							}
						}
					}
					function a() {
						y &&
							v &&
							((y = !1),
							v.length ? (d = v.concat(d)) : (m = -1),
							d.length && l());
					}
					function l() {
						if (!y) {
							var t = s(a);
							y = !0;
							for (var e = d.length; e; ) {
								for (v = d, d = []; ++m < e; ) v && v[m].run();
								(m = -1), (e = d.length);
							}
							(v = null), (y = !1), o(t);
						}
					}
					function u(t, e) {
						(this.fun = t), (this.array = e);
					}
					function h() {}
					var c,
						f,
						p = (e.exports = {});
					!(function () {
						try {
							c = 'function' == typeof setTimeout ? setTimeout : i;
						} catch (t) {
							c = i;
						}
						try {
							f = 'function' == typeof clearTimeout ? clearTimeout : r;
						} catch (t) {
							f = r;
						}
					})();
					var v,
						d = [],
						y = !1,
						m = -1;
					(p.nextTick = function (t) {
						var e = new Array(arguments.length - 1);
						if (arguments.length > 1)
							for (var n = 1; n < arguments.length; n++)
								e[n - 1] = arguments[n];
						d.push(new u(t, e)), 1 !== d.length || y || s(l);
					}),
						(u.prototype.run = function () {
							this.fun.apply(null, this.array);
						}),
						(p.title = 'browser'),
						(p.browser = !0),
						(p.env = {}),
						(p.argv = []),
						(p.version = ''),
						(p.versions = {}),
						(p.on = h),
						(p.addListener = h),
						(p.once = h),
						(p.off = h),
						(p.removeListener = h),
						(p.removeAllListeners = h),
						(p.emit = h),
						(p.binding = function (t) {
							throw new Error('process.binding is not supported');
						}),
						(p.cwd = function () {
							return '/';
						}),
						(p.chdir = function (t) {
							throw new Error('process.chdir is not supported');
						}),
						(p.umask = function () {
							return 0;
						});
				},
				{},
			],
			8: [
				function (t, e, n) {
					(function (n) {
						for (
							var i = t('performance-now'),
								r = 'undefined' == typeof window ? n : window,
								s = ['moz', 'webkit'],
								o = 'AnimationFrame',
								a = r['request' + o],
								l = r['cancel' + o] || r['cancelRequest' + o],
								u = 0;
							!a && u < s.length;
							u++
						)
							(a = r[s[u] + 'Request' + o]),
								(l = r[s[u] + 'Cancel' + o] || r[s[u] + 'CancelRequest' + o]);
						if (!a || !l) {
							var h = 0,
								c = 0,
								f = [],
								p = 1e3 / 60;
							(a = function (t) {
								if (0 === f.length) {
									var e = i(),
										n = Math.max(0, p - (e - h));
									(h = n + e),
										setTimeout(function () {
											var t = f.slice(0);
											f.length = 0;
											for (var e = 0; e < t.length; e++)
												if (!t[e].cancelled)
													try {
														t[e].callback(h);
													} catch (n) {
														setTimeout(function () {
															throw n;
														}, 0);
													}
										}, Math.round(n));
								}
								return f.push({ handle: ++c, callback: t, cancelled: !1 }), c;
							}),
								(l = function (t) {
									for (var e = 0; e < f.length; e++)
										f[e].handle === t && (f[e].cancelled = !0);
								});
						}
						(e.exports = function (t) {
							return a.call(r, t);
						}),
							(e.exports.cancel = function () {
								l.apply(r, arguments);
							}),
							(e.exports.polyfill = function () {
								(r.requestAnimationFrame = a), (r.cancelAnimationFrame = l);
							});
					}.call(
						this,
						'undefined' != typeof global
							? global
							: 'undefined' != typeof self
							? self
							: 'undefined' != typeof window
							? window
							: {}
					));
				},
				{ 'performance-now': 5 },
			],
			9: [
				function (t, e, n) {
					function i() {}
					(i.prototype = {
						on: function (t, e, n) {
							var i = this.e || (this.e = {});
							return (i[t] || (i[t] = [])).push({ fn: e, ctx: n }), this;
						},
						once: function (t, e, n) {
							function i() {
								r.off(t, i), e.apply(n, arguments);
							}
							var r = this;
							return (i._ = e), this.on(t, i, n);
						},
						emit: function (t) {
							var e = [].slice.call(arguments, 1),
								n = ((this.e || (this.e = {}))[t] || []).slice(),
								i = 0,
								r = n.length;
							for (i; r > i; i++) n[i].fn.apply(n[i].ctx, e);
							return this;
						},
						off: function (t, e) {
							var n = this.e || (this.e = {}),
								i = n[t],
								r = [];
							if (i && e)
								for (var s = 0, o = i.length; o > s; s++)
									i[s].fn !== e && i[s].fn._ !== e && r.push(i[s]);
							return r.length ? (n[t] = r) : delete n[t], this;
						},
					}),
						(e.exports = i);
				},
				{},
			],
			10: [
				function (t, e, n) {
					'use strict';
					e.exports = function (t) {
						return JSON.parse(JSON.stringify(t));
					};
				},
				{},
			],
			11: [
				function (t, e, n) {
					'use strict';
					function i(t) {
						l(
							this,
							'_onWheel',
							'_onMouseWheel',
							'_onTouchStart',
							'_onTouchMove',
							'_onKeyDown'
						),
							(this.el = window),
							t && t.el && ((this.el = t.el), delete t.el),
							(this.options = r(
								{
									mouseMultiplier: 1,
									touchMultiplier: 2,
									firefoxMultiplier: 15,
									keyStep: 120,
									preventTouch: !1,
									unpreventTouchClass: 'vs-touchmove-allowed',
									limitInertia: !1,
								},
								t
							)),
							this.options.limitInertia && (this._lethargy = new o()),
							(this._emitter = new s()),
							(this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }),
							(this.touchStartX = null),
							(this.touchStartY = null),
							(this.bodyTouchAction = null);
					}
					var r = t('object-assign'),
						s = t('tiny-emitter'),
						o = t('lethargy').Lethargy,
						a = t('./support'),
						l = (t('./clone'), t('bindall-standalone')),
						u = 'virtualscroll';
					e.exports = i;
					var h = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
					(i.prototype._notify = function (t) {
						var e = this._event;
						(e.x += e.deltaX),
							(e.y += e.deltaY),
							this._emitter.emit(u, {
								x: e.x,
								y: e.y,
								deltaX: e.deltaX,
								deltaY: e.deltaY,
								originalEvent: t,
							});
					}),
						(i.prototype._onWheel = function (t) {
							var e = this.options;
							if (!this._lethargy || this._lethargy.check(t) !== !1) {
								var n = this._event;
								(n.deltaX = t.wheelDeltaX || -1 * t.deltaX),
									(n.deltaY = t.wheelDeltaY || -1 * t.deltaY),
									a.isFirefox &&
										1 == t.deltaMode &&
										((n.deltaX *= e.firefoxMultiplier),
										(n.deltaY *= e.firefoxMultiplier)),
									(n.deltaX *= e.mouseMultiplier),
									(n.deltaY *= e.mouseMultiplier),
									this._notify(t);
							}
						}),
						(i.prototype._onMouseWheel = function (t) {
							if (
								!this.options.limitInertia ||
								this._lethargy.check(t) !== !1
							) {
								var e = this._event;
								(e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0),
									(e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta),
									this._notify(t);
							}
						}),
						(i.prototype._onTouchStart = function (t) {
							var e = t.targetTouches ? t.targetTouches[0] : t;
							(this.touchStartX = e.pageX), (this.touchStartY = e.pageY);
						}),
						(i.prototype._onTouchMove = function (t) {
							var e = this.options;
							e.preventTouch &&
								!t.target.classList.contains(e.unpreventTouchClass) &&
								t.preventDefault();
							var n = this._event,
								i = t.targetTouches ? t.targetTouches[0] : t;
							(n.deltaX = (i.pageX - this.touchStartX) * e.touchMultiplier),
								(n.deltaY = (i.pageY - this.touchStartY) * e.touchMultiplier),
								(this.touchStartX = i.pageX),
								(this.touchStartY = i.pageY),
								this._notify(t);
						}),
						(i.prototype._onKeyDown = function (t) {
							var e = this._event;
							switch (((e.deltaX = e.deltaY = 0), t.keyCode)) {
								case h.LEFT:
								case h.UP:
									e.deltaY = this.options.keyStep;
									break;
								case h.RIGHT:
								case h.DOWN:
									e.deltaY = -this.options.keyStep;
									break;
								default:
									return;
							}
							this._notify(t);
						}),
						(i.prototype._bind = function () {
							a.hasWheelEvent &&
								this.el.addEventListener('wheel', this._onWheel),
								a.hasMouseWheelEvent &&
									this.el.addEventListener('mousewheel', this._onMouseWheel),
								a.hasTouch &&
									(this.el.addEventListener('touchstart', this._onTouchStart),
									this.el.addEventListener('touchmove', this._onTouchMove)),
								a.hasPointer &&
									a.hasTouchWin &&
									((this.bodyTouchAction = document.body.style.msTouchAction),
									(document.body.style.msTouchAction = 'none'),
									this.el.addEventListener(
										'MSPointerDown',
										this._onTouchStart,
										!0
									),
									this.el.addEventListener(
										'MSPointerMove',
										this._onTouchMove,
										!0
									)),
								a.hasKeyDown &&
									document.addEventListener('keydown', this._onKeyDown);
						}),
						(i.prototype._unbind = function () {
							a.hasWheelEvent &&
								this.el.removeEventListener('wheel', this._onWheel),
								a.hasMouseWheelEvent &&
									this.el.removeEventListener('mousewheel', this._onMouseWheel),
								a.hasTouch &&
									(this.el.removeEventListener(
										'touchstart',
										this._onTouchStart
									),
									this.el.removeEventListener('touchmove', this._onTouchMove)),
								a.hasPointer &&
									a.hasTouchWin &&
									((document.body.style.msTouchAction = this.bodyTouchAction),
									this.el.removeEventListener(
										'MSPointerDown',
										this._onTouchStart,
										!0
									),
									this.el.removeEventListener(
										'MSPointerMove',
										this._onTouchMove,
										!0
									)),
								a.hasKeyDown &&
									document.removeEventListener('keydown', this._onKeyDown);
						}),
						(i.prototype.on = function (t, e) {
							this._emitter.on(u, t, e);
							var n = this._emitter.e;
							n && n[u] && 1 === n[u].length && this._bind();
						}),
						(i.prototype.off = function (t, e) {
							this._emitter.off(u, t, e);
							var n = this._emitter.e;
							(!n[u] || n[u].length <= 0) && this._unbind();
						}),
						(i.prototype.reset = function () {
							var t = this._event;
							(t.x = 0), (t.y = 0);
						}),
						(i.prototype.destroy = function () {
							this._emitter.off(), this._unbind();
						});
				},
				{
					'./clone': 10,
					'./support': 12,
					'bindall-standalone': 1,
					lethargy: 3,
					'object-assign': 4,
					'tiny-emitter': 9,
				},
			],
			12: [
				function (t, e, n) {
					'use strict';
					e.exports = (function () {
						return {
							hasWheelEvent: 'onwheel' in document,
							hasMouseWheelEvent: 'onmousewheel' in document,
							hasTouch: 'ontouchstart' in document,
							hasTouchWin:
								navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
							hasPointer: !!window.navigator.msPointerEnabled,
							hasKeyDown: 'onkeydown' in document,
							isFirefox: navigator.userAgent.indexOf('Firefox') > -1,
						};
					})();
				},
				{},
			],
			13: [
				function (t, e, n) {
					'use strict';
					function i(t) {
						return t && t.__esModule ? t : { default: t };
					}
					function r(t, e) {
						if (!(t instanceof e))
							throw new TypeError('Cannot call a class as a function');
					}
					function s(t, e) {
						if (!t)
							throw new ReferenceError(
								"this hasn't been initialised - super() hasn't been called"
							);
						return !e ||
							('object' != ('undefined' == typeof e ? 'undefined' : a(e)) &&
								'function' != typeof e)
							? t
							: e;
					}
					function o(t, e) {
						if ('function' != typeof e && null !== e)
							throw new TypeError(
								'Super expression must either be null or a function, not ' +
									('undefined' == typeof e ? 'undefined' : a(e))
							);
						(t.prototype = Object.create(e && e.prototype, {
							constructor: {
								value: t,
								enumerable: !1,
								writable: !0,
								configurable: !0,
							},
						})),
							e &&
								(Object.setPrototypeOf
									? Object.setPrototypeOf(t, e)
									: (t.__proto__ = e));
					}
					var a =
						'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
							? function (t) {
									return typeof t;
							  }
							: function (t) {
									return t &&
										'function' == typeof Symbol &&
										t.constructor === Symbol &&
										t !== Symbol.prototype
										? 'symbol'
										: typeof t;
							  };
					Object.defineProperty(n, '__esModule', { value: !0 });
					var l = (function () {
							function t(t, e) {
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									(i.enumerable = i.enumerable || !1),
										(i.configurable = !0),
										'value' in i && (i.writable = !0),
										Object.defineProperty(t, i.key, i);
								}
							}
							return function (e, n, i) {
								return n && t(e.prototype, n), i && t(e, i), e;
							};
						})(),
						u = t('events'),
						h = t('virtual-scroll'),
						c = i(h),
						f = t('raf'),
						p = i(f),
						v = t('prefix'),
						d = i(v),
						y = (function (t) {
							function e(t) {
								r(this, e);
								var n = s(
									this,
									(e.__proto__ || Object.getPrototypeOf(e)).call(this)
								);
								return (
									n._bind(),
									(n.options = Object.assign(
										{
											container: t.container,
											blocks: t.blocks,
											isAnimated: t.isAnimated || !1,
											spring: t.spring || 0.1,
											skewReducer: t.skewReducer || 20,
											skewLimit: t.skewLimit || 30,
										},
										t
									)),
									(n.vars = {
										scrollValue: 0,
										oldScrollValue: 0,
										scrollTarget: 0,
										scrollLeft: 0,
										scrollRight: 0,
										spring: n.options.spring,
										direction: 0,
										speed: 0,
										speedTarget: 0,
									}),
									(n.wrapper = document.createElement('div')),
									n.wrapper.setAttribute('class', 'horizontal-scroll'),
									(n.vs = new c['default']()),
									(n.transform = d['default']('transform')),
									(n.raf = p['default']),
									n._setUI(),
									n._addEvents(),
									n.onResize(),
									n
								);
							}
							return (
								o(e, t),
								l(e, [
									{
										key: '_bind',
										value: function () {
											(this._update = this._update.bind(this)),
												(this.onResize = this.onResize.bind(this));
										},
									},
									{
										key: '_addEvents',
										value: function () {
											this.vs.on(this._onScroll, this),
												this.raf(this._update),
												window.addEventListener('resize', this.onResize);
										},
									},
									{
										key: '_removeEvents',
										value: function () {
											this.raf.cancel(this._update),
												this.raf(this._update),
												window.removeEventListener('resize', this.onResize);
										},
									},
									{
										key: '_setUI',
										value: function () {
											var t = this;
											Object.assign(this.wrapper.style, {
												position: 'absolute',
												top: '0',
												left: '0',
												'backface-visibility': 'hidden',
												'will-change': 'transform',
											}),
												Object.assign(this.options.container[0].style, {
													'white-space': 'nowrap',
													position: 'relative',
												}),
												Array.prototype.forEach.call(
													this.options.blocks,
													function (e) {
														(e.style.display = 'inline-block'),
															t.options.container[0].replaceChild(t.wrapper, e),
															t.wrapper.appendChild(e);
													}
												),
												this.options.container[0].appendChild(this.wrapper);
										},
									},
									{
										key: '_onScroll',
										value: function (t) {
											t.deltaY > 0
												? (this.vars.direction = 1)
												: (this.vars.direction = -1),
												(this.vars.scrollTarget += -1 * t.deltaY),
												(this.vars.scrollTarget = Math.round(
													Math.max(
														this.vars.scrollLeft,
														Math.min(
															this.vars.scrollTarget,
															this.vars.scrollRight
														)
													)
												));
										},
									},
									{
										key: '_update',
										value: function () {
											this.vars.scrollValue +=
												(this.vars.scrollTarget - this.vars.scrollValue) *
												this.vars.spring;
											var t = this.vars.scrollTarget - this.vars.scrollValue,
												e = t / this.options.skewReducer;
											(this.vars.speed = this._clamp(
												-e,
												-this.options.skewLimit,
												this.options.skewLimit
											)),
												this.options.isAnimated
													? (this.wrapper.style[this.transform] =
															'translate3d(-' +
															this.vars.scrollValue +
															'px, 0 ,0) skewX(' +
															this.vars.speed +
															'deg)')
													: (this.wrapper.style[this.transform] =
															'translate3d(-' +
															this.vars.scrollValue +
															'px, 0 ,0)'),
												(this.vars.oldScrollValue = this.vars.scrollValue),
												this.raf(this._update);
										},
									},
									{
										key: '_clamp',
										value: function (t, e, n) {
											return Math.min(Math.max(t, e), n);
										},
									},
									{
										key: 'onResize',
										value: function () {
											(this.vars.scrollLeft = 0),
												(this.vars.scrollRight =
													this.wrapper.getBoundingClientRect().width -
													window.innerWidth);
										},
									},
									{
										key: 'destroy',
										value: function () {
											this._removeEvents();
										},
									},
								]),
								e
							);
						})(u.EventEmitter);
					n['default'] = y;
				},
				{ events: 2, prefix: 6, raf: 8, 'virtual-scroll': 11 },
			],
		},
		{},
		[13]
	)(13);
});
//# sourceMappingURL=index.js.map
