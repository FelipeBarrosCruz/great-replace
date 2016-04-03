module.exports = (function GreatReplace() {

    var service = {
        Replace:    Replace,
        Register:   Register,
        Override:   Override,
        Replaceble: Replaceble
    };

    var StringReplace = String.prototype.replace;

    function Core(pattern, value) {
        var Text = this.toString();

        if (pattern instanceof Replaceble) {
          var groups = pattern.get();

          for(var index in groups) {
            var group = groups[index];
            Text = StringReplace.apply(Text, [group.pattern, group.value]);
          }

        }

        if (typeof pattern === 'object' && Object.keys(pattern).length
           && !(pattern instanceof Replaceble) ) {
            for(var index in pattern) {
                Text = StringReplace.apply(Text, [index, pattern[index]]);
            }
        }

        return StringReplace.apply(Text, [pattern, value]);
    }

    function Replaceble() {
        var groups = [],
            self   = this;

        this.add = function(pattern, value) {
           groups.push({pattern: pattern, value: value});
           return self;
        };

        this.get = function() {
          return groups;
        }
    }

    function Replace(Text, pattern, value) {
        return Core.apply(Text, [pattern, value]);
    }

    function Register() {
        return String.prototype.greatReplace = Core;
    }

    function Override() {
        return String.prototype.replace = Core;
    }

    return service;
})();