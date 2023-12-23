const poolTransaction = (pool, body, callback) => {

    pool.getConnection((err, conn) => {
      if (err) return callback(err);
  
      conn.beginTransaction((err) => {
        if (err) return done(err);
  
        body(conn, (err, ...args) => {
          // Commit or rollback transaction, then proxy callback
  
          if (err) {
            if (err == 'rollback') {
              args.unshift(null);
            }
            conn.rollback(() => { done(...args) });
          } else {
            conn.commit((err) => {
              args.unshift(err);
              done(...args);
            })
          }
        });
  
        function done(...args) {
          conn.release();
          callback(...args);
        }
      });
  
    })
  
  }
  
  module.exports = poolTransaction;