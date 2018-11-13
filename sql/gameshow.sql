-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2018 at 03:48 AM
-- Server version: 5.7.20-log
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gameshow2`
--

-- --------------------------------------------------------

--
-- Table structure for table `juego`
--

CREATE TABLE `juego` (
  `id_juego` int(11) NOT NULL,
  `nombre_juego` varchar(100) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `jugadores`
--

CREATE TABLE `jugadores` (
  `codJugadores` int(11) NOT NULL,
  `nombre_jugador` varchar(45) NOT NULL,
  `apellido_jugador` varchar(45) NOT NULL,
  `nickname_jugador` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_nacimiento` varchar(200) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `telefono_jugador` int(8) DEFAULT NULL,
  `pais_jugador` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jugadores`
--

INSERT INTO `jugadores` (`codJugadores`, `nombre_jugador`, `apellido_jugador`, `nickname_jugador`, `email`, `fecha_nacimiento`, `activo`, `telefono_jugador`, `pais_jugador`, `direccion`) VALUES
(1, 'Javier', 'Castillo', 'Xneaky', 'admin', '11/06/1990', 1, 12345678, 'El Salvador', 'Algo algo');

-- --------------------------------------------------------

--
-- Table structure for table `jugadores_team`
--

CREATE TABLE `jugadores_team` (
  `idjugadores_team` int(11) NOT NULL,
  `jugadores_codJugadores` int(11) NOT NULL,
  `team_codTeam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `modulos`
--

CREATE TABLE `modulos` (
  `id_modulo` int(11) NOT NULL,
  `nombre_modulo` varchar(50) NOT NULL,
  `descripcion_modulo` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `participantes`
--

CREATE TABLE `participantes` (
  `codParticipantes` int(11) NOT NULL,
  `torneos_codTorneo` int(11) NOT NULL,
  `team_codTeams` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `partidos`
--

CREATE TABLE `partidos` (
  `codPartido` int(11) NOT NULL,
  `torneos_codTorneo` int(11) NOT NULL,
  `bracket` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `modulos` varchar(80) NOT NULL,
  `descripcion_rol` varchar(250) NOT NULL,
  `activo` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `modulos`, `descripcion_rol`, `activo`) VALUES
(1, 'Administrador', 'todos', 'Administrador', b'1'),
(2, 'Especial', 'Algunos', 'Ayudante del administrador', b'1'),
(3, 'Simple', 'pocos', 'Jugador o visitante', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `roles_modulos`
--

CREATE TABLE `roles_modulos` (
  `id_roles_modulos` int(11) NOT NULL,
  `roles_id_rol` int(11) NOT NULL,
  `modulos_id_modulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `codTeam` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `id_capitan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `torneos`
--

CREATE TABLE `torneos` (
  `codTorneo` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `tipo_torneo` varchar(25) NOT NULL,
  `num_participantes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `jugadores_codJugadores` int(11) NOT NULL,
  `rol_id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `usuario`, `pwd`, `activo`, `jugadores_codJugadores`, `rol_id_rol`) VALUES
(1, 'Xneaky', 'admin', 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`id_juego`);

--
-- Indexes for table `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`codJugadores`);

--
-- Indexes for table `jugadores_team`
--
ALTER TABLE `jugadores_team`
  ADD PRIMARY KEY (`idjugadores_team`,`jugadores_codJugadores`,`team_codTeam`),
  ADD KEY `fk_jugadores_team_jugadores1_idx` (`jugadores_codJugadores`),
  ADD KEY `fk_jugadores_team_team1_idx` (`team_codTeam`);

--
-- Indexes for table `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`id_modulo`);

--
-- Indexes for table `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`codParticipantes`,`torneos_codTorneo`,`team_codTeams`),
  ADD KEY `fk_participantes_torneos_idx` (`torneos_codTorneo`);

--
-- Indexes for table `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`codPartido`,`torneos_codTorneo`),
  ADD KEY `fk_partidos_torneos1_idx` (`torneos_codTorneo`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indexes for table `roles_modulos`
--
ALTER TABLE `roles_modulos`
  ADD PRIMARY KEY (`id_roles_modulos`,`roles_id_rol`,`modulos_id_modulo`),
  ADD KEY `fk_roles_has_modulos_modulos1_idx` (`modulos_id_modulo`),
  ADD KEY `fk_roles_has_modulos_roles1_idx` (`roles_id_rol`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`codTeam`);

--
-- Indexes for table `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`codTorneo`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`,`jugadores_codJugadores`,`rol_id_rol`),
  ADD KEY `fk_usuarios_jugadores1_idx` (`jugadores_codJugadores`),
  ADD KEY `fk_usuarios_roles1_idx` (`rol_id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `juego`
--
ALTER TABLE `juego`
  MODIFY `id_juego` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `codJugadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `jugadores_team`
--
ALTER TABLE `jugadores_team`
  MODIFY `idjugadores_team` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id_modulo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `participantes`
--
ALTER TABLE `participantes`
  MODIFY `codParticipantes` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `partidos`
--
ALTER TABLE `partidos`
  MODIFY `codPartido` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `roles_modulos`
--
ALTER TABLE `roles_modulos`
  MODIFY `id_roles_modulos` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `codTeam` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `torneos`
--
ALTER TABLE `torneos`
  MODIFY `codTorneo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `jugadores_team`
--
ALTER TABLE `jugadores_team`
  ADD CONSTRAINT `fk_jugadores_team_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_jugadores_team_team1` FOREIGN KEY (`team_codTeam`) REFERENCES `team` (`codTeam`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `fk_participantes_torneos` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `fk_partidos_torneos1` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `roles_modulos`
--
ALTER TABLE `roles_modulos`
  ADD CONSTRAINT `fk_roles_has_modulos_modulos1` FOREIGN KEY (`modulos_id_modulo`) REFERENCES `modulos` (`id_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_roles_has_modulos_roles1` FOREIGN KEY (`roles_id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios_rol1_idx` FOREIGN KEY (`rol_id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
