var mysql      = require('mysql');

class MySQLHelper{
        constructor(){
            this.connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : 'buCYKS2?Xec;{mMnNE!~FaA^',
                database : 'simpsons'
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