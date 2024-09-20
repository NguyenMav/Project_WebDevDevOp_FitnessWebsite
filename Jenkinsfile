pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Install dependencies and build the Docker image
                    sh 'docker build -t mynodeapp:latest .'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Run automated tests using Jest or your preferred framework
                    sh 'npm test'
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Run ESLint for code quality analysis
                    sh 'npm run lint'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Deploy to Docker container
                    sh 'docker run -d -p 3000:3000 --name mynodeapp mynodeapp:latest'
                }
            }
        }
        
        stage('Release') {
            steps {
                script {
                    // Promote application to production (modify as needed)
                    echo 'Release stage: Promote to production (e.g., using AWS CodeDeploy)'
                }
            }
        }
        
        stage('Monitoring and Alerting') {
            steps {
                script {
                    // Set up monitoring (e.g., using Datadog)
                    echo 'Set up monitoring for the application'
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker containers
            sh 'docker stop mynodeapp || true'
            sh 'docker rm mynodeapp || true'
        }
    }
}
