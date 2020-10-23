$(function(){

    // определяем touch устройство
    function isTouch(){return(('ontouchstart' in window)||(navigator.maxTouchPoints>0)||(navigator.msMaxTouchPoints>0));}

    // Плавный html-якорь
    $('a[href^="#"]').click(function(){
        const href = $(this).attr('href');
        const offsetAnchor = isTouch() ? 96 : 24;

        $('html, body').animate({
            scrollTop: $("[name=" + href.replace('#', '') + "]").offset().top - offsetAnchor}, 500);
        return false;
    });

});
