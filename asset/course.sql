-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 23, 2021 at 03:53 PM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiran_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int UNSIGNED NOT NULL,
  `id_user` int DEFAULT NULL,
  `id_category` int NOT NULL,
  `id_topic` int DEFAULT NULL,
  `id_level` int DEFAULT NULL,
  `id_price` int DEFAULT NULL,
  `id_language` int DEFAULT NULL,
  `id_duration` int DEFAULT NULL,
  `id_features` int DEFAULT NULL,
  `id_subtitles` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `short_description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `outcomes` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `section` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `requirements` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `price` double DEFAULT NULL,
  `discount_flag` int DEFAULT '0',
  `discounted_price` int DEFAULT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_top_course` int DEFAULT '0',
  `is_admin` int DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_keywords` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `meta_description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `id_user`, `id_category`, `id_topic`, `id_level`, `id_price`, `id_language`, `id_duration`, `id_features`, `id_subtitles`, `title`, `short_description`, `description`, `outcomes`, `section`, `requirements`, `price`, `discount_flag`, `discounted_price`, `thumbnail`, `video_url`, `is_top_course`, `is_admin`, `status`, `meta_keywords`, `meta_description`, `created_at`, `modified_at`) VALUES
(1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Become and expert Lab Tech', 'Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum', 'Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum', NULL, NULL, NULL, 200, 50, 100, NULL, NULL, 0, NULL, '1', NULL, NULL, NULL, '2021-02-23 15:49:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
