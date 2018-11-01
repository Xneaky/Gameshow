-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-11-2018 a las 05:48:52
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gameshow`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `codTorneo` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `tipo_torneo` varchar(25) NOT NULL,
  `num_participantes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`codTorneo`, `Nombre`, `activo`, `tipo_torneo`, `num_participantes`) VALUES
(1, 'Goldgames ', 1, 'Equipos', 16),
(3, 'DeadMatch', 0, 'Solitario', 64),
(4, 'Testing', 1, 'Equipos', 25);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`codTorneo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `codTorneo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
