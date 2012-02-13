(function(e){$.extend(e,jQuery);e.trigger=function(a,b,c){a.trigger?a.trigger(b,c):$.event.trigger(b,c,a,true)};e.$=jQuery;var q=function(a){return function(){var b=this[a]?this:$([this]);b[a].apply(b,arguments);return this}};e.bind=q("bind");e.unbind=q("unbind");e.delegate=q("delegate");e.undelegate=q("undelegate");e.addEvent=function(a,b){$([this]).bind(a,b);return this};e.removeEvent=function(a,b){$([this]).unbind(a,b);return this};$.each(["append","filter","addClass","remove","data"],function(a,
b){e[b]=function(c){return c[b].apply(c,e.makeArray(arguments).slice(1))}});var t={undHash:/_|-/,colons:/::/,words:/([A-Z]+)([A-Z][a-z])/g,lowUp:/([a-z\d])([A-Z])/g,dash:/([a-z\d])([A-Z])/g,replacer:/\{([^\}]+)\}/g,dot:/\./},W=function(a,b,c){return a[b]!==undefined?a[b]:c&&(a[b]={})},J=function(a){var b=typeof a;return a&&(b=="function"||b=="object")},X;e.String=e.extend(e.String||{},{getObject:X=function(a,b,c){a=a?a.split(t.dot):[];var d=a.length,f,g,h,i=0;b=e.isArray(b)?b:[b||window];if(d==0)return b[0];
for(;f=b[i++];){for(h=0;h<d-1&&J(f);h++)f=W(f,a[h],c);if(J(f)){g=W(f,a[h],c);if(g!==undefined){c===false&&delete f[a[h]];return g}}}},capitalize:function(a){return a.charAt(0).toUpperCase()+a.substr(1)},underscore:function(a){return a.replace(t.colons,"/").replace(t.words,"$1_$2").replace(t.lowUp,"$1_$2").replace(t.dash,"_").toLowerCase()},sub:function(a,b,c){var d=[];c=typeof c=="boolean"?!c:c;d.push(a.replace(t.replacer,function(f,g){f=X(g,b,c);if(J(f)){d.push(f);return""}else return""+f}));return d.length<=
1?d[0]:d},_regs:t});var K=false;e.Construct=function(){if(arguments.length)return e.Construct.extend.apply(e.Construct,arguments)};e.extend(e.Construct,{newInstance:function(){var a=this.instance(),b;if(a.setup)b=a.setup.apply(a,arguments);if(a.init)a.init.apply(a,e.isArray(b)?b:arguments);return a},_inherit:function(a,b,c){e.extend(c||a,a||{})},setup:function(a){this.defaults=e.extend(true,{},a.defaults,this.defaults);return arguments},instance:function(){K=true;var a=new this;K=false;return a},
extend:function(a,b,c){function d(){if(!K)return this.constructor!==d&&arguments.length?arguments.callee.extend.apply(arguments.callee,arguments):this.constructor.newInstance.apply(this.constructor,arguments)}if(typeof a!="string"){c=b;b=a;a=null}if(!c){c=b;b=null}c=c||{};var f=this,g=this.prototype,h,i,j,k;k=this.instance();this._inherit(c,g,k);for(h in this)if(this.hasOwnProperty(h))d[h]=this[h];this._inherit(b,this,d);if(a){j=a.split(/\./);i=j.pop();j=g=e.String.getObject(j.join("."),window,true);
var m=e.String.underscore(a.replace(/\./g,"_")),l=e.String.underscore(i);g[i]=d}e.extend(d,{prototype:k,namespace:j,shortName:i,_shortName:l,_fullName:m,constructor:d,fullName:a});d.prototype.constructor=d;i=d.setup.apply(d,[f].concat(e.makeArray(arguments)));if(d.init)d.init.apply(d,i||[f].concat(e.makeArray(arguments)));return d}});var r=function(a){return typeof a==="object"&&a!==null&&a&&!(a instanceof Date)},M=function(a,b,c){if(a instanceof w)L([a],c._namespace);else a=e.isArray(a)?new w.List(a):
new w(a);a.bind("change"+c._namespace,function(d){var f=e.makeArray(arguments);d=f.shift();f[0]=b==="*"?c.indexOf(a)+"."+f[0]:b+"."+f[0];e.trigger(c,d,f)});return a},L=function(a,b){return e.each(a,function(c,d){d&&d.unbind&&d.unbind("change"+b)})},Y=0,u=null,Z=function(){if(!u){u=[];return true}},p=function(a,b,c){if(!a._init)if(u)u.push([a,{type:b,batchNum:aa},c]);else return e.trigger(a,b,c)},aa=1,ba=function(){var a=u.length,b=u.slice(0);u=null;aa++;for(var c=0;c<a;c++)e.trigger.apply(e,b[c])},
E=function(a,b,c){a.each(function(d,f){c[d]=r(f)&&typeof f[b]=="function"?f[b]():f});return c};q=function(a){return function(){return e[a].apply(this,arguments)}};var F=q("addEvent");q=q("removeEvent");var N=function(a){return e.isArray(a)?a:(""+a).split(".")},w=e.Construct("Can.Observe",{setup:function(){e.Construct.setup.apply(this,arguments)},bind:F,unbind:q},{setup:function(a){this._data={};this._namespace=".observe"+ ++Y;this._init=1;this.attr(a);delete this._init},attr:function(a,b){var c=typeof a;
if(c!="string"&&c!="number")return this._attrs(a,b);else if(b===undefined){w.__reading&&w.__reading(this,a);return this._get(a)}else{this._set(a,b);return this}},each:function(){return e.each.apply(null,[this.__get()].concat(e.makeArray(arguments)))},removeAttr:function(a){a=N(a);var b=a.shift(),c=this._data[b];if(a.length)return c.removeAttr(a);else{delete this._data[b];b in this.constructor.prototype||delete this[b];p(this,"change",[b,"remove",undefined,c]);return c}},_get:function(a){a=N(a);var b=
this.__get(a.shift());return a.length?b?b._get(a):undefined:b},__get:function(a){return a?this._data[a]:this._data},_set:function(a,b){a=N(a);var c=a.shift(),d=this.__get(c);if(r(d)&&a.length)d._set(a,b);else if(a.length)throw"Can.Observe: set a property on an object that does not exist";else this.__set(c,b,d)},__set:function(a,b,c){if(b!==c){var d=this.__get().hasOwnProperty(a)?"set":"add";this.___set(a,r(b)?M(b,a,this):b);p(this,"change",[a,d,b,c]);p(this,a,b,c);c&&L([c],this._namespace)}},___set:function(a,
b){this._data[a]=b;a in this.constructor.prototype||(this[a]=b)},bind:F,unbind:q,serialize:function(){return E(this,"serialize",{})},_attrs:function(a,b){if(a===undefined)return E(this,"attr",{});a=e.extend(true,{},a);var c,d=Z(),f=this;this.each(function(g,h){var i=a[g];if(i===undefined)b&&f.removeAttr(g);else{if(r(h)&&r(i))h.attr(i,b);else h!=i&&f._set(g,i);delete a[g]}});for(c in a){newVal=a[c];this._set(c,newVal)}d&&ba();return this}}),wa=[].splice,O=w("Can.Observe.List",{setup:function(a,b){this.length=
0;this._namespace=".list"+ ++Y;this._init=1;this.bind("change",e.proxy(this._changes,this));this.push.apply(this,e.makeArray(a||[]));e.extend(this,b);delete this._init},_changes:function(a,b,c,d,f){if(b.indexOf(".")===-1)if(c==="add"){p(this,c,[d,+b]);p(this,"length",[this.length])}else if(c==="remove"){p(this,c,[f,+b]);p(this,"length",[this.length])}},__get:function(a){return a?this[a]:this},___set:function(a,b){this[a]=b},serialize:function(){return E(this,"serialize",[])},splice:function(a,b){var c=
e.makeArray(arguments),d;for(d=2;d<c.length;d++){var f=c[d];if(r(f))c[d]=M(f,"*",this)}if(b===undefined)b=c[1]=this.length-a;d=wa.apply(this,c);if(b>0){p(this,"change",[""+a,"remove",undefined,d]);L(d,this._namespace)}c.length>2&&p(this,"change",[""+a,"add",c.slice(2),d]);return d},_attrs:function(a,b){if(a===undefined)return E(this,"attr",[]);a=a.slice(0);for(var c=Math.min(a.length,this.length),d=Z(),f=0;f<c;f++){var g=this[f],h=a[f];if(r(g)&&r(h))g.attr(h,b);else g!=h&&this._set(f,h)}if(a.length>
this.length)this.push(a.slice(this.length));else a.length<this.length&&b&&this.splice(a.length);d&&ba()}}),ca=function(a){return a[0]&&e.isArray(a[0])?a[0]:e.makeArray(a)};e.each({push:"length",unshift:0},function(a,b){O.prototype[a]=function(){for(var c=ca(arguments),d=b?this.length:0,f=0;f<c.length;f++){var g=c[f];if(r(g))c[f]=M(g,"*",this)}if(c.length==1&&this.comparator){this.splice(this.sortedIndex(c[0]),0,c[0]);return this.length}f=[][a].apply(this,c);if(this.comparator&&c.length>1){this.sort(null,
true);p(this,"reset",[c])}else p(this,"change",[""+d,"add",c,undefined]);return f}});e.each({pop:"length",shift:0},function(a,b){O.prototype[a]=function(){var c=ca(arguments),d=b&&this.length?this.length-1:0;c=[][a].apply(this,c);p(this,"change",[""+d,"remove",undefined,[c]]);c&&c.unbind&&c.unbind("change"+this._namespace);return c}});O.prototype.indexOf=[].indexOf||function(a){return e.inArray(a,this)};var xa=/^\d+$/,ya=/([^\[\]]+)|(\[\])/g,da=/\+/g,za=/([^?#]*)(#.*)?$/;e.String=$.extend(e.String||
{},{deparam:function(a){if(!a||!za.test(a))return{};var b={};a=a.split("&");for(var c,d=0;d<a.length;d++){c=b;var f=a[d].split("=");if(f.length!=2)f=[f[0],f.slice(1).join("=")];var g=decodeURIComponent(f[0].replace(da," "));f=decodeURIComponent(f[1].replace(da," "));g=g.match(ya);for(var h=0;h<g.length-1;h++){var i=g[h];c[i]||(c[i]=xa.test(g[h+1])||g[h+1]=="[]"?[]:{});c=c[i]}lastPart=g[g.length-1];if(lastPart=="[]")c.push(f);else c[lastPart]=f}return b}});var Aa=$.cleanData;$.cleanData=function(a){for(var b=
0,c;(c=a[b])!==undefined;b++)$(c).triggerHandler("destroyed");Aa(a)};var ea=/\:([\w\.]+)/g,fa=/^(?:&[^=]+=[^&]*)+/,Ba=function(a){var b=[];s(a,function(c,d){if(c==="className")c="class";d&&b.push(G(c),'="',G(d),'" ')});return b.join("")},G=function(a){return a.replace(/"/g,"&#34;").replace(/'/g,"&#39;")},Ca=function(a,b){for(var c=0,d=0;d<a.names.length;d++){if(!b.hasOwnProperty(a.names[d]))return-1;c++}return c},ga=true,y=window.location,Da=encodeURIComponent,Ea=decodeURIComponent,s=e.each,n=e.extend;
e.route=function(a,b){var c=[],d=a.replace(ea,function(f,g){c.push(g);return"([^\\/\\&]*)"});e.route.routes[a]={test:new RegExp("^"+d+"($|&)"),route:a,names:c,defaults:b||{},length:a.split("/").length};return e.route};n(e.route,{param:function(a){delete a.route;var b,c=0,d,f=a.route;delete a.route;f&&(b=e.route.routes[f])||s(e.route.routes,function(i,j){d=Ca(j,a);if(d>c){b=j;c=d}});if(b){var g=n({},a);f=b.route.replace(ea,function(i,j){delete g[j];return a[j]===b.defaults[j]?"":Da(a[j])});var h;s(b.defaults,
function(i,j){g[i]===j&&delete g[i]});h=e.param(g);return f+(h?"&"+h:"")}return e.isEmptyObject(a)?"":"&"+e.param(a)},deparam:function(a){var b={length:-1};s(e.route.routes,function(g,h){if(h.test.test(a)&&h.length>b.length)b=h});if(b.length>-1){var c=a.match(b.test),d=c.shift(),f=(d=a.substr(d.length-(c[c.length-1]==="&"?1:0)))&&fa.test(d)?e.String.deparam(d.slice(1)):{};f=n(true,{},b.defaults,f);s(c,function(g,h){if(h&&h!=="&")f[b.names[g]]=Ea(h)});f.route=b.route;return f}if(a.charAt(0)!=="&")a=
"&"+a;return fa.test(a)?e.String.deparam(a.slice(1)):{}},data:new e.Observe({}),routes:{},ready:function(a){if(a===false)ga=false;if(a===true||ga===true)ha();return e.route},url:function(a,b){return b?"#!"+e.route.param(n({},P,a)):"#!"+e.route.param(a)},link:function(a,b,c,d){return"<a "+Ba(n({href:e.route.url(b,d)},c))+">"+a+"</a>"},current:function(a){return y.hash=="#!"+e.route.param(a)}});s(["bind","unbind","delegate","undelegate","attr","serialize","removeAttr"],function(a,b){e.route[b]=function(){return e.route.data[b].apply(e.route.data,
arguments)}});var P,ha=function(){var a=y.hash.substr(1,1)==="!"?y.hash.slice(2):y.hash.slice(1);P=e.route.deparam(a);e.route.attr(P,true)};e.bind.call(window,"hashchange",ha);e.route.bind("change",function(a){var b;return function(){var c=arguments,d=this;clearTimeout(b);b=setTimeout(function(){a.apply(d,c)},1)}}(function(){y.hash="#!"+e.route.param(e.route.serialize())}));$(function(){e.route.ready()});F=function(a,b,c){e.bind.call(a,b,c);return function(){e.unbind.call(a,b,c)}};var Fa=e.isFunction;
n=e.extend;s=e.each;var Ga=[].slice,Ha=$.event&&$.event.special||{},Ia=function(a,b,c,d){e.delegate.call(a,b,c,d);return function(){e.undelegate.call(a,b,c,d)}},ia=function(a,b,c,d){return d?Ia(a,e.trim(d),b,c):F(a,b,c)},Q=function(a,b){var c=typeof b=="string"?a[b]:b;return function(){a.called=b;return c.apply(a,[this.nodeName?e.$(this):this].concat(Ga.call(arguments,0)))}},Ja=/[^\w]/,ja=/\{([^\}]+)\}/g,Ka=/^(?:(.*?)\s)?([\w\.\:>]+)$/,R;e.Construct("Can.Control",{setup:function(){e.Construct.setup.apply(this,
arguments);if(this!==e.Control){var a=this.pluginName||this._fullName,b;a!=="j_query_control"&&this.plugin(a);this.actions={};for(b in this.prototype)if(!(b=="constructor"||!Fa(this.prototype[b])))if(this._isAction(b))this.actions[b]=this._action(b)}},_isAction:function(a){return Ja.test(a)?true:e.inArray(a,this.listensTo)>-1||Ha[a]||S[a]},plugin:function(){},_action:function(a,b){ja.lastIndex=0;if(!b&&ja.test(a))return null;a=b?e.String.sub(a,[b,window]):a;b=e.isArray(a);var c=(b?a[1]:a).match(Ka);
return{processor:S[c[2]]||R,parts:c,delegate:b?a[0]:undefined}},processors:{},listensTo:[],defaults:{}},{setup:function(a,b){var c=this.constructor;a=(typeof a=="string"?e.$(a):a.jquery?a:[a])[0];var d=c.pluginName||c._fullName;this.element=e.$(a);d&&d!=="can_control"&&this.element.addClass(d);(a=e.data(this.element,"controls"))||e.data(this.element,"controls",a=[]);a.push(this);this.options=n(n({},c.defaults),b);this.bind();return[this.element,this.options]},bind:function(a,b,c){if(a===undefined){this._bindings=
[];a=this.constructor;b=this._bindings;c=a.actions;var d=this.element;for(funcName in c)if(c.hasOwnProperty(funcName)){ready=c[funcName]||a._action(funcName,this.options);b.push(ready.processor(ready.delegate||d,ready.parts[2],ready.parts[1],funcName,this))}var f=Q(this,"destroy");e.bind.call(d,"destroyed",f);b.push(function(g){e.unbind.call(g,"destroyed",f)});return b.length}if(typeof a=="string"){c=b;b=a;a=this.element}return this._binder(a,b,c)},_binder:function(a,b,c,d){if(typeof c=="string")c=
Q(this,c);this._bindings.push(ia(a,b,c,d));return this._bindings.length},_unbind:function(){var a=this.element[0];s(this._bindings,function(b,c){c(a)});this._bindings=[]},delegate:function(a,b,c,d){if(typeof a=="string"){d=c;c=b;b=a;a=this.element}return this._binder(a,c,d,b)},update:function(a){n(this.options,a);this._unbind();this.bind()},destroy:function(){var a=this.constructor;a=a.pluginName||a._fullName;this._unbind();a&&a!=="can_control"&&this.element.removeClass(a);a=e.data(this.element,"controls");
a.splice(e.inArray(this,a),1);e.trigger(this,"destroyed");this.element=null}});var S=e.Control.processors;R=function(a,b,c,d,f){return ia(a,b,Q(f,d),c)};s("change click contextmenu dblclick keydown keyup keypress mousedown mousemove mouseout mouseover mouseup reset resize scroll select submit focusin focusout mouseenter mouseleave".split(" "),function(a,b){S[b]=R});var La=function(a){return a.replace(/^\/\//,"").replace(/[\/\.]/g,"_")},Ma=e.makeArray,Na=1;e.view=function(a,b,c,d){a=e.View(a,b,c,d);
if(z(a))return a.pipe(function(f){return e.view.frag(f)});return e.view.frag(a)};e.view.frag=function(a){a=e.buildFragment([a],[document.body]).fragment;a.childNodes.length||a.appendChild(document.createTextNode(""));return ka(a,o.hookups)};e.view.hookup=function(a){return ka(a,o.hookups)};var o=e.View=function(a,b,c,d){if(typeof c==="function"){d=c;c=undefined}var f=Oa(b);if(f.length){var g=e.Deferred();f.push(la(a,true));e.when.apply(e,f).then(function(i){var j=Ma(arguments),k=j.pop();if(z(b))b=
ma(i);else for(var m in b)if(z(b[m]))b[m]=ma(j.shift());j=k(b,c);g.resolve(j);d&&d(j)});return g}else{var h;f=typeof d==="function";g=la(a,f);if(f){h=g;g.done(function(i){d(i(b,c))})}else g.done(function(i){h=i(b,c)});return h}},na=function(a,b){if(!a.match(/[^\s]/))throw"Can.View ERROR: There is no template or an empty template at "+b;},la=function(a,b){var c=a.match(/\.[\w\d]+$/),d,f,g,h=function(k){k=d.renderer(g,k);k=e.Deferred().resolve(k);if(o.cache)o.cached[g]=k;return k};if(f=document.getElementById(a))c=
"."+f.type.match(/\/(x\-)?(.+)/)[2];if(!c){c=o.ext;a+=o.ext}if(e.isArray(c))c=c[0];g=La(a);if(a.match(/^\/\//)){var i=a.substr(2);a=typeof steal==="undefined"?(a="/"+i):steal.root.mapJoin(i)}d=o.types[c];if(o.cached[g])return o.cached[g];else if(f)return h(f.innerHTML);else{var j=e.Deferred();e.ajax({async:b,url:a,dataType:"text",error:function(k){na("",a);j.reject(k)},success:function(k){na(k,a);j.resolve(d.renderer(g,k));if(o.cache)o.cached[g]=j}});return j}},z=function(a){return a&&e.isFunction(a.always)},
Oa=function(a){var b=[];if(z(a))return[a];else for(var c in a)z(a[c])&&b.push(a[c]);return b},ma=function(a){return e.isArray(a)&&a.length===3&&a[1]==="success"?a[0]:a};e.extend(o,{hookups:{},hookup:function(a){var b=++Na;o.hookups[b]=a;return b},cached:{},cache:true,register:function(a){this.types["."+a.suffix]=a},types:{},ext:".ejs",registerScript:function(){},preload:function(){}});var ka=function(a,b){var c,d,f=0,g,h,i=[];e.each(a.childNodes?e.makeArray(a.childNodes):a,function(j,k){if(k.nodeType!=
3){i.push(k);i.push.apply(i,e.makeArray(k.getElementsByTagName("*")))}});c=e.filter(e.$(i),"[data-view-id]");for(d=c.length;f<d;f++)if(c[f].getAttribute&&(g=c[f].getAttribute("data-view-id"))&&(h=b[g])){h(c[f],g);delete b[g];c[f]&&c[f].nodeType!==11&&c[f].removeAttribute("data-view-id")}return a};e.String.rsplit=function(a,b){for(var c=b.exec(a),d=[],f;c!==null;){f=c.index;if(f!==0){d.push(a.substring(0,f));a=a.slice(f)}d.push(c[0]);a=a.slice(c[0].length);c=b.exec(a)}a!==""&&d.push(a);return d};var oa=
function(a,b,c){var d=new e.Deferred;a.then(function(){arguments[0]=b[c](arguments[0]);d.resolve.apply(d,arguments)},function(){d.resolveWith.apply(this,arguments)});return d},A=function(a){return a[a.constructor.id]},T=e.trigger,B=function(a,b,c,d,f,g){if(typeof a=="string"){a=a.split(" ");a={url:a.pop(),type:a.pop()}}a.data=typeof b=="object"&&!e.isArray(b)?e.extend(a.data||{},b):b;a.url=e.String.sub(a.url,a.data,true);return e.ajax(e.extend({type:c||"post",dataType:d||"json",success:f,error:g},
a))},pa=function(a,b,c,d,f){var g;g=[a.serialize()];var h=a.constructor,i;b=="destroy"&&g.shift();b!=="create"&&g.unshift(A(a));i=h[b].apply(h,g);g=i.pipe(function(j){a[f||b+"d"](j,i);return a});if(i.abort)g.abort=function(){i.abort()};g.then(c,d);return g};ajaxMethods={create:function(a){return function(b){return B(a||this._shortName,b)}},update:function(a){return function(b,c){c=c||{};var d=this.id;if(c[d]&&c[d]!==b){c["new"+e.String.capitalize(b)]=c[d];delete c[d]}c[d]=b;return B(a||this._url,
c,"put")}},destroy:function(a){return function(b){var c={};c[this.id]=b;return B(a||this._url,c,"delete")}},findAll:function(a){return function(b,c,d){return oa(B(a||this._shortName,b,"get","json"),this,"models").then(c,d)}},findOne:function(a){return function(b,c,d){return oa(B(a||this._url,b,"get","json"),this,"model").then(c,d)}}};var Pa=0;e.Observe("Can.Model",{setup:function(){e.Observe.apply(this,arguments);if(this!==e.Model){var a=this;e.each(ajaxMethods,function(d,f){var g=a[d];if(typeof g!==
"function")a[d]=f(g)});if(a.fullName=="Can.Model")a.fullName="Model"+ ++Pa;if(window.jQuery){var b={},c="* "+a.fullName+".model";b[c+"s"]=e.proxy(a.models,a);b[c]=e.proxy(a.model,a);$.ajaxSetup({converters:b})}this.store={};this._url=this._shortName+"/{"+this.id+"}"}},id:"id",models:function(a){if(!a)return null;var b=new (this.List||qa),c=e.isArray(a),d=a instanceof qa;d=c?a:d?a.serialize():a.data;for(var f=d.length,g=0;g<f;g++)b.push(this.model(d[g]));c||e.each(a,function(h,i){if(h!=="data")b[h]=
i});return b},model:function(a){if(!a)return null;if(a instanceof this)a=a.serialize();return this.store[a.id]||new this(a)}},{isNew:function(){var a=A(this);return a===undefined||a===null||a===""},save:function(a,b){return pa(this,this.isNew()?"create":"update",a,b)},destroy:function(a,b){return pa(this,"destroy",a,b,"destroyed")},bind:function(){if(!this._bindings){this.constructor.store[A(this)]=this;this._bindings=0}this._bindings++;return e.Observe.prototype.bind.apply(this,arguments)},unbind:function(){this._bindings--;
this._bindings||delete this.constructor.store[A(this)];return e.Observe.prototype.unbind.apply(this,arguments)},___set:function(a,b){e.Observe.prototype.___set.call(this,a,b);if(a===this.constructor.id&&this._bindings)this.constructor.store[A(this)]=this}});e.each(["created","updated","destroyed"],function(a,b){e.Model.prototype[b]=function(c){var d=this.constructor;c&&typeof c=="object"&&this.attr(c.attr?c.attr():c);T(this,b);T(this,"change",b);T(d,b,this)}});var qa=e.Observe.List("Can.Model.List",
{setup:function(){e.Observe.List.prototype.setup.apply(this,arguments);this.bind("change",e.proxy(this._sendDestroy,this))},_sendDestroy:function(a,b){/\w+\.destroyed/.test(b)&&this.splice(this.indexOf(a.target),1)}});e.Control.processors.route=function(a,b,c,d,f){e.route(c||"");var g,h=function(i){if(e.route.attr("route")===(c||"")&&(i.batchNum===undefined||i.batchNum!==g)){g=i.batchNum;i=e.route.attr();delete i.route;f[d](i)}};e.route.bind("change",h);return function(){e.route.unbind("change",h)}};
var Qa=function(a){eval(a)};n=e.extend;var Ra=/\r\n/g,Sa=/\r/g,Ta=/\n/g,Ua=/\\/g,ra=/"/g,Va=/'/g,Wa=/\t/g,Xa=/\{/g,Ya=/\}/g,sa=/\s*\(([\$\w]+)\)\s*->([^\n]*)/,H={"":"span",table:"tr",tr:"td",ol:"li",ul:"li",tbody:"tr",thead:"tr",tfoot:"tr"},ta=function(a){return a.replace(Ua,"\\\\").replace(Ta,"\\n").replace(ra,'\\"').replace(Wa,"\\t")};G=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(ra,"&#34;").replace(Va,"&#39;")};var C=e.View,ua=function(a){var b=
a.match(Xa);a=a.match(Ya);return(b?b.length:0)-(a?a.length:0)};liveBind=function(a,b,c){e.each(a,function(d,f){f.cb=function(){c()};f.obj.bind(f.attr,f.cb)});e.bind.call(b,"destroyed",function(){e.each(a,function(d,f){f.obj.unbind(f.attr,f.cb)})})};observes=function(a,b){var c=[];if(e.Observe)e.Observe.__reading=function(d,f){c.push({obj:d,attr:f})};a=b.call(a);e.Observe&&delete e.Observe.__reading;return{observes:c,val:a}};EJS=function(a){if(this.constructor!=EJS){var b=new EJS(a);return function(c,
d){return b.render(c,d)}}if(typeof a=="function")this.template={fn:a};else{n(this,EJS.options,a);this.template=Za(this.text,this.name)}};e.EJS=EJS;EJS.prototype.render=function(a,b){a=a||{};this._extra_helpers=b;b=new EJS.Helpers(a,b||{});return this.template.fn.call(a,a,b)};n(EJS,{txt:function(a,b,c,d){if(b!==0)return EJS.esc(a,b,c,d);b=observes(c,d);var f=b.observes,g=b.val;if(!b.observes.length)return EJS.text(b.val);return"<"+(H[a]||"span")+" data-view-id='"+C.hookup(function(h){var i=function(k,
m){k=e.view.frag(k);var l=e.$(e.map(k.childNodes,function(U){return U})),x=m[m.length-1];x.nextSibling?x.parentNode.insertBefore(k,x.nextSibling):x.parentNode.appendChild(k);e.remove(e.$(m));return l},j=i(g,[h]);liveBind(f,h.parentNode,function(){j=i(d.call(c),j)})})+"'></"+(H[a]||"span")+">"},esc:function(a,b,c,d){var f=observes(c,d),g=f.observes,h=f.val;if(!g.length)return EJS.clean(h);if(b===0)return"<"+(H[a]||"span")+" data-view-id='"+C.hookup(function(i){var j=i.parentNode,k=document.createTextNode(h);
j.insertBefore(k,i);j.removeChild(i);liveBind(g,j,function(){k.nodeValue=d.call(c)})})+"'></"+(H[a]||"span")+">";else if(b===1)return h;else{I.push(function(i){var j=e.$(i),k;(k=e.data(j,"hooks"))||e.data(j,"hooks",k={});var m=i.getAttribute(b);j=m.split("__!@#$%__");if(k[b])k[b].funcs.push(d);else k[b]={render:function(){for(var l=0;l<k[b].funcs.length;l++)m=m.replace(/__!@#\$%__/,function(){return k[b].funcs[l].call(c)});return m},funcs:[d]};j.splice(1,0,h);i.setAttribute(b,j.join(""));liveBind(g,
i,function(){i.setAttribute(b,k[b].render())})});return"__!@#$%__"}},text:function(a){if(typeof a=="string")return a;if(a===null||a===undefined)return"";var b=a.hookup&&function(c,d){a.hookup.call(a,c,d)}||typeof a=="function"&&a;if(b)return"data-view-id='"+C.hookup(b)+"'";return a.toString?a.toString():""},pending:function(){if(I.length){var a=I.slice(0);I=[];return" data-view-id='"+C.hookup(function(b){e.each(a,function(c,d){d(b)})})+"'"}else return""},clean:function(a){return typeof a=="string"?
G(a):typeof a=="number"?a:EJS.text(a)}});var $a=/(<%%|%%>|<%==|<%=|<%#|<%|%>|<|>|"|')/,D=null,v=null,V=null,va=function(){return v?"'"+V.match(/([^\s]+)=$/)[1]+"'":D?1:0},I=[],Za=function(a,b){a=a.replace(Ra,"\n").replace(Sa,"\n").split($a);var c="",d=["var ___v1ew = [];"],f=function(x,U){d.push("___v1ew.push(",'"',ta(x),'"'+(U||"")+");")},g=[],h,i=null,j=false,k="";D=v=V=null;for(var m=0,l;(l=a[m++])!==undefined;){if(i===null)switch(l){case "<%":case "<%=":case "<%==":j=true;case "<%#":i=l;c.length>
0&&f(c);c="";break;case "<%%":c+="<%";break;case "<":D="<";c+=l;j=false;break;case ">":D=null;if(j){f(c,',Can.EJS.pending(),">"');c=""}else c+=l;break;case "'":case '"':if(D)if(v&&v===l)v=null;else if(v===null){v=l;V=h}default:if(h==="<")k=l.split(" ")[0];c+=l;break}else switch(l){case "%>":switch(i){case "<%":bracketCount=ua(c);if(bracketCount==1){d.push("___v1ew.push(","Can.EJS.txt('"+k+"',"+va()+",this,function(){","var ___v1ew = [];",c);g.push({before:"",after:"return ___v1ew.join('')}));/*ft*/"})}else{h=
g.length&&bracketCount==-1?g.pop():{after:";"};h.before&&d.push(h.before);d.push(c,";",h.after)}break;case "<%=":case "<%==":(bracketCount=ua(c))&&g.push({before:"return ___v1ew.join('')",after:"}));"});if(sa.test(c)){c=c.match(sa);c="function(__){var "+c[1]+"=Can.$(__);"+c[2]+"}"}d.push("___v1ew.push(","Can.EJS."+(i==="<%="?"esc":"txt")+"('"+k+"',"+va()+",this,function(){ return ",c,bracketCount?"var ___v1ew = [];":"}));");break}i=null;c="";break;case "<%%":c+=scanner.right;break;default:c+=l;break}h=
l}c.length>0&&d.push("___v1ew.push(",'"',ta(c)+'")');d.push(";");a={out:"try { with(_VIEW) { with (_CONTEXT) {"+d.join("")+" return ___v1ew.join('')}}}catch(e){e.lineNumber=null;throw e;}"};Qa.call(a,"this.fn = (function(_CONTEXT,_VIEW){"+a.out+"});\r\n//@ sourceURL="+b+".js");return a};EJS.Helpers=function(a,b){this._data=a;this._extras=b;n(this,b)};EJS.Helpers.prototype={view:function(a,b,c){c=c||this._extras;b=b||this._data;return C(a,b,c)},list:function(a,b){a.attr("length");for(var c=0,d=a.length;c<
d;c++)b(a[c],c,a)}};e.View.register({suffix:"ejs",script:function(a,b){return"Can.EJS(function(_CONTEXT,_VIEW) { "+(new EJS({text:b,name:a})).template.out+" })"},renderer:function(a,b){return EJS({text:b,name:a})}})})(Can={});