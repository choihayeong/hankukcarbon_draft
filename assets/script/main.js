$(function() {
    // kvSwiper
    const kvSwiper = new Swiper('.main-visual__bg', {
        effect:'fade',
        loop:true,
        pagination: {
            el: '.main-visual__indicator',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        on : {
            slideChange: function () {
                var activeIndex = this.activeIndex,
                    realIndex = this.slides[activeIndex].getAttribute('data-swiper-slide-index');
                $('.main-visual__indicator > span').removeClass("active");
                $('.main-visual__indicator > span').eq(realIndex).addClass("active");
            },
            init: function() {
                setTimeout(function() {
                    $('.main-visual__indicator > span').eq(0).addClass('active');
                }, 100)
            }
        },
    })
    kvSwiper.autoplay.stop();

    setTimeout(function() {
        kvSwiper.autoplay.start();
    }, 100)

    // section activating
    const $sections = $('.section');
    $sections.eq(0).addClass('active').siblings().removeClass('active'); // initial

    $(window).scroll(function() {
        let scTop = $(this).scrollTop(),
            sectionsTop = [], currentSection = 0;

        if (scTop > 100) {
            $('#header').addClass('on');
        } else {
            $('#header').removeClass('on');
        }

        $sections.each((index, ele) => {
            sectionsTop.push(ele.offsetTop);
        })

        for (let i = 0; i < sectionsTop.length; i++) {
            if (scTop >= sectionsTop[i] - 170 && scTop < sectionsTop[i+1] - 170) {
                $sections.eq(i).addClass('active').siblings().removeClass('active');
                currentSection = i;
            }
            if (scTop >= sectionsTop[sectionsTop.length - 1] - 170) {
                $sections.eq(sectionsTop.length - 1).addClass('active').siblings().removeClass('active');
                currentSection = i;
            }
        }
        // section slogan effect (mixed with AOS)
        $('[data-aos="focus"].aos-animate').each((index, item) => {
            let current = $('[data-aos="focus"].aos-animate').length;

            if (index === current - 1) {
                let currentFocus = $($('[data-aos="focus"].aos-animate')[index]);

                currentFocus.addClass('active').siblings().removeClass('active');
            }
        })

        var wh = $(window).innerHeight(), 
            overlayTop = $('.main-business__contents').offset().top, 
            $items = $('.main-business__list > li'), 
            $overlayTitles = $('.overlay__title'),
            $overlayRoles = $('.overlay__role'),
            $overlayButtons = $('.overlay__buttons > .buttons'),
            itemsTop = [],
            itemsHeight = []

        $items.each((index, ele) => {
            itemsTop.push(ele.offsetTop + overlayTop - wh);
        })
        $items.each((index, ele) => {
            itemsHeight.push(ele.offsetHeight);
        })

        for (var i = 0; i < itemsTop.length; i++) {
            if (scTop >= itemsTop[i] + (itemsHeight[i]) + 100 && scTop < itemsTop[i+1] + (itemsHeight[i]) + 100) {
                $items.eq(i).addClass('active').siblings().removeClass('active');
                $overlayTitles.eq(i).addClass('active').siblings().removeClass('active');
                $overlayRoles.eq(i).addClass('active').siblings().removeClass('active');
                $overlayButtons.eq(i).addClass('active').siblings().removeClass('active');
            }
            if (scTop >= itemsTop[itemsTop.length - 1] + (itemsHeight[i]) + 100) {
                $items.eq(itemsTop.length - 1).addClass('active').siblings().removeClass('active');
                $overlayTitles.eq(itemsTop.length - 1).addClass('active').siblings().removeClass('active');
                $overlayRoles.eq(itemsTop.length - 1).addClass('active').siblings().removeClass('active');
                $overlayButtons.eq(itemsTop.length - 1).addClass('active').siblings().removeClass('active');
            }

        }
        if (scTop < itemsTop[0] + (itemsHeight[0]) + 100) {
            $items.eq(0).removeClass('active').siblings().removeClass('active');
            $overlayTitles.eq(0).removeClass('active').siblings().removeClass('active');
            $overlayRoles.eq(0).removeClass('active').siblings().removeClass('active');
            $overlayButtons.eq(0).removeClass('active').siblings().removeClass('active');
        }
    })

    // split text (counter)
    for (var i = 0; i < $('.main-company__number strong').length; i++) {
        let numberText = $('.main-company__number strong').eq(i).text();
        numberText = numberText.split('').map((item, index) => {
            item = `<span class="char__inner">
                <span class="char__box">${item}</span>
            </span>`;

            return item;
        });
        $('.main-company__number strong').eq(i).html(numberText);
    }
    for (var i = 0; i < $('.overlay__title').length; i++) {
        let titleText = $('.overlay__title').eq(i).text();
        titleText = titleText.split('').map((item, index) => {
            item = `<span class="char__inner">
                <span class="char__box">${item}</span>
            </span>`;

            return item;
        });
        $('.overlay__title').eq(i).html(titleText);
    }
})