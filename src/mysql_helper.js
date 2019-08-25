require('dotenv').config()
var mysql      = require('mysql');

class MySQLHelper{
        constructor(){
            this.connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASS,
                database : process.env.DB_NAME
            });
            this.resutl = "";
        }
}

MySQLHelper.prototype.query = function( sql, args ) {
    return new Promise( ( resolve, reject ) => {
        this.connection.query( sql, args, ( err, rows ) => {
            if ( err )
                return reject( err );
            resolve( rows );
            this.close();
        } );
    } );
}

MySQLHelper.prototype.close = function(){
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }


exports.MySQLHelper = MySQLHelper