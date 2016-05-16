$(document).ready(function() {

  var calculator = {
    init : function() {
      this.cacheDOM();
      this.assignEventListeners();
      this.lastExpression = "";
      this.MAX_INPUT_SIZE = parseInt(this.$display.attr("maxlength"));
    },
    cacheDOM : function() {
      this.$back = $(".back");
      this.$clearEntry = $(".clear-entry");
      this.$del = $(".del");
      this.$display = $("#display input");
      this.$symbols = $(".symbol");
      this.$equals = $(".equals");
    },
    assignEventListeners : function() {
      // Reset calculator memory and clear display
      this.$back.on("click", function() {
        calculator.setNewDisplayString(calculator.lastExpression);
      });

      // Clear calculator display
      this.$clearEntry.on("click", function() {
        calculator.setNewDisplayString("");
      });

      // Remove last symbol from display
      this.$del.on("click", this.deleteLastSymbol);

      // Append symbol to display
      this.$symbols.on("click", function() {
        var symbol = this;
        var currentDisplayString = calculator.getCurrentDisplayString();
        if (currentDisplayString.length < calculator.MAX_INPUT_SIZE) {
          var newDisplayString = currentDisplayString + $(symbol).text();
          calculator.setNewDisplayString(newDisplayString);
        } else {
          // display toast saying that max character limit reached
        }
      });

      // Evaluate expression on display
      this.$equals.on("click", function() {
        var currentDisplayString = calculator.getCurrentDisplayString();
        calculator.lastExpression = currentDisplayString;
        var parsedExpression = calculator.parseExpression(currentDisplayString);

        if (calculator.isValidExpression(parsedExpression)) {
          var result = eval(parsedExpression);

          if (result.toString().length <= calculator.MAX_INPUT_SIZE) {
            calculator.setNewDisplayString(result);
          } else {
            calculator.setNewDisplayString("Error: Value exceeds display limit");
          }
        } else {
          calculator.setNewDisplayString("Error: Invalid expression");
        }
      });
    },
    getCurrentDisplayString : function() {
      return this.$display.val();
    },
    setNewDisplayString : function(newDisplayString) {
      this.$display.val(newDisplayString);
    },
    deleteLastSymbol : function() {
      var currentDisplayValue = calculator.getCurrentDisplayString();
      var newDisplayValue = currentDisplayValue.substr(0, currentDisplayValue.length - 1);
      calculator.setNewDisplayString(newDisplayValue);
    },
    parseExpression : function(expression) {
      return expression.replace(/×/g, "*").replace(/÷/g, "/");
    },
    isValidExpression : function(expression) {
      var re = /^([+-]?([0-9]*[\.]?[0-9]+)([\/\-\*\+\%]([0-9]*[\.]?[0-9]+))*)$/;
      return re.test(expression);
    }
  };

  calculator.init();
});
