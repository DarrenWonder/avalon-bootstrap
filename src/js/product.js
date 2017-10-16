require.config({
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/1.9.1/jquery.min',
        modernizr: 'https://cdn.bootcss.com/modernizr/2.8.3/modernizr.min',
        domReady: 'https://cdn.bootcss.com/require-domReady/2.0.1/domReady.min',
        avalon: 'vendor/avalon'
    },
    shim: {
    }
});
require(['jquery', 'avalon', 'type-check', 'domReady!', 'modernizr' ], function($, avalon, check) {


    check('.dest-list>li');
    check('.type-list>li');
});
