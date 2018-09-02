Often we only need to run a single query on the database, so as convenience the pool has a method to run a query on the first available idle client and return its result.
With pool.query no client.release() is necessary. The pool is doing the acquiring and releasing internally.
Do not use pool.query if you need transactional integrity: the pool will dispatch every query passed to pool.query on the first available idle client. 
Transactions within PostgreSQL are scoped to a single client and so dispatching individual queries within a single transaction across multiple, random clients will cause big problems in your app and not work. 
Transactional control commands are only used with the DML commands INSERT, UPDATE and DELETE.
CODE for clients:
// const client = await pool.connect();
// await client.query(SELECT * FROM foo);
// finally {
//   client.release();
// }
