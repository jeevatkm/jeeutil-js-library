/*
 * JeeUtil JavaScript Library 
 * Version 1.5
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
 * Changes Logs: please refer https://github.com/jeevatkm/jeeutil-js-library#readme
 *
 */

var ju = new Object();

nua = navigator.userAgent.toLowerCase();

Add(ju, {
	ver: '1.0',	
	
	ratio: '100.0',
	
	empty: function(){ },
	
	isBool: function(val){
		return typeof val == 'boolean';
	},
	
	isEqual: function(l, r){
		return l === r;
	},
	
	isFunction: function(val){
		return typeof val == 'function';
	},
	
	isList: function(val){
		return val && typeof val == 'object' && val.constructor == Array;
	},
	
	isNull: function(val){
		return typeof val == 'undefined' || (typeof val == 'object' && !val);
	},
	
	isUndefined: function(val){
		return typeof val == 'undefined';
	},
	
	isString: function(val){
		return typeof val == 'string';
	},
	
	isObject: function(val){
		return typeof val == 'object';
	},
	
	getEnv: function(){
		return (window.attachEvent) ? 1 
			: (window.addEventListener) ? 2 
			: 3;
	},
	
	createElement: function(ele){
		return (document.createElement(ele));
	},
	
	addStyleSheet: function(file){
		ele = this.createElement("link");
		ele.setAttribute("type","text/css");
		ele.setAttribute("rel","stylesheet");
		ele.setAttribute("href",file);
		ele.setAttribute("media","screen");
		if(!this.isUndefined(document.getElementsByTagName("head"))){
			return(this.appendChild(document.getElementsByTagName("head")[0], ele));
		}
		else return false;
	},
	
	appendChild: function(obj, ele){		
		if(!obj || !ele) return false;
		obj.appendChild(ele);
		return true;
	},
	
	AddCss: function(file){
		try
		{
			s = this.createElement("link");
			s.setAttribute("type","text/css");
			s.setAttribute("rel","stylesheet");
			s.setAttribute("href",file);
			s.setAttribute("media","screen");
			if(!this.isUndefined(document.getElementsByTagName("head"))){
				this.appendChild(document.getElementsByTagName("head")[0], s);				
			}
			return true;
		}
		catch(ex){
			return false;
		}		
	},
	
	addStyle: function(css){
		try
		{
			if(document.styleSheets.length==0){			
				s = this.createElement("style");		
				s.setAttribute("type","text/css");		
				s.setAttribute("media","screen");
				if(!this.isUndefined(document.getElementsByTagName("head"))){
					this.appendChild(document.getElementsByTagName("head")[0], s);				
				}
			}
			ss = document.styleSheets[document.styleSheets.length - 1];
			for(var prop in css){
				if(ss.addRule){
					ss.addRule(prop, css[prop], 0);			
				}else if(ss.insertRule){				
					ss.insertRule(prop.concat('{' + css[prop] + '}'), 0);
				}
			}
			return true;
		}
		catch(ex){
			return false;
		}		
	},
	
	getFunction: function(func){
		return ((func && this.isFunction(func)) ? func : ju.empty);
	},
	
	getPageBody: function(){
		return (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : (document.body || null));
	},
	
	getPageDimension: function(){
		var bodyref = ju.getPageBody();		
		if(bodyref){
			return {
				"width": bodyref.clientWidth,
				"height": bodyref.clientHeight
			}
		}
		return { "width":0, "height":0 };
	},
	
	focus: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;	
		ele.focus();
	},
	
	getOpaRef: function(){
		var css = this.getPageBody().style;	
		return (!this.isUndefined(css.filter)) ? 1 
				: (!this.isUndefined(css.KhtmlOpacity)) ? 2 
				: (!this.isUndefined(css.KHTMLOpacity)) ? 3
				: (!this.isUndefined(css.MozOpacity)) ? 4 
				: (!this.isUndefined(css.opacity)) ? 5 
				: 0;
	},
	
	getObj: function(ele){		
		if(this.isString(ele)){
			if (document.getElementById){
				ele = document.getElementById(ele);
			}
			else if (document.all){
				ele = document.all[ele];
			}			
			//to fetch element outside the iframe
			if(this.isNull(ele))
				ele = top.document.getElementById(ele);
		}	
		return (this.isNull(ele)) ? null : ele;
	},
	
	elementType: function(ele, type){	
		if (this.isNull(type)){
			return !this.isNull(ele) 
				&& this.isObject(ele) 
				&& ele.nodeName != null;
		}
		else{
			return !this.isNull(ele) 
				&& this.isObject(ele) 
				&& !this.isNull(ele.nodeName) 
				&& ele.nodeName.toLower() == type.toLower();
		}	
	},
	
	addFunction: function (ele, eType, func){
		if(!ele || !eType || !func)
			return null;		
		if(!this.isFunction(func))
			return null;
		ele = this.getObj(ele);
		if(ele){
			switch(this.getEnv()){
				case 1: var eve = ele.attachEvent('on'+eType, func); break;
				case 2: ele.addEventListener(eType, func, false); break;
				case 3: ele['on'+eType] = func;
			}
			return true;
		}
		return false;
	},
	
	deleteFunction: function (ele, eType, func){	
		if(!ele || !eType || !func)
			return null;		
		if(!this.isFunction(func))
			return null;
		ele = this.getObj(ele);
		if(ele){
			switch(this.getEnv()){
				case 1: var eve = ele.detachEvent('on'+eType, func); break;
				case 2: ele.removeEventListener(eType,  func, false); break;
				case 3: ele['on'+eType] = false;			
			}
			return true;
		}
		return false;
	},
	
	replaceFunction: function (ele, eType, oldFunc, newFunc){
		if(!ele || !eType || !oldFunc || !newFunc)
			return null;
		if(!this.isFunction(oldFunc) || !this.isFunction(newFunc))
			return null;
		if(this.deleteFunction(ele, eType, oldFunc)){
			return this.addFunction(ele, eType, newFunc);
		}		
		return false;
	},
	
	swap: function(item1, item2){
		try{
			if(!item1 || !item2) return false;
			item1 = (this.isString(item1)) ? this.getObj(item1) : item1;
			item2 = (this.isString(item2)) ? this.getObj(item2) : item2;
			var parent = item1.parentNode;
			parent.removeChild(item1);
			parent.insertBefore(item1, item2);
		}
		catch(e){
			return null;
		}
	},
	
	nextItem: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var sibling = ele.nextSibling;
		while (sibling != null) {
			if (sibling.nodeName == ele.nodeName) return sibling;
			sibling = sibling.nextSibling;
		}
		return null;
	},
	
	previousItem: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var sibling = ele.previousSibling;
		while (sibling != null) {
			if (sibling.nodeName == ele.nodeName) return sibling;
			sibling = sibling.previousSibling;
		}
		return null;
	},
	
	
	getParentBackColor: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var el=ele.parentNode, c;
		while(el.tagName.toUpper()!="HTML" && (c=this.getBackColor(el))=="transparent")
			el=el.parentNode;
		if(c=="transparent") c="#FFFFFF";
		return c;
	},
		
	getBackColor: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var c=this.getStyleProp(ele,"backgroundColor");
		if(this.isNull(c) || c=="transparent" || c.find("rgba(0, 0, 0, 0)"))
			return("transparent");
		if(c.find("rgb")) c=this.toHexa(c);
		return c;
	},
		
	getPadding: function(ele, side){
		var p=this.getStyleProp(ele,"padding"+side);
		if(this.isNull(p) || !p.find("px")) return (0);
		return (p.toInt());
	},
	
	getStyleProp: function(ele, prop){
		if(!ele || !prop) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		if(ele.currentStyle)
			return (ele.currentStyle[prop]);
		if(document.defaultView.getComputedStyle)
			return (document.defaultView.getComputedStyle(ele,'')[prop]);
		return null;
	},
	
	toHexa: function(value){
		var hex="",v,h,i;
		var regexp=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
		var h=regexp.exec(value);
		for(i=1;i<4;i++){
			v=parseInt(h[i]).toString(16);
			if(v.length==1) hex+="0"+v;
			else hex+=v;
		}
		return ("#"+hex);
	},
	
	fadeIn: function(el, speed){
		if(!el)
			return null;
		speed = (speed) ? speed : 5;
		speed = Math.round(speed * 100 / this.ratio.toFloat());	
		var timer = 0;
		for(i=0; i<=100; i++){
			setTimeout("ju.setOpa('"+ el + "'," + i + ")",(timer * speed));
			timer++;
		}
	},
	
	fadeOut: function(el, speed){
		if(!el)
			return null;
		speed = (speed) ? speed : 5;
		speed = Math.round(speed * 100 / this.ratio.toFloat());	
		var timer = 0;
		for(i=100; i>=0; i--){
			setTimeout("ju.setOpa('"+ el + "'," + i + ")",(timer * speed));
			timer++;
		}
	},
	
	setOpa: function(el, opa){
		var css = ju.getObj(el).style;
		switch(ju.getOpaRef()){
			case 1: 
				css.zoom = "100%"; css.filter = "alpha(opacity=" + opa + ")"; break;
			case 2:
				css.KhtmlOpacity = (opa/this.ratio.toFloat()); break;
			case 3:
				css.KHTMLOpacity = (opa/this.ratio.toFloat()); break;
			case 4:
				css.MozOpacity = (opa/this.ratio.toFloat()); break;
			case 5:
				css.opacity = (opa/this.ratio.toFloat()); break;
		}
	},
	
	getXHR: function(){
		if (window.XMLHttpRequest){
			//for IE7+, Firefox, Chrome, Opera, Safari
			return new XMLHttpRequest();
		}
		else if (window.ActiveXObject){
			//for IE6, IE5
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
});

