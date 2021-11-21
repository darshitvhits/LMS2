-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2021 at 03:30 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms1`
--

-- --------------------------------------------------------

--
-- Table structure for table `rateoncourse`
--

CREATE TABLE `rateoncourse` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `filed1` enum('0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL DEFAULT '5',
  `filed2` enum('0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL DEFAULT '5',
  `filed3` enum('0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL DEFAULT '5',
  `filed4` enum('0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL DEFAULT '5',
  `filed5` enum('0.5','1','1.5','2','2.5','3','3.5','4','4.5','5') NOT NULL DEFAULT '5',
  `total` float NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rateoncourse`
--

INSERT INTO `rateoncourse` (`id`, `user_id`, `course_id`, `filed1`, `filed2`, `filed3`, `filed4`, `filed5`, `total`, `created_at`) VALUES
(1, 2, 31, '3', '4', '4.5', '5', '5', 4.3, '2021-03-30 12:31:46'),
(2, 3, 31, '3', '4', '4.5', '3.5', '5', 4, '2021-03-30 12:32:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rateoncourse`
--
ALTER TABLE `rateoncourse`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rateoncourse`
--
ALTER TABLE `rateoncourse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
