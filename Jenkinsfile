pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '''
                    echo "Stage 1: Build"
                    ls -la
                    touch container-no.txt
                '''
            }
        }
        stage('Tests') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Stage 2: Tests"
                    ls -la
                    touch container-yes.txt
                '''
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Stage 3: Code Analysis'
                // Add your code analysis commands here
            }
        }
        stage('Deploy') {
            steps {
                echo 'Stage 5: Deploy'
                // Add your deployment commands here
            }
        }
        stage('Release') {
            steps {
                echo 'Stage 6: Release'
                // Add your release commands here
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                echo 'Stage 7: Monitoring and Alerting'
                // Add monitoring/alerting commands here
            }
        }
    }
}
