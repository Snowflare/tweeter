/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Single tweet render
  const createTweetElement = function(tweet) {
    return (
      `<article>
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
              ${moment(tweet.created_at).fromNow()}
            </p>
            <div>
              <a >🚩</a><a>🔗</a><a>❤️</a>
            </div>
          </footer>
        </article>`);
  };
  // All tweets render
  const renderTweets = function(tweets) {
    $('main section:nth-child(2)').empty();
    for (const tweet of tweets) {
      $('main section:nth-child(2)').prepend(createTweetElement(tweet));
    }
  };
  // Load tweets
  const loadtweets = function() {
    $.getJSON('/tweets')
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };
 
  // New Tweet listener

  $("form").submit(function(event) {
    event.preventDefault();
    const value = $(this).children('#tweet-text').val();
    if (value.length === 0) { //Validation
      $(this).siblings('.validation')[0].innerHTML = '⚠️Submission cannot be empty!⚠️'; //Error message injection

      $(this).siblings('.validation').slideDown('slow');
    } else if (value.length > 140) {
      $(this).siblings('.validation')[0].innerHTML = '⚠️Submission cannot be longer than 140 characters!⚠️'; //Error message injection
      $(this).siblings('.validation').slideDown('slow');
    } else {
      const data = $(this).serialize();
      $.post('/tweets', data)
        .then(function(response) {
          loadtweets();
        });
      $(this).siblings('.validation').hide('slow'); //Hide error text if tweet successful
      $(this).children('#tweet-text').val(''); // Empty textbox
      $(this).children('div').children('output')[0].innerHTML = '140'; // Reset counter
    }
  });

  // Compose button listener
  $(".button").on('click', function(event) {
    if ($("form").is(":hidden")) {
      $('form').slideDown('slow');// slide the form down
      $('textarea').focus();  // set focus on the textbox
    } else {
      $('form').hide('slow');
    }
  });
  
  // Escape function
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Initialize page with built-in database
  loadtweets();
});