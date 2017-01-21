define([
    'jquery',
    'underscore',
    'c01',
    'c02',
    'c03',
    'oo',
], function ($, _) {

    var initialize = function () {

        $('.chapters li a').click(function (e) {
            e.preventDefault();

            // call JS
            JSSEXY[$(this).data("chapter")]();

            // open js-sexy-page
            window.open($(e.currentTarget).attr('href'), '_blank');
        });
    }

    return {
        initialize: initialize
    };
}); 