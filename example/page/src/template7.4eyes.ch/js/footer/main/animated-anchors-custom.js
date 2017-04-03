(function (window, $, undefined) {
    'use strict';

    if($ === undefined) {
        alert('Error: jQuery not loaded!');
        return;
    }

    var X4e = window.X4e || {},
        AnimatedAnchorsCustom = X4e.AnimatedAnchorsCustom || (X4e.AnimatedAnchorsCustom = {});


    $.extend(true, AnimatedAnchorsCustom, {
        Selectors: {
            offset: '[data-animated-anchors="offset"]'
        },
        instance: null,
        registerHook: function (isMatching, getData) {
            this.instance.registerHook(isMatching, getData);
        },
        init: function(){
            this.instance = new X4e.AnimatedAnchors({
                duration: 500,
                history: true,
                offsetElement: this.Selectors.offset,
                additionalOffset: 20
            });
        }
    });

    window.X4e = X4e;

}) (this, jQuery);