/*! 2019-12-28 */
KISSY.add("UFO/EventSupport",function(a){function b(a){this.listeners=this.listeners||{},this.oneTimeListeners=this.oneTimeListeners||{}}var c=function(a,b){for(var c=0,d=b.length,e=null;c<d;c++){e=b[c];for(var f=0,g=0;f<a.length;f++)a[f]!=e&&(a[g++]=a[f]);a.length=g}return a};return UFO.augment(b,{on:function(b,c){var d=this.listeners[b]||[];return a.isArray(d)||(d=[d]),d.push(c),this.listeners[b]=d,this},off:function(a,b){return this.listeners[a]&&c(this.listeners[a],b),this.oneTimeListeners[a]&&c(this.oneTimeListeners[a],b),this},one:function(a,b){return this.oneTimeListeners[a]=this.oneTimeListeners[a]||[],this.oneTimeListeners[a].push(b),this},fire:function(){var b=[],c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=this.listeners[c],f=this.oneTimeListeners[c];if(e){a.isArray(e)||(e=[e]);for(var g=0,h=e.length;g<h;g++)b.push(e[g].apply(this,d))}if(f){a.isArray(f)||(f=[f]);for(var g=0,h=f.length;g<h;g++)b.push(f[g].apply(this,d))}return f=[],1==b.length?b[0]:b},fireEvent:function(){return this.fire.apply(this,arguments)},hasListener:function(a){return this.listeners[a]},relayEvents:function(a,b,c){for(var d,e,f=this,g=b.length,h=0;h<g;h++)d=b[h],e=c?c+d:d,a.on(d,f.createRelayer(e))},createRelayer:function(a,b){var c=this;return function(){return c.fireEvent.apply(c,[a].concat(Array.prototype.slice.apply(arguments,b||[0])))}}}),b}),KISSY.add("UFO/ComponentQuery",function(a){var b=this,c=function(a,b){return b.method.apply(this,[a].concat(b.args))},d=function(a,b){for(var c,d=[],e=0,f=a.length,g=">"!==b;e<f;e++)c=a[e],c.getRefItems&&(d=d.concat(c.getRefItems(g)));return d},e=function(a){for(var b,c=[],d=0,e=a.length;d<e;d++)for(b=a[d];b=b.ownerCt||b.floatParent;)c.push(b);return c},f=function(a,b,c){if("*"===b)return a.slice();for(var d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d&&d.isType&&d.isType(b,c)&&e.push(d);return e},g=function(a,b){for(var c,d=[],e=0,f=a.length;e<f;e++)c=a[e],c.hasCls(b)&&d.push(c);return d},h=function(a,b,c,d){for(var e,f=[],g=0,h=a.length;g<h;g++)e=a[g],(d?String(e[b])!==d:!e[b])||f.push(e);return f},i=function(a,b){for(var c,d=[],e=0,f=a.length;e<f;e++)c=a[e],c.getId()===b&&d.push(c);return d},j=function(a,c,d){return b.pseudos[c](a,d)},k=/^(\s?([>\^])\s?|\s|$)/,l=/^(#)?([\w\-]+|\*)(?:\((true|false)\))?/,m=[{re:/^\.([\w\-]+)(?:\((true|false)\))?/,method:f},{re:/^(?:[\[](?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]])/,method:h},{re:/^#([\w\-]+)/,method:i},{re:/^\:([\w\-]+)(?:\(((?:\{[^\}]+\})|(?:(?!\{)[^\s>\/]*?(?!\})))\))?/,method:j}];b.Query=function(a){a=a||{},UFO.apply(this,a)},UFO.augment(b.Query,{execute:function(b){var f,g,h=this.operations,i=0,j=h.length;for(a.isArray(b)&&(g=b);i<j;i++)if(f=h[i],g="^"===f.mode?e(g||[b]):f.mode?d(g||[b],f.mode):c(g||d([b]),f),i===j-1)return g;return[]},is:function(b){var d,e,f=this.operations,g=a.isArray(b)?b:[b],h=g.length,i=f[f.length-1];if(g=c(g,i),g.length===h){if(f.length>1)for(e=0,d=g.length;e<d;e++)if(a.indexOf(this.execute(),g[e])===-1)return!1;return!0}return!1}});var n={cache:{},pseudos:{not:function(a,b){for(var c,d=n,e=0,f=a.length,g=[],h=-1;e<f;++e)c=a[e],d.is(c,b)||(g[++h]=c);return g},first:function(a){var b=[];return a.length>0&&b.push(a[0]),b},last:function(a){var b=a.length,c=[];return b>0&&c.push(a[b-1]),c}},query:function(b,c){for(var d,e,f,g=b.split(","),h=g.length,i=0,j=[],k=[],l={};i<h;i++)b=a.trim(g[i]),d=this.cache[b]||(this.cache[b]=this.parse(b)),j=j.concat(d.execute(c));if(e=j.length,e>1){for(i=0;i<e;i++)f=j[i],console.log("cmp.id",f.id),l[f.id]||(k.push(f),l[f.id]=!0);j=k}return j},is:function(b,c){if(!c)return!0;for(var d,e=c.split(","),f=e.length,g=0;g<f;g++)if(c=a.trim(e[g]),d=this.cache[c]||(this.cache[c]=this.parse(c)),d.is(b))return!0;return!1},parse:function(c){for(var d,e,h,j,n,o,p,q,r=[],s=m.length;c&&d!==c;){for(d=c,e=c.match(l),e&&(h=e[1],"#"===h?r.push({method:i,args:[a.trim(e[2])]}):"."===h?r.push({method:g,args:[a.trim(e[2])]}):r.push({method:f,args:[a.trim(e[2]),Boolean(e[3])]}),c=c.replace(e[0],""));!(j=c.match(k));)for(o=0;c&&o<s;o++){if(p=m[o],n=c.match(p.re),q=p.method,n){r.push({method:p.method,args:n.slice(1)}),c=c.replace(n[0],"");break}o===s-1&&console.error('Invalid ComponentQuery selector: "'+arguments[0]+'"')}j[1]&&(r.push({mode:j[2]||j[1]}),c=c.replace(j[0],""))}return new b.Query({operations:r})}};return n}),KISSY.add("UFO/Component",function(a,b,c,d){function e(b){this.config=b||{},a.mix(this,b,!0,void 0,!0),this.id=a.guid(),this.tplId&&(f=this.tpl=a.one("#"+this.tplId).html()),e.superclass.constructor.call(this,b),this.initComponent()}var f="<div></div>";return a.extend(e,c),UFO.augment(e,{alias:"component",initComponent:function(){this.el||(f=this.tpl||f,this.el=a.all(f)),this.bodyStyle=a.mix(this.bodyStyle||{},{padding:this.bodyPadding},!0),this.getBodyContainer().css(this.bodyStyle),this.style=a.mix(this.style||{},{padding:this.padding,margin:this.margin}),this.el.css(this.style),this.cls&&this.addClass(this.cls),this.bodyCls&&this.getBodyContainer().addClass(this.bodyCls),this.attributes&&this.el.attr(this.attributes),this.addCmpEvents()},setSize:function(a,b){this.el.width(a),this.el.height(b)},toEl:function(){return this.el},getEl:function(){return this.toEl()},getTargetEl:function(){},getBodyContainer:function(){return this.el},getContentTarget:function(){return this.el},render:function(b){"string"==typeof b&&(b=a.one("#"+b),b||(b=a.one(b))),b.append(this.toEl()),this.fire("afterrender",this)},onAdded:function(a,b){var c=this;c.ownerCt=a,c.fireEvent("added",c,a,b)},css:function(b,c){var d=Array.prototype.slice.call(arguments,0);return 1===d.length&&a.isString(d[0])?el.css(b):this.el.css(b,c),this},removeClass:function(a){return this.el.removeClass(a),this},addClass:function(a){return this.el.addClass(a),this},hasClass:function(a){return this.el.hasClass(a)},hasCls:function(a){return this.hasClass(a)},setDisabled:function(a){this.disabled=a,a?this.el.attr("disabled","disabled"):this.el.attr("disabled","")},show:function(){return this.fire("beforeshow")!==!1&&(this.el.show(),this.fire("show")),this},hide:function(a){var b=this;return this.fire("beforehide")!==!1&&(this.el.hide(),b.destroy&&(b.el.remove(),delete b),b.fire("hide"),a&&a()),this},getRootContainer:function(){return this.rootContainer},getId:function(){return this.id},up:function(a){var b=this.getBubbleTarget();if(a)for(;b;b=b.getBubbleTarget())if(d.is(b,a))return b;return b},getBubbleTarget:function(){return this.ownerCt},addCmpEvents:function(){},set:function(a,b){this[a]=b},get:function(a){return this[a]},isType:function(a){return UFO.isType(this,a)}}),e},{requires:["node","./EventSupport","./ComponentQuery"]}),KISSY.add("UFO/layout/Layout",function(a){function b(a){this.initLayout()}return UFO.augment(b,{alias:"layout",initLayout:function(){this.el=[]},doLayout:function(b){var c=this;if(this.clearItems(),!a.isEmptyObject(b))for(var d,e=0,f=b.length;e<f;e++)d=b[e],void 0!=d&&null!=d&&(c.el.push(d.getEl?d.getEl():d),d.fire&&d.fire("afterrender",d))},clearItems:function(){this.el=[]},calculate:function(){},toEl:function(){return this.el}}),b}),KISSY.add("UFO/container/Container",function(a,b,c,d,e,f){function g(a){g.superclass.constructor.call(this,a)}var h="<div></div>";return a.extend(g,d),UFO.augment(g,{alias:"container",initComponent:function(){this.el||(h=this.tpl||h,this.el=a.all(h));var b=this.layout;b||(b="layout"),this.setLayout(b),this.initItems(),g.superclass.initComponent.apply(this,arguments)},updateLayout:function(){this.layout.doLayout(this.items),this.getBodyContainer().html("");var b,c=this.layout.toEl();a.isArray(c)||(c=[c]);for(var d=0,e=c.length;d<e;d++)b=c[d],this.getBodyContainer().append(b)},initItems:function(){if(this.items){var b=this.items;a.isArray(b)||(b=[b]),this.items=[],this.add(b)}},add:function(b,c){a.isArray(b)||(b=[b]);var d,e=this;if(e.items=e.items||[],!a.isEmptyObject(b))for(var f,g=0,h=b.length;g<h;g++)f=b[g],d=UFO.createItem(f,e.defaults),e.items.push(d),d&&d.onAdded&&d.onAdded(e,g),e.fireEvent("add",e,d,g);return a.isEmptyObject(this.items)||this.updateLayout(),e.items},setLayout:function(a){this.layout=UFO.create(a)},getRefItems:function(a){for(var b,c=this,d=c.items,e=d.length,f=0,g=[];f<e;f++)b=d[f],g.push(b),a&&b&&b.getRefItems&&g.push.apply(g,b.getRefItems(!0));return c.floatingItems&&g.push.apply(g,c.floatingItems),g},query:function(a){return a=a||"*",f.query(a,this)},down:function(a){return this.query(a)[0]||null}}),g},{requires:["node","xtemplate","../Component","../layout/Layout","../ComponentQuery"]}),KISSY.add("app/viewport/tpl/main-tpl",function(){return'<div class="main">\n\t{{^if no_header}}\n\t<header class="bar bar-black bar-header">\n\t\t{{#each leftButtons}}\n\t\t<a href="{{#if href}}{{href}}{{else}}javascript:;{{/if}}" class="button button-clear {{cls}}">\n\t\t\t{{text}} {{#if iconCls}} <i class="icon iconfont {{iconCls}}"></i> {{/if}}\n\t\t</a>\n\t\t{{/each}}\n\t\t<h1 class="title">{{title}}</h1>\n\t\t<div class="buttons buttons-right">\t\n\t\t\t\t{{#each rightButtons}}\n\t\t\t\t<a href="{{#if href}}href{{else}}javascript:;{{/if}}" class="button button-clear {{cls}}"\n\t\t\t\t{{#if attributes}}\n\t\t\t\t\t{{#each attributes}} {{xindex}}="{{this}}" {{/each}}\n\t\t\t\t{{/if}}>\n\t\t\t\t\n\t\t\t\t\t{{text}} {{#if iconCls}} <i class="icon iconfont {{iconCls}}"></i> {{/if}}\n\t\t\t\t</a>\n\t\t\t\t{{/each}}\n\t\t</div>\n\t</header>\n\t{{/if}}\n\t<div class="content {{^if no_header}}has-header{{/if}}">\n\t</div>\n</div>'}),KISSY.add("app/viewport/mods/Frame",function(a,b,c,d,e){function f(a){f.superclass.constructor.call(this,a)}return a.extend(f,d),a.augment(f,{initComponent:function(){var b=this.config=this.config||{};a.mix(b,{title:this.title,leftButtons:this.leftButtons,rightButtons:this.rightButtons},!1),this.el=a.one(new c(e).render(b)),this.content=this.el.one(".content"),f.superclass.initComponent.apply(this,arguments)},getBodyContainer:function(){return this.content},addCmpEvents:function(){f.superclass.addCmpEvents.apply(this,arguments)}}),f},{requires:["node","xtemplate","UFO/container/Container","../tpl/main-tpl"]}),KISSY.add("UFO/lazyload/Lazyload",function(a,b,c,d){function e(a){return a._ks_lazy_width?a._ks_lazy_width:a._ks_lazy_width=b.outerWidth(a)}function f(a){return a._ks_lazy_height?a._ks_lazy_height:a._ks_lazy_height=b.outerHeight(a)}function g(b,c,d){function e(){f&&(f.cancel(),f=0),g=a.now(),b.apply(d||this,arguments),h=a.now()}var f,g=0,h=0,c=c||150;return a.mix(function(){!g||h>=g&&a.now()-h>c||h<g&&a.now()-g>8*c?e():(f&&f.cancel(),f=a.later(e,c,0,null,arguments))},{stop:function(){f&&(f.cancel(),f=0)}})}function h(a,c,d){if(!a.offsetWidth)return!1;var g,h=b.offset(a),j=!0,k=h.left,l=h.top,m={left:k,top:l,right:k+e(a),bottom:l+f(a)};return g=i(c,m),g&&d&&(j=i(d,m)),j&&g}function i(a,b){var c={};return c.top=Math.max(a.top,b.top),c.bottom=Math.min(a.bottom,b.bottom),c.left=Math.max(a.left,b.left),c.right=Math.min(a.right,b.right),c.bottom>=c.top&&c.right>=c.left}function j(b,c){var d=this;if(!(d instanceof j))return new j(b,c);var e=b;a.isPlainObject(e)||(e=c||{},b&&(e.container=b)),j.superclass.constructor.call(d,e),d._callbacks={},d._containerIsNotDocument=9!=d.get("container").nodeType,a.isArray(e.container)&&(d._backCompact=1),d._initLoadEvent(),e.container&&d.addElements(e.container,d.get("type")),d._loadFn(),a.ready(function(){d._loadFn()}),d.resume()}var k=a.Env.host,l=k.document,m="data-src",n="default",o="scroll",p="touchmove",q="resize",r=100,s=0,t=function(b,c,d,e){function f(a){b.src!=a&&(b.src=a),b.removeAttribute(c)}c=c||m;var g=b.getAttribute(c),h={type:"img",elem:b,src:g},i=!a.isFunction(d)||d(h)!==!1;i&&h.src?f(h.src):console.log(b,g,c)};return j.ATTRS={diff:{value:0},placeholder:{value:"../../../resources/images/default_product.png"},execScript:{value:!0},container:{setter:function(c){return c=c||l,a.isWindow(c)?c=c.document:(c=b.get(c),"body"==b.nodeName(c)&&(c=c.ownerDocument)),c},valueFn:function(){return l}},autoDestroy:{value:!0},onStart:{value:null}},a.extend(j,d,{_initLoadEvent:function(){var b=this,c=b.get("autoDestroy");b._loadFn=g(function(){c&&0==b._counter&&a.isEmptyObject(b._callbacks)&&b.destroy(),b._loadItems()},r,b)},addCallback:function(c,d,e){c=b.get(c);var f=this,g=f._callbacks,h={el:c||document,fn:d||a.noop,outfn:e||a.noop},i=++s;g[i]=h,f._windowRegion?f._loadItem(i,h):f.refresh()},removeCallback:function(c,d){c=b.get(c);var e=this._callbacks;a.each(e,function(a,b){a.el==c&&(d?a.fn==d:1)&&delete e[b]})},imgHandle:function(a){t(a,this.get("imgFlag"),this.get("onStart")),this.removeElements(a)},addElements:function(c,d){"string"==typeof c?c=b.query(c):a.isArray(c)||(c=[c]);var e=this;e._counter=e._counter||0,a.each(c,function(c){d&&"img"!==d||a.each(a.filter([c].concat(b.query("img",c)),function(a){return a.getAttribute&&a.getAttribute(e.get("imgFlag")||m)},e),function(a){e.addCallback(a,e.imgHandle)})})},removeElements:function(c){"string"==typeof c?c=b.query(c):a.isArray(c)||(c=[c]);var d=this,e=d._callbacks;a.each(e,function(b,d){a.inArray(b.el,c)&&delete e[d]})},clear:function(){self._callbacks={}},refresh:function(){this._loadFn()},_loadItems:function(){var b=this,c=b.get("container");b._containerIsNotDocument&&!c.offsetWidth||(b._windowRegion=b._getBoundingRect(),!b._backCompact&&b._containerIsNotDocument&&(b._containerRegion=b._getBoundingRect(b.get("container"))),a.each(b._callbacks,function(a,c){a&&b._loadItem(c,a)}))},_loadItem:function(a,b){var c=this,b=b||c._callbacks[a];if(!b)return!0;var d=b.el,e=!1,f=b.fn,g=b.outfn;if(c.get("force")||h(d,c._windowRegion,c._containerRegion))try{e=f.call(c,d)}catch(a){setTimeout(function(){throw a},0)}else try{g.call(c,d)}catch(a){setTimeout(function(){throw a},0)}return e!==!1&&delete c._callbacks[a],e},_getBoundingRect:function(c){var d,e,f,g;if(void 0!==c){d=b.outerHeight(c),e=b.outerWidth(c);var h=b.offset(c);f=h.left,g=h.top}else d=b.viewportHeight(),e=b.viewportWidth(),f=b.scrollLeft(),g=b.scrollTop();var i=this.get("diff"),j=i===n?e:i,k=0,l=j,m=i===n?d:i,o=0,p=m,q=f+e,r=g+d;return a.isObject(i)&&(k=i.left||0,l=i.right||0,o=i.top||0,p=i.bottom||0),f-=k,q+=l,g-=o,r+=p,{left:f,top:g,right:q,bottom:r}},pause:function(){var a=this,b=a._loadFn;if(!a._destroyed&&(c.remove(k,o,b),c.remove(k,p,b),c.remove(k,q,b),b.stop(),a._containerIsNotDocument)){var d=a.get("container");c.remove(d,o,b),c.remove(d,p,b)}},resume:function(){var a=this,b=a._loadFn;if(!a._destroyed&&(c.on(k,o,b),c.on(k,p,b),c.on(k,q,b),a._containerIsNotDocument)){var d=a.get("container");c.on(d,o,b),c.on(d,p,b)}},destroy:function(){var b=this;b.pause(),b._callbacks={},a.log("datalazyload is destroyed!"),b.fire("destroy"),b._destroyed=1}}),j},{requires:["dom","event","base"]}),KISSY.add("UFO/core/lang/Number",function(a){return{toSignedNumberString:function(a,b){return a>0?"+"+String(a):0==a?(b||"")+String(a):String(a)},toHex:function(a){return a.toString(16)},toAmountWords:function(a){for(var b=["","万","亿"],c=["拾","佰","仟"],d=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],e=String(a).split("."),f=0,g=0,h=0,i="",j=0,k=1,l=e[0].length;k<=l;k++){j=e[0].charAt(l-k);var m=0;l-k-1>=0&&(m=e[0].charAt(l-k-1)),h+=Number(j),0!=h&&(i=d[Number(j)].concat(i),"0"==j&&(h=0)),l-k-1>=0&&(3!=f?(0!=m&&(i=c[f].concat(i)),f++):(f=0,"万"!=i.charAt(0)&&"亿"!=i.charAt(0)||(i=i.substr(1,i.length-1)),i=b[g].concat(i),h=0)),3==f&&g++}return i+="元",e[1]?(j=e[1].charAt(0),0!=j&&(i+=d[Number(j)]+"角"),j=e[1].charAt(1),0!=j&&(i+=d[Number(j)]+"分")):i+="整",i}}}),KISSY.add("UFO/core/lang/Date",function(a,b){return{getMonthName:function(a,b){return b===!0?["&#74;&#97;&#110;","&#70;&#101;&#98;","&#77;&#97;&#114;","&#65;&#112;&#114;","&#77;&#97;&#121;","&#74;&#117;&#110;","&#74;&#117;&#108;","&#65;&#117;&#103;","&#83;&#101;&#112;","&#79;&#99;&#116;","&#78;&#111;&#118;","&#68;&#101;&#99;"][a.getMonth()]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()]},getWeekName:function(a,b){return b===!0?["&#83;&#117;&#110;","&#77;&#111;&#110;","&#84;&#117;&#101;","&#87;&#101;&#100;","&#84;&#104;&#117;&#114;","&#70;&#114;&#105;","&#83;&#97;&#116;"][a.getDay()]:["Sun","Mon","Tue","Wed","Thur","Fri","Sat"][a.getDay()]},format:function(a,c){if(!a)return"";c||(c="yyyy-MM-dd mm:ss");var d={TZ:b.toSignedNumberString(parseInt(-a.getTimezoneOffset()/60)),"q+":Math.floor((a.getMonth()+3)/3),"y+":a.getFullYear(),MN:this.getMonthName(a,!0),"M+":a.getMonth()+1,"d+":a.getDate(),WN:this.getWeekName(a),"h+":a.getHours(),"H+":function(a){return a<13?a:a-12}(a.getHours()),"m+":a.getMinutes(),MP:a.getMinutes()-(new Date).getMinutes(),"s+":a.getSeconds(),DP:function(a){return a.getHours()<12?"AM":"PM"}(a)};for(var e in d)if(new RegExp("("+e+")").test(c)){var f=RegExp.$1;c=c.replace(f,function(){return"yy"===f?d[e]%100:f.length>1&&"number"==typeof d[e]&&d[e]>-1&&d[e]<10?"0"+d[e]:d[e]})}return c}}},{requires:["./Number"]}),KISSY.add("app/util/XTemplateUtil",function(a,b,c){var d=function(){b.addCommand("getImgAbsolutePath",function(a,b){var c=b.params[0];return c?"../resources/img/"+c:"../resources/img/default_product.png"}),b.addCommand("formatPrice",function(a,b){return Number(b.params[0]).toFixed(2)}),b.addCommand("formatDateTime",function(b,d){var e=d.params[0],f="yyyy-MM-dd";return a.isNumber(e)&&(e=new Date(e)),2===d.params.length&&(f=d.params[1]),c.format(e,f)}),b.addCommand("fixedDigits",function(a,b){var c=2;return 2===b.params.length&&(c=b.params[1]),Number(b.params[0]).toFixed(c)}),b.addCommand("join",function(a,b){var c=",";return 2===b.params.length&&(c=b.params[1]),b.params[0].join(c)}),b.addCommand("getHost",function(a,b){return location.host}),b.addCommand("encodeURIComponent",function(a,b){return encodeURIComponent(b.params[0])})};return d(),{}},{requires:["xtemplate","UFO/core/lang/Date"]}),KISSY.add("UFO/popup/MessageBox",function(a,b,c,d){function e(b){b.buttonText=a.mix({ok:"确定",yes:"是",no:"否",cancel:"取消"},b.buttonText,!0,void 0,!0),this.buttonIds=["ok","yes","no","cancel"],b.buttons=b.buttons||1,e.superclass.constructor.call(this,b)}var f=['<div class="popup-container popup-showing active">','\t<div class="popup">','\t\t<div class="popup-head">','\t\t\t<h3 class="popup-title"></h3>',"\t\t</div>",'\t\t<div class="popup-body">',"\t\t\t<span></span>","\t\t</div>",'\t\t<div class="popup-buttons">',"\t\t</div>","\t</div>","</div>"].join(""),g=document.body;return a.extend(e,d),e.ERROR="error",e.INFO="info",e.QUESTION="question",e.WARNING="warning",e.OK=1,e.YES=2,e.NO=4,e.CANCEL=8,e.YESNO=6,e.OKCANCEL=9,e.YESNOCANCEL=14,UFO.augment(e,{alias:"messagebox",initComponent:function(){this.el=a.one(f),this.backdrop=a.one('<div class="backdrop visible active"></div>'),this.setTitle(this.title),this.setMessage(this.msg),this.setButtons(this.buttons),e.superclass.initComponent.apply(this,arguments)},setTitle:function(a){this.title=a,this.el.one(".popup-title").html(a)},setMessage:function(b){a.isObject(b)&&(b=JSON.stringify(b)),this.msg=b,this.el.one(".popup-body span").html(b)},setButtons:function(b){this.buttons=b;for(var c,d=this.el.one(".popup-buttons"),e=3;e>=0;e--)this.buttons&Math.pow(2,e)&&(c=a.one('<button name="button-'+this.buttonIds[e]+'" class="button button-default">'+this.buttonText[this.buttonIds[e]]+"</button>"),d.append(c))},handleClickOk:function(){var a=this;a.buttonListeners&&a.buttonListeners.ok&&a.buttonListeners.ok(),a.fire("ok"),a.hide()},handleClickCancel:function(){var a=this;a.buttonListeners&&a.buttonListeners.cancel&&a.buttonListeners.cancel(),a.fire("cancel"),a.hide()},handleClickYes:function(){var a=this;a.buttonListeners&&a.buttonListeners.yes&&a.buttonListeners.yes(),a.fire("yes"),a.hide()},handleClickNo:function(){var a=this;a.buttonListeners&&a.buttonListeners.no&&a.buttonListeners.no(),a.fire("no"),a.hide()},getBodyContianer:function(){return this.el.one(".popup-body")},show:function(b){if(this.fire("beforeshow")!==!1){var c=a.one(g);c.append(this.backdrop),c.append(this.el),this.fire("show")}},hide:function(a){var b=this;this.fire("beforehide")!==!1&&(this.backdrop.remove(),b.el.remove(),b.fire("hide"),delete b)},addCmpEvents:function(){var b=this;this.on("hide",function(){a.one(g).removeClass("modal-open"),a.one("html").removeClass("modal-open"),g.scrollTop=b.origScrollTop}),this.on("beforeshow",function(){b.origScrollTop=g.scrollTop,a.one(g).addClass("modal-open"),a.one("html").addClass("modal-open")}),this.el.delegate("click","button[name=button-ok]",function(a){return b.handleClickOk(a),!1}),this.el.delegate("click","button[name=button-cancel]",function(a){return b.handleClickCancel(a),!1}),this.el.delegate("click","button[name=button-yes]",function(a){return b.handleClickYes(a),!1}),this.el.delegate("click","button[name=button-no]",function(a){return b.handleClickNo(a),!1}),e.superclass.addCmpEvents.apply(this,arguments)}}),e.show=function(b){var c=new e(b),d=a.Defer();return c.show(),c.on("ok",function(){d.resolve(e.OK)}),c.on("yes",function(){d.resolve(e.YES)}),c.on("no",function(){d.resolve(e.NO)}),c.on("cancel",function(){d.resolve(e.OKCANCEL)}),d.promise},e.confirm=function(a,b,c,d){var f={title:a,icon:e.QUESTION,msg:b,buttons:e.OKCANCEL,buttonText:c,buttonListeners:{ok:d}};return e.show(f)},e.alert=function(b,c,d,f){a.isFunction(d)&&(f=d,d=void 0);var g={title:b||"",msg:c||"",buttons:e.OK,icon:d,buttonListeners:{ok:f}};return e.show(g)},e},{requires:["node","promise","../container/Container"]}),KISSY.add("app/product/tpl/list-tpl",function(){return'<div class="product-scroll-content scroll-content">\n\t<ul class="product-list">\n\t\t\n\t</ul>\n</div>'}),KISSY.add("app/product/tpl/list-item-tpl",function(){return'\t{{#each list}}\n\t\t{{#if type==="1"}}\n\t\t\t<li class="product-item">\n\t\t\t\t<a href="{{jump_address}}"></a><img src="{{getImgAbsolutePath img_url}}" style="width:100%;"></a>\n\t\t\t</li>\n\t\t{{else}}\n\t\t<li class="product-item">\n\t\t\t<a href="javascript:;" class="card" data-product_id="{{product_id}}">\n\t\t\t\t<div class="img-wrapper" style="{{#if ../productImgWidth}}width:{{../productImgWidth}}; height: {{../productImgHeight}};{{/if}}">\n\t\t\t\t\t{{#if tag}}\n\t\t\t\t\t<label class="product-label">{{tag}}</label>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t{{#if type==="3"}}\n\t\t\t\t\t<div class="bottom-float-layer">\n\t\t\t\t\t\t<i class="one2many-label">一对多</i> &nbsp; · &nbsp;<i>{{service_start_time}}</i> &nbsp; · &nbsp;<i>{{simple_address}}</i>&nbsp; · &nbsp; <i>已报{{apply_nums}}/{{limit_nums}}</i>\n\t\t\t\t\t</div>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t<div class="artisan-photo-wrapper">\n\t\t\t\t\t\t<img src="{{getImgAbsolutePath head_photo_url}}">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img class="product-img" \n\t\t\t\t\t\t style="{{#if ../productImgWidth}} min-width:{{../productImgWidth}}; min-height: {{../productImgHeight}};{{/if}}" \n\t\t\t\t\t\t data-src="{{getImgAbsolutePath img_url}}">\n\t\t\t\t</div>\n\t\t\t\t<h2 class="product-desc">\n\t\t\t\t\t{{title}}\n\t\t\t\t</h2>\n\t\t\t\t<h3 class="artisan-desc">\n\t\t\t\t\t<span class="artisan-name">{{nick_modify}}</span>\n\t\t\t\t\t{{#if subtitle}}\n\t\t\t\t\t<span class="artisan-title">{{{subtitle}}}</span>\n\t\t\t\t\t{{/if}}\n\t\t\t\t</h3>\n\t\t\t\t<div class="price-desc">\n\t\t\t\t\t<span class="now-price">\n\t\t\t\t\t\t{{zhima_price}}<i class="unit">元</i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="old-price">\n\t\t\t\t\t\t{{market_price}}元\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>\n\t\t{{/if}}\n\t{{/each}}\n'}),KISSY.add("app/tpl/spinner-loading-tpl",function(){return'\n<span class="spinner spinner-ios-small" style="text-align: center; display: block; width: 100%;"><svg\n\t\tviewBox="0 0 64 64">\n\t\t<g stroke-width="4" stroke-linecap="round">\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(180)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(210)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(240)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(270)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(300)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(330)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(0)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(30)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(60)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(90)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(120)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85"\n\t\t\trepeatCount="indefinite"></animate></line>\n\t\t<line y1="12" y2="20" transform="translate(32,32) rotate(150)">\n\t\t<animate attributeName="stroke-opacity" dur="750ms"\n\t\t\tvalues="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1"\n\t\t\trepeatCount="indefinite"></animate></line></g></svg></span>\n'}),KISSY.add("UFO/util/Storage",function(a,b){return{setItem:function(a,b,c){var d=typeof c;"string"===d||"number"===d||"boolean"===d?a.setItem(b,c):a.setItem(b,JSON.stringify(c))},getItem:function(a,b){var c=a.getItem(b);try{return JSON.parse(c)}catch(a){return c}},setLocalItem:function(a,b){this.setItem(localStorage,a,b)},getLocalItem:function(a){return this.getItem(localStorage,a)},setSessionItem:function(a,b){this.setItem(sessionStorage,a,b)},getSessionItem:function(a){return this.getItem(sessionStorage,a)}}},{requires:["node"]}),KISSY.add("app/util/ParamUtil",function(a){return{processParam:function(b){for(var c in b){var d=b[c];a.isArray(d)&&(b[c]=d[0])}return b}}}),KISSY.add("app/app",function(a,b,c,d){var e=c.processParam(a.unparam(decodeURIComponent(location.search.slice(1)))),f=(navigator.userAgent.toLowerCase(),"yql_customer_position"),g="yql_user",h=void 0,i=void 0,j=[{name:"北京市",code:"110100"},{name:"上海市",code:"310100"},{name:"杭州市",code:"330100"},{name:"成都市",code:"510100"},{name:"深圳市",code:"440300"},{name:"广州市",code:"440100"},{name:"武汉市",code:"420100"},{name:"南京市",code:"320100"},{name:"天津市",code:"120100"},{name:"重庆市",code:"500100"}];return{getCity:function(a){return this.getCityMap()[a]||this.getCityMap()[110100]},getCityByName:function(a){return/市$/.test(a)||(a+="市"),this.getNameKeyCityMap()[a]||this.getNameKeyCityMap()["北京市"]},getCityMap:function(){if(!h){h={};for(var a,b=0,c=j.length;b<c;b++)a=j[b],h[a.code]=a}return h},getNameKeyCityMap:function(){if(!i){i={};for(var a,b=0,c=j.length;b<c;b++)a=j[b],i[a.name]=a}return i},getCityList:function(a){return a&&a(result),j},setPosition:function(a){console.log("position",a),a.city_code||(a.city_code=this.getCityByName(a.city).code),b.setSessionItem(f,a)},getPosition:function(){b.getSessionItem(f)},setSessionUser:function(a){b.setSessionItem(g,a)},getSessionUser:function(){return b.getSessionItem(g)},isLogined:function(){return!!this.getSessionUser()},getParam:function(){return e},isMicroMessenger:function(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},notifyApp:function(a,b){var c=navigator.userAgent;if("micromessenger"==c.toLowerCase().match(/MicroMessenger/i))return void(window.location="down.html");c.match(/(iPhone|iPod|iPad);?/i)?window.location=a:c.match(/android/i)&&(window.location=b);var d=+new Date;setTimeout(function(){!window.document.webkitHidden&&setTimeout(function(){+new Date-d<2e3&&(window.location="down.html")},500)},500)}}},{requires:["UFO/util/Storage","./util/ParamUtil","./util/XTemplateUtil"]}),KISSY.add("app/Action",function(a,b,c){var d=a;return{ajax2:function(b){a.mix(b,{dataType:"json",headers:{"X-Requested-With":!1}},!1);var e=c.getSessionUser();return e&&(b.data=a.mix({user_id:e.user_id,token:e.token},b.data)),b.data=a.mix({version:G_CONFIG.version},b.data),d.io(b)},ajax:function(a){return a.url=G_CONFIG.API_HOST+a.url,this.ajax2(a)},query:function(a,b,c,d){return this.ajax({type:"GET",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},post:function(a,b,c,d){return this.ajax({type:"post",url:a,data:b,success:c,error:function(a){d&&d(a),alert("网络错误"),console.error(a)}})},update:function(a,b,c,d){return this.post(a,b,c,d)},uploadImage2:function(a){var b=new XMLHttpRequest;a.updateProgress&&b.addEventListener("progress",a.updateProgress,!1),a.success&&b.addEventListener("load",a.success,!1),a.error&&b.addEventListener("error",a.error,!1),a.transferCanceled&&b.addEventListener("abort",a.transferCanceled,!1);var c=new FormData;c.append("uploadImage",a.file),b.open("post",G_CONFIG.API_HOST+"/v2/upload_image",!0),b.send(c)},postFormData:function(b,e,f,g){var h;a.isString(b)?h={}:(h=b,b=h.url,e=h.data,f=h.success,g=h.error);var i=c.getSessionUser();i&&a.mix(e,{user_id:i.user_id,token:i.token},!1);var j=new FormData;for(var k in e)j.append(k,e[k]);return a.mix(h,{type:"post",url:G_CONFIG.API_HOST+b,data:j,dataType:"json",headers:{"X-Requested-With":!1},cache:!1,contentType:!1,processData:!1,success:f,error:g}),d.io(h)}}},{requires:["io","./app"]}),KISSY.add("app/product/mods/List",function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(b,c,d){function e(){f&&(f.cancel(),f=0),g=a.now(),b.apply(d||this,arguments),h=a.now()}var f,g=0,h=0,c=c||150;return a.mix(function(){!g||h>=g&&a.now()-h>c||h<g&&a.now()-g>8*c?e.apply(d,arguments):(f&&f.cancel(),f=a.later(e,c,0,d,arguments))},{stop:function(){f&&(f.cancel(),f=0)}})}function o(a){o.superclass.constructor.call(this,a)}var p=window,q=a.one(l);return a.extend(o,f),UFO.augment(o,{alias:"productlist",initComponent:function(){this.el=a.one(j),this.List=this.el.one("ul"),this.scrollView=this.el,this.scrollViewDom=this.scrollView.getDOMNode(),o.superclass.initComponent.apply(this,arguments),this.init()},init:function(){this.load({})},calcImgSize:function(a){var b=this.productImgWidth=this.List.width(),c=this.productImgHeight=224*this.productImgWidth/300;b?a&&a(b,c):setTimeout(function(){calcImgSize(a)},2e3)},setImgSize:function(a){var b=this;this.calcImgSize(function(c,d){b.el.all(".product-list .card .img-wrapper").css({width:c,height:d}),b.el.all(".product-list .card .img-wrapper > img").css({"min-width":c,"min-height":d}),a&&a()})},showLoadingMoreMask:function(){this.List.append(q)},removeLoadingMoreMask:function(){q.remove()},load:function(a,b){var c=this;a.offset=0,this.params=a,this.query(a,function(a){c.setImgSize(function(){c.actInview()}),a||c.addScrollListener(),b&&b(a)})},loadMore:function(a){console.log("loadmore-----");var b=this,c=this.params;c.offset=c.offset+c.page_size,this.query(c,function(c){
b.actInview(),a&&a(c)})},query:function(a,b,c){var d=this;d.showLoadingMoreMask(),d.scrollViewDom.scrollTop=d.scrollViewDom.scrollTop+28,a=this.params=a||this.params,m.query("/products.json",a,function(c){console.log("query",c),d.removeLoadingMoreMask(),d.List.append(new e(k,{commands:{getProductHref:function(a,b){var c=b.params[0];return"#"+c}}}).render({list:c,productImgWidth:d.productImgWidth,productImgHeight:d.productImgHeight})),b&&b(c.length<a.page_size)},function(a){d.removeLoadingMoreMask(),c&&c(),console.log("msg",a)})},actInview:function(){var b=this;b.imgLazyLoad?(b.imgLazyLoad.addElements(b.imgLazyLoad.get("container")),b.imgLazyLoad.refresh()):b.imgLazyLoad=new g({container:b.scrollView,autoDestroy:!1}),b.labelLazyload||(b.labelLazyload=new g({container:b.scrollView,autoDestroy:!1,type:"div"})),b.labelLazyload.clear();var d=c.query(".product-list .card .img-wrapper .product-label");a.each(d,function(a){b.labelLazyload.addCallback(a,function(a){return c.addClass(a,"inview"),!1},function(a){c.removeClass(a,"inview")})})},addCmpEvents:function(){var a=this,b=function(b){return n(function(){a.scrollViewDom.scrollTop+a.scrollViewDom.clientHeight+p.innerHeight>=a.scrollViewDom.scrollHeight&&(a.removeScrollListener(),a.loadMore(function(b){b||a.addScrollListener()}))},500)}();this.addScrollListener=function(){d.on(a.scrollViewDom,"scroll",b)},this.removeScrollListener=function(){d.detach(a.scrollViewDom,"scroll",b)},this.el.delegate("click","a.card",function(a){return i.alert("alert","You are nice!"),!1}),d.on(p,"resize",function(b){a.setImgSize()})}}),o},{requires:["node","dom","event","xtemplate","UFO/Component","UFO/lazyload/Lazyload","../../util/XTemplateUtil","UFO/popup/MessageBox","../tpl/list-tpl","../tpl/list-item-tpl","../../tpl/spinner-loading-tpl","../../Action"]}),KISSY.add("app/product/mods/ListViewport",function(a,b,c,d){function e(a){e.superclass.constructor.call(this,a)}return a.extend(e,c),a.augment(e,{initComponent:function(){var a=new d;this.items=[a],this.title="活动列表",e.superclass.initComponent.apply(this,arguments)},addCmpEvents:function(){e.superclass.addCmpEvents.apply(this,arguments)}}),e},{requires:["node","../../viewport/mods/Frame","./List"]});