//Extending String Object functionality
String.prototype.find = function(key){
	return (this.indexOf(key)>=0 ? true : false);
}

String.prototype.toInt = function(){
	return (parseInt(this));
}

String.prototype.toFloat = function(){
	return (parseFloat(this));
}

String.prototype.trim = function(){
	return (this.replace(/\s+$/, '')).replace(/^\s+/, '');
}
	
String.prototype.rTrim = function(){
	return (this.replace(/\s+$/, ''));
}

String.prototype.lTrim = function(){
	return (this.replace(/^\s+/, ''));
}

String.prototype.toLower = function(){
	return (this.toLowerCase().trim());
}

String.prototype.toUpper = function(){
	return (this.toUpperCase().trim());
}

String.prototype.count = function(){
	return (this.trim().length);
}

String.prototype.initCap = function(){
	return (this.charAt(0).toUpper() + this.substr(1));
}

String.prototype.isEmpty = function(){
	return ((this.count()==0) ? true : false);
}

String.prototype.equalTo = function(str){
	return ((!str) ? null 
			 : (this.trim().toLower() == str.trim().toLower()) ? true
			 : false);
}

String.prototype.notEqualTo = function(str){
	return (!this.equalTo(str));
}

String.prototype.stripHTML = function(){	
	return this.replace(/<script(.*?)>((.|\n)*?)(<\/script>)/ig, "").replace(/<(?:.|\s)*?>/ig,"").replace(/&(?:.|\s)*?;/ig, "");
}

//Extending Array Object Functionality
Array.prototype.count = function(){
	return (this.length);
}

Array.prototype.isEmpty = function(){	
	var c=0;
	for(var i=0; i<this.length; i++){
		if(this[i].isEmpty())
			c++;
	}
	return (c==this.length) ? true : false;
}

Array.prototype.find = function(key, intval){
	for(var i=0; i<this.count(); i++){
		if(this[i].equalTo(key))
			return ((intval) ? i : this[i].trim());
	}
	return false;
}

Array.prototype.findPos = function(key){
	return (this.find(key, 'in') + 1);
}

function Add(dest, source){
	for(var prop in source){
		dest[prop] = source[prop];
	}
}

function Remove(obj, prop){
	delete(obj[prop]);
}

ju.browser = new Object();

(function(){
	ie = (!!(window.attachEvent && !window.opera));
	mozilla = ((!(nua.indexOf('safari') > -1) && !(nua.indexOf('konqueror') > -1)) && (nua.indexOf('gecko') != -1 ));
	safari = (nua.indexOf('safari') > -1);
	konq = (nua.indexOf('konqueror') > -1);
	opera = (!!window.opera);	
	maxthon = (nua.indexOf('maxthon') > -1);	
	aol = (nua.indexOf('america online browser') > -1);
	//ver 1.0.1
	chrome = (nua.indexOf('chrome') > -1);
	
	broCode = {
		"Navigator" : "NAV", "Netscape6" : "NS", "Netscape" : "NS", "Phoenix" : "PH", 
		"Flock" : "FLK", "OmniWeb" : "OW", "Firefox" : "FF", "SeaMonkey" : "SM",
		"Iceweasel" : "ICWS", "Galeon" : "GLN", "K-Meleon" : "KML", "Camino" : "CAM", 
		"Epiphany" : "EPHY", "MultiZilla" : "MUZ", "Gecko Debian" : "GDB", "rv" : "MOZ",
		"" : "MOZ"
	};
	
	broPlugins = {
		"RP" : "RealPlayer",
		"RO" : "RealOne",
		"RJ" : "RealJukebox",
		"WMP" : "Windows Media",
		"QTP" : "QuickTime",
		"SW" : "Shockwave",
		"DIR" : "Director",
		"FLA" : "Flash",
		"AR" : "Adobe Reader",
		"AA" : "Adobe Acrobat",
		"APP" : "Adobe PDF Plug-In",
		"AP" : "Adobe PDF",
		"SL" : "Silverlight"
	};
})();

