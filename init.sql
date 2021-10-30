CREATE DATABASE IF NOT EXISTS collector;

DROP procedure IF EXISTS `seedData`;

DELIMITER $$
USE `collector`$$
CREATE PROCEDURE `seedData`()
BEGIN
	IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'game')
    THEN
        CREATE TABLE game (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(45) NOT NULL,
            image varchar(100) NOT NULL,
            category varchar(45) NOT NULL,
            description text NOT NULL,
            active varchar(45) NOT NULL DEFAULT 'active',
            PRIMARY KEY (id)
        );

        INSERT INTO game (name, image, category, description, active)
        VALUES (
            'Emperor: Battle for Dune',
            'd163c88c-ab37-4dd3-8c37-99b6365a11b1.jpg',
            'Real-time strategy',
            'Emperor: Battle for Dune is a Dune computer game, released by Westwood Studios in 2001. It is based in Frank Herbert s science fiction Dune universe.Informally, it is known as Dune III.It is the third real - time strategy game set in the Dune universe, following its predecessors, Dune II and Dune 2000.',
            'active'
        );

        INSERT INTO game (name, image, category, description, active)
        VALUES (
            'Supreme Commander',
            '1e9f1c02-f2d4-44f0-ad1a-360f5efd8d8d.jpg',
            'Real-time strategy',
            'Supreme Commander (sometimes SupCom) is a 2007 real-time strategy video game designed by Chris Taylor and developed by his company, Gas Powered Games. The game is considered to be a spiritual successor, not a direct sequel, to Taylors 1997 game Total Annihilation',
            'active'
        );

        INSERT INTO game (name, image, category, description, active)
        VALUES (
            'Starcraft',
            '242f6326-237b-4c70-8acd-c89ba0025c3b.jpg',
            'Real-time strategy',
            'StarCraft is a military science fiction media franchise created by Chris Metzen and James Phinney and owned by Blizzard Entertainment.',
            'active'
        );

        INSERT INTO game (name, image, category, description, active)
        VALUES (
            'Half-Life 2',
            '19dd63a5-7610-4836-b506-b75eac67483c.jpg',
            'First-person shooter',
            'Half-Life 2 is a 2004 first-person shooter game developed and published by Valve. Like the original Half-Life (1998), it combines shooting, puzzles, and storytelling, and adds features such as vehicles and physics-based gameplay',
            'active'
        );

        INSERT INTO game (name, image, category, description, active)
        VALUES (
            'Starcraft 2',
            '55b0d765-942a-4e83-92dc-328c638d7376.jpg',
            'Real-time strategy',
            'Half-Life 2 is a 2004 first-person shooter game developed and published by Valve. Like the original Half-Life (1998), it combines shooting, puzzles, and storytelling, and adds features such as vehicles and physics-based gameplay',
            'active'
        );

        INSERT INTO
            game (name, image, category, description, active)
        VALUES (
            'The Riftbreaker',
            'd163c88c-ab37-4dd3-8c37-99b6365a11b1.jpg',
            '‪Action & adventure',
            'Half-Life 2 is a 2004 first-person shooter game developed and published by Valve. Like the original Half-Life (1998), it combines shooting, puzzles, and storytelling, and adds features such as vehicles and physics-based gameplay',
            'active'
        );
    ELSE
		SELECT 'it does exist?' as '';
	END IF;
END$$

DELIMITER ;

call seedData;