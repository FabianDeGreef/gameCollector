// module.exports = hbsHelpers;
// function hbsHelpers(hbs) {
//   return hbs.create({
//     helpers: {
//       ifEquals: function (arg1, arg2, options) {
//         return arg1 == arg2 ? options.fn(this) : options.inverse(this);
//       },
//     },
//   });
// }

// module.exports = hbsHelpers;

var register = function (Handlebars) {
  var helpers = {
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }
};

module.exports.register = register;
module.exports.helpers = register(null);
