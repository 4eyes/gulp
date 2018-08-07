(function (window, $, undefined) {
    'use strict';

    if($ === undefined) {
        alert('Error: jQuery not loaded!');
        return;
    }

    var X4e = window.X4e || {};

    var AnimatedAnchors = function (options) {
        var self = this;

        options = options || {};
        $.extend(true, this.Options, options);

        $(window).on('load', function () {
            self.init();
        });

    };

    $.extend(true, AnimatedAnchors.prototype, {
        Options: {
            duration: 500,
            offsetElement: '',
            additionalOffset: 0,
            history: true
        },
        hooks: [],
        registerHook: function (isMatching, getData) {
            if (typeof isMatching === 'function' && typeof getData === 'function') {
                this.hooks.push({isMatching: isMatching, getData: getData});
            }
        },
        preInit: function () {
            this.onPreInit();
        },
        onPreInit: function () {
            if (this.getCurrentHash()) {
                this.fixToTop();
            }
        },
        init: function () {
            this.onReady();
        },
        onReady: function () {
            var hash = this.getCurrentHash();
            if (hash) {
                var $el = $(hash);
                if (this.shouldAnimate($el)) {
                    this.animate($el, {
                        dontUpdatePushState: true
                    });
                }
            }
            this.registerEvents();

        },
        registerEvents: function () {
            $('a').on('click', $.proxy(this, 'onAnchorClick'));
            if (this.Options.history) {
                $(window).on('popstate', $.proxy(this, 'onStateChange'));
            }
        },
        isNumeric: function( obj ) {
            return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
        },
        getCurrentHash: function () {
            return window.location.hash;
        },
        getCurrentHref: function (withoutHash) {
            var href = window.location.href;
            if (withoutHash) {
                href = this.stripHash(href);
            }
            return href;
        },
        stripHash: function (href) {
            return href.replace(/#.*$/i, '');
        },
        getDuration: function () {
            var duration = this.Options.duration;
            if (this.isNumeric(duration)) {
                //https://bugs.jquery.com/ticket/12273
                if (parseInt(duration, 10) === 0) {
                    duration += 1;
                }
            }
            return duration;
        },
        fixToTop: function () {
            $('html, body').scrollTop(0);
        },
        getOffset: function () {
            var $el = $(this.Options.offsetElement);
            var offset = 0;

            if($el.length) {
                offset += $el.outerHeight();
            }
            if(this.Options.additionalOffset) {
                offset += this.Options.additionalOffset;
            }
            return offset;
        },
        pushState: function ($el) {
            var hash = '#' + $el.attr('id');
            var newStateUrl = this.getCurrentHref(true) + hash;
            if (window.location.href !== newStateUrl) {
                if (history && history.pushState) {
                    history.pushState({}, '', newStateUrl);
                }
            }
        },
        shouldAnimate: function ($el) {
            if ($el === undefined) {
                $el = $(this.getCurrentHash());
            }
            if ($el.length === 0) {
                console.error('No anchor animation possible [anchor not defined!]');
                return false;
            }
            return true;
        },
        animate: function ($el, options) {
            options = options || {};

            var self = this;
            var data = this.getAnimationData($el, options);

            if (data.animate) {
                this.onAnimationBegin($el, data);

                var animation = function (data, callback) {
                    $('html,body')
                        .stop(true, false)
                        .animate(
                            {
                                scrollTop: data.elementOffset - data.additionalOffset
                            },
                            {
                                duration: ++data.duration
                            }
                        )
                        .promise()
                        .done(function () {
                            self.onAnimationComplete($el, data);
                            if (typeof callback === 'function') {
                                callback($el, data);
                            }
                        })
                    ;
                    if (self.Options.history && !options.dontUpdatePushState) {
                        self.pushState($el);
                    }
                };

                animation(data, data.callback);
            }
        },
        getAnimationData: function ($el) {
            var data = {
                animate: this.shouldAnimate($el),
                elementOffset: $el.offset().top,
                additionalOffset: this.getOffset(),
                duration: this.getDuration(),
                callback: false
            };
            for (var i in this.hooks) {
                if (this.hooks.hasOwnProperty(i)) {
                    if (typeof this.hooks[i].isMatching === 'function' && typeof this.hooks[i].getData === 'function') {
                        if (this.hooks[i].isMatching($el)) {
                            return this.hooks[i].getData($el, data);
                        }
                    }
                }
            }
            return data;
        },
        onAnchorClick: function (ev) {
            var currentHref = this.getCurrentHref(true);
            var elHash = ev.currentTarget.hash;
            var $el = $(ev.currentTarget.hash);
            if (elHash) {
                var elHref = this.stripHash(ev.currentTarget.href);
                if (elHref === currentHref) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.animate($el);
                }
            }
        },
        onAnimationBegin: function ($el, data) {
            $(window).triggerHandler('x4e:animated-anchors:onAnimationBegin', {$el: $el, data: data});
        },
        onAnimationComplete: function ($el, data) {
            $(window).triggerHandler('x4e:animated-anchors:onAnimationComplete', {$el: $el, data: data});
        },
        onStateChange: function () {
            var hash = this.getCurrentHash();
            if (hash) {
                var $el = $(hash);
                if (this.shouldAnimate($el)) {
                    this.animate($el, {
                        dontUpdatePushState: true
                    });
                }
            }
        }
    });

    X4e.AnimatedAnchors = AnimatedAnchors;
    window.X4e = X4e;

}) (this, jQuery);