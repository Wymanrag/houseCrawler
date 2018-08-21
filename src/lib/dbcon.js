const { Pool, Client }  = require("pg");
const Promise = require("bluebird");

module.exports.queryDb = queryDb;
module.exports.queryDbUnique = queryDbUnique;
module.exports.startDbTransaction = startDbTransaction;
module.exports.endDbTransaction = endDbTransaction;

//this initializes a connection pool
const pool = new Pool(config.pg);

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  logger.error('PostgreSQL pool: idle client error', err.message, err.stack);
});

/**
 * Execute a query and returns a bluebird Promise
 * @param {*} text 
 * @param {*} values 
 */
function queryDb(text, values){
    return new Promise(function(resolve, reject){
        return pool.query(text, values)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
}

/**
 * Execute a query and return first elements
 * @param {*} text
 * @param {*} values
 */
function queryDbUnique(text, values){
    return queryDb(text, values)
    .then((rows) => {
        if(rows.length === 0) return Promise.reject(new Error('NOT_FOUND'));
        return rows[0];
    });
}

/**
 * Starts a PostgreSQL transaction.
 *
 * @returns {promise}
 */
function startDbTransaction () {
    return new Promise(function(resolve, reject){
        pool.connect()
        .then(function(client) {
            return client.query('BEGIN',function(error){
                if(error){
                    return reject(error)
                }
                return resolve(client);
            });
        }).catch((err) => reject(err));
    });
}

/**
 * End a PostgreSQL transaction.
 *
 * @param {object} pgCTrans
 * @param {object} error
 * @returns {promise}
 */
function endDbTransaction (pgCTrans, error) {
    return new Promise(function(resolve, reject){
        if (error) {
            return pgCTrans.query('ROLLBACK')
            .then(function(){
                pgCTrans.release();
                reject(error);
            }).catch((err) => reject(err));
        }
        return pgCTrans.query('COMMIT')
        .then(function(){
            pgCTrans.release();
            resolve();
        }).catch((err) => reject(err));
    });
}