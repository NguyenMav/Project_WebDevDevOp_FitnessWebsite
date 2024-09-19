pipeline {
    agent any

    tools {
        jdk 'Java17'
        maven 'Maven3'
    }
    
    stages {
        stage('Build') {
            steps {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
        }
        stage('Tests') {
            steps {
                node --version
                npm --version
                npm ci
                npm run build
                ls -la
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Stage 3: Code Analysis'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Stage 5: Deploy'
            }
        }
        stage('Release') {
            steps {
                echo 'Stage 6: Release'
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                echo 'Stage 7: Monitoring and Alerting'
            }
        }
    }
}
