(function() {
  $(document).ready(function() {
    $({
      countNum: 0
    }).animate({
      countNum: 999
    }, {
      duration: 1500,
      step: function() {
        $(".title_header").attr('data-num', 999 - Math.floor(this.countNum));
      },
      complete: function() {
        if ($(".title_header").attr('data-num') !== 0) {
          $(".title_header").attr('data-num', 0);
        }
        $(".title_header").addClass('hide');
        setTimeout(function() {
          $(".title_header").attr('data-num', "😎");
          return $(".title_header").removeClass('hide');
        }, 400);
      }
    });
  });

}).call(this);
