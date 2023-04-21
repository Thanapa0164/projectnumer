ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'cream0164';
CREATE DATABASE linear_re;

use linear_re;

CREATE TABLE linear_re.inputdata (
    `id` int not null AUTO_INCREMENT,
    `alldata` varchar(10000) not null,
    `num` int not null,
    primary key (id)
);

INSERT INTO linear_re.inputdata(`id`,`alldata`,`num`)
value (1,'{"numgen":8,"x":[10,20,30,40,50,60,70,80],"y":[5,9,15,18,22,30,35,38]}', 8),(2,'{"numgen":8,"x":[15,20,30,40,50,60,70,80],"y":[5,9,15,18,22,30,35,38]}', 8);
