-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: schema
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `BookingID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int DEFAULT NULL,
  `EmployeeID` int DEFAULT NULL,
  `LocationID` int DEFAULT NULL,
  `BookingTime` datetime DEFAULT NULL,
  `BookingNotes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `EndTime` datetime DEFAULT NULL,
  PRIMARY KEY (`BookingID`) USING BTREE,
  KEY `CustomerID` (`CustomerID`) USING BTREE,
  KEY `EmployeeID` (`EmployeeID`) USING BTREE,
  KEY `LocationID` (`LocationID`) USING BTREE,
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`EmployeeID`) REFERENCES `employees` (`EmployeeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`LocationID`) REFERENCES `locations` (`LocationID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (21,7,7,2,'2024-03-26 15:00:00','Additional ','2024-03-26 18:30:00'),(22,7,1,1,'2024-11-11 10:00:00','Special requests here','2024-11-11 14:00:00'),(23,7,7,2,'2024-03-26 11:00:00','Additional ','2024-03-26 14:30:00'),(24,7,7,2,'2024-07-12 15:00:00','Additional ','2024-07-12 18:30:00'),(25,7,7,2,'2024-09-12 15:00:00','Additional ','2024-09-12 18:30:00');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookingservices`
--

DROP TABLE IF EXISTS `bookingservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookingservices` (
  `BookingID` int NOT NULL,
  `ServiceID` int NOT NULL,
  PRIMARY KEY (`BookingID`,`ServiceID`) USING BTREE,
  KEY `ServiceID` (`ServiceID`) USING BTREE,
  CONSTRAINT `bookingservices_ibfk_1` FOREIGN KEY (`BookingID`) REFERENCES `bookings` (`BookingID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookingservices_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ServiceID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookingservices`
--

LOCK TABLES `bookingservices` WRITE;
/*!40000 ALTER TABLE `bookingservices` DISABLE KEYS */;
INSERT INTO `bookingservices` VALUES (21,1),(22,1),(23,1),(24,1),(25,1),(22,2),(21,6),(23,6),(24,6),(25,6);
/*!40000 ALTER TABLE `bookingservices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatbot`
--

DROP TABLE IF EXISTS `chatbot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatbot` (
  `ChatbotID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `MessageText` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ResponseText` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `MessageTimestamp` datetime DEFAULT NULL,
  `ResponseTimestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`ChatbotID`) USING BTREE,
  KEY `UserID` (`UserID`) USING BTREE,
  CONSTRAINT `chatbot_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatbot`
--

