pipeline {
  agent any
  stages {
    // stage('更新Node.js版本') {
    //   steps {
    //     sh 'rm -rf /usr/lib/node_modules/npm/'
    //     sh 'sudo apt-get upgrade'
    //     sh 'sudo apt-get install nodejs'
    //   }
    // }

    stage('检出分支代码') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }

    stage('构建镜像并推送到云托管镜像仓库') {
      steps {
        sh "docker login ccr.ccs.tencentyun.com --username=${USER_NAME} --password=${PASSWORD}"
        sh "docker build -t ${TAG_ID} -f ${DOCKERFILE} ${BUILD_CONTEXT}"
        sh "docker tag ${TAG_ID} ${DOCKER_RES}:${TAG_ID}"
        sh "docker push ${DOCKER_RES}:${TAG_ID}"
      }
    }

    stage('发布微信云托管') {
      steps {
        script {
          sh 'npm install -g @wxcloud/cli' // 安装CLI工具
          sh 'wxcloud login --appId ${WXCLI_APPID} --privateKey ${WXCLI_KEY}' // 登录CLI
          sh(returnStdout: true, script: "wxcloud run:deploy --libraryImage=${TAG_ID} --envId=${WERUN_ENV} --serviceName=${WERUN_SERVICE} --containerPort=${SERVICE_PORT} --dockerfile ${DOCKERFILE} --targetDir=${BUILD_CONTEXT} --releaseType=FULL --remark='${COMMIT_MSG}' --detach --noConfirm").trim()
        }
      }
    }
  }

  environment {
    DATE2 = sh(returnStdout: true, script: 'date +%Y%m%d%H%M%S').trim()
    TAG_ID = "${WERUN_SERVICE}-${CI_BUILD_NUMBER}-${DATE2}"
    COMMIT_MSG = sh(returnStdout: true, script: 'git log --oneline --no-merges | head -1 | tail -c +8').trim()
  }
}
