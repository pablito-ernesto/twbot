require('dotenv').config()
var Twit = require('twit')

function TwitterHelper(){
    var T = new Twit({
        consumer_key:         process.env.CONSUMER_KEY,
        consumer_secret:      process.env.CONSUMER_SECRET,
        access_token:         process.env.ACCESS_TOKEN,
        access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
    })
}
TwitterHelper.prototype.createTweet = function (text) {
    T.post('statuses/update', { status: text }, function(err, data, response) {
        console.log(data)
    })
}


//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
function searchTweets() {
    T.get('search/tweets', {q: 'banana since:2011-07-11', count: 100}, function (err, data, response) {
        console.log(data)
    })
}

//
//  get the list of user id's that follow @tolga_tezel
//
function listOfFollowers() {
    T.get('followers/ids', {screen_name: 'tolga_tezel'}, function (err, data, response) {
        console.log(data)
    })
}

//
// Twit has promise support; you can use the callback API,
// promise API, or both at the same time.
//
function promiseExample()
{
    T.get('account/verify_credentials', {skip_status: true})
        .catch(function (err) {
            console.log('caught error', err.stack)
        })
        .then(function (result) {
            // `result` is an Object with keys "data" and "resp".
            // `data` and `resp` are the same objects as the ones passed
            // to the callback.
            // See https://github.com/ttezel/twit#tgetpath-params-callback
            // for details.

            console.log('data', result.data);
        })
}

module.export.TwitterHelper = TwitterHelper