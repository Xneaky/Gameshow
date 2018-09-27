-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2018 at 10:18 PM
-- Server version: 5.7.20-log
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gameshow`
--

-- --------------------------------------------------------

--
-- Table structure for table `duelos`
--

CREATE TABLE `duelos` (
  `id_duelo` int(11) NOT NULL,
  `equipo_1` varchar(100) NOT NULL,
  `equipo_2` varchar(100) NOT NULL,
  `torneo` varchar(100) NOT NULL,
  `gol_equipo_1` int(11) NOT NULL,
  `gol_equipo_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `duelos`
--

INSERT INTO `duelos` (`id_duelo`, `equipo_1`, `equipo_2`, `torneo`, `gol_equipo_1`, `gol_equipo_2`) VALUES
(1, 'Barcelona', 'Getafe', 'Liga', 3, 1),
(2, 'Alianza', 'Atletico Madrid', 'Liga', 2, 0),
(3, 'Real Madrid', 'Leganes', 'Liga', 2, 0),
(4, 'FAS', 'Real Sociedad', 'Liga', 4, 3),
(5, 'Barcelona', 'Alianza', 'Liga', 2, 1),
(6, 'Real Madrid', 'FAS', 'Liga', 2, 1),
(7, 'Barcelona', 'Real Madrid', 'Liga', 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `nombre`, `apellido`, `email`, `username`, `pwd`) VALUES
(1, 'aaaaa', 'aaaaaa', 'castillo_5326@hotmail.com', 'admin', 'admin'),
(2, 'bbbb', 'bbbb', 'bbbb@bbbb.com', 'bb', 'bb'),
(3, 'ccc', 'ccc', 'ccc@ccc.com', 'ccc', 'ccc'),
(4, 'dd', 'dd', 'dd', 'dd', 'dd'),
(8, 'fff', 'fff', 'fff', 'fff', 'd1d7e84d9049900299ee9c0b2c04b11bfa9a0437afc0bf03d8ce0e3fb8523919f13fa3a5130c5ba7987679c6f6945ca87655e746eb5345bdc8131298fa5a9b20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `duelos`
--
ALTER TABLE `duelos`
  ADD PRIMARY KEY (`id_duelo`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `duelos`
--
ALTER TABLE `duelos`
  MODIFY `id_duelo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
