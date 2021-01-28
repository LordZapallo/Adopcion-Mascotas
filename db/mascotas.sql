/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL HOST
 Source Server Type    : MySQL
 Source Server Version : 100408
 Source Host           : 127.0.0.1:3306
 Source Schema         : mascotas

 Target Server Type    : MySQL
 Target Server Version : 100408
 File Encoding         : 65001

 Date: 28/01/2021 00:35:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for adopcion
-- ----------------------------
DROP TABLE IF EXISTS `adopcion`;
CREATE TABLE `adopcion`  (
  `id_adopcion` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_emision` date NOT NULL,
  `fecha_finalizacion` date NOT NULL,
  `estado` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `referencia_personal_nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `referencia_personal_parentesco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `referencia_personal_telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `familiares_numero` int(11) NOT NULL,
  `familiares_enfermedad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `domicilio_tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `domicilio_estatus` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `domicilio_metros` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `anterior_mascota_nombre1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_sexo1` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_esterilizacion1` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_estado1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_nombre2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_sexo2` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_esterilizacion2` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `anterior_mascota_estado2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `porque_adoptar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `cambio_domicilio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tiempo_mascota` int(11) NOT NULL,
  `donde_pasara_mascota` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `donde_dormira_mascota` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `donde_necesidades_mascota` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tipo_comida_mascota` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `si_mascota_enferma` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `responsable_gastos_mascota` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gasto_estimado_mensual` int(11) NOT NULL,
  `visita_periodica` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `esterilizacion` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `informacion_adicional` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `adopcion_compartida` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado_familia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `observaciones` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `id_solicitante` int(11) NOT NULL,
  `id_supervisor` int(11) NULL DEFAULT NULL,
  `id_mascota` int(11) NOT NULL,
  `id_albergue` int(11) NOT NULL,
  PRIMARY KEY (`id_adopcion`) USING BTREE,
  INDEX `fk_adopcion_user_solicitante`(`id_solicitante`) USING BTREE,
  INDEX `fk_adopcion_user_supervisor`(`id_supervisor`) USING BTREE,
  INDEX `fk_adopcion_mascota`(`id_mascota`) USING BTREE,
  INDEX `fk_adopcion_albergue`(`id_albergue`) USING BTREE,
  CONSTRAINT `fk_adopcion_albergue` FOREIGN KEY (`id_albergue`) REFERENCES `albergue` (`id_albergue`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_adopcion_mascota` FOREIGN KEY (`id_mascota`) REFERENCES `mascota` (`id_mascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_adopcion_user_solicitante` FOREIGN KEY (`id_solicitante`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_adopcion_user_supervisor` FOREIGN KEY (`id_supervisor`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for albergue
-- ----------------------------
DROP TABLE IF EXISTS `albergue`;
CREATE TABLE `albergue`  (
  `id_albergue` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ubicacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `identificacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `celular` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `perfil` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mision` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `informacion_adicional` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id_albergue`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of albergue
-- ----------------------------
INSERT INTO `albergue` VALUES (1, 'Proteccion Animal Ecuador', 'N34-85 y Rumipamba', '1', '3319522', NULL, 'La fundación Protección Animal Ecuador, PAE, se fundó y legalizó en Quito el 3 de agosto de 1984 ante el Ministerio de Inclusión Social y Económica bajo la figura original de asociación y posteriormente reformada a fundación el 2 de marzo de 2005 con Acue', 'Promovemos la protección y el bienestar de los animales mediante acciones directas y la concienciación de la comunidad en el respeto que merecen y se debe tener hacia las demás especies.', NULL, '2021-01-28 00:18:53', '2021-01-28 00:18:55');

-- ----------------------------
-- Table structure for mascota
-- ----------------------------
DROP TABLE IF EXISTS `mascota`;
CREATE TABLE `mascota`  (
  `id_mascota` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `especie` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `raza` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `edad` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sexo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `peso` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `talla` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `esterilizacion` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `personalidad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `salud_cuidados` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `informacion_adicional` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `estado` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `id_albergue` int(11) NOT NULL,
  PRIMARY KEY (`id_mascota`) USING BTREE,
  INDEX `fk_mascota_albergue`(`id_albergue`) USING BTREE,
  CONSTRAINT `fk_mascota_albergue` FOREIGN KEY (`id_albergue`) REFERENCES `albergue` (`id_albergue`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mascota
-- ----------------------------
INSERT INTO `mascota` VALUES (1, 'Pochi', 'canina', 'Pastor Aleman', '3 años', 'macho', '80 lb', '65 cm', 'negro y fuego', 'No', 'Sociable', 'Buen estado de Salud          No necesita cuidados especiales', NULL, 'disponible', '2021-01-28 00:16:57', '2021-01-28 00:17:02', 1);

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol`  (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rol
-- ----------------------------
INSERT INTO `rol` VALUES (1, 'Administrador');
INSERT INTO `rol` VALUES (2, 'Supervisor');
INSERT INTO `rol` VALUES (3, 'Usuario');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `nombres` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `edad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_nacimiento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `domicilio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `identificacion` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `celular` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `ocupacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `nivel_instruccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  `id_albergue` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_users_rol`(`id_rol`) USING BTREE,
  INDEX `fk_users_albergue`(`id_albergue`) USING BTREE,
  CONSTRAINT `fk_users_albergue` FOREIGN KEY (`id_albergue`) REFERENCES `albergue` (`id_albergue`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Root', 'admin@gmail.com', '$2y$10$OIVau7dxliYi.egBtlCI9uSNzK83r2pSG4AoYDzMRjwQlwgrydCvK', NULL, 'Root', 'User', '18', '17 de Febrero de 2000', 'Oe-7 Santa Elena y Garbanzo', '1726845637', '2281677', '0985632247', 'profesional', 'universitario', '2021-01-18 00:07:48', '2021-01-18 00:07:50', 1, NULL);
INSERT INTO `users` VALUES (2, 'Usuario Regular', 'user@gmail.com', '$2y$10$OIVau7dxliYi.egBtlCI9uSNzK83r2pSG4AoYDzMRjwQlwgrydCvK', NULL, 'Usuario', 'Regular', '18', '17 de Enero de 2002', 'Oe-9 Santa Clara y Espinoza', '1724865933', '3457862', '0982790045', 'estudiante', 'secuandaria', '2021-01-17 23:52:31', '2021-01-17 23:52:34', 3, NULL);

SET FOREIGN_KEY_CHECKS = 1;
