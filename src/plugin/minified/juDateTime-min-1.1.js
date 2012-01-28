/*
 * juDateTime Plugin - JeeUtil JavaScript Library 
 * Version 1.1
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

if(typeof ju=="undefined"||typeof ju.doc=="undefined"){alert('JeeUtil JavaScript Library: Missing Information \n\n juDateTime-x.x plugin required "juCore-x.x plugin" and "juDoc-x.x plugin", kindly include.')}else{ju.datetime=new Object();ju.datetime.ver="1.1";ju.datetime.masks={shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};ju.datetime.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};ju.datetime.format=function(){var a=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,b=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,d=/[^-+\dA-Z]/g,c=function(f,e){f=String(f);e=e||2;while(f.length<e){f="0"+f}return f};return function(i,v,q){var g=this.format;if(arguments.length==1&&(typeof i=="string"||i instanceof String)&&!/\d/.test(i)){v=i;i=undefined}i=i?new Date(i):new Date();if(isNaN(i)){throw new SyntaxError("invalid date")}v=String(this.masks[v]||v);if(v.slice(0,4)=="UTC:"){v=v.slice(4);q=true}var t=q?"getUTC":"get",l=i[t+"Date"](),e=i[t+"Day"](),j=i[t+"Month"](),p=i[t+"FullYear"](),r=i[t+"Hours"](),k=i[t+"Minutes"](),u=i[t+"Seconds"](),n=i[t+"Milliseconds"](),f=q?0:i.getTimezoneOffset(),h={d:l,dd:c(l),ddd:this.i18n.dayNames[e],dddd:this.i18n.dayNames[e+7],m:j+1,mm:c(j+1),mmm:this.i18n.monthNames[j],mmmm:this.i18n.monthNames[j+12],yy:String(p).slice(2),yyyy:p,h:r%12||12,hh:c(r%12||12),H:r,HH:c(r),M:k,MM:c(k),s:u,ss:c(u),l:c(n,3),L:c(n>99?Math.round(n/10):n),t:r<12?"a":"p",tt:r<12?"am":"pm",T:r<12?"A":"P",TT:r<12?"AM":"PM",Z:q?"UTC":(String(i).match(b)||[""]).pop().replace(d,""),o:(f>0?"-":"+")+c(Math.floor(Math.abs(f)/60)*100+Math.abs(f)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!=10)*l%10]};return v.replace(a,function(m){return m in h?h[m]:m.slice(1,m.length-1)})}}();ju.datetime.showTime=function(){if(arguments.length){var a=this.showTime;a.keep=new Function();a.keep=function(){ju.doc.setValue(this.eleId,ju.datetime.getTime(this.mask))};a.eleId=arguments[0];a.mask=(ju.isNull(arguments[1]))?"shortTime":arguments[1];a.keep();setInterval(function(){a.keep()},950)}else{return null}};ju.datetime.showDate=function(b,a){if(!b){return null}a=(ju.isNull(a))?"shortDate":a;a=String(this.masks[a]||a);ju.doc.setValue(b,this.getDate(a))};ju.datetime.getDate=function(a){a=(ju.isNull(a))?"shortDate":a;return this.format(new Date(),a)};ju.datetime.getTime=function(a){a=(ju.isNull(a))?"shortTime":a;return this.format(new Date(),a)};ju.datetime.getDateTime=function(a){a=(ju.isNull(a))?"isoDateTime":a;return this.format(new Date(),a)}};