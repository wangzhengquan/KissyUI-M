/*! 2019-12-27 */

KISSY.add(function(i,t,e,a,n,l){document.body;function s(t){s.superclass.constructor.call(this,t)}return i.extend(s,n),UFO.augment(s,{alias:"tabslider",initComponent:function(){this.el=i.all(l),this.el.one(".tabbar .tab-link-highlight").css("width",1/this.items.length*100+"%"),s.superclass.initComponent.apply(this,arguments)},getSliderPagination:function(){return this.el.one(".tabbar .tabbar-inner")},createSliderPaginationBullet:function(t,e){return i.substitute('<a href="javascript:;" class="tab">{title}</a>',{title:t.title})},hightlightPagerBullet:function(t){var e=100*(t=t)+"%";this.el.all(".tabbar-inner .tab").removeClass(this.activeCls),this.el.one(".tabbar-inner .tab:nth-child("+(t+1)+")").addClass(this.activeCls),this.el.one(".tabbar .tab-link-highlight").css({transform:"translate3d("+e+", 0px, 0px)","-webkit-transform":"translate3d("+e+", 0px, 0px)"})}}),s},{requires:["node","event","xtemplate","./Slider","./tpl/tab-slider-tpl"]});