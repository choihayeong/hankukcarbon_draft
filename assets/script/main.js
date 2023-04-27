$(function() {
    function setLayOut() {
        var pageHeight = window.pageYOffset;
        var clientHeight = window.innerHeight;
        var sections = document.querySelectorAll('section');
        var sectionObj = [];

        sections.forEach((section, index) => {
            sectionObj.push({
                section: section,
                offsetTop: section.offsetTop,
                contentsHeight: section.offsetHeight,
                accContentsHeight: (section.offsetTop + section.offsetHeight),
                clientOffsetTop: section.offsetTop - clientHeight,
                clientContentsHeight: (section.offsetTop - clientHeight),
                clientAccContentsHeight: (section.offsetTop + section.offsetHeight) - clientHeight
            });
        });

        return sectionObj;
    }

    function scrollLoop(sectionsObj) {
        var scTop = $(window).scrollTop();
        var scRatio;

        for (let i = 0; i < sectionsObj.length; i++) {
            scRatio = (scTop - sectionsObj[i].clientOffsetTop) / sectionsObj[i].contentsHeight;
            if (scTop >= sectionsObj[i].clientContentsHeight && scTop < sectionsObj[i].clientAccContentsHeight) {
                switch (i) {
                    case 0:
                        break;
                    case 1:
                        // intro__slogan
                        var $introSlogan = $('.main-intro--business .main-intro__slogan');
                        if (scTop + $(window).height() > $('.main-intro--business')[0].offsetHeight + $('.main-intro--business')[0].offsetTop - 300) {
                            var introAccHeight = sectionsObj[i].accContentsHeight - (sectionsObj[i].contentsHeight - $('.main-intro--business')[0].offsetHeight)

                            if (scTop < introAccHeight) {
                                var introScRatio = scTop / (introAccHeight - 300);
                                if (introScRatio >= 0.4 && introScRatio < 0.45) {
                                    $introSlogan.find('li').eq(0).addClass('active').siblings().removeClass('active');
                                }
                                if (introScRatio >= 0.45 && introScRatio < 0.5) {
                                    $introSlogan.find('li').eq(1).addClass('active').siblings().removeClass('active');
                                }
                                if (introScRatio >= 0.5 && introScRatio < 0.55) {
                                    $introSlogan.find('li').eq(2).addClass('active').siblings().removeClass('active');
                                }
                            }
                        }
                        break;
                    case 2:
                        break;
                    case 3:
                        // intro__slogan
                        var $introSlogan = $('.main-intro--company .main-intro__slogan');

                        if (scTop + $(window).height() > $('.main-intro--company')[0].offsetHeight + $('.main-intro--company')[0].offsetTop - 300) {
                            var introAccHeight = sectionsObj[i].accContentsHeight - (sectionsObj[i].contentsHeight - $('.main-intro--company')[0].offsetHeight)

                            console.log(scTop + $(window).height());
                            console.log(introAccHeight);

                            if (scTop < introAccHeight) {
                                var introScRatio = scTop / (introAccHeight - 300);
                                // console.log(introScRatio);
                                if (introScRatio >= 0.4 && introScRatio < 0.45) {
                                    console.log('a');
                                    $introSlogan.find('li').eq(0).addClass('active').siblings().removeClass('active');
                                }
                                if (introScRatio >= 0.45 && introScRatio < 0.5) {
                                    console.log('b');

                                    $introSlogan.find('li').eq(1).addClass('active').siblings().removeClass('active');
                                }
                                if (introScRatio >= 0.5 && introScRatio < 0.55) {
                                    console.log('c');

                                    $introSlogan.find('li').eq(2).addClass('active').siblings().removeClass('active');
                                }
                            }
                        }
                        // console.log('company');
                        break;
                    case 4:
                        console.log('rnd')
                        break;
                    case 5:
                        console.log('recruit');
                        break;
                }
            }
        }
    }

    var sectionsObj;

    $(window).on('load', function() {
        sectionsObj = setLayOut();
        console.log(sectionsObj);
        scrollLoop(sectionsObj);
        $(window).scroll(function() {
            scrollLoop(sectionsObj);
        });
    });
    $(window).on('resize',function() {
        sectionsObj = setLayOut();
    });
});