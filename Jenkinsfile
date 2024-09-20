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
                    image 'sonarsource/sonar-scanner-cli:4.6'
                    reuseNode true
                }
            }
            steps {
                withSonarQubeEnv('SonarQube1') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=task6.2HD\
                        -Dsonar.sources=. \
                        -Dsonar.host.url=$http://localhost:9000/ \
                        -Dsonar.login=$sqp_b0c0dd500f96652dafd8d073d2776b7d8e48dc18
                    '''
                }
            }
        }
    }
}
