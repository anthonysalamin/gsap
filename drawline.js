/*!
 * DrawSVGPlugin 3.11.5 
 * https://greensock.com
 * 
 * @license Copyright 2023, GreenSock. All rights reserved.
 * This plugin is a membership benefit of Club GreenSock and is only authorized for use in sites/apps/products developed by individuals/companies with an active Club GreenSock membership. See https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function l(){return"undefined"!=typeof window}function m(){return t||l()&&(t=window.gsap)&&t.registerPlugin&&t}function p(e){return Math.round(1e4*e)/1e4}function q(e){return parseFloat(e)||0}function r(e,t){var r=q(e);return~e.indexOf("%")?r/100*t:r}function s(e,t){return q(e.getAttribute(t))}function u(e,t,r,n,s,i){return D(Math.pow((q(r)-q(e))*s,2)+Math.pow((q(n)-q(t))*i,2))}function v(e){return console.warn(e)}function w(e){return"non-scaling-stroke"===e.getAttribute("vector-effect")}function z(e){if(!(e=k(e)[0]))return 0;var t,r,n,i,o,a,f,h=e.tagName.toLowerCase(),l=e.style,d=1,c=1;w(e)&&(c=e.getScreenCTM(),d=D(c.a*c.a+c.b*c.b),c=D(c.d*c.d+c.c*c.c));try{r=e.getBBox()}catch(e){v("Some browsers won't measure invisible elements (like display:none or masks inside defs).")}var g=r||{x:0,y:0,width:0,height:0},_=g.x,y=g.y,x=g.width,m=g.height;if(r&&(x||m)||!M[h]||(x=s(e,M[h][0]),m=s(e,M[h][1]),"rect"!==h&&"line"!==h&&(x*=2,m*=2),"line"===h&&(_=s(e,"x1"),y=s(e,"y1"),x=Math.abs(x-_),m=Math.abs(m-y))),"path"===h)i=l.strokeDasharray,l.strokeDasharray="none",t=e.getTotalLength()||0,p(d)!==p(c)&&!b&&(b=1)&&v("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),t*=(d+c)/2,l.strokeDasharray=i;else if("rect"===h)t=2*x*d+2*m*c;else if("line"===h)t=u(_,y,_+x,y+m,d,c);else if("polyline"===h||"polygon"===h)for(n=e.getAttribute("points").match(P)||[],"polygon"===h&&n.push(n[0],n[1]),t=0,o=2;o<n.length;o+=2)t+=u(n[o-2],n[o-1],n[o],n[o+1],d,c)||0;else"circle"!==h&&"ellipse"!==h||(a=x/2*d,f=m/2*c,t=Math.PI*(3*(a+f)-D((3*a+f)*(a+3*f))));return t||0}function A(e,t){if(!(e=k(e)[0]))return[0,0];t=t||z(e)+1;var r=f.getComputedStyle(e),n=r.strokeDasharray||"",s=q(r.strokeDashoffset),i=n.indexOf(",");return i<0&&(i=n.indexOf(" ")),t<(n=i<0?t:q(n.substr(0,i)))&&(n=t),[-s||0,n-s||0]}function B(){l()&&(f=window,d=t=m(),k=t.utils.toArray,c=t.core.getStyleSaver,g=t.core.reverting||function(){},h=-1!==((f.navigator||{}).userAgent||"").indexOf("Edge"))}var t,k,f,h,d,b,c,g,P=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,M={rect:["width","height"],circle:["r","r"],ellipse:["rx","ry"],line:["x2","y2"]},D=Math.sqrt,n={version:"3.11.5",name:"drawSVG",register:function register(e){t=e,B()},init:function init(e,t,n){if(!e.getBBox)return!1;d||B();var s,i,o,a=z(e);return this.styles=c&&c(e,"strokeDashoffset,strokeDasharray,strokeMiterlimit"),this.tween=n,this._style=e.style,this._target=e,t+""=="true"?t="0 100%":t?-1===(t+"").indexOf(" ")&&(t="0 "+t):t="0 0",i=function _parse(e,t,n){var s,i,o=e.indexOf(" ");return i=o<0?(s=void 0!==n?n+"":e,e):(s=e.substr(0,o),e.substr(o+1)),s=r(s,t),(i=r(i,t))<s?[i,s]:[s,i]}(t,a,(s=A(e,a))[0]),this._length=p(a),this._dash=p(s[1]-s[0]),this._offset=p(-s[0]),this._dashPT=this.add(this,"_dash",this._dash,p(i[1]-i[0]),0,0,0,0,0,1),this._offsetPT=this.add(this,"_offset",this._offset,p(-i[0]),0,0,0,0,0,1),h&&(o=f.getComputedStyle(e)).strokeLinecap!==o.strokeLinejoin&&(i=q(o.strokeMiterlimit),this.add(e.style,"strokeMiterlimit",i,i+.01)),this._live=w(e)||~(t+"").indexOf("live"),this._nowrap=~(t+"").indexOf("nowrap"),this._props.push("drawSVG"),1},render:function render(e,t){if(t.tween._time||!g()){var r,n,s,i,o=t._pt,a=t._style;if(o){for(t._live&&(r=z(t._target))!==t._length&&(n=r/t._length,t._length=r,t._offsetPT&&(t._offsetPT.s*=n,t._offsetPT.c*=n),t._dashPT?(t._dashPT.s*=n,t._dashPT.c*=n):t._dash*=n);o;)o.r(e,o.d),o=o._next;s=t._dash||e&&1!==e&&1e-4||0,r=t._length-s+.1,i=t._offset,s&&i&&s+Math.abs(i%t._length)>t._length-.2&&(i+=i<0?.1:-.1)&&(r+=.1),a.strokeDashoffset=s?i:i+.001,a.strokeDasharray=r<.2?"none":s?s+"px,"+(t._nowrap?999999:r)+"px":"0px, 999999px"}}else t.styles.revert()},getLength:z,getPosition:A};m()&&t.registerPlugin(n),e.DrawSVGPlugin=n,e.default=n;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});