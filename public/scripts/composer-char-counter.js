$(document).ready(function() {
  // --- our code goes here ---
  const $textbox = jQuery('#tweet-text');
  $textbox.on('keyup', function(event) {
    console.log(event);
    const value = $textbox.val();
    console.log(value);
    let $count = $('output');
    if (value.length > 140){
      $count.text(`-${value.length - 140}`);
      $count.css( "color", "red" );
    }else {
      $count.text(140 - value.length);
      $count.css( "color", "black" );
    }
    
    
    
  });

});