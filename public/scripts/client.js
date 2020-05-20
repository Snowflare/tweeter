/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const $tweet = `<article>
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
</article>`
return $tweet;
}

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks likeva