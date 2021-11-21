-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2021 at 02:45 PM
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
-- Table structure for table `system_seting`
--

CREATE TABLE `system_seting` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `Author` varchar(50) DEFAULT NULL,
  `Slogan` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `youtube_api_key` varchar(200) NOT NULL,
  `vimeo_api_key` varchar(200) NOT NULL,
  `student_email_verification` enum('1','0') NOT NULL,
  `footer_text` varchar(300) DEFAULT NULL,
  `footer_link` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_seting`
--

INSERT INTO `system_seting` (`id`, `name`, `title`, `keywords`, `description`, `Author`, `Slogan`, `email`, `address`, `phone`, `youtube_api_key`, `vimeo_api_key`, `student_email_verification`, `footer_text`, `footer_link`) VALUES
(2, 'estryrtjhtd', 'xfgdfsad', 'sfhfisfiokjr', 'mayank mayank', 'eregreg', 'fwfgf', 'darshit@gmail.com', 'sdfdgershg', '9123456789', 'xfvfgdhfrfjn', 'dsgrteyhhjcxf', '1', 'fdfhegajn', 'sfsagtwetget');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `system_seting`
--
ALTER TABLE `system_seting`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `system_seting`
--
ALTER TABLE `system_seting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
