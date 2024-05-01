CREATE DATABASE  IF NOT EXISTS `taradb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `taradb`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: taradb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `qa`
--

DROP TABLE IF EXISTS `qa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qa` (
  `qa_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `draft` text COLLATE utf8_persian_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `refId` char(36) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`qa_id`),
  KEY `qa_qa_id` (`qa_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qa`
--

LOCK TABLES `qa` WRITE;
/*!40000 ALTER TABLE `qa` DISABLE KEYS */;
INSERT INTO `qa` VALUES ('0a277959-304f-4789-b7d0-3589a039094b','qa 4',1,'2024-04-30 19:35:39','2024-04-30 19:35:39',NULL),('3878fd41-c7c1-4a04-9c51-936b432bfd00','qa 3',1,'2024-04-30 18:11:34','2024-04-30 18:11:34',NULL),('6a018015-dd7f-4b51-91c3-e9999c5bb97c','qa 1',1,'2024-04-30 18:11:41','2024-04-30 18:11:41',NULL),('d5432216-5d9c-40fc-a1bf-910c1a2698e4','qa 2',0,'2024-04-30 18:11:47','2024-04-30 18:12:53',NULL);
/*!40000 ALTER TABLE `qa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qauser`
--

DROP TABLE IF EXISTS `qauser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qauser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `u_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `qa_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `isLiked` tinyint(1) DEFAULT NULL,
  `view` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qauser`
--

LOCK TABLES `qauser` WRITE;
/*!40000 ALTER TABLE `qauser` DISABLE KEYS */;
INSERT INTO `qauser` VALUES (8,'79e7091a-a122-4ed9-be95-cf3306a0a756','d5432216-5d9c-40fc-a1bf-910c1a2698e4',0,NULL,'2024-04-30 00:00:00','2024-04-30 00:00:00');
/*!40000 ALTER TABLE `qauser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `s_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `draft` text COLLATE utf8_persian_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `section_s_id` (`s_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES ('1661259c-3861-4106-bd75-824bc85b8ad3','section10',1,'2024-04-30 21:35:26','2024-04-30 21:35:26'),('1fdc7ee1-60a7-4627-b27f-23890fb77937','section2',1,'2024-04-30 17:52:38','2024-04-30 17:52:38'),('4d8ccfdc-4e41-4fc6-b88e-a7dbd5d71e9a','section1',1,'2024-04-30 17:52:32','2024-04-30 17:52:32'),('a49c7be4-c044-45d5-8677-6b6a5cb9bf61','section3',1,'2024-04-30 19:02:14','2024-04-30 19:02:14'),('ce565320-a0d3-4d13-a4d8-82a58cfa4cea','section3',1,'2024-04-30 18:25:25','2024-04-30 18:25:25');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sectiontopic`
--

DROP TABLE IF EXISTS `sectiontopic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sectiontopic` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `s_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `t_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`s_id`,`t_id`),
  KEY `t_id` (`t_id`),
  CONSTRAINT `sectiontopic_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `section` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sectiontopic_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `topic` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sectiontopic`
--

LOCK TABLES `sectiontopic` WRITE;
/*!40000 ALTER TABLE `sectiontopic` DISABLE KEYS */;
INSERT INTO `sectiontopic` VALUES ('2024-04-30 00:00:00','2024-04-30 00:00:00','1661259c-3861-4106-bd75-824bc85b8ad3','b7b743a9-8bba-4fee-a989-5831b1bcf30e');
/*!40000 ALTER TABLE `sectiontopic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `t_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`t_id`),
  KEY `topic_t_id` (`t_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
INSERT INTO `topic` VALUES ('40d7032c-9c7e-4867-9181-fec16d03265a','topic 1','2024-04-30 17:59:13','2024-04-30 17:59:13'),('a3328562-a705-4aff-b1bb-cab5816f50db','topic 2','2024-04-30 17:59:20','2024-04-30 18:00:05'),('b7b743a9-8bba-4fee-a989-5831b1bcf30e','topic 10','2024-04-30 21:36:24','2024-04-30 21:36:24');
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topicqa`
--

DROP TABLE IF EXISTS `topicqa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topicqa` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `qa_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `t_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`qa_id`,`t_id`),
  KEY `t_id` (`t_id`),
  CONSTRAINT `topicqa_ibfk_1` FOREIGN KEY (`qa_id`) REFERENCES `qa` (`qa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `topicqa_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `topic` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topicqa`
--

LOCK TABLES `topicqa` WRITE;
/*!40000 ALTER TABLE `topicqa` DISABLE KEYS */;
INSERT INTO `topicqa` VALUES ('2024-04-30 00:00:00','2024-04-30 00:00:00','6a018015-dd7f-4b51-91c3-e9999c5bb97c','b7b743a9-8bba-4fee-a989-5831b1bcf30e');
/*!40000 ALTER TABLE `topicqa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `u_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `password` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`u_id`),
  KEY `user_u_id` (`u_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('4824ff41-f0ec-4df7-9b91-efc96322c9d3','ayda',0,'2024-04-30 17:48:43','2024-04-30 17:48:43','1234'),('79e7091a-a122-4ed9-be95-cf3306a0a756','sepideh',1,'2024-04-30 17:48:21','2024-04-30 17:48:21','1234');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userqa`
--

DROP TABLE IF EXISTS `userqa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userqa` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `u_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `qa_id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `isLiked` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`u_id`,`qa_id`),
  KEY `qa_id` (`qa_id`),
  CONSTRAINT `userqa_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userqa_ibfk_2` FOREIGN KEY (`qa_id`) REFERENCES `qa` (`qa_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userqa`
--

LOCK TABLES `userqa` WRITE;
/*!40000 ALTER TABLE `userqa` DISABLE KEYS */;
INSERT INTO `userqa` VALUES ('2024-04-04 00:00:00','2024-09-09 00:00:00','79e7091a-a122-4ed9-be95-cf3306a0a756','0a277959-304f-4789-b7d0-3589a039094b',NULL),('2024-04-30 00:00:00','2024-04-30 00:00:00','79e7091a-a122-4ed9-be95-cf3306a0a756','6a018015-dd7f-4b51-91c3-e9999c5bb97c',NULL);
/*!40000 ALTER TABLE `userqa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-01 10:41:41
