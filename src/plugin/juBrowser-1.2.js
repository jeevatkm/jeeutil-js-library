/*
 * juBrowser Plugin - JeeUtil JavaScript Library 
 * Version 1.2
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
 */
 
if(typeof ju == 'undefined'){ 
	alert('JeeUtil JavaScript Library: Missing Information \n\n juBrowser-x.x plugin required "juCore-x.x plugin", kindly include.');
}else{
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
	ver: '1.2',

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
}