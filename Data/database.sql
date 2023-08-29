DROP DATABASE IF EXISTS intern;
CREATE DATABASE IF NOT EXISTS intern;
USE intern;

CREATE TABLE IF NOT EXISTS userdata (
    end_year INT,
    intensity TINYINT,
    sector VARCHAR(100),
    topic VARCHAR(100),
    insight VARCHAR(400),
    user_url VARCHAR(500),
    region VARCHAR(100),
    start_year INT,
    impact TINYINT,
    added DATETIME,
    published DATETIME,
    country VARCHAR(100),
    relevance TINYINT,
    pestle VARCHAR(100),
    source VARCHAR(200),
    title VARCHAR(1000),
    likelihood INT Null
);

DESC userdata;

LOAD DATA INFILE 'C:/Demo/VScode/Data/data.csv'
INTO TABLE userdata
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
IGNORE 1 LINES
(@end_year, @intensity, @sector, @topic, @insight, @user_url, @region, @start_year, @impact, @added, @published, @country, @relevance, @pestle, @source, @title, @likelihood)
SET 
    end_year = NULLIF(@end_year, ''),
    intensity = NULLIF(@intensity, ''),
    sector = NULLIF(@sector, ''),
    topic = NULLIF(@topic, ''),
    insight = NULLIF(@insight, ''),
    user_url = NULLIF(@user_url, ''),
    region = NULLIF(@region, ''),
    start_year = NULLIF(@start_year, ''),
    impact = NULLIF(@impact, ''),
    added = STR_TO_DATE(NULLIF(@added, ''), '%M, %d %Y %H:%i:%s'),
    published = STR_TO_DATE(NULLIF(@published, ''), '%M, %d %Y %H:%i:%s'),
    country = NULLIF(@country, ''),
    relevance = NULLIF(@relevance, ''),
    pestle = NULLIF(@pestle, ''),
    source = NULLIF(@source, ''),
    title = NULLIF(@title, ''),
    likelihood = NULLIF(NULLIF(@likelihood, ''), '') + 0;


SELECT * FROM userdata;
