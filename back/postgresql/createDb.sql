-- DATABASE calendar;

CREATE DATABASE calendar
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
    id SERIAL PRIMARY KEY NOT NULL, 
    title VARCHAR(30) NOT NULL,
    category VARCHAR(60) NOT NULL,
    date DATE NOT NULL,
    hour TIME,
    unix_time bigint NOT NULL, 
    description VARCHAR(200) NOT NULL,
    address VARCHAR(40) NOT NULL
)