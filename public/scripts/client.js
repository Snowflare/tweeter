/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]
  //const tweetData = {
    //   "user": {
    //     "name": "Newton",
    //     "avatars": "https://i.imgur.com/73hZDYK.png",
    //       "handle": "@SirIsaac"
    //     },
    //   "content": {
    //       "text": "If I have seen further it is by standing on the shoulders of giants"
    //     },
    //   "created_at": 1461116232227
    // }
     // renderTweets(data);

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
    // $('.container').empty()
    for (const tweet of tweets){
      $('.container').append(createTweetElement(tweet));
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

});