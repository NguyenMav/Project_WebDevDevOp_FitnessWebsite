pipeline {
    agent any

    stages {
        stage('Build') {
            script {
                sh '''
                    mkdir -p "$WORKSPACE"
                '''
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm test
                '''
            }
            post {
                always {
                    junit 'test-results.xml'
                }
            }
        }
        stage("build & SonarQube analysis") {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                withSonarQubeEnv('jenkins-sonar') {
                sh 'mvn clean package sonar:sonar'
                }
            }
        }
    }
}
