/* global jQuery:false, layer:false */
(function ($, window, layer) {
    function getSearchToken(r, q) {
        var p, s = "";
        s = q;
        p = "oy@sp" + r + s.substring(18, s.length) + r + s.substring(0, 18) + "hol@yac";
        return p
    }
  window.getSearchToken=getSearchToken;
})(jQuery, window, layer)
