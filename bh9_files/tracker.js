var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____('window');
  let self = _____WB$wombat$assign$function_____('self');
  let document = _____WB$wombat$assign$function_____('document');
  let location = _____WB$wombat$assign$function_____('location');
  let top = _____WB$wombat$assign$function_____('top');
  let parent = _____WB$wombat$assign$function_____('parent');
  let frames = _____WB$wombat$assign$function_____('frames');
  let opener = _____WB$wombat$assign$function_____('opener');

  !(function () {
    function r(e) {
      T('In setMethods : ' + e + '\n Type : ' + typeof e + '\n Length : ' + e.length, 'info');
      var i = e.shift(),
        n = v[0];
      n[i] ? n[i].apply(n, e) : T('Not Default Method : ' + i, 'info');
    }
    function n(e) {
      var i,
        n,
        o = l.getAsyncTrackers()[0].getAppliedMethods || {};
      for (
        T('In applyMethods : ' + e + '\n Type : ' + typeof e + '\n Length : ' + e.length, 'info'),
          i = 0;
        i < u.length;
        i++
      ) {
        var t = u[i];
        for (o[t] = 1, n = 0; n < e.length; n++)
          e[n] &&
            e[n][0] &&
            (t === e[n][0] &&
              (r(e[n]),
              delete e[n],
              1 < o[t] && T('The method ' + t + ' is registered', 'warning')),
            o[t]++);
      }
      return (l.getAsyncTrackers()[0].setAppliedMethods = o), e;
    }
    function h(o) {
      function t(e) {
        if ('' == d) return T('No have Site ID, init fail !', 'error'), 0;
        var i = JSON.stringify(_.getUrlInfo()) + d;
        if (
          (T('Is same ? ' + (m == i) + '\n new page info ' + i + ' and old page info ' + m, 'info'),
          m == i)
        )
          return T('This page has send pageview', 'error'), 0;
        (p = []),
          (g = 0),
          (m = i),
          (i = []).push('cftuid=' + c),
          i.push('cf_p=' + u),
          i.push('uu_m=' + f),
          i.push('sid=' + d),
          E(['en=pageview'], i, e, l);
      }
      function r(e) {
        c = e || (C('_uid') ? C('_uid') : c || U());
      }
      function s(e) {
        u = e || (C('_P') ? C('_P') : '');
      }
      function n() {
        return (
          navigator.cookieEnabled &&
            (C('_test', 1),
            C('_test')
              ? ((e = !0), T('can use cookie', 'info'), C('_test', null))
              : ((e = !1), T("can't use cookie", 'info'))),
          C('_uid') && (e = !0),
          e
        );
      }
      function a(e, i, n) {
        var o = JSON.stringify(_.getUrlInfo()) + d;
        if (m !== o) return T("This page hasn't send pageview", 'error'), 0;
        o = [];
        var t,
          r,
          s = {},
          a = { items: !0 };
        for (t in e)
          e[t] &&
            e.hasOwnProperty(t) &&
            (i.hasOwnProperty(t) ? (s[i[t]] = e[t]) : a.hasOwnProperty(t) || (s[t] = e[t]));
        for (r in s) o = o.concat([r + '=' + s[r]]);
        (e = []).push('cftuid=' + c),
          e.push('cf_p=' + u),
          e.push('uu_m=' + f),
          e.push('sid=' + d),
          T('The track string is ' + o.join('&'), 'info'),
          E(o, e, n, l);
      }
      var d = o || '',
        l = 'https://cft.holmesmind.com/dmp/analytics',
        i = {},
        c = '',
        u = '',
        e = !1,
        m = '',
        p = [],
        g = 0,
        f = '';
      (this.setAppliedMethods = function (e) {
        i = e;
      }),
        (this.getAppliedMethods = function () {
          return i;
        }),
        (this.getSiteId = function () {
          return d;
        }),
        (this.setSiteId = function (e) {
          e: {
            for (var i = 0; i < v.length; i++)
              if (v[i].getSiteId === o) {
                T('site id is registered', 'error');
                break e;
              }
            (d = e),
              r(),
              s(),
              (f = n || (N('CFFPCKUUIDMAIN') ? N('CFFPCKUUIDMAIN') : '')),
              T('cft_uid=' + c + 'cf_p=' + u + 'uu_m' + f, 'debug'),
              t(void 0),
              this.setAdserver(e);
          }
          var n;
        }),
        (this.setAdserver = function (e) {
          var i = document.createElement('iframe');
          (i.style.cssText = 'display:none;'),
            i.setAttribute('src', 'https://ad.holmesmind.com/adserver/cs?website=' + e),
            document.head.appendChild(i);
        }),
        (this.getTPUid = function () {
          return u;
        }),
        (this.setEnableCookie = function (e, i) {
          return n()
            ? (r(e),
              C('_uid', c, { domain: x(), maxage: 7776e3, path: '/' }),
              ('function' == typeof i ? i : k)(),
              !0)
            : (T('Cookie is not Enable', 'info'), !1);
        }),
        (this.setTPCookie = function () {
          if (!n()) return T('Cookie is not Enable', 'info'), !1;
          var e;
          s(),
            null == C('_P') &&
              ((e = y.createElement('iframe')).setAttribute('style', 'display:none'),
              e.setAttribute('height', '0'),
              e.setAttribute('width', '0'),
              (e.src = 'https://cdn.holmesmind.com/js/getP.htm'),
              window.addEventListener('message', function e(i) {
                var n = i.data;
                'https://cdn.holmesmind.com' === i.origin &&
                  n.constructor === Object &&
                  '/js/getP.htm' === n.pathname &&
                  (window.removeEventListener('message', e),
                  s(n.cf_P),
                  C('_P', n.cf_P, { domain: x(), maxage: 7776e3, path: '/' }));
              }),
              y.getElementsByTagName('script')[0].appendChild(e));
        }),
        (this.getEnabeCoookie = function () {
          return e;
        }),
        (this.setEnabeCoookie = this.setEnableCookie),
        (this.setServer = function (e) {
          l = e;
        }),
        (this.getServer = function () {
          return l;
        }),
        (this.setDebug = function () {
          w = !0;
        }),
        (this.setViewPercentage = function (i, n) {
          (i = void 0 === i ? [30, 60, 90] : i),
            b.addEventListener('scroll', function () {
              if (A() > g) {
                g = A();
                for (var e = 0; e < i.length; e++)
                  g > i[e] &&
                    -1 == p.indexOf(i[e]) &&
                    (p.push(i[e]),
                    a(
                      { name: 'viewPercentage', action: 'view', value: p[p.length - 1] },
                      S.general,
                      n
                    ));
                T('current ' + g, 'debug');
              }
            });
        }),
        (this.pageview = function (e) {
          t(e);
        }),
        (this.send = function (e, i, n) {
          return '' == d
            ? (T('No have Site ID, init fail !', 'error'), !1)
            : void 0 !== e &&
                '' != e &&
                'pageview' != (e = e.toLowerCase()) &&
                (((i = i || {}).name = e),
                void (
                  'action' in i &&
                  '' != i.action &&
                  (T('ready to send : ' + JSON.stringify(i), 'debug'), a(i, S.general, n))
                ));
        }),
        (this.addTracker = function (e) {
          if (!e) return T('site id is Undefind', 'error'), !1;
          for (var i = 0; i < v.length; i++)
            if (v[i].getSiteId === e) return T('site id is registered', 'error'), !1;
          return (e = new h(e)), v.push(e), e;
        });
    }
    function o() {
      return function () {
        var e;
        T('Your arguments : ' + [].slice.call(arguments), 'debug'),
          (e = n([].slice.call(arguments))) && r(e);
      };
    }
    function i(e) {
      e = new h(e);
      var i = [];
      for (
        'undefined' != typeof cft && void 0 !== cft.q && (i = cft.q),
          v.push(e),
          c = n(i),
          window.cft = new o(),
          i = 0;
        i < c.length;
        i++
      )
        c[i] && r(c[i]);
      return e;
    }
    function t() {
      function t(e, i) {
        for (var n, o, t, r, s, a = 0; a < i.length && !r; ) {
          for (var d = i[a], l = i[a + 1], c = (n = 0); c < d.length && !r; )
            if ((r = d[c++].exec(e)))
              for (o = 0; o < l.length; o++)
                (s = r[++n]),
                  'object' == typeof (t = l[o]) && 0 < t.length
                    ? 2 == t.length
                      ? (this[t[0]] = 'function' == typeof t[1] ? t[1].call(this, s) : t[1])
                      : 3 == t.length
                      ? (this[t[0]] =
                          'function' != typeof t[1] || (t[1].exec && t[1].test)
                            ? s
                              ? s.replace(t[1], t[2])
                              : void 0
                            : s
                            ? t[1].call(this, s, t[2])
                            : void 0)
                      : 4 == t.length &&
                        (this[t[0]] = s ? t[3].call(this, s.replace(t[1], t[2])) : void 0)
                    : (this[t] = s || void 0);
          a += 2;
        }
      }
      function e(e, i) {
        for (var n in i)
          if ('object' == typeof i[n] && 0 < i[n].length) {
            for (var o = 0; o < i[n].length; o++)
              if (r.has(i[n][o], e)) return '?' === n ? void 0 : n;
          } else if (r.has(i[n], e)) return '?' === n ? void 0 : n;
        return e;
      }
      var r = {
          extend: function (e, i) {
            var n,
              o = {};
            for (n in e) o[n] = i[n] && 0 == i[n].length % 2 ? i[n].concat(e[n]) : e[n];
            return o;
          },
          has: function (e, i) {
            return 'string' == typeof e && -1 !== i.toLowerCase().indexOf(e.toLowerCase());
          },
          lowerize: function (e) {
            return e.toLowerCase();
          },
          major: function (e) {
            return 'string' == typeof e ? e.replace(/[^\d\.]/g, '').split('.')[0] : void 0;
          },
          trim: function (e) {
            return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
          }
        },
        i = {
          'ME': '4.90',
          'NT 3.11': 'NT3.51',
          'NT 4.0': 'NT4.0',
          2e3: 'NT 5.0',
          'XP': ['NT 5.1', 'NT 5.2'],
          'Vista': 'NT 6.0',
          '7': 'NT 6.1',
          '8': 'NT 6.2',
          '8.1': 'NT 6.3',
          '10': ['NT 6.4', 'NT 10.0'],
          'RT': 'ARM'
        },
        s = {
          browser: [
            [
              /(opera\smini)\/([\w\.-]+)/i,
              /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
              /(opera).+version\/([\w\.]+)/i,
              /(opera)[\/\s]+([\w\.]+)/i
            ],
            ['name', 'version'],
            [/(opios)[\/\s]+([\w\.]+)/i],
            [['name', 'Opera Mini'], 'version'],
            [/\s(opr)\/([\w\.]+)/i],
            [['name', 'Opera'], 'version'],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
              /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
              /(?:ms|\()(ie)\s([\w\.]+)/i,
              /(rekonq)\/([\w\.]+)*/i,
              /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i
            ],
            ['name', 'version'],
            [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
            [['name', 'IE'], 'version'],
            [/(edg)\/((\d+)?[\w\.]+)/i],
            ['name', 'version'],
            [/(yabrowser)\/([\w\.]+)/i],
            [['name', 'Yandex'], 'version'],
            [/(puffin)\/([\w\.]+)/i],
            [['name', 'Puffin'], 'version'],
            [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
            [['name', 'UCBrowser'], 'version'],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [['name', /_/g, ' '], 'version'],
            [/(micromessenger)\/([\w\.]+)/i],
            [['name', 'WeChat'], 'version'],
            [/(QQ)\/([\d\.]+)/i],
            ['name', 'version'],
            [/(Line)\/([\d\.]+)/i],
            ['name', 'version'],
            [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
            ['name', 'version'],
            [/xiaomi\/miuibrowser\/([\w\.]+)/i],
            ['version', ['name', 'MIUI Browser']],
            [/;fbav\/([\w\.]+);/i],
            ['version', ['name', 'Facebook']],
            [/headlesschrome(?:\/([\w\.]+)|\s)/i],
            ['version', ['name', 'Chrome Headless']],
            [/\swv\).+(chrome)\/([\w\.]+)/i],
            [['name', /(.+)/, '$1 WebView'], 'version'],
            [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
            [['name', /(.+(?:g|us))(.+)/, '$1 $2'], 'version'],
            [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
            ['version', ['name', 'Android Browser']],
            [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
            ['name', 'version'],
            [/(dolfin)\/([\w\.]+)/i],
            [['name', 'Dolphin'], 'version'],
            [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
            [['name', 'Chrome'], 'version'],
            [/(coast)\/([\w\.]+)/i],
            [['name', 'Opera Coast'], 'version'],
            [/fxios\/([\w\.-]+)/i],
            ['version', ['name', 'Firefox']],
            [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
            ['version', ['name', 'Safari']],
            [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
            ['version', 'name'],
            [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [['name', 'GSA'], 'version'],
            [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [
              'name',
              [
                'version',
                e,
                {
                  '1.0': '/8',
                  '1.2': '/1',
                  '1.3': '/3',
                  '2.0': '/412',
                  '2.0.2': '/416',
                  '2.0.3': '/417',
                  '2.0.4': '/419',
                  '?': '/'
                }
              ]
            ],
            [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
            ['name', 'version'],
            [/(navigator|netscape)\/([\w\.-]+)/i],
            [['name', 'Netscape'], 'version'],
            [
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
              /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
              /(mozilla)\/([\w\.]+).+rv:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
              /(links)\s\(([\w\.]+)/i,
              /(gobrowser)\/?([\w\.]+)*/i,
              /(ice\s?browser)\/v?([\w\._]+)/i,
              /(mosaic)[\/\s]([\w\.]+)/i
            ],
            ['name', 'version']
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
            [['architecture', 'amd64']],
            [/(ia32(?=;))/i],
            [['architecture', r.lowerize]],
            [/((?:i[346]|x)86)[;\)]/i],
            [['architecture', 'ia32']],
            [/windows\s(ce|mobile);\sppc;/i],
            [['architecture', 'arm']],
            [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
            [['architecture', /ower/, '', r.lowerize]],
            [/(sun4\w)[;\)]/i],
            [['architecture', 'sparc']],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
            ],
            [['architecture', r.lowerize]]
          ],
          device: [
            [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
            ['model', 'vendor', ['type', 'tablet']],
            [/applecoremedia\/[\w\.]+ \((ipad)/],
            ['model', ['vendor', 'Apple'], ['type', 'tablet']],
            [/(apple\s{0,1}tv)/i],
            [
              ['model', 'Apple TV'],
              ['vendor', 'Apple']
            ],
            [
              /(archos)\s(gamepad2?)/i,
              /(hp).+(touchpad)/i,
              /(hp).+(tablet)/i,
              /(kindle)\/([\w\.]+)/i,
              /\s(nook)[\w\s]+build\/(\w+)/i,
              /(dell)\s(strea[kpr\s\d]*[\dko])/i
            ],
            ['vendor', 'model', ['type', 'tablet']],
            [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
            ['model', ['vendor', 'Amazon'], ['type', 'tablet']],
            [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
            [
              ['model', e, { 'Fire Phone': ['SD', 'KF'] }],
              ['vendor', 'Amazon'],
              ['type', 'mobile']
            ],
            [/\((ip[honed|\s\w*]+);.+(apple)/i],
            ['model', 'vendor', ['type', 'mobile']],
            [/\((ip[honed|\s\w*]+);/i],
            ['model', ['vendor', 'Apple'], ['type', 'mobile']],
            [
              /(blackberry)[\s-]?(\w+)/i,
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
              /(hp)\s([\w\s]+\w)/i,
              /(asus)-?(\w+)/i
            ],
            ['vendor', 'model', ['type', 'mobile']],
            [/\(bb10;\s(\w+)/i],
            ['model', ['vendor', 'BlackBerry'], ['type', 'mobile']],
            [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
            ['model', ['vendor', 'Asus'], ['type', 'tablet']],
            [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
            [
              ['vendor', 'Sony'],
              ['model', 'Xperia Tablet'],
              ['type', 'tablet']
            ],
            [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
            ['model', ['vendor', 'Sony'], ['type', 'mobile']],
            [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
            ['vendor', 'model', ['type', 'console']],
            [/android.+;\s(shield)\sbuild/i],
            ['model', ['vendor', 'Nvidia'], ['type', 'console']],
            [/(playstation\s[34portablevi]+)/i],
            ['model', ['vendor', 'Sony'], ['type', 'console']],
            [/(sprint\s(\w+))/i],
            [
              ['vendor', e, { HTC: 'APA', Sprint: 'Sprint' }],
              ['model', e, { 'Evo Shift 4G': '7373KT' }],
              ['type', 'mobile']
            ],
            [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
            ['vendor', 'model', ['type', 'tablet']],
            [
              /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,
              /(zte)-(\w+)*/i,
              /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
            ],
            ['vendor', ['model', /_/g, ' '], ['type', 'mobile']],
            [/(nexus\s9)/i],
            ['model', ['vendor', 'HTC'], ['type', 'tablet']],
            [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
            ['model', ['vendor', 'Huawei'], ['type', 'mobile']],
            [/(microsoft);\s(lumia[\s\w]+)/i],
            ['vendor', 'model', ['type', 'mobile']],
            [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
            ['model', ['vendor', 'Microsoft'], ['type', 'console']],
            [/(kin\.[onetw]{3})/i],
            [
              ['model', /\./g, ' '],
              ['vendor', 'Microsoft'],
              ['type', 'mobile']
            ],
            [
              /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
              /mot[\s-]?(\w+)*/i,
              /(XT\d{3,4}) build\//i,
              /(nexus\s6)/i
            ],
            ['model', ['vendor', 'Motorola'], ['type', 'mobile']],
            [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
            ['model', ['vendor', 'Motorola'], ['type', 'tablet']],
            [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
            [
              ['vendor', r.trim],
              ['model', r.trim],
              ['type', 'smarttv']
            ],
            [/hbbtv.+maple;(\d+)/i],
            [
              ['model', /^/, 'SmartTV'],
              ['vendor', 'Samsung'],
              ['type', 'smarttv']
            ],
            [/\(dtv[\);].+(aquos)/i],
            ['model', ['vendor', 'Sharp'], ['type', 'smarttv']],
            [
              /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
              /((SM-T\w+))/i
            ],
            [['vendor', 'Samsung'], 'model', ['type', 'tablet']],
            [/smart-tv.+(samsung)/i],
            ['vendor', ['type', 'smarttv'], 'model'],
            [
              /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
              /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
              /sec-((sgh\w+))/i
            ],
            [['vendor', 'Samsung'], 'model', ['type', 'mobile']],
            [/sie-(\w+)*/i],
            ['model', ['vendor', 'Siemens'], ['type', 'mobile']],
            [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
            [['vendor', 'Nokia'], 'model', ['type', 'mobile']],
            [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
            ['model', ['vendor', 'Acer'], ['type', 'tablet']],
            [/android.+([vl]k\-?\d{3})\s+build/i],
            ['model', ['vendor', 'LG'], ['type', 'tablet']],
            [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
            [['vendor', 'LG'], 'model', ['type', 'tablet']],
            [/(lg) netcast\.tv/i],
            ['vendor', 'model', ['type', 'smarttv']],
            [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i, /android.+lg(\-?[\d\w]+)\s+build/i],
            ['model', ['vendor', 'LG'], ['type', 'mobile']],
            [/android.+(ideatab[a-z0-9\-\s]+)/i],
            ['model', ['vendor', 'Lenovo'], ['type', 'tablet']],
            [/linux;.+((jolla));/i],
            ['vendor', 'model', ['type', 'mobile']],
            [/((pebble))app\/[\d\.]+\s/i],
            ['vendor', 'model', ['type', 'wearable']],
            [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
            ['vendor', 'model', ['type', 'mobile']],
            [/crkey/i],
            [
              ['model', 'Chromecast'],
              ['vendor', 'Google']
            ],
            [/android.+;\s(glass)\s\d/i],
            ['model', ['vendor', 'Google'], ['type', 'wearable']],
            [/android.+;\s(pixel c)\s/i],
            ['model', ['vendor', 'Google'], ['type', 'tablet']],
            [/android.+;\s(pixel xl|pixel)\s/i],
            ['model', ['vendor', 'Google'], ['type', 'mobile']],
            [
              /android.+(\w+)\s+build\/hm\1/i,
              /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
              /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w?)?[\s_]*(?:plus)?)\s+build/i,
              /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+)?)\s+build/i
            ],
            [
              ['model', /_/g, ' '],
              ['vendor', 'Xiaomi'],
              ['type', 'mobile']
            ],
            [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+)?)\s+build/i],
            [
              ['model', /_/g, ' '],
              ['vendor', 'Xiaomi'],
              ['type', 'tablet']
            ],
            [/android.+;\s(m[1-5]\snote)\sbuild/i],
            ['model', ['vendor', 'Meizu'], ['type', 'tablet']],
            [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
            ['model', ['vendor', 'OnePlus'], ['type', 'mobile']],
            [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
            ['model', ['vendor', 'RCA'], ['type', 'tablet']],
            [/android.+[;\/]\s*(Venue[\d\s]*)\s+build/i],
            ['model', ['vendor', 'Dell'], ['type', 'tablet']],
            [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
            ['model', ['vendor', 'Verizon'], ['type', 'tablet']],
            [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
            [['vendor', 'Barnes & Noble'], 'model', ['type', 'tablet']],
            [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
            ['model', ['vendor', 'NuVision'], ['type', 'tablet']],
            [/android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i],
            [['vendor', 'ZTE'], 'model', ['type', 'tablet']],
            [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
            ['model', ['vendor', 'Swiss'], ['type', 'mobile']],
            [/android.+[;\/]\s*(zur\d{3})\s+build/i],
            ['model', ['vendor', 'Swiss'], ['type', 'tablet']],
            [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
            ['model', ['vendor', 'Zeki'], ['type', 'tablet']],
            [
              /(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i,
              /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i
            ],
            [['vendor', 'Dragon Touch'], 'model', ['type', 'tablet']],
            [/android.+[;\/]\s*(NS-?.+)\s+build/i],
            ['model', ['vendor', 'Insignia'], ['type', 'tablet']],
            [/android.+[;\/]\s*((NX|Next)-?.+)\s+build/i],
            ['model', ['vendor', 'NextBook'], ['type', 'tablet']],
            [/android.+[;\/]\s*(Xtreme_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
            [['vendor', 'Voice'], 'model', ['type', 'mobile']],
            [/android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i],
            [['vendor', 'LvTel'], 'model', ['type', 'mobile']],
            [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
            ['model', ['vendor', 'Envizen'], ['type', 'tablet']],
            [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i],
            ['vendor', 'model', ['type', 'tablet']],
            [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
            ['model', ['vendor', 'MachSpeed'], ['type', 'tablet']],
            [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
            ['vendor', 'model', ['type', 'tablet']],
            [/android.+[;\/]\s*TU_(1491)\s+build/i],
            ['model', ['vendor', 'Rotor'], ['type', 'tablet']],
            [/android.+(KS(.+))\s+build/i],
            ['model', ['vendor', 'Amazon'], ['type', 'tablet']],
            [/android.+(Gigaset)[\s\-]+(Q.+)\s+build/i],
            ['vendor', 'model', ['type', 'tablet']],
            [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
            [['type', r.lowerize], 'vendor', 'model'],
            [/(android.+)[;\/].+build/i],
            ['model', ['vendor', 'Generic']]
          ],
          engine: [
            [/windows.+\sedge\/([\w\.]+)/i],
            ['version', ['name', 'EdgeHTML']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
              /(icab)[\/\s]([23]\.[\d\.]+)/i
            ],
            ['name', 'version'],
            [/rv:([\w\.]+).*(gecko)/i],
            ['version', 'name']
          ],
          os: [
            [/microsoft\s(windows)\s(vista|xp)/i],
            ['name', 'version'],
            [
              /(windows)\snt\s6\.2;\s(arm)/i,
              /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,
              /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ],
            ['name', ['version', e, i]],
            [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
            [
              ['name', 'Windows'],
              ['version', e, i]
            ],
            [/\((bb)(10);/i],
            [['name', 'BlackBerry'], 'version'],
            [
              /(blackberry)\w*\/?([\w\.]+)*/i,
              /(tizen)[\/\s]([\w\.]+)/i,
              /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
              /linux;.+(sailfish);/i
            ],
            ['name', 'version'],
            [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
            [['name', 'Symbian'], 'version'],
            [/\((series40);/i],
            ['name'],
            [/mozilla.+\(mobile;.+gecko.+firefox/i],
            [['name', 'Firefox OS'], 'version'],
            [
              /(nintendo|playstation)\s([wids34portablevu]+)/i,
              /(mint)[\/\s\(]?(\w+)*/i,
              /(mageia|vectorlinux)[;\s]/i,
              /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
              /(hurd|linux)\s?([\w\.]+)*/i,
              /(gnu)\s?([\w\.]+)*/i
            ],
            ['name', 'version'],
            [/(cros)\s[\w]+\s([\w\.]+\w)/i],
            [['name', 'Chromium OS'], 'version'],
            [/(sunos)\s?([\w\.]+\d)*/i],
            [['name', 'Solaris'], 'version'],
            [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
            ['name', 'version'],
            [/(haiku)\s(\w+)/i],
            ['name', 'version'],
            [/cfnetwork\/.+darwin/i, /ip[honead]+(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
            [
              ['version', /_/g, '.'],
              ['name', 'iOS']
            ],
            [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
            [
              ['name', 'Mac OS'],
              ['version', /_/g, '.']
            ],
            [
              /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,
              /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,
              /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
              /(unix)\s?([\w\.]+)*/i
            ],
            ['name', 'version']
          ]
        },
        a = function (e, i) {
          if (('object' == typeof e && ((i = e), (e = void 0)), !(this instanceof a)))
            return new a(e, i).getResult();
          var n =
              e ||
              (window && window.navigator && window.navigator.userAgent
                ? window.navigator.userAgent
                : ''),
            o = i ? r.extend(s, i) : s;
          return (
            (this.getBrowser = function () {
              var e = { name: '', version: '' };
              return t.call(e, n, o.browser), (e.major = r.major(e.version)), e;
            }),
            (this.getCPU = function () {
              var e = { architecture: '' };
              return t.call(e, n, o.cpu), e;
            }),
            (this.getDevice = function () {
              var e = { vendor: '', model: '', type: '' };
              return t.call(e, n, o.device), e;
            }),
            (this.getEngine = function () {
              var e = { name: '', version: '' };
              return t.call(e, n, o.engine), e;
            }),
            (this.getOS = function () {
              var e = { name: '', version: '' };
              return t.call(e, n, o.os), e;
            }),
            (this.getResult = function () {
              return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
              };
            }),
            (this.getUA = function () {
              return n;
            }),
            (this.setUA = function (e) {
              return (n = e), this;
            }),
            this
          );
        };
      return a(m.userAgent);
    }
    function s(e, i) {
      if ('undefined' == i || '' == i) return e;
      var n = i;
      return (
        e +
        (i =
          encodeURIComponent instanceof Function
            ? encodeURIComponent(n)
                .replace(/\(/g, '%28')
                .replace(/\)/g, '%29')
                .replace(/\//g, '%2F')
                .replace('%%', '%25%')
            : n)
      );
    }
    function a() {
      return p.getInfo().concat(_.getInfo());
    }
    function d(e, i, n) {
      var o =
          ((e = e + '?' + i),
          ((i = y.createElement('img')).width = 1),
          (i.height = 1),
          (i.src =
            e +
            '&z=' +
            Math.round(4251684561 * Math.random()) +
            '&t=' +
            new Date()
              .toISOString()
              .replace(/-|:|\./g, '')
              .substring(0, 15)),
          T('Send img tracker url : ' + i.src, 'success'),
          i),
        t = 'function' == typeof n ? n : k;
      o.onload = o.onerror = function () {
        (o.onload = null), (o.onerror = null), t();
      };
    }
    var l, c, u, w, v, b, m, y, k, x, T, p, _, S, E, C, U, A, N;
    'object' != typeof window.bbkkbbk &&
      (window.bbkkbbk =
        ((c = []),
        (u =
          'addTracker setTrackerUrl setDebug setEnabeCoookie setEnableCookie setTPCookie setSiteId'.split(
            ' '
          )),
        (w = !1),
        (v = []),
        (b = window),
        (m = navigator || b.navigator),
        (y = document || b.document),
        (k = function () {}),
        (x = function () {
          var e = (e = window.location.hostname).split('.'),
            i = [],
            n = [],
            o = 'com org net cc info me'.split(' ');
          if (e.length <= 3) {
            var t = 0;
            for (
              -1 != o.indexOf(e[e.length - 1]) && 2 < e.length && (t = 1), o = e.length;
              t <= o;
              o--
            )
              i[i.length++] = e[o];
            for (o = i.length; 0 < o; o--) void 0 !== i[o] && (n[n.length++] = i[o]);
          } else {
            for (o.indexOf(e[e.length - 1]), o = e.length; o >= e.length - 3; o--)
              i[i.length++] = e[o];
            for (o = i.length; 0 <= o; o--) void 0 !== i[o] && (n[n.length++] = i[o]);
          }
          return n.join('.');
        }),
        (T = function (e, i) {
          if (w || 'error' == i.toLowerCase()) {
            switch ((i = i || 'black').toLowerCase()) {
              case 'success':
                i = 'Green';
                break;
              case 'info':
                i = 'DodgerBlue';
                break;
              case 'error':
                i = 'Red';
                break;
              case 'warning':
                i = 'Orange';
                break;
              case 'debug':
                i = 'Orange';
            }
            'object' === e && (e = JSON.stringify(e)), console.trace('%c' + e, 'color:' + i);
          }
        }),
        (p = {
          getScreen: function () {
            return screen ? [screen.width, screen.height, screen.pixelDepth].join('x') : 'Unknown';
          },
          getUserAgent: function () {
            return t().ua;
          },
          getBrowserName: function () {
            return t().browser.name || 'Unknown';
          },
          getBrowserVersion: function () {
            return t().browser.major;
          },
          getPlatformName: function () {
            return t().os.name || 'Unknown';
          },
          getPlatformVersion: function () {
            return t().os.version;
          },
          getDeviceVendor: function () {
            return t().device.vendor;
          },
          getDeviceModel: function () {
            return t().device.model;
          },
          getDeviceType: function () {
            return t().device.type || (/window|mac|chromium/i.test(t().os.name) ? 'PC' : 'Unknown');
          },
          getTimezone: function () {
            return new Date().getTimezoneOffset() / -60;
          },
          getTouchEvent: function () {
            var e = '0';
            try {
              if (y.createEvent('TouchEvent')) {
                e = '1';
                try {
                  null != m.maxTouchPoints && (e = m.maxTouchPoints.toString());
                } catch (e) {}
              }
              return e;
            } catch (e) {
              return '0';
            }
          },
          getInfo: function () {
            return [
              s('sc=', this.getScreen()),
              s('bn=', this.getBrowserName()),
              s('bv=', this.getBrowserVersion()),
              s('pn=', this.getPlatformName()),
              s('pv=', this.getPlatformVersion()),
              s('dv=', this.getDeviceVendor()),
              s('dm=', this.getDeviceModel()),
              s('dt=', this.getDeviceType()),
              s('tz=', this.getTimezone()),
              s('tu=', this.getTouchEvent())
            ];
          }
        }),
        (_ = {
          getEncoding: function () {
            return y.characterSet || y.charset || 'Unknown';
          },
          getLanguage: function () {
            return m.language.toLowerCase() || 'Unknown';
          },
          getTitle: function () {
            return y.title || 'Unknown';
          },
          isInIframe: function () {
            return window != top ? 'Y' : 'N';
          },
          getPreviousUrl: function () {
            return y.referrer;
          },
          getUri: function () {
            return (function (e) {
              function i(e) {
                var i = (e.hostname || '').split(':')[0].toLowerCase(),
                  n = (e.protocol || '').toLowerCase(),
                  n = +e.port || ('http:' == n ? 80 : 'https:' == n ? 443 : '');
                return 0 == (e = e.pathname || '').indexOf('/') || (e = '/' + e), [i, '' + n, e];
              }
              var n = y.createElement('a');
              n.href = y.location.href;
              var o = (n.protocol || '').toLowerCase(),
                t = i(n),
                r = n.search || '',
                s = o + '//' + t[0] + (t[1] ? ':' + t[1] : '');
              return (
                0 == e.indexOf('//')
                  ? (e = o + e)
                  : 0 == e.indexOf('/')
                  ? (e = s + e)
                  : e && 0 != e.indexOf('?')
                  ? e.split('/')[0].indexOf(':') < 0 &&
                    (e = s + t[2].substring(0, t[2].lastIndexOf('/')) + '/' + e)
                  : (e = s + t[2] + (e || r)),
                (n.href = e),
                (o = i(n)),
                {
                  protocol: (n.protocol || '').toLowerCase(),
                  host: o[0],
                  port: o[1],
                  path: o[2],
                  query: n.search || '',
                  url: e || ''
                }
              );
            })(y.location.href);
          },
          getHostName: function () {
            return this.getUri().host;
          },
          getPath: function () {
            return this.getUri().path;
          },
          getQuery: function () {
            return this.getUri().query;
          },
          getUrlInfo: function () {
            return {
              protocol: this.getUri().protocol,
              host: this.getUri().host,
              port: this.getUri().port,
              path: this.getUri().path,
              query: this.getUri().query
            };
          },
          getUTM: function () {
            for (var e, i = this.getUri().query.split(/[?&#]+/), n = [], o = 0; o < i.length; ++o)
              (0 != i[o].indexOf('utm_id=') &&
                0 != i[o].indexOf('utm_campaign=') &&
                0 != i[o].indexOf('utm_source=') &&
                0 != i[o].indexOf('utm_medium=') &&
                0 != i[o].indexOf('utm_term=') &&
                0 != i[o].indexOf('utm_content=') &&
                0 != i[o].indexOf('gclid=') &&
                0 != i[o].indexOf('dclid=') &&
                0 != i[o].indexOf('gclsrc=')) ||
                ((e = i[o].split('=')), n.push(s(e[0] + '=', e[1])));
            return 0 < n.length ? n.join('&') : '';
          },
          getInfo: function () {
            return [
              s('de=', this.getEncoding()),
              s('ul=', this.getLanguage()),
              s('if=', this.isInIframe()),
              s('tt=', this.getTitle()),
              s('rf=', this.getPreviousUrl()),
              s('uh=', this.getHostName()),
              s('up=', this.getPath() + this.getQuery()),
              this.getUTM()
            ];
          }
        }),
        (S = {
          general: { name: 'en', action: 'ea', label: 'el', category: 'ec', value: 'ev' },
          ecItem: { id: 'ti', sku: 'ic', name: 'in', category: 'iv', price: 'ip', quantity: 'iq' },
          ecommerce: {
            id: 'ti',
            affiliation: 'ta',
            revenue: 'tr',
            tax: 'tx',
            shipping: 'ts',
            item: []
          }
        }),
        (E = function (i, n, o, t) {
          void 0 === t && (t = 'https://cft.holmesmind.com/dmp/analytics'),
            (i = (i = i.concat(n).concat(a()))
              .filter(function (e) {
                return e;
              })
              .join('&')),
            (2036 <= n.length
              ? d
              : function (i, n, o) {
                  for (n = n.split(/[?&#]/), e = 0; e < n.length; ++e)
                    500 < n[e].length && (n[e] = n[e].substring(0, 500));
                  return d(i, n.join('&'), o);
                })(t, i, o);
        }),
        (C = function (e, i, n) {
          if ('_uid' == e) {
            if (((e = '_cft' + e), void 0 === i))
              return new RegExp(';?' + e + '=([^;]*);?').test(y.cookie) ? RegExp.$1 : null;
            null === i && ((i = ''), ((n = n || {}).maxage = -1)),
              (e = e + '=' + i),
              n &&
                (n.path && (e += '; path=' + n.path),
                n.maxage && (e += '; max-age=' + n.maxage),
                n.domain && (e += '; domain=' + n.domain),
                n.secure && (e += '; secure')),
              (y.cookie = e);
          } else {
            if (((e = '_cft' + e), void 0 === i))
              return new RegExp(';?' + e + '=([^;]*);?').test(y.cookie) ? RegExp.$1 : null;
            null === i && ((i = ''), ((n = n || {}).maxage = -1)),
              (e = e + '=' + i),
              n &&
                (n.path && (e += '; path=' + n.path),
                n.maxage && (e += '; max-age=' + n.maxage),
                n.domain && (e += '; domain=' + n.domain),
                n.secure && (e += '; secure')),
              (y.cookie = e);
          }
        }),
        (U = function () {
          function e() {
            return Math.floor(65536 * (1 + Math.random()))
              .toString(16)
              .substring(1);
          }
          return e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e();
        }),
        (A = function () {
          var e = Math.max(
            y.documentElement.clientHeight,
            y.documentElement.scrollHeight,
            y.documentElement.offsetHeight,
            y.body.scrollHeight,
            y.body.offsetHeight
          );
          return Math.round(
            100 *
              ((window.pageYOffset || y.documentElement.scrollTop || y.body.scrollTop) / e +
                Math.max(y.documentElement.clientHeight, window.innerHeight) / e)
          );
        }),
        (l = {
          initialized: !(N = function (e, i, n) {
            if (void 0 === i)
              return new RegExp(';?' + e + '=([^;]*);?').test(y.cookie) ? RegExp.$1 : null;
            null === i && ((i = ''), ((n = n || {}).maxage = -1)),
              (e = e + '=' + i),
              n &&
                (n.path && (e += '; path=' + n.path),
                n.maxage && (e += '; max-age=' + n.maxage),
                n.domain && (e += '; domain=' + n.domain),
                n.secure && (e += '; secure')),
              (y.cookie = e);
          }),
          getAsyncTrackers: function () {
            return v;
          },
          getTracker: function (e) {
            return T('creatTrackekr', 'success'), i;
          },
          addTracker: function (e) {
            return v.length ? v[0].addTracker(e) : i(e);
          },
          getTrackerSt: function () {
            return a.join('&');
          },
          getUAParser: t
        }))),
      bbkkbbk.addTracker(),
      (bbkkbbk.initialized = !0);
  })(),
    cft('setEnabeCoookie'),
    cft('setTPCookie');
}
/*
     FILE ARCHIVED ON 07:28:27 Jun 07, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:45:00 Jun 15, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 72.364
  exclusion.robots: 0.131
  exclusion.robots.policy: 0.118
  RedisCDXSource: 0.755
  esindex: 0.012
  LoadShardBlock: 39.907 (3)
  PetaboxLoader3.datanode: 41.519 (4)
  load_resource: 767.996
  PetaboxLoader3.resolve: 759.81
*/
