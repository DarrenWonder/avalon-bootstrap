define(['jquery'], function ($) {
  function init () {
    var overlay = $('.md-overlay')
    $('.md-trigger').each(function () {
      var modal = $('#' + $(this).data('modal'))
      var close = $('.close', modal)
      var self = this
      function removeModal (hasPerspective) {
        // classie.remove( modal[0], 'md-show' );

        modal.removeClass('md-show')
        $(document.documentElement).css('overflow', '')

        if (hasPerspective) {
          // classie.remove( document.documentElement, 'md-perspective' );
          $(document.documentElement).removeClass('md-perspective')
        }
      }

      function removeModalHandler () {
        removeModal($(self).hasClass('md-setperspective'))
      }

      $(this).on('click.modal', function () {
        // classie.add( modal[0], 'md-show' );
        modal.addClass('md-show')
        $(document.documentElement).css('overflow', 'hidden')
        overlay.off('click', removeModalHandler)
        overlay.on('click', removeModalHandler)

        if ($(self).hasClass('md-setperspective')) {
          setTimeout(function () {
            // classie.add( document.documentElement, 'md-perspective' );
            $(document.documentElement).addClass('md-perspective')
          }, 25)
        }
      })

      close.on('click.modal', function (ev) {
        ev.stopPropagation()
        removeModalHandler()
      })
    })
  }

  init()
})
