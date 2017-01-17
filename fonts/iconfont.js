;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-YLTC_refresh" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M571.970377 318.851944c-0.790933 30.363419 23.183029 55.618272 53.545448 56.408205l303.326214 7.897329c0.485959 0.012999 0.967918 0.018998 1.450877 0.018998 27.309678 0 50.5877-20.107291 54.433373-47.292979l38.644714-273.180777c4.254638-30.074443-16.676582-57.902078-46.750025-62.156716-30.068444-4.252638-57.902078 16.676582-62.156716 46.750025L896.439794 174.712198a516.906058 516.906058 0 0 0-22.94105-24.375928c-46.876015-46.679032-101.426378-83.327916-162.135217-108.92874-62.881654-26.517746-129.63198-39.963603-198.395134-39.963603-68.952138 0-135.87245 13.516851-198.900092 40.175585-60.848827 25.736812-115.485183 62.570681-162.392195 109.476693-46.907012 46.907012-83.739881 101.543368-109.476693 162.393195C15.540679 376.516042 2.023828 443.435354 2.023828 512.388492c0 68.952138 13.516851 135.87245 40.175585 198.900092 25.736812 60.848827 62.570681 115.486183 109.476693 162.392195 46.907012 46.907012 101.543368 83.739881 162.392195 109.476693 63.027642 26.658734 129.946953 40.175585 198.900092 40.175585 56.862166 0 112.735416-9.28921 166.065882-27.608653 51.559617-17.711494 99.774518-43.507301 143.306818-76.668483 43.038341-32.787213 80.452161-71.966882 111.199547-116.4511 31.218346-45.163161 54.797342-94.701949 70.084042-147.240483 8.484279-29.163521-8.278296-59.683926-37.441817-68.169205-29.159521-8.489278-59.683926 8.276296-68.170205 37.440817-49.457796 169.98555-207.793336 288.705457-385.044267 288.705457-221.086206 0-400.953915-179.86671-400.953915-400.953915 0-221.086206 179.86671-400.953915 400.953915-400.953915 106.780923 0 207.257381 41.494473 282.917949 116.839068a403.966659 403.966659 0 0 1 36.980856 42.356399l-204.489616-5.324547c-30.305424-0.789933-55.616272 23.184029-56.407205 53.547447z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)