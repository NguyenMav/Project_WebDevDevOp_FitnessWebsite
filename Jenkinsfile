pipeline {
    agent any

    stages {
        stage('Build') {
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

        stage('Code Quality Analysis') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            environment {
                SCANNER_HOME = tool 'SonarQubeScanner';    
            }
            
            steps {
                
                withSonarQubeEnv('SonarQube') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }
    }
}
