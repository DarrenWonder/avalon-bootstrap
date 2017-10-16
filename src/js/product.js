require.config({
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/1.9.1/jquery.min',
    modernizr: 'https://cdn.bootcss.com/modernizr/2.8.3/modernizr.min',
    domReady: 'https://cdn.bootcss.com/require-domReady/2.0.1/domReady.min'
  },
  shim: {
  }
})
require(['jquery', 'type-check', 'domReady!', 'modernizr'], function ($, check) {
  check('.dest-list>li')
})
