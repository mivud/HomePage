/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    }).attr('id', 'mobile-nav');
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-nav"><i class="bi bi-list"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    function closeMobileNav() {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-toggle i').removeClass('bi-x-lg').addClass('bi-list');
      $('.mobile-nav-toggle').attr('aria-expanded', 'false');
      $('.mobile-nav-overly').fadeOut();
    }

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      var isActive = $('body').toggleClass('mobile-nav-active').hasClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('bi-list bi-x-lg');
      $(this).attr('aria-expanded', isActive ? 'true' : 'false');
      $('.mobile-nav-overly').toggle();
    });

    // Close the mobile nav when a link inside it is clicked (the tab
    // switch itself is handled by the section-tabs listener below)
    $(document).on('click', '.mobile-nav a', function() {
      if ($('body').hasClass('mobile-nav-active')) {
        closeMobileNav();
      }
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          closeMobileNav();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Section tabs: clicking a nav link hides/shows sections so only one is
  // visible at a time (panel-swap), and condenses the hero header — there
  // is no free-scrolling between sections to scroll-spy on.
  var header = document.getElementById('header');
  var tabSections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');

  function setActiveNavLink(hash) {
    navLinks.forEach(function(link) {
      link.parentElement.classList.toggle('active', link.getAttribute('href') === hash);
    });
  }

  function activateTab(hash) {
    setActiveNavLink(hash);

    if (hash === '#header') {
      if (header) header.classList.remove('is-condensed');
      tabSections.forEach(function(section) {
        section.classList.remove('is-active');
      });
      return;
    }

    if (header) header.classList.add('is-condensed');
    tabSections.forEach(function(section) {
      section.classList.toggle('is-active', ('#' + section.id) === hash);
    });
  }

  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    var hash = this.getAttribute('href');
    if (!hash || hash.charAt(0) !== '#' || !document.querySelector(hash)) return;

    e.preventDefault();
    activateTab(hash);
  });

  // Activate the matching tab immediately if the URL was opened with a
  // deep-link hash (e.g. index.html#experience).
  if (window.location.hash && document.querySelector(window.location.hash)) {
    activateTab(window.location.hash);
  }

})(jQuery);
