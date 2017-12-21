-- MySQL dump 10.13  Distrib 5.7.11, for Win64 (x86_64)
--
-- Host: localhost    Database: ylwq
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

USE ylwq;

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sponsor_user_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `location` varchar(100) NOT NULL,
  `brief_intro` varchar(200) DEFAULT '无',
  `note` varchar(200) DEFAULT '无',
  `participant_number` int(11) DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  `activity_bill_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_sponsor_user_id` (`sponsor_user_id`),
  KEY `idx_club_id` (`club_id`),
  CONSTRAINT `fk_activity_club` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_user` FOREIGN KEY (`sponsor_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (2,1,1,'开黑','1999-09-09 11:11:00','1999-09-09 11:15:00','home','2331','233',1,'2017-03-24 15:09:28','P'),(4,1,1,'LOL','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',1,'2017-03-24 16:58:10','P'),(5,1,1,'放假','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',1,'2017-03-24 16:58:27','P'),(7,1,8,'开黑','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',2,'2017-03-31 14:46:39','P'),(8,2,2,'洗澡','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',1,'2017-03-31 22:14:41','U'),(9,2,2,'喝水','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',0,'2017-03-31 22:15:27','U'),(10,2,2,'喝水','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',0,'2017-03-31 22:19:10','U'),(11,2,2,'喝水','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',1,'2017-03-31 22:21:23','U'),(12,1,3,'开黑sss','2017-03-18 18:22:00','2017-03-20 22:22:00','家里',NULL,'',0,'2017-03-31 22:58:05','U'),(13,1,2,'1','2017-04-01 19:41:00','2017-04-01 19:44:00','1','','',1,'2017-04-01 19:29:13','U'),(14,1,2,'名称','2017-04-01 19:32:00','2017-04-01 19:36:00','地点','简介','备注',2,'2017-04-01 19:30:38','P'),(15,2,1,'test','2017-03-18 18:22:00','2017-03-20 22:22:00','家里','','',0,'2017-04-02 18:56:23','U'),(16,3,1,'111','2017-04-03 00:34:00','2017-04-07 00:26:00','222','','',0,'2017-04-03 00:30:15','P'),(17,3,2,'1','2017-04-03 00:41:00','2017-04-07 00:37:00','2','','',0,'2017-04-03 00:37:22','U'),(18,1,2,'222','2017-04-03 15:19:00','2017-04-03 15:20:00','231232','','',0,'2017-04-03 15:18:08','U'),(19,1,1,'new','2017-04-11 16:06:00','2017-04-15 16:51:00','999','','3ssszzdd',1,'2017-04-03 16:02:57','U'),(20,1,3,'更新','2017-04-07 23:16:00','2017-04-19 23:13:00','22','123123','',1,'2017-04-03 23:14:30','U'),(21,1,1,'222','2017-04-05 17:00:00','2017-04-06 15:00:00','33','','',0,'2017-04-04 15:01:57','U'),(22,1,1,'试一下','2017-04-04 21:17:00','2017-04-04 23:17:00','宿舍就好了','好吧','备注一下',1,'2017-04-04 15:26:54','U'),(23,1,2,'978978','2017-04-10 22:06:00','2017-04-11 22:06:00','78978','7788978','ggg',1,'2017-04-05 22:06:38','U'),(24,2,3,'lyj','2017-04-10 17:42:00','2017-04-14 17:42:00','zz','adasd','',2,'2017-04-06 17:44:29','U'),(25,1,1,'dasd','2017-04-11 18:18:00','2017-04-16 18:18:00','ass','aszz','',0,'2017-04-07 19:35:01','U'),(26,3,2,'444','2017-04-12 18:18:00','2017-04-14 18:18:00','xZ','sss','',0,'2017-04-07 19:39:38','U');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_bill`
--

DROP TABLE IF EXISTS `activity_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publish_time` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `last_modify_time` datetime DEFAULT NULL,
  `publisher_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_bill`
--

LOCK TABLES `activity_bill` WRITE;
/*!40000 ALTER TABLE `activity_bill` DISABLE KEYS */;
INSERT INTO `activity_bill` VALUES (2,'2017-04-07 19:34:41','P','2017-04-07 19:34:41',1),(4,'2017-04-05 22:32:31','F','2017-04-06 16:20:50',1),(5,'2017-04-04 14:31:32','P','2017-04-04 14:31:32',1),(7,'2017-04-06 21:08:24','F','2017-04-06 16:58:06',1),(14,'2017-04-05 22:41:41','P','2017-04-07 19:34:20',1),(16,'2017-04-07 19:36:51','P','2017-04-07 19:36:51',3);
/*!40000 ALTER TABLE `activity_bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_bill_item`
--

DROP TABLE IF EXISTS `activity_bill_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_bill_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_bill_id` int(11) DEFAULT NULL,
  `description` varchar(30) NOT NULL,
  `cost` double NOT NULL DEFAULT '0',
  `note` varchar(30) DEFAULT NULL,
  `payer_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_activity_bill_id` (`activity_bill_id`),
  KEY `idx_payer_user_id` (`payer_user_id`),
  CONSTRAINT `fk_activity_bill_item_activity_bill` FOREIGN KEY (`activity_bill_id`) REFERENCES `activity_bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_bill_item_user` FOREIGN KEY (`payer_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_bill_item`
--

LOCK TABLES `activity_bill_item` WRITE;
/*!40000 ALTER TABLE `activity_bill_item` DISABLE KEYS */;
INSERT INTO `activity_bill_item` VALUES (32,5,'描述1',20,'',1),(41,14,'12312',124,'1231',8),(47,4,'3123123',131,'1312312',1),(48,7,'球77',20,'CH用得少',1),(49,7,'水',20,'5瓶',1),(50,2,'13123',1121,'xcc',1),(51,16,'tyutyuty',0,'4444',3);
/*!40000 ALTER TABLE `activity_bill_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_bill_participant_payment`
--

DROP TABLE IF EXISTS `activity_bill_participant_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_bill_participant_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_bill_id` int(11) DEFAULT NULL,
  `participant_user_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `is_paid` tinyint(1) DEFAULT NULL,
  `pay_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_activity_bill_id` (`activity_bill_id`),
  KEY `idx_participant_user_id` (`participant_user_id`),
  CONSTRAINT `fk_activity_bill_participant_payment_activity_bill` FOREIGN KEY (`activity_bill_id`) REFERENCES `activity_bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_bill_participant_payment_user` FOREIGN KEY (`participant_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_bill_participant_payment`
--

LOCK TABLES `activity_bill_participant_payment` WRITE;
/*!40000 ALTER TABLE `activity_bill_participant_payment` DISABLE KEYS */;
INSERT INTO `activity_bill_participant_payment` VALUES (20,5,1,20,NULL,NULL),(25,4,2,131,NULL,NULL),(27,14,1,122,NULL,NULL),(28,14,2,2,NULL,NULL),(29,7,1,10,NULL,NULL),(30,7,3,30,NULL,NULL),(31,4,1,24,NULL,NULL),(32,2,1,21,NULL,NULL),(33,2,3,1100,NULL,NULL);
/*!40000 ALTER TABLE `activity_bill_participant_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_user_id` int(11) DEFAULT NULL,
  `club_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `reply_time` datetime DEFAULT NULL,
  `replier_user_id` int(11) DEFAULT NULL,
  `message` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_club_id` (`club_id`),
  KEY `idx_applicant_user_id_club_id_status` (`applicant_user_id`,`club_id`,`status`),
  CONSTRAINT `fk_application_club` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_application_user` FOREIGN KEY (`applicant_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES (1,2,1,'2017-03-23 13:54:22','R','2017-03-23 13:55:02',1,NULL),(2,2,1,'2017-03-23 13:55:08','A','2017-03-23 13:55:23',1,NULL),(3,3,1,'2017-03-24 14:56:33','A','2017-03-24 14:57:19',1,NULL),(4,3,1,'2017-03-24 14:57:56','A','2017-03-24 14:58:18',1,NULL),(5,3,1,'2017-03-24 14:59:12','A','2017-03-24 14:59:22',1,NULL),(6,3,1,'2017-03-24 15:01:10','A','2017-03-24 15:01:13',1,NULL),(7,3,1,'2017-03-24 15:01:55','A','2017-03-24 15:01:58',1,NULL),(8,2,3,'2017-03-31 15:04:59','A','2017-03-31 15:06:51',1,NULL),(9,3,3,'2017-03-31 15:08:55','A','2017-03-31 15:12:18',1,NULL),(11,3,2,'2017-03-31 21:44:09','A','2017-03-31 21:54:54',2,NULL),(12,1,2,'2017-03-31 22:01:40','R','2017-03-31 22:02:47',2,NULL),(13,1,2,'2017-03-31 22:03:09','A','2017-03-31 22:31:16',2,NULL),(21,4,1,'2017-04-01 14:45:02','R','2017-04-01 14:56:11',1,NULL),(23,4,1,'2017-04-01 15:17:27','A','2017-04-01 15:19:50',1,'嘻嘻'),(26,6,1,'2017-04-02 19:14:48','R','2017-04-02 20:35:53',1,NULL),(27,2,1,'2017-04-06 18:56:39','A','2017-04-06 18:56:51',1,'hhhhh'),(28,2,1,'2017-04-06 18:57:49','A','2017-04-06 18:58:04',1,'dasdasds'),(29,2,2,'2017-04-06 19:07:19','U',NULL,NULL,'222'),(30,2,1,'2017-04-06 19:08:48','A','2017-04-06 19:09:10',1,'hh'),(31,3,1,'2017-04-06 21:43:07','U',NULL,NULL,'SYSU'),(32,3,5,'2017-04-06 21:43:46','U',NULL,NULL,'SYSU'),(34,3,2,'2017-04-07 19:38:58','A','2017-04-07 19:39:10',2,'ssd');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenger_user_id` int(11) DEFAULT NULL,
  `activity_bill_id` int(11) DEFAULT NULL,
  `message` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_challenger_user_id_activity_bill_id` (`challenger_user_id`,`activity_bill_id`),
  KEY `idx_activity_bill_id` (`activity_bill_id`),
  CONSTRAINT `fk_activity_bill_challenge` FOREIGN KEY (`activity_bill_id`) REFERENCES `activity_bill` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_challenge` FOREIGN KEY (`challenger_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (21,1,5,NULL,NULL);
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `founder_user_id` int(11) DEFAULT NULL,
  `brief_intro` varchar(200) DEFAULT '无',
  `create_time` datetime DEFAULT NULL,
  `member_number` int(11) DEFAULT '1',
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`),
  KEY `idx_founder_user_id` (`founder_user_id`),
  CONSTRAINT `fk_club_user` FOREIGN KEY (`founder_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (1,1,'随便…','2017-03-23 13:52:58',9,'SYSU'),(2,2,'无','2017-03-29 20:23:21',4,'CHINA'),(3,1,NULL,'2017-03-31 00:45:23',3,'315'),(5,2,'','2017-04-01 20:25:46',1,'SYSU2'),(6,2,'adasda','2017-04-01 20:26:10',1,'inn'),(8,2,NULL,'2017-04-02 17:54:20',1,'吃饭'),(9,1,'','2017-04-03 17:49:14',1,'xxx'),(10,1,'23123','2017-04-04 15:00:46',1,'333'),(11,1,'','2017-04-04 15:10:27',1,'2132'),(13,1,'','2017-04-04 15:12:38',1,'21325'),(14,1,'','2017-04-04 15:14:12',1,'213259');
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_bulletin`
--

DROP TABLE IF EXISTS `club_bulletin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club_bulletin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publisher_user_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `content` varchar(200) NOT NULL,
  `publish_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_publisher_user_id` (`publisher_user_id`),
  KEY `idx_club_id_publish_time` (`club_id`,`publish_time`),
  CONSTRAINT `fk_club_club_bulletin` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_club_bulletin` FOREIGN KEY (`publisher_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_bulletin`
--

LOCK TABLES `club_bulletin` WRITE;
/*!40000 ALTER TABLE `club_bulletin` DISABLE KEYS */;
INSERT INTO `club_bulletin` VALUES (22,1,1,'新公告','无','2017-03-23 15:23:30'),(23,1,1,'公告','无','2017-03-24 17:11:10'),(24,2,1,'adasd','hahahah','2017-03-30 11:11:00'),(25,2,1,'adasd','hahahah','2017-03-30 11:11:00'),(28,2,1,'adasd','hahahah','2017-03-30 11:13:00'),(30,2,1,'adasd','hahahah','2017-03-30 11:15:00'),(32,2,1,'adasd','hahahah','2017-03-30 11:17:00'),(33,2,1,'adasd','hahahah','2017-03-30 11:33:00'),(35,2,1,'adasd','hahahah','2017-03-30 06:11:00'),(36,2,1,'adasd','hahahah','2017-03-30 15:11:00'),(37,1,3,'新公告','今天下雨，很烦。','2017-03-31 14:51:22'),(38,1,1,'呃','哈哈','2017-03-31 20:46:48'),(39,1,1,'新的','试试','2017-03-31 20:47:46'),(40,1,1,'哇的','O(∩_∩)O谢谢','2017-03-31 20:49:47'),(41,1,1,'呃','天啊','2017-03-31 20:50:31'),(42,1,2,'哈哈','呃','2017-03-31 20:56:21'),(43,2,2,'?','?','2017-03-31 21:10:40'),(44,1,1,'233','adasd','2017-04-01 14:45:24'),(45,1,1,'233','adasd','2017-04-01 14:45:25'),(46,1,1,'111','555','2017-04-01 14:46:09'),(47,1,1,'哈哈','还可以','2017-04-01 17:41:54'),(48,2,5,'新的公告','大家好','2017-04-01 20:27:04'),(49,1,1,'新公告','222','2017-04-02 17:14:20'),(50,1,1,'hah','时区很烦','2017-04-04 15:19:31'),(51,1,10,'公告','哈哈哈','2017-04-05 12:43:03'),(52,1,1,'33','2','2017-04-05 17:17:06'),(53,1,1,'asdas','zz','2017-04-07 19:35:05');
/*!40000 ALTER TABLE `club_bulletin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club_message`
--

DROP TABLE IF EXISTS `club_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operator_user_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `target_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_operator_user_id` (`operator_user_id`),
  KEY `idx_club_id_create_time` (`club_id`,`create_time`),
  CONSTRAINT `fk_club_club_message` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_club_message` FOREIGN KEY (`operator_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=882 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_message`
--

LOCK TABLES `club_message` WRITE;
/*!40000 ALTER TABLE `club_message` DISABLE KEYS */;
INSERT INTO `club_message` VALUES (33,1,1,NULL,NULL,'C','2017-03-23 13:52:58',NULL,NULL),(34,1,2,NULL,NULL,'C','2017-03-29 20:23:21',NULL,NULL),(35,1,3,NULL,NULL,'C','2017-03-31 00:45:23',NULL,NULL),(36,1,3,NULL,NULL,'A','2017-03-31 14:46:39',7,NULL),(38,1,3,NULL,NULL,'E','2017-03-31 15:12:18',3,'CJS'),(816,2,2,NULL,NULL,'E','2017-03-31 21:54:54',3,'CJS'),(817,2,2,NULL,NULL,'A','2017-03-31 22:14:41',8,NULL),(818,2,2,NULL,NULL,'A','2017-03-31 22:15:27',9,NULL),(819,2,2,NULL,NULL,'A','2017-03-31 22:19:10',10,NULL),(820,2,2,NULL,NULL,'A','2017-03-31 22:21:23',11,NULL),(821,2,2,NULL,NULL,'E','2017-03-31 22:31:16',1,'CH'),(822,1,3,NULL,NULL,'A','2017-03-31 22:58:05',12,NULL),(823,1,1,NULL,NULL,'E','2017-04-01 15:19:50',4,'LYX'),(824,1,2,NULL,NULL,'A','2017-04-01 19:29:13',13,NULL),(825,1,2,NULL,NULL,'A','2017-04-01 19:30:38',14,NULL),(826,2,5,NULL,NULL,'C','2017-04-01 20:25:46',NULL,NULL),(827,2,6,NULL,NULL,'C','2017-04-01 20:26:10',NULL,NULL),(828,2,8,NULL,NULL,'C','2017-04-02 17:54:20',NULL,NULL),(829,2,1,NULL,NULL,'A','2017-04-02 18:56:23',15,NULL),(830,1,1,NULL,NULL,'E','2017-04-02 20:22:21',6,'LCG'),(831,1,1,NULL,NULL,'E','2017-04-02 20:24:55',6,'LCG'),(832,1,1,NULL,NULL,'E','2017-04-02 20:25:44',6,'LCG'),(833,3,1,NULL,NULL,'A','2017-04-03 00:30:15',16,NULL),(834,3,2,NULL,NULL,'A','2017-04-03 00:37:22',17,NULL),(835,1,2,NULL,NULL,'A','2017-04-03 15:18:08',18,NULL),(836,1,1,NULL,NULL,'A','2017-04-03 16:02:57',19,NULL),(837,1,9,NULL,NULL,'C','2017-04-03 17:49:14',NULL,NULL),(839,1,1,NULL,NULL,'AB','2017-04-03 23:13:57',2,'开黑'),(840,1,3,NULL,NULL,'A','2017-04-03 23:14:30',20,'更新'),(841,1,1,NULL,NULL,'AB','2017-04-04 12:54:28',5,'放假'),(842,1,3,NULL,NULL,'AB','2017-04-04 13:02:06',12,'开黑sss'),(843,1,1,NULL,NULL,'AB','2017-04-04 14:29:12',2,'开黑'),(844,1,1,NULL,NULL,'AB','2017-04-04 14:31:32',5,'放假'),(845,1,10,NULL,NULL,'C','2017-04-04 15:00:46',NULL,NULL),(846,1,1,NULL,NULL,'A','2017-04-04 15:01:57',21,'222'),(847,1,1,NULL,NULL,'A','2017-04-04 15:26:54',22,'试一下'),(848,1,2,NULL,NULL,'AB','2017-04-04 16:15:15',14,'名称'),(849,1,1,NULL,NULL,'AB','2017-04-04 16:24:41',2,'开黑'),(850,1,1,NULL,NULL,'AU','2017-04-04 17:46:12',19,'new'),(851,1,1,NULL,NULL,'AU','2017-04-04 17:48:49',19,'new'),(852,1,1,NULL,NULL,'AU','2017-04-04 17:49:31',19,'new'),(853,1,1,NULL,NULL,'AU','2017-04-04 17:54:19',19,'new'),(854,1,3,NULL,NULL,'AU','2017-04-05 21:58:14',20,'更新'),(855,1,2,NULL,NULL,'A','2017-04-05 22:06:39',23,'978978'),(856,1,2,NULL,NULL,'AU','2017-04-05 22:06:53',23,'978978'),(857,1,2,NULL,NULL,'AB','2017-04-05 22:29:54',18,'222'),(858,1,1,NULL,NULL,'AB','2017-04-05 22:32:31',4,'LOL'),(859,1,2,NULL,NULL,'AB','2017-04-05 22:34:26',13,'1'),(860,1,2,NULL,NULL,'AB','2017-04-05 22:41:41',14,'名称'),(861,1,1,NULL,NULL,'ABU','2017-04-06 17:21:50',4,'LOL'),(862,2,3,NULL,NULL,'A','2017-04-06 17:44:29',24,'lyj'),(863,1,1,NULL,NULL,'E','2017-04-06 18:56:51',2,'LYJ'),(864,1,1,NULL,NULL,'E','2017-04-06 18:58:04',2,'LYJ'),(865,1,1,NULL,NULL,'E','2017-04-06 19:09:10',2,'LYJ'),(866,2,1,NULL,NULL,'Q','2017-04-06 19:09:27',NULL,NULL),(867,1,8,NULL,NULL,'AB','2017-04-06 21:08:24',7,'开黑'),(868,1,8,NULL,NULL,'ABU','2017-04-06 21:08:47',7,'开黑'),(869,3,2,NULL,NULL,'Q','2017-04-06 21:24:59',NULL,NULL),(870,1,1,NULL,NULL,'ABF','2017-04-07 16:31:48',4,'LOL'),(871,1,8,NULL,NULL,'ABU','2017-04-07 16:58:06',7,'开黑'),(872,1,8,NULL,NULL,'ABF','2017-04-07 17:00:47',7,'开黑'),(873,1,1,NULL,NULL,'ABF','2017-04-07 17:12:09',4,'LOL'),(874,1,1,NULL,NULL,'ABF','2017-04-07 17:14:59',4,'LOL'),(875,1,2,NULL,NULL,'ABU','2017-04-07 19:33:21',14,'名称'),(876,1,2,NULL,NULL,'ABU','2017-04-07 19:34:20',14,'名称'),(877,1,1,NULL,NULL,'AB','2017-04-07 19:34:41',2,'开黑'),(878,1,1,NULL,NULL,'A','2017-04-07 19:35:01',25,'dasd'),(879,3,1,NULL,NULL,'AB','2017-04-07 19:36:51',16,'111'),(880,2,2,NULL,NULL,'E','2017-04-07 19:39:10',3,'CJS'),(881,3,2,NULL,NULL,'A','2017-04-07 19:39:38',26,'444');
/*!40000 ALTER TABLE `club_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `publish_time` datetime DEFAULT NULL,
  `author` varchar(15) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `img_url` varchar(200) DEFAULT NULL,
  `brief` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_publish_time` (`publish_time`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (3,'曼联与边锋林加德续约至2021年','2017-04-07 22:00:21','虎扑体育','<img src=\"https://c2.hoopchina.com.cn/uploads/star/event/images/170407/2d97a1a14ba20fdba5f26e1809f8dc81b2a34ba2.jpg?x-oss-process=image/resize,w_400/format,webp\">\n<p>虎扑足球4月7日讯 曼联通过官网宣布与24岁的边锋林加德续约4年。林加德在7岁便进入曼联青训，他在2014-15赛季对阵斯旺西的比赛中便在老特拉福德完成了首秀。他目前已经为曼联上场了70次，并且贡献了11个进球。</p>\n<p>他说：“曼联是我生命中很重要的一部分。我在7岁的时候就进入曼联了，每当我穿上曼联球衣，我就感觉到骄傲。在两次杯赛的决赛为球队进球，是我和我的家人都感觉到非常骄傲的时刻。”</p>\n<p>“就曼联来讲，本赛季，我们已经获得了一个奖杯，我希望我以后可以在这位伟大的教练治下赢得更多的奖杯。我想要对球迷们说：谢谢他们一直以来的支持。”</p>\n<p>穆里尼奥对此说：“杰西在7岁的时候就进入球队了。他有能力，有能量，而且有着很高的球商，这将会让他成为更优秀的球员。他在球队中很受欢迎，而我也非常高兴能看到他续约。”</p>','https://c2.hoopchina.com.cn/uploads/star/event/images/170407/2d97a1a14ba20fdba5f26e1809f8dc81b2a34ba2.jpg?x-oss-process=image/resize,w_400/format,webp','曼联通过官网宣布与24岁的边锋林加德续约4年。'),(4,'横扫！新疆4-0夺队史首冠！','2017-04-07 22:35:41','新浪体育','<img src=\"//n.sinaimg.cn/sports/transform/20170407/5swV-fyecrxv4517684.jpg\">\n<p>北京时间4月7日，2016-17赛季CBA联赛总决赛第四场比赛今晚继续进行。上一场比赛广东队主场不敌新疆队，今晚广东继续坐镇主场迎战新疆队，最终新疆客场115-109战胜广东队，以总比分4-0淘汰广东队获得本赛季总冠军。</p>\n\n<p>数据方面，广东队易建联13分6篮板，周鹏22分7篮板4助攻，周湛东11分，斯隆26分6篮板4助攻，布泽尔28分17篮板。新疆队周琦18分10篮板，李根11分2篮板3助攻，可兰白克8分2助攻，亚当斯37分7抢断2篮板6助攻，布拉切22分5篮板2助攻。</p>\n\n<img src=\"//www.sinaimg.cn/dy/slidenews/2_img/2017_14/792_2098085_836635.jpg\">\n\n<p>首节开打，亚当斯突破分球给俞长栋跳投命中开场首球，斯隆外线3分稳稳命中，周鹏攻守转换中上篮命中，接着3分再中，广东8-4暂时领先。易建联连续篮下得分，西热力江外线3分命中，回来周鹏3分还以颜色。斯隆急停跳投命中，周湛东空位3分稳稳命中打停新疆队，暂停回来西热力江空切上篮命中。周琦快攻转换中打成2+1，布拉切高位跳投也中。任骏飞抢断反击上篮命中，第一节比赛结束，广东主场27-17领先新疆队。</p>\n\n<p>次节回来双方换上双外援，布拉切抢断上篮命中接着3分再中，新疆连追5分打停广东队，暂停回来周鹏传球失误，李根快攻上篮命中。易建联快攻中接到周鹏的传球单臂劈扣，布拉切快攻中背后传球助攻可兰白克扣篮得分，接着亚当斯抢断反击上篮命中将比分反超，新疆打出一波13-2的小高潮。赵睿外线3分稳稳命中为主队稳住场上局面，亚当斯张手3分也中。半场比赛结束，广东主场49-53落后新疆队。</p>\n\n<p>易边再战，亚当斯延续上半场的手感，张手3分就中。新疆造成广东失误，周琦快攻暴扣，回来易建联上篮命中继续追赶比分。布泽尔中投命中，亚当斯单打跳投也中继续保持比分优势，布泽尔连拿6分继续帮助球队将分差缩小至5分。新疆请求暂停，暂停回来新疆出现失误，回来布泽尔中投再中。李根空位3分稳稳命中，回来斯隆3分还以颜色。李根篮下强打命中，布泽尔强打二次篮板补篮命中。三节战罢，新疆客场87-75领先广东队。</p>\n\n<p>末节争夺，周琦外线3分命中，布泽尔篮下补篮打成2+1，接着布泽尔强突内线上篮命中继续缩小分差。罗旭东抢断上篮造成犯规两罚两中，任骏飞突破上篮稳稳命中，广东打出一波9-2小高潮。布拉切篮下强打稳稳命中，周湛东空位3分命中，周鹏3分再中将分差缩小至4分。亚当斯反击中打成2+1，斯隆3分给予回应。最后时刻新疆牢牢把握住场上局面，随着时间的减少，最终全场比赛结束，新疆客场115-109击败广东队。</p>','//n.sinaimg.cn/sports/transform/20170407/5swV-fyecrxv4517684.jpg','CBA新疆队以总比分4-0淘汰广东队获得本赛季总冠军。'),(5,'书豪32分创赛季得分新高 篮网不敌魔术止步3连胜','2017-04-07 22:40:27','腾讯体育','<p>腾讯体育4月7日讯 魔术坐阵主场迎战篮网，最终魔术以115-107击败篮网，终结对手3连胜。林书豪本场比赛发挥出色仍难救主，全场20投11中砍32分创创个人赛季得分新高。</p>\n\n<img src=\"http://inews.gtimg.com/newsapp_bt/0/1366462868/641\">\n\n<p>本场比赛中，佩顿拿下22分5篮板11助攻1抢断1盖帽，戈登入账21分6篮板3抢断，米克斯斩获20分。篮网方面，林书豪32分，勒维尔拿下20分，丁威迪贡献11分2抢断1盖帽。</p>\n\n<p>开场没多久，林书豪与杰弗森默契配合，空切跑篮得手率先斩落2分。第3分钟，接到弗伊的传球，杰弗森跳投得手。第8分11秒，布鲁克-洛佩兹出现传球失误，被戈登抢断。第8分28秒，佩顿在怀德海德投篮时犯规，送给篮网2次罚球机会。首节战罢，本节比分定格为25-22，篮网暂时领先。</p>\n\n<p>次节回来，第8分37秒，米克斯手滑丢球，被杰弗森抢断。第8分52秒，接到杰弗森的传球，丁威迪三分远投得手。第11分2秒，米克斯在林书豪投篮时犯规，送给篮网3次罚球机会。魔术对篮板发起疯狂进攻，本节共抢下17个篮板，包括7个前场篮板，其中奥古斯丁一人就贡献2个篮板球，凭借篮下优势追平比分。篮网在防守端筑起铜墙铁壁，此节送4记盖帽，将对手的投篮命中率压制到45.83%。半场结束，双方难分伯仲，比分战成50-50平。</p>\n\n<p>易地再战，第2分44秒，武切维奇在林书豪投篮时犯规，送给篮网2次罚球机会。第7分50秒，丁威迪出现传球失误，被戈登抢断。第9分7秒，米克斯凭借出色的个人能力突破篮网防守，禁区上篮得分。魔术打出流畅配合，此节全队共完成10次助攻，其中佩顿一人就为队友送出8次传球。篮网多次冲击篮筐，获得13次罚球机会，罚中10球，罚球命中率达到76.92%。魔术此节手感颇佳，全队投篮命中率达到60.00%，与篮网的29.41%相比更胜一筹，其中米克斯仅此节得到18分。三节打完，魔术以86-71领先。</p>\n\n<p>第四节，第4分58秒，林书豪在奥古斯丁投篮时犯规，送给魔术2次罚球机会。第5分15秒，接到怀德海德的传球，林书豪三分远投得手。第6分56秒，佩顿出现传球失误，被林书豪抢断。篮网打出流畅配合，此节全队共完成8次助攻，其中阿西一人就为队友送出2次传球。篮网三分如雨，全队本节投13粒三分球，命中率46.15%。魔术多次冲击篮筐，获得12次罚球机会，罚中11球，罚球命中率达到91.67%。比赛结束，魔术以115-107击败篮网，取得本场比赛的胜利。</p>\n\n<img src=\"http://inews.gtimg.com/newsapp_bt/0/1366297519/641\">','http://inews.gtimg.com/newsapp_bt/0/1366462868/641','篮网客场挑战魔术，林书豪本场比赛发挥出色仍难救主'),(6,'马来西亚2018不再举办F1 经典雪邦告别围场','2017-04-07 22:44:24','腾讯体育','<img alt=\"马来西亚2018不再举办F1 经典雪邦告别围场\" src=\"http://img1.gtimg.com/sports/pics/hv1/251/58/2200/143070041.jpg\">\n\n<p>北京时间4月7日，马来西亚从2018年开始将不再举办F1比赛，这意味着经典的雪邦赛道将告别围场，这对于F1在整个亚洲的发展计划是一次不小的打击。</p>\n\n<p>马来西亚从1999年开始举办F1比赛，迄今为止已经有18个年头，雪邦的高温和暴雨天气一直都是F1中一道独有的风景，在这里诞生过很多经典的比赛。但是近年来马来西亚组委会的财政情况不容乐观，高昂的主办费用，再加上票房以及电视收视率均不理想，导致马来西亚产生了弃办F1比赛的念头，在去年年底，大马政府也表示会重新审视本国的F1举办计划。</p>\n\n<p>日前F1和雪邦赛道共同作出决定，从2018年开始，马来西亚将不再举办F1比赛，F1的商业总监布拉切斯（Sean Bratches）对此表示：“和F1大家庭中的一员告别总是令人伤感，20年来马来西亚的车迷已经证明了他们对这项运动到底有多热情。”</p>\n\n<p>“正如我们之前在墨尔本所谈到的那样，我们有一个庞大的计划，希望能够让全世界的车迷能更接近这项赛事。我们期待随着赛季的开展能带来更多的进步，提供更好的体验。” 布拉切斯继续表示：“随着德国和法国站的回归，我们在2018赛季将会有21场大奖赛，我想借此机会感谢雪邦赛道多年来的敬业精神和辛勤付出，多年来他们一直致力于赛车运动的发展和推广。”</p>','http://img1.gtimg.com/sports/pics/hv1/251/58/2200/143070041.jpg','马来西亚从2018年开始将不再举办F1比赛'),(7,'杜兰特已获得医生准许 确定周日战鹈鹕复出	','2017-04-07 22:50:05','腾讯体育','<img style=\"display: block;\" src=\"http://inews.gtimg.com/newsapp_bt/0/1365936766/641\">\n\n<p>勇士官方在今天宣布，如果没有意外情况发生，杜兰特将在北京时间本周日对阵鹈鹕的比赛里复出，目前杜兰特已经获得了医生的准许，他可以重新回到场上打球。</p>\n\n<p>杜兰特终于可以回到场上了，他在此前已经参加了球队的2对2、3对3以及4对4的对抗赛，目前阿杜恢复状况良好，他也已经得到了医生的准许，可以回到场上比赛，如果杜兰特在当地时间周五（北京时间周六）的训练中一切良好，那么他将会在接下来主场对阵鹈鹕的比赛里复出。</p>\n\n<p>杜兰特在当地时间2月28日对阵奇才的比赛中被队友帕楚利亚撞到膝盖，导致内侧副韧带二级拉伤和胫骨挫伤，当时官方给出的消息是至少休息四周，在这之后，杜兰特一直在积极恢复当中，他的伤势恢复进程也非常理想，3月底的复查结果显示，杜兰特恢复顺利，在进入4月份后，他就已经开始了对抗性训练。</p>\n\n<p>主帅史蒂夫-科尔此前也表示，杜兰特的恢复效果很喜人。“我看过他几次训练，譬如2对2以及3对3，他在场上的移动非常好，他也能够有效参与到防守中，他还可以去完成突破，球场上的所有事情他都能做，希望他在未来几天还有更大的进步。”</p>\n\n<p>同时，科尔之前表示，会对杜兰特进行一些限时。“希望他能够在常规赛最后阶段复出打几场比赛，但我们也要看看具体情况，我们要看看训练师具体怎么安排，我们并不担心他的状态，毕竟，他在赛季一开始就在这里，他非常适应球队的阵容，当他回来后，我们只是需要去观察一下他的上场时间。”科尔说道。</p>\n\n<p>勇士还剩三场比赛，均为主场，分别是对阵鹈鹕、爵士和湖人，杜兰特届时也能够和球队完成磨合，为季后赛做准备。</p>\n\n<p>本赛季迄今为止，杜兰特场均出战33.6分钟，能够得到25.3分8.2个篮板4.8次助攻，他目前已经缺席了19场比赛，在杜兰特缺阵初期，勇士一度陷入到挣扎，而如今球队已经逐渐回归正轨，他们目前已经豪取13连胜，锁定联盟头名。</p>\n\n<p>本赛季，当杜兰特在场时，勇士每百回合净胜14.7分，当他不在时，这一数据下滑至8.5分，在季后赛开打后，杜兰特是一个强有力的牵制点，他也会有效分担库里肩上的重任。</p>','http://inews.gtimg.com/newsapp_bt/0/1365936766/641','杜兰特将在北京时间本周日对阵鹈鹕的比赛里复出'),(8,'壮哉韦少！锁定赛季场均三双 创55年未见神迹','2017-04-08 14:09:52','腾讯体育','<p>腾讯体育4月8日讯 雷霆客场99-120不敌太阳，韦斯特布鲁克得到23分12篮板8助攻，正式锁定本赛季场均30+10+10，他成为NBA历史第二位，1962年后首位赛季场均三双球员。</p>\n\n<img alt=\"壮哉韦少！锁定赛季场均三双 创55年未见神迹\" src=\"http://img1.gtimg.com/sports/pics/hv1/72/95/2200/143079297.jpg\">\n\n<p>在上一场对灰熊的比赛中，韦少砍下45分9篮板10助攻，已经确保本赛季场均得分篮板30+10，他只需要再送出6次助攻，就可以完成赛季场均30+10+10的神迹。</p>\n\n<p>篮球世界等待了一个赛季的悬念，终于在雷霆与太阳一战中揭晓答案。历史性的一刻在菲尼克斯托金斯迪克度假酒店球馆，在第三节比赛结束前10分36秒到来，韦少助攻奥拉迪波上篮得分，个人本场助攻达到6次，提前3场比赛锁定本赛季场均30+10+10，NBA历史第二位赛季场均三双先生出现了！韦少本赛季总计拿到2503分843篮板822助攻，赛季场均31.7分10.7篮板10.4助攻。</p>\n\n<p>在韦少之前，NBA历史只有一次出现球员赛季场均三双的情况。奥斯卡-罗伯特森在1961-62赛季场均30.8分12.5篮板11.4助攻，在那之后的55年时间里，直到韦少复制奇迹之前，NBA虽然出现了多位全能战士，比如“魔术师”和詹姆斯，但至多只是接近场均三双，真正将这种NBA上古时代的数据神话变成现实的，只有本赛季的韦少。如果你错过了“大O”当年的伟大表演，你不必遗憾，因为我们见证了韦少用不可思议的表现让尘封了55年的三双传奇苏醒了。</p>\n\n<img alt=\"壮哉韦少！锁定赛季场均三双 创55年未见神迹\" src=\"http://img1.gtimg.com/sports/pics/hv1/38/95/2200/143079263.jpg\">','http://img1.gtimg.com/sports/pics/hv1/72/95/2200/143079297.jpg','威少成为NBA历史第二位，1962年后首位赛季场均三双球员。'),(9,'中超现最强食物链 4队并驾齐驱?待恒大斩富力','2017-04-08 14:14:18','腾讯体育','<img alt=\"中超现最强食物链 4队并驾齐驱?待恒大斩富力\" src=\"http://img1.gtimg.com/sports/pics/hv1/111/93/2200/143078826.jpg\">\r \r <p>腾讯体育4月8日 昨晚鲁能输给上港后，两队在多赛一轮的情况下都拿到3胜1负的成绩，而今晚的广州德比，坐镇主场的恒大如果将富力拉下马，积分榜的前列将一片混乱，有4支球队的积分都达到9分，重现2015赛季第11轮后4队并驾齐驱的一幕。而且目前强队之间还形成连环套，鲁能能爆冷击败恒大，却奈何不了上港；上港能拿下鲁能，却无法撼动卫冕冠军；卫冕冠军不敌鲁能，却可以拿上港撒气。</p>\r \r <h4>恒大中超魔鬼赛程暂告一段落</h4>\r \r <p>恒大征战中超的前6个赛季，从未出现赛季之初连战4支强队的一幕，但今年的赛程安排，让恒大在多线作战的情况下，中超的前4轮又连续遇到国安、鲁能、上港和富力4支强队，是7个赛季以来面对的最难开局。无论是从4个对手的实力配置，还是从对手开局拿到的成绩来看，恒大可谓都经受了不小的考验。面对国安和上港惊险过关，客场爆冷不敌鲁能，恒大的开局虽然不算完美，不过也算及格。</p>\r \r <p>4月份恒大有7场比赛，不过挑战还是集中在前2战的中超赛场，拿下争冠的最大竞争对手上港后，富力又杀上门来。打完富力之后，接下来的4月征程，除了亚冠客场面对川崎前锋极为关键外，中超赛场的对手泰达、辽足、建业对恒大的威胁并不大，亚冠小组赛第5轮的对手东方更是毫无威胁。</p>\r \r <p>从赛程上来看，和富力的对决关系到恒大双线作战的前景，能在广州德比取胜，士气将进一步提升，有助于球队打好接下来的亚冠。一旦失利，不仅被富力甩开，同时还将以追赶者的身份去和上港展开竞争。</p>\r \r <h4>最强连环套，2年前4队混战一幕或重演</h4>\r \r <p>中超第4轮还在进行中，至少上赛季的亚军苏宁还未收获赛季首胜，所谓的“食物链”肯定无法形成，但中超第一集团的小“食物链”却已经出现。卫冕冠军恒大击败了上港，面对鲁能的青年近卫军却落败；鲁能能拿下恒大，却被自己培养出来的韦世豪绝杀在八万人输给上港；上港虽然第3轮不敌恒大，第4轮却拿鲁能撒气。强队之间的PK，没有球队能做到一枝独秀，也是目前积分榜前列一片混乱的原因。</p>\r \r <p>但如果要想彻底将局面搅浑，还需要恒大在广州德比拿下富力。如果恒大能如愿击败富力，前4轮过后，恒大、富力、上港和鲁能4队同积9分，谁也无法占到任何“便宜”。从恒大冲上中超以来，中超霸主极少让对手们将自己拖住，不过2015赛季，曾出现过恒大在11轮过后仍然无法领跑积分榜的一幕，而当时也有3个对手将恒大拖入到混战之中。</p>\r \r <p>2015赛季的第11轮过后，恒大、上港、国安3队都取得6胜4平1负积22分的战绩，鲁能则以7胜1平3负同样拿到22分的成绩，4支球队并列排在榜首。这样的盛景是恒大升上中超后第一次出现，直到当年的第14轮榜首大战击败鲁能，恒大随后才开始单独领跑积分榜。而这一次不用11轮，只要恒大今晚击败富力，当年4队并驾齐驱的一幕就将再次出现。</p>','http://img1.gtimg.com/sports/pics/hv1/111/93/2200/143078826.jpg','中超积分榜的前列将一片混乱'),(10,'粤媒:亚当斯与马布里相似 华南虎明年值得期待','2017-04-08 14:19:16','新浪体育','<img src=\"http://n.sinaimg.cn/sports/transform/20170408/HjuV-fyecrxv4646110.jpg\">\n\n<p>109比117，广东宏远在东莞主场以0比4的总比分输掉了总决赛。CBA联赛诞生了历史上第6支总冠军球队，他们的亚当斯拿到了总决赛的MVP。新疆主帅李秋平放出豪言：如果保持这个阵容不变，我会打造出一个新疆王朝。</p>\n\n<p>比赛的最后一次进攻，是新疆的一次反击。他们的4号亚当斯，运球到篮下，刚刚把皮球抛出手，他的队友们都已经从替补席上狂奔出来，紧紧地把他抱在了怀里，所有的新疆球员，都在狂喜和欢呼。</p>\n\n<p>新疆队的亚当斯，和成就北京王朝的马布里，有些相似的地方，但却又有些不同。他的坚韧意志和超强的个人能力，和马布里十分相似；但他却不是一个像马布里一样行事高调，甚至有些“狂”的外援。他在很多时候只是默默进攻、得分，连庆祝的动作，都很少做出。</p>\n\n<p>他用37分和6次助攻的表现，帮助自己的球队赢得比赛。亚当斯更像是一个体系球员，而他所依托的，是新疆队强大的整体。在比赛结束之后的颁奖环节之中，全队的球员都使劲地把他的手按在MVP的印泥板上。</p>\n\n<p>这支球队把亚当斯成就为CBA的新科MVP，但实际上整支新疆队，好像都是强点。一个超级巨星盘活整支球队的时代已经过去，强大的体系和超强的综合实力，带来这个总冠军。</p>\n\n<p>新疆队这个总冠军，实在是来得不容易，他们已经等待了很多年。回到更衣室之后，许多新疆队的球员都已经落下泪水，而主帅李秋平的话，或许能够让他们更团结。</p>\n\n<p>李秋平说：“如果保持这个阵容不变，我会打造一个新疆王朝。”穿着黑色的冠军T恤，新疆队的庆祝会持续整夜；而CBA或许真的将进入新疆时代。</p>\n\n<p>拼搏华南虎，下季更值得期待</p>\n\n<p>总决赛被横扫的经历，华南虎从来都没有过的，今年的这种经历，会让很多球员难忘，尤其是球队的年轻人。</p>\n\n<p>赛后的东风日产文体中心，虽然成了新疆队颁奖的舞台，但东莞的球迷很有风度，他们大多数人没有离开。宏远球员悄悄地离开场地，沿着通道走回更衣室，然后缓缓离开。</p>\n\n<p>球场中放起了《讲不出再见》，一股悲壮的气氛弥漫在赛场之中，许多球迷流下了伤心的泪水。甚至连一些从外地赶来采访的非广东记者也都被情绪感染，眼圈发红。</p>\n\n<p>这支广东队在这个赛季的最后一场比赛之中，从头开始就贯彻了“拼”这一个字：他们拼来了一个22比10的良好开局；他们在第3节落后的时候连续追赶，没有任何放弃的时刻；布泽尔在进攻打不开的时候，一度连得12分，帮助球队一直“稳住”局势；在最后时刻，球队一直咬住比分，甚至一度将分差缩小到5分……但实际上，这支宏远尽管拿出了自己最好的状态，但他们在绝对实力上，无法和强大的对手抗衡。输了今年的总决赛，真的没有什么遗憾的。“我们这个系列赛，所有的兄弟们都非常拼。就算在0比3落后的情况下，我们也没放弃……”杜锋感慨，“我们的年轻球员多。在失误上、节奏上、轮转上都不尽如人意，这就是年轻的代价。”</p>\n\n<p>这个赛季，就这样结束——从赛季开始前定下的打进季后赛的目标来看，宏远已经超额完成任务。在更新换代的过程中，宏远打进了总决赛，实际上，这已经让人满意。</p>\n\n<p>没有长青的“王朝”，也没有永远的“霸主”——华南虎本赛季收获了年轻球员的成长，下赛季更加值得期待。</p>','http://n.sinaimg.cn/sports/transform/20170408/HjuV-fyecrxv4646110.jpg','李秋平：如果保持这个阵容不变，我会打造出一个新疆王朝。');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `object_id` int(11) DEFAULT NULL,
  `object_name` varchar(30) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `subject_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (92,'活动账单更新提醒',NULL,'ABU',NULL,NULL,14,'名称'),(93,'活动账单更新提醒',NULL,'ABU',NULL,NULL,14,'名称'),(94,'活动账单提醒',NULL,'AB',NULL,NULL,2,'开黑'),(95,'新活动提醒',NULL,'AC',25,'dasd',1,'SYSU'),(96,'活动账单提醒',NULL,'AB',NULL,NULL,16,'111'),(98,'群系统消息',NULL,'A',34,NULL,NULL,NULL),(99,'群系统消息',NULL,'JC',2,'CHINA',NULL,NULL),(100,'新活动提醒',NULL,'AC',26,'444',2,'CHINA');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 NOT NULL,
  `password` varchar(16) CHARACTER SET utf8 NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_login_time` datetime DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'CH','1','2017-03-23 13:52:01','2017-04-08 14:26:39',NULL,NULL),(2,'LYJ','1','2017-03-23 13:52:18','2017-04-07 19:39:06',NULL,NULL),(3,'CJS','1','2017-03-24 14:56:07','2017-04-07 19:39:22',NULL,NULL),(4,'LYX','1','2017-04-01 13:48:27','2017-04-06 20:12:21',NULL,NULL),(6,'LCG','1','2017-04-02 16:45:40','2017-04-04 18:48:06',NULL,NULL),(8,'LLL','1','2017-04-02 22:42:08','2017-04-12 20:59:13',NULL,NULL),(9,'CCC','1','2017-04-02 22:46:52','2017-04-02 22:46:52',NULL,NULL),(10,'5','1','2017-04-07 21:44:00','2017-04-07 21:44:32',NULL,NULL),(12,'6','1','2017-04-07 21:45:06','2017-04-07 21:45:06',NULL,NULL),(13,'61','1','2017-04-07 21:46:04','2017-04-07 21:46:04',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_account` (
  `id` int(11) NOT NULL,
  `balance` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,83),(2,-655),(3,-30),(4,0),(6,0),(8,0),(9,0),(13,0);
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_activity_map`
--

DROP TABLE IF EXISTS `user_activity_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_activity_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `attend_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_id_activity_id` (`user_id`,`activity_id`),
  KEY `idx_activity_id` (`activity_id`),
  CONSTRAINT `fk_user_activity_map_activity` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_activity_map_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_activity_map`
--

LOCK TABLES `user_activity_map` WRITE;
/*!40000 ALTER TABLE `user_activity_map` DISABLE KEYS */;
INSERT INTO `user_activity_map` VALUES (49,4,2,'2017-03-24 18:27:31'),(52,5,1,'2017-03-30 15:59:19'),(54,7,1,'2017-03-31 18:59:28'),(55,7,3,'2017-03-31 19:00:35'),(56,11,2,'2017-03-31 22:55:51'),(57,14,1,'2017-04-01 19:30:54'),(61,2,1,'2017-04-02 18:30:35'),(62,8,2,'2017-04-02 20:39:41'),(63,14,2,'2017-04-02 20:40:14'),(64,13,1,'2017-04-03 02:14:04'),(65,19,1,'2017-04-03 16:03:15'),(67,2,3,NULL),(68,20,1,'2017-04-04 16:55:41'),(70,22,1,'2017-04-04 18:32:11'),(71,4,1,NULL);
/*!40000 ALTER TABLE `user_activity_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_club_map`
--

DROP TABLE IF EXISTS `user_club_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_club_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `join_time` datetime DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_id_club_id` (`user_id`,`club_id`),
  KEY `idx_club_id_role` (`club_id`,`role`),
  CONSTRAINT `fk_user_club_map_club` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_club_map_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_club_map`
--

LOCK TABLES `user_club_map` WRITE;
/*!40000 ALTER TABLE `user_club_map` DISABLE KEYS */;
INSERT INTO `user_club_map` VALUES (32,1,1,'2017-03-23 13:52:58','F'),(40,3,1,'2017-03-31 00:45:23','F'),(42,3,3,'2017-03-31 15:12:18','M'),(45,1,4,'2017-04-01 15:19:50','M'),(46,5,2,'2017-04-01 20:25:46','F'),(47,6,2,'2017-04-01 20:26:10','F'),(48,8,2,'2017-04-02 17:54:20','F'),(52,9,1,'2017-04-03 17:49:14','F'),(53,10,1,'2017-04-04 15:00:46','F'),(54,14,1,'2017-04-04 15:14:12','F'),(59,2,4,NULL,NULL),(60,2,8,NULL,NULL),(61,2,1,NULL,NULL),(62,8,1,NULL,NULL),(63,8,3,NULL,NULL),(64,1,2,NULL,NULL),(65,1,3,NULL,NULL),(66,2,2,NULL,'F'),(67,2,3,'2017-04-07 19:39:10','M');
/*!40000 ALTER TABLE `user_club_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_detail`
--

DROP TABLE IF EXISTS `user_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_detail` (
  `id` int(11) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` tinyint(1) DEFAULT '2',
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_detail`
--

LOCK TABLES `user_detail` WRITE;
/*!40000 ALTER TABLE `user_detail` DISABLE KEYS */;
INSERT INTO `user_detail` VALUES (1,'2017-04-21',0,'天气不错'),(2,'2017-04-01',2,'w我我我我'),(3,'2017-04-02',1,'sb'),(4,NULL,1,NULL),(6,'1999-09-09',1,NULL),(8,NULL,NULL,NULL),(9,'2017-04-07',1,'00000'),(13,'2017-04-06',1,'');
/*!40000 ALTER TABLE `user_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notification_map`
--

DROP TABLE IF EXISTS `user_notification_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_notification_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `notification_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `read_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_id_notification_id` (`user_id`,`notification_id`),
  KEY `idx_notification_id` (`notification_id`),
  KEY `idx_user_id_create_time` (`user_id`,`create_time`),
  CONSTRAINT `fk_notification_user_notification_map` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_user_notification_map` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notification_map`
--

LOCK TABLES `user_notification_map` WRITE;
/*!40000 ALTER TABLE `user_notification_map` DISABLE KEYS */;
INSERT INTO `user_notification_map` VALUES (151,2,92,0,NULL,'2017-04-07 19:33:21'),(152,1,92,1,'2017-04-07 21:14:09','2017-04-07 19:33:21'),(153,1,93,1,'2017-04-07 21:15:46','2017-04-07 19:34:20'),(154,2,93,0,NULL,'2017-04-07 19:34:20'),(155,3,94,1,'2017-04-07 21:05:19','2017-04-07 19:34:41'),(156,1,94,1,'2017-04-07 21:12:08','2017-04-07 19:34:41'),(157,2,95,0,NULL,'2017-04-07 19:35:01'),(158,1,95,1,'2017-04-07 21:12:09','2017-04-07 19:35:01'),(159,4,95,0,NULL,'2017-04-07 19:35:01'),(160,2,98,1,'2017-04-07 19:39:08','2017-04-07 19:38:58'),(161,3,99,1,'2017-04-07 19:39:24','2017-04-07 19:39:10'),(162,4,100,0,NULL,'2017-04-07 19:39:38'),(163,8,100,0,NULL,'2017-04-07 19:39:38'),(164,1,100,1,'2017-04-07 21:12:11','2017-04-07 19:39:38'),(165,2,100,0,NULL,'2017-04-07 19:39:38'),(166,3,100,1,'2017-04-07 19:39:44','2017-04-07 19:39:38');
/*!40000 ALTER TABLE `user_notification_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_payment`
--

DROP TABLE IF EXISTS `user_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `target_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_user_payment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_payment`
--

LOCK TABLES `user_payment` WRITE;
/*!40000 ALTER TABLE `user_payment` DISABLE KEYS */;
INSERT INTO `user_payment` VALUES (10,131,'2017-04-07 17:12:09',NULL,2,'AP',4,NULL),(11,24,'2017-04-07 17:12:09',NULL,1,'AP',4,NULL),(13,131,'2017-04-07 17:13:22',NULL,2,'AP',4,NULL),(14,24,'2017-04-07 17:13:22',NULL,1,'AP',4,NULL),(16,131,'2017-04-07 17:13:49',NULL,2,'AP',4,NULL),(17,24,'2017-04-07 17:13:49',NULL,1,'AP',4,NULL),(19,131,'2017-04-07 17:14:59',NULL,2,'AP',4,NULL),(20,24,'2017-04-07 17:14:59',NULL,1,'AP',4,NULL),(21,131,'2017-04-07 17:14:59',NULL,1,'AG',4,NULL);
/*!40000 ALTER TABLE `user_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'USER'),(2,'ADMIN');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_role_map`
--

DROP TABLE IF EXISTS `user_user_role_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user_role_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_role_id` (`user_role_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_user_user_role_map_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_user_role_map_user_role` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_role_map`
--

LOCK TABLES `user_user_role_map` WRITE;
/*!40000 ALTER TABLE `user_user_role_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_role_map` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-13 21:38:46
