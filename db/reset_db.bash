$(> db/trains.sqlite)
cat db/migrate.sql | sqlite3 db/trains.sqlite
