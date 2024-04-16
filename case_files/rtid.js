function clickforce_rtid(b) {
    CFFPCKUUIDMAIN = getCFFPCKUUIDMAIN();
    var f = document.getElementsByTagName("script")[0];
    var a = document.createElement("iframe");
    a.setAttribute("src", "https://cdn.holmesmind.com/js/capmapping_dmp.htm?rtid=" + b + '&uum=' + CFFPCKUUIDMAIN);
    a.setAttribute("width", 0);
    a.setAttribute("height", 0);
    a.setAttribute("style", "display:none;");
    f.parentNode.insertBefore(a, f);
    var a = document.createElement("iframe");
    // a.setAttribute("src", "//clg.doublemax.net/adserver/conversionV2/clickAction?aid=" + b);
    a.setAttribute("width", 0);
    a.setAttribute("height", 0);
    a.setAttribute("style", "display:none;");
    f.parentNode.insertBefore(a, f);
    var a = document.createElement("iframe");
    // a.setAttribute("src", "//lg.doublemax.net/adserver/conversionV2/impressAction?aid=" + b);
    a.setAttribute("width", 0);
    a.setAttribute("height", 0);
    a.setAttribute("style", "display:none;");
    f.parentNode.insertBefore(a, f);
}


function c_tag_mk(tag, url, async) {
    if (tag == "img") {
        var c = document.createElement("img");
        c.setAttribute("style", "display:none");
        c.setAttribute("height", "0");
        c.setAttribute("width", "0");
        c.src = url;
        document.body.appendChild(c);
    } else {
        if (tag == "iframe") {
            var c = document.createElement("iframe");
            c.setAttribute("style", "display:none");
            c.setAttribute("height", "0");
            c.setAttribute("width", "0");
            c.src = url;
            document.body.appendChild(c);
        } else {
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.src = url;
            if (async) {
                c.async = true;
            }
            if (document.getElementsByTagName("body").length > 0) {
                document.getElementsByTagName("body")[0].appendChild(c);
            } else {
                if (document.getElementsByTagName("head").length > 0) {
                    document.getElementsByTagName("head")[0].appendChild(c);
                }
            }
        }
    }
}

function makeCFFPCKUUID() {
    var VC = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var ret = "";
    for (var i = 0; i < 32; i++) {
        var index = Math.floor(Math.random() * 62);
        ret += VC.charAt(index);
    }
    return Math.floor(Math.random() * 9999) + "-" + ret
}

function getCFFPCKUUID() {
    var name = "CFFPCKUUID=";
    var ckkist = document.cookie.split(";");
    for (var i = 0; i < ckkist.length; i++) {
        var ckk = ckkist[i].trim();
        if (ckk.indexOf(name) == 0 && ckk != "undefined") {
            return ckk.substring(name.length, ckk.length)
        }
    }
    return ""
}

function getCFFPCKUUIDMAIN() {
    var name = "CFFPCKUUIDMAIN=";
    var ckkist = document.cookie.split(";");
    for (var i = 0; i < ckkist.length; i++) {
        var ckk = ckkist[i].trim();
        if (ckk.indexOf(name) == 0 && ckk != "undefined") {
            return ckk.substring(name.length, ckk.length)
        }
    }
    return ""
}

function passfck(fck) {
    c_tag_mk("script", "https://t.ssp.hinet.net/utag.js", true);
    var partnerId = "50ef57";
    window.__hitagCmdQueue = window.__hitagCmdQueue || [];

    function hiball() {
        __hitagCmdQueue.push(arguments)
    }
    hiball("fire", partnerId);
    hiball("cm", partnerId, fck);
}

function getDomain() {
    var url = window.location.hostname;
    url = url.split(".");
    var md = new Array();
    var mdsort = new Array();
    var lw = ["com", "org", "net", "cc", "info", "me"];
    if (url.length <= 3) {
        var minget = 0;
        if (lw.indexOf(url[url.length - 1]) != -1 && url.length > 2) {
            minget = 1
        }
        for (var i = url.length; i >= minget; i--) {
            md[md.length++] = url[i]
        }
        for (var i = md.length; i > 0; i--) {
            if (typeof md[i] != "undefined") {
                mdsort[mdsort.length++] = md[i]
            }
        }
    } else {
        var minget = 3;
        if (lw.indexOf(url[url.length - 1]) != -1) {
            minget = 2
        }
        for (var i = url.length; i >= url.length - 3; i--) {
            md[md.length++] = url[i]
        }
        for (var i = md.length; i >= 0; i--) {
            if (typeof md[i] != "undefined") {
                mdsort[mdsort.length++] = md[i]
            }
        }
    }
    return mdsort.join(".")
}

var CFFPCKUUIDday = new Date();
CFFPCKUUIDday.setTime(CFFPCKUUIDday.getTime() + (30 * 24 * 60 * 60 * 1000));
CFFPCKUUID = getCFFPCKUUID();
if (CFFPCKUUID == "") {
    CFFPCKUUID = makeCFFPCKUUID();
    document.cookie = "CFFPCKUUID=" + CFFPCKUUID + "; expires=" + CFFPCKUUIDday.toGMTString() + "; path=/"
} else {
    document.cookie = "CFFPCKUUID=" + CFFPCKUUID + "; expires=" + CFFPCKUUIDday.toGMTString() + "; path=/"
}
CFFPCKUUIDMAIN = getCFFPCKUUIDMAIN();
var maindomain = getDomain();
if (CFFPCKUUIDMAIN == "") {
    CFFPCKUUIDMAIN = makeCFFPCKUUID();
    document.cookie = "CFFPCKUUIDMAIN=" + CFFPCKUUIDMAIN + "; expires=" + CFFPCKUUIDday.toGMTString() + ";  domain=." + maindomain + "; path=/"
} else {
    document.cookie = "CFFPCKUUIDMAIN=" + CFFPCKUUIDMAIN + "; expires=" + CFFPCKUUIDday.toGMTString() + ";  domain=." + maindomain + "; path=/"
}
c_tag_mk("img", "https://c.holmesmind.com/cm", "");
// c_tag_mk("iframe", "https://fp.holmesmind.com/landing.php?CFFPCKUUIDMAIN=" + CFFPCKUUIDMAIN + "&" + "CFFPCKUUID=" + CFFPCKUUID + "&url=" + encodeURIComponent(location.href) + "&maindomain=" + maindomain, "");