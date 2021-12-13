create database vacayskey;

use vacayskey;

create table users (
id int auto_increment,
firstname varchar(255),
lastname varchar(255),
username varchar(255), 
password varchar(255),
role varchar(255) default "User",
primary key (id)
);

create table vacations (
id int auto_increment,
title varchar(255),
description varchar(255),
destination varchar(255),
imgUrl varchar(255),
startDate date,
endDate date,
price int,
primary key (id)
);

create table followers (
id int auto_increment,
userID int,
vacID int,
foreign key (userID) references users(id),
foreign key (vacID) references vacations(id),
primary key (id)
);

insert into users (firstname, lastname, username, password)
values ("Jim","Murray","user1", "123"),("Michael","Jackson","user2","123"),("Martine","Nouet","user3","123");

insert into users (firstname, lastname, username, password, role)
values ("Yossi","Leibman","user4","123","Admin");

insert into vacations(title, destination ,description, imgUrl, startDate, endDate, price)
values("Campbeltown", "Scotland","visit and tour Campbeltown’s Whisky Distilleries", "https://luxuryscotlandtours.com/wp-content/uploads/2019/08/campbeltown-768x354.jpg","2020-01-01","2020-01-07",2030),
("ISLAY", "Scotland","visit and tour Islay’s Whisky Distilleries", "https://luxuryscotlandtours.com/wp-content/uploads/2019/08/laphroaig-768x354.jpg","2020-01-07","2020-01-15",2145),
("HIGHLANDS", "Scotland","visit and tour Oban’s Highland Whisky Distillery", "https://luxuryscotlandtours.com/wp-content/uploads/2019/09/oban-1-768x512.jpg","2020-01-12","2020-01-22",1968),
("SPEYSIDE", "Scotland","visit and tour Speyside’s Whisky Distilleries", "https://luxuryscotlandtours.com/wp-content/uploads/2019/09/Eriska_Sunset-e1568715163183.jpg","2020-01-01","2020-01-22",3090),
("Jameson", "Ireland","visit and tour jameson’s Irish Whiskey Distillery", "https://www.thespiritsbusiness.com/content/uploads/2017/03/jameson-distillery.jpg","2020-01-12","2020-01-15",1230),
("Bushmills", "Ireland","visit and tour Bushmills Irish Whiskey Distillery", "https://www.thespiritsbusiness.com/content/uploads/2019/03/Bushmills-distillery.jpg"  ,"2020-01-15","2020-01-20",1230),
("Jack Daniel", "USA","visit and tour Jack Daniel’s Tennessee Whiskey Distillery", "https://www.livingthedreamrtw.com/wp-content/uploads/2017/06/DSC05155-600x338-600x338.jpg","2020-01-15","2020-01-27",4570),
("Jim Beam", " USA","visit and tour Jim Beam’s bourbon Whiskey Distillery", "https://www.roadunraveled.com/wp-content/uploads/2017/07/bourbon-trail-top1.jpg","2020-01-07","2020-01-12",4200),
("Yamazaki", " Japan","visit and tour Yamazaki’s japanese Whiskey Distillery", "https://whisky.suntory.com/sites/default/files/2019-04/yamazaki-distillery-1.jpg","2020-01-12","2020-01-23",7890);
