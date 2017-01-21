require.config({
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
        underscore: 'libs/underscore/underscore',
        c01: "chapters/01",
        c02: "chapters/02",
        c03: "chapters/03",
        oo: "chapters/oo",
    }
});

var JSSEXY = {};

require([
    'app',
], function (App) {
    // The "app" dependency is passed in as "App"
    App.initialize();
});