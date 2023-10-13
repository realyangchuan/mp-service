-- CreateTable
CREATE TABLE `t_user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(8) NOT NULL COMMENT 'userId',
    `user_name` VARCHAR(32) NULL COMMENT 'userName',
    `avatar` VARCHAR(255) NULL COMMENT '用户头像',
    `password` VARCHAR(255) NULL COMMENT '登录密码',
    `tel` CHAR(11) NULL COMMENT '用户电话',
    `addr` VARCHAR(255) NULL COMMENT '联系地址',
    `superior` CHAR(8) NULL COMMENT '上级',
    `add_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '账号创建时间',
    `wx_appid` VARCHAR(128) NULL COMMENT '微信appid',
    `wx_openid` VARCHAR(128) NULL COMMENT '微信openid',
    `wx_unionid` VARCHAR(128) NULL COMMENT '微信unionid',

    UNIQUE INDEX `t_user_user_id_key`(`user_id`),
    UNIQUE INDEX `t_user_tel_key`(`tel`),
    UNIQUE INDEX `t_user_wx_openid_key`(`wx_openid`),
    UNIQUE INDEX `t_user_wx_unionid_key`(`wx_unionid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