Add(ju.browser, {
	ver: '1.1',

	name: function(intval){
		if(ie && !maxthon && !aol){						
			return 'IE';
		}
		else if(safari && !chrome){
			return 'SAF';
		}
		//ver 1.0.1
		else if(chrome && safari){
			return 'GC';
		}
		else if(konq){
			return 'KONQ';
		}
		else if(maxthon){
			return 'MAX';
		}
		else if(aol){
			return 'AOL';
		}
		else if(mozilla){
			var moz_types = new Array('Navigator', 'Netscape6', 'Netscape', 'Phoenix', 'Flock', 'OmniWeb', 'Firefox', 'SeaMonkey','Iceweasel', 'Galeon', 'K-Meleon', 'Camino', 'Epiphany', 'MultiZilla', 'Gecko Debian', 'rv');
			for(i=0; i < moz_types.length; i++){
				if(navigator.userAgent.indexOf(moz_types[i]) != -1)
					return (intval) ? moz_types[i] : broCode[moz_types[i]];
			}		
		}
		else if(opera){
			return 'OP';
		}
		return 'UKN';
	},
	
	version: function(){
		if (ie && !maxthon && !aol){				
			return (nua.substr(nua.indexOf('msie') + 5)).substr(0,(nua.substr(nua.indexOf('msie') + 5)).indexOf(';')) + '/0.0';
		}
		else if (safari && !chrome){			
			return  nua.substr(nua.indexOf('version') + 8, 3) + '/' + nua.substr((nua.indexOf('safari') + 7));
		}
		else if(chrome && safari){			
			return nua.substr(nua.indexOf('chrome')+ 7, 3) + '/' + nua.substr(nua.indexOf('chrome')+ 7, 7);
		}
		else if (konq){			
			return nua.substr((nua.indexOf('konqueror') + 10), 3) + '/0.0';
		}
		else if(maxthon){
			return (nua.substr(nua.indexOf('maxthon')+8,3) + '/0.0');			
		}
		else if(aol){
			return (nua.substr(nua.indexOf('america online browser')+23,3) + '/0.0');	
		}
		else if(mozilla){			
			var revision = nua.substr(nua.indexOf('rv') + 3, 6);			
			revision = revision.substr(0, 3);			
			var f_browser = this.name('in').toLower();
			var brow_ver, brow_ver_sub;			
			if(f_browser.equalTo('nav')){				
				brow_ver = nua.substr(nua.indexOf(f_browser));
				brow_ver_sub = brow_ver.substr(brow_ver.indexOf('/') + 1)
				brow_ver = brow_ver.substr(brow_ver.indexOf('/') + 1, 3);
				return brow_ver + '/' + brow_ver_sub;				
			}
			brow_ver = nua.substr((nua.indexOf(f_browser) + f_browser.length + 1), 3);						
			if(isNaN(brow_ver)){
				brow_ver = revision;
				brow_ver_sub = '0.0';
			}
			else{
				brow_ver_sub = nua.substr((nua.indexOf(f_browser) + f_browser.length + 1), 8);
				var brow_ver_slice = (brow_ver_sub.search(/[(); \n]/) != -1) ? brow_ver_sub.search(/[(); \n]/) : '';			
				(brow_ver_slice) ? brow_ver_sub = brow_ver_sub.substr(0, brow_ver_slice) : '';	
			}
			return brow_ver + '/' + brow_ver_sub;
		}				
		else if (opera){											
			var brow_ver = (nua.substr(nua.indexOf('opera') + 6)).substr(0, (nua.substr(nua.indexOf('opera') + 6)).indexOf(' '));				
			if(brow_ver.trim().count()){					
				return brow_ver + '/0.0';
			}
			else{					
				brow_ver = nua.substr(nua.indexOf('opera'));
				brow_ver = brow_ver.split(' ');
				return brow_ver[1] + '/0.0';
			}				
		}	
		return '0.0/0.0';
	},
	
	isJava: function(){
		return (navigator.javaEnabled()) ? true : false;
	},
			
	isCookie: function(){
		return navigator.cookieEnabled;
	},
	
	isCSS: function(){
		var isEnabled = false;
		if(document.styleSheets){
			isEnabled = true;
			for(var i=0; i<document.styleSheets.length; i++){
				if(document.styleSheets[i].disabled){
					isEnabled = false;
					break;
				}
			}
		}
		return isEnabled;	
	},
	
	createCookie: function(name, value, expires, path, domain, secure){			
		try{
			var today = new Date();
			today.setTime(today.getTime());	
			if(expires){
				expires = expires * 1000 * 60 * 60 * 24;
			}	
			else{
				expires = 1 * 1000 * 60 * 60 * 24;
			}
			var expires_date = new Date(today.getTime() + (expires));	
			var cDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
			var cTime = today.getHours() + '/' + today.getMinutes() + '/' + today.getSeconds();
			var new_value = value + '~' + cDate + '~' + cTime;
			document.cookie = name + "=" +escape(new_value) +
				((expires) ? ";expires=" + expires_date.toGMTString() : "") + 
				((path) ? ";path=" + path : "") + 
				((domain) ? ";domain=" + domain : "") +
				((secure) ? ";secure" : "");
			return true;
		}
		catch(e){
			return null;
		}
	},
	
	getCookie: function(name, scope){
		try{			
			var allCookies = document.cookie.split(';');
			var tempCookie = '';
			var cookieName = '';
			var cookieValue = '';
			var cookieFound = false; 	
			for(i = 0; i < allCookies.length; i++){
				tempCookie = allCookies[i].split('=');			
				cookieName = tempCookie[0].trim();	
				if(cookieName.equalTo(name)){
					cookieFound = true;
					if(tempCookie.length > 1){
						cookieValue = unescape(tempCookie[1].trim());
					}
					if(scope){
						return cookieValue;
					}
					else{
						cookieValue = cookieValue.split('~');
						return cookieValue[0];
					}
					break;
				}
				tempCookie = null;
				cookieName = '';
			}
			if(!cookieFound){
				return false;
			}
		}
		catch(e){
			return null;
		}
	},
	
	getCookieLastUpdate: function(name){
		try{
			var cookieVal = this.getCookie(name, 1);
			if(cookieVal){
				var cookieDetails = cookieVal.split('~');		
				var date = cookieDetails[1];
				var timePack = cookieDetails[2].split('/');
				var noon = 'AM';	
				if(timePack[0].toInt() > 12 && timePack[0].toInt() < 25){
					noon = 'PM';
				}
				for(var i=0; i<timePack.length; i++){
					if(timePack[i].toInt() < 10){
						timePack[i] = '0' + timePack[i];
					}
				}
				var time = timePack[0] + ':' + timePack[1] + ':' + timePack[2] + ' ' +noon;
				var result = {"date":"\"" + date + "\"", "time":"\"" + time + "\""};
				return result;
			}
			return false;
		}
		catch(e){
			return null;
		}
	},
	
	deleteCookie: function(name, path, domain){	
		try{
			if (this.getCookie(name)){		
				document.cookie = name + '=' +
					((path) ? ";path=" + path : '') +
					((domain) ? ";domain=" + domain : '') +
					";expires=Thu, 01-Jan-1970 00:00:01 GMT";
				return true;
			}
			else{		
				return false;
			}
		}
		catch(e){
			return null;
		}
	},
	
	clearAllCookies: function(){
		try{			
			var allCookies = document.cookie.split(';');	
			var tempCookie = '';
			var cookieFound = false;
			for(var i = 0; i < allCookies.length; i++){
				if(allCookies[i].trim()){			
					tempCookie = allCookies[i].split('=');			
					this.deleteCookie(tempCookie[0].trim());
					cookieFound = true;
				}		
			}	
			return (cookieFound) ? true : false;
		}
		catch(e){
			return null;
		}
	},
	
	popup: function(popup_name, url, height, width, status, toolbar, menubar, directories, resizable, scrollbars){
		height = (height) ? height : parseInt(window.screen.height);
		width = (width) ? width : parseInt(window.screen.width);
		status = (status) ? 1 : 0;
		toolbar = (toolbar) ? 1 : 0;
		menubar = (menubar) ? 1 : 0;
		directories = (directories) ? 1 : 0;
		resizable = (resizable) ? 1 : 0;
		scrollbars = (scrollbars) ? 1 : 0;		
		var top = parseInt((window.screen.height - height) / 2);
		var left = parseInt((window.screen.width - width) / 2);		
		var str = 'width=' + width 
			  + ', height=' + height 
			  +', status=' + status 
			  + ', toolbar=' + toolbar 
			  + ', menubar=' + menubar 
			  + ', directories=' + directories 
			  + ', resizable=' + resizable 
			  + ', scrollbars=' + scrollbars 
			  + ', top=' + top 
			  + ', left=' + left;		
		var objWin = window.open(url, popup_name, str);		
		if(objWin){
			objWin.focus();
			return objWin;
		}
		return false;		
	},
	
	language: function(){	
		if(navigator.browserLanguage){
			return navigator.browserLanguage;
		}
		else{
			return navigator.language;
		}
	},
	
	setStatus: function(str){		
		window.status = str.trim();		
	},
	
	iWidth: function(){
		var iWidth;	
		if(!ju.isUndefined(window.innerWidth)){
			  iWidth = window.innerWidth;		  
		 }
		 else if (!ju.isUndefined(document.documentElement) 
								  && !ju.isUndefined(document.documentElement.clientWidth) 
								  && document.documentElement.clientWidth != 0){
			   iWidth = document.documentElement.clientWidth;
		 }
		 else{
			  iWidth = document.getElementsByTagName('body')[0].clientWidth;		  
		 }
		return iWidth;
	},
	
	iHeight: function(){
		var iHeight;
		if(!ju.isUndefined(window.innerHeight)){		  
			  iHeight = window.innerHeight;
		 }
		 else if (!ju.isUndefined(document.documentElement) && !ju.isUndefined(document.documentElement.clientHeight) && document.documentElement.clientWidth != 0){
			  iHeight = document.documentElement.clientHeight;
		 }
		 else{
			  iHeight = document.getElementsByTagName('body')[0].clientHeight;
		 }
		return iHeight;
	},
	
	isRealPlayerExists: function(){
		return ((this.chPlugin('RP')) ? true
					: (this.chPlugin('RJ')) ? true
					: (this.chPlugin('RO')) ? true
					: false);
	},
	
	isWMPlayerExists: function(){
		return this.chPlugin('WMP');
	},
	
	isQTPlayerExists: function(){
		return this.chPlugin('QTP');
	},
	
	isDirectorExists: function(){
		return (this.chPlugin('SW') && this.chPlugin('DIR'));
	},
	
	isFPlayerExists: function(){		
		return (this.chPlugin('SW') && this.chPlugin('FLA'));
	},
	
	isAdobeReaderExists: function(){			
		if(ie){			
			return this.chPlugin('AR');		
		}
		else{
			return ((this.chPlugin('AA')) ? true
						: (this.chPlugin('APP')) ? true
						: (this.chPlugin('AP')) ? true 
						: false);
		}
	},
	
	isSilverlightExists: function(){			
		return this.chPlugin('SL');
	},
	
	chActX: function(objName){
		if(window.ActiveXObject){
			try{			
				var returnValue = new ActiveXObject(objName);						
				return (returnValue) ? true : false;
			}
			catch(e){
				return false;
			}		
		}
	},
	
	chPlugin: function(pluginName){			
		if(window.ActiveXObject){
			if(pluginName == 'RP'){
				return ((this.chActX('rmocx.RealPlayer G2 Control')) ? true
							: (this.chActX('rmocx.RealPlayer G2 Control.1')) ? true
							: (this.chActX('RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)')) ? true
							: (this.chActX('RealVideo.RealVideo(tm) ActiveX Control (32-bit)')) ? true
							: false);			
			}
			else if(pluginName == 'FLA'){				
				return ((this.chActX('ShockwaveFlash.ShockwaveFlash.1')) ? true
							: (this.chActX('ShockwaveFlash.ShockwaveFlash')) ? true 
							: false);
			}
			else if(pluginName == 'WMP'){
				return ((this.chActX('MediaPlayer.MediaPlayer.1')) ? true
							: (this.chActX('WMPlayer.OCX')) ? true 
							: false);
			}
			else if(pluginName == 'QTP'){
				return ((this.chActX('QuickTimeCheckObject.QuickTimeCheck.1')) ? true
							: (this.chActX('QuickTime.QuickTime')) ? true
							: (this.chActX('QuickTimeCheckObject.QuickTimeCheck')) ? true 
							: false);
			}
			else if(pluginName == 'DIR'){
				return ((this.chActX('SWCtl.SWCtl.1')) ? true 
							: (this.chActX('SWCtl.SWCtl')) ? true 
							: false);
			}
			else if(pluginName == 'SW'){
				return ((this.chActX('ShockwaveFlash.ShockwaveFlash.1')) ? true
							: (this.chActX('ShockwaveFlash.ShockwaveFlash')) ? true 
							: false);
			}
			else if(pluginName == 'AR'){
				return (this.chActX('AcroPDF.PDF')) ? true 
							: (this.chActX('PDF.PdfCtrl')) ? true : false;
			}
			else if(pluginName == 'SL'){					
				return this.chActX('AgControl.AgControl');
			}
		}
		else{			
			if(navigator.plugins && navigator.plugins.length > 0){
				for (var i=0; i<navigator.plugins.length; i++){
					if((navigator.plugins[i].name.indexOf(broPlugins[pluginName]) >= 0) 
								|| (navigator.plugins[i].description.indexOf(broPlugins[pluginName]) >= 0)){
						return true;
					}
				}									
			}		
		}	
		return false;
	},
	
	scrollXpos: function(){
		return (window.pageXOffset 
				|| document.body.scrollLeft 
				|| document.documentElement.scrollLeft 
				|| 0);
	},
	
	scrollYpos: function(){
		return (window.pageYOffset
				|| document.body.scrollLeft
				|| document.documentElement.scrollTop
				|| 0);
	},
	
	scrollXYpos: function(){
		return({ "x" : this.scrollX(), 
				 "y" : this.scrollY() });
	}
  });


  ju.shortcut = new Object();

