# Using an existing SQLite image
FROM nouchka/sqlite3

# Copying initial setup SQL script
COPY ./setup.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
