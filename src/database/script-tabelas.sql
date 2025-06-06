create database desafio_mine;
use desafio_mine;

create table usuario(
id 		int primary key auto_increment,
apelido	varchar(50),
senha	varchar(100)
);

create table dificuldade(
id int primary key auto_increment,
tipo varchar(10)
);

create table resultado(
usuario_id	int,
dificuldade_id int,
pontuacao	int,
tempo  time,
foreign key (usuario_id) references usuario(id),
foreign key (dificuldade_id) references dificuldade(id),
primary key(usuario_id, dificuldade_id)
);


insert into dificuldade(tipo)
values	('facil'),
		('medio'),
        ('dificil');


insert into usuario(apelido, senha)values
	('Lucas', '12345'),
    ('Vitorio','0987'),
    ('Celina', '03451');
    

insert into resultado (usuario_id, dificuldade_id,pontuacao,tempo)
values(1, 2, 25, '00:30:00' ),
	(2,2, 50, '00:20:20'),
	(3,1, 45,'00:26:10'),
    (1,3, 30,'00:16:30');


select u.apelido as nome , r.pontuacao ,d.tipo as dificuldade,r.tempo
from usuario u
inner join resultado r on u.id = r.usuario_id
inner join dificuldade d on u.id = d.id
