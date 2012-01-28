/*
 * juCore Plugin - JeeUtil JavaScript Library 
 * Version 1.0
 *
 * The MIT License
 *
 * Copyright (c) 2008-2012 www.myjeeva.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Republic of India Patent Pending (IP): IPL-V-101-JU
 *
 * Changes Logs: please refer https://github.com/jeevatkm/jeeutil-js-library/blob/master/src/plugin/README 
 *
 */

var ju=new Object();nua=navigator.userAgent.toLowerCase();Add(ju,{ver:"1.0",ratio:"100.0",empty:function(){},isBool:function(a){return typeof a=="boolean"},isEqual:function(a,b){return a===b},isFunction:function(a){return typeof a=="function"},isList:function(a){return a&&typeof a=="object"&&a.constructor==Array},isNull:function(a){return typeof a=="undefined"||(typeof a=="object"&&!a)},isUndefined:function(a){return typeof a=="undefined"},isString:function(a){return typeof a=="string"},isObject:function(a){return typeof a=="object"},getEnv:function(){return(window.attachEvent)?1:(window.addEventListener)?2:3},createElement:function(a){return(document.createElement(a))},addStyleSheet:function(a){ele=this.createElement("link");ele.setAttribute("type","text/css");ele.setAttribute("rel","stylesheet");ele.setAttribute("href",a);ele.setAttribute("media","screen");if(!this.isUndefined(document.getElementsByTagName("head"))){return(this.appendChild(document.getElementsByTagName("head")[0],ele))}else{return false}},appendChild:function(b,a){if(!b||!a){return false}b.appendChild(a);return true},AddCss:function(b){try{s=this.createElement("link");s.setAttribute("type","text/css");s.setAttribute("rel","stylesheet");s.setAttribute("href",b);s.setAttribute("media","screen");if(!this.isUndefined(document.getElementsByTagName("head"))){this.appendChild(document.getElementsByTagName("head")[0],s)}return true}catch(a){return false}},addStyle:function(b){try{if(document.styleSheets.length==0){s=this.createElement("style");s.setAttribute("type","text/css");s.setAttribute("media","screen");if(!this.isUndefined(document.getElementsByTagName("head"))){this.appendChild(document.getElementsByTagName("head")[0],s)}}ss=document.styleSheets[document.styleSheets.length-1];for(var c in b){if(ss.addRule){ss.addRule(c,b[c],0)}else{if(ss.insertRule){ss.insertRule(c.concat("{"+b[c]+"}"),0)}}}return true}catch(a){return false}},getFunction:function(a){return((a&&this.isFunction(a))?a:ju.empty)},getPageBody:function(){return(document.getElementsByTagName?document.getElementsByTagName("body")[0]:(document.body||null))},getPageDimension:function(){var a=ju.getPageBody();if(a){return{width:a.clientWidth,height:a.clientHeight}}return{width:0,height:0}},focus:function(a){if(!a){return false}a=(this.isString(a))?this.getObj(a):a;a.focus()},getOpaRef:function(){var a=this.getPageBody().style;return(!this.isUndefined(a.filter))?1:(!this.isUndefined(a.KhtmlOpacity))?2:(!this.isUndefined(a.KHTMLOpacity))?3:(!this.isUndefined(a.MozOpacity))?4:(!this.isUndefined(a.opacity))?5:0},getObj:function(a){if(this.isString(a)){if(document.getElementById){a=document.getElementById(a)}else{if(document.all){a=document.all[a]}}if(this.isNull(a)){a=top.document.getElementById(a)}}return(this.isNull(a))?null:a},elementType:function(b,a){if(this.isNull(a)){return !this.isNull(b)&&this.isObject(b)&&b.nodeName!=null}else{return !this.isNull(b)&&this.isObject(b)&&!this.isNull(b.nodeName)&&b.nodeName.toLower()==a.toLower()}},addFunction:function(d,a,c){if(!d||!a||!c){return null}if(!this.isFunction(c)){return null}d=this.getObj(d);if(d){switch(this.getEnv()){case 1:var b=d.attachEvent("on"+a,c);break;case 2:d.addEventListener(a,c,false);break;case 3:d["on"+a]=c}return true}return false},deleteFunction:function(d,a,c){if(!d||!a||!c){return null}if(!this.isFunction(c)){return null}d=this.getObj(d);if(d){switch(this.getEnv()){case 1:var b=d.detachEvent("on"+a,c);break;case 2:d.removeEventListener(a,c,false);break;case 3:d["on"+a]=false}return true}return false},replaceFunction:function(c,a,d,b){if(!c||!a||!d||!b){return null}if(!this.isFunction(d)||!this.isFunction(b)){return null}if(this.deleteFunction(c,a,d)){return this.addFunction(c,a,b)}return false},swap:function(b,a){try{if(!b||!a){return false}b=(this.isString(b))?this.getObj(b):b;a=(this.isString(a))?this.getObj(a):a;var c=b.parentNode;c.removeChild(b);c.insertBefore(b,a)}catch(d){return null}},nextItem:function(b){if(!b){return false}b=(this.isString(b))?this.getObj(b):b;var a=b.nextSibling;while(a!=null){if(a.nodeName==b.nodeName){return a}a=a.nextSibling}return null},previousItem:function(b){if(!b){return false}b=(this.isString(b))?this.getObj(b):b;var a=b.previousSibling;while(a!=null){if(a.nodeName==b.nodeName){return a}a=a.previousSibling}return null},getParentBackColor:function(b){if(!b){return false}b=(this.isString(b))?this.getObj(b):b;var a=b.parentNode,d;while(a.tagName.toUpper()!="HTML"&&(d=this.getBackColor(a))=="transparent"){a=a.parentNode}if(d=="transparent"){d="#FFFFFF"}return d},getBackColor:function(a){if(!a){return false}a=(this.isString(a))?this.getObj(a):a;var b=this.getStyleProp(a,"backgroundColor");if(this.isNull(b)||b=="transparent"||b.find("rgba(0, 0, 0, 0)")){return("transparent")}if(b.find("rgb")){b=this.toHexa(b)}return b},getPadding:function(b,a){var c=this.getStyleProp(b,"padding"+a);if(this.isNull(c)||!c.find("px")){return(0)}return(c.toInt())},getStyleProp:function(a,b){if(!a||!b){return false}a=(this.isString(a))?this.getObj(a):a;if(a.currentStyle){return(a.currentStyle[b])}if(document.defaultView.getComputedStyle){return(document.defaultView.getComputedStyle(a,"")[b])}return null},toHexa:function(f){var d="",a,c,b;var e=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;var c=e.exec(f);for(b=1;b<4;b++){a=parseInt(c[b]).toString(16);if(a.length==1){d+="0"+a}else{d+=a}}return("#"+d)},fadeIn:function(a,b){if(!a){return null}b=(b)?b:5;b=Math.round(b*100/this.ratio.toFloat());var c=0;for(i=0;i<=100;i++){setTimeout("ju.setOpa('"+a+"',"+i+")",(c*b));c++}},fadeOut:function(a,b){if(!a){return null}b=(b)?b:5;b=Math.round(b*100/this.ratio.toFloat());var c=0;for(i=100;i>=0;i--){setTimeout("ju.setOpa('"+a+"',"+i+")",(c*b));c++}},setOpa:function(c,a){var b=ju.getObj(c).style;switch(ju.getOpaRef()){case 1:b.zoom="100%";b.filter="alpha(opacity="+a+")";break;case 2:b.KhtmlOpacity=(a/this.ratio.toFloat());break;case 3:b.KHTMLOpacity=(a/this.ratio.toFloat());break;case 4:b.MozOpacity=(a/this.ratio.toFloat());break;case 5:b.opacity=(a/this.ratio.toFloat());break}},getXHR:function(){if(window.XMLHttpRequest){return new XMLHttpRequest()}else{if(window.ActiveXObject){return new ActiveXObject("Microsoft.XMLHTTP")}}}});String.prototype.find=function(a){return(this.indexOf(a)>=0?true:false)};String.prototype.toInt=function(){return(parseInt(this))};String.prototype.toFloat=function(){return(parseFloat(this))};String.prototype.trim=function(){return(this.replace(/\s+$/,"")).replace(/^\s+/,"")};String.prototype.rTrim=function(){return(this.replace(/\s+$/,""))};String.prototype.lTrim=function(){return(this.replace(/^\s+/,""))};String.prototype.toLower=function(){return(this.toLowerCase().trim())};String.prototype.toUpper=function(){return(this.toUpperCase().trim())};String.prototype.count=function(){return(this.trim().length)};String.prototype.initCap=function(){return(this.charAt(0).toUpper()+this.substr(1))};String.prototype.isEmpty=function(){return((this.count()==0)?true:false)};String.prototype.equalTo=function(a){return((!a)?null:(this.trim().toLower()==a.trim().toLower())?true:false)};String.prototype.notEqualTo=function(a){return(!this.equalTo(a))};String.prototype.stripHTML=function(){return this.replace(/<script(.*?)>((.|\n)*?)(<\/script>)/ig,"").replace(/<(?:.|\s)*?>/ig,"").replace(/&(?:.|\s)*?;/ig,"")};Array.prototype.count=function(){return(this.length)};Array.prototype.isEmpty=function(){var b=0;for(var a=0;a<this.length;a++){if(this[a].isEmpty()){b++}}return(b==this.length)?true:false};Array.prototype.find=function(b,c){for(var a=0;a<this.count();a++){if(this[a].equalTo(b)){return((c)?a:this[a].trim())}}return false};Array.prototype.findPos=function(a){return(this.find(a,"in")+1)};function Add(a,b){for(var c in b){a[c]=b[c]}}function Remove(a,b){delete (a[b])};