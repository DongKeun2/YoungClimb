-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: yclimb.cwmdxfmjwlm3.ap-northeast-2.rds.amazonaws.com    Database: youngclimb
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `tb_board`
--

DROP TABLE IF EXISTS `tb_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `board_view` bigint DEFAULT NULL,
  `board_content` varchar(255) DEFAULT NULL,
  `board_created_datetime` datetime(6) DEFAULT NULL,
  `board_is_deleted` int DEFAULT NULL,
  `board_solved_date` date DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKs0s8p7myt0u046ohn1ki3s0vv` (`member_id`),
  CONSTRAINT `FKs0s8p7myt0u046ohn1ki3s0vv` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_board_like`
--

DROP TABLE IF EXISTS `tb_board_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board_like` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FK8k0w20059uty5uigs0ea7c2df` (`board_id`),
  KEY `FKl5cu42lgljh3iq4w3lp7q3mjj` (`member_id`),
  CONSTRAINT `FK8k0w20059uty5uigs0ea7c2df` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`),
  CONSTRAINT `FKl5cu42lgljh3iq4w3lp7q3mjj` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_board_media`
--

DROP TABLE IF EXISTS `tb_board_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board_media` (
  `media_id` bigint NOT NULL AUTO_INCREMENT,
  `media_path` varchar(255) DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `thumbnail_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`media_id`),
  KEY `FK9p4dksfgyfw4wtt377l5y09i0` (`board_id`),
  CONSTRAINT `FK9p4dksfgyfw4wtt377l5y09i0` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_board_scrap`
--

DROP TABLE IF EXISTS `tb_board_scrap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board_scrap` (
  `scrap_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`scrap_id`),
  KEY `FKhxswauxmi1j434csmtaoqj7dj` (`board_id`),
  KEY `FKcjsjcoouj42vjvdnyay323j0q` (`member_id`),
  CONSTRAINT `FKcjsjcoouj42vjvdnyay323j0q` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `FKhxswauxmi1j434csmtaoqj7dj` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_board_tag`
--

DROP TABLE IF EXISTS `tb_board_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board_tag` (
  `tag_id` bigint NOT NULL AUTO_INCREMENT,
  `tag_content` varchar(255) DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `FK2mphipeb9nuh4w2vf694cjv2g` (`board_id`),
  CONSTRAINT `FK2mphipeb9nuh4w2vf694cjv2g` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_category`
--

DROP TABLE IF EXISTS `tb_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `category_difficulty` varchar(255) DEFAULT NULL,
  `category_hold_color` varchar(255) DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  `center_level_id` int DEFAULT NULL,
  `wall_id` int DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `FKe9mvwq6gqh698uwsg2b69h1k1` (`board_id`),
  KEY `FKn8win0ycywyxcmf1obtlrtx6o` (`center_level_id`),
  KEY `FKiwknkkb2bcrs3ewyq7yqj1b7q` (`wall_id`),
  KEY `FK4f3n1jbq73sa0j3cuyj6xt5kw` (`center_id`),
  CONSTRAINT `FK4f3n1jbq73sa0j3cuyj6xt5kw` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`),
  CONSTRAINT `FKe9mvwq6gqh698uwsg2b69h1k1` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`),
  CONSTRAINT `FKiwknkkb2bcrs3ewyq7yqj1b7q` FOREIGN KEY (`wall_id`) REFERENCES `tb_wall` (`wall_id`),
  CONSTRAINT `FKn8win0ycywyxcmf1obtlrtx6o` FOREIGN KEY (`center_level_id`) REFERENCES `tb_center_level` (`center_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_center`
--

DROP TABLE IF EXISTS `tb_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_center` (
  `center_id` int NOT NULL AUTO_INCREMENT,
  `center_address` varchar(255) DEFAULT NULL,
  `center_lat` float DEFAULT NULL,
  `center_long` float DEFAULT NULL,
  `center_name` varchar(255) DEFAULT NULL,
  `center_phone_number` varchar(255) DEFAULT NULL,
  `center_img` varchar(100) DEFAULT NULL,
  `center_wall` bit(1) DEFAULT NULL,
  PRIMARY KEY (`center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_center_3d`
--

DROP TABLE IF EXISTS `tb_center_3d`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_center_3d` (
  `3d_id` int NOT NULL AUTO_INCREMENT,
  `3d_path` varchar(255) DEFAULT NULL,
  `3d_rank` varchar(255) DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  PRIMARY KEY (`3d_id`),
  KEY `FK7afpxmyu9fd25p5f9pws0bqdt` (`center_id`),
  CONSTRAINT `FK7afpxmyu9fd25p5f9pws0bqdt` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_center_event`
--

DROP TABLE IF EXISTS `tb_center_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_center_event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_content` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `FK1opmea72pnh38dbrgf1jgtkit` (`center_id`),
  CONSTRAINT `FK1opmea72pnh38dbrgf1jgtkit` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_center_level`
--

DROP TABLE IF EXISTS `tb_center_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_center_level` (
  `center_level_id` int NOT NULL AUTO_INCREMENT,
  `center_level_color` varchar(255) DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  `level_rank` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`center_level_id`),
  KEY `FK4talfe338ypv45nf2lrbi4oot` (`level_rank`),
  KEY `FKdgfx6048gmmjhb330t87fmji8` (`center_id`),
  CONSTRAINT `FK4talfe338ypv45nf2lrbi4oot` FOREIGN KEY (`level_rank`) REFERENCES `tb_level` (`level_rank`),
  CONSTRAINT `FKdgfx6048gmmjhb330t87fmji8` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_center_price`
--

DROP TABLE IF EXISTS `tb_center_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_center_price` (
  `price_id` int NOT NULL AUTO_INCREMENT,
  `price_name` varchar(255) DEFAULT NULL,
  `center_price` int DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  PRIMARY KEY (`price_id`),
  KEY `FKnief67rq7i294e4prxh5wxcun` (`center_id`),
  CONSTRAINT `FKnief67rq7i294e4prxh5wxcun` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_center_time`
--

DROP TABLE IF EXISTS `tb_center_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_center_time` (
  `time_id` int NOT NULL AUTO_INCREMENT,
  `time_day` int DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  PRIMARY KEY (`time_id`),
  KEY `FKt2cwl3a1ajlo64v8iqjq3m6lq` (`center_id`),
  CONSTRAINT `FKt2cwl3a1ajlo64v8iqjq3m6lq` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_comment`
--

DROP TABLE IF EXISTS `tb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(255) DEFAULT NULL,
  `comment_created_datetime` datetime(6) DEFAULT NULL,
  `comment_is_deleted` bit(1) DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKt7fnh6i8ms61mm7gitiqttxdy` (`board_id`),
  KEY `FK2t0qjh7lddjshj4q0wm70ww0f` (`member_id`),
  CONSTRAINT `FK2t0qjh7lddjshj4q0wm70ww0f` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `FKt7fnh6i8ms61mm7gitiqttxdy` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_comment_like`
--

DROP TABLE IF EXISTS `tb_comment_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment_like` (
  `comment_like_id` bigint NOT NULL AUTO_INCREMENT,
  `comment_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_like_id`),
  KEY `FKt9e675acs3qnl4w6p6bm4xlor` (`comment_id`),
  KEY `FKp9rj9ov08b836y4bloc3gf5p5` (`member_id`),
  CONSTRAINT `FKp9rj9ov08b836y4bloc3gf5p5` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `FKt9e675acs3qnl4w6p6bm4xlor` FOREIGN KEY (`comment_id`) REFERENCES `tb_comment` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_download`
--

DROP TABLE IF EXISTS `tb_download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_download` (
  `id` int NOT NULL AUTO_INCREMENT,
  `downloads` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_follow`
--

DROP TABLE IF EXISTS `tb_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_follow` (
  `follow_id` bigint NOT NULL AUTO_INCREMENT,
  `follower_id` bigint DEFAULT NULL,
  `following_id` bigint DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FK4bud0usiuyx03v35d7las6abt` (`follower_id`),
  KEY `FKfttvewqw489646v4oqma2seys` (`following_id`),
  CONSTRAINT `FK4bud0usiuyx03v35d7las6abt` FOREIGN KEY (`follower_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `FKfttvewqw489646v4oqma2seys` FOREIGN KEY (`following_id`) REFERENCES `tb_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=273 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_level`
--

DROP TABLE IF EXISTS `tb_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_level` (
  `level_rank` varchar(255) NOT NULL,
  `level_exp` bigint DEFAULT NULL,
  PRIMARY KEY (`level_rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_member`
--

DROP TABLE IF EXISTS `tb_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `member_email` varchar(255) DEFAULT NULL,
  `member_gender` varchar(255) DEFAULT NULL,
  `member_height` int DEFAULT NULL,
  `member_join_date` date DEFAULT NULL,
  `member_profile_img` varchar(255) DEFAULT NULL,
  `member_nickname` varchar(255) DEFAULT NULL,
  `member_profile_content` varchar(255) DEFAULT NULL,
  `member_pw` varchar(255) DEFAULT NULL,
  `member_admin` varchar(255) DEFAULT NULL,
  `member_shoe_size` int DEFAULT NULL,
  `member_wingspan` int DEFAULT NULL,
  `member_wingheight` int DEFAULT NULL,
  `member_fcm_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_member_log`
--

DROP TABLE IF EXISTS `tb_member_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member_log` (
  `log_id` bigint NOT NULL AUTO_INCREMENT,
  `log_content` varchar(255) DEFAULT NULL,
  `log_exp` int DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `report_id` bigint DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `FKqjw2a0d84jmu8ww1dklu1ende` (`board_id`),
  KEY `FK7h1qo3dvbkggoayokweeqew01` (`member_id`),
  KEY `FK9hj2ais8t9yngauii6wo4sflr` (`report_id`),
  CONSTRAINT `FK7h1qo3dvbkggoayokweeqew01` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `FK9hj2ais8t9yngauii6wo4sflr` FOREIGN KEY (`report_id`) REFERENCES `tb_report` (`report_id`),
  CONSTRAINT `FKqjw2a0d84jmu8ww1dklu1ende` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_member_problem`
--

DROP TABLE IF EXISTS `tb_member_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member_problem` (
  `member_problem_id` bigint NOT NULL AUTO_INCREMENT,
  `v0` int DEFAULT '0',
  `v1` int DEFAULT '0',
  `v2` int DEFAULT '0',
  `v3` int DEFAULT '0',
  `v4` int DEFAULT '0',
  `v5` int DEFAULT '0',
  `v6` int DEFAULT '0',
  `v7` int DEFAULT '0',
  `v8` int DEFAULT '0',
  `vb` int DEFAULT '0',
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_problem_id`),
  KEY `FK2r5lb60ejffyrakocrucyx06l` (`member_id`),
  CONSTRAINT `FK2r5lb60ejffyrakocrucyx06l` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_member_rank_exp`
--

DROP TABLE IF EXISTS `tb_member_rank_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member_rank_exp` (
  `member_rank_exp_id` bigint NOT NULL AUTO_INCREMENT,
  `member_exp` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `rank_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_rank_exp_id`),
  KEY `FKdmeco09875r0y1tfjffr8n5b5` (`member_id`),
  KEY `FK3ryisllw1pa810nwcs6g9626r` (`rank_name`),
  CONSTRAINT `FK3ryisllw1pa810nwcs6g9626r` FOREIGN KEY (`rank_name`) REFERENCES `tb_rank` (`rank_name`),
  CONSTRAINT `FKdmeco09875r0y1tfjffr8n5b5` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_notice`
--

DROP TABLE IF EXISTS `tb_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_notice` (
  `notice_id` bigint NOT NULL AUTO_INCREMENT,
  `notice_created_datetime` datetime(6) DEFAULT NULL,
  `notice_type` int DEFAULT NULL,
  `board_id` bigint DEFAULT NULL,
  `from_member_id` bigint DEFAULT NULL,
  `to_member_id` bigint DEFAULT NULL,
  `comment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FK9yyn9wf7jlb9t4ignqq5kgte5` (`from_member_id`),
  KEY `FK878b5qgf9f7lg7e167lkhrq11` (`to_member_id`),
  KEY `FK6gw4pyum54wt97y23m7avy08i` (`comment_id`),
  KEY `tb_notice_FK` (`board_id`),
  CONSTRAINT `FK6gw4pyum54wt97y23m7avy08i` FOREIGN KEY (`comment_id`) REFERENCES `tb_comment` (`comment_id`),
  CONSTRAINT `FK878b5qgf9f7lg7e167lkhrq11` FOREIGN KEY (`to_member_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `FK9yyn9wf7jlb9t4ignqq5kgte5` FOREIGN KEY (`from_member_id`) REFERENCES `tb_member` (`member_id`),
  CONSTRAINT `tb_notice_FK` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=551 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_rank`
--

DROP TABLE IF EXISTS `tb_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_rank` (
  `rank_name` varchar(255) NOT NULL,
  `rank_problem` varchar(255) DEFAULT NULL,
  `rank_qual` bigint DEFAULT NULL,
  PRIMARY KEY (`rank_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_report`
--

DROP TABLE IF EXISTS `tb_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_report` (
  `report_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `report_content` int DEFAULT NULL,
  `report_flag` int DEFAULT '0',
  PRIMARY KEY (`report_id`),
  KEY `FK136fqeqep3rrfwd3d9n0k1i4d` (`board_id`),
  KEY `FKnjj7my40nflbum2n34pq2ulgp` (`member_id`),
  CONSTRAINT `FK136fqeqep3rrfwd3d9n0k1i4d` FOREIGN KEY (`board_id`) REFERENCES `tb_board` (`board_id`),
  CONSTRAINT `FKnjj7my40nflbum2n34pq2ulgp` FOREIGN KEY (`member_id`) REFERENCES `tb_member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_wall`
--

DROP TABLE IF EXISTS `tb_wall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_wall` (
  `wall_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `center_id` int DEFAULT NULL,
  PRIMARY KEY (`wall_id`),
  KEY `FKde8psurts028b150dpu589tdx` (`center_id`),
  CONSTRAINT `FKde8psurts028b150dpu589tdx` FOREIGN KEY (`center_id`) REFERENCES `tb_center` (`center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-20 18:20:02
