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

if(typeof ju == 'undefined'){ 
	alert('JeeUtil JavaScript Library: Missing Information \n\n juShortcut-x.x plugin required "juCore-x.x plugin", kindly include.');
}else{
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
}