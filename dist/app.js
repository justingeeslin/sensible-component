(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.sensible = typeof sensible !== "undefined" ? sensible : {};
sensible.classes = typeof sensible.classes !== "undefined" ? sensible.classes : {};

sensible.classes.Component = require('./js/sensibleComponent.js');

module.exports = sensible.classes.Component;

},{"./js/sensibleComponent.js":2}],2:[function(require,module,exports){
var extend = require('extend');
var Component = function (options) {
	var self = this;

	// Use the private members for custom hidden setters and getters.
	// An identifier for the component's current state.
	var state = '';
	// The element to which this component (el) should be rendered/appended to.
	var target = undefined;

	var defaults = {
		// To log or not to log..
		debug: false,
		el : $(document.createDocumentFragment()),
		stateChange : function(oldState, newState) {
			self.log('Changing state from ' + oldState + ' to ' + newState);
		},
		preload: function() { },
		postload: function() { },
		statePreprocess: function(state) {
			return state;
		},
		// To avoid collisions and incase you want to namespace individual components
		eventNamespace: 'sensible',
		// Call render automatically upon construction becuse sometimes you just want to construct the thing. Disable if the component request data async and should not be show until it is loaded.
		autoRender: true,
	};

	// Supply a default target only as a last resort. This way the body isn't selected every time.
	if (typeof $contentTarget !== "undefined") {
		defaults.target = $contentTarget;
	}
	else if (typeof options !== "undefined" && typeof options.target !== "undefined") {
		target = options.target
	}
	else {
		target = $(document.body);
	}

	this.log = function(msg) {
		if (self.debug) {
			console.log(msg);
		}
	}

	Object.defineProperty(this, 'target', {
		get: function() {
			return target;
		},
		set: function(arg) {
			// If the argument is a string, it is a selector convert it to a jQuery object
			if (typeof arg === "string") {
				target = $(arg);
			}
			else if (arg instanceof jQuery) {
				target = arg
			}
			else {
				console.warn('Unregonized target selector.', arg);
			}
		},
		enumerable: true
	});

	Object.defineProperty(this, 'state', {
		get: function() { return state; },
		set: function(newState) {
			var oldState = state;
			newState = this.statePreprocess(newState);
			state = newState;
			this.stateChange(oldState, newState)
			return true
		},
		enumerable: true
	});

	// $.extend(this, defaults, options);
	self = extend(this, defaults)
	self = extend(this, options)

	// Extend does not trigger custom setters and getters. There are some properties that if defined on init the custom setter/getter is not called. make the assigment manually for these sensitive properties.
	if (options && options.state) {
		this.state = options.state
	}

	this.go = function(newState) {
		this.state = newState;
	}

	// Append the El with all of its markup and events to the targetEl
	this.render = function() {
		self.preload();
		self.target.trigger('preload.' + self.eventNamespace);
		self.log('Rendering..');
		self.target.append(this.el);
		self.postload();
		self.target.trigger('postload.' + self.eventNamespace);
	}

	this.destroy = function() {
		self.target.empty();
	}

	// Call render automatically upon construction
	if (this.autoRender) {
		this.render()
	}

	return this;
}



module.exports = Component;

},{"extend":3}],3:[function(require,module,exports){
function extend(a, b) {
  a._super = b
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
    // Does the property have a custom getter or setter?
    if (typeof b.__lookupGetter__(key) == "function") {
      // console.log('found a getter for ' + key);
      a.__defineGetter__(key, b.__lookupGetter__(key))
    }
    if (typeof b.__lookupSetter__(key) == "function") {
      // console.log('found a setter for ' + key);
      a.__defineSetter__(key, b.__lookupSetter__(key))
    }

  }

  return a;
}

module.exports = extend;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImpzL3NlbnNpYmxlQ29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL2V4dGVuZC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5zZW5zaWJsZSA9IHR5cGVvZiBzZW5zaWJsZSAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbnNpYmxlIDoge307XG5zZW5zaWJsZS5jbGFzc2VzID0gdHlwZW9mIHNlbnNpYmxlLmNsYXNzZXMgIT09IFwidW5kZWZpbmVkXCIgPyBzZW5zaWJsZS5jbGFzc2VzIDoge307XG5cbnNlbnNpYmxlLmNsYXNzZXMuQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9qcy9zZW5zaWJsZUNvbXBvbmVudC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlbnNpYmxlLmNsYXNzZXMuQ29tcG9uZW50O1xuIiwidmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xudmFyIENvbXBvbmVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHQvLyBVc2UgdGhlIHByaXZhdGUgbWVtYmVycyBmb3IgY3VzdG9tIGhpZGRlbiBzZXR0ZXJzIGFuZCBnZXR0ZXJzLlxuXHQvLyBBbiBpZGVudGlmaWVyIGZvciB0aGUgY29tcG9uZW50J3MgY3VycmVudCBzdGF0ZS5cblx0dmFyIHN0YXRlID0gJyc7XG5cdC8vIFRoZSBlbGVtZW50IHRvIHdoaWNoIHRoaXMgY29tcG9uZW50IChlbCkgc2hvdWxkIGJlIHJlbmRlcmVkL2FwcGVuZGVkIHRvLlxuXHR2YXIgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuXG5cdHZhciBkZWZhdWx0cyA9IHtcblx0XHQvLyBUbyBsb2cgb3Igbm90IHRvIGxvZy4uXG5cdFx0ZGVidWc6IGZhbHNlLFxuXHRcdGVsIDogJChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpLFxuXHRcdHN0YXRlQ2hhbmdlIDogZnVuY3Rpb24ob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG5cdFx0XHRzZWxmLmxvZygnQ2hhbmdpbmcgc3RhdGUgZnJvbSAnICsgb2xkU3RhdGUgKyAnIHRvICcgKyBuZXdTdGF0ZSk7XG5cdFx0fSxcblx0XHRwcmVsb2FkOiBmdW5jdGlvbigpIHsgfSxcblx0XHRwb3N0bG9hZDogZnVuY3Rpb24oKSB7IH0sXG5cdFx0c3RhdGVQcmVwcm9jZXNzOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH0sXG5cdFx0Ly8gVG8gYXZvaWQgY29sbGlzaW9ucyBhbmQgaW5jYXNlIHlvdSB3YW50IHRvIG5hbWVzcGFjZSBpbmRpdmlkdWFsIGNvbXBvbmVudHNcblx0XHRldmVudE5hbWVzcGFjZTogJ3NlbnNpYmxlJyxcblx0XHQvLyBDYWxsIHJlbmRlciBhdXRvbWF0aWNhbGx5IHVwb24gY29uc3RydWN0aW9uIGJlY3VzZSBzb21ldGltZXMgeW91IGp1c3Qgd2FudCB0byBjb25zdHJ1Y3QgdGhlIHRoaW5nLiBEaXNhYmxlIGlmIHRoZSBjb21wb25lbnQgcmVxdWVzdCBkYXRhIGFzeW5jIGFuZCBzaG91bGQgbm90IGJlIHNob3cgdW50aWwgaXQgaXMgbG9hZGVkLlxuXHRcdGF1dG9SZW5kZXI6IHRydWUsXG5cdH07XG5cblx0Ly8gU3VwcGx5IGEgZGVmYXVsdCB0YXJnZXQgb25seSBhcyBhIGxhc3QgcmVzb3J0LiBUaGlzIHdheSB0aGUgYm9keSBpc24ndCBzZWxlY3RlZCBldmVyeSB0aW1lLlxuXHRpZiAodHlwZW9mICRjb250ZW50VGFyZ2V0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZGVmYXVsdHMudGFyZ2V0ID0gJGNvbnRlbnRUYXJnZXQ7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIG9wdGlvbnMudGFyZ2V0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0dGFyZ2V0ID0gb3B0aW9ucy50YXJnZXRcblx0fVxuXHRlbHNlIHtcblx0XHR0YXJnZXQgPSAkKGRvY3VtZW50LmJvZHkpO1xuXHR9XG5cblx0dGhpcy5sb2cgPSBmdW5jdGlvbihtc2cpIHtcblx0XHRpZiAoc2VsZi5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3RhcmdldCcsIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oYXJnKSB7XG5cdFx0XHQvLyBJZiB0aGUgYXJndW1lbnQgaXMgYSBzdHJpbmcsIGl0IGlzIGEgc2VsZWN0b3IgY29udmVydCBpdCB0byBhIGpRdWVyeSBvYmplY3Rcblx0XHRcdGlmICh0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHRhcmdldCA9ICQoYXJnKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGFyZyBpbnN0YW5jZW9mIGpRdWVyeSkge1xuXHRcdFx0XHR0YXJnZXQgPSBhcmdcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1VucmVnb25pemVkIHRhcmdldCBzZWxlY3Rvci4nLCBhcmcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHR9KTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N0YXRlJywge1xuXHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBzdGF0ZTsgfSxcblx0XHRzZXQ6IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XG5cdFx0XHR2YXIgb2xkU3RhdGUgPSBzdGF0ZTtcblx0XHRcdG5ld1N0YXRlID0gdGhpcy5zdGF0ZVByZXByb2Nlc3MobmV3U3RhdGUpO1xuXHRcdFx0c3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRcdHRoaXMuc3RhdGVDaGFuZ2Uob2xkU3RhdGUsIG5ld1N0YXRlKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9LFxuXHRcdGVudW1lcmFibGU6IHRydWVcblx0fSk7XG5cblx0Ly8gJC5leHRlbmQodGhpcywgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHRzZWxmID0gZXh0ZW5kKHRoaXMsIGRlZmF1bHRzKVxuXHRzZWxmID0gZXh0ZW5kKHRoaXMsIG9wdGlvbnMpXG5cblx0Ly8gRXh0ZW5kIGRvZXMgbm90IHRyaWdnZXIgY3VzdG9tIHNldHRlcnMgYW5kIGdldHRlcnMuIFRoZXJlIGFyZSBzb21lIHByb3BlcnRpZXMgdGhhdCBpZiBkZWZpbmVkIG9uIGluaXQgdGhlIGN1c3RvbSBzZXR0ZXIvZ2V0dGVyIGlzIG5vdCBjYWxsZWQuIG1ha2UgdGhlIGFzc2lnbWVudCBtYW51YWxseSBmb3IgdGhlc2Ugc2Vuc2l0aXZlIHByb3BlcnRpZXMuXG5cdGlmIChvcHRpb25zICYmIG9wdGlvbnMuc3RhdGUpIHtcblx0XHR0aGlzLnN0YXRlID0gb3B0aW9ucy5zdGF0ZVxuXHR9XG5cblx0dGhpcy5nbyA9IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XG5cdFx0dGhpcy5zdGF0ZSA9IG5ld1N0YXRlO1xuXHR9XG5cblx0Ly8gQXBwZW5kIHRoZSBFbCB3aXRoIGFsbCBvZiBpdHMgbWFya3VwIGFuZCBldmVudHMgdG8gdGhlIHRhcmdldEVsXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0c2VsZi5wcmVsb2FkKCk7XG5cdFx0c2VsZi50YXJnZXQudHJpZ2dlcigncHJlbG9hZC4nICsgc2VsZi5ldmVudE5hbWVzcGFjZSk7XG5cdFx0c2VsZi5sb2coJ1JlbmRlcmluZy4uJyk7XG5cdFx0c2VsZi50YXJnZXQuYXBwZW5kKHRoaXMuZWwpO1xuXHRcdHNlbGYucG9zdGxvYWQoKTtcblx0XHRzZWxmLnRhcmdldC50cmlnZ2VyKCdwb3N0bG9hZC4nICsgc2VsZi5ldmVudE5hbWVzcGFjZSk7XG5cdH1cblxuXHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0XHRzZWxmLnRhcmdldC5lbXB0eSgpO1xuXHR9XG5cblx0Ly8gQ2FsbCByZW5kZXIgYXV0b21hdGljYWxseSB1cG9uIGNvbnN0cnVjdGlvblxuXHRpZiAodGhpcy5hdXRvUmVuZGVyKSB7XG5cdFx0dGhpcy5yZW5kZXIoKVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudDtcbiIsImZ1bmN0aW9uIGV4dGVuZChhLCBiKSB7XG4gIGEuX3N1cGVyID0gYlxuICBmb3IodmFyIGtleSBpbiBiKSB7XG4gICAgaWYoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICAgIC8vIERvZXMgdGhlIHByb3BlcnR5IGhhdmUgYSBjdXN0b20gZ2V0dGVyIG9yIHNldHRlcj9cbiAgICBpZiAodHlwZW9mIGIuX19sb29rdXBHZXR0ZXJfXyhrZXkpID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2ZvdW5kIGEgZ2V0dGVyIGZvciAnICsga2V5KTtcbiAgICAgIGEuX19kZWZpbmVHZXR0ZXJfXyhrZXksIGIuX19sb29rdXBHZXR0ZXJfXyhrZXkpKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGIuX19sb29rdXBTZXR0ZXJfXyhrZXkpID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2ZvdW5kIGEgc2V0dGVyIGZvciAnICsga2V5KTtcbiAgICAgIGEuX19kZWZpbmVTZXR0ZXJfXyhrZXksIGIuX19sb29rdXBTZXR0ZXJfXyhrZXkpKVxuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kO1xuIl19
