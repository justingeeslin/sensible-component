describe('Component', function() {

    it('should construct', function() {
      aComponent = new sensible.classes.Component();
      expect(aComponent instanceof sensible.classes.Component).toBe(true)
    });

    it('should render', function() {
      aComponent = new sensible.classes.Component({
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      expect(aComponent.target.find('#turtles').length > 0).toBe(true)

		});

		it('should render manually without autorender', function() {
      aComponent = new sensible.classes.Component({
        el: $('<p id="pony">My little pony</p>'),
        autoRender: false
      });
      aComponent.render();
      expect(aComponent.target.find('#pony').length > 0).toBe(true)
		});

    it('should call preload callback on render', function() {
      var didPreload = false;
      aComponent = new sensible.classes.Component({
        el: $('<p id="polly">Polly Pocket</p>'),
        preload: function() {
          didPreload = true;
        }
      });
      aComponent.render();
      expect(didPreload).toBe(true)
		});

    it('should call postload callback on render', function() {
      var didPostload = false;
      aComponent = new sensible.classes.Component({
        el: $('<p id="joe">GI Joe</p>'),
        preload: function() {
          didPostload = true;
        }
      });
      aComponent.render();
      expect(didPostload).toBe(true)
		});

    it('should get/set state', function() {
      aComponent = new sensible.classes.Component({
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      aComponent.state = "Turtles";
      expect(aComponent.state).toBe("Turtles")

		});

    it('should set state via the go function', function() {
      aComponent = new sensible.classes.Component({
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      aComponent.go("Splinter");
      expect(aComponent.state).toBe("Splinter")

		});

    it('should set state via options', function() {
      aComponent = new sensible.classes.Component({
        state: 'Shredder',
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      expect(aComponent.state).toBe("Shredder")

		});

    it('should set state with a preprocess function', function() {
      aComponent = new sensible.classes.Component({
        state: 'April O`neal',
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>'),
        statePreprocess: function(s) {
          return s.split('`')[0];
        }
      });
      expect(aComponent.state).toBe("April O")

		});

    it('should call stateChange function when set state via options', function(done) {
      var didCallStateChangeFx = false;
      aComponent = new sensible.classes.Component({
        state: 'Shredder',
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>'),
        stateChange : function(oldState, newState) {
    			didCallStateChangeFx = true
          expect(didCallStateChangeFx).toBe(true)
          done()
    		}
      });


		});

    it('should set target as a string selector', function() {
      aComponent = new sensible.classes.Component({
        target: 'html',
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      expect(aComponent.target[0]).toBe($('html')[0])

		});

    it('should set target as a jQuery object', function() {
      aComponent = new sensible.classes.Component({
        target: $('html'),
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      expect(aComponent.target[0]).toBe($('html')[0])

		});

    it('should have a state property that is enumerable to be compatible with most extend functions in JavaScript', function() {
      aComponent = new sensible.classes.Component({
        el: $('<p id="turtles">Teenage Mutant Ninja Turtles</p>')
      });
      var arrayProps = []
      for (var key in aComponent) {
        arrayProps.push(key)
      }
      expect(arrayProps.indexOf('state') > -1).toBe(true)

		});

    it('should destroy and empty the target', function() {
      aComponent = new sensible.classes.Component({
        el: $('<p id="cars">Porche</p>')
      });
      aComponent.destroy()
      expect($('#cars').length).toBe(0);
		});

});
