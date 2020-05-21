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
      ${tweet.content.text}
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
 

  $( "form" ).submit(function( event ) {
    event.preventDefault();
    const value = $(this).children('#tweet-text').val().length;
    console.log(value);
    
    if (value === 0) {
      alert("Submission cannot be empty!");
    } else if (value > 140) {
      alert("Submission cannot be longer than 140 characters!");
    } else {
      const data = $(this).serialize();
      $.post('/tweets', data)
        .then(function (response) {
        loadtweets()});
    }
    
   
  });
  const loadtweets = function(){
    $.getJSON('/tweets')
    .then(function (tweets) {
      renderTweets(tweets);  
  })};
  loadtweets();

});