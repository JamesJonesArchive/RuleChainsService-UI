node('master') {
  env.NODEJS_HOME = tool 'nodejs'
  env.PATH = "${env.JENKINS_HOME}/bin:${env.JENKINS_HOME}/.local/bin:${env.NODEJS_HOME}/bin:${env.PATH}"
  checkout scm

  stage('Get Ansible Roles') {
    sh('#!/bin/sh -e\n' + 'rm -rf ansible/roles')
    sh('#!/bin/sh -e\n' + 'rm -rf ansible/libs')
    sh('#!/bin/sh -e\n' + 'ansible-galaxy install -r ansible/requirements.yml -p ansible/roles/ -f')
  }
  stage('Build RuleChainsUI') {
    sh "rm -f *.rpm"
    sh "ansible-playbook -i 'localhost,' -c local --vault-password-file=${env.DEPLOY_KEY} ansible/playbook.yml --extra-vars 'target_hosts=all java_home=${env.JAVA_HOME} deploy_env=${env.DEPLOY_ENV} package_revision=${env.BUILD_NUMBER}' -t build"
  }
  stage('Publish RuleChainsUI') {
    sh('#!/bin/sh -e\n' + "ansible-playbook -i 'localhost,' -c local --vault-password-file=${env.DEPLOY_KEY} ansible/playbook.yml --extra-vars 'target_hosts=all java_home=${env.JAVA_HOME} deploy_env=${env.DEPLOY_ENV} package_revision=${env.BUILD_NUMBER} workspace=${env.WORKSPACE} bintray_api_key=${env.BINTRAY_API_KEY}' -t publish")
  }
//  stage('Setup ansible-container') {
//    sh('#!/bin/sh -e\n' + "ansible-playbook -i 'localhost,' -c local --vault-password-file=${env.DEPLOY_KEY} ansible/playbook.yml --extra-vars 'target_hosts=all java_home=${env.JAVA_HOME} deploy_env=${env.DEPLOY_ENV} package_revision=${env.BUILD_NUMBER} workspace=${env.WORKSPACE} bintray_api_key=${env.BINTRAY_API_KEY}' -t docker")
//  }
//  stage('Create RuleChainsUI Docker container') {
//    dir('ansible/docker') {
//      sh("""
//        source ../libs/bin/activate
//        ../libs/bin/ansible-container --debug build --roles-path=../roles
//      """)
//    }
//  }
  stage('Deploy RuleChainsUI') {
    sshagent (credentials: ['jenkins_ymd_key']) {
      sh('#!/bin/sh -e\n' + "ansible-playbook -i ansible/roles/inventory/${env.DEPLOY_ENV.toLowerCase()}/hosts --user=jenkins --vault-password-file=${env.DEPLOY_KEY} ansible/playbook.yml --extra-vars 'target_hosts=${env.DEPLOY_HOST} java_home=${env.JAVA_HOME} deploy_env=${env.DEPLOY_ENV} package_revision=${env.BUILD_NUMBER}' -b -t deploy")
    }
  }
}


