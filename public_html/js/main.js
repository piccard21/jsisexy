require.config({
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        underscore: 'libs/underscore/underscore',
        c01: "chapters/01",
        c02: "chapters/02",
        c03: "chapters/03",
        oo: "chapters/oo",
        e01: "examples/01-oo-class",
        e02: "examples/02-oo-overwriting",
        e03: "examples/03-oo-kapselung",
        e04: "examples/04-oo-this",
        e05: "examples/05-oo-closures",
        e06: "examples/06-oo-vererbung",
        e07: "examples/07-oo-callbacks",
        e08: "examples/08-oo-apply",
        e09: "examples/09-oo-chainable",
        e10: "examples/10-oo-tips",
        e11: "examples/11-oo-map",
        e12: "examples/12-oo-all",
        j01: "examples/j01-plugin",
    }
});

var JSSEXY = {};

require([
    'app',
], function (App) {
    // The "app" dependency is passed in as "App"
    App.initialize();
});