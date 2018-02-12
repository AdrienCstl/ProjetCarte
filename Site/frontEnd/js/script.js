$(document)
    .ready(function () {
        $(document).on("scroll", onScroll);

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function () {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function () {
                    $('.fixed.menu').transition('fade out');
                }
            })
            ;

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item')
            ;
        $('#getStarted').click(function () {
            $('html, body').animate({
                scrollTop: $("#map").offset().top
            }, 1000);
        });
        $('.s1').click(function () {

            $('.ss1').addClass('active');
            console.log($('.ss1'));
        });
        /*
                $('.s1').click(function() {
                    $('html, body').animate({
                        scrollTop:        $("#top").offset().top
                    }, 1000);
                    $(".nav-container").children().removeClass("active");
                    $('.s1').addClass("active");
        
                    return false;
                });
                $('.s2').click(function() {
                    $('html, body').animate({
                        scrollTop:        $("#map").offset().top
                    }, 1000);
                    $(".nav-container").children().removeClass("active");
                    $('.s2').addClass("active");
        
                    return false;
                });
                $('.s3').click(function() {
                    $('html, body').animate({
                        scrollTop:        $("#stats").offset().top
                    }, 1000);
                    $(".nav-container").children().removeClass("active");
                    $('.s3').addClass("active");
                    return false;
                });
        */
        //smoothscroll
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
            $('a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');


            var target = this.hash,

                $target = $(target);
            if (target === "#top") {
                $('#navMenu div .s1').addClass('active');
            }
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top + 2
            }, 600, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });



    });


function onScroll(event) {

    var scrollPos = $(document).scrollTop();

    $('#menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));


        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {

            $('#menu a').removeClass("active"); //added to remove active class from all a elements
            currLink.addClass("active");
            $('#navMenu div a').removeClass('active');
            $('#navMenu div .s1').addClass('active');


        }
        else {
            currLink.removeClass("active");
        }
    });
}
