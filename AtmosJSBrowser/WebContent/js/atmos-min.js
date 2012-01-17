("undefined"==typeof Crypto||!Crypto.util)&&function(){var a=window.Crypto={},b=a.util={rotl:function(a,b){return a<<b|a>>>32-b},rotr:function(a,b){return a<<32-b|a>>>b},endian:function(a){if(a.constructor==Number)return b.rotl(a,8)&16711935|b.rotl(a,24)&4278255360;for(var c=0;c<a.length;c++)a[c]=b.endian(a[c]);return a},randomBytes:function(a){for(var b=[];0<a;a--)b.push(Math.floor(256*Math.random()));return b},bytesToWords:function(a){for(var b=[],c=0,h=0;c<a.length;c++,h+=8)b[h>>>5]|=a[c]<<24-
h%32;return b},wordsToBytes:function(a){for(var b=[],c=0;c<32*a.length;c+=8)b.push(a[c>>>5]>>>24-c%32&255);return b},bytesToHex:function(a){for(var b=[],c=0;c<a.length;c++)b.push((a[c]>>>4).toString(16)),b.push((a[c]&15).toString(16));return b.join("")},hexToBytes:function(a){for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substr(c,2),16));return b},bytesToBase64:function(a){if("function"==typeof btoa)return btoa(c.bytesToString(a));for(var b=[],f=0;f<a.length;f+=3)for(var h=a[f]<<16|a[f+1]<<8|
a[f+2],g=0;4>g;g++)8*f+6*g<=8*a.length?b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h>>>6*(3-g)&63)):b.push("=");return b.join("")},base64ToBytes:function(a){if("function"==typeof atob)return c.stringToBytes(atob(a));for(var a=a.replace(/[^A-Z0-9+\/]/ig,""),b=[],f=0,h=0;f<a.length;h=++f%4)0!=h&&b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(f-1))&Math.pow(2,-2*h+8)-1)<<2*h|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(f))>>>
6-2*h);return b}};a.mode={};a=a.charenc={};a.UTF8={stringToBytes:function(a){return c.stringToBytes(unescape(encodeURIComponent(a)))},bytesToString:function(a){return decodeURIComponent(escape(c.bytesToString(a)))}};var c=a.Binary={stringToBytes:function(a){for(var b=[],c=0;c<a.length;c++)b.push(a.charCodeAt(c)&255);return b},bytesToString:function(a){for(var b=[],c=0;c<a.length;c++)b.push(String.fromCharCode(a[c]));return b.join("")}}}();(function(){var a=Crypto,b=a.util,c=a.charenc,d=c.UTF8,e=c.Binary;a.HMAC=function(a,c,g,j){c.constructor==String&&(c=d.stringToBytes(c));g.constructor==String&&(g=d.stringToBytes(g));g.length>4*a._blocksize&&(g=a(g,{asBytes:!0}));for(var m=g.slice(0),g=g.slice(0),i=0;i<4*a._blocksize;i++)m[i]^=92,g[i]^=54;a=a(m.concat(a(g.concat(c),{asBytes:!0})),{asBytes:!0});return j&&j.asBytes?a:j&&j.asString?e.bytesToString(a):b.bytesToHex(a)}})();(function(){var a=Crypto,b=a.util,c=a.charenc,d=c.UTF8,e=c.Binary,f=a.SHA1=function(a,c){var d=b.wordsToBytes(f._sha1(a));return c&&c.asBytes?d:c&&c.asString?e.bytesToString(d):b.bytesToHex(d)};f._sha1=function(a){a.constructor==String&&(a=d.stringToBytes(a));var c=b.bytesToWords(a),e=8*a.length,a=[],f=1732584193,i=-271733879,l=-1732584194,k=271733878,o=-1009589776;c[e>>5]|=128<<24-e%32;c[(e+64>>>9<<4)+15]=e;for(e=0;e<c.length;e+=16){for(var q=f,r=i,s=l,t=k,u=o,n=0;80>n;n++){if(16>n)a[n]=c[e+n];else{var p=
a[n-3]^a[n-8]^a[n-14]^a[n-16];a[n]=p<<1|p>>>31}p=(f<<5|f>>>27)+o+(a[n]>>>0)+(20>n?(i&l|~i&k)+1518500249:40>n?(i^l^k)+1859775393:60>n?(i&l|i&k|l&k)-1894007588:(i^l^k)-899497514);o=k;k=l;l=i<<30|i>>>2;i=f;f=p}f+=q;i+=r;l+=s;k+=t;o+=u}return[f,i,l,k,o]};f._blocksize=16;f._digestsize=20})();var isNodejs=!1;
if("undefined"!=typeof require)crypto=require("crypto"),jsdom=require("jsdom"),XMLHttpRequest=require("./lib/XMLHttpRequest.js").XMLHttpRequest,isNodejs=!0;else{if(!Array.prototype.forEach)Array.prototype.forEach=function(a,b){var c=this.length;if("function"!=typeof a)throw new TypeError;for(var d=0;d<c;d++)d in this&&a.call(b,this[d],d,this)};if(!String.prototype.trim)String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};if(!Object.keys)Object.keys=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&
b.push(c);return b}}function dumpObject(a,b){"undefined"==typeof b&&(b=1);if(0>b)return a;var c="[",d;for(d in a)if(a.hasOwnProperty(d)){var e=a[d];"object"===typeof e&&null!=e&&(e=dumpObject(e,b-1));c+=d+"="+e+", "}1<c.length&&(c=c.substr(0,c.length-2));return c+"]"}function AtmosRange(a,b){this.offset=a;this.size=b}AtmosRange.prototype.toString=function(){return"bytes="+this.offset+"-"+(this.offset+this.size-1)};function AtmosResult(a,b){this.success=a;this.state=b}
function Acl(a,b){this.userEntries=a;this.groupEntries=b}function AclEntry(a,b){this.key=a;this.value=b}AclEntry.ACL_PERMISSIONS={READ:"READ",WRITE:"WRITE",FULL_CONTROL:"FULL_CONTROL",NONE:"NONE"};AclEntry.GROUPS={OTHER:"other"};function ListOptions(a,b,c,d,e){this.limit=a;this.token=b;this.includeMeta=c;this.userMetaTags=d;this.systemMetaTags=e}function ObjectResult(a,b,c,d){this.objectId=this.id=a;this.userMeta=b;this.listableUserMeta=c;this.systemMeta=d}
function DirectoryItem(a,b,c,d,e,f,h){this.path=this.id=a;this.name=b;this.type=c;this.objectId=d;this.userMeta=e;this.listableUserMeta=f;this.systemMeta=h}function ObjectInfo(a,b,c,d,e,f,h){this.objectId=a;this.selection=b;this.replicas=c;this.expirationEnabled=d;this.expirationEndsAt=e;this.retentionEnabled=f;this.retentionEndsAt=h}function ObjectReplica(a,b,c,d,e){this.id=a;this.location=b;this.replicaType=c;this.current=d;this.storageType=e}
function AjaxRequest(a){this.uri=a.uri;this.method=a.method;this.headers=a.headers;this.data=a.data;this.mimeType=a.mimeType;this.range=a.range;this.progress=a.progress;this.processResult=a.processResult;this.complete=a.complete;this.form=a.form;this.state=a.state}function AtmosServiceInfo(a,b,c,d,e,f){this.version=a;this.object=b;this.namespace=c;this.utf8=d;this.browsercompat=e;this.keyvalue=f}var AtmosRest=function(a){this.atmosConfig=a;this.info("AtmosRest loaded")};AtmosRest.iframeCount=0;
AtmosRest.prototype.context="/rest";
AtmosRest.prototype.getServiceInformation=function(a,b){var c=this;this._ajax(new AjaxRequest({method:"GET",uri:this.context+"/service",headers:{},state:a,processResult:function(a,b){if(a.success){var f="n/a",h=c._getXmlDoc(b).getElementsByTagName("Version");h.length&&(f=c._getText(c._getChildByTagName(h[0],"Atmos")));a.value=new AtmosServiceInfo(f,!1,!1,!1,!1,!1);if(f=b.getResponseHeader("x-emc-features")){f=f.split(", ");for(h=0;h<f.length;h++)f[h]=f[h].replaceAll("-",""),a.value[f[h]]=!0}else a.value.object=
!0,a.value.namespace=!0,a.value.utf8="true"==b.getResponseHeader("x-emc-support-utf8")}},complete:b}))};AtmosRest.prototype.createObject=function(a,b,c,d,e,f,h,g,j){var m={},i=this;this._addAclHeaders(a,m);this._addMetadataHeaders(b,m,!1);this._addMetadataHeaders(c,m,!0);this._ajax(new AjaxRequest({uri:this.context+"/objects",method:"POST",headers:m,data:e,mimeType:f,progress:j,processResult:function(a,b){a.success&&i._processCreateObjectResult(a,b)},complete:g,form:d,state:h}))};
AtmosRest.prototype.createObjectOnPath=function(a,b,c,d,e,f,h,g,j,m){if(!AtmosRest.objectPathMatch.test(a))throw"The path '"+a+"' is not valid";var i={},l=this;this._addAclHeaders(b,i);this._addMetadataHeaders(c,i,!1);this._addMetadataHeaders(d,i,!0);this._ajax(new AjaxRequest({uri:this._getPath(a),method:"POST",headers:i,data:f,mimeType:h,progress:m,processResult:function(a,b){a.success&&l._processCreateObjectResult(a,b)},complete:j,form:e,state:g}))};
AtmosRest.prototype.readObject=function(a,b,c,d){this._ajax(new AjaxRequest({uri:this._getPath(a),method:"GET",headers:{},range:b,processResult:function(a,b){if(a.success)a.data=b.responseText},complete:d,state:c}))};
AtmosRest.prototype.updateObject=function(a,b,c,d,e,f,h,g,j,m,i){var l={};this._addAclHeaders(b,l);this._addMetadataHeaders(c,l,!1);this._addMetadataHeaders(d,l,!0);this._ajax(new AjaxRequest({uri:this._getPath(a),method:"PUT",headers:l,data:f,mimeType:g,range:h,progress:i,complete:m,form:e,state:j}))};AtmosRest.prototype.deleteObject=function(a,b,c){this._ajax(new AjaxRequest({uri:this._getPath(a),method:"DELETE",headers:{},complete:c,state:b}))};
AtmosRest.prototype.listVersions=function(a,b,c){var d=this;this._ajax(new AjaxRequest({uri:this._getPath(a)+"?versions",method:"GET",headers:{},processResult:function(a,b){if(a.success)a.value=d._parseObjectVersions(b)},complete:c,state:b}))};AtmosRest.prototype.versionObject=function(a,b,c){var d=this;this._ajax(new AjaxRequest({uri:this._getPath(a)+"?versions",method:"POST",headers:{},processResult:function(a,b){a.success&&d._processCreateObjectResult(a,b)},complete:c,state:b}))};
AtmosRest.prototype.restoreVersion=function(a,b,c,d){var e={};e["x-emc-version-oid"]=b;this._ajax(new AjaxRequest({uri:this._getPath(a)+"?versions",method:"PUT",headers:e,complete:d,state:c}))};AtmosRest.prototype.deleteVersion=function(a,b,c){this._ajax(new AjaxRequest({uri:this._getPath(a)+"?versions",method:"DELETE",headers:{},complete:c,state:b}))};
AtmosRest.prototype.rename=function(a,b,c,d,e){if(!AtmosRest.objectPathMatch.test(b))throw"The path '"+b+"' is not valid";var f={};f["x-emc-path"]=this.atmosConfig.utf8Support?encodeURIComponent(b.substr(1)):b.substr(1);c&&(f["x-emc-force"]="true");this._ajax(new AjaxRequest({uri:this._getPath(a)+"?rename",method:"POST",headers:f,complete:e,state:d}))};AtmosRest.prototype.createAttachmentDisposition=function(a){return a?"attachment; filename*="+encodeURIComponent("UTF-8''"+a):"attachment"};
AtmosRest.prototype.getShareableUrl=function(a,b,c){if(!b.getTime)throw"expirationDate must be a Date object";var a=this._getPath(a),d=Math.floor(b.getTime()/1E3),b="GET\n"+a.toLowerCase()+"\n"+this.atmosConfig.uid+"\n"+d;c&&(b+="\n"+c);this.info("hash string:\n"+b);var e=this._doSignature(b,this.atmosConfig.secret),b="uid="+encodeURIComponent(this.atmosConfig.uid),b=b+("&expires="+d)+("&signature="+encodeURIComponent(e));c&&(b+="&disposition="+encodeURIComponent(c));"undefined"!=typeof window?(c=
window.location.protocol,d=window.location.host):(c=this.atmosConfig.protocol,d=this.atmosConfig.host);a=c+"//"+d+this._encodeURI(a)+"?"+b;this.info("Shareable URL: "+a);return a};
AtmosRest.prototype.getAcl=function(a,b,c){var d=this;this._ajax(new AjaxRequest({uri:this._getPath(a)+"?acl",method:"GET",headers:{},processResult:function(a,b){if(a.success){var c=d._parseAclEntries(b.getResponseHeader("x-emc-useracl")),g=d._parseAclEntries(b.getResponseHeader("x-emc-groupacl"));a.value=new Acl(c,g)}},complete:c,state:b}))};
AtmosRest.prototype.setAcl=function(a,b,c,d){var e={};this._addAclHeaders(b,e);this._ajax(new AjaxRequest({uri:this._getPath(a)+"?acl",method:"POST",headers:e,complete:d,state:c}))};
AtmosRest.prototype.listUserMetadataTags=function(a,b,c){var d=this;this._ajax(new AjaxRequest({uri:this._getPath(a)+"?metadata/tags",method:"GET",headers:{},processResult:function(a,b){if(a.success){var c="true"==b.getResponseHeader("x-emc-utf8");a.value={};var g=b.getResponseHeader("x-emc-tags");if(g)a.value.tags=d._listToArray(g,c);if(g=b.getResponseHeader("x-emc-listable-tags"))a.value.listableTags=d._listToArray(g,c)}},complete:c,state:b}))};
AtmosRest.prototype.getUserMetadata=function(a,b,c,d){var e={},f=this;b&&this._addTagHeader(b,e);this._ajax(new AjaxRequest({uri:this._getPath(a)+"?metadata/user",method:"GET",headers:e,processResult:function(a,b){if(a.success){var c="true"==b.getResponseHeader("x-emc-utf8");a.value={};a.value.meta=f._parseMetadata(b.getResponseHeader("x-emc-meta"),c);a.value.listableMeta=f._parseMetadata(b.getResponseHeader("x-emc-listable-meta"),c)}},complete:d,state:c}))};
AtmosRest.prototype.getSystemMetadata=function(a,b,c,d){var e={},f=this;b&&this._addTagHeader(b,e);this._ajax(new AjaxRequest({uri:this._getPath(a)+"?metadata/system",method:"GET",headers:e,processResult:function(a,b){if(a.success){var c="true"==b.getResponseHeader("x-emc-utf8");a.value={};a.value.systemMeta=f._parseMetadata(b.getResponseHeader("x-emc-meta"),c);a.value.systemMeta.mimeType=b.getResponseHeader("Content-Type")}},complete:d,state:c}))};
AtmosRest.prototype.getAllMetadata=function(a,b,c){var d=this;this._ajax(new AjaxRequest({uri:this._getPath(a),method:"HEAD",headers:{},processResult:function(a,b){if(a.success){var c="true"==b.getResponseHeader("x-emc-utf8");a.value={};a.value.meta=d._parseMetadata(b.getResponseHeader("x-emc-meta"),c);a.value.listableMeta=d._parseMetadata(b.getResponseHeader("x-emc-listable-meta"),c);var c=d._parseAclEntries(b.getResponseHeader("x-emc-useracl")),g=d._parseAclEntries(b.getResponseHeader("x-emc-groupacl"));
a.value.acl=new Acl(c,g)}},complete:c,state:b}))};AtmosRest.prototype.getObjectInfo=function(a,b,c){var d=this;this._ajax(new AjaxRequest({uri:this._getPath(a)+"?info",method:"GET",headers:{},processResult:function(a,b){a.success&&d._processObjectInfoResult(a,b)},complete:c,state:b}))};
AtmosRest.prototype.setUserMetadata=function(a,b,c,d,e){var f={};this._addMetadataHeaders(b,f,!1);this._addMetadataHeaders(c,f,!0);this._ajax(new AjaxRequest({uri:this._getPath(a)+"?metadata/user",method:"POST",headers:f,complete:e,state:d}))};AtmosRest.prototype.deleteUserMetadata=function(a,b,c,d){var e={};this._addTagHeader(b,e);this._ajax(new AjaxRequest({uri:this._getPath(a)+"?metadata/user",method:"DELETE",headers:e,complete:d,state:c}))};
AtmosRest.prototype.getListableTags=function(a,b,c){var d={},e=this;a&&this._addTagHeader([a],d);this._ajax(new AjaxRequest({uri:this.context+"/objects?listabletags",method:"GET",headers:d,processResult:function(a,b){if(a.success){var c="true"==b.getResponseHeader("x-emc-utf8"),d=b.getResponseHeader("x-emc-listable-tags");if(d)a.value=e._listToArray(d,c)}},complete:c,state:b}))};
AtmosRest.prototype.listObjects=function(a,b,c,d){if(!a)throw"Tag cannot be null";var e={},f=this;this._addTagHeader([a],e);this._addListOptionHeaders(e,b);this._ajax(new AjaxRequest({uri:this.context+"/objects",method:"GET",headers:e,processResult:function(a,b){a.success&&f._processListObjectsResult(a,b)},complete:d,state:c}))};
AtmosRest.prototype.listDirectory=function(a,b,c,d){if(!a)throw"Directory cannot be null";if("/"!==a.charAt(a.length-1))throw"Directory must end with a slash";var e={},f=this;this._addListOptionHeaders(e,b);this._ajax(new AjaxRequest({uri:this.context+"/namespace"+a,method:"GET",headers:e,processResult:function(b,c){b.success&&f._processListDirectoryResult(a,b,c)},complete:d,state:c}))};AtmosRest.locationMatch=/^\/rest\/objects\/(.*)/;AtmosRest.objectPathMatch=/^\//;
AtmosRest.prototype._getPath=function(a){return AtmosRest.objectPathMatch.test(a)?this.context+"/namespace"+a:this.context+"/objects/"+a};AtmosRest.prototype._addAclHeaders=function(a,b){null!=a&&(b["x-emc-useracl"]=this._mapEntriesToString(a.userEntries),b["x-emc-groupacl"]=this._mapEntriesToString(a.groupEntries))};AtmosRest.prototype._mapEntriesToString=function(a){if(void 0==a||1>a.length)return null;for(var b=[],c=0;c<a.length;c++)b.push(a[c].key+"="+a[c].value);return b.join(",")};
AtmosRest.prototype._addTagHeader=function(a,b){for(var c="",d=0;d<a.length;d++)0<d&&(c+=","),c+=this.atmosConfig.utf8Support?encodeURIComponent(a[d]):a[d];b["x-emc-tags"]=c};AtmosRest.prototype._addMetadataHeaders=function(a,b,c){null==a||0==Object.keys(a).length||(c?b["x-emc-listable-meta"]=this._metaToHeaderValue(a):b["x-emc-meta"]=this._metaToHeaderValue(a))};
AtmosRest.prototype._metaToHeaderValue=function(a){for(var b=[],c=Object.keys(a),d=0;d<c.length;d++){var e=this.atmosConfig.utf8Support?encodeURIComponent(c[d]):c[d],f=this.atmosConfig.utf8Support?encodeURIComponent(a[c[d]]):a[c[d]];b.push(e+"="+f)}return b.join(",")};AtmosRest.prototype._listToArray=function(a,b){if(!a)return null;if(0==a.trim().length)return[];for(var c=a.split(","),d=0;d<c.length;d++)c[d]=b?decodeURIComponent(c[d].trim()):c[d].trim();return c};
AtmosRest.prototype._addListOptionHeaders=function(a,b){if(b){b.limit&&(a["x-emc-limit"]=""+b.limit);if(b.token)a["x-emc-token"]=b.token;b.includeMeta&&(a["x-emc-include-meta"]="1",b.userMetaTags&&(a["x-emc-user-tags"]=b.userMetaTags.join(",")),b.systemMetaTags&&(a["x-emc-system-tags"]=b.systemMetaTags.join(",")))}};AtmosRest.prototype._prepBaseHeaders=function(a,b){a["x-emc-date"]=(new Date).toGMTString();b&&(a.Range=b.toString())};
AtmosRest.prototype._prepUploadHeaders=function(a,b){if(""==b||void 0==b)b="text/plain; charset=UTF-8";-1==b.indexOf("charset")&&(b+="; charset=UTF-8");a["Content-Type"]=b};
AtmosRest.prototype._ajax=function(a){a.uri=this._resolveDots(a.uri);a.headers&&(this.atmosConfig.utf8Support&&(a.headers["x-emc-utf8"]="true"),this._prepBaseHeaders(a.headers,a.range),/(POST|PUT)/.test(a.method)&&this._prepUploadHeaders(a.headers,a.mimeType),this._signRequest(a.method,a.headers,a.uri));if(!/^https?:\/\//.test(a.uri)&&(a.uri=this._encodeURI(a.uri),this.atmosConfig.host&&this.atmosConfig.protocol))a.uri=this.atmosConfig.protocol+"//"+this.atmosConfig.host+a.uri;var b=this,c=function(c){var d=
b._createResult(c,400>c.status,a.state);a.processResult&&a.processResult(d,c);a.complete&&a.complete(d)};if(a.form){a.headers["x-http-inject-response-headers"]="true";if("POST"!=a.method)a.headers["x-http-method-override"]=a.method;var d=this._createTargetIframe(function(a){a=b._parseFormResponse(a);c(a)});this._setFormHeaders(a.form,a.headers);a.progress&&a.progress(-1);a.form.action=a.uri;a.form.method="POST";a.form.enctype=a.form.encoding="multipart/form-data";a.form.target=d.name;a.form.submit()}else{var e=
this._getXMLHttpRequest();e.onreadystatechange=function(){4==e.readyState&&c(e)};try{if(a.progress)(e.upload||e).onprogress=function(b){b.lengthComputable&&a.progress(Math.floor(100*((b.position||b.loaded)/(b.totalSize||b.total))))}}catch(f){a.progress(-1)}e.open(a.method,a.uri,!0);this._setHeaders(e,a.headers);a.data?e.send(a.data):e.send()}};AtmosRest.prototype._getXMLHttpRequest=function(){if(isNodejs)return new XMLHttpRequest;if(window.XMLHttpRequest)return new window.XMLHttpRequest;try{return new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(a){return null}};
AtmosRest.prototype._setFormHeaders=function(a,b){for(var c=Object.keys(b),d=0;d<c.length;d++){var e=a.elements[c[d]];if(!e){try{e=document.createElement('<input type="hidden" name="'+c[d]+'">')}catch(f){e=document.createElement("input"),e.name=c[d]}e.type="hidden";a.insertBefore(e,a.childNodes[0])}e.value=b[c[d]]}};
AtmosRest.prototype._createTargetIframe=function(a){var b="ATMOS_IFRAME_"+ ++AtmosRest.iframeCount,c;try{c=document.createElement('<iframe name="'+b+'"></iframe>')}catch(d){c=document.createElement("iframe"),c.name=b}c.id=b;c.style.display="none";document.body.appendChild(c);b=function(){var b=c.contentDocument||c.contentWindow.document;a.call(c,null!=b.body?b.body.firstChild.innerHTML:b.documentElement.innerHTML);document.body.removeChild(c)};c.attachEvent?c.attachEvent("onload",b):c.onload=b;return c};
AtmosRest.prototype._parseFormResponse=function(a){this.debug("form response (raw):\n"+a);var b={headers:{}},c;try{var d=0,e=function(b){var c=a.indexOf("\n");if(0>c)c=a.length;var e=a.substr(0,c);b&&(a=a.substr(c+1),d+=c+1);return e};c=parseInt(e(!1));if(!isNaN(c)){e(!0);var f=e(!0).split(" ");b.status=parseInt(f[1]);for(b.statusText=f[2];d<c;){var h=e(!0),g=h.indexOf(": ");b.headers[h.substr(0,g)]=h.substr(g+2)}}}catch(j){this.warn("could not parse headers in form response: "+j)}b.getResponseHeader=
function(a){return this.headers[a]};b.responseText=a;return b};AtmosRest.prototype._resolveDots=function(a){if(!a)return a;for(var a=a.split("/"),b=0;b<a.length;b++)".."==a[b]?(a.splice(b-1,2),b-=2):"."==a[b]&&a.splice(b--,1);return a.join("/")};AtmosRest.prototype._setHeaders=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&a.setRequestHeader(c,b[c])};
AtmosRest.prototype._encodeURI=function(a){this.debug("encodeURI: in: "+a);var b=a.indexOf("?"),c="";-1!=b&&(c=a.substring(b),a=a.substring(0,b));for(var a=a.split("/"),d=0;d<a.length;d++)a[d]=encodeURIComponent(a[d]);a=a.join("/");-1!=b&&(a+=encodeURI(c));this.debug("encodeURI: out: "+a);return a};
AtmosRest.prototype._createResult=function(a,b,c){c=new AtmosResult(b,c);c.httpCode=a.status;c.httpMessage=a.statusText;if(!b&&(a=this._getXmlDoc(a).getElementsByTagName("Error"),a.length))c.errorCode=this._getText(this._getChildByTagName(a[0],"Code")),c.errorMessage=this._getText(this._getChildByTagName(a[0],"Message"));return c};AtmosRest.prototype._getXmlDoc=function(a){if(a.responseXML)return a.responseXML;this.debug("response:\n"+a.responseText);return this._createXmlDoc(a.responseText)};
AtmosRest.prototype._createXmlDoc=function(a){if(isNodejs)return jsdom.jsdom(a);if(window.DOMParser)return(new DOMParser).parseFromString(a,"text/xml");if("undefined"!=typeof ActiveXObject){var b=new ActiveXObject("MSXML.DomDocument");b.loadXML(a);return b}};
AtmosRest.prototype._processCreateObjectResult=function(a,b){var c=b.getResponseHeader("location");this.debug("location: "+c);var d=c.match(AtmosRest.locationMatch);null==d?(a.success=!1,a.message="Could not find location in "+c):(a.value=d[1],this.debug("Location: "+a.value))};
AtmosRest.prototype._parseMetadata=function(a,b){if("undefined"==typeof a||null==a||0==a.length)return null;for(var c={},d=a.split(","),e=0;e<d.length;e++){var f=d[e].split("=",2),h=b?decodeURIComponent(f[0].trim()):f[0].trim();c[h]=1==f.length?"":b?decodeURIComponent(f[1]):f[1]}return c};
AtmosRest.prototype._processListObjectsResult=function(a,b){a.token=b.getResponseHeader("x-emc-token");for(var c=[],d=this._getXmlDoc(b).getElementsByTagName("Object"),e=0;e<d.length;e++){var f=null,h=null,g=null,j=d.item(e),m=this._getChildByTagName(j,"ObjectID"),i=this._getChildByTagName(j,"SystemMetadataList"),j=this._getChildByTagName(j,"UserMetadataList");i&&(h={},this._parseResponseMeta(i.childNodes,h,null));j&&(f={},g={},this._parseResponseMeta(j.childNodes,f,g));f=new ObjectResult(this._getText(m),
f,g,h);c.push(f)}a.value=c};
AtmosRest.prototype._processListDirectoryResult=function(a,b,c){b.token=c.getResponseHeader("x-emc-token");for(var d=[],c=this._getXmlDoc(c).getElementsByTagName("DirectoryEntry"),e=0;e<c.length;e++){var f=null,h=null,g=null,j=c.item(e),m=this._getChildByTagName(j,"ObjectID"),i=this._getChildByTagName(j,"Filename"),l=this._getChildByTagName(j,"FileType"),k=this._getChildByTagName(j,"SystemMetadataList"),j=this._getChildByTagName(j,"UserMetadataList");k&&(h={},this._parseResponseMeta(k.childNodes,h,
null));j&&(f={},g={},this._parseResponseMeta(j.childNodes,f,g));f=new DirectoryItem(a+this._getText(i),this._getText(i),this._getText(l),this._getText(m),f,g,h);d.push(f)}b.value=d};
AtmosRest.prototype._processObjectInfoResult=function(a,b){var c=this._getXmlDoc(b),d=null,e=null,f=[],h=!1,g=null,j=!1,m=null,i=c.getElementsByTagName("objectId");i.length&&(d=this._getText(i.item(0)));i=c.getElementsByTagName("selection");i.length&&(e=this._getText(i.item(0)));i=c.getElementsByTagName("replicas");if(i.length)for(var i=this._getChildrenByTagName(i.item(0),"replica"),l=0;l<i.length;l++){var k=i[l],o=this._getText(this._getChildByTagName(k,"id")),q=this._getText(this._getChildByTagName(k,
"location")),r=this._getText(this._getChildByTagName(k,"type")),s=this._getText(this._getChildByTagName(k,"current")),k=this._getText(this._getChildByTagName(k,"storageType"));f.push(new ObjectReplica(o,q,r,s,k))}i=c.getElementsByTagName("expiration");i.length&&(k=i.item(0),h=this._getText(this._getChildByTagName(k,"enabled")),g=this._getText(this._getChildByTagName(k,"endAt")));i=c.getElementsByTagName("retention");i.length&&(k=i.item(0),j=this._getText(this._getChildByTagName(k,"enabled")),m=this._getText(this._getChildByTagName(k,
"endAt")));a.value=new ObjectInfo(d,e,f,h,g,j,m)};AtmosRest.prototype._parseObjectVersions=function(a){for(var b=[],a=this._getXmlDoc(a).getElementsByTagName("Ver"),c=0;c<a.length;c++)b.push(this._getText(this._getChildByTagName(a.item(c),"OID")));return b};AtmosRest.prototype._parseAclEntries=function(a){for(var b=[],a=this._listToArray(a),c=0;c<a.length;c++){var d=a[c].split("=",2),e=d[0],d=d[1],e=e.trim();if("FULL"===d)d=AclEntry.ACL_PERMISSIONS.FULL_CONTROL;b[c]=new AclEntry(e,d)}return b};
AtmosRest.prototype._parseResponseMeta=function(a,b,c){for(var d=0;d<a.length;d++){var e=a.item(d);if(/Metadata/i.test(e.nodeName)){var f=this._getText(this._getChildByTagName(e,"Name")),h=this._getText(this._getChildByTagName(e,"Value"));(e=this._getChildByTagName(e,"Listable"))&&"true"==this._getText(e)?c[f]=h:b[f]=h}}};AtmosRest.prototype._getChildByTagName=function(a,b){var c=this._getChildrenByTagName(a,b);return c.length?c[0]:null};
AtmosRest.prototype._getChildrenByTagName=function(a,b){for(var c=RegExp(b,"i"),d=a.childNodes,e=[],f=0;f<d.length;f++){var h=d.item(f);1==h.nodeType&&c.test(h.nodeName)&&e.push(h)}return e};AtmosRest.prototype._getText=function(a){for(var a=a.childNodes,b="",c=0;c<a.length;c++){var d=a.item(c);3==d.nodeType&&(b+=d.data)}return b};
AtmosRest.prototype._signRequest=function(a,b,c){this.debug(this.atmosConfig.uid);this.debug(this.atmosConfig.secret);var d=b["Content-Type"],e=b.Range,f;f=""==b?new Hash:b;f["x-emc-uid"]=this.atmosConfig.uid;a=this._buildHashString(a,d,e,b.Date,c,f);this.debug("HashString:\n"+a);a=this._doSignature(a,this.atmosConfig.secret);this.debug("Signature: "+a);return f["x-emc-signature"]=a};
AtmosRest.prototype._buildHashString=function(a,b,c,d,e,f){var h={},g="",g=a+"\n",g=b?g+(b+"\n"):g+"\n",g=c?g+(c.toString()+"\n"):g+"\n",g=d?g+(d+"\n"):g+"\n",g=g+(e.toLowerCase().trim()+"\n"),j;for(j in f)f.hasOwnProperty(j)&&(this.debug("headers: prop: "+j+" value: "+f[j]),a=this._normalizeWS(j.toLowerCase().trim()),0!=a.indexOf("x-emc")?this.debug("Skipping "+a):((b=f[j])&&(b=this._normalizeWS(b.trim())),h[a]=b));f=Object.keys(h);this.debug("keys "+f);f.sort().forEach(function(a){g+=a+":"+h[a]+
"\n"});return g.trim()};AtmosRest.prototype._normalizeWS=function(a){if(null==a)return null;a=a.replace(/\n/," ");return a.replace(/\s+/," ")};AtmosRest.prototype._doSignature=function(a,b){this.debug("Secret: "+b);if(isNodejs){var c=new Buffer(b,"base64"),c=crypto.createHmac("sha1",c.toString("binary"));c.update(a);return c.digest("base64")}c=Crypto.HMAC(Crypto.SHA1,a,Crypto.util.base64ToBytes(b),{asBytes:!0});return Crypto.util.bytesToBase64(c)};
AtmosRest.prototype.debug=function(a){"undefined"!==typeof console&&("undefined"!==typeof console.debug?console.debug(a):"undefined"!==typeof console.log&&console.log(a))};AtmosRest.prototype.info=function(a){"undefined"!==typeof console&&"undefined"!==typeof console.info&&console.info(a)};AtmosRest.prototype.warn=function(a){"undefined"!==typeof console&&"undefined"!==typeof console.warn&&console.warn(a)};
AtmosRest.prototype.error=function(a){"undefined"!==typeof console&&"undefined"!==typeof console.error&&console.error(a)};if("undefined"!=typeof exports)exports.AtmosRest=AtmosRest,exports.AtmosRange=AtmosRange,exports.Acl=Acl,exports.AclEntry=AclEntry,exports.AjaxRequest=AjaxRequest,exports.AtmosResult=AtmosResult,exports.AtmosServiceInfo=AtmosServiceInfo,exports.ListOptions=ListOptions,exports.ObjectResult=ObjectResult,exports.DirectoryItem=DirectoryItem,exports.dumpObject=dumpObject;