pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'docker build -t mynodeapp:latest .'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    sh 'docker run --rm mynodeapp:latest npm test'
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Run SonarQube scan within the Sonar stage of the Dockerfile
                    sh 'docker run --rm mynodeapp:latest npm run sonar'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name mynodeapp mynodeapp:latest'
                }
            }
        }
        
        stage('Release') {
            steps {
                script {
                    echo 'Release stage: Promote to production (e.g., using AWS CodeDeploy)'
                }
            }
        }
        
        stage('Monitoring and Alerting') {
            steps {
                script {
                    echo 'Set up monitoring for the application'
                }
            }
        }
    }
}