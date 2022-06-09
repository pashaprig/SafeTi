$(".users__slider").slick({
    dots: false,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        }
    ],
});

//range_slider
$(".user__range-slider").slider({
    min: 0,
    max: 8,
    step: 1,
    tooltip: "hide",
    slide: function (event, ui) {
        $(".users__slider").slick("slickGoTo", parseInt(ui.value));
    },
});

$(".btn--toogle").click(function(){
    $(this).prev(".review__text").toggleClass("review__text--open");
    $(this).toggleClass("open")
})