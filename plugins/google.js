/* eslint-disable */
export default ({ app }) => {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-92829592-1', 'auto');
  ga('send', 'pageview');
  var disableStr = 'ga-disable-UA-92829592-1';
  /* Function to detect opted out users */
  function __gaTrackerIsOptedOut() {
    return document.cookie.indexOf(disableStr + '=true') > -1;
  }
  /* Disable tracking if the opt-out cookie exists. */
  if (__gaTrackerIsOptedOut()) {
    window[disableStr] = true;
  }
  /* Opt-out function */
  function __gaTrackerOptout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
  }
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', '__gaTracker');
  __gaTracker('create', 'UA-82842015-1', 'auto');
  __gaTracker('set', 'forceSSL', true);
  __gaTracker('require', 'displayfeatures');
  __gaTracker('require', 'linkid', 'linkid.js');
  __gaTracker('send', 'pageview');
}