LOCK TABLES `chatbot` WRITE;
/*!40000 ALTER TABLE `chatbot` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatbot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `ContactID` int NOT NULL AUTO_INCREMENT,
  `CustomerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`ContactID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'John Doe','john.doe@example.com','I would like to book a spa treatment.'),(2,'Ha Huong','huongtvns@gmail.com','hhhhhhhhhhhhhhhhhhhhhhhhhhh'),(3,'Ha Huong','huongtvns@gmail.com','fffffffffffffffff'),(4,'Thị Tố Nhi Nguyễn','tonhi16022003@gmail.com','ggggggghghhhhhhhhhh');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerfeedback`
--

DROP TABLE IF EXISTS `customerfeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerfeedback` (
  `FeedbackID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int DEFAULT NULL,
  `ServiceID` int DEFAULT NULL,
  `Rating` int DEFAULT NULL,
  `Comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CreatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`FeedbackID`) USING BTREE,
  KEY `CustomerID` (`CustomerID`) USING BTREE,
  KEY `ServiceID` (`ServiceID`) USING BTREE,
  CONSTRAINT `customerfeedback_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `customerfeedback_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ServiceID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerfeedback`
--

LOCK TABLES `customerfeedback` WRITE;
/*!40000 ALTER TABLE `customerfeedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `customerfeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `EmployeeID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `SpecialtyType` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `HireDate` datetime DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `LocationID` int DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`) USING BTREE,
  KEY `LocationID` (`LocationID`) USING BTREE,
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`LocationID`) REFERENCES `locations` (`LocationID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Yoshida Yuto','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','10-6250-9175','yutoyoshida@mail.com','pi4H312qr6','wSvu2FlCxG','2024-08-05 11:14:50','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-5-1.jpg',1),(2,'Isabelle Carter','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','(151) 979 7764','hirn@outlook.com','K3mkilADqJ','BUCpkCQjQw','2009-01-21 17:06:16','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-6-1.jpg',1),(3,'Eva Adams','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','212-245-0293','zitao56@gmail.com','vbmj8AIV7a','ZsJUIPhZK5','2008-08-04 12:38:00','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-1.jpg',1),(4,'Daisy Green','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','718-596-6107','wsliao@gmail.com','TPJ8PXzimK','gRiOpkAhcO','2012-07-25 03:53:57','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-2-1.jpg',3),(5,'Amelia Wright','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','(20) 1588 3950','hejiehong@outlook.com','kksSNVasjM','5ovyvm1k5U','2009-08-31 20:15:12','https://bizweb.dktcdn.net/100/367/355/products/dongphucnhanvienspamassagedpsp-17efd26e-27ba-4684-a7cf-c383d62cc3d9.jpg?v=1591781550180',5),(6,'Leah King','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','70-1797-4378','nm1111@gmail.com','h4fxw0S3Bc','mHktl8MZQA','2013-11-17 10:29:37','https://hainguyengroup.vn/wp-content/uploads/2024/02/2-dong-phuc-nhan-vien-spa.jpg',10),(7,'Camila Hernandez','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','5342 379701','inoueai@gmail.com','B1e41hPSfV','4dbTS1lwge','2009-02-15 02:04:41','https://dongphucsaigon.vn/wp-content/uploads/2024/05/dong-phuc-spa-14.jpg.webp',2),(8,'Emma Rodriguez','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','171-3842-7425','fuy1@icloud.com','rMMjeORFmc','N3a8WcXjRr','2013-08-12 06:34:12','https://product.hstatic.net/200000732063/product/dong_phuc_spa_004_2e01483f37b44ce58f37e8883749a7ac_master.jpg',6),(9,'Natalie Martinez','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','66-687-9494','masonjaso605@icloud.com','i2Sz6UHWXu','rKNwZdqUnu','2008-08-09 16:29:34','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-2-1.jpg',8),(10,'Koo Tak Wah','All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Difficult circumstances serve as a textbook of life for people. Genius is an infinite capacity for taking pains. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. A comfort zone is a beautiful place, but nothing ever grows there. Navicat 15 has added support for the system-wide dark mode. I destroy my enemies when I make them my friends. The first step is as good as half over. It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling), over an insecure network. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. All journeys have secret destinations of which the traveler is unaware. A query is used to extract data from the database in a readable format according to the user\'s request. To connect to a database or schema, simply double-click it in the pane. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords and data (e.g. tables, views, etc) will not be stored to Navicat Cloud. I may not have gone where I intended to go, but I think I have ended up where I needed to be. The first step is as good as half over. Remember that failure is an event, not a person. You cannot save people, you can just love them. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. Anyone who has ever made anything of importance was disciplined. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. A man’s best friends are his ten fingers. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. A man’s best friends are his ten fingers. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. You will succeed because most people are lazy. Typically, it is employed as an encrypted version of Telnet. If it scares you, it might be a good thing to try. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. Anyone who has ever made anything of importance was disciplined. Anyone who has ever made anything of importance was disciplined. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. Genius is an infinite capacity for taking pains. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. The Navigation pane employs tree structure which allows you to take action upon the database and their objects through their pop-up menus quickly and easily. If opportunity doesn’t knock, build a door. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. To connect to a database or schema, simply double-click it in the pane. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. If it scares you, it might be a good thing to try. SSH serves to prevent such vulnerabilities and allows you to access a remote server\'s shell without compromising security. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. It wasn’t raining when Noah built the ark. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. The Main Window consists of several toolbars and panes for you to work on connections, database objects and advanced tools. Export Wizard allows you to export data from tables, collections, views, or query results to any available formats. The past has no power over the present moment.','66-727-9446','koo605@mail.com','L4cRlxer8S','2r8ny3XX7V','2007-11-28 04:28:17','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-2-1.jpg',4),(11,'Donna Hernandez','Anyone who has never made a mistake has never tried anything new. It wasn’t raining when Noah built the ark. Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring effective as possible. Difficult circumstances serve as a textbook of life for people. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. The first step is as good as half over. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server.','312-055-4111','dhern07@gmail.com','r1ueNrglsr','8noXH1UIuA','2001-05-03 20:20:14','https://product.hstatic.net/200000732063/product/dong_phuc_spa_004_2e01483f37b44ce58f37e8883749a7ac_master.jpg',7),(12,'Audrey Walker','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','312-682-0914','leeh9@hotmail.com','8xcxJ4o899','kdonAV6NxE','2015-09-26 04:23:18','https://dongphucsaigon.vn/wp-content/uploads/2024/05/dong-phuc-spa-14.jpg.webp',3),(13,'Yoshida Yuto','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','28-451-7112','liaws@icloud.com','n3skPkfaC2','OmyD8Ht336','2013-11-05 08:04:39','https://hainguyengroup.vn/wp-content/uploads/2024/02/2-dong-phuc-nhan-vien-spa.jpg',6),(14,'Chloe Hall','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','312-248-0854','yeofa45@mail.com','VcSgK9WLkt','BYoPhB8GbZ','2011-01-21 23:42:13','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-2-1.jpg',9),(15,'Victoria Clark','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','20-5123-2826','curtishoward@gmail.com','x7PqyYDgWY','wTVkEhhPc3','2020-05-11 11:54:34','https://bizweb.dktcdn.net/100/367/355/products/dongphucnhanvienspamassagedpsp-17efd26e-27ba-4684-a7cf-c383d62cc3d9.jpg?v=1591781550180',7),(16,'Ota Kasumi','Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files from one machine to another. A man is not old until regrets take the place of dreams. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. You cannot save people, you can just love them. Creativity is intelligence having fun. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. Sometimes you win, sometimes you learn. Typically, it is employed as an encrypted version of Telnet. A man is not old until regrets take the place of dreams. If the plan doesn’t work, change the plan, but never the goal. Navicat 15 has added support for the system-wide dark mode. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All journeys have secret destinations of which the traveler is unaware. Champions keep playing until they get it right. What you get by achieving your goals is not as important as what you become by achieving your goals. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Success consists of going from failure to failure without loss of enthusiasm. In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. Optimism is the one quality more associated with success and happiness than any other. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections. You will succeed because most people are lazy. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files from one machine to another. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. Actually it is just in an idea when feel oneself can achieve and cannot achieve. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. What you get by achieving your goals is not as important as what you become by achieving your goals. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. Flexible settings enable you to set up a custom key for comparison and synchronization. In the middle of winter I at last discovered that there was in me an invincible summer. I destroy my enemies when I make them my friends. You will succeed because most people are lazy. There is no way to happiness. Happiness is the way. How we spend our days is, of course, how we spend our lives. If you wait, all that happens is you get older. A query is used to extract data from the database in a readable format according to the user\'s request. Actually it is just in an idea when feel oneself can achieve and cannot achieve. It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling), over an insecure network. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Optimism is the one quality more associated with success and happiness than any other. Actually it is just in an idea when feel oneself can achieve and cannot achieve. It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling), over an insecure network. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. Flexible settings enable you to set up a custom key for comparison and synchronization. A man is not old until regrets take the place of dreams. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. A man’s best friends are his ten fingers. A man is not old until regrets take the place of dreams. The first step is as good as half over. To connect to a database or schema, simply double-click it in the pane. The Synchronize to Database function will give you a full picture of all database differences. How we spend our days is, of course, how we spend our lives. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. Navicat provides a wide range advanced features, such as compelling code editing capabilities, smart code-completion, SQL formatting, and more. The On Startup feature allows you to control what tabs appear when you launch Navicat. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. Instead of wondering when your next vacation is, maybe you should set up a life you don’t need to escape from. The Synchronize to Database function will give you a full picture of all database differences. The On Startup feature allows you to control what tabs appear when you launch Navicat. I destroy my enemies when I make them my friends. Success consists of going from failure to failure without loss of enthusiasm. All journeys have secret destinations of which the traveler is unaware. In the middle of winter I at last discovered that there was in me an invincible summer. Such sessions are also susceptible to session hijacking, where a malicious user takes over your session once you have authenticated. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. Anyone who has never made a mistake has never tried anything new. Optimism is the one quality more associated with success and happiness than any other. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. Flexible settings enable you to set up a custom key for comparison and synchronization. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. Export Wizard allows you to export data from tables, collections, views, or query results to any available formats. Navicat Cloud provides a cloud service for synchronizing connections, queries, model files and virtual group information from Navicat, other Navicat family members, different machines and different platforms.','90-4948-1309','ok1@outlook.com','UgFEGwk0Pq','mynmkXxv9q','2004-07-01 18:52:58','https://hainguyengroup.vn/wp-content/uploads/2024/02/2-dong-phuc-nhan-vien-spa.jpg',10),(17,'Lily Taylor','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','(116) 149 7965','pakliksun2001@gmail.com','KDnz09bons','nfIuyxiiSe','2012-04-20 14:08:28','https://dongphucsaigon.vn/wp-content/uploads/2024/05/dong-phuc-spa-14.jpg.webp',6),(18,'Mia Millern','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','330-167-3927','konzhiyuan@icloud.com','KDy619p1wd','qlALm470Hd','2014-12-10 05:18:54','https://product.hstatic.net/200000732063/product/dong_phuc_spa_004_2e01483f37b44ce58f37e8883749a7ac_master.jpg',9),(19,'Emma Johnson','A man’s best friends are his ten fingers. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. All the Navicat Cloud objects are located under different projects. You can share the project to other Navicat Cloud accounts for collaboration. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Remember that failure is an event, not a person. If it scares you, it might be a good thing to try. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. .','80-5093-7598','shit@gmail.com','3uotEQ99KT','8UCFmuMTjN','2010-10-18 12:37:28','https://dongphucsaigon.vn/wp-content/uploads/2024/06/dong-phuc-nhan-vien-massage-2-1.jpg',5);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeeworkschedules`
--

DROP TABLE IF EXISTS `employeeworkschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeworkschedules` (
  `EmployeeID` int NOT NULL,
  `WorkScheduleID` int NOT NULL,
  PRIMARY KEY (`EmployeeID`,`WorkScheduleID`) USING BTREE,
  KEY `WorkScheduleID` (`WorkScheduleID`) USING BTREE,
  CONSTRAINT `employeeworkschedules_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employees` (`EmployeeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `employeeworkschedules_ibfk_2` FOREIGN KEY (`WorkScheduleID`) REFERENCES `workschedules` (`WorkScheduleID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeworkschedules`
--

LOCK TABLES `employeeworkschedules` WRITE;
/*!40000 ALTER TABLE `employeeworkschedules` DISABLE KEYS */;
INSERT INTO `employeeworkschedules` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(18,1),(19,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(1,3),(2,3),(3,3),(4,3),(5,3),(6,3),(7,3),(8,3),(9,3),(10,3),(11,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(8,4),(9,4),(10,4),(11,4),(12,4),(13,4),(14,4),(15,4),(16,4),(17,4),(18,4),(19,4),(1,5),(2,5),(3,5),(4,5),(5,5),(6,5),(7,5),(8,5),(9,5),(10,5),(11,5),(12,5),(13,5),(14,5),(15,5),(16,5),(17,5),(18,5),(19,5),(1,6),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(8,6),(9,6),(10,6),(11,6),(12,6),(13,6),(14,6),(15,6),(16,6),(17,6),(18,6),(19,6),(1,7),(2,7),(3,7),(4,7),(5,7),(6,7),(7,7),(8,7),(9,7),(10,7),(11,7),(12,7),(13,7),(14,7),(15,7),(16,7),(17,7),(18,7),(19,7),(1,8),(2,8),(3,8),(4,8),(5,8),(6,8),(7,8),(8,8),(9,8),(10,8),(11,8),(12,8),(13,8),(14,8),(15,8),(16,8),(17,8),(18,8),(19,8),(1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),(8,9),(9,9),(10,9),(11,9),(12,9),(13,9),(14,9),(15,9),(16,9),(17,9),(18,9),(19,9),(1,10),(3,10),(5,10),(10,10),(17,10),(1,11),(5,11),(11,11),(18,11),(2,12),(4,12),(10,12),(15,12),(1,13),(7,13),(19,13),(2,14),(8,14),(13,14),(3,15),(12,15),(3,16),(8,16),(17,16),(4,17),(12,17),(6,18),(10,18),(9,19),(15,19),(9,20),(19,21),(11,22),(14,23),(16,24);
/*!40000 ALTER TABLE `employeeworkschedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int DEFAULT NULL,
  `EmployeeID` int DEFAULT NULL,
  `ServiceID` int DEFAULT NULL,
  `LocationID` int DEFAULT NULL,
  `PriceService` decimal(10,2) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `InvoiceDate` datetime DEFAULT NULL,
  `BookingID` int DEFAULT NULL,
  PRIMARY KEY (`InvoiceID`) USING BTREE,
  KEY `CustomerID` (`CustomerID`) USING BTREE,
  KEY `EmployeeID` (`EmployeeID`) USING BTREE,
  KEY `ServiceID` (`ServiceID`) USING BTREE,
  KEY `LocationID` (`LocationID`) USING BTREE,
  KEY `BookingID` (`BookingID`) USING BTREE,
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `employees` (`EmployeeID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ServiceID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `invoices_ibfk_4` FOREIGN KEY (`LocationID`) REFERENCES `locations` (`LocationID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `invoices_ibfk_5` FOREIGN KEY (`BookingID`) REFERENCES `bookings` (`BookingID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `LocationID` int NOT NULL AUTO_INCREMENT,
  `LocationName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`LocationID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Tang Fu Shing','183 Cyril St, Braunstone Town'),(2,'Ando Daisuke','862 Lefeng 6th Rd'),(3,'Zhu Rui','726 Cyril St, Braunstone Town'),(4,'Yuan Zhennan','248 Park End St'),(5,'Helen Smith','3-19-4 Shimizu, Kita Ward'),(6,'Pan Zhiyuan','109 Huanqu South Street 2nd Alley'),(7,'Wei Anqi','2-1-15 Tenjinnomori, Nishinari Ward'),(8,'Nakamura Hazuki','819 Abingdon Rd, Cumnor'),(9,'Jia Yuning','442 Hanover St'),(10,'Hsuan Ming Sze','5-19-12 Shinei 4 Jo, Kiyota Ward');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otps` (
  `OTPID` int NOT NULL AUTO_INCREMENT,
  `Code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ExpiryDate` timestamp NULL DEFAULT NULL,
  `IsUsed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`OTPID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
INSERT INTO `otps` VALUES (1,'835646','tonhi16022003@gmail.com','2024-11-19 20:02:12',1),(2,'133226','tonhi16022003@gmail.com','2024-11-20 02:57:17',1),(3,'887539','tonhi16022003@gmail.com','2024-11-25 03:00:21',1),(5,'556032','tonhi16022003@gmail.com','2024-11-26 14:51:32',1),(6,'497633','tonhi16022003@gmail.com','2024-11-26 21:07:22',1),(8,'346747','tonhi16022003@gmail.com','2024-12-11 19:39:43',1),(9,'309581','tonhi16022003@gmail.com','2024-12-11 19:46:15',1);
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordresettokens`
--

DROP TABLE IF EXISTS `passwordresettokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordresettokens` (
  `ResetTokenID` int NOT NULL AUTO_INCREMENT,
  `ExpiryDate` timestamp NULL DEFAULT NULL,
  `Token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`ResetTokenID`) USING BTREE,
  KEY `UserID` (`UserID`) USING BTREE,
  CONSTRAINT `passwordresettokens_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordresettokens`
--

LOCK TABLES `passwordresettokens` WRITE;
/*!40000 ALTER TABLE `passwordresettokens` DISABLE KEYS */;
INSERT INTO `passwordresettokens` VALUES (1,NULL,'01934600-8714-751f-a336-eda625c98db6-400973',7),(2,NULL,'0193477f-6be0-744e-a617-010a9be9cc5b-818781',7),(3,NULL,'0193613f-604c-7730-bdce-6e0ad7e9278a-804246',7),(4,NULL,'019368f3-8959-7099-a8d2-ff79371b3bea-970754',7),(5,NULL,'01936a49-1a13-766b-9b8b-8f81ae2c5474-477978',7),(6,NULL,'0193b738-8bd1-72ff-9d4a-07964003821d-517990',7),(7,NULL,'0193b73d-b224-72ab-aea0-d3be9de59959-156890',7);
/*!40000 ALTER TABLE `passwordresettokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `PromotionID` int NOT NULL AUTO_INCREMENT,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `DiscountPercentage` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`PromotionID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'Navicat Monitor is a safe, simple and agentless remote server monitoring tool that is packed with powerful features to make your monitoring effective as possible. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. A man’s best friends are his ten fingers. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. Anyone who has never made a mistake has never tried anything new. Difficult circumstances serve as a textbook of life for people. You will succeed because most people are lazy. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. Typically, it is employed as an encrypted version of Telnet. The Synchronize to Database function will give you a full picture of all database differences. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. Export Wizard allows you to export data from tables, collections, views, or query results to any available formats. I may not have gone where I intended to go, but I think I have ended up where I needed to be. A comfort zone is a beautiful place, but nothing ever grows there.','2008-01-09 01:25:23','2012-06-10 01:48:46',0.00),(2,'With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords and data (e.g. tables, views, etc) will not be stored to Navicat Cloud. You will succeed because most people are lazy. Such sessions are also susceptible to session hijacking, where a malicious user takes over your session once you have authenticated. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. You must be the change you wish to see in the world. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. You cannot save people, you can just love them. Anyone who has ever made anything of importance was disciplined. To connect to a database or schema, simply double-click it in the pane. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. If you wait, all that happens is you get older. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. To connect to a database or schema, simply double-click it in the pane. How we spend our days is, of course, how we spend our lives. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. If it scares you, it might be a good thing to try. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. The Synchronize to Database function will give you a full picture of all database differences. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. To connect to a database or schema, simply double-click it in the pane. Flexible settings enable you to set up a custom key for comparison and synchronization. If it scares you, it might be a good thing to try. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. SSH serves to prevent such vulnerabilities and allows you to access a remote server\'s shell without compromising security. The first step is as good as half over. The reason why a great man is great is that he resolves to be a great man. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. Navicat Cloud provides a cloud service for synchronizing connections, queries, model files and virtual group information from Navicat, other Navicat family members, different machines and different platforms. The past has no power over the present moment. Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files from one machine to another. All journeys have secret destinations of which the traveler is unaware. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. SSH serves to prevent such vulnerabilities and allows you to access a remote server\'s shell without compromising security. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. A comfort zone is a beautiful place, but nothing ever grows there. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. Difficult circumstances serve as a textbook of life for people. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. The On Startup feature allows you to control what tabs appear when you launch Navicat. How we spend our days is, of course, how we spend our lives. Remember that failure is an event, not a person. If opportunity doesn’t knock, build a door. A man is not old until regrets take the place of dreams. Champions keep playing until they get it right. To connect to a database or schema, simply double-click it in the pane. The On Startup feature allows you to control what tabs appear when you launch Navicat. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. I will greet this day with love in my heart. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. The first step is as good as half over. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server.','2001-12-18 12:13:17','2020-08-02 15:49:45',15.00),(3,'It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. The past has no power over the present moment. A comfort zone is a beautiful place, but nothing ever grows there. A comfort zone is a beautiful place, but nothing ever grows there. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Champions keep playing until they get it right. Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files from one machine to another. Anyone who has ever made anything of importance was disciplined. Navicat 15 has added support for the system-wide dark mode. Anyone who has ever made anything of importance was disciplined. Instead of wondering when your next vacation is, maybe you should set up a life you don’t need to escape from. Navicat authorizes you to make connection to remote servers running on different platforms (i.e. Windows, macOS, Linux and UNIX), and supports PAM and GSSAPI authentication. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. Anyone who has never made a mistake has never tried anything new. I will greet this day with love in my heart. Champions keep playing until they get it right. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. A comfort zone is a beautiful place, but nothing ever grows there. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. It wasn’t raining when Noah built the ark. Genius is an infinite capacity for taking pains. The reason why a great man is great is that he resolves to be a great man. Success consists of going from failure to failure without loss of enthusiasm. In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. You must be the change you wish to see in the world. The reason why a great man is great is that he resolves to be a great man. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. Such sessions are also susceptible to session hijacking, where a malicious user takes over your session once you have authenticated. Flexible settings enable you to set up a custom key for comparison and synchronization. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Navicat 15 has added support for the system-wide dark mode. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. Typically, it is employed as an encrypted version of Telnet. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. I may not have gone where I intended to go, but I think I have ended up where I needed to be. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. There is no way to happiness. Happiness is the way. The past has no power over the present moment. The reason why a great man is great is that he resolves to be a great man. It provides strong authentication and secure encrypted communications between two hosts, known as SSH Port Forwarding (Tunneling), over an insecure network. A query is used to extract data from the database in a readable format according to the user\'s request. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. Flexible settings enable you to set up a custom key for comparison and synchronization. In the middle of winter I at last discovered that there was in me an invincible summer. The Navigation pane employs tree structure which allows you to take action upon the database and their objects through their pop-up menus quickly and easily. In the middle of winter I at last discovered that there was in me an invincible summer. In the middle of winter I at last discovered that there was in me an invincible summer. The Main Window consists of several toolbars and panes for you to work on connections, database objects and advanced tools. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. It wasn’t raining when Noah built the ark. SSH serves to prevent such vulnerabilities and allows you to access a remote server\'s shell without compromising security. If you wait, all that happens is you get older.','2000-03-02 15:20:05','2020-07-12 16:44:06',20.00),(4,'Genius is an infinite capacity for taking pains. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. If the plan doesn’t work, change the plan, but never the goal. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. If it scares you, it might be a good thing to try. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. There is no way to happiness. Happiness is the way. Navicat Monitor can be installed on any local computer or virtual machine and does not require any software installation on the servers being monitored. You must be the change you wish to see in the world. If opportunity doesn’t knock, build a door. Anyone who has ever made anything of importance was disciplined. Sometimes you win, sometimes you learn. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. I destroy my enemies when I make them my friends. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. Navicat 15 has added support for the system-wide dark mode. Monitored servers include MySQL, MariaDB and SQL Server, and compatible with cloud databases like Amazon RDS, Amazon Aurora, Oracle Cloud, Google Cloud and Microsoft Azure.','2003-11-06 11:58:03','2020-04-10 16:02:59',50.00),(5,'All journeys have secret destinations of which the traveler is unaware. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. If the plan doesn’t work, change the plan, but never the goal. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. You will succeed because most people are lazy. You must be the change you wish to see in the world. Always keep your eyes open. Keep watching. Because whatever you see can inspire you. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. In the Objects tab, you can use the List List, Detail Detail and ER Diagram ER Diagram buttons to change the object view. Remember that failure is an event, not a person. Anyone who has never made a mistake has never tried anything new. A query is used to extract data from the database in a readable format according to the user\'s request. Sometimes you win, sometimes you learn. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. A man’s best friends are his ten fingers. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. The Navigation pane employs tree structure which allows you to take action upon the database and their objects through their pop-up menus quickly and easily. To connect to a database or schema, simply double-click it in the pane. If it scares you, it might be a good thing to try. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. I will greet this day with love in my heart. In the middle of winter I at last discovered that there was in me an invincible summer. If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. Import Wizard allows you to import data to tables/collections from CSV, TXT, XML, DBF and more. SSH serves to prevent such vulnerabilities and allows you to access a remote server\'s shell without compromising security. What you get by achieving your goals is not as important as what you become by achieving your goals. Navicat provides a wide range advanced features, such as compelling code editing capabilities, smart code-completion, SQL formatting, and more.','2024-10-10 03:30:14','2005-07-06 09:15:38',35.00);
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `ServiceID` int NOT NULL AUTO_INCREMENT,
  `CategoryID` int DEFAULT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `DescriptionShort` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Description1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ImageDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Description2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ImageMain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Image_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Duration` int DEFAULT NULL,
  `PromotionID` int DEFAULT NULL,
  PRIMARY KEY (`ServiceID`) USING BTREE,
  KEY `CategoryID` (`CategoryID`) USING BTREE,
  KEY `PromotionID` (`PromotionID`) USING BTREE,
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `servicescategories` (`CategoryID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`PromotionID`) REFERENCES `promotions` (`PromotionID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,6,'Mandila Full Care',55.00,'Comprehensive therapy for body care and relaxation','Includes 10 mins steam bath, 30 mins body scrub, 50 mins body massage, 30 mins facial treatment','https://mandilabeachhotel.com/wp-content/uploads/2024/07/PRIN0548.jpg','Great for rejuvenating skin and promoting relaxation','https://mandila-beach-da-nang.hotelmix.vn/data/Photos/OriginalPhoto/16017/1601714/1601714798/Mandila-Beach-Hotel-Danang-Exterior.JPEG','icon1.png',120,1),(2,6,'Body Detoxing Care',1200000.00,'Detoxifies and refreshes the body using heat and scrubs','Includes 10 mins steam bath, 70 mins warm stone massage, and 30 mins coffee body scrub','https://s3.amazonaws.com/salonclouds-uploads/blog/blog_1605466361125864114.png','Removes toxins and rejuvenates the skin, leaving it fresh and smooth','https://www.bodycentrewellnessspa.com/wp-content/uploads/2019/07/BodyCentre_679421054.jpg','icon2.png',120,2),(3,6,'Coffee Body Scrub',350000.00,'Scrub using coffee to remove dead skin and refresh the body','Coffee beans rich in antioxidants exfoliate the skin, moisturizing and revitalizing it','https://theexperience-spa.com/wp-content/uploads/2018/10/coffee.png','Helps in removing dead skin cells while promoting healthy, smooth skin','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3OHAG-2Q5W1fejb7NvdoH5sQFO6dR90b8VP6jpQHR5rtgsSDYIjIYOeoJaGDcw07AIY&usqp=CAU','icon3.png',45,3),(4,6,'Green Tea Body Scrub',350000.00,'Exfoliating scrub with green tea to rejuvenate the skin','Combines green tea extract, sea salt, and sugar to regenerate the skin and prevent aging','https://yukienatori-newyork.com/wp-content/uploads/2023/04/body-scrub-relaxation.jpg','Exfoliates and softens skin, reducing the signs of aging','https://asset-2.tstatic.net/tribunnews/foto/bank/images/Boreh-bali.jpg','icon4.png',45,4),(5,7,'Aromatherapy Massage',550000.00,'Relaxing massage using essential oils for body and mind','Combines essential oils with soothing massage techniques to relieve stress and balance the mind','https://admin.ozeesalon.com/storage/uploads/blogs/images/676f6555-8a8d-4c47-a8f4-60105dee7620.jpg','Helps to balance body energy and clear mental fog','https://touchtohealspa.com/wp-content/uploads/2020/02/aromatherapy-massage-scaled-e1582251557268.jpg','icon5.png',60,5),(6,7,'Aromatherapy Massage',700000.00,'A deep relaxing massage using aromatic oils','Focuses on relaxation, energy restoration, and calming using aromatic essential oils','https://www.shutterstock.com/image-photo/african-woman-enjoying-aromatherapy-massage-600nw-2452785991.jpg','Perfect for those looking for an intensive mental and physical reset','https://www.sarahbestmassagetherapy.co.uk/wp-content/uploads/2021/04/aromatherapy-massage-1.png','icon6.png',90,1),(8,7,'Warm Stone Massage',750000.00,'Deep stone therapy for stress relief and muscle relaxation','Combines hot stones with skilled techniques to relax muscles, reduce pain, and rejuvenate the body','https://images-prod.healthline.com/hlcmsresource/images/topic_centers/1296x728_HEADER_benefits-of-hot-stone-massage.jpg','Ideal for easing neck, back, and joint pains','https://healing-art-therapy.com/wp-content/uploads/2017/09/HOT-STONES-MASSAGE-1.jpg','icon8.png',90,3),(9,7,'Thai Massage Stretch',550000.00,'Thai-style stretching massage for flexibility and relaxation','Focuses on joint and muscle flexibility, easing stress and tension with gentle yoga-like movements','https://salathai-lindau.de/wp-content/uploads/2023/06/professional-thai-masseuse-doing-feet-relaxation-m-2022-01-18-23-34-13-Sala-Thai-Spa-2400px.jpg','Great for those with joint stiffness and muscle fatigue','https://afrothaispa.co.za/wp-content/uploads/2024/07/ThaiStretch.jpeg','icon9.png',60,4),(13,8,'Facial Treatment',500000.00,'Facial therapy for rejuvenation and skin care','Cleanses, nourishes, and restores skin balance to reduce fine lines and enhance skin texture','https://spamd.net/wp-content/uploads/2022/03/medications-facial-treatments.jpg','Provides a smooth, youthful glow with enhanced hydration','https://www.beautycoursesonline.com.au/wp-content/uploads/2022/03/Women-Receiving-Facial-Treatment-min.jpg','icon13.png',30,3),(14,9,'Manicure & Pedicure',250000.00,'Professional nail care to enhance your appearance','Includes nail polishing, cleansing, and clipping, with skin care and polish application','https://www.complexions.com/wp-content/uploads/2023/07/manicure-pedicure.jpg','Leaves your nails smooth, clean, and perfectly shaped','https://media.istockphoto.com/id/532105836/photo/female-feet-at-spa-salon-on-pedicure-procedure.jpg?s=612x612&w=0&k=20&c=NOexmTYkxtJrj43DDE3eeB49Kl6mXG5TScBCzgQla7c=','icon14.png',45,4),(16,7,'Thai Massage Stretch',700000.00,'Intensive Thai massage to reduce muscle pain and tension','Offers deep muscle relaxation through stretching and pressure applied to key muscle points','https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p2/130/2023/09/06/e35b6cadfcf969fffe0e4b69b2de73a8-1180929599.jpg','Helps with chronic pain and fatigue, promoting total body relaxation','https://media.self.com/photos/5c509caeebe97e576ae194db/1:1/w_5303,h_5303,c_limit/thai-massage.jpg','icon10.png',90,5),(17,8,'Head Massage',250000.00,'Relaxing head massage to alleviate headaches and stress','Uses warm coconut oil and acupressure techniques to stimulate blood flow and refresh the mind','https://cdn.shopify.com/s/files/1/0520/4983/8237/files/Exfoliates_Cleanses_the_Scalp.webp?v=1683122809','Helps improve mental clarity and reduce fatigue','https://images.onlymyhealth.com/imported/images/2024/July/12_Jul_2024/mn_scalp%20massage.jpg','icon11.png',30,1),(18,8,'Head Massage',350000.00,'Deep relaxation for head, improving circulation and focus','Hot oil and acupressure massage techniques help clear toxins, relax the scalp, and calm the mind','https://5.imimg.com/data5/BO/DG/GLADMIN-66820441/head-massage-service.png','Ideal for reducing stress and improving focus','https://aquaspawellness.com/wp-content/uploads/2016/02/INDIAN-HEAD-MASSAGE-CHAMPISSAGE-1.jpg','icon12.png',50,2),(19,NULL,'Yung Ling Ling',87.93,'The On Startup feature allows you to control what tabs appear when you launch Navicat. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. If the plan doesn’t work, change the plan, but never the goal. Navicat allows you to transfer data from one database and/or schema to another with detailed analytical process. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. In the middle of winter I at last discovered that there was in me an invincible summer. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. All journeys have secret destinations of which the traveler is unaware. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. You must be the change you wish to see in the world. If opportunity doesn’t knock, build a door. Navicat Data Modeler enables you to build high-quality conceptual, logical and physical data models for a wide variety of audiences. Anyone who has ever made anything of importance was disciplined. You will succeed because most people are lazy. I will greet this day with love in my heart. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. Creativity is intelligence having fun. Navicat 15 has added support for the system-wide dark mode. A query is used to extract data from the database in a readable format according to the user\'s request. To connect to a database or schema, simply double-click it in the pane. Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords and data (e.g. tables, views, etc) will not be stored to Navicat Cloud. To start working with your server in Navicat, you should first establish a connection or several connections using the Connection window. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. Genius is an infinite capacity for taking pains. Success consists of going from failure to failure without loss of enthusiasm. Champions keep playing until they get it right. To connect to a database or schema, simply double-click it in the pane. A man is not old until regrets take the place of dreams. Instead of wondering when your next vacation is, maybe you should set up a life you don’t need to escape from. Success consists of going from failure to failure without loss of enthusiasm. The past has no power over the present moment. In other words, Navicat provides the ability for data in different databases and/or schemas to be kept up-to-date so that each repository contains the same information. It collects process metrics such as CPU load, RAM usage, and a variety of other resources over SSH/SNMP. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. There is no way to happiness. Happiness is the way. It is used while your ISPs do not allow direct connections, but allows establishing HTTP connections. You must be the change you wish to see in the world. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab.','Navicat 15 has added support for the system-wide dark mode. Typically, it is employed as an encrypted version of Telnet. Navicat Monitor requires a repository to store alerts and metrics for historical analysis. To get a secure connection, the first thing you need to do is to install OpenSSL Library and download Database Source. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. Actually it is just in an idea when feel oneself can achieve and cannot achieve. I destroy my enemies when I make them my friends. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. The first step is as good as half over. A query is used to extract data from the database in a readable format according to the user\'s request. Navicat Data Modeler is a powerful and cost-effective database design tool which helps you build high-quality conceptual, logical and physical data models. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. It can also manage cloud databases such as Amazon Redshift, Amazon RDS, Alibaba Cloud. Features in Navicat are sophisticated enough to provide professional developers for all their specific needs, yet easy to learn for users who are new to database server. The reason why a great man is great is that he resolves to be a great man. Navicat provides powerful tools for working with queries: Query Editor for editing the query text directly, and Query Builder, Find Builder or Aggregate Builder for building queries visually. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. The past has no power over the present moment. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. How we spend our days is, of course, how we spend our lives. HTTP Tunneling is a method for connecting to a server that uses the same protocol (http://) and the same port (port 80) as a web server does. The reason why a great man is great is that he resolves to be a great man. Anyone who has never made a mistake has never tried anything new. Difficult circumstances serve as a textbook of life for people. You must be the change you wish to see in the world. The On Startup feature allows you to control what tabs appear when you launch Navicat. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. Navicat Monitor requires a repository to store alerts and metrics for historical analysis. Navicat authorizes you to make connection to remote servers running on different platforms (i.e. Windows, macOS, Linux and UNIX), and supports PAM and GSSAPI authentication. The first step is as good as half over. In a Telnet session, all communications, including username and password, are transmitted in plain-text, allowing anyone to listen-in on your session and steal passwords and other information. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. If the Show objects under schema in navigation pane option is checked at the Preferences window, all database objects are also displayed in the pane. If opportunity doesn’t knock, build a door. Sometimes you win, sometimes you learn. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. You cannot save people, you can just love them.','40TXQeWFWY','Navicat is a multi-connections Database Administration tool allowing you to connect to MySQL, Oracle, PostgreSQL, SQLite, SQL Server, MariaDB and/or MongoDB databases, making database administration to multiple kinds of database so easy. To clear or reload various internal caches, flush tables, or acquire locks, control-click your connection in the Navigation pane and select Flush and choose the flush option. You must have the reload privilege to use this feature. The Information Pane shows the detailed object information, project activities, the DDL of database objects, object dependencies, membership of users/roles and preview. Export Wizard allows you to export data from tables, collections, views, or query results to any available formats. Typically, it is employed as an encrypted version of Telnet. Sometimes you win, sometimes you learn. To successfully establish a new connection to local/remote server - no matter via SSL, SSH or HTTP, set the database login information in the General tab. Navicat Cloud could not connect and access your databases. By which it means, it could only store your connection settings, queries, model files, and virtual group; your database passwords and data (e.g. tables, views, etc) will not be stored to Navicat Cloud. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. Champions keep playing until they get it right. After comparing data, the window shows the number of records that will be inserted, updated or deleted in the target. With its well-designed Graphical User Interface(GUI), Navicat lets you quickly and easily create, organize, access and share information in a secure and easy way. You must be the change you wish to see in the world. You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. You cannot save people, you can just love them. Secure Sockets Layer(SSL) is a protocol for transmitting private documents via the Internet. The On Startup feature allows you to control what tabs appear when you launch Navicat. The repository database can be an existing MySQL, MariaDB, PostgreSQL, SQL Server, or Amazon RDS instance. Sometimes you win, sometimes you learn. SQL Editor allows you to create and edit SQL text, prepare and execute selected queries. Anyone who has never made a mistake has never tried anything new. The Main Window consists of several toolbars and panes for you to work on connections, database objects and advanced tools. In the middle of winter I at last discovered that there was in me an invincible summer. To open a query using an external editor, control-click it and select Open with External Editor. You can set the file path of an external editor in Preferences. Optimism is the one quality more associated with success and happiness than any other. Genius is an infinite capacity for taking pains. Remember that failure is an event, not a person. Secure SHell (SSH) is a program to log in into another computer over a network, execute commands on a remote server, and move files from one machine to another.','https://nvhphunu.vn/wp-content/uploads/2024/09/c1.jpg','zinuwEBQT8',47,4),(20,9,'Steam Bath',75000.00,'Relaxing steam bath for detox and body relaxation','Helps cleanse and detoxify the body through perspiration, improving skin texture and blood flow','https://5.imimg.com/data5/SELLER/Default/2023/10/353870747/QH/YI/BK/6495386/sauna-steam-room.jpg','Ideal for soothing tired muscles and revitalizing skin','https://3.imimg.com/data3/TO/UB/MY-3816854/sauna-spa-250x250.jpeg','icon15.png',20,5),(21,NULL,'Swedish Massage',89.99,'Relaxing full body massage using Swedish techniques','Experience deep relaxation with our signature Swedish massage that combines gentle strokes with moderate pressure.','swedish-massage.jpg','Perfect for stress relief and muscle tension release. Our experienced therapists customize the pressure to your preferences.','https://www.health.com/thmb/K_Vtfnh3Yu-Ceya3aETxfH72k9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1175433234-034014dc5b9c45edaeaf04c7b80ceafc.jpg','massage-icon.png',60,2),(22,NULL,'Swedish Massage',89.99,'Relaxing full body massage using Swedish techniques','Experience deep relaxation with our signature Swedish massage that combines gentle strokes with moderate pressure.','swedish-massage.jpg','Perfect for stress relief and muscle tension release. Our experienced therapists customize the pressure to your preferences.','https://images.cdn-files-a.com/uploads/7347219/800_63d5cb899de63.jpg','massage-icon.png',60,2);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicescategories`
--

DROP TABLE IF EXISTS `servicescategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicescategories` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DescriptionShort` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `TypeService` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`CategoryID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicescategories`
--

LOCK TABLES `servicescategories` WRITE;
/*!40000 ALTER TABLE `servicescategories` DISABLE KEYS */;
INSERT INTO `servicescategories` VALUES (6,'Body Care & Detox','Rejuvenating treatments to detoxify and refresh the body','wellness'),(7,'Massage Therapies','Relaxing massages to relieve stress and muscle tension','Relaxation'),(8,'Facial & Head Treatments','Revitalizing facial and head therapies to improve skin and mental clarity','Skin Care'),(9,'Wellness & Grooming','Personal grooming and relaxation services for a complete wellness experience','Beauty');
/*!40000 ALTER TABLE `servicescategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sparesponses`
--

DROP TABLE IF EXISTS `sparesponses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sparesponses` (
  `ResponseID` int NOT NULL AUTO_INCREMENT,
  `FeedbackID` int DEFAULT NULL,
  `ResponseText` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ResponseDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ResponseID`) USING BTREE,
  KEY `FeedbackID` (`FeedbackID`) USING BTREE,
  CONSTRAINT `sparesponses_ibfk_1` FOREIGN KEY (`FeedbackID`) REFERENCES `customerfeedback` (`FeedbackID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sparesponses`
--

LOCK TABLES `sparesponses` WRITE;
/*!40000 ALTER TABLE `sparesponses` DISABLE KEYS */;
/*!40000 ALTER TABLE `sparesponses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`RoleID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (1,'ADMIN'),(2,'USER'),(3,'MANAGER');
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PasswordHash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `FullName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bookingCount` int DEFAULT NULL,
  PRIMARY KEY (`UserID`) USING BTREE,
  KEY `RoleID` (`RoleID`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `userroles` (`RoleID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'mrthinkj','$2b$10$pHnPrYRS3hal.QKHDPH2Uu8IefeIduJ3jEKz55D4nbOPuSgXBxjba',1,'binthinhle@gmail.com','0987654081','Nguyen To Nhi',NULL,NULL),(7,'tso.yni_16','$2b$10$PCR2RyONIfc7v8eOjPL9F.j6lGMMLRaSap7VTt1QqF10nX8p/RHhC',2,'tonhi16022003@gmail.com','0987650090','Nguyen To Nhi','0193b191-7bfd-7765-ba99-9489146fbe30.jpg',5),(8,'tso.yni_30','$2b$10$uiWlSO.gCUhXTuBeV8VNYeN1AIzDcfcHarTrbdbAiq.UdnDwK6txG',2,'nhi746274@gmail.com','0375097179','Ha Thi Bao Ngoc',NULL,NULL),(9,'MaiHuong','$2b$10$RNWy5GxQwT.dYv5EKZ7WhODNxHDmY1GYLzm1wFsP4gNT5UjA3nLva',2,'huongtvns@gmail.com','0379061888','Ha Huong',NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workschedules`
--

DROP TABLE IF EXISTS `workschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workschedules` (
  `WorkScheduleID` int NOT NULL AUTO_INCREMENT,
  `DayOfWeek` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `IsAvailable` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`WorkScheduleID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workschedules`
--

LOCK TABLES `workschedules` WRITE;
/*!40000 ALTER TABLE `workschedules` DISABLE KEYS */;
INSERT INTO `workschedules` VALUES (1,'Monday','09:00:00','17:00:00',1),(2,'Tuesday','07:00:00','11:00:00',1),(3,'Tuesday','13:00:00','17:00:00',1),(4,'Tuesday','15:00:00','19:00:00',1),(5,'Tuesday','19:00:00','21:00:00',1),(6,'Wednesday','07:00:00','17:00:00',1),(7,'Wednesday','07:00:00','11:00:00',1),(8,'Wednesday','12:00:00','21:00:00',1),(9,'Wednesday','13:00:00','19:00:00',1),(10,'Saturday','07:00:00','11:00:00',1),(11,'Friday','13:00:00','17:00:00',1),(12,'Friday','17:00:00','21:00:00',1),(13,'Friday','07:00:00','12:00:00',1),(14,'Friday','09:00:00','17:00:00',1),(15,'Thursday','07:00:00','11:00:00',1),(16,'Thursday','09:00:00','15:00:00',1),(17,'Thursday','13:00:00','17:00:00',1),(18,'Thursday','13:00:00','21:00:00',1),(19,'Thursday','19:00:00','21:00:00',1),(20,'Sunday','07:00:00','11:00:00',1),(21,'Sunday','07:00:00','17:00:00',1),(22,'Sunday','13:00:00','17:00:00',1),(23,'Sunday','13:00:00','21:00:00',1),(24,'Sunday','19:00:00','21:00:00',1);
/*!40000 ALTER TABLE `workschedules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 10:12:30