Add(ju.shortcut, {
	ver: '1.0',
	
	_shortcuts: {},
	
	_kCount: {},
		
	_keys: {
		'0':48,
		'1':49,
		'2':50,
		'3':51,
		'4':52,
		'5':53,
		'6':54,
		'7':55,
		'8':56,
		'9':57,
		'a':65,
		'b':66,
		'c':67,
		'd':68,
		'e':69,
		'f':70,
		'g':71,
		'h':72,
		'i':73,
		'j':74,
		'k':75,
		'l':76,
		'm':77,
		'n':78,
		'o':79,
		'p':80,
		'q':81,
		'r':82,
		's':83,
		't':84,
		'u':85,
		'v':86,
		'w':87,
		'x':88,
		'y':89,
		'z':90
	},
	
	_shiftCom: {
		"`":"~",
		"1":"!",
		"2":"@",
		"3":"#",
		"4":"$",
		"5":"%",
		"6":"^",
		"7":"&",
		"8":"*",
		"9":"(",
		"0":")",
		"-":"_",
		"=":"+",
		";":":",
		"'":"\"",
		",":"<",
		".":">",
		"/":"?",
		"\\":"|",
		"[":"{",
		"]":"}"
	},
	
	_specialKeys: {
		'esc':27, 'escape':27,				
		'tab':9,
		'space':32,				
		'return':13, 'enter':13,
		'backspace':8,			
		
		'capslock':20, 'caps_lock':20, 'caps':20,				
		'numlock':144, 'num_lock':144, 'num':144,
		
		'scrolllock':145, 'scroll_lock':145, 'scroll':145,
		'pause':19, 'break':19,			
		'insert':45,
		'home':36,
		'delete':46,
		'end':35,				
		'pageup':33, 'page_up':33, 'pu':33,	
		'pagedown':34, 'page_down':34, 'pd':34,	
		
		'left':37,
		'up':38,
		'right':39,
		'down':40,	
		
		'f1':112,
		'f2':113,
		'f3':114,
		'f4':115,
		'f5':116,
		'f6':117,
		'f7':118,
		'f8':119,
		'f9':120,
		'f10':121,
		'f11':122,
		'f12':123
	},

	add: function(key_combinations, action, propagate, disable_input, element){				
		//Assigning default values
		propagate = (propagate) ? propagate : false;
		disable_input = (disable_input) ? disable_input : false;
		target = (element) ? element : document;
		var ele = target;
		if(ju.isString(target)) 
			ele = ju.getObj(target);		
		key_combinations = key_combinations.toLower();		
		var listner = function(e){
			e = e || window.event;			
			if(disable_input){
				var element;
				if(e.target)
					element = e.target;
				else if(e.srcElement)
					element = e.srcElement;
				if(element.nodeType==3)
					element = element.parentNode;
				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') 
					return;
			}
			code = (e.keyCode) ? (e.keyCode) : e.which;
			var character = String.fromCharCode(code);			
			if(code == 188) character=","; 
			if(code == 190) character="."; 						
			var keys = key_combinations.split("+");			
			var i=ju.shortcut._kCount[key_combinations];
			var k = keys[i];
			var keycode = ju.shortcut._keys[k];
			if(k == 'ctrl' || k == 'control' && e.ctrlKey)
				i++; 
			else if(k == 'shift' && e.shiftKey)
				i++; 
			else if(k == 'alt' && e.altKey)
				i++; 
			else if(k == 'meta' && e.metaKey)
				i++; 
			else if(keycode == code) 
				i++;
			else if(ju.shortcut._specialKeys[k]){
				if(ju.shortcut._specialKeys[k] == code)
					i++;				
			}else{ 
				if(character == k) 
					i++;
				else{
					if(ju.shortcut._shiftCom[character] && e.shiftKey) 
						if(ju.shortcut._shiftCom[character] == k) 
							i++;						
				}
			}
			ju.shortcut._kCount[key_combinations] = i;
			if(ju.shortcut._kCount[key_combinations] == keys.length){
				action(e);
				ju.shortcut._kCount[key_combinations] = 0
				if(!propagate){ 
					//for kill the bubbling process Trident-based browsers.
					e.cancelBubble = true;
					e.returnValue = false;	
					//for kill the bubbling process Gecko-based browsers.
					if (e.stopPropagation){
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this._shortcuts[key_combinations] = {
			'action':listner, 
			'target':ele, 
			'event':'keydown'
		};
		this._kCount[key_combinations]=0;
		ju.addFunction(ele, 'keydown', listner);		
	},
	
	remove: function(key_combinations){				
		var binding = this._shortcuts[key_combinations.toLower()];
		delete(ju.shortcut._shortcuts[key_combinations])
		if(!binding) return;		
		ju.deleteFunction(binding['target'], binding['event'], binding['action']);		
	}
});

ju.dragdrop = new Object();

Add(ju.dragdrop, {
	ver: '1.0',

	_zIndex : 9999,
	group : null,
	isDragging : false,	
	_oElem : null,
	
	enable: function(ele, dragStartCall, dragCall, dragEndCall){
		if(ju.isUndefined(ele))
			return false;
		ele = ju.getObj(ele);	
		if(ele.nodeName.equalTo("UL"))
			return (this.makeContainer(ele, dragStartCall, dragCall, dragEndCall));
		else{
			var list = this.makeDraggable(ele);
			this.setCallback(ele, dragStartCall, dragCall, dragEndCall);
			return list;
		}
	},

	makeDraggable: function(group, inside) {		
		if(!ju.isUndefined(inside)){
			group.handle = group;
			group.handle.group = group;
	
			group.minX = group.minY = group.maxX = group.maxY = null;		
			group.threshold 	= 0;
			group.thresholdY 	= 0;
			group.thresholdX 	= 0;
	
			group._dragStart	= new Function();
			group._dragEnd 		= new Function();
			group._drag 		= new Function();
			
			group.onDragStart	= new Function();
			group.onDragEnd		= new Function();
			group.onDrag		= new Function();
			
			group.setDragHandle 	= this.setDragHandle;
			group.setDragThreshold 	= this.setDragThreshold;
			group.setDragThresholdX = this.setDragThresholdX;
			group.setDragThresholdY = this.setDragThresholdY;
			group.constrain 		= this.constrain;
			group.constVertical = this.constVertical;
			group.constHorizontal = this.constHorizontal;
			
			group.style["cursor"] = "move";
			group.style["position"] = "relative";
	
			group.onmousedown = this.onMouseDown;
		}
		else{
			if(ju.isUndefined(group))
				return false;
				
			group = ju.getObj(group);
			group.onmousedown = ju.dragdrop.invDragStart;
			
			group.onDragStart = new Function();
			group.onDrag = new Function();
			group.onDragEnd = new Function();
			
			group.style["cursor"] = "move";
			group.style["position"] = "relative";
	
			return group;
		}
	},
	
	setCallback: function(ele, dragStartCall, dragCall, dragEndCall) {
		if(!ju.isUndefined(ele)){
			ele.onDragStart = ju.getFunction(dragStartCall);
			ele.onDrag = ju.getFunction(dragCall);
			ele.onDragEnd = ju.getFunction(dragEndCall);
			return true;
		}
		else return false;
	},

	constVertical: function() {
		var nwOffset = ju.dragdrop.northwestOffset(this, true);
		this.minX = nwOffset.x;
		this.maxX = nwOffset.x;
	},

	constHorizontal: function() {
		var nwOffset = ju.dragdrop.northwestOffset(this, true);
		this.minY = nwOffset.y;
		this.maxY = nwOffset.y;
	},

	constrain: function(nwPosition, sePosition) {
		this.minX = nwPosition.x;
		this.minY = nwPosition.y;
		this.maxX = sePosition.x;
		this.maxY = sePosition.y;
	},

	setDragHandle: function(handle) {
		if (handle && handle != null) 
			this.handle = handle;
		else
			this.handle = this;

		this.handle.group = this;
		this.onmousedown = null;
		this.handle.onmousedown = this.onMouseDown;
	},

	setDragThreshold: function(threshold) {
		if (isNaN(parseInt(threshold))) return;
		this.threshold = threshold;
	},

	setDragThresholdX: function(threshold) {
		if (isNaN(parseInt(threshold))) return;
		this.thresholdX = threshold;
	},

	setDragThresholdY: function(threshold) {
		if (isNaN(parseInt(threshold))) return;
		this.thresholdY = threshold;
	},
	
	invDragStart: function(e) {
		var ele = ju.dragdrop._oElem = this;

		if (isNaN(parseInt(ele.style.left))) { ele.style.left = '0px'; }
		if (isNaN(parseInt(ele.style.top))) { ele.style.top = '0px'; }

		var x = ele.style.left.toInt();
		var y = ele.style.top.toInt();

		e = e ? e : window.event;
		ele.mouseX = e.clientX;
		ele.mouseY = e.clientY;

		ele.style["_zIndex"] = ele.style["zIndex"];
		ele.style["zIndex"] = ju.dragdrop._zIndex;
		ele.style["opacity"] = 0.70;

		ele.onDragStart(); //callback		

		document.onmousemove = ju.dragdrop.invDrag;
		document.onmouseup = ju.dragdrop.invDragEnd;
		return false;
	},
	
	invDrag: function(e) {
		var ele = ju.dragdrop._oElem;

		var x = ele.style.left.toInt();
		var y = ele.style.top.toInt();

		e = e ? e : window.event;
		ele.style.left = x + (e.clientX - ele.mouseX) + 'px';
		ele.style.top = y + (e.clientY - ele.mouseY) + 'px';

		ele.mouseX = e.clientX;
		ele.mouseY = e.clientY;

		ele.onDrag(); //callback

		return false;
	},
	
	invDragEnd: function() {
		var ele = ju.dragdrop._oElem;

		var x = ele.style.left.toInt();
		var y = ele.style.top.toInt();

		ele.style["zIndex"] = ele.style["_zIndex"]
		ele.style["opacity"] = "";
		
		ele.onDragEnd(); //callback

		document.onmousemove = null;
		document.onmouseup = null;
		ju.dragdrop._oElem = null;
	},

	onMouseDown: function(event) {
		event = ju.dragdrop.fixEvent(event);
		ju.dragdrop.group = this.group;

		var group = this.group;
		var mouse = event.windowCoordinate;
		var nwOffset = ju.dragdrop.northwestOffset(group, true);
		var nwPosition = ju.dragdrop.northwestPosition(group);
		var sePosition = ju.dragdrop.southeastPosition(group);
		var seOffset = ju.dragdrop.southeastOffset(group, true);

		group.originalOpacity = group.style.opacity;
		group.originalZIndex = group.style.zIndex;
		group.initialWindowCoordinate = mouse;
		
		group.dragCoordinate = mouse;
		group._dragStart(nwPosition, sePosition, nwOffset, seOffset);

		if (group.minX != null)
			group.minMouseX = mouse.x - nwPosition.x + group.minX - nwOffset.x;
		if (group.maxX != null) 
			group.maxMouseX = group.minMouseX + group.maxX - group.minX;

		if (group.minY != null)
			group.minMouseY = mouse.y - nwPosition.y + group.minY - nwOffset.y;
		if (group.maxY != null) 
			group.maxMouseY = group.minMouseY + group.maxY - group.minY;

		group.mouseMin = new ordinate(group.minMouseX, group.minMouseY);
		group.mouseMax = new ordinate(group.maxMouseX, group.maxMouseY);

		document.onmousemove = ju.dragdrop.onMouseMove;
		document.onmouseup = ju.dragdrop.onMouseUp;

		return false;
	},

	onMouseMove: function(event) {
		event = ju.dragdrop.fixEvent(event);
		var group = ju.dragdrop.group;
		var mouse = event.windowCoordinate;
		var nwOffset = ju.dragdrop.northwestOffset(group, true);
		var nwPosition = ju.dragdrop.northwestPosition(group);
		var sePosition = ju.dragdrop.southeastPosition(group);
		var seOffset = ju.dragdrop.southeastOffset(group, true);

		if (!ju.dragdrop.isDragging) {
			if (group.threshold > 0) {
				var distance = group.initialWindowCoordinate.distance(
						mouse);
				if (distance < group.threshold) return true;
			} else if (group.thresholdY > 0) {
				var deltaY = Math.abs(group.initialWindowCoordinate.y - mouse.y);
				if (deltaY < group.thresholdY) return true;
			} else if (group.thresholdX > 0) {
				var deltaX = Math.abs(group.initialWindowCoordinate.x - mouse.x);
				if (deltaX < group.thresholdX) return true;
			}

			ju.dragdrop.isDragging = true;
			group.style["zIndex"] = ju.dragdrop._zIndex;
			group.style["opacity"] = 0.70;
		}
		
		var adjusted = mouse.constrain(group.mouseMin, group.mouseMax);
		nwPosition = nwPosition.plus(adjusted.minus(group.dragCoordinate));
		nwPosition.reposition(group);
		group.dragCoordinate = adjusted;

		var offsetBefore = ju.dragdrop.northwestOffset(group, true);
		group._drag(nwPosition, sePosition, nwOffset, seOffset);
		var offsetAfter = ju.dragdrop.northwestOffset(group, true);

		if (!offsetBefore.equals(offsetAfter)) {
			var errorDelta = offsetBefore.minus(offsetAfter);
			nwPosition = ju.dragdrop.northwestPosition(group).plus(errorDelta);
			nwPosition.reposition(group);
		}

		return false;
	},

	onMouseUp: function(event) {
		event = ju.dragdrop.fixEvent(event);
		var group = ju.dragdrop.group;

		var mouse = event.windowCoordinate;
		var nwOffset = ju.dragdrop.northwestOffset(group, true);
		var nwPosition = ju.dragdrop.northwestPosition(group);
		var sePosition = ju.dragdrop.southeastPosition(group);
		var seOffset = ju.dragdrop.southeastOffset(group, true);

		document.onmousemove = null;
		document.onmouseup   = null;
		group._dragEnd(nwPosition, sePosition, nwOffset, seOffset);

		if (ju.dragdrop.isDragging) {			
			group.style["zIndex"] = group.originalZIndex;
			group.style["opacity"] = group.originalOpacity;
		}

		ju.dragdrop.group = null;
		ju.dragdrop.isDragging = false;

		return false;
	},

	fixEvent: function(event) {
		if (ju.isUndefined(event)) event = window.event;
		ju.dragdrop._fixEvent(event);

		return event;
	},

	firstContainer: null,
	lastContainer: null,
	
	makeContainer: function(list, dragStartCall, dragCall, dragEndCall) {				
		dragStartCall = ju.getFunction(dragStartCall);
		dragCall = ju.getFunction(dragCall);
		dragEndCall = ju.getFunction(dragEndCall);
		if (this.firstContainer == null) {
			this.firstContainer = this.lastContainer = list;
			list.previousContainer = null;
			list.nextContainer = null;
		} else {
			list.previousContainer = this.lastContainer;
			list.nextContainer = null;
			this.lastContainer.nextContainer = list;
			this.lastContainer = list;
		}
		list.onDragOver = new Function();
		list.onDragOut = new Function();
		
    	var items = list.getElementsByTagName( "li" );
		var val = new Array();

		for (var i = 0; i < items.length; i++) {
			ju.dragdrop.makeItemDragable(items[i], dragStartCall, dragCall, dragEndCall);
			val.push(items[i].innerHTML.trim());
		}
	
		list.orgVal = val.join('|');
		
		list.getOrginialValues = function(){
			return this.orgVal.trim().split('|');
		}

		list.getValues = function(){			
			obj = this.getElementsByTagName('li');
			var val = new Array();
			for(var i=0; i<obj.length;i++){
				val[i] = obj[i].innerHTML.trim();
			}
			return val;
		}

		return (list) ? list : null;
	},

	makeItemDragable: function(item, dragStartCall, dragCall, dragEndCall) {
		ju.dragdrop.makeDraggable(item, true);
		item.setDragThreshold(5);	
		item.isOutside = false;		
		item._dragStart = ju.dragdrop.grpDragStart;
		item._drag = ju.dragdrop.grpDrag;
		item._dragEnd = ju.dragdrop.grpDragEnd;
		item.onDragStart = dragStartCall;
		item.onDrag = dragCall;
		item.onDragEnd = dragEndCall;
	},

	grpDragStart: function(nwPosition, sePosition, nwOffset, seOffset) {
		var container = ju.dragdrop.firstContainer;		
		//alert(container.parentNode.innerHTML);
		while (container != null) {
			container.northwest = ju.dragdrop.northwestOffset( container, true );
			container.southeast = ju.dragdrop.southeastOffset( container, true );
			container = container.nextContainer;
		}		
		this.onDragStart();
		this.parentNode.onDragOver();
	},

	grpDrag: function(nwPosition, sePosition, nwOffset, seOffset) {		
		if (this.isOutside) {
			var container = ju.dragdrop.firstContainer;
			while (container != null) {
				if (nwOffset.inside( container.northwest, container.southeast ) ||
					seOffset.inside( container.northwest, container.southeast )) {					
					container.onDragOver();
					this.isOutside = false;					
					var tempParent = this.parentNode;
					//tempParent.removeChild( this );
					container.appendChild( this );
					//alert(this.innerHTML);
					//tempParent.parentNode.removeChild( tempParent );
					break;
				}
				container = container.nextContainer;
			}			
			if (this.isOutside)
				return;	

		} else if (!(nwOffset.inside( this.parentNode.northwest, this.parentNode.southeast ) ||
			seOffset.inside( this.parentNode.northwest, this.parentNode.southeast ))) {
			
			this.parentNode.onDragOut();
			this.isOutside = true;
			
			var container = ju.dragdrop.firstContainer;
			while (container != null) {
				if (nwOffset.inside( container.northwest, container.southeast ) ||
					seOffset.inside( container.northwest, container.southeast )) {					
					container.onDragOver();
					this.isOutside = false;
					//this.parentNode.removeChild( this );
					container.appendChild( this );
					break;
				}
				container = container.nextContainer;
			}
			
			if (this.isOutside) {
				var tempParent = this.parentNode.cloneNode( false );
				//this.parentNode.removeChild( this );
				tempParent.appendChild( this );
				document.getElementsByTagName( "body" ).item(0).appendChild( tempParent );
				return;
			}
		}		
		this.onDrag();
		var parent = this.parentNode;
				
		var item = this;
		var next = ju.nextItem(item);
		while (next != null && this.offsetTop >= next.offsetTop - 2) {
			var item = next;
			var next = ju.nextItem(item);
		}
		if (this != item) {
			ju.swap(this, next);
			return;
		}

		var item = this;
		var previous = ju.previousItem(item);
		while (previous != null && this.offsetTop <= previous.offsetTop + 2) {
			var item = previous;
			var previous = ju.previousItem(item);
		}
		if (this != item) {
			ju.swap(this, item);
			return;
		}
	},

	grpDragEnd: function(nwPosition, sePosition, nwOffset, seOffset) {
		if (this.isOutside) {
			var tempParent = this.parentNode;
			//this.parentNode.removeChild( this );
			//tempParent.parentNode.removeChild( tempParent );
			return;
		}
		this.onDragEnd();
		this.parentNode.onDragOut();
		this.style["top"] = "0px";
		this.style["left"] = "0px";
	},

	origin: new ordinate(0, 0),

	northwestPosition: function(element) {
		var x = element.style.left.toInt();
		var y = element.style.top.toInt();

		return new ordinate(isNaN(x) ? 0 : x, isNaN(y) ? 0 : y);
	},

	southeastPosition: function(element) {
		return ju.dragdrop.northwestPosition(element).plus(
				new ordinate(element.offsetWidth, element.offsetHeight));
	},

	northwestOffset: function(element, isRecursive) {
		var offset = new ordinate(element.offsetLeft, element.offsetTop);

		if (!isRecursive) return offset;

		var parent = element.offsetParent;
		while (parent) {
			offset = offset.plus(
					new ordinate(parent.offsetLeft, parent.offsetTop));
			parent = parent.offsetParent;
		}
		return offset;
	},

	southeastOffset: function(element, isRecursive) {
		return ju.dragdrop.northwestOffset(element, isRecursive).plus(
				new ordinate(element.offsetWidth, element.offsetHeight));
	},

	_fixEvent : function(event) {
		event.windowCoordinate = new ordinate(event.clientX, event.clientY);
	}
});


function ordinate(x, y) {
	this.x = x;
	this.y = y;
}

ordinate.prototype.toString = function() {
	return "(" + this.x + "," + this.y + ")";
}

ordinate.prototype.plus = function(that) {
	return new ordinate(this.x + that.x, this.y + that.y);
}

ordinate.prototype.minus = function(that) {
	return new ordinate(this.x - that.x, this.y - that.y);
}

ordinate.prototype.distance = function(that) {
	var deltaX = this.x - that.x;
	var deltaY = this.y - that.y;

	return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

ordinate.prototype.max = function(that) {
	var x = Math.max(this.x, that.x);
	var y = Math.max(this.y, that.y);
	return new ordinate(x, y);
}

ordinate.prototype.constrain = function(min, max) {
	if (min.x > max.x || min.y > max.y) return this;

	var x = this.x;
	var y = this.y;

	if (!ju.isNull(min.x)) x = Math.max(x, min.x);
	if (!ju.isNull(max.x)) x = Math.min(x, max.x);
	if (!ju.isNull(min.y)) y = Math.max(y, min.y);
	if (!ju.isNull(max.y)) y = Math.min(y, max.y);

	return new ordinate(x, y);
}

ordinate.prototype.reposition = function(element) {
	element.style["top"] = this.y + "px";
	element.style["left"] = this.x + "px";
}

ordinate.prototype.equals = function(that) {
	if (this == that) return true;
	if (!that || ju.isNull(that)) return false;

	return this.x == that.x && this.y == that.y;
}

ordinate.prototype.inside = function(northwest, southeast) {
	if ((this.x >= northwest.x) && (this.x <= southeast.x) &&
		(this.y >= northwest.y) && (this.y <= southeast.y)) {
		
		return true;
	}
	return false;
}


ju.doc = new Object();

Add(ju.doc, {
	ver: '1.0',

	setValue: function(ele, val){		
		if(!ele || !val) return false;	
		ele = (ju.isString(ele)) ? ju.getObj(ele) : ele;	
		if(ele){			
			 if (ju.elementType(ele, 'input')){
				switch (ele.type.toLower()){
					case "checkbox":
					case "check-box":
					case "radio":
						ele.checked = val; return;		
					default:
						ele.value = val; return;
				}
			}
			
			if(ju.elementType(ele, 'select')){				 				
				var found  = false;
				//traverse through dropdown values
				for (var i = 0; i<ele.options.length; i++){
					if (ele.options[i].value == val){
						ele.options[i].selected = true;
						found = true;
					}
					else{
						ele.options[i].selected = false;
					}
				}
				if (found){	return; }	
				//traverse through dropdown display text
				val = val.toLower();
				for (i = 0; i<ele.options.length; i++){
					if (ele.options[i].text.equalTo(val)){
						ele.options[i].selected = true;
						break;
					}
				}				
				return;					
			}
			
			if (ju.elementType(ele, 'textarea'))
				ele.value = val.trim();
			ele.innerHTML = val.trim();
			return;
		}
		else{			
			return false;
		}		
	},
	
	getValue: function(ele){
		if(!ele) return false;	
		ele = (ju.isString(ele)) ? ju.getObj(ele) : ele;		
		if(ele){	
			if (ju.elementType(ele, 'input')){
				switch (ele.type.toLower()){
					case "checkbox":
					case "check-box":
					case "radio":
						return ele.checked;			
					default:
						return ele.value;
				}
			}
			
			if(ju.elementType(ele, 'select')){
				//to fetch multi-select option values
				if(ele.multiple){
					if(ele.length){
						var returnValue = new Array();
						var pos = 0;
						for(var i=0; i<ele.options.length; i++){
							if(ele.options[i].selected){
								returnValue[pos++] = ele.options[i].value;
							}
						}
						return returnValue;
					}
					return '';
				}
				else{
					//to fetch normal dropdown value
					if (ele.selectedIndex != -1){
						return ele.options[ele.selectedIndex].value.trim();					
					}
					else{
						return '';
					}
				}
			}
			
			if (ju.elementType(ele, 'textarea')){
				return ele.value.trim();
			}
			return ele.innerHTML.trim();			
		}
		else{			
			return false;
		}
	},
	
	isEmpty: function(obj){
		if(!obj) return null;
		with(this){
			try{
				var val = getValue(obj);
				return (val.isEmpty());
			}
			catch(e){					
				var val = new Array();
				val = getValue(obj);					
				return (val.isEmpty());
			}
		}		
	},
	
	isMailId: function(obj){
		if(!obj) return null;
		with(this){
			if(isEmpty(obj)) return 0;
			var email = getValue(obj);
			//assigning trim value to element
			setValue(obj, email);
		}			
		var pos_at = email.indexOf('@');
		var email_len = email.count();
		if(email.substr(email.indexOf('.') + 1).count() == 0) return false;
		if(email.indexOf('@') == -1) return false;
		if(email.indexOf('@') == -1 || email.indexOf('@') == 0 || email.indexOf('@') == email_len) return false;
		if(email.indexOf('.') == -1 || email.indexOf('.') == 0 || email.indexOf('.') == email_len) return false;
		if(email.indexOf('@', (pos_at +  1)) != -1) return false;
		if(email.substr(pos_at - 1, pos_at).equalTo('.') || email.substr(pos_at + 1, pos_at + 2).equalTo('.')) return false;
		if(email.indexOf('.', (pos_at + 2)) == -1) return false;
		if(email.indexOf(' ') != -1) return false;
		//for multiple @ symbal		
		if(email.match(/[@]/g) && (email.match(/[@]/g).length > 1)) return false;
		return true;			
	},
	
	isNumeric: function(obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.toLower() == 'text'){
				var regExp = /(^\d\d*$)/;
				return regExp.test(obj.value);
			}
			else return null;
		}
	},
	
	isInteger: function(obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.toLower() == 'text'){
				var regExp = /(^(\+|-)?\d\d*$)/;
				return regExp.test(obj.value);
			}
			else return null;
		}
	},
	
	isReal: function(obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.toLower() == 'text'){
				var regExp = /(^(\+|-)?\d\d*\.\d*$)|(^(\+|-)?\d\d*$)|(^(\+|-)?\.\d\d*$)/;
				return regExp.test(obj.value);
			}
			else return null;
		}
	},
	
	passCompare: function(objFrom, objTo){
		if(!objFrom || !objTo) return null;
		else{
			with(this){
				objFrom = (ju.isString(objFrom)) ? ju.getObj(objFrom) : objFrom;
				objTo = (ju.isString(objTo)) ? ju.getObj(objTo) : objTo;			
				if(ju.elementType(objFrom, 'input') && ju.elementType(objTo, 'input')){
					if((objFrom.type.equalTo('text') && objTo.type.equalTo('text')) || 
							(objFrom.type.equalTo('password') && objTo.type.equalTo('password'))){						
						if((objFrom.value.trim() == objTo.value.trim()) && 
								(!isEmpty(objFrom.value) && !isEmpty(objTo.value))){
							return true;
						}
						else return false;
					}
				}
			}
		}
	},
	
	validateForm: function(objList){		
		if(!objList) return null;
		objList = objList.split(',');
		var missingList = new Array();
		var count = 0;
		for(var i=0; i<objList.length; i++){				
			if(this.isEmpty(objList[i])){
				missingList[count++] = objList[i];
			}
		}
		return (count == 0) ? true : missingList;
	},
	
	compareDate: function (date1, date2, type){
		if(!date1 || !date2) return null;
		date1 = (date1) ? this.getValue(date1) : '';
		date2 = (date2) ? this.getValue(date2) : '';		
		type = (type) ? type : 'S';					
		if(type == 'S'){
			if((date1.count() == 10) && (date2.count() == 10)){				
				date1 = new Date(date1.substr(6), date1.substr(0,2)-1, date1.substr(3,2));
				date2 = new Date(date2.substr(6), date2.substr(0,2)-1, date2.substr(3,2));
			}
			else if((date1.count() == 8) && (date2.count() == 8)){
				date1 = new Date(date1.substr(4), date1.substr(0, 2)-1, date1.substr(2, 2));
				date2 = new Date(date2.substr(4), date2.substr(0, 2)-1, date2.substr(2, 2));
			}
		}
		else{
			if((date1.count() == 10) && (date2.count() == 10)){				
				date1 = new Date(date1.substr(6), date1.substr(3, 2)-1, date1.substr(0, 2));
				date2 = new Date(date2.substr(6), date2.substr(3, 2)-1, date2.substr(0, 2));			
			}
			else if((date1.count() == 8) && (date2.count() == 8)){						
				date1 = new Date(date1.substr(4), date1.substr(2, 2)-1, date1.substr(0, 2));
				date2 = new Date(date2.substr(4), date2.substr(2, 2)-1, date2.substr(0, 2));						
			}
		}
		if(date1 < date2)
			return -1;
		else if(date1.toString() == date2.toString())
			return 0;
		else if(date1 > date2)
			return 1;
	},
	
	isAlpha: function (obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.equalTo('text')){					
				if(obj.value){
					var numRegExp = /[\d+]/g;
					var splRegExp = /[!@#$%^&\*\(\)\+=\-\[\]\\\';,./{}\|\":<>\?~_+]/g;
					if((obj.value.search(numRegExp) == -1) && (obj.value.search(splRegExp) == -1)){
						return true;
					}
					else{
						return false;
					}
				}					
			}
			return null;				
		}
	}
  });

  ju.datetime = new Object();

