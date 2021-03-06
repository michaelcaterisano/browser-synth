! function(e, i) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : e.InlineStylePrefixer = i()
}

(this, function() {
    "use strict";

    function e(e, i) {
        return i = {
            exports: {}
        }, e(i, i.exports), i.exports
    }

    function i(e, i) {
        if ("string" == typeof i && !B(i) && i.indexOf("calc(") > -1) return O(e, i, function(e, i) {
            return i.replace(/calc\(/g, e + "calc(")
        })
    }

    function r(e, i) {
        if ("cursor" === e && P[i]) return O(e, i)
    }

    function n(e, i) {
        if ("display" === e && I[i]) return {
            display: ["-webkit-box", "-moz-box", "-ms-" + i + "box", "-webkit-" + i, i]
        }
    }

    function o(e, i) {
        if (F[e] && D[i]) return O(e, i)
    }

    function t(e, i) {
        if ("string" == typeof i && !B(i) && null !== i.match(R)) return O(e, i)
    }

    function a(e, i) {
        if ("string" == typeof i && j[e]) {
            var r, n = s(i),
                o = n.split(/, (?![^()]*(?: \([^()]*\))?\))/g).filter(function(e) {
                    return null === e.match(/-moz-|-ms-/)
                }).join(",");
            return e.indexOf("Webkit") > -1 ? S.defineProperty({}, e, o) : (r = {}, S.defineProperty(r, "Webkit" + C(e), o), S.defineProperty(r, e, n), r)
        }
    }

    function s(e) {
        if (B(e)) return e;
        var i = e.split(/, (?![^()]*(?: \([^()]*\))?\))/g);
        return i.forEach(function(e, r) {
                i[r] = Object.keys(w).reduce(function(i, r) {
                    var n = "-" + r.toLowerCase() + "-";
                    return Object.keys(w[r]).forEach(function(r) {
                        var o = W(r);
                        e.indexOf(o) > -1 && "order" !== o && (i = e.replace(o, n + o) + "," + i)
                    }), i
                }, e)
            }),
            i.join(",")
    }

    function l(e, i) {
        if (T[e]) return S.defineProperty({}, T[e], E[i] || i)
    }

    function m(e, i) {
        return "flexDirection" === e ? {
                WebkitBoxOrient: i.indexOf("column") > -1 ? "vertical" : "horizontal",
                WebkitBoxDirection: i.indexOf("reverse") > -1 ? "reverse" : "normal"
            } :
            z[e] ? S.defineProperty({}, z[e], _[i] || i) : void 0
    }

    function f(e) {
        return Object.keys(e).forEach(function(i) {
                var r = e[i];
                r instanceof Object && !Array.isArray(r) ? e[i] = f(r) : Object.keys(w).forEach(function(n) {
                    var o = w[n];
                    o[i] && (e[n + C(i)] = r)
                })
            }),
            Object.keys(e).forEach(function(i) {
                [].concat(e[i]).forEach(function(r, n) {
                    M.forEach(function(n) {
                        return c(e, n(i, r))
                    })
                })
            }),
            e
    }

    function c(e) {
        var i = arguments.length <= 1 || void 0 === arguments[1] ? {} :
            arguments[1];
        Object.keys(i).forEach(function(r) {
            var n = e[r];
            Array.isArray(n) ? [].concat(i[r]).forEach(function(i) {
                var o = n.indexOf(i);
                o > -1 && e[r].splice(o, 1), e[r].push(i)
            }) : e[r] = i[r]
        })
    }

    function d(e) {
        var i = e.property,
            r = e.value,
            n = e.browserInfo,
            o = n.browser,
            t = n.version,
            a = e.prefix.css,
            s = e.keepUnprefixed;
        if ("string" == typeof r && r.indexOf("calc(") > -1 && ("firefox" === o && t < 15 || "chrome" === o && t < 25 || "safari" === o && t < 6.1 || "ios_saf" === o && t < 7)) return S.defineProperty({}, i, N(r.replace(/calc\(/g, a + "calc("), r, s))
    }

    function u(e) {
        var i = e.property,
            r = e.value,
            n = e.browserInfo,
            o = n.browser,
            t = n.version,
            a = e.prefix.css,
            s = e.keepUnprefixed;
        if ("cursor" === i && V[r] && ("firefox" === o && t < 24 || "chrome" === o && t < 37 || "safari" === o && t < 9 || "opera" === o && t < 24)) return {
            cursor: N(a + r, r, s)
        }
    }

    function p(e) {
        var i = e.property,
            r = e.value,
            n = e.browserInfo,
            o = n.browser,
            t = (n.version, e.prefix.css),
            a = e.keepUnprefixed;
        if ("cursor" === i && Z[r] && ("firefox" === o || "chrome" === o || "safari" === o || "opera" === o)) return {
            cursor: N(t + r, r, a)
        }
    }

    function g(e) {
        var i = e.property,
            r = e.value,
            n = e.browserInfo,
            o = n.browser,
            t = n.version,
            a = e.prefix.css,
            s = e.keepUnprefixed;
        if ("display" === i && H[r] && ("chrome" === o && t < 29 && t > 20 || ("safari" === o || "ios_saf" === o) && t < 9 && t > 6 || "opera" === o && (15 == t || 16 == t))) return {
            display: N(a + r, r, s)
        }
    }

    function x(e) {
        var i = e.property,
            r = e.value,
            n = e.prefix.css,
            o = e.keepUnprefixed;
        if (J[i] && Q[r]) return S.defineProperty({}, i, N(n + r, r, o))
    }

    function k(e) {
        var i = e.property,
            r = e.value,
            n = e.browserInfo,
            o = n.browser,
            t = n.version,
            a = e.prefix.css,
            s = e.keepUnprefixed;
        if ("string" == typeof r && null !== r.match($) && ("firefox" === o && t < 16 || "chrome" === o && t < 26 || ("safari" === o || "ios_saf" === o) && t < 7 || ("opera" === o || "op_mini" === o) && t < 12.1 || "android" === o && t < 4.4 || "and_uc" === o)) return S.defineProperty({}, i, N(a + r, r, s))
    }

    function h(e) {
        var i = e.property,
            r = e.value,
            n = e.prefix.css,
            o = e.requiresPrefix,
            t = e.keepUnprefixed,
            a = ee(i);
        if ("string" == typeof r && ie[a]) {
            var s = function() {
                    var e = Object.keys(o).map(function(e) {
                            return W(e)
                        }),
                        a = r.split(/, (?![^()]*(?:\([^()]*\))?\))/g);
                    return e.forEach(function(e) {
                        a.forEach(function(i, r) {
                            i.indexOf(e) > -1 && "order" !== e && (a[r] = i.replace(e, n + e) + (t ? "," + i : ""))
                        })
                    }), {
                        v: S.defineProperty({}, i, a.join(","))
                    }
                }
                ();
            if ("object" === ("undefined" == typeof s ? "undefined" : S["typeof"](s))) return s.v
        }
    }

    function b(e) {
        var i = e.property,
            r = e.value,
            n = e.styles,
            o = e.browserInfo,
            t = o.browser,
            a = o.version,
            s = e.prefix.css,
            l = e.keepUnprefixed;
        if ((ne[i] || "display" === i && "string" == typeof r && r.indexOf("flex") > -1) && ("ie_mob" === t || "ie" === t) && 10 == a) {
            if (l || Array.isArray(n[i]) || delete n[i], "display" === i && re[r]) return {
                display: N(s + re[r], r, l)
            };
            if (ne[i]) return S.defineProperty({}, ne[i], re[r] || r)
        }
    }

    function y(e) {
        var i = e.property,
            r = e.value,
            n = e.styles,
            o = e.browserInfo,
            t = o.browser,
            a = o.version,
            s = e.prefix.css,
            l = e.keepUnprefixed;
        if ((se.indexOf(i) > -1 || "display" === i && "string" == typeof r && r.indexOf("flex") > -1) && ("firefox" === t && a < 22 || "chrome" === t && a < 21 || ("safari" === t || "ios_saf" === t) && a <= 6.1 || "android" === t && a < 4.4 || "and_uc" === t)) {
            if (l || Array.isArray(n[i]) || delete n[i], "flexDirection" === i) return {
                WebkitBoxOrient: r.indexOf("column") > -1 ? "vertical" : "horizontal",
                WebkitBoxDirection: r.indexOf("reverse") > -1 ? "reverse" : "normal"
            };
            if ("display" === i && oe[r]) return {
                display: N(s + oe[r], r, l)
            };
            if (te[i]) return S.defineProperty({}, te[i], oe[r] || r)
        }
    }

    function v(e) {
        var i = arguments.length <= 1 || void 0 === arguments[1] ? {} :
            arguments[1],
            r = arguments[2],
            n = arguments[3];
        Object.keys(i).forEach(function(o) {
            var t = e[o];
            Array.isArray(t) ? [].concat(i[o]).forEach(function(i) {
                e[o].indexOf(i) === -1 && e[o].splice(t.indexOf(r), n ? 0 : 1, i)
            }) : e[o] = i[o]
        })
    }
    var S = {};
    S["typeof"] = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } :
        function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        S.classCallCheck = function(e, i) {
            if (!(e instanceof i)) throw new TypeError("Cannot call a class as a function")
        },
        S.createClass = function() {
            function e(e, i) {
                for (var r = 0; r < i.length; r++) {
                    var n = i[r];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function(i, r, n) {
                return r && e(i.prototype, r),
                    n && e(i, n),
                    i
            }
        }
        (),
        S.defineProperty = function(e, i, r) {
            return i in e ? Object.defineProperty(e, i, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[i] = r,
                e
        };
    var w = {
            Webkit: {
                transform: !0,
                transformOrigin: !0,
                transformOriginX: !0,
                transformOriginY: !0,
                backfaceVisibility: !0,
                perspective: !0,
                perspectiveOrigin: !0,
                transformStyle: !0,
                transformOriginZ: !0,
                animation: !0,
                animationDelay: !0,
                animationDirection: !0,
                animationFillMode: !0,
                animationDuration: !0,
                animationIterationCount: !0,
                animationName: !0,
                animationPlayState: !0,
                animationTimingFunction: !0,
                appearance: !0,
                userSelect: !0,
                fontKerning: !0,
                textEmphasisPosition: !0,
                textEmphasis: !0,
                textEmphasisStyle: !0,
                textEmphasisColor: !0,
                boxDecorationBreak: !0,
                clipPath: !0,
                maskImage: !0,
                maskMode: !0,
                maskRepeat: !0,
                maskPosition: !0,
                maskClip: !0,
                maskOrigin: !0,
                maskSize: !0,
                maskComposite: !0,
                mask: !0,
                maskBorderSource: !0,
                maskBorderMode: !0,
                maskBorderSlice: !0,
                maskBorderWidth: !0,
                maskBorderOutset: !0,
                maskBorderRepeat: !0,
                maskBorder: !0,
                maskType: !0,
                textDecorationStyle: !0,
                textDecorationSkip: !0,
                textDecorationLine: !0,
                textDecorationColor: !0,
                filter: !0,
                fontFeatureSettings: !0,
                breakAfter: !0,
                breakBefore: !0,
                breakInside: !0,
                columnCount: !0,
                columnFill: !0,
                columnGap: !0,
                columnRule: !0,
                columnRuleColor: !0,
                columnRuleStyle: !0,
                columnRuleWidth: !0,
                columns: !0,
                columnSpan: !0,
                columnWidth: !0,
                flex: !0,
                flexBasis: !0,
                flexDirection: !0,
                flexGrow: !0,
                flexFlow: !0,
                flexShrink: !0,
                flexWrap: !0,
                alignContent: !0,
                alignItems: !0,
                alignSelf: !0,
                justifyContent: !0,
                order: !0,
                transition: !0,
                transitionDelay: !0,
                transitionDuration: !0,
                transitionProperty: !0,
                transitionTimingFunction: !0,
                backdropFilter: !0,
                scrollSnapType: !0,
                scrollSnapPointsX: !0,
                scrollSnapPointsY: !0,
                scrollSnapDestination: !0,
                scrollSnapCoordinate: !0,
                shapeImageThreshold: !0,
                shapeImageMargin: !0,
                shapeImageOutside: !0,
                hyphens: !0,
                flowInto: !0,
                flowFrom: !0,
                regionFragment: !0,
                textSizeAdjust: !0,
                borderImage: !0,
                borderImageOutset: !0,
                borderImageRepeat: !0,
                borderImageSlice: !0,
                borderImageSource: !0,
                borderImageWidth: !0,
                tabSize: !0,
                objectFit: !0,
                objectPosition: !0
            },
            Moz: {
                appearance: !0,
                userSelect: !0,
                boxSizing: !0,
                textAlignLast: !0,
                textDecorationStyle: !0,
                textDecorationSkip: !0,
                textDecorationLine: !0,
                textDecorationColor: !0,
                tabSize: !0,
                hyphens: !0,
                fontFeatureSettings: !0,
                breakAfter: !0,
                breakBefore: !0,
                breakInside: !0,
                columnCount: !0,
                columnFill: !0,
                columnGap: !0,
                columnRule: !0,
                columnRuleColor: !0,
                columnRuleStyle: !0,
                columnRuleWidth: !0,
                columns: !0,
                columnSpan: !0,
                columnWidth: !0
            },
            ms: {
                flex: !0,
                flexBasis: !1,
                flexDirection: !0,
                flexGrow: !1,
                flexFlow: !0,
                flexShrink: !1,
                flexWrap: !0,
                alignContent: !1,
                alignItems: !1,
                alignSelf: !1,
                justifyContent: !1,
                order: !1,
                transform: !0,
                transformOrigin: !0,
                transformOriginX: !0,
                transformOriginY: !0,
                userSelect: !0,
                wrapFlow: !0,
                wrapThrough: !0,
                wrapMargin: !0,
                scrollSnapType: !0,
                scrollSnapPointsX: !0,
                scrollSnapPointsY: !0,
                scrollSnapDestination: !0,
                scrollSnapCoordinate: !0,
                touchAction: !0,
                hyphens: !0,
                flowInto: !0,
                flowFrom: !0,
                breakBefore: !0,
                breakAfter: !0,
                breakInside: !0,
                regionFragment: !0,
                gridTemplateColumns: !0,
                gridTemplateRows: !0,
                gridTemplateAreas: !0,
                gridTemplate: !0,
                gridAutoColumns: !0,
                gridAutoRows: !0,
                gridAutoFlow: !0,
                grid: !0,
                gridRowStart: !0,
                gridColumnStart: !0,
                gridRowEnd: !0,
                gridRow: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnGap: !0,
                gridRowGap: !0,
                gridArea: !0,
                gridGap: !0,
                textSizeAdjust: !0
            }
        },
        C = function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        },
        O = function(e, i) {
            var r = arguments.length <= 2 || void 0 === arguments[2] ? function(e, i) {
                    return e + i
                } :
                arguments[2];
            return S.defineProperty({}, e, ["-webkit-", "-moz-", ""].map(function(e) {
                return r(e, i)
            }))
        },
        B = function(e) {
            return Array.isArray(e) && (e = e.join(",")),
                null !== e.match(/-webkit-|-moz-|-ms-/)
        },
        P = {
            "zoom-in": !0,
            "zoom-out": !0,
            grab: !0,
            grabbing: !0
        },
        I = {
            flex: !0,
            "inline-flex": !0
        },
        F = {
            maxHeight: !0,
            maxWidth: !0,
            width: !0,
            height: !0,
            columnWidth: !0,
            minWidth: !0,
            minHeight: !0
        },
        D = {
            "min-content": !0,
            "max-content": !0,
            "fill-available": !0,
            "fit-content": !0,
            "contain-floats": !0
        },
        R = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/,
        A = e(function(e) {
            function i(e) {
                return e.replace(r, "-$&").toLowerCase().replace(n, "-ms-")
            }
            var r = /[A-Z]/g,
                n = /^ms-/;
            e.exports = i
        }),
        W = A && "object" == typeof A && "default" in A ? A["default"] : A,
        j = {
            transition: !0,
            transitionProperty: !0,
            WebkitTransition: !0,
            WebkitTransitionProperty: !0
        },
        E = {
            "space-around": "distribute",
            "space-between": "justify",
            "flex-start": "start",
            "flex-end": "end"
        },
        T = {
            alignContent: "msFlexLinePack",
            alignSelf: "msFlexItemAlign",
            alignItems: "msFlexAlign",
            justifyContent: "msFlexPack",
            order: "msFlexOrder",
            flexGrow: "msFlexPositive",
            flexShrink: "msFlexNegative",
            flexBasis: "msPreferredSize"
        },
        _ = {
            "space-around": "justify",
            "space-between": "justify",
            "flex-start": "start",
            "flex-end": "end",
            "wrap-reverse": "multiple",
            wrap: "multiple"
        },
        z = {
            alignItems: "WebkitBoxAlign",
            justifyContent: "WebkitBoxPack",
            flexWrap: "WebkitBoxLines"
        },
        M = [i,
            r,
            o,
            t,
            a,
            l,
            m,
            n
        ],
        G = e(function(e) {
            ! function(i, r) {
                "undefined" != typeof e && e.exports ? e.exports = r() : "function" == typeof define && define.amd ? define(r) : this[i] = r()
            }
            ("bowser", function() {
                function e(e) {
                    function i(i) {
                        var r = e.match(i);
                        return r && r.length > 1 && r[1] || ""
                    }

                    function r(i) {
                        var r = e.match(i);
                        return r && r.length > 1 && r[2] || ""
                    }
                    var n, o = i(/(ipod|iphone|ipad)/i).toLowerCase(),
                        t = /like android/i.test(e),
                        s = !t && /android/i.test(e),
                        l = /nexus\s*[0-6]\s*/i.test(e),
                        m = !l && /nexus\s*[0-9]+/i.test(e),
                        f = /CrOS/.test(e),
                        c = /silk/i.test(e),
                        d = /sailfish/i.test(e),
                        u = /tizen/i.test(e),
                        p = /(web|hpw)os/i.test(e),
                        g = /windows phone/i.test(e),
                        x = !g && /windows/i.test(e),
                        k = !o && !c && /macintosh/i.test(e),
                        h = !s && !d && !u && !p && /linux/i.test(e),
                        b = i(/edge\/(\d+(\.\d+)?)/i),
                        y = i(/version\/(\d+(\.\d+)?)/i),
                        v = /tablet/i.test(e),
                        S = !v && /[^-]mobi/i.test(e),
                        w = /xbox/i.test(e);
                    /opera|opr|opios/i.test(e) ? n = {
                            name: "Opera",
                            opera: a,
                            version: y || i(/(?: opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                        } :
                        /coast/i.test(e) ? n = {
                            name: "Opera Coast",
                            coast: a,
                            version: y || i(/(?: coast)[\s\/](\d+(\.\d+)?)/i)
                        } :
                        /yabrowser/i.test(e) ? n = {
                            name: "Yandex Browser",
                            yandexbrowser: a,
                            version: y || i(/(?: yabrowser)[\s\/](\d+(\.\d+)?)/i)
                        } :
                        /ucbrowser/i.test(e) ? n = {
                            name: "UC Browser",
                            ucbrowser: a,
                            version: i(/(?: ucbrowser)[\s\/](\d+(?: \.\d+)+)/i)
                        } :
                        /mxios/i.test(e) ? n = {
                            name: "Maxthon",
                            maxthon: a,
                            version: i(/(?: mxios)[\s\/](\d+(?: \.\d+)+)/i)
                        } :
                        /epiphany/i.test(e) ? n = {
                            name: "Epiphany",
                            epiphany: a,
                            version: i(/(?: epiphany)[\s\/](\d+(?: \.\d+)+)/i)
                        } :
                        /puffin/i.test(e) ? n = {
                            name: "Puffin",
                            puffin: a,
                            version: i(/(?: puffin)[\s\/](\d+(?: \.\d+)?)/i)
                        } :
                        /sleipnir/i.test(e) ? n = {
                            name: "Sleipnir",
                            sleipnir: a,
                            version: i(/(?: sleipnir)[\s\/](\d+(?: \.\d+)+)/i)
                        } :
                        /k-meleon/i.test(e) ? n = {
                            name: "K-Meleon",
                            kMeleon: a,
                            version: i(/(?: k-meleon)[\s\/](\d+(?: \.\d+)+)/i)
                        } :
                        g ? (n = {
                            name: "Windows Phone",
                            windowsphone: a
                        }, b ? (n.msedge = a, n.version = b) : (n.msie = a, n.version = i(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(e) ? n = {
                            name: "Internet Explorer",
                            msie: a,
                            version: i(/(?: msie |rv: )(\d+(\.\d+)?)/i)
                        } :
                        f ? n = {
                            name: "Chrome",
                            chromeos: a,
                            chromeBook: a,
                            chrome: a,
                            version: i(/(?: chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                        } :
                        /chrome.+? edge/i.test(e) ? n = {
                            name: "Microsoft Edge",
                            msedge: a,
                            version: b
                        } :
                        /vivaldi/i.test(e) ? n = {
                            name: "Vivaldi",
                            vivaldi: a,
                            version: i(/vivaldi\/(\d+(\.\d+)?)/i) || y
                        } :
                        d ? n = {
                            name: "Sailfish",
                            sailfish: a,
                            version: i(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                        } :
                        /seamonkey\ / / i.test(e) ? n = {
                            name: "SeaMonkey",
                            seamonkey: a,
                            version: i(/seamonkey\/(\d+(\.\d+)?)/i)
                        } : /firefox|iceweasel|fxios/i.test(e) ? (n = {
                            name: "Firefox",
                            firefox: a,
                            version: i(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                        }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e) && (n.firefoxos = a)) : c ? n = {
                            name: "Amazon Silk",
                            silk: a,
                            version: i(/silk\/(\d+(\.\d+)?)/i)
                        } : /phantom/i.test(e) ? n = {
                            name: "PhantomJS",
                            phantom: a,
                            version: i(/phantomjs\/(\d+(\.\d+)?)/i)
                        } : /slimerjs/i.test(e) ? n = {
                            name: "SlimerJS",
                            slimer: a,
                            version: i(/slimerjs\/(\d+(\.\d+)?)/i)
                        } : /blackberry|\bbb\d+/i.test(e) || /rim\stablet/i.test(e) ? n = {
                            name: "BlackBerry",
                            blackberry: a,
                            version: y || i(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                        } : p ? (n = {
                            name: "WebOS",
                            webos: a,
                            version: y || i(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                        }, /touchpad\//i.test(e) && (n.touchpad = a)) : /bada/i.test(e) ? n = {
                            name: "Bada",
                            bada: a,
                            version: i(/dolfin\/(\d+(\.\d+)?)/i)
                        } : u ? n = {
                            name: "Tizen",
                            tizen: a,
                            version: i(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || y
                        } : /qupzilla/i.test(e) ? n = {
                            name: "QupZilla",
                            qupzilla: a,
                            version: i(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || y
                        } : /chromium/i.test(e) ? n = {
                            name: "Chromium",
                            chromium: a,
                            version: i(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || y
                        } : /chrome|crios|crmo/i.test(e) ? n = {
                            name: "Chrome",
                            chrome: a,
                            version: i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                        } : s ? n = {
                            name: "Android",
                            version: y
                        } : /safari|applewebkit/i.test(e) ? (n = {
                            name: "Safari",
                            safari: a
                        }, y && (n.version = y)) : o ? (n = {
                            name: "iphone" == o ? "iPhone" : "ipad" == o ? "iPad" : "iPod"
                        }, y && (n.version = y)) : n = /googlebot/i.test(e) ? {
                            name: "Googlebot",
                            googlebot: a,
                            version: i(/googlebot\/(\d+(\.\d+))/i) || y
                        } : {
                            name: i(/^(.*)\/(.*) /),
                            version: r(/^(.*)\/(.*) /)
                        }, !n.msedge && /(apple)?webkit/i.test(e) ? (/(apple)?webkit\/537\.36/i.test(e) ? (n.name = n.name || "Blink", n.blink = a) : (n.name = n.name || "Webkit", n.webkit = a), !n.version && y && (n.version = y)) : !n.opera && /gecko\//i.test(e) && (n.name = n.name || "Gecko", n.gecko = a, n.version = n.version || i(/gecko\/(\d+(\.\d+)?)/i)), n.msedge || !s && !n.silk ? o ? (n[o] = a, n.ios = a) : k ? n.mac = a : w ? n.xbox = a : x ? n.windows = a : h && (n.linux = a) : n.android = a;
                    var C = "";
                    n.windowsphone ? C = i(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : o ? (C = i(/os (\d+([_\s]\d+)*) like mac os x/i), C = C.replace(/[_\s]/g, ".")) : s ? C = i(/android[ \/-](\d+(\.\d+)*)/i) : n.webos ? C = i(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : n.blackberry ? C = i(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : n.bada ? C = i(/bada\/(\d+(\.\d+)*)/i) : n.tizen && (C = i(/tizen[\/\s](\d+(\.\d+)*)/i)), C && (n.osversion = C);
                    var O = C.split(".")[0];
                    return v || m || "ipad" == o || s && (3 == O || O >= 4 && !S) || n.silk ? n.tablet = a : (S || "iphone" == o || "ipod" == o || s || l || n.blackberry || n.webos || n.bada) && (n.mobile = a), n.msedge || n.msie && n.version >= 10 || n.yandexbrowser && n.version >= 15 || n.vivaldi && n.version >= 1 || n.chrome && n.version >= 20 || n.firefox && n.version >= 20 || n.safari && n.version >= 6 || n.opera && n.version >= 10 || n.ios && n.osversion && n.osversion.split(".")[0] >= 6 || n.blackberry && n.version >= 10.1 || n.chromium && n.version >= 20 ? n.a = a : n.msie && n.version < 10 || n.chrome && n.version < 20 || n.firefox && n.version < 20 || n.safari && n.version < 6 || n.opera && n.version < 10 || n.ios && n.osversion && n.osversion.split(".")[0] < 6 || n.chromium && n.version < 20 ? n.c = a : n.x = a, n
                }

                function i(e) {
                    return e.split(".").length
                }

                function r(e, i) {
                    var r, n = [];
                    if (Array.prototype.map) return Array.prototype.map.call(e, i);
                    for (r = 0; r < e.length; r++) n = i(e[r]);
                    return n
                }

                function n(e) {
                    for (var n = Math.max(i(e[0]), i(e[1])), o = r(e, function(e) {
                            var o = n - i(e);
                            return e += new Array(o + 1).join(".0"), r(e.split("."), function(e) {
                                return new Array(20 - e.length).join("0") + e
                            }).reverse()
                        }); --n >= 0;) {
                        if (o[0][n] > o[1][n]) return 1;
                        if (o[0][n] !== o[1][n]) return -1;
                        if (0 === n) return 0
                    }
                }

                function o(i, r, o) {
                    var t = s;
                    "string" == typeof r && (o = r, r = void 0), void 0 === r && (r = !1), o && (t = e(o));
                    var a = "" + t.version;
                    for (var l in i)
                        if (i.hasOwnProperty(l) && t[l] && n([a, i[l]]) < 0) return !0;
                    return r
                }

                function t(e, i) {
                    return !o(e, i)
                }
                var a = !0,
                    s = e("undefined" != typeof navigator ? navigator.userAgent : "");
                return s.test = function(e) {
                    for (var i = 0; i < e.length; ++i) {
                        var r = e[i];
                        if ("string" == typeof r && r in s) return !0
                    }
                    return !1
                }, s.isUnsupportedBrowser = o, s.compareVersions = n, s.check = t, s._detect = e, s
            })
        }),
        L = G && "object" == typeof G && "default" in G ? G["default"] : G,
        U = {
            Webkit: ["chrome", "safari", "ios", "android", "phantom", "opera", "webos", "blackberry", "bada", "tizen", "chromium", "vivaldi"],
            Moz: ["firefox", "seamonkey", "sailfish"],
            ms: ["msie", "msedge"]
        },
        Y = {
            chrome: [
                ["chrome"],
                ["chromium"]
            ],
            safari: [
                ["safari"]
            ],
            firefox: [
                ["firefox"]
            ],
            ie: [
                ["msie"]
            ],
            edge: [
                ["msedge"]
            ],
            opera: [
                ["opera"],
                ["vivaldi"]
            ],
            ios_saf: [
                ["ios", "mobile"],
                ["ios", "tablet"]
            ],
            ie_mob: [
                ["windowsphone", "mobile", "msie"],
                ["windowsphone", "tablet", "msie"],
                ["windowsphone", "mobile", "msedge"],
                ["windowsphone", "tablet", "msedge"]
            ],
            op_mini: [
                ["opera", "mobile"],
                ["opera", "tablet"]
            ],
            and_uc: [
                ["android", "mobile"],
                ["android", "tablet"]
            ],
            android: [
                ["android", "mobile"],
                ["android", "tablet"]
            ]
        },
        X = function(e) {
            if (!e) return !1;
            var i = L._detect(e);
            Object.keys(U).forEach(function(e) {
                U[e].forEach(function(r) {
                    i[r] && (i.prefix = {
                        inline: e,
                        css: "-" + e.toLowerCase() + "-"
                    })
                })
            });
            var r = "";
            return Object.keys(Y).forEach(function(e) {
                Y[e].forEach(function(n) {
                    var o = 0;
                    n.forEach(function(e) {
                        i[e] && (o += 1)
                    }), n.length === o && (r = e)
                })
            }), i.browser = r, i.version = i.version ? parseFloat(i.version) : parseInt(parseFloat(i.osversion), 10), "android" === i.browser && i.chrome && i.version > 37 && (i.browser = "and_chr"), i.version = parseFloat(i.version), i.osversion = parseFloat(i.osversion), "android" === i.browser && i.osversion < 5 && (i.version = i.osversion), i
        },
        q = function(e) {
            var i = e.browser,
                r = e.version,
                n = e.prefix,
                o = "keyframes";
            return ("chrome" === i && r < 43 || ("safari" === i || "ios_saf" === i) && r < 9 || "opera" === i && r < 30 || "android" === i && r <= 4.4 || "and_uc" === i) && (o = n.css + o), o
        },
        K = {
            chrome: {
                transform: 35,
                transformOrigin: 35,
                transformOriginX: 35,
                transformOriginY: 35,
                backfaceVisibility: 35,
                perspective: 35,
                perspectiveOrigin: 35,
                transformStyle: 35,
                transformOriginZ: 35,
                animation: 42,
                animationDelay: 42,
                animationDirection: 42,
                animationFillMode: 42,
                animationDuration: 42,
                animationIterationCount: 42,
                animationName: 42,
                animationPlayState: 42,
                animationTimingFunction: 42,
                appearance: 54,
                userSelect: 54,
                fontKerning: 32,
                textEmphasisPosition: 54,
                textEmphasis: 54,
                textEmphasisStyle: 54,
                textEmphasisColor: 54,
                boxDecorationBreak: 54,
                clipPath: 54,
                maskImage: 54,
                maskMode: 54,
                maskRepeat: 54,
                maskPosition: 54,
                maskClip: 54,
                maskOrigin: 54,
                maskSize: 54,
                maskComposite: 54,
                mask: 54,
                maskBorderSource: 54,
                maskBorderMode: 54,
                maskBorderSlice: 54,
                maskBorderWidth: 54,
                maskBorderOutset: 54,
                maskBorderRepeat: 54,
                maskBorder: 54,
                maskType: 54,
                textDecorationStyle: 54,
                textDecorationSkip: 54,
                textDecorationLine: 54,
                textDecorationColor: 54,
                filter: 54,
                fontFeatureSettings: 47,
                breakAfter: 49,
                breakBefore: 49,
                breakInside: 49,
                columnCount: 49,
                columnFill: 49,
                columnGap: 49,
                columnRule: 49,
                columnRuleColor: 49,
                columnRuleStyle: 49,
                columnRuleWidth: 49,
                columns: 49,
                columnSpan: 49,
                columnWidth: 49
            },
            safari: {
                flex: 8,
                flexBasis: 8,
                flexDirection: 8,
                flexGrow: 8,
                flexFlow: 8,
                flexShrink: 8,
                flexWrap: 8,
                alignContent: 8,
                alignItems: 8,
                alignSelf: 8,
                justifyContent: 8,
                order: 8,
                transition: 6,
                transitionDelay: 6,
                transitionDuration: 6,
                transitionProperty: 6,
                transitionTimingFunction: 6,
                transform: 8,
                transformOrigin: 8,
                transformOriginX: 8,
                transformOriginY: 8,
                backfaceVisibility: 8,
                perspective: 8,
                perspectiveOrigin: 8,
                transformStyle: 8,
                transformOriginZ: 8,
                animation: 8,
                animationDelay: 8,
                animationDirection: 8,
                animationFillMode: 8,
                animationDuration: 8,
                animationIterationCount: 8,
                animationName: 8,
                animationPlayState: 8,
                animationTimingFunction: 8,
                appearance: 10,
                userSelect: 10,
                backdropFilter: 10,
                fontKerning: 9,
                scrollSnapType: 10,
                scrollSnapPointsX: 10,
                scrollSnapPointsY: 10,
                scrollSnapDestination: 10,
                scrollSnapCoordinate: 10,
                textEmphasisPosition: 7,
                textEmphasis: 7,
                textEmphasisStyle: 7,
                textEmphasisColor: 7,
                boxDecorationBreak: 10,
                clipPath: 10,
                maskImage: 10,
                maskMode: 10,
                maskRepeat: 10,
                maskPosition: 10,
                maskClip: 10,
                maskOrigin: 10,
                maskSize: 10,
                maskComposite: 10,
                mask: 10,
                maskBorderSource: 10,
                maskBorderMode: 10,
                maskBorderSlice: 10,
                maskBorderWidth: 10,
                maskBorderOutset: 10,
                maskBorderRepeat: 10,
                maskBorder: 10,
                maskType: 10,
                textDecorationStyle: 10,
                textDecorationSkip: 10,
                textDecorationLine: 10,
                textDecorationColor: 10,
                shapeImageThreshold: 10,
                shapeImageMargin: 10,
                shapeImageOutside: 10,
                filter: 9,
                hyphens: 10,
                flowInto: 10,
                flowFrom: 10,
                breakBefore: 8,
                breakAfter: 8,
                breakInside: 8,
                regionFragment: 10,
                columnCount: 8,
                columnFill: 8,
                columnGap: 8,
                columnRule: 8,
                columnRuleColor: 8,
                columnRuleStyle: 8,
                columnRuleWidth: 8,
                columns: 8,
                columnSpan: 8,
                columnWidth: 8
            },
            firefox: {
                appearance: 50,
                userSelect: 50,
                boxSizing: 28,
                textAlignLast: 48,
                textDecorationStyle: 35,
                textDecorationSkip: 35,
                textDecorationLine: 35,
                textDecorationColor: 35,
                tabSize: 50,
                hyphens: 42,
                fontFeatureSettings: 33,
                breakAfter: 50,
                breakBefore: 50,
                breakInside: 50,
                columnCount: 50,
                columnFill: 50,
                columnGap: 50,
                columnRule: 50,
                columnRuleColor: 50,
                columnRuleStyle: 50,
                columnRuleWidth: 50,
                columns: 50,
                columnSpan: 50,
                columnWidth: 50
            },
            opera: {
                flex: 16,
                flexBasis: 16,
                flexDirection: 16,
                flexGrow: 16,
                flexFlow: 16,
                flexShrink: 16,
                flexWrap: 16,
                alignContent: 16,
                alignItems: 16,
                alignSelf: 16,
                justifyContent: 16,
                order: 16,
                transform: 22,
                transformOrigin: 22,
                transformOriginX: 22,
                transformOriginY: 22,
                backfaceVisibility: 22,
                perspective: 22,
                perspectiveOrigin: 22,
                transformStyle: 22,
                transformOriginZ: 22,
                animation: 29,
                animationDelay: 29,
                animationDirection: 29,
                animationFillMode: 29,
                animationDuration: 29,
                animationIterationCount: 29,
                animationName: 29,
                animationPlayState: 29,
                animationTimingFunction: 29,
                appearance: 40,
                userSelect: 40,
                fontKerning: 19,
                textEmphasisPosition: 40,
                textEmphasis: 40,
                textEmphasisStyle: 40,
                textEmphasisColor: 40,
                boxDecorationBreak: 40,
                clipPath: 40,
                maskImage: 40,
                maskMode: 40,
                maskRepeat: 40,
                maskPosition: 40,
                maskClip: 40,
                maskOrigin: 40,
                maskSize: 40,
                maskComposite: 40,
                mask: 40,
                maskBorderSource: 40,
                maskBorderMode: 40,
                maskBorderSlice: 40,
                maskBorderWidth: 40,
                maskBorderOutset: 40,
                maskBorderRepeat: 40,
                maskBorder: 40,
                maskType: 40,
                textDecorationStyle: 40,
                textDecorationSkip: 40,
                textDecorationLine: 40,
                textDecorationColor: 40,
                filter: 40,
                fontFeatureSettings: 34,
                breakAfter: 36,
                breakBefore: 36,
                breakInside: 36,
                columnCount: 36,
                columnFill: 36,
                columnGap: 36,
                columnRule: 36,
                columnRuleColor: 36,
                columnRuleStyle: 36,
                columnRuleWidth: 36,
                columns: 36,
                columnSpan: 36,
                columnWidth: 36
            },
            ie: {
                flex: 10,
                flexDirection: 10,
                flexFlow: 10,
                flexWrap: 10,
                transform: 9,
                transformOrigin: 9,
                transformOriginX: 9,
                transformOriginY: 9,
                userSelect: 11,
                wrapFlow: 11,
                wrapThrough: 11,
                wrapMargin: 11,
                scrollSnapType: 11,
                scrollSnapPointsX: 11,
                scrollSnapPointsY: 11,
                scrollSnapDestination: 11,
                scrollSnapCoordinate: 11,
                touchAction: 10,
                hyphens: 11,
                flowInto: 11,
                flowFrom: 11,
                breakBefore: 11,
                breakAfter: 11,
                breakInside: 11,
                regionFragment: 11,
                gridTemplateColumns: 11,
                gridTemplateRows: 11,
                gridTemplateAreas: 11,
                gridTemplate: 11,
                gridAutoColumns: 11,
                gridAutoRows: 11,
                gridAutoFlow: 11,
                grid: 11,
                gridRowStart: 11,
                gridColumnStart: 11,
                gridRowEnd: 11,
                gridRow: 11,
                gridColumn: 11,
                gridColumnEnd: 11,
                gridColumnGap: 11,
                gridRowGap: 11,
                gridArea: 11,
                gridGap: 11,
                textSizeAdjust: 11
            },
            edge: {
                userSelect: 14,
                wrapFlow: 14,
                wrapThrough: 14,
                wrapMargin: 14,
                scrollSnapType: 14,
                scrollSnapPointsX: 14,
                scrollSnapPointsY: 14,
                scrollSnapDestination: 14,
                scrollSnapCoordinate: 14,
                hyphens: 14,
                flowInto: 14,
                flowFrom: 14,
                breakBefore: 14,
                breakAfter: 14,
                breakInside: 14,
                regionFragment: 14,
                gridTemplateColumns: 14,
                gridTemplateRows: 14,
                gridTemplateAreas: 14,
                gridTemplate: 14,
                gridAutoColumns: 14,
                gridAutoRows: 14,
                gridAutoFlow: 14,
                grid: 14,
                gridRowStart: 14,
                gridColumnStart: 14,
                gridRowEnd: 14,
                gridRow: 14,
                gridColumn: 14,
                gridColumnEnd: 14,
                gridColumnGap: 14,
                gridRowGap: 14,
                gridArea: 14,
                gridGap: 14
            },
            ios_saf: {
                flex: 8.1,
                flexBasis: 8.1,
                flexDirection: 8.1,
                flexGrow: 8.1,
                flexFlow: 8.1,
                flexShrink: 8.1,
                flexWrap: 8.1,
                alignContent: 8.1,
                alignItems: 8.1,
                alignSelf: 8.1,
                justifyContent: 8.1,
                order: 8.1,
                transition: 6,
                transitionDelay: 6,
                transitionDuration: 6,
                transitionProperty: 6,
                transitionTimingFunction: 6,
                transform: 8.1,
                transformOrigin: 8.1,
                transformOriginX: 8.1,
                transformOriginY: 8.1,
                backfaceVisibility: 8.1,
                perspective: 8.1,
                perspectiveOrigin: 8.1,
                transformStyle: 8.1,
                transformOriginZ: 8.1,
                animation: 8.1,
                animationDelay: 8.1,
                animationDirection: 8.1,
                animationFillMode: 8.1,
                animationDuration: 8.1,
                animationIterationCount: 8.1,
                animationName: 8.1,
                animationPlayState: 8.1,
                animationTimingFunction: 8.1,
                appearance: 9.3,
                userSelect: 9.3,
                backdropFilter: 9.3,
                fontKerning: 9.3,
                scrollSnapType: 9.3,
                scrollSnapPointsX: 9.3,
                scrollSnapPointsY: 9.3,
                scrollSnapDestination: 9.3,
                scrollSnapCoordinate: 9.3,
                boxDecorationBreak: 9.3,
                clipPath: 9.3,
                maskImage: 9.3,
                maskMode: 9.3,
                maskRepeat: 9.3,
                maskPosition: 9.3,
                maskClip: 9.3,
                maskOrigin: 9.3,
                maskSize: 9.3,
                maskComposite: 9.3,
                mask: 9.3,
                maskBorderSource: 9.3,
                maskBorderMode: 9.3,
                maskBorderSlice: 9.3,
                maskBorderWidth: 9.3,
                maskBorderOutset: 9.3,
                maskBorderRepeat: 9.3,
                maskBorder: 9.3,
                maskType: 9.3,
                textSizeAdjust: 9.3,
                textDecorationStyle: 9.3,
                textDecorationSkip: 9.3,
                textDecorationLine: 9.3,
                textDecorationColor: 9.3,
                shapeImageThreshold: 9.3,
                shapeImageMargin: 9.3,
                shapeImageOutside: 9.3,
                filter: 9,
                hyphens: 9.3,
                flowInto: 9.3,
                flowFrom: 9.3,
                breakBefore: 8.1,
                breakAfter: 8.1,
                breakInside: 8.1,
                regionFragment: 9.3,
                columnCount: 8.1,
                columnFill: 8.1,
                columnGap: 8.1,
                columnRule: 8.1,
                columnRuleColor: 8.1,
                columnRuleStyle: 8.1,
                columnRuleWidth: 8.1,
                columns: 8.1,
                columnSpan: 8.1,
                columnWidth: 8.1
            },
            android: {
                borderImage: 4.2,
                borderImageOutset: 4.2,
                borderImageRepeat: 4.2,
                borderImageSlice: 4.2,
                borderImageSource: 4.2,
                borderImageWidth: 4.2,
                flex: 4.2,
                flexBasis: 4.2,
                flexDirection: 4.2,
                flexGrow: 4.2,
                flexFlow: 4.2,
                flexShrink: 4.2,
                flexWrap: 4.2,
                alignContent: 4.2,
                alignItems: 4.2,
                alignSelf: 4.2,
                justifyContent: 4.2,
                order: 4.2,
                transition: 4.2,
                transitionDelay: 4.2,
                transitionDuration: 4.2,
                transitionProperty: 4.2,
                transitionTimingFunction: 4.2,
                transform: 4.4,
                transformOrigin: 4.4,
                transformOriginX: 4.4,
                transformOriginY: 4.4,
                backfaceVisibility: 4.4,
                perspective: 4.4,
                perspectiveOrigin: 4.4,
                transformStyle: 4.4,
                transformOriginZ: 4.4,
                animation: 4.4,
                animationDelay: 4.4,
                animationDirection: 4.4,
                animationFillMode: 4.4,
                animationDuration: 4.4,
                animationIterationCount: 4.4,
                animationName: 4.4,
                animationPlayState: 4.4,
                animationTimingFunction: 4.4,
                appearance: 50,
                userSelect: 50,
                fontKerning: 4.4,
                textEmphasisPosition: 50,
                textEmphasis: 50,
                textEmphasisStyle: 50,
                textEmphasisColor: 50,
                boxDecorationBreak: 50,
                clipPath: 50,
                maskImage: 50,
                maskMode: 50,
                maskRepeat: 50,
                maskPosition: 50,
                maskClip: 50,
                maskOrigin: 50,
                maskSize: 50,
                maskComposite: 50,
                mask: 50,
                maskBorderSource: 50,
                maskBorderMode: 50,
                maskBorderSlice: 50,
                maskBorderWidth: 50,
                maskBorderOutset: 50,
                maskBorderRepeat: 50,
                maskBorder: 50,
                maskType: 50,
                filter: 50,
                fontFeatureSettings: 4.4,
                breakAfter: 50,
                breakBefore: 50,
                breakInside: 50,
                columnCount: 50,
                columnFill: 50,
                columnGap: 50,
                columnRule: 50,
                columnRuleColor: 50,
                columnRuleStyle: 50,
                columnRuleWidth: 50,
                columns: 50,
                columnSpan: 50,
                columnWidth: 50
            },
            and_chr: {
                appearance: 50,
                userSelect: 50,
                textEmphasisPosition: 50,
                textEmphasis: 50,
                textEmphasisStyle: 50,
                textEmphasisColor: 50,
                boxDecorationBreak: 50,
                clipPath: 50,
                maskImage: 50,
                maskMode: 50,
                maskRepeat: 50,
                maskPosition: 50,
                maskClip: 50,
                maskOrigin: 50,
                maskSize: 50,
                maskComposite: 50,
                mask: 50,
                maskBorderSource: 50,
                maskBorderMode: 50,
                maskBorderSlice: 50,
                maskBorderWidth: 50,
                maskBorderOutset: 50,
                maskBorderRepeat: 50,
                maskBorder: 50,
                maskType: 50,
                textDecorationStyle: 50,
                textDecorationSkip: 50,
                textDecorationLine: 50,
                textDecorationColor: 50,
                filter: 50,
                fontFeatureSettings: 50
            },
            and_uc: {
                flex: 9.9,
                flexBasis: 9.9,
                flexDirection: 9.9,
                flexGrow: 9.9,
                flexFlow: 9.9,
                flexShrink: 9.9,
                flexWrap: 9.9,
                alignContent: 9.9,
                alignItems: 9.9,
                alignSelf: 9.9,
                justifyContent: 9.9,
                order: 9.9,
                transition: 9.9,
                transitionDelay: 9.9,
                transitionDuration: 9.9,
                transitionProperty: 9.9,
                transitionTimingFunction: 9.9,
                transform: 9.9,
                transformOrigin: 9.9,
                transformOriginX: 9.9,
                transformOriginY: 9.9,
                backfaceVisibility: 9.9,
                perspective: 9.9,
                perspectiveOrigin: 9.9,
                transformStyle: 9.9,
                transformOriginZ: 9.9,
                animation: 9.9,
                animationDelay: 9.9,
                animationDirection: 9.9,
                animationFillMode: 9.9,
                animationDuration: 9.9,
                animationIterationCount: 9.9,
                animationName: 9.9,
                animationPlayState: 9.9,
                animationTimingFunction: 9.9,
                appearance: 9.9,
                userSelect: 9.9,
                fontKerning: 9.9,
                textEmphasisPosition: 9.9,
                textEmphasis: 9.9,
                textEmphasisStyle: 9.9,
                textEmphasisColor: 9.9,
                maskImage: 9.9,
                maskMode: 9.9,
                maskRepeat: 9.9,
                maskPosition: 9.9,
                maskClip: 9.9,
                maskOrigin: 9.9,
                maskSize: 9.9,
                maskComposite: 9.9,
                mask: 9.9,
                maskBorderSource: 9.9,
                maskBorderMode: 9.9,
                maskBorderSlice: 9.9,
                maskBorderWidth: 9.9,
                maskBorderOutset: 9.9,
                maskBorderRepeat: 9.9,
                maskBorder: 9.9,
                maskType: 9.9,
                textSizeAdjust: 9.9,
                filter: 9.9,
                hyphens: 9.9,
                flowInto: 9.9,
                flowFrom: 9.9,
                breakBefore: 9.9,
                breakAfter: 9.9,
                breakInside: 9.9,
                regionFragment: 9.9,
                fontFeatureSettings: 9.9,
                columnCount: 9.9,
                columnFill: 9.9,
                columnGap: 9.9,
                columnRule: 9.9,
                columnRuleColor: 9.9,
                columnRuleStyle: 9.9,
                columnRuleWidth: 9.9,
                columns: 9.9,
                columnSpan: 9.9,
                columnWidth: 9.9
            },
            op_mini: {
                borderImage: 5,
                borderImageOutset: 5,
                borderImageRepeat: 5,
                borderImageSlice: 5,
                borderImageSource: 5,
                borderImageWidth: 5,
                tabSize: 5,
                objectFit: 5,
                objectPosition: 5
            }
        },
        N = function(e, i, r) {
            return r ? [e, i] : e
        },
        V = {
            "zoom-in": !0,
            "zoom-out": !0
        },
        Z = {
            grab: !0,
            grabbing: !0
        },
        H = {
            flex: !0,
            "inline-flex": !0
        },
        J = {
            maxHeight: !0,
            maxWidth: !0,
            width: !0,
            height: !0,
            columnWidth: !0,
            minWidth: !0,
            minHeight: !0
        },
        Q = {
            "min-content": !0,
            "max-content": !0,
            "fill-available": !0,
            "fit-content": !0,
            "contain-floats": !0
        },
        $ = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/,
        ee = function(e) {
            var i = e.replace(/^(ms|Webkit|Moz|O)/, "");
            return i.charAt(0).toLowerCase() + i.slice(1)
        },
        ie = {
            transition: !0,
            transitionProperty: !0
        },
        re = {
            "space-around": "distribute",
            "space-between": "justify",
            "flex-start": "start",
            "flex-end": "end",
            flex: "flexbox",
            "inline-flex": "inline-flexbox"
        },
        ne = {
            alignContent: "msFlexLinePack",
            alignSelf: "msFlexItemAlign",
            alignItems: "msFlexAlign",
            justifyContent: "msFlexPack",
            order: "msFlexOrder",
            flexGrow: "msFlexPositive",
            flexShrink: "msFlexNegative",
            flexBasis: "msPreferredSize"
        },
        oe = {
            "space-around": "justify",
            "space-between": "justify",
            "flex-start": "start",
            "flex-end": "end",
            "wrap-reverse": "multiple",
            wrap: "multiple",
            flex: "box",
            "inline-flex": "inline-box"
        },
        te = {
            alignItems: "WebkitBoxAlign",
            justifyContent: "WebkitBoxPack",
            flexWrap: "WebkitBoxLines"
        },
        ae = ["alignContent", "alignSelf", "order", "flexGrow", "flexShrink", "flexBasis", "flexDirection"],
        se = Object.keys(te).concat(ae),
        le = [d, u, p, x, k, h, b, y, g],
        me = function() {
            function e() {
                var i = this,
                    r = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                S.classCallCheck(this, e);
                var n = "undefined" != typeof navigator ? navigator.userAgent : void 0;
                if (this._userAgent = r.userAgent || n, this._keepUnprefixed = r.keepUnprefixed || !1, this._browserInfo = X(this._userAgent), !this._browserInfo || !this._browserInfo.prefix) return this._usePrefixAllFallback = !0, !1;
                this.cssPrefix = this._browserInfo.prefix.css, this.jsPrefix = this._browserInfo.prefix.inline, this.prefixedKeyframes = q(this._browserInfo);
                var o = this._browserInfo.browser && K[this._browserInfo.browser];
                o ? (this._requiresPrefix = Object.keys(o).filter(function(e) {
                    return o[e] >= i._browserInfo.version
                }).reduce(function(e, i) {
                    return e[i] = !0, e
                }, {}), this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0) : this._usePrefixAllFallback = !0
            }
            return S.createClass(e, [{
                key: "prefix",
                value: function(e) {
                    var i = this;
                    return this._usePrefixAllFallback ? f(e) : this._hasPropsRequiringPrefix ? (Object.keys(e).forEach(function(r) {
                        var n = e[r];
                        n instanceof Object && !Array.isArray(n) ? e[r] = i.prefix(n) : i._requiresPrefix[r] && (e[i.jsPrefix + C(r)] = n, i._keepUnprefixed || delete e[r])
                    }), Object.keys(e).forEach(function(r) {
                        [].concat(e[r]).forEach(function(n) {
                            le.forEach(function(o) {
                                v(e, o({
                                    property: r,
                                    value: n,
                                    styles: e,
                                    browserInfo: i._browserInfo,
                                    prefix: {
                                        js: i.jsPrefix,
                                        css: i.cssPrefix,
                                        keyframes: i.prefixedKeyframes
                                    },
                                    keepUnprefixed: i._keepUnprefixed,
                                    requiresPrefix: i._requiresPrefix
                                }), n, i._keepUnprefixed)
                            })
                        })
                    }), e) : e
                }
            }], [{
                key: "prefixAll",
                value: function(e) {
                    return f(e)
                }
            }]), e
        }();
    return me
});
