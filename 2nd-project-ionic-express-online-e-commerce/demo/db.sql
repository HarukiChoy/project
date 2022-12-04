-- 1. create the project inside your pc
-- create database project;
-- \c project;

-- 2. create a role and alter it for accessing the db
-- create role project with password 'project' superuser;
-- alter role project with login;

-- create area table
create table area (
    id serial primary key
    ,area varchar(2)
);

INSERT INTO area (id,area) VALUES (1,'港島'),(2,'九龍'),(3,'新界');

-- create district table
create table district (
    id serial primary key
    ,district varchar(5)
    ,area_id integer references area(id)
);

INSERT INTO district (district, area_id) VALUES ('中西區',1),('灣仔',1),
('東區',1),('南區',1),('油尖旺',2),('深水埗',2),('九龍城',2),('黃大仙',2),
('觀塘',2),('葵青',3),('荃灣',3),('屯門',3),('元朗',3),('北區',3),
('大埔',3),('沙田',3),('西貢',3),('離島',3);

-- create address table
create table address (
    id serial primary key
    ,address varchar(50)
    ,district_id integer references district(id)
);

-- create "user" table
create table "user" (
    id serial primary key
    ,username varchar(50) unique NOT NULL
    ,password varchar(60) NOT NULL
    ,email varchar(100) unique
    ,phone_number varchar(20)
    ,address_id integer references address(id)
    ,birth_month integer
    ,role varchar(8) NOT NULL
    ,is_vip boolean
    ,point integer
    ,discount integer
    ,consumption decimal(10,2)
    ,deactivated_time timestamp
    ,credit decimal(10,2)
    );

-- create category table
create table category (
    id serial primary key
    ,cat varchar(30)
);

-- create item table
create table item (
    id serial primary key
    ,category_id integer references category(id)
    ,category varchar(20)
    ,name varchar(100) unique NOT NULL
    ,price decimal(10,2)
    ,spec varchar(100) 
    ,weight decimal(10,2)
    ,quantity integer
    ,photo varchar(255)
    ,is_product boolean
    ,is_hot_item boolean
    ,created_time timestamp default current_timestamp
    ,deactivated_time timestamp 
);

-- create coupon table
create table coupon (
    id serial primary key
    , amount integer
    , code varchar(20)
    , condition integer
    , no_of_coupon integer
    , max_claim integer
    , start_date date
    , end_date date
);

-- //11
CREATE TABLE payment (
    id serial primary key
    ,user_id integer NOT NULL references "user"(id)
    --,order_id integer
    ,evidence varchar(255)
    ,payment_status varchar(15)
    ,date timestamp
    ,foreign key (user_id) references "user"(id)
    --,foreign key (order_id) references "order"(id)
);

-- //12
CREATE TABLE "order" (
    id serial primary key
    ,user_id integer NOT NULL references "user"(id)
    ,coupon_id integer references coupon(id)
    ,payment_id integer NOT NULL references payment(id)
    ,amount decimal(10,2) NOT NULL
    ,status varchar(10) 
    ,address_id integer NOT NULL references address(id)
    ,point integer
);

alter table payment add column
order_id integer references "order"(id);

-- //13
CREATE TABLE "orderItem" (
    id serial primary key
    ,user_id integer NOT NULL references "user"(id)
    ,order_id integer NOT NULL references "order"(id)
    ,item_id integer NOT NULL references item(id)
    ,quantity integer NOT NULL
    ,amount decimal(10,2) NOT NULL
);
