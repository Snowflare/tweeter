/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = function(tweet) {
    return (`<article>
    <header>
      <img src=${tweet.user.avatars}> 
      <div class="name">
        <p>${tweet.user.name}</p>
        <p class="lastname">${tweet.user.handle}</p>
      </div>
      
    </header>
    <p>
      ${escape(tweet.content.text)}
    </p>
    <footer>
      <p>
        ${tweet.created_at}
      </p>
      <div>
        <a >🚩</a><a>🔗</a><a>❤️</a>
      </div>
    </footer>
  </article>`);
  }
  const renderTweets = function(tweets) {
    $('main section:nth-child(2)').empty()
    for (const tweet of tweets){
      $('main section:nth-child(2)').prepend(createTweetElement(tweet));
    }
  }
  const loadtweets = function(){
    $.getJSON('/tweets')
    .then(function (tweets) {
      renderTweets(tweets);  
  })};
 

  $( "form" ).submit(function( event ) {
    event.preventDefault();
    const value = $(this).children('#tweet-text').val();    
    if (value.length === 0) {
      $(this).children('div').children('.validation')[0].innerHTML = 'Submission cannot be empty!';
      $(this).children('div').children('.validation').css('color', 'red');
    } else if (value.length > 140) {
      $(this).children('div').children('.validation')[0].innerHTML = 'Submission cannot be longer than 140 characters!';
      $(this).children('div').children('.validation').css('color', 'red');
    } else {
      const data = $(this).serialize();
      $.post('/tweets', data)
        .then(function (response) {
        loadtweets();
        
      });
      $(this).children('div').children('.validation').css('color', 'transparent');
    }
    
    //$(this).children('#tweet-text').val(''); // Empty textbox   
  });

  
  // Escape function
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  // Initialize page
  loadtweets();

});