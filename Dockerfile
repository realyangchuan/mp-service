# syntax=docker/dockerfile:1
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20


FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app


FROM base as build

RUN npm config set registry https://registry.npmmirror.com --global && \
  npm install --global @vercel/ncc
COPY package*.json ./
RUN npm install
COPY . ./
RUN npx prisma generate && \
  npx nest build --webpack && \
  ncc build ./dist/main.js -o ./build -m -a && \
  mv ./build/client/* ./build && \
  rm -rf ./build/client


FROM base as final

ENV NODE_ENV production
# 选用国内镜像源以提高下载速度
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tencent.com/g' /etc/apk/repositories && \
  # 使用 HTTPS 协议访问容器云调用证书安装
  apk add ca-certificates && \
  # 默认时区为UTC，启用以下时区设置命令以使用上海时间
  apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone
COPY --from=build /usr/src/app/build ./
CMD ["node", "index.js"]
