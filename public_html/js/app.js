/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var JSSEXY = {};

$(function () {

    $('.chapters li a').click(function (e) {
        e.preventDefault(); 

        // call JS
        JSSEXY[$(this).data("chapter")](); 
        
        // open js-sexy-page
        window.open($(e.currentTarget).attr('href'), '_blank');
    });
});