drop database if exists shop;
create database if not exists shop;
use shop;

create table if not exists clt
(
product_id tinyint,
product_name varchar(50),
product_add varchar(100) not null
);
desc clt; 

delimiter $$
drop trigger if exists t1 $$
create trigger t1 before insert on clt for each row
begin
	if  (new.product_add is null ) or (length(trim(new.product_add)) = 0) or (length(new.product_add) < 8) then 
		signal SQLSTATE '11111' set message_text = "invalid address";
	end if;
end $$

drop trigger if exists t2 $$
create trigger t2 before update on clt for each row
begin
	if  (new.product_add is null ) or (length(trim(new.product_add)) = 0) or (length(new.product_add) < 2) then 
		signal SQLSTATE '11111' set message_text = "invalid address";
	end if;
end $$
delimiter ;
