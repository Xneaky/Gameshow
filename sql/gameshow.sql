-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-10-2018 a las 04:43:37
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gameshow`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulos`
--

DROP TABLE IF EXISTS `modulos`;
CREATE TABLE IF NOT EXISTS `modulos` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(50) NOT NULL,
  `descripcion_modulo` varchar(250) NOT NULL,
  `activo` bit(1) NOT NULL,
  KEY `id_modulo` (`id_modulo`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`id_modulo`, `nombre_modulo`, `descripcion_modulo`, `activo`) VALUES
(1, 'Usuarios', 'Administracion de Usuarios', b'1'),
(2, 'Roles', 'Administracion de Roles', b'1'),
(3, 'Permisos', 'Administracion de Permisos', b'1'),
(4, 'Jugadores', 'Administracion de Jugadores', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  `modulos` varchar(80) NOT NULL,
  `descripcion_rol` varchar(250) NOT NULL,
  `activo` bit(1) NOT NULL,
  KEY `id_rol` (`id_rol`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `modulos`, `descripcion_rol`, `activo`) VALUES
(1, 'Administrador', '3,2,1', 'Todos los privilegios', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_rol` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `apellido_usuario` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pwd_usuario` varchar(60) NOT NULL,
  `activo` bit(1) NOT NULL,
  KEY `id_usuario` (`id_usuario`),
  KEY `id_rol` (`id_rol`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_rol`, `nombre_usuario`, `apellido_usuario`, `email`, `pwd_usuario`, `activo`) VALUES
(1, 1, 'David', 'Lopez', 'davidlopez96@hotmail.com', 'davidlopez96@hotmail.com', b'1');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vt_usuarios`
--
DROP VIEW IF EXISTS `vt_usuarios`;
CREATE TABLE IF NOT EXISTS `vt_usuarios` (
`id_usuario` int(11)
,`id_rol` int(11)
,`nombre_rol` varchar(50)
,`nombre_usuario` varchar(50)
,`apellido_usuario` varchar(50)
,`email` varchar(50)
,`pwd_usuario` varchar(60)
,`activo` bit(1)
);
-- --------------------------------------------------------

--
-- Estructura para la vista `vt_usuarios`
--
DROP TABLE IF EXISTS `vt_usuarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vt_usuarios` AS select `u`.`id_usuario` AS `id_usuario`,`u`.`id_rol` AS `id_rol`,`r`.`nombre_rol` AS `nombre_rol`,`u`.`nombre_usuario` AS `nombre_usuario`,`u`.`apellido_usuario` AS `apellido_usuario`,`u`.`email` AS `email`,`u`.`pwd_usuario` AS `pwd_usuario`,`u`.`activo` AS `activo` from (`usuarios` `u` join `roles` `r` on((`u`.`id_rol` = `r`.`id_rol`)));

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
