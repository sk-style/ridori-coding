$(function(){

/* ===========================================================
   ページ共通
============================================================ */
/* wow
------------------------------------------------- */
new WOW().init();


/* カスタムプロパティの設定（ブラウザの可視領域100%の高さ）
------------------------------------------------- */
var height = window.innerHeight;
document.documentElement.style.setProperty( '--vh', height/100 + 'px');


/* AndroidのみNoto Serif JPを読み込む
------------------------------------------------- */
if (/Android/i.test(navigator.userAgent)) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap';
  document.head.appendChild(link);
};


/* drawer
------------------------------------------------- */
var icon = $('.dnav-icon');
var close = $('.dnav-close');
var link = $('.dnav').find('a');

icon.on('click', function() {
  $('body').toggleClass('_open');
});
close.add(link).on('click', function() {
  if ($('body').hasClass('_open')) {
    $('body').toggleClass('_open');
  }
});


/* スムーススクロール
------------------------------------------------- */
$('a[href^="#"]').click(function() {
    let speed = 600;
    let id = $(this).attr('href');
    let target = $('#' == id ? 'html' : id);
    let position = $(target).offset().top;
    $('html, body').animate(
        {
        scrollTop: position
        },
        speed
        );
    return false;
});


/* トップに戻るボタン
------------------------------------------------- */
var pagetop = $('#js-totop');
let header = $('header').innerHeight();

pagetop.hide();
$(window).scroll(function() {
    if (window.matchMedia( '(min-width: 1077px)' ).matches) {
      if($(this).scrollTop() > header) {
          pagetop.fadeIn(500)
      } else {
          pagetop.fadeOut(300)
          return false;
      }
    }
    return false;
  }
);


/* swiper1  [ pop ・ other （レスポンシブ表示）] 
------------------------------------------------- */
let swiper1;
let swiper1Bool;
const breakPoint = 1076;
var elems = document.querySelectorAll('#js-pop, #js-other');

window.addEventListener('load',()=>{
  if( breakPoint < window.innerWidth){
    swiper1Bool = false;
  } else {
    createSwiper();
    swiper1Bool = true;
  }
},false);

window.addEventListener('resize',()=>{
  if( breakPoint < window.innerWidth && swiper1Bool){
    swiper1.destroy(false,true);
    swiper1Bool = false;
  } else if( breakPoint >= window.innerWidth && !(swiper1Bool)) {
    createSwiper();
    swiper1Bool = true;
  }
  },false);

const createSwiper = () =>{
  swiper1 = new Swiper(elems, {
    effect: 'fade',
    loop: true,
    speed: 500,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
        reverseDirection: false
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });
  return false;
}


/* swiper2  [ guide ] 
------------------------------------------------- */
let swiper2 = new Swiper('#js-guide-pic', {
    loop: true,
    speed: 1000,
    autoplay: {
		delay: 5000,
		stopOnLastSlide: false,
		disableOnInteraction: false,
		reverseDirection: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
  },
});


/* タブメニュー [ contact ] 
------------------------------------------------- */
var tab = $('#js-contact-list_tab').children('li');
var body = $('#js-contact-list_body').children('li');

tab.click(function() {
    var index = tab.index(this);
    tab.removeClass('_active');
    $(this).addClass('_active');
    body.removeClass('_active').eq(index).addClass('_active');
    return false;
});


/* ===========================================================
    topページ
============================================================ */
/*  side navi表示 
------------------------------------------------- */
var path = location.pathname
var dnav = $('.dnav-menu')
var snav = $('.snav')

if (path == '/index.html') {
  dnav.hide();
  snav.hide();
$(window).on('scroll', function() {
if (window.matchMedia( '(max-width: 1076px)' ).matches) {
    if ($(this).scrollTop() > 100) {
      dnav.fadeIn(400);
    } else {
      dnav.fadeOut(100);
    }
    return false;
  } else {
    if ($(this).scrollTop() > 100) {
      snav.fadeIn(400);
    } else {
      snav.fadeOut(100);
    }
    return false;
  }
});
}


/* simplyScroll [ food ] 
------------------------------------------------- */
$('#js-food-list').simplyScroll({
  autoMode: 'loop',
  speed: 1,
  frameRate: 24,
  horizontal: true,
  pauseOnHover: false,
  pauseOnTouch:  false,
});


/* スライドダウン [ pickup ] 
------------------------------------------------- */
$('#js-pickup a').click(function() {
  $('.news-dtit:first').next().slideDown(300);
  $('.news-dtit:first').addClass('_open');
  return false;
});


/* スライドトグル [ news ] 
------------------------------------------------- */
$('.news-dtit').click(function() {
    $(this).next().slideToggle(300);
    $(this).toggleClass('_open');
    return false;
});


/* ===========================================================
    お品書きページ
============================================================ */
/* スライドトグル [ catlg ] 
------------------------------------------------- */
$('.catlg-dtit').click(function() {
    $(this).next().slideToggle();
    $(this).toggleClass('_open');
    return false;
});


/* スライドトグル [ course ] 
------------------------------------------------- */
var head = $('#js-course-head')
var data = $('#js-course-def')

head.on('click', function() {
  head.next().slideToggle();
  head.toggleClass('_open');
  $(window).on('resize', function() {
    if( 'none' == head.css('pointer-events') ){
      data.attr('style','');
    };
  });
  return false;
});

$(window).bind('load', function() {
  if (window.matchMedia( '(max-width: 1076px)' ).matches) {
    if(document.URL.match(/..course/)) {
      head.next().slideToggle();
      head.addClass('_open');
      $(window).on('resize', function() {
        if( 'none' == head.css('pointer-events') ){
          data.attr('style','');
        };
      });
    };
  };
  return false;
});


});