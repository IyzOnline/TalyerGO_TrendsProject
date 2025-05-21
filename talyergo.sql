-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 17, 2025 at 11:42 AM
-- Server version: 10.4.33-MariaDB-log
-- PHP Version: 8.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `talyergo`
--

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL,
  `shopcode` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `rating` text DEFAULT '{"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}',
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `name`, `address`, `lat`, `lng`, `shopcode`, `image`, `path`, `rating`, `user_id`) VALUES
(1, 'ABS Mufflers & Headers and Exhaust System', 'Zone 2 1, Naga, 4400 Camarines Sur', 13.62175820, 123.20730597, 'abs', 'abs.png', '/profile/abs', '{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0}', 1),
(2, 'AJF Auto Repair Shop', 'Salvacion street, Mabolo-Camaligan-Gainza Rd, Naga, 4400 Camarines Sur', 13.61526007, 123.17430931, 'ajf', 'ajf.png', '/profile/ajf', '{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0}', 2),
(3, 'C-Bros Genuine Autoparts & Accessories, Inc', 'Diversion Road Barangay, Naga, 4400 Camarines Sur', 13.61650632, 123.18848629, 'cbros', 'cbros.png', '/profile/cbros', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 3),
(4, 'CARniguan Auto Services', '3 San Sebastian St, Naga, 4400 Camarines Sur', 13.62433531, 123.19522146, 'carniguan', 'carniguan.png', '/profile/carniguan', '{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0}', 4),
(5, 'Car Town Auto Shop', '53 Jacob, Naga, 4400 Camarines Sur', 13.63463922, 123.19136631, 'cartown', 'cartown.png', '/profile/cartown', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 5),
(6, 'Carcido Automotor Center', '40 Magsaysay Ave, Naga, 4400 Camarines Sur', 13.62451983, 123.20159804, 'carcido', 'carcido.png', '/profile/carcio', '{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0}', 6),
(7, 'Coachgene Tires & Auto Repair Shop', 'Con. Pequeña, 4400 Naga City, Philippines, Naga City, Philippines', 13.62192897, 123.20224907, 'coachgene', 'coachgene.png', '/profile/coachgene', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 7),
(8, 'Fullyfix Auto Service', 'Z-1 Panganiban Dr, Brgy. Triangulo, Naga, 4400 Camarines Sur', 13.62225795, 123.19409860, 'fullyfix', 'fullyfix.png', '/profile/fullyfix', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 8),
(9, 'JL Habana Tire Supply & Auto Repair Shop', 'Pan-philippine, 1 1, Naga, 4400 Camarines Sur', 13.62334605, 123.20820497, 'jlhabana', 'jlhabana.png', '/profile/jlhabana', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 9),
(10, 'Motech - Naga', '4400 Roxas Ave, Naga, 4400 Camarines Sur', 13.62027983, 123.20137957, 'motech', 'motech.png', '/profile/motech', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 10),
(11, 'Naga Southern Auto Supply', 'FEDMCSI Building, Panganiban Dr, Barangay Concepcion Pequeña, Naga, 4400 Camarines Sur', 13.62111967, 123.20000572, 'nagasouthern', 'nagasouthern.png', '/profile/nagasouthern', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 11),
(12, 'NL Auto Repair Shop & Tire Supply', 'Juan Q. Miranda Ave., Concepcion Pequeña, Naga City.', 13.62216773, 123.21937531, 'nl', 'nl.png', '/profile/nl', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 12),
(13, 'Onyok Auto Repair Shop', 'J59V+RH3 Brgy, Waling-waling St, Naga, Camarines Sur', 13.62060340, 123.19408804, 'onyok', 'onyok.png', '/profile/onyok', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 13),
(14, 'Shell 360 Autoworx Panganiban', 'J5FQ+7F2, Panganiban Dr, Naga, 4400 Camarines Sur', 13.62328891, 123.18850416, 'shell360', 'shell360.png', '/profile/shell360', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 14),
(15, 'Walls Car Aircon Parts and Services', 'Door 12, PLDC Bldg, Diversion Road, Roxas Ave, Naga, Camarines Sur', 13.61837720, 123.19712296, 'walls', 'walls.png', '/profile/walls', '{\"1\": 0, \"2\": 0, \"3\": 0, \"4\": 0, \"5\": 0}', 15);

-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `shops`
ADD COLUMN `opening_hours` JSON DEFAULT (JSON_OBJECT(
    'Monday', '9:00 AM - 6:00 PM',
    'Tuesday', '9:00 AM - 6:00 PM',
    'Wednesday', '9:00 AM - 6:00 PM',
    'Thursday', '9:00 AM - 6:00 PM',
    'Friday', '9:00 AM - 6:00 PM',
    'Saturday', '9:00 AM - 3:00 PM',
    'Sunday', 'Closed'
));

ALTER TABLE `shops`
ADD COLUMN `specializations` JSON DEFAULT (JSON_ARRAY());

ALTER TABLE `shops`
ADD COLUMN `services` JSON DEFAULT (JSON_ARRAY());

CREATE TABLE `reviews` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `shop_id` INT(11) NOT NULL,
    `user_id` INT(11) DEFAULT NULL, -- Assuming you'll have user authentication later
    `rating` INT(1) NOT NULL, -- 1 to 5 stars
    `comment` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

UPDATE `shops`
SET
    `opening_hours` = '{
        "Monday": "8:00 AM - 5:00 PM",
        "Tuesday": "8:00 AM - 5:00 PM",
        "Wednesday": "8:00 AM - 5:00 PM",
        "Thursday": "8:00 AM - 5:00 PM",
        "Friday": "8:00 AM - 5:00 PM",
        "Saturday": "9:00 AM - 1:00 PM",
        "Sunday": "Closed"
    }',
    `specializations` = '["Toyota", "Honda", "Nissan", "SUV", "Sedan"]',
    `services` = '["Oil Change", "Muffler Replacement", "Exhaust Repair", "Brake Check"]'
WHERE `id` BETWEEN 1 AND 7;


-- Example update for AJF Auto Repair Shop (id=2)
UPDATE `shops`
SET
    `opening_hours` = '{
        "Monday": "9:00 AM - 6:00 PM",
        "Tuesday": "9:00 AM - 6:00 PM",
        "Wednesday": "9:00 AM - 6:00 PM",
        "Thursday": "9:00 AM - 6:00 PM",
        "Friday": "9:00 AM - 6:00 PM",
        "Saturday": "Closed",
        "Sunday": "Closed"
    }',
    `specializations` = '["Mitsubishi", "Ford", "Trucks", "Vans"]',
    `services` = '["Wheel Alignment", "Suspension Repair", "Engine Overhaul"]'
WHERE `id` BETWEEN 8 AND 15;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
