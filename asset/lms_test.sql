-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 02, 2021 at 09:10 AM
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
-- Database: `lms_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `parent` int DEFAULT '0',
  `slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `code`, `name`, `parent`, `slug`, `status`, `created_at`, `modified_at`, `thumbnail`) VALUES
(1, 'GENE', 'General', 0, 'general', '0', NULL, NULL, NULL),
(3, 'MKT001', 'Marketing', 0, 'marketing', '0', NULL, NULL, 'thumb'),
(4, 'MKT', 'Marketing Management', 0, 'marketing-management', '0', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int UNSIGNED NOT NULL,
  `id_user` int DEFAULT NULL,
  `id_category` int DEFAULT NULL,
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
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `id_user`, `id_category`, `id_topic`, `id_level`, `id_price`, `id_language`, `id_duration`, `id_features`, `id_subtitles`, `title`, `short_description`, `description`, `outcomes`, `section`, `requirements`, `price`, `discount_flag`, `discounted_price`, `thumbnail`, `video_url`, `is_top_course`, `is_admin`, `status`, `meta_keywords`, `meta_description`, `created_at`, `modified_at`) VALUES
(1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Become and expert Lab Tech', 'Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum', 'Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum Lorium ipsum', NULL, NULL, NULL, 200, 50, 100, NULL, NULL, 0, NULL, '1', NULL, NULL, NULL, '2021-02-23 15:49:50'),
(31, NULL, 3, 1, 4, 2, 1, 2, 1, 2, 'marketing', NULL, '<p>marketingmarketing</p>', 'outcomes', NULL, 'requirements', 12000, NULL, 200, '1', 'www.google.com', NULL, NULL, '0', 'marketing', 'marketing', NULL, NULL),
(32, NULL, 3, NULL, NULL, NULL, 2, NULL, NULL, NULL, '\"marketing\"', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 200, NULL, 'www.google.com', NULL, NULL, NULL, 'marketing', 'marketing', NULL, NULL),
(33, NULL, 4, 2, 22, 2, 1, 2, 1, 2, 'digital', NULL, '<p>digital</p>', 'OutcomesInput', NULL, 'RequirementsInput', 1200, NULL, 12, '1', 'ww.hoohp.com', NULL, NULL, '1', 'digital', 'digital', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `duration`
--

CREATE TABLE `duration` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `duration`
--

INSERT INTO `duration` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(1, '0-2 Hours', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(2, '3-6 Hours', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(3, '7-16 Hours', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(4, '17+ Hours', '0', '2021-02-15 13:10:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(1, 'Subtitles', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(2, 'Excerise', '1', NULL, NULL),
(3, 'Practice Tests', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(4, 'Quizzes', '0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(1, 'English', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(2, 'Spanish', '1', '2021-02-15 13:13:27', '2021-02-15 13:13:27'),
(3, 'French', '0', '2021-02-15 13:11:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `id` int UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `section_id` int DEFAULT NULL,
  `video_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_added` int DEFAULT NULL,
  `last_modified` int DEFAULT NULL,
  `lesson_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `attachment` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `attachment_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `summary` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `order` int NOT NULL DEFAULT '0',
  `video_type_for_mobile_application` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_url_for_mobile_application` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration_for_mobile_application` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(3, 'Expert', '1', NULL, NULL),
(4, 'Seasoned', '1', '2021-02-15 13:11:40', '2021-02-15 13:11:40'),
(22, 'Intermediate', '1', NULL, NULL),
(24, 'Full', '0', NULL, NULL),
(25, 'Training', '0', NULL, NULL),
(27, 'Test Level Add 1', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `price`
--

CREATE TABLE `price` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `price`
--

INSERT INTO `price` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(1, 'Free', '1', '2021-02-15 13:10:38', '2021-02-15 13:10:38'),
(2, 'Paid', '0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int UNSIGNED NOT NULL,
  `quiz_id` int DEFAULT NULL,
  `title` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_of_options` int DEFAULT NULL,
  `options` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `correct_answers` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `order` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `sortorder` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int UNSIGNED NOT NULL,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`) VALUES
(1, 'language', 'english'),
(2, 'system_name', 'Academy-LMS'),
(3, 'system_title', 'Academy Learning Club'),
(4, 'system_email', 'academy@example.com'),
(5, 'address', 'Sydeny, Australia'),
(6, 'phone', '+143-52-9933631'),
(7, 'purchase_code', 'your-purchase-code'),
(8, 'paypal', '[{\"active\":\"1\",\"mode\":\"sandbox\",\"sandbox_client_id\":\"AfGaziKslex-scLAyYdDYXNFaz2aL5qGau-SbDgE_D2E80D3AFauLagP8e0kCq9au7W4IasmFbirUUYc\",\"sandbox_secret_key\":\"EMa5pCTuOpmHkhHaCGibGhVUcKg0yt5-C3CzJw-OWJCzaXXzTlyD17SICob_BkfM_0Nlk7TWnN42cbGz\",\"production_client_id\":\"1234\",\"production_secret_key\":\"1234\"}]'),
(9, 'stripe_keys', '[{\"active\":\"1\",\"testmode\":\"on\",\"public_key\":\"pk_test_LnMXAA8Rox0ITcpDgkIjbcR600u09yZlhQ\",\"secret_key\":\"sk_test_9iN1igv6l9R5tolcyZLrIgMP00rcDJMVnJ\",\"public_live_key\":\"pk_live_xxxxxxxxxxxxxxxxxxxxxxxx\",\"secret_live_key\":\"sk_live_xxxxxxxxxxxxxxxxxxxxxxxx\"}]'),
(10, 'youtube_api_key', 'youtube-api-key'),
(11, 'vimeo_api_key', 'vimeo-api-key'),
(12, 'slogan', 'A course based video CMS'),
(13, 'text_align', NULL),
(14, 'allow_instructor', '1'),
(15, 'instructor_revenue', '70'),
(16, 'system_currency', 'USD'),
(17, 'paypal_currency', 'USD'),
(18, 'stripe_currency', 'USD'),
(19, 'author', 'Creativeitem'),
(20, 'currency_position', 'left'),
(21, 'website_description', 'Nice application'),
(22, 'website_keywords', 'LMS,Learning Management System,Creativeitem,demo,hello,How are you'),
(23, 'footer_text', 'Creativeitem'),
(24, 'footer_link', 'http://creativeitem.com/'),
(25, 'protocol', 'smtp'),
(26, 'smtp_host', 'ssl://smtp.googlemail.com'),
(27, 'smtp_port', '465'),
(28, 'smtp_user', 'Your email'),
(29, 'smtp_pass', 'Your email password'),
(30, 'version', '4.4'),
(31, 'student_email_verification', 'disable'),
(32, 'instructor_application_note', 'Fill all the fields carefully and share if you want to share any document with us it will help us to evaluate you as an instructor.');

-- --------------------------------------------------------

--
-- Table structure for table `subtitles`
--

CREATE TABLE `subtitles` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subtitles`
--

INSERT INTO `subtitles` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(2, 'Spanish', '1', NULL, NULL),
(3, 'Dutch', '0', NULL, NULL),
(4, 'English', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`id`, `name`, `status`, `created_at`, `modified_at`) VALUES
(1, 'Reactjs', '1', NULL, NULL),
(2, 'Node', '1', NULL, NULL),
(4, 'Express', '1', NULL, NULL),
(6, 'Mysql', '1', NULL, NULL),
(7, 'ForkLift', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usergroups`
--

CREATE TABLE `usergroups` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usergroups`
--

INSERT INTO `usergroups` (`id`, `name`, `status`, `created_at`) VALUES
(1, 'Admin', '1', '2021-02-23 15:22:51'),
(2, 'Customer', '1', '2021-02-23 15:22:51'),
(3, 'Instructor', '1', '2021-02-23 15:23:24'),
(13, 'Other', '1', NULL),
(14, 'Test', '1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `id_group` int NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `biography` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `watch_history` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `wishlist` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `title` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `paypal_keys` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `stripe_keys` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `verification_code` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `is_instructor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_group`, `first_name`, `last_name`, `email`, `password`, `biography`, `watch_history`, `wishlist`, `title`, `paypal_keys`, `stripe_keys`, `verification_code`, `image`, `status`, `is_instructor`, `created_at`, `modified_at`, `last_login_at`, `last_login_ip`) VALUES
(1, 2, 'Smit', 'Dev123', 'Smit@gmail.com', '9957b57a11571085958f7e71e3a8840efe381730', 'i am an it guy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, '2021-02-23 15:41:48', NULL, NULL),
(4, 2, 'Chirag', 'Parmar', 'mayank@gmail.com', '7c222fb2927d828af22f592134e8932480637c0d', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL),
(5, 2, 'Amit', 'Patel', 'amitdev@gmail.com', 'c8babb64262c6076e821e1ea0afc7d306ede96cb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL),
(6, 3, 'James', 'Wan', 'jamesj@gmail.com', '917ffaf0b1101ef1c2621fc42f591f47ad41dccc', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL),
(9, 2, 'Taylor', 'Black', 'taylor@gmail.com', 'b87205e476386b099e865fa9cdf4fde95de21f1d', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL),
(10, 2, 'Ana', 'Mac', 'ana@gmail.com', 'beec983e1d29e81bde7148cec004bbbc9e1034f5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, NULL, NULL, NULL),
(11, 2, 'Nandish', 'Shah1', 'test1234@gmail.com', 'dddd5d7b474d2c78ebbb833789c4bfd721edf4bf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `duration`
--
ALTER TABLE `duration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subtitles`
--
ALTER TABLE `subtitles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usergroups`
--
ALTER TABLE `usergroups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `duration`
--
ALTER TABLE `duration`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `price`
--
ALTER TABLE `price`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `subtitles`
--
ALTER TABLE `subtitles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `usergroups`
--
ALTER TABLE `usergroups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
