drop database if exists ems;
create database if not exists ems;
use ems;

create table if not exists emp
(
id int unsigned primary key,
name varchar(50) not null,
salary decimal(10,2) unsigned not null
);
desc emp;
