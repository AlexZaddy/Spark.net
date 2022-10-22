-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 22 oct. 2022 à 14:09
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `spark`
--

-- --------------------------------------------------------

--
-- Structure de la table `chatbox`
--

DROP TABLE IF EXISTS `chatbox`;
CREATE TABLE IF NOT EXISTS `chatbox` (
  `IDUSER` int(11) NOT NULL,
  `IDUSER2` int(11) NOT NULL,
  `MEASSGE` varchar(255) NOT NULL,
  `IDMESSAGE` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IDMESSAGE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `spark_user_co`
--

DROP TABLE IF EXISTS `spark_user_co`;
CREATE TABLE IF NOT EXISTS `spark_user_co` (
  `USERCONNECTED` varchar(255) NOT NULL,
  `IDUSER` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `IDUSER` int(11) NOT NULL AUTO_INCREMENT,
  `PSEUDO` varchar(40) DEFAULT NULL,
  `MAIL` varchar(255) DEFAULT NULL,
  `MDP` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDUSER`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`IDUSER`, `PSEUDO`, `MAIL`, `MDP`) VALUES
(1, 'Lerax93', 'CestMoiwesh@gmail.com', 'ouioui'),
(3, 'TeoTest', 'TeoTest@gmail.com', 'ouioui');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
