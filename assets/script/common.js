$(function() {
    // AOS
    AOS.init({
        duration: 800,
    });
    // header
    $('.gnb').on('mouseenter', function() {
        $('#header').addClass('hover');
    })
    $('#header').on('mouseleave', function() {
        $('#header').removeClass('hover');
        $('.gnb__left > li').removeClass('active');
        $('.gnb__right > li').removeClass('active');
        $('.lnb__left > ul').removeClass('active');
        $('.lnb__right > ul').removeClass('active');
    })
    $('.gnb__left > li, .lnb__left > ul').on('mouseenter', function() {
        let index = $(this).index();
        $('.gnb__left > li').eq(index).addClass('active').siblings().removeClass('active');
        $('.lnb__left > ul').eq(index).addClass('active').siblings().removeClass('active');
    })
    $('.gnb__left > li, .lnb__left > ul').on('mouseleave', function() {
        $('.gnb__left > li').removeClass('active');
        $('.lnb__left > ul').removeClass('active');
    })
    $('.gnb__right > li, .lnb__right > ul').on('mouseenter', function() {
        let index = $(this).index();
        $('.gnb__right > li').eq(index).addClass('active').siblings().removeClass('active');
        $('.lnb__right > ul').eq(index).addClass('active').siblings().removeClass('active');
    })
    $('.gnb__right > li, .lnb__right > ul').on('mouseleave', function() {
        $('.gnb__right > li').removeClass('active');
        $('.lnb__right > ul').removeClass('active');
    })
    $('.snb .lnb__link').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.snb__list').slideToggle();
    })
})