$.fn.slider = function (number, T, bool) {
  var sliderContainer = $(this),
    sliderList = $(sliderContainer).find('.slider-list'),
    indicator = $(sliderContainer).find('.slider-indicator-btn'),
    prev = $(sliderContainer).find('.slider-control-prev'),
    next = $(sliderContainer).find('.slider-control-next'),
    width = $(sliderContainer).width(),
    timer = null,
    index = 1,
    distance = 0,
    time = T ? T : 3000,
    flag = true;
  
  //判断是否需要自动播放
  if (bool === false) {
    flag = false;
  }
  if (flag) {
    autoPlay();
  }
  //鼠标进入停止自动播放
  sliderContainer.on('mouseenter', function () {
    clearInterval(timer);
    prev.show();
    next.show();
  });
  //鼠标离开重新开启自动播放
  sliderContainer.on('mouseleave', function () {
    if (flag) {
      autoPlay();
    }
    prev.hide();
    next.hide();
  });
  next.on('click', autoPlayHandler);
  prev.on('click', PrevHandler);
  indicator.on('mouseenter', indicatorHandler);
  
  //定时器自动播放
  function autoPlay() {
    timer = setInterval(autoPlayHandler, time);
  }
  
  //index--
  function PrevHandler() {
    index--;
    if (index < 1) {
      index = number;
      var value = (number + 1) * width * -1;
      $(sliderList).css('left', value);
    }
    MySlider();
  }

  //index++
  function autoPlayHandler() {
    index++;
    if (index > number) {
      sliderList.css('left', 0);
      index = 1;
    }
    MySlider();
  }
  
  //indicatorBtn执行函数
  function indicatorHandler() {
    index = $(this).index() + 1;
    MySlider();
  }
  
  //动画函数
  function MySlider() {
    //每次移动的距离
    distance = width * index * -1;
    //移动图片
    sliderList.animate({
      left: distance
    }, 300);
    //indecator同步
    indicator.removeClass('active').eq(index - 1).addClass('active');
  }
};