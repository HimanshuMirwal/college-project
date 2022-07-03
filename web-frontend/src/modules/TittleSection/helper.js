import $ from 'jquery';
function scrollLeft() {
    $(".wrapit").css("left", function() {
      return $(this).parent().position().left;
    });
  }
  
  $(".parentDiv").scroll(function() {
    scrollLeft();
  });
  
scrollLeft();