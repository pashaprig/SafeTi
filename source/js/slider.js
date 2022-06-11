$('#info__slider').slick({
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  arrows: false,
});

$('#call__slider').slick({
  infinite: true,
  autoplay: true,
  speed: 3000,
  arrows: false,
  fade: true,
  zIndex: 0,
  pauseOnHover: false,
});

$('#services__slider').slick({
  infinite: true,
  speed: 300,
  zIndex: 0,
  prevArrow: "<button type='button' class='btn btn--inverse prev'><span>Назад</span></button>",
  nextArrow: "<button type='button' class='btn btn--inverse next'><span>Далее</span></button>",
});
