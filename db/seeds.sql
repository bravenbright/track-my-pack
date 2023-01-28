const db = require(./db.js)
INSERT INTO deparment (id, name)
VALUES (001, "Business")
       (002, "Finance")
       (003, "Communications")
       (004, "Media")


INSERT INTO role ( id, title, salary, department_id);
VALUES (001, Mulit-Deparment Manageer, 120.8, 001)
       (002, Communications Representative, 75.5, 002)
       (003, Business Manager, 80.2, 003)
       (004, Media Organizer, 40.5,  004)
       (005, Social Media Affiliate, 30.6, 005)
       (006, Accountant, 100.5, 001)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, Rick, Sanchez, 001, 001, 001)
       (002, Morty, Sanchez, 002, 001, 003)
       (003, Jerry, Doe, 003, 001)
       (004, Melissa, Mcarthy, 002, 003)
       (005, Marc, Anthony, 005, 001)
