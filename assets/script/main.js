$(function() {
    const $wrap = $('.wrap'),
        $header = $('#header'),
        $main = $('#main'), 
        $mainWrap = $('.main__wrap'),
        $mainNav = $('.main__nav'),
        $mainIndicator = $('.main__indicator'),
        $pagerCurrent = $('.main-pager__current'),
        mainWidth = $mainWrap[0].offsetWidth,
        $visualScroll = $('.main-visual__scroll'),
        $serviceList = $('.main-service__list'),
        $mainLast = $('.main-last'),
        $footer = $('#footer'),
        $sections = $('.section'),
        $aboutList = $('.main-about__list'),
        $counterTranslate = $('.section--counter .translate'),
        $counterBg = $('.section--counter__bg'),
        $counterBgDim = $('.section--counter__dim'),
        $counterTitle = $('.main-counter__title'),
        $counterList = $('.main-counter__numbers');

    let sectionsObj;
        
    function setLayOut() {
        const sections = document.querySelectorAll('.section');
        const clientWidth = window.innerWidth;
        let sectionObj = [];

        sections.forEach((section, index) => {
            sectionObj.push({
                section: section,
                offsetLeft: section.offsetLeft,
                contentsWidth: section.offsetWidth,
                accContentsWidth: (section.offsetLeft + section.offsetWidth),
                clientOffsetLeft: section.offsetLeft - clientWidth,
                clientContentsWidth: (section.offsetLeft - clientWidth),
                clientAccContentsWidth: (section.offsetLeft + section.offsetWidth) - clientWidth
            });
        });

        return sectionObj;
    }

    sectionsObj = setLayOut();

    console.log(sectionsObj);

    let ww = window.innerWidth,
        mainMoveMax = (mainWidth - ww) * -1,
        s_pos = 0, t_pos = 0, f_pos = 0, listY = 0, ftIdx = 0, counterY = 0, aboutScCnt = 0;

    $visualScroll.click(function(e) {
        s_pos = -(ww+140);
        $mainWrap.attr('style', `transform:translate3d(${s_pos}px, 0, 0)`);
        $mainNav.addClass('active');
        $header.addClass('active');
        $sections.eq(1).addClass('active').siblings().removeClass('active');
    })

    function horizontalScroll(amount) {
        s_pos -= amount;
        $mainWrap.attr('style', `transform:translate3d(${s_pos}px, 0, 0)`);
        $mainWrap.attr('data-positionx', `${Math.abs(s_pos)}`);
        $header.addClass('sc_on');
        
        // first section
        if(s_pos > 0) {
            s_pos = 0;
            $mainWrap.attr('style', `transform:translate3d(${s_pos}px, 0, 0)`);
            $header.removeClass('sc_on');
            return;
        }

        // after activating second section
        if (Math.abs(s_pos) >= ww+140) {
            s_pos = -(ww+140);
            $mainWrap.attr('style', `transform:translate3d(${s_pos}px, 0, 0)`);
            $mainWrap.attr('data-positionx', `${Math.abs(s_pos)}`);

            $mainNav.addClass('active');
            $header.addClass('active');
            $sections.eq(1).addClass('active').siblings().removeClass('active');

            listY += amount;
            $serviceList.attr('style', `transform:translate3d(0, -${listY/50}%, 0)`);
            if (listY >= 3000) {
                listY = 3000;
                // scrolling down after second section
                if (amount > 0) {
                    t_pos -= amount;
                    $mainWrap.attr('style', `transform:translate3d(${s_pos + t_pos}px, 0, 0)`);
                    $mainWrap.attr('data-positionx', `${Math.abs(s_pos + t_pos)}`);

                    // esg section (header white)
                    if (Math.abs(s_pos + t_pos) >= sectionsObj[2].offsetLeft && Math.abs(s_pos + t_pos) < sectionsObj[3].offsetLeft) {
                        $sections.eq(2).addClass('active').siblings().removeClass('active');
                        // $wrap.addClass('white');
                        esgSwiper.autoplay.start(5000);
                        $mainIndicator.text('Social Activity');
                        $pagerCurrent.text('03');
                        if (Math.abs(s_pos + t_pos) >= sectionsObj[2].offsetLeft + 945) {
                            $wrap.addClass('white');
                        }
                    } else {
                        esgSwiper.autoplay.stop();
                    }
                    if (Math.abs(s_pos + t_pos) > sectionsObj[2].clientOffsetLeft && Math.abs(s_pos + t_pos) < sectionsObj[3].clientOffsetLeft) {
                        $sections.eq(2).addClass('in').siblings().removeClass('in');
                        $header.addClass('sc_on--white');
                    }
                    // about section
                    if (Math.abs(s_pos + t_pos) >= sectionsObj[3].offsetLeft && Math.abs(s_pos + t_pos) < sectionsObj[4].offsetLeft) {
                        $sections.eq(3).addClass('active').siblings().removeClass('active');
                        $wrap.removeClass('white');
                        $mainIndicator.text('Transcosmos');
                        $pagerCurrent.text('04');

                        console.log(sectionsObj[3].offsetLeft - Math.abs(t_pos));

                        aboutScCnt += amount/100;

                        if (aboutScCnt >= 3) {
                            $sections.eq(3).addClass('slide');
                        }
                        if (aboutScCnt >= 8) {
                            $aboutList.addClass('second');
                        }
                        if (aboutScCnt >= 12) {
                            $aboutList.addClass('third');
                            $counterTranslate.attr('style', `transform:translateX(-10%)`);
                        }
                    }
                    if (Math.abs(s_pos + t_pos) > sectionsObj[3].clientOffsetLeft && Math.abs(s_pos + t_pos) < sectionsObj[4].clientOffsetLeft) {
                        $sections.eq(3).addClass('in').siblings().removeClass('in');
                        $header.removeClass('sc_on--white');
                    }
                    // counter section (header white)
                    if (Math.abs(s_pos + t_pos) >= sectionsObj[4].offsetLeft && Math.abs(s_pos + t_pos) < sectionsObj[5].offsetLeft) {
                        $sections.eq(4).addClass('active').siblings().removeClass('active');
                        $wrap.addClass('white');
                        $mainIndicator.text('Numbers');
                        $pagerCurrent.text('05');
                        $counterTranslate.attr('style', `transform:translateX(0)`);

                        if (Math.abs(s_pos + t_pos) >= sectionsObj[4].clientAccContentsWidth) {
                            t_pos = (sectionsObj[4].clientAccContentsWidth - Math.abs(s_pos)) * -1;
                            $mainWrap.attr('style', `transform:translate3d(-${sectionsObj[4].clientAccContentsWidth }px, 0, 0)`);
                            $mainWrap.attr('data-positionx', `${Math.abs(sectionsObj[4].clientAccContentsWidth)}`);


                            counterY += amount;
                            $counterList.attr('style', `transform:translate3d(0, ${80-counterY/20}%, 0)`);
                            $counterTitle.attr('style', `transform:translate3d(-${counterY/20}%, 0, 0)`);
                            $counterBg.attr('style', `background-position-x:${counterY/50}%`);
                            $counterBgDim.attr('style', `opacity:${(counterY/50)/100}`);

                            if (counterY >= 2000) {
                                counterY = 2000;

                                if (amount > 0) {
                                    f_pos -= amount;
                                    $mainWrap.attr('style', `transform:translate3d(${s_pos + t_pos + f_pos}px, 0, 0)`);
                                    $mainWrap.attr('data-positionx', `${Math.abs(s_pos + t_pos + f_pos)}`);

                                    if (Math.abs(s_pos + t_pos + f_pos) > sectionsObj[4].clientOffsetLeft && Math.abs(s_pos + t_pos + f_pos) < sectionsObj[5].clientOffsetLeft) {
                                        $sections.eq(4).addClass('in').siblings().removeClass('in');
                                        $header.addClass('sc_on--white');
                                    }

                                    // news section
                                    if (Math.abs(s_pos + t_pos + f_pos) >= sectionsObj[5].offsetLeft && Math.abs(s_pos + t_pos + f_pos) < sectionsObj[6].offsetLeft) {
                                        $sections.eq(5).addClass('active').siblings().removeClass('active');
                                        $wrap.removeClass('white');
                                        $mainIndicator.text('Read the latest news');
                                        $pagerCurrent.text('06');
                                    }
                                    if (Math.abs(s_pos + t_pos + f_pos) > sectionsObj[5].clientOffsetLeft && Math.abs(s_pos + t_pos + f_pos) < sectionsObj[6].clientOffsetLeft) {
                                        $sections.eq(5).addClass('in').siblings().removeClass('in');
                                        $header.removeClass('sc_on--white');
                                    }
                                    // last section (header white)
                                    if (Math.abs(s_pos + t_pos + f_pos) >= sectionsObj[6].offsetLeft) {
                                        $sections.eq(6).addClass('active').siblings().removeClass('active');
                                        $wrap.addClass('white');
                                        $mainIndicator.text('Life');
                                        $pagerCurrent.text('07');
                                    }
                                    if (Math.abs(s_pos + t_pos +f_pos) > sectionsObj[6].clientOffsetLeft) {
                                        $sections.eq(6).addClass('in').siblings().removeClass('in');
                                        $header.addClass('sc_on--white');
                                    }
                                    if (Math.abs(s_pos + t_pos + f_pos) > Math.abs(mainMoveMax)) {
                                        $mainWrap.attr('style', `transform:translate3d(${mainMoveMax + 10}px, 0, 0)`);
                                        $mainWrap.attr('data-positionx', `${Math.abs(mainMoveMax + 10)}`);
                                        ftIdx++;
                                        if (ftIdx >= 4) {
                                            $mainLast.addClass('active');
                                            $footer.addClass('active');
                                        }

                                        return;
                                    }
                                }
                            }   
                        }
                    }
                }
                if (amount < 0) {
                    ftIdx = 0;
                    $mainLast.removeClass('active');
                    $footer.removeClass('active');
                }
            }

        } else {
            $mainNav.removeClass('active');
            $mainLast.removeClass('active');
            $footer.removeClass('active');
            $header.removeClass('active');
            t_pos = 0;
            listY = 0;
        }
    }

    const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
    const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

    let scroll = {cache: 0, current: 0};
    const allImgs = [...document.querySelectorAll('.skew')];
    function skewAnimation() {
        scroll.current = $mainWrap.attr('data-positionx');
        const distance = scroll.current - scroll.cache;
        scroll.cache = scroll.current;
        let skewVal = map(distance, -50, 50, -10, 10);
        allImgs.forEach(el => el.style.transform = `skewX(${clamp(skewVal, -10, 10 / 2)}deg)`);
        setTimeout(function() {
            allImgs.forEach(el => el.style.transform = 'skewX(0deg)');
        }, 1000)
    }
    
    $main.on('mousewheel',function(e){
        e.preventDefault;
        horizontalScroll(e.originalEvent.deltaY);
        skewAnimation();
    });

    /* kvSwiper */
    const kvNumber = $('.main-visual__number'), kvTitle = $('.main-visual__name');
    const kvSwiper = new Swiper('.main-visual', {
        effect:'fade',
        pagination: {
            el: '.main-visual__bullet',
            clickable: true,
        },
        autoplay: {
            delay:5000,
            disableOnInteraction:false
        },
        on: {
            slideChange: function() {
                let index = this.activeIndex,
                    kvName = $('.main-visual__item').eq(index)[0].dataset.name;
                kvNumber.text(`0${index + 1}`);
                kvTitle.text(kvName);
            }
        }
    })
    /* esgSwiper */
    const esgTitle = $('.main-esg__title'), esgDescription = $('.main-esg__description'), esgContentsImg = $('.main-esg__contents img');
    const esgSwiper = new Swiper('.main-esg__image', {
        effect:'fade',
        pagination: {
            el: '.main-esg__indicator',
            clickable: true,
        },
        autoplay: {
            delay:8000,
            disableOnInteraction:false 
        },
        on: {
            slideChange: function() {
                let index = this.activeIndex,
                    esgName = $('.main-esg__item').eq(index)[0].dataset.name,
                    esgSource = $('.main-esg__item').eq(index)[0].dataset.source;
                esgContentsImg.attr('src', esgSource);
            }
        }
    })
    esgSwiper.autoplay.stop();
})
