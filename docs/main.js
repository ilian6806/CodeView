$(function () {

    var $container = $('#main-content');
    var $menus = $('.list-group-item');

    $.support.cors = true;
    $.ajaxPrefilter(function(options) {
        options.async = true;
    });

    var demos = [
        'basics',
        'jquery-plugin',
        'load-file'
    ];

    var partials = [
        'basics',
        'jquery-plugin',
        'load-file',
        'setup',
        'about'
    ];

    var initialPage = window.location.hash ? window.location.hash : '#setup';
    var $initialMenu = $menus.filter('[href="' + initialPage + '"]');

    function loadPartial(fileName) {

        if ((typeof fileName).toLowerCase() != 'string') {
            return;
        }

        fileName = fileName.replace('#', '');
        fileName = partials.indexOf(fileName) > -1 ? fileName : '404';

        $container.fadeOut(0).load('partials/' + fileName + '.phtml', function () {
            setTimeout(function () {
                $container.fadeIn(100);
            }, 1);
        });
    }

    function onMenuClick() {

        $menus.removeClass('active');
        $(this).addClass('active');

        if ($(this).data('target')) { // submenus
            return; 
        }

        loadPartial($(this).attr('href'));
    }

    // initialize main menu
    $menus.click(onMenuClick);

    // toggle demos if needed
    if (demos.indexOf(initialPage.replace('#', '')) > -1) {
        $menus.filter('[href="#demos"]').trigger('click');
    }

    // render initial template
    if ($initialMenu.length) {
        $initialMenu.trigger('click');
    } else {
        loadPartial('404');
    }
});