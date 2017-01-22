define(['jquery', 'underscore'], function ($, _) {
    JSSEXY.j01_plugin = function () {

        //  http://blog.teamtreehouse.com/writing-your-own-jquery-plugins
        // https://www.sitepoint.com/how-to-develop-a-jquery-plugin/
        // https://www.ostraining.com/blog/coding/custom-jquery-plugin/


        (function ($) {

            $.fn.helloWorld = function (options) {

                // Establish our default settings
                var settings = $.extend({
                    text: 'Hello, World!',
                    color: null,
                    fontStyle: null,
                    complete: null
                }, options);

                return this.each(function () {
                    $(this).text(settings.text);

                    if (settings.color) {
                        $(this).css('color', settings.color);
                    }

                    if (settings.fontStyle) {
                        $(this).css('font-style', settings.fontStyle);
                    }

                    if ($.isFunction(settings.complete)) {
                        settings.complete.call(this);
                    }
                });

            };

        }(jQuery));



        $('h2').helloWorld({
            text: 'Salut, le monde!',
            color: '#005dff',
            fontStyle: 'italic'
        });
    }
});
