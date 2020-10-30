-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2020 at 11:20 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_balance`
--

CREATE TABLE `tb_balance` (
  `user_id` int(10) NOT NULL,
  `balance` int(10) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_balance`
--

INSERT INTO `tb_balance` (`user_id`, `balance`) VALUES
(20, 75121),
(21, 133879),
(22, 5000),
(23, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_transaction`
--

CREATE TABLE `tb_transaction` (
  `transaction_id` int(15) NOT NULL,
  `sender_id` int(10) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `type` enum('in','out') NOT NULL,
  `receiver_id` int(10) DEFAULT NULL,
  `amount` int(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_transaction`
--

INSERT INTO `tb_transaction` (`transaction_id`, `sender_id`, `category`, `type`, `receiver_id`, `amount`, `date`, `notes`) VALUES
(1, NULL, 'Top Up', 'in', 21, 10000, '2020-09-29 11:51:53', NULL),
(2, 21, 'Transfer', 'out', 20, 1000, '2020-09-30 05:43:11', 'tes kirim 2'),
(3, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 01:37:20', 'tes kirim 3'),
(4, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 01:41:55', 'tes kirim 3'),
(5, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 01:45:00', 'tes kirim 4'),
(6, 21, 'Transfer', 'out', 20, 2000, '2020-10-01 02:04:50', 'kirim'),
(7, 21, 'Transfer', 'out', 20, 2000, '2020-10-01 02:06:43', 'lagi'),
(8, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 02:08:31', 'tes kirim 5'),
(9, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 02:12:25', 'hehhhh'),
(10, 21, 'Transfer', 'out', 20, 1000, '2020-09-30 19:12:25', ''),
(11, 21, 'Transfer', 'out', 20, 1000, '2020-09-30 19:36:50', ''),
(12, NULL, 'Top Up', 'in', 21, 100000, '2020-10-01 02:57:16', NULL),
(13, 21, 'Transfer', 'out', 20, 1000, '2020-09-30 19:51:14', 'coba'),
(14, 21, 'Transfer', 'out', 20, 2000, '2020-10-01 02:58:04', ''),
(15, 21, 'Transfer', 'out', 20, 8000, '2020-10-01 03:00:56', ''),
(16, 21, 'Transfer', 'out', 20, 8000, '2020-10-01 03:08:28', ''),
(17, 21, 'Transfer', 'out', 20, 1000, '0000-00-00 00:00:00', 'ada'),
(18, NULL, 'Top Up', 'in', 21, 100000, '2020-10-01 11:14:27', NULL),
(19, 21, 'Transfer', 'out', 20, 2000, '0000-00-00 00:00:00', ''),
(20, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 11:46:46', ''),
(21, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 11:47:19', ''),
(22, 21, 'Transfer', 'out', 20, 3000, '2020-10-01 11:48:44', ''),
(23, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 13:27:12', ''),
(24, 21, 'Transfer', 'out', 20, 1000, '2020-10-01 13:29:31', ''),
(25, 21, 'Transfer', 'out', 20, 3000, '0000-00-00 00:00:00', NULL),
(26, 21, 'Transfer', 'out', 20, 2000, '2020-10-01 13:39:20', 'hari ini'),
(27, 21, 'Transfer', 'out', 20, 5000, '0000-00-00 00:00:00', NULL),
(28, 21, 'Transfer', 'out', 20, 1234, '0000-00-00 00:00:00', NULL),
(29, 21, 'Transfer', 'out', 20, 6543, '0000-00-00 00:00:00', NULL),
(30, 21, 'Transfer', 'out', 20, 5555, '2020-10-04 09:24:58', NULL),
(31, 21, 'Transfer', 'out', 20, 1111, '2020-10-05 12:06:02', NULL),
(32, 21, 'Transfer', 'out', 20, 1234, '2020-10-07 19:25:41', NULL),
(33, 21, 'Transfer', 'out', 20, 2222, '2020-10-07 19:46:23', NULL),
(34, 21, 'Transfer', 'out', 20, 2222, '2020-10-07 19:55:24', NULL),
(35, 21, 'Transfer', 'out', 20, 5000, '2020-10-08 08:37:58', NULL),
(36, NULL, 'Top Up', 'in', 21, 1000, '2020-10-21 06:12:35', NULL),
(37, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:20:42', NULL),
(38, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:21:07', NULL),
(39, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:21:19', NULL),
(40, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:22:04', NULL),
(41, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:22:24', NULL),
(42, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:25:48', NULL),
(43, 21, 'Transfer', 'out', 20, 8000, '2020-10-22 10:26:23', NULL),
(44, NULL, 'Top Up', 'in', 21, 1000, '2020-10-22 10:32:16', NULL),
(45, NULL, 'Top Up', 'in', 21, 2000, '2020-10-22 10:36:26', NULL),
(46, NULL, 'Top Up', 'in', 21, 2000, '2020-10-22 10:38:13', NULL),
(47, NULL, 'Top Up', 'in', 21, 2000, '2020-10-22 10:42:01', NULL),
(48, NULL, 'Top Up', 'in', 21, 2000, '2020-10-22 10:44:34', NULL),
(49, 21, 'Transfer', 'out', 20, 5000, '2020-10-22 10:49:22', NULL),
(50, NULL, 'Top Up', 'in', 21, 2000, '2020-10-22 10:52:33', NULL),
(51, NULL, 'Top Up', 'in', 21, 2000, '2020-10-22 10:54:32', NULL),
(52, 20, 'Transfer', 'out', 21, 10000, '2020-10-22 10:55:12', 'tes kirim 2'),
(53, 20, 'Transfer', 'out', 21, 1000, '2020-10-22 11:01:35', 'tes kirim 2'),
(54, 20, 'Transfer', 'out', 21, 1000, '2020-10-22 11:02:41', 'tes kirim 2'),
(55, 20, 'Transfer', 'out', 21, 1000, '2020-10-22 13:57:49', 'tes kirim 2'),
(56, 20, 'Transfer', 'out', 21, 1000, '2020-10-22 14:13:30', 'tes kirim 2'),
(57, 21, 'Transfer', 'out', 22, 5000, '2020-10-25 11:35:54', NULL),
(58, 21, 'Transfer', 'out', 23, 20000, '2020-10-25 11:36:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `pin` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `username`, `email`, `password`, `pin`) VALUES
(20, 'jon', 'jon@mail.com', '$2b$10$T8zCFtf2WdIaxgv8TwgYC.4Cr1y3J2dP7siAgkRkYoGj0dAC7S8DG', 111111),
(21, 'gana', 'ghananade@gmail.com', '$2b$10$H5kTAV9xH6lq2yLtKGGB5ucU1K431BjDjaUZmYo1B05fYSoQWqVDu', 123456),
(22, 'Arya', 'arya@mail.com', '$2b$10$cYlP7iezClB4U0FL2OyPReGZZdeRO9jFDi4TAfnubQFYJ1j9QFjpO', 222222),
(23, 'Robert', 'robert@mail.com', '$2b$10$5fbnmasVcqRBvQ112Vv6Y.hjzblBv./GjXwK4.fa/4Ud73Z8parUe', 222222);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_detail`
--

CREATE TABLE `tb_user_detail` (
  `user_id` int(10) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user_detail`
--

INSERT INTO `tb_user_detail` (`user_id`, `first_name`, `last_name`, `phone`, `photo`) VALUES
(20, 'Jon', 'Snow', '+6281384929994', '/images/1601360594002-Jon_Snow.jpg'),
(21, 'Gana', 'Lannister', '+6281111111111', '/images/1604095410451.jpg'),
(22, 'Arya', NULL, '+6281233333333', '/images/1603625655351.jpg'),
(23, 'Robert', NULL, '+6281444444444', '/images/1603625438028.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_balance`
--
ALTER TABLE `tb_balance`
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tb_transaction`
--
ALTER TABLE `tb_transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`sender_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_transaction`
--
ALTER TABLE `tb_transaction`
  MODIFY `transaction_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_balance`
--
ALTER TABLE `tb_balance`
  ADD CONSTRAINT `tb_balance_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_user_detail`
--
ALTER TABLE `tb_user_detail`
  ADD CONSTRAINT `tb_user_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`user_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
