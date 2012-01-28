/*
 * juShortcut Plugin - JeeUtil JavaScript Library 
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

if(typeof ju=="undefined"){alert('JeeUtil JavaScript Library: Missing Information \n\n juShortcut-x.x plugin required "juCore-x.x plugin", kindly include.')}else{ju.shortcut=new Object();Add(ju.shortcut,{ver:"1.0",_shortcuts:{},_kCount:{},_keys:{"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90},_shiftCom:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|","[":"{","]":"}"},_specialKeys:{esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,scrolllock:145,scroll_lock:145,scroll:145,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},add:function(g,f,a,b,c){a=(a)?a:false;b=(b)?b:false;target=(c)?c:document;var e=target;if(ju.isString(target)){e=ju.getObj(target)}g=g.toLower();var d=function(p){p=p||window.event;if(b){var m;if(p.target){m=p.target}else{if(p.srcElement){m=p.srcElement}}if(m.nodeType==3){m=m.parentNode}if(m.tagName=="INPUT"||m.tagName=="TEXTAREA"){return}}code=(p.keyCode)?(p.keyCode):p.which;var o=String.fromCharCode(code);if(code==188){o=","}if(code==190){o="."}var n=g.split("+");var l=ju.shortcut._kCount[g];var j=n[l];var h=ju.shortcut._keys[j];if(j=="ctrl"||j=="control"&&p.ctrlKey){l++}else{if(j=="shift"&&p.shiftKey){l++}else{if(j=="alt"&&p.altKey){l++}else{if(j=="meta"&&p.metaKey){l++}else{if(h==code){l++}else{if(ju.shortcut._specialKeys[j]){if(ju.shortcut._specialKeys[j]==code){l++}}else{if(o==j){l++}else{if(ju.shortcut._shiftCom[o]&&p.shiftKey){if(ju.shortcut._shiftCom[o]==j){l++}}}}}}}}}ju.shortcut._kCount[g]=l;if(ju.shortcut._kCount[g]==n.length){f(p);ju.shortcut._kCount[g]=0;if(!a){p.cancelBubble=true;p.returnValue=false;if(p.stopPropagation){p.stopPropagation();p.preventDefault()}return false}}};this._shortcuts[g]={action:d,target:e,event:"keydown"};this._kCount[g]=0;ju.addFunction(e,"keydown",d)},remove:function(b){var a=this._shortcuts[b.toLower()];delete (ju.shortcut._shortcuts[b]);if(!a){return}ju.deleteFunction(a.target,a.event,a.action)}})};