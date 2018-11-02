-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2018 at 08:42 PM
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
-- Table structure for table `jugadores`
--

CREATE TABLE `jugadores` (
  `codJugadores` int(11) NOT NULL,
  `nombre_jugador` varchar(45) NOT NULL,
  `apellido_jugador` varchar(45) NOT NULL,
  `nickname_jugador` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pwd_jugador` varchar(200) NOT NULL,
  `fecha_nacimiento` varchar(200) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `team_codTeam` int(11) NOT NULL,
  `telefono_jugador` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jugadores`
--

INSERT INTO `jugadores` (`codJugadores`, `nombre_jugador`, `apellido_jugador`, `nickname_jugador`, `email`, `pwd_jugador`, `fecha_nacimiento`, `activo`, `team_codTeam`, `telefono_jugador`) VALUES
(1, 'Cesar ', 'Flamenco', 'asd', 'asd', '', '', 0, 1, 70008000),
(2, 'Marco', 'De Berlin', '', '', '', '', 0, 2, 12345678),
(3, 'Sebastian ', 'Urias', '', '', '', '', 0, 3, NULL),
(4, 'Fidel ', 'Cordova', '', '', '', '', 0, 4, NULL),
(5, 'Manuel ', 'Flores', '', '', '', '', 0, 5, NULL),
(6, 'Felipe', 'Cruz', '', '', '', '', 0, 6, NULL),
(7, 'Julio', 'Maximo', '', '', '', '', 0, 7, NULL),
(8, 'Paulino', 'James', '', '', '', '', 0, 8, NULL),
(9, 'Roberto', 'Palermo', '', '', '', '', 0, 9, NULL),
(10, 'Miguel ', 'Antonio', '', '', '', '', 0, 10, NULL),
(11, 'Barlomeo', 'Rodriguez', '', '', '', '', 0, 11, NULL),
(12, 'Hector', 'Mendoza', '', '', '', '', 0, 12, NULL),
(13, 'Cristian ', 'Gomez ', '', '', '', '', 0, 13, NULL),
(14, 'Omar', 'Angulo', '', '', '', '', 0, 14, NULL),
(15, 'Anthony', 'De la O', '', '', '', '', 0, 15, NULL),
(16, 'Franco', 'Escamilla', '', '', '', '', 0, 16, NULL),
(17, 'asd', 'asd', 'das', 'das', 'das', 'Wed Oct 31 2018 00:00:00 GMT-0600 (Central Standard Time)', 1, 0, NULL),
(18, '123', '123', '123', '123', 'email', 'Tue Jan 08 2019 00:00:00 GMT-0600 (Central Standard Time)', 1, 0, NULL),
(19, 'David', 'prueba2', 'prueba2', 'prueba@prueba.com', 'prueba@prueba.com', 'Sun Nov 11 2018 00:00:00 GMT-0600 (Central Standard Time)', 1, 0, 88887777);

-- --------------------------------------------------------

--
-- Table structure for table `modulos`
--

CREATE TABLE `modulos` (
  `id_modulo` int(11) NOT NULL,
  `nombre_modulo` varchar(50) NOT NULL,
  `descripcion_modulo` varchar(250) NOT NULL,
  `activo` bit(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `modulos`
--

INSERT INTO `modulos` (`id_modulo`, `nombre_modulo`, `descripcion_modulo`, `activo`) VALUES
(1, 'Usuarios', 'Administracion de Usuarios', b'1'),
(2, 'Roles', 'Administracion de Roles', b'1'),
(3, 'Permisos', 'Administracion de Permisos', b'1'),
(4, 'Jugadores', 'Administracion de Jugadores', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `participantes`
--

CREATE TABLE `participantes` (
  `codParticipantes` int(11) NOT NULL,
  `torneos_codTorneo` int(11) NOT NULL,
  `team_codTeams` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `participantes`
--

INSERT INTO `participantes` (`codParticipantes`, `torneos_codTorneo`, `team_codTeams`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16);

-- --------------------------------------------------------

--
-- Table structure for table `partidos`
--

CREATE TABLE `partidos` (
  `codPartido` int(11) NOT NULL,
  `equipo_1` varchar(45) DEFAULT NULL,
  `equipo_2` varchar(45) DEFAULT NULL,
  `marcador_equipo_1` varchar(45) DEFAULT NULL,
  `marcador_equipo_2` varchar(45) DEFAULT NULL,
  `torneos_codTorneo` int(11) NOT NULL
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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `modulos`, `descripcion_rol`, `activo`) VALUES
(1, 'Administrador', '3,2,1', 'Todos los privilegios', b'1'),
(2, 'Admin', '3,2,1,', 'admin', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `codTeam` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`codTeam`, `nombre`) VALUES
(1, 'The gamers test'),
(2, 'VR Team'),
(3, 'TNC Pro'),
(4, 'EHome Team'),
(5, 'OG RD'),
(6, 'Digital Chaos'),
(7, 'Team Secret'),
(8, 'MVP Phoenix'),
(9, 'MM Team'),
(10, 'Dragon Team'),
(11, 'Team Spirit'),
(12, 'Master Team'),
(13, 'Evil Team'),
(14, 'LOL Team'),
(15, 'BG Boom'),
(16, 'QuiPro Team');

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

--
-- Dumping data for table `torneos`
--

INSERT INTO `torneos` (`codTorneo`, `Nombre`, `activo`, `tipo_torneo`, `num_participantes`) VALUES
(1, 'Goldgames ', 1, 'Equipos', 16),
(3, 'DeadMatch', 0, 'Solitario', 64),
(4, 'Testing', 1, 'Equipos', 25),
(5, 'Alfin', 0, 'Equipos', 18);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `idrol` tinyint(1) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `idrol`, `nombre`, `apellido`, `email`, `username`, `pwd`, `activo`) VALUES
(1, 0, 'aaaaa', 'aaaaaa', 'castillo_5326@hotmail.com', 'admin', 'admin', 0),
(2, 0, 'bbbb', 'bbbb', 'bbbb@bbbb.com', 'bb', 'bb', 0),
(3, 0, 'ccc', 'ccc', 'ccc@ccc.com', 'ccc', 'ccc', 0),
(4, 0, 'dd', 'dd', 'dd', 'dd', 'dd', 0),
(8, 0, 'fff', 'fff', 'fff', 'fff', 'd1d7e84d9049900299ee9c0b2c04b11bfa9a0437afc0bf03d8ce0e3fb8523919f13fa3a5130c5ba7987679c6f6945ca87655e746eb5345bdc8131298fa5a9b20', 0),
(9, 0, 'ggg', 'ggg', 'ggg', 'ggg', 'fb5b2f7f3010f9c4f8d8bdb528c8a3d402f0413bf9e1e35a4fa0ff857015ae269638fbe6911bae14b51f555e27748f499ce6b68d593c4ddd059818d42860099a', 0),
(10, 0, 'hh', 'hh', 'hh', 'hh', '7de896b588a8efaf14ecf59bcf17e883194ecbc7115e259b435551d69dbaf17741f13aaab0a759567d9b6ff361b5354edb35204d41c651bb944d2d5405e5b1de', 0),
(11, 0, 'Javier', 'Castillo', 'asd@aasd,com', 'Xneaky', 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db', 0),
(12, 0, 'xxx', 'xxx', 'xxx', 'xxx', '9057ff1aa9509b2a0af624d687461d2bbeb07e2f37d953b1ce4a9dc921a7f19c45dc35d7c5363b373792add57d0d7dc41596e1c585d6ef7844cdf8ae87af443f', 0),
(13, 1, '1234', '1234', 'admin@admin.com', '1234', 'admin@admin.com', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `duelos`
--
ALTER TABLE `duelos`
  ADD PRIMARY KEY (`id_duelo`);

--
-- Indexes for table `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`codJugadores`,`team_codTeam`),
  ADD KEY `fk_jugadores_team1_idx` (`team_codTeam`);

--
-- Indexes for table `modulos`
--
ALTER TABLE `modulos`
  ADD KEY `id_modulo` (`id_modulo`);

--
-- Indexes for table `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`codParticipantes`,`torneos_codTorneo`,`team_codTeams`),
  ADD KEY `fk_participantes_torneos_idx` (`torneos_codTorneo`),
  ADD KEY `fk_jugadores_team1_idx` (`team_codTeams`);

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
-- AUTO_INCREMENT for table `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `codJugadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id_modulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `participantes`
--
ALTER TABLE `participantes`
  MODIFY `codParticipantes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `partidos`
--
ALTER TABLE `partidos`
  MODIFY `codPartido` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `codTeam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `torneos`
--
ALTER TABLE `torneos`
  MODIFY `codTorneo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `fk_jugadores_team1_idx` FOREIGN KEY (`team_codTeams`) REFERENCES `team` (`codTeam`),
  ADD CONSTRAINT `fk_participantes_jugadores1` FOREIGN KEY (`team_codTeams`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participantes_torneos` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `fk_partidos_torneos1` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
