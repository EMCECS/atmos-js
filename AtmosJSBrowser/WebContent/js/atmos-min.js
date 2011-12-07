var isNodejs=!1;
if("undefined"!=typeof require)crypto=require("crypto"),jsdom=require("jsdom"),XMLHttpRequest=require("./lib/XMLHttpRequest.js").XMLHttpRequest,isNodejs=!0;else{if(!Array.prototype.forEach)Array.prototype.forEach=function(a,b){var c=this.length;if("function"!=typeof a)throw new TypeError;for(var d=0;d<c;d++)d in this&&a.call(b,this[d],d,this)};if(!String.prototype.trim)String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};if(!Object.keys)Object.keys=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&
b.push(c);return b}}function dumpObject(a,b){"undefined"==typeof b&&(b=1);if(0>b)return a;var c="[",d;for(d in a)if(a.hasOwnProperty(d)){var e=a[d];"object"===typeof e&&null!=e&&(e=dumpObject(e,b-1));c+=d+"="+e+", "}1<c.length&&(c=c.substr(0,c.length-2));return c+"]"}function AtmosRange(a,b){this.offset=a;this.size=b}AtmosRange.prototype.toString=function(){return"bytes="+this.offset+"-"+(this.offset+this.size-1)};function AtmosResult(a,b){this.success=a;this.state=b}
function Acl(a,b){this.userEntries=a;this.groupEntries=b}function AclEntry(a,b){this.key=a;this.value=b}AclEntry.ACL_PERMISSIONS={READ:"READ",WRITE:"WRITE",FULL_CONTROL:"FULL_CONTROL",NONE:"NONE"};AclEntry.GROUPS={OTHER:"other"};function ListOptions(a,b,c,d,e){this.limit=a;this.token=b;this.includeMeta=c;this.userMetaTags=d;this.systemMetaTags=e}function ObjectResult(a,b,c,d){this.objectId=this.id=a;this.userMeta=b;this.listableUserMeta=c;this.systemMeta=d}
function DirectoryEntry(a,b,c,d,e,f,g){this.path=this.id=a;this.name=b;this.type=c;this.objectId=d;this.userMeta=e;this.listableUserMeta=f;this.systemMeta=g}function ObjectInfo(a,b,c,d,e,f,g){this.objectId=a;this.selection=b;this.replicas=c;this.expirationEnabled=d;this.expirationEndsAt=e;this.retentionEnabled=f;this.retentionEndsAt=g}function ObjectReplica(a,b,c,d,e){this.id=a;this.location=b;this.replicaType=c;this.current=d;this.storageType=e}var AtmosRest=function(a){this.atmosConfig=a;this.info("AtmosRest loaded")};
AtmosRest.prototype.context="/rest";AtmosRest.prototype.getServiceInformation=function(a,b){var c=this;this._ajax({method:"GET",uri:this.context+"/service",headers:{},state:a,callback:b,success:function(d){var e=c._createResult(d,!0,a),d=c._getXmlDoc(d).getElementsByTagName("Version");if(d.length)e.value=c._getText(c._getChildByTagName(d[0],"Atmos"));b(e)}})};
AtmosRest.prototype.createObject=function(a,b,c,d,e,f,g,h){var i={},k=this;this._addAclHeaders(a,i);this._addMetadataHeaders(b,i,!1);this._addMetadataHeaders(c,i,!0);this._ajax({method:"POST",uri:this.context+"/objects",headers:i,data:d,mimeType:e,state:f,callback:g,success:function(a){k._createObjectHandler(a,f,g)},progress:h})};
AtmosRest.prototype.createObjectOnPath=function(a,b,c,d,e,f,g,h,i){if(!AtmosRest.objectPathMatch.test(a))throw"The path '"+a+"' is not valid";var k={},j=this;this._addAclHeaders(b,k);this._addMetadataHeaders(c,k,!1);this._addMetadataHeaders(d,k,!0);this._ajax({method:"POST",uri:this._getPath(a),headers:k,data:e,mimeType:f,state:g,callback:h,success:function(a){j._createObjectHandler(a,g,h)},progress:i})};
AtmosRest.prototype.readObject=function(a,b,c,d){var e=this;this._ajax({method:"GET",uri:this._getPath(a),headers:{},range:b,state:c,callback:d,success:function(a){var b=e._createResult(a,!0,c);b.data=a.responseText;d(b)}})};AtmosRest.prototype.updateObject=function(a,b,c,d,e,f,g,h,i,k){var j={};this._addAclHeaders(b,j);this._addMetadataHeaders(c,j,!1);this._addMetadataHeaders(d,j,!0);this._ajax({method:"PUT",uri:this._getPath(a),headers:j,data:e,range:f,mimeType:g,state:h,callback:i,progress:k})};
AtmosRest.prototype.deleteObject=function(a,b,c){this._ajax({method:"DELETE",uri:this._getPath(a),headers:{},state:b,callback:c})};AtmosRest.prototype.listVersions=function(a,b,c){var d=this;this._ajax({method:"GET",uri:this._getPath(a)+"?versions",headers:{},state:b,callback:c,success:function(a){var f=d._createResult(a,!0,b);f.value=d._parseObjectVersions(a);c(f)}})};
AtmosRest.prototype.versionObject=function(a,b,c){var d=this;this._ajax({method:"POST",uri:this._getPath(a)+"?versions",headers:{},state:b,callback:c,success:function(a){d._createObjectHandler(a,b,c)}})};AtmosRest.prototype.restoreVersion=function(a,b,c,d){var e={};e["x-emc-version-oid"]=b;this._ajax({method:"PUT",uri:this._getPath(a)+"?versions",headers:e,state:c,callback:d})};
AtmosRest.prototype.deleteVersion=function(a,b,c){this._ajax({method:"DELETE",uri:this._getPath(a)+"?versions",headers:{},state:b,callback:c})};AtmosRest.prototype.rename=function(a,b,c,d,e){if(!AtmosRest.objectPathMatch.test(b))throw"The path '"+path+"' is not valid";var f={};f["x-emc-path"]=b.substr(1);c&&(f["x-emc-force"]="true");this._ajax({method:"POST",uri:this._getPath(a)+"?rename",headers:f,state:d,callback:e})};
AtmosRest.prototype.createAttachmentDisposition=function(a){return a?"attachment; filename*="+encodeURIComponent("UTF-8''"+a):"attachment"};
AtmosRest.prototype.getShareableUrl=function(a,b,c){if(!b.getTime)throw"expirationDate must be a Date object";var a=this._getPath(a),d=Math.floor(b.getTime()/1E3),b="GET\n"+a.toLowerCase()+"\n"+this.atmosConfig.uid+"\n"+d;c&&(b+="\n"+c);this.info("hash string:\n"+b);var e=this._doSignature(b,this.atmosConfig.secret),b="uid="+encodeURIComponent(this.atmosConfig.uid),b=b+("&expires="+d)+("&signature="+encodeURIComponent(e));c&&(b+="&disposition="+encodeURIComponent(c));"undefined"!=typeof window?(c=
window.location.protocol,d=window.location.host):(c=this.atmosConfig.protocol,d=this.atmosConfig.host);a=c+"//"+d+this._encodeURI(a)+"?"+b;this.info("Shareable URL: "+a);return a};
AtmosRest.prototype.getAcl=function(a,b,c){var d=this;this._ajax({method:"GET",uri:this._getPath(a)+"?acl",headers:{},state:b,callback:c,success:function(a){var f=d._createResult(a,!0,b),g=d._parseAclEntries(a.getResponseHeader("x-emc-useracl")),a=d._parseAclEntries(a.getResponseHeader("x-emc-groupacl"));f.value=new Acl(g,a);c(f)}})};AtmosRest.prototype.setAcl=function(a,b,c,d){var e={};this._addAclHeaders(b,e);this._ajax({method:"POST",uri:this._getPath(a)+"?acl",headers:e,state:c,callback:d})};
AtmosRest.prototype.listUserMetadataTags=function(a,b,c){var d=this;this._ajax({method:"GET",uri:this._getPath(a)+"?metadata/tags",headers:{},state:b,callback:c,success:function(a){var f=d._createResult(a,!0,b);f.value={};var g=a.getResponseHeader("x-emc-tags");if(g)f.value.tags=d._headerValueToArray(g);if(a=a.getResponseHeader("x-emc-listable-tags"))f.value.listableTags=d._headerValueToArray(a);c(f)}})};
AtmosRest.prototype.getUserMetadata=function(a,b,c,d){var e={},f=this;b&&(e["x-emc-tags"]=b.join(","));this._ajax({method:"GET",uri:this._getPath(a)+"?metadata/user",headers:e,state:c,callback:d,success:function(a){var b=f._createResult(a,!0,c);b.value={};b.value.meta=f._parseMetadata(a.getResponseHeader("x-emc-meta"));b.value.listableMeta=f._parseMetadata(a.getResponseHeader("x-emc-listable-meta"));d(b)}})};
AtmosRest.prototype.getSystemMetadata=function(a,b,c,d){var e={},f=this;b&&(e["x-emc-tags"]=b.join(","));this._ajax({method:"GET",uri:this._getPath(a)+"?metadata/system",headers:e,state:c,callback:d,success:function(a){var b=f._createResult(a,!0,c);b.value={};b.value.systemMeta=f._parseMetadata(a.getResponseHeader("x-emc-meta"));b.value.systemMeta.mimeType=a.getResponseHeader("Content-Type");d(b)}})};
AtmosRest.prototype.getAllMetadata=function(a,b,c){var d=this;this._ajax({method:"HEAD",uri:this._getPath(a),headers:{},state:b,callback:c,success:function(a){var f=d._createResult(a,!0,b);f.value={};f.value.meta=d._parseMetadata(a.getResponseHeader("x-emc-meta"));f.value.listableMeta=d._parseMetadata(a.getResponseHeader("x-emc-listable-meta"));var g=d._parseAclEntries(a.getResponseHeader("x-emc-useracl")),a=d._parseAclEntries(a.getResponseHeader("x-emc-groupacl"));f.value.acl=new Acl(g,a);c(f)}})};
AtmosRest.prototype.getObjectInfo=function(a,b,c){var d=this;this._ajax({method:"GET",uri:this._getPath(a)+"?info",headers:{},state:b,callback:c,success:function(a){d._handleObjectInfoResponse(a,b,c)}})};AtmosRest.prototype.setUserMetadata=function(a,b,c,d,e){var f={};this._addMetadataHeaders(b,f,!1);this._addMetadataHeaders(c,f,!0);this._ajax({method:"POST",uri:this._getPath(a)+"?metadata/user",headers:f,state:d,callback:e})};
AtmosRest.prototype.deleteUserMetadata=function(a,b,c,d){var e={};this._addTagHeader(b,e);this._ajax({method:"DELETE",uri:this._getPath(a)+"?metadata/user",headers:e,state:c,callback:d})};
AtmosRest.prototype.getListableTags=function(a,b,c){var d={},e=this;a&&(d["x-emc-tags"]=a);this._ajax({method:"GET",uri:this.context+"/objects?listabletags",headers:d,state:b,callback:c,success:function(a){var d=e._createResult(a,!0,b);if(a=a.getResponseHeader("x-emc-listable-tags"))d.value=e._headerValueToArray(a);c(d)}})};
AtmosRest.prototype.listObjects=function(a,b,c,d){if(!a)throw"Tag cannot be null";var e={},f=this;e["x-emc-tags"]=a;this._addListOptionHeaders(e,b);this._ajax({method:"GET",uri:this.context+"/objects",headers:e,state:c,callback:d,success:function(a){f._handleListObjectsResponse(a,c,d)}})};
AtmosRest.prototype.listDirectory=function(a,b,c,d){if(!a)throw"Directory cannot be null";if("/"!==a.charAt(a.length-1))throw"Directory must end with a slash";var e={},f=this;this._addListOptionHeaders(e,b);this._ajax({method:"GET",uri:this.context+"/namespace"+a,headers:e,state:c,callback:d,success:function(b){f._handleListDirectoryResponse(a,b,c,d)}})};AtmosRest.locationMatch=/^\/rest\/objects\/(.*)/;AtmosRest.objectPathMatch=/^\//;
AtmosRest.prototype._getPath=function(a){return AtmosRest.objectPathMatch.test(a)?this.context+"/namespace"+a:this.context+"/objects/"+a};AtmosRest.prototype._addAclHeaders=function(a,b){null!=a&&(b["x-emc-useracl"]=this._mapEntriesToString(a.userEntries),b["x-emc-groupacl"]=this._mapEntriesToString(a.groupEntries))};AtmosRest.prototype._mapEntriesToString=function(a){if(void 0==a||1>a.length)return null;for(var b=[],c=0;c<a.length;c++)b.push(a[c].key+"="+a[c].value);return b.join(",")};
AtmosRest.prototype._addTagHeader=function(a,b){for(var c="",d=0;d<a.length;d++)0<d&&(c+=","),c+=a[d];b["x-emc-tags"]=c};AtmosRest.prototype._addMetadataHeaders=function(a,b,c){null==a||0==Object.keys(a).length||(c?b["x-emc-listable-meta"]=this._mapToString(a):b["x-emc-meta"]=this._mapToString(a))};AtmosRest.prototype._mapToString=function(a){for(var b=[],c=Object.keys(a),d=0;d<c.length;d++)b.push(c[d]+"="+a[c[d]]);return b.join(",")};
AtmosRest.prototype._headerValueToArray=function(a){if(!a)return null;if(0==a.trim().length)return[];for(var a=a.split(","),b=0;b<a.length;b++)a[b]=a[b].trim();return a};AtmosRest.prototype._addListOptionHeaders=function(a,b){if(b){b.limit&&(a["x-emc-limit"]=""+b.limit);if(b.token)a["x-emc-token"]=b.token;b.includeMeta&&(a["x-emc-include-meta"]="1",b.userMetaTags&&(a["x-emc-user-tags"]=b.userMetaTags.join(",")),b.systemMetaTags&&(a["x-emc-system-tags"]=b.systemMetaTags.join(",")))}};
AtmosRest.prototype._prepBaseHeaders=function(a,b){a["x-emc-date"]=(new Date).toGMTString();b&&(a.Range=b.toString())};AtmosRest.prototype._prepUploadHeaders=function(a,b){if(""==b||void 0==b)b="text/plain; charset=UTF-8";-1==b.indexOf("charset")&&(b+="; charset=UTF-8");a["Content-Type"]=b};
AtmosRest.prototype._ajax=function(a){a.uri=this._resolveDots(a.uri);a.headers&&(this._prepBaseHeaders(a.headers,a.range),/(POST|PUT)/.test(a.method)&&this._prepUploadHeaders(a.headers,a.mimeType),this._signRequest(a.method,a.headers,a.uri));if(!/^https?:\/\//.test(a.uri)&&(a.uri=this._encodeURI(a.uri),this.atmosConfig.host&&this.atmosConfig.protocol))a.uri=this.atmosConfig.protocol+"//"+this.atmosConfig.host+a.uri;var b=this;if(a.formId){var c=document.getElementById(a.formId),d=document.getElementById(a.iframeId);
d.onreadystatechange=function(){if("complete"==d.readyState){var c=document.createElement("div");c.appendChild(d.contentWindow.document.documentElement);c=c.innerHTML;c.indexOf("<Error>"==0)?a.error?a.error({responseText:c}):a.callback(b._createResult({responseText:c},!1,a.state)):a.success?a.success({responseText:c}):a.callback(b._createResult({responseText:c},!0,a.state))}};for(var e=Object.keys(a.headers),f=0;f<e.length;f++){var g=c.elements[e[f]];g||(g=document.createElement("input"),g.setAttribute("type",
"hidden"),g.setAttribute("name",e[f]),c.insertBefore(g,c.childNodes[0]));g.setAttribute("value",a.headers[e[f]])}c.setAttribute("target",a.iframeId);c.submit()}else{var h=this._getXMLHttpRequest();h.onreadystatechange=function(){4==h.readyState&&(400>h.status?a.success?a.success(h):a.callback(b._createResult(h,!0,a.state)):a.error?a.error(h):a.callback(b._createResult(h,!1,a.state)))};try{if(a.progress)(h.upload||h).onprogress=function(b){b.lengthComputable&&a.progress(Math.floor(100*((b.position||
b.loaded)/(b.totalSize||b.total))))}}catch(i){}h.open(a.method,a.uri,!0);this._setHeaders(h,a.headers);a.data?h.send(a.data):h.send()}};AtmosRest.prototype._getXMLHttpRequest=function(){if(isNodejs)return new XMLHttpRequest;if(window.XMLHttpRequest)return new window.XMLHttpRequest;try{return new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(a){return null}};
AtmosRest.prototype._resolveDots=function(a){if(!a)return a;for(var a=a.split("/"),b=0;b<a.length;b++)".."==a[b]?(a.splice(b-1,2),b-=2):"."==a[b]&&a.splice(b--,1);return a.join("/")};AtmosRest.prototype._setHeaders=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&a.setRequestHeader(c,b[c])};
AtmosRest.prototype._encodeURI=function(a){this.debug("encodeURI: in: "+a);var b=a.indexOf("?"),c="";-1!=b&&(c=a.substring(b),a=a.substring(0,b));for(var a=a.split("/"),d="",d=0;d<a.length;d++)a[d]=encodeURIComponent(a[d]);d=a.join("/");-1!=b&&(d+=encodeURI(c));this.debug("encodeURI: out: "+d);return d};
AtmosRest.prototype._createResult=function(a,b,c){c=new AtmosResult(b,c);c.httpCode=a.status;c.httpMessage=a.statusText;if(!b&&(a=this._getXmlDoc(a).getElementsByTagName("Error"),a.length))c.errorCode=this._getText(this._getChildByTagName(a[0],"Code")),c.errorMessage=this._getText(this._getChildByTagName(a[0],"Message"));return c};AtmosRest.prototype._getXmlDoc=function(a){if(a.responseXML)return a.responseXML;this.debug("response:\n"+a.responseText);return this._createXmlDoc(a.responseText)};
AtmosRest.prototype._createXmlDoc=function(a){if(isNodejs)return jsdom.jsdom(a);if(window.DOMParser)return(new DOMParser).parseFromString(a,"text/xml");if("undefined"!=typeof ActiveXObject){var b=new ActiveXObject("MSXML.DomDocument");b.loadXML(a);return b}};
AtmosRest.prototype._createObjectHandler=function(a,b,c){var d=a.getResponseHeader("location");this.debug("location: "+d);var e=d.match(AtmosRest.locationMatch);null==e?(e=this._createResult(a,!1,b),e.message="Could not find location in "+d,c(e)):(d=this._createResult(a,!0,b),d.value=e[1],this.debug("Location: "+d.value),c(d))};
AtmosRest.prototype._parseMetadata=function(a){if("undefined"==typeof a||null==a||0==a.length)return null;for(var b={},a=a.split(","),c=0;c<a.length;c++){var d=a[c].split("=",2),e=d[0].trim();b[e]=1==d.length?"":d[1]}return b};
AtmosRest.prototype._handleListObjectsResponse=function(a,b,c){b=this._createResult(a,!0,b);b.token=a.getResponseHeader("x-emc-token");for(var d=[],a=this._getXmlDoc(a).getElementsByTagName("Object"),e=0;e<a.length;e++){var f=null,g=null,h=null,i=a.item(e),k=this._getChildByTagName(i,"ObjectID"),j=this._getChildByTagName(i,"SystemMetadataList"),i=this._getChildByTagName(i,"UserMetadataList");j&&(g={},this._parseResponseMeta(j.childNodes,g,null));i&&(f={},h={},this._parseResponseMeta(i.childNodes,
f,h));f=new ObjectResult(this._getText(k),f,h,g);d.push(f)}b.value=d;c(b)};
AtmosRest.prototype._handleListDirectoryResponse=function(a,b,c,d){c=this._createResult(b,!0,c);c.token=b.getResponseHeader("x-emc-token");for(var e=[],b=this._getXmlDoc(b).getElementsByTagName("DirectoryEntry"),f=0;f<b.length;f++){var g=null,h=null,i=null,k=b.item(f),j=this._getChildByTagName(k,"ObjectID"),m=this._getChildByTagName(k,"Filename"),l=this._getChildByTagName(k,"FileType"),n=this._getChildByTagName(k,"SystemMetadataList"),k=this._getChildByTagName(k,"UserMetadataList");n&&(h={},this._parseResponseMeta(n.childNodes,
h,null));k&&(g={},i={},this._parseResponseMeta(k.childNodes,g,i));g=new DirectoryEntry(a+this._getText(m),this._getText(m),this._getText(l),this._getText(j),g,i,h);e.push(g)}c.value=e;d(c)};
AtmosRest.prototype._handleObjectInfoResponse=function(a,b,c){var b=this._createResult(a,!0,b),a=this._getXmlDoc(a),d=null,e=null,f=[],g=!1,h=null,i=!1,k=null,j=a.getElementsByTagName("objectId");j.length&&(d=this._getText(j.item(0)));j=a.getElementsByTagName("selection");j.length&&(e=this._getText(j.item(0)));j=a.getElementsByTagName("replicas");if(j.length)for(var j=this._getChildrenByTagName(j.item(0),"replica"),m=0;m<j.length;m++){var l=j[m],n=this._getText(this._getChildByTagName(l,"id")),o=
this._getText(this._getChildByTagName(l,"location")),p=this._getText(this._getChildByTagName(l,"type")),q=this._getText(this._getChildByTagName(l,"current")),l=this._getText(this._getChildByTagName(l,"storageType"));f.push(new ObjectReplica(n,o,p,q,l))}j=a.getElementsByTagName("expiration");j.length&&(l=j.item(0),g=this._getText(this._getChildByTagName(l,"enabled")),h=this._getText(this._getChildByTagName(l,"endAt")));j=a.getElementsByTagName("retention");j.length&&(l=j.item(0),i=this._getText(this._getChildByTagName(l,
"enabled")),k=this._getText(this._getChildByTagName(l,"endAt")));b.value=new ObjectInfo(d,e,f,g,h,i,k);c(b)};AtmosRest.prototype._parseObjectVersions=function(a){for(var b=[],a=this._getXmlDoc(a).getElementsByTagName("Ver"),c=0;c<a.length;c++)b.push(this._getText(this._getChildByTagName(a.item(c),"OID")));return b};
AtmosRest.prototype._parseAclEntries=function(a){for(var b=[],a=this._headerValueToArray(a),c=0;c<a.length;c++){var d=a[c].split("=",2),e=d[0],d=d[1],e=e.trim();if("FULL"===d)d=AclEntry.ACL_PERMISSIONS.FULL_CONTROL;b[c]=new AclEntry(e,d)}return b};
AtmosRest.prototype._parseResponseMeta=function(a,b,c){for(var d=0;d<a.length;d++){var e=a.item(d);if(/Metadata/i.test(e.nodeName)){var f=this._getText(this._getChildByTagName(e,"Name")),g=this._getText(this._getChildByTagName(e,"Value"));(e=this._getChildByTagName(e,"Listable"))&&"true"==this._getText(e)?c[f]=g:b[f]=g}}};AtmosRest.prototype._getChildByTagName=function(a,b){var c=this._getChildrenByTagName(a,b);return c.length?c[0]:null};
AtmosRest.prototype._getChildrenByTagName=function(a,b){for(var c=RegExp(b,"i"),d=a.childNodes,e=[],f=0;f<d.length;f++){var g=d.item(f);1==g.nodeType&&c.test(g.nodeName)&&e.push(g)}return e};AtmosRest.prototype._getText=function(a){for(var a=a.childNodes,b="",c=0;c<a.length;c++){var d=a.item(c);3==d.nodeType&&(b+=d.data)}return b};
AtmosRest.prototype._signRequest=function(a,b,c){this.debug(this.atmosConfig.uid);this.debug(this.atmosConfig.secret);var d=b["Content-Type"],e=b.Range,f;f=""==b?new Hash:b;f["x-emc-uid"]=this.atmosConfig.uid;a=this._buildHashString(a,d,e,b.Date,c,f);this.debug("HashString:\n"+a);a=this._doSignature(a,this.atmosConfig.secret);this.debug("Signature: "+a);return f["x-emc-signature"]=a};
AtmosRest.prototype._buildHashString=function(a,b,c,d,e,f){var g={},h="",h=a+"\n",h=b?h+(b+"\n"):h+"\n",h=c?h+(c.toString()+"\n"):h+"\n",h=d?h+(d+"\n"):h+"\n",h=h+(e.toLowerCase().trim()+"\n"),i;for(i in f)f.hasOwnProperty(i)&&(this.debug("headers: prop: "+i+" value: "+f[i]),a=this._normalizeWS(i.toLowerCase().trim()),0!=a.indexOf("x-emc")?this.debug("Skipping "+a):((b=f[i])&&(b=this._normalizeWS(b.trim())),g[a]=b));f=Object.keys(g);this.debug("keys "+f);f.sort().forEach(function(a){h+=a+":"+g[a]+
"\n"});return h.trim()};AtmosRest.prototype._normalizeWS=function(a){if(null==a)return null;a=a.replace(/\n/," ");return a.replace(/\s+/," ")};AtmosRest.prototype._doSignature=function(a,b){this.debug("Secret: "+b);if(isNodejs){var c=new Buffer(b,"base64"),c=crypto.createHmac("sha1",c.toString("binary"));c.update(a);return c.digest("base64")}c=Crypto.HMAC(Crypto.SHA1,a,Crypto.util.base64ToBytes(b),{asBytes:!0});return Crypto.util.bytesToBase64(c)};
AtmosRest.prototype.debug=function(a){"undefined"!==typeof console&&("undefined"!==typeof console.debug?console.debug(a):"undefined"!==typeof console.log&&console.log(a))};AtmosRest.prototype.info=function(a){"undefined"!==typeof console&&"undefined"!==typeof console.info&&console.info(a)};AtmosRest.prototype.warn=function(a){"undefined"!==typeof console&&"undefined"!==typeof console.warn&&console.warn(a)};
AtmosRest.prototype.error=function(a){"undefined"!==typeof console&&"undefined"!==typeof console.error&&console.error(a)};if("undefined"!=typeof exports)exports.AtmosRest=AtmosRest,exports.AtmosRange=AtmosRange,exports.Acl=Acl,exports.AclEntry=AclEntry,exports.AtmosResult=AtmosResult,exports.ListOptions=ListOptions,exports.ObjectResult=ObjectResult,exports.DirectoryEntry=DirectoryEntry,exports.dumpObject=dumpObject;