/**
 * 是否运行在微信云托管中
 */
export const isCloudrun = !!process.env.CBR_ENV_ID
