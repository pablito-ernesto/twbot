var TwitterHelper = require('./src/tw_helper').TwitterHelper;
var MySQLHelper = require('./src/mysql_helper').MySQLHelper;


var twHelper = new TwitterHelper()
var  mySQLHelper = new MySQLHelper()

let query ="SELECT  e.title as title, e.season as season, e.number_in_season ,sl.spoken_words as spoken_words " +
    "FROM script_lines_homer AS sl " +
    "INNER JOIN episode e on e.id = sl.episode_id " +
    "JOIN (SELECT ROUND(RAND() * ( " +
    "SELECT MAX(id) FROM script_lines_homer )) AS id) AS x " +
    "WHERE sl.id = x.id LIMIT 1"
mySQLHelper.query(query).then(rows => {
    let homer_said = rows[0].spoken_words;
    let episode = "Season: " + rows[0].season + "\nEpisode: " + rows[0].number_in_season
    twHelper.createTweet(homer_said).then(data =>{
        twHelper.replyTweet(data.id_str,episode)
        }
    )
    //agregar captura de pantalla
})
