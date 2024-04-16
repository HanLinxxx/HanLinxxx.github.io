window.QGSettings = {
   "appId": "9dc9aca397547b7afe5b",
   "debug": false,
   "personalizationEnabled": true,
   "vapidPublicKey": "BGVQDEAfUONZ7LgLEIRgugj6mFIB4f91wV8DJSWeVduG_YUTDteFN6n3XTXPA2MaIgflOT_df6W9EaMPdtT0wEI",
   "qgendpoint": "https://.aiqua.io/notify.html",
   "origin": "https://service.u-city.com.tw/",
   "inWebEnabled": false,
   "cookieServer": {
      "enabled": true,
      "endpoint": "https://appier.farglory-realty.com.tw"
   },
   "push": {
      "delay": 0,
      "requestSelf": false,
      "fakePrompt": false,
      "secondsBetweenPrompts": 3600,
      "restrictOrigin": false,
      "useNotifyEndpoint": false,
      "allowedPushDomains": null
   }
};
 if(window.qg && window.qg.queue) {
     window.qg.queue.unshift(('init', QGSettings));
 }
 !function(q,g,r,a,p,h,js){
     if(!q.qg){
         js=q.qg=function() {
             js.callmethod ? js.callmethod.call(js, arguments) : js.queue.push(arguments);
             js.queue = [];
         }
     }
     if(q.qg.initialized){return;}
     window.qg.queue.unshift(['init',window.QGSettings])
     p=g.createElement(r);
     p.async=!0;
     p.src=a;
     h=g.getElementsByTagName(r)[0];
     h.parentNode.insertBefore(p,h);
     q.qg.initialized = true;
 }(window,document,'script','https://cdn.qgraph.io/v3/r/aiqua.js');