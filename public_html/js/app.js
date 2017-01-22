define([
    'jquery',
    'underscore',
    'c01',
    'c02',
    'c03',
    'oo',
    'e01',
    'e02',
    'e03',
    'e04',
    'e05',
    'e06',
    'e07',
    'e08',
    'e09',
    'e10',
    'e11',
    'j01'
], function ($, _) {

    var initialize = function () {

        
        
        // examples
        $('.examples li a').click(function (e) {
            e.preventDefault();

            // call JS
            JSSEXY[$(this).data("example")](); 
        });
        
        // jquery
        $('.jquery li a').click(function (e) {
            e.preventDefault();

            // call JS
            JSSEXY[$(this).data("jquery")]();

            // open js-sexy-page
//            window.open($(e.currentTarget).attr('href'), '_blank');
        });
    }

    return {
        initialize: initialize
    };
}); 