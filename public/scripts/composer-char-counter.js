$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function(event) {
    const value = $(this).val();
    let counter = $(this).siblings().find('output')[0];
    counter.innerHTML = `${140 - value.length}`;    
    if (value.length > 140){
      // $(counter).css( "color", "red" );
      $(counter).removeClass('counter');
      $(counter).addClass('error');

    }else {
      // $(counter).css( "color", "black" );
      $(counter).addClass('counter');
      $(counter).removeClass('error');
    }
    
    
    
  });

});