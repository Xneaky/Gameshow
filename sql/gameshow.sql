-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 17-11-2018 a las 22:01:43
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
-- Estructura de tabla para la tabla `juego`
--

CREATE TABLE IF NOT EXISTS `juego` (
  `id_juego` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_juego` varchar(100) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_juego`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE IF NOT EXISTS `jugadores` (
  `codJugadores` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_jugador` varchar(45) NOT NULL,
  `apellido_jugador` varchar(45) NOT NULL,
  `nickname_jugador` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_nacimiento` varchar(200) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `telefono_jugador` int(8) DEFAULT NULL,
  `pais_jugador` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  PRIMARY KEY (`codJugadores`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`codJugadores`, `nombre_jugador`, `apellido_jugador`, `nickname_jugador`, `email`, `fecha_nacimiento`, `activo`, `telefono_jugador`, `pais_jugador`, `direccion`) VALUES
(1, 'Javier', 'Castillo', 'Xneaky', 'admin', '11/06/1990', 1, 12345678, 'El Salvador', 'Algo algo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores_team`
--

CREATE TABLE IF NOT EXISTS `jugadores_team` (
  `idjugadores_team` int(11) NOT NULL AUTO_INCREMENT,
  `jugadores_codJugadores` int(11) NOT NULL,
  `team_codTeam` int(11) NOT NULL,
  PRIMARY KEY (`idjugadores_team`,`jugadores_codJugadores`,`team_codTeam`),
  KEY `fk_jugadores_team_jugadores1_idx` (`jugadores_codJugadores`),
  KEY `fk_jugadores_team_team1_idx` (`team_codTeam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulos`
--

CREATE TABLE IF NOT EXISTS `modulos` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(50) NOT NULL,
  `descripcion_modulo` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`id_modulo`, `nombre_modulo`, `descripcion_modulo`, `activo`) VALUES
(1, 'Brackets', 'Administracion de Brackets de Torneos', 1),
(2, 'Equipos', 'Administracion de Equipos', 1),
(3, 'Torneos', 'Administracion de Torneos', 1),
(4, 'Torneos Jugadores', 'Administracion de Torneos Jugadores', 1),
(5, 'Jugadores', 'Administración de Jugadores', 1),
(6, 'Modulos', 'Administración de Modulos', 1),
(7, 'Roles', 'Administración de Roles', 1),
(8, 'Usuarios', 'Administración de Usuarios', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participantes`
--

CREATE TABLE IF NOT EXISTS `participantes` (
  `codParticipantes` int(11) NOT NULL AUTO_INCREMENT,
  `torneos_codTorneo` int(11) NOT NULL,
  `team_codTeams` int(11) NOT NULL,
  PRIMARY KEY (`codParticipantes`,`torneos_codTorneo`,`team_codTeams`),
  KEY `fk_participantes_torneos_idx` (`torneos_codTorneo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE IF NOT EXISTS `partidos` (
  `codPartido` int(11) NOT NULL AUTO_INCREMENT,
  `torneos_codTorneo` int(11) NOT NULL,
  `bracket` longtext,
  PRIMARY KEY (`codPartido`,`torneos_codTorneo`),
  KEY `fk_partidos_torneos1_idx` (`torneos_codTorneo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  `modulos` varchar(80) NOT NULL,
  `descripcion_rol` varchar(250) NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_rol`),
  KEY `id_rol` (`id_rol`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `modulos`, `descripcion_rol`, `activo`) VALUES
(1, 'Administrador', '1,2,5,6,7,3,4,8', 'Administrador', b'1'),
(2, 'Especial', '1,3', 'Ayudante del administrador', b'1'),
(3, 'Simple', '2,5', 'Jugador o visitante', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `codTeam` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `id_capitan` int(11) DEFAULT NULL,
  PRIMARY KEY (`codTeam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE IF NOT EXISTS `torneos` (
  `codTorneo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `tipo_torneo` varchar(25) NOT NULL,
  `num_participantes` int(11) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  PRIMARY KEY (`codTorneo`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`codTorneo`, `Nombre`, `activo`, `tipo_torneo`, `num_participantes`, `descripcion`) VALUES
(1, 'Get', 1, 'Equipos', 23, 'asassaas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `jugadores_codJugadores` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`,`jugadores_codJugadores`,`id_rol`),
  KEY `fk_usuarios_jugadores1_idx` (`jugadores_codJugadores`),
  KEY `fk_usuarios_roles1_idx` (`id_rol`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `pwd`, `activo`, `jugadores_codJugadores`, `id_rol`) VALUES
(1, 'Xneaky', 'admin', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vt_usuarios_roles_jugadores`
--
CREATE TABLE IF NOT EXISTS `vt_usuarios_roles_jugadores` (
`id_usuario` int(11)
,`usuario` varchar(100)
,`pwd` varchar(300)
,`usuarioActivo` tinyint(1)
,`jugadores_codJugadores` int(11)
,`id_rol` int(11)
,`nombre_rol` varchar(50)
,`modulos` varchar(80)
,`rolActivo` bit(1)
);
-- --------------------------------------------------------

--
-- Estructura para la vista `vt_usuarios_roles_jugadores`
--
DROP TABLE IF EXISTS `vt_usuarios_roles_jugadores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vt_usuarios_roles_jugadores` AS select `u`.`id_usuario` AS `id_usuario`,`u`.`usuario` AS `usuario`,`u`.`pwd` AS `pwd`,`u`.`activo` AS `usuarioActivo`,`u`.`jugadores_codJugadores` AS `jugadores_codJugadores`,`r`.`id_rol` AS `id_rol`,`r`.`nombre_rol` AS `nombre_rol`,`r`.`modulos` AS `modulos`,`r`.`activo` AS `rolActivo` from ((`usuarios` `u` join `roles` `r` on((`u`.`id_rol` = `r`.`id_rol`))) join `jugadores` `j` on((`j`.`codJugadores` = `u`.`jugadores_codJugadores`)));

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `jugadores_team`
--
ALTER TABLE `jugadores_team`
  ADD CONSTRAINT `fk_jugadores_team_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_jugadores_team_team1` FOREIGN KEY (`team_codTeam`) REFERENCES `team` (`codTeam`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `fk_participantes_torneos` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `fk_partidos_torneos1` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios_rol1_idx` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION asdasdasd*/;
