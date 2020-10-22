$(function(){

    // Плавный html-якорь
    $('a[href^="#"]').click(function(){
        const href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $("[name=" + href.replace('#', '') + "]").offset().top - 24}, 500);
        return false;
    });

});
