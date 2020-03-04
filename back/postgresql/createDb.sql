-- DATABASE calendar;

CREATE DATABASE calendar2
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_FR.UTF-8'
    LC_CTYPE = 'fr_FR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c calendar2;

CREATE TABLE events 
(
    id integer PRIMARY KEY NOT NULL, 
    title VARCHAR(60) NOT NULL,
    category VARCHAR(60) NOT NULL,
    date DATE NOT NULL,
    unix_time bigint NOT NULL, 
    description VARCHAR(260) NOT NULL
)