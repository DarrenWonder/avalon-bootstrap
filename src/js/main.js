require.config({
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/1.9.1/jquery.min',
        bootstrap: 'https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min',
        avalon: 'vendor/avalon',
        modernizr: 'https://cdn.bootcss.com/modernizr/2.8.3/modernizr.min',
        domReady: 'https://cdn.bootcss.com/require-domReady/2.0.1/domReady.min',
        flexSlider: 'https://cdn.staticfile.org/flexslider/2.6.3/jquery.flexslider.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'flexSlider': {
            deps: ['jquery'],
            exports: 'jQuery.fn.flexslider'
        }
    }
});
require(['jquery', 'flexSlider', "bootstrap",  "modernizr", 'modal', "ie-fix", "domReady!"], function($) {
    $('.flexslider.main').flexslider({
        animation: "slide",
        easing: "swing",
        direction: "horizontal",
        slideshowSpeed: 5000,
        directionNav: false
    });

    $('.flexslider.about').flexslider({
        animation: "fade",
        controlNav: false,
        prevText: '',
        nextText: '',
        pausePlay: true
    });
});
