-- TRUNCATE department;
-- TRUNCATE role;
-- TRUNCATE employee;
INSERT INTO department (name)
VALUES ("Business"),
       ("Finance"),
       ("Communications"),
       ("Media");

INSERT INTO role (name, salary, department_id)
VALUES ("Multi-Deparment Manager", 120.8, 1),
       ("Communications Representative", 75.5, 2),
       ("Business Manager", 80.2, 3),
       ("Media Organizer", 40.5,  4),
       ("Social Media Affiliate", 30.6, 4),
       ("Accountant", 100.5, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (null, "Rick", "Sanchez", 1, null),
       (null, "Morty", "Sanchez", 2, 1),
       (null, "Jerry", "Doe", 3, 1),
       (null, "Melissa", "Mcarthy", 2, 3),
       (null, "Marc", "Anthony", 5, 4);
