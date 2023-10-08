CREATE TABLE IF NOT EXISTS users
(
    `id`
    BIGINT
    NOT
    NULL
    AUTO_INCREMENT,
    `name`
    VARCHAR
(
    45
) NOT NULL,
    `last_name` VARCHAR
(
    45
) NOT NULL,
    `age` INT NOT NULL,
    `email` VARCHAR
(
    45
) NOT NULL,
    `username` VARCHAR
(
    45
) NOT NULL,
    `password` VARCHAR
(
    100
) NOT NULL,
    PRIMARY KEY
(
    `id`
),
    UNIQUE INDEX `username_UNIQUE`
(
    `username` ASC
) VISIBLE);

CREATE TABLE IF NOT EXISTS roles
(
    id
    bigint
    auto_increment,
    role
    varchar
(
    25
) not null,
    primary key
(
    id
)
    );

create table users_roles
(
    user_id bigint not null,
    role_id bigint null,
    constraint users_roles_pk
        unique (role_id, user_id),
    constraint users_roles_roles_id_fk
        foreign key (role_id) references roles (id),
    constraint users_roles_users_id_fk
        foreign key (user_id) references users (id)
);

INSERT INTO roles (role)
VALUES ('ROLE_USER');

INSERT INTO roles (role)
VALUES ('ROLE_ADMIN');

INSERT INTO users (name, last_name, age, email, username, password)
VALUES ('Админ', 'Главный', 45, 'admin@mail.ru', 'admin',
        '$2a$08$ilAYFPbxbFB877kzf8kDBO2l90Uwkf8oiiS6Iknq1MkNPmhJ0ReFC');

INSERT INTO users (name, last_name, age, email, username, password)
VALUES ('Пользователь', 'Обычный',25, 'user@mail.ru', 'user','$2a$08$2K/.Qv6DM.7aBAsllZP51uOMrA77sLNFF3xp8nZM0QSLRHy0zophi');

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 1);

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 2);

INSERT INTO users_roles (user_id, role_id)
VALUES (2, 1);

    INSERT
INTO users (name, last_name, age, email, username, password)
VALUES ('Ирина', 'Еж', 24, 'yoj@mail.ru', 'irina', '$2a$10$K04L6.n72wMjhWjJwTUxn.XEfL1ynqim2jlsXruCWWlGeSaK2Zyza');

INSERT INTO users (name, last_name, age, email, username, password)
VALUES ('Полина', 'Филипова', 37, 'filipova@mail.ru', 'polina',
        '$2a$10$IZM8TOSEUK/IDNL2.f1i9us.wHkzmZBPMcqqz47JOrIAg3LjISMmu');

INSERT INTO users (name, last_name, age, email, username, password)
VALUES ('Петр', 'Якутчик', 36, 'yakutchik@mail.ru', 'petr',
        '$2a$10$Tc6507HMuXEyweeRiwq8Pug1DUtBcQT8/BryHzIvlsqBEj3jXNgim');

INSERT INTO usersroles.users (name, last_name, age, email, username, password)
VALUES ('Максим', 'Мамонтов', 22, 'mamontov@mail.ru', 'maksim',
        '$2a$10$Suk22vdBTW7TVCZkzZcvgOD66zceRBPgddGsFK9FcBBj.y0yG0zty');

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 2);

INSERT INTO users_roles (user_id, role_id)
VALUES (1, 1);