ju.datetime.ver = '1.0.0';

//Masking constants
ju.datetime.masks = {
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

//Internationalization
ju.datetime.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

ju.datetime.format = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = this.format;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && (typeof date == "string" || date instanceof String) && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date();
		if (isNaN(date)) throw new SyntaxError("invalid date");

		mask = String(this.masks[mask] || mask);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  this.i18n.dayNames[D],
				dddd: this.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  this.i18n.monthNames[m],
				mmmm: this.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

ju.datetime.showTime = function(){	
	if(arguments.length){
		var obj = this.showTime;
		obj.keep = new Function();
		obj.keep = function(){				
			ju.doc.setValue(this.eleId, ju.datetime.getTime(this.mask));
		}
		obj.eleId = arguments[0];
		obj.mask = (ju.isNull(arguments[1])) ? "shortTime" : arguments[1];
		obj.keep();
		setInterval(function(){obj.keep()}, 950);
	}
	else return null;
}

ju.datetime.showDate = function(ele, mask){
	if(!ele) return null;
	mask = (ju.isNull(mask)) ? "shortDate" : mask;
	mask = String(this.masks[mask] || mask);
	ju.doc.setValue(ele, this.getDate(mask));
}

ju.datetime.getDate = function(mask){
	mask = (ju.isNull(mask)) ? "shortDate" : mask;
	return this.format(new Date(), mask);
}

ju.datetime.getTime = function(mask){
	mask = (ju.isNull(mask)) ? "shortTime" : mask;
	return this.format(new Date(), mask);
}

ju.datetime.getDateTime = function(mask){
	mask = (ju.isNull(mask)) ? "isoDateTime" : mask;
	return this.format(new Date(), mask);
}
