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
                    nodejs(nodeJSInstallationName: 'NodeJs') {
                        sh "npm install" 
                        withSonarQubeEnv('SonarQube') { 
                            // Install sonar-scanner
                            sh "npm install sonar-scanner"
                            // Run SonarScanner with verbose logging
                            sh "npm run sonar -Dsonar.verbose=true"
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh 'docker stop mynodeapp || true'
                    sh 'docker rm mynodeapp || true'
                    sh 'docker run -d -p 3000:3000 --name mynodeapp mynodeapp:latest'
                }
            }
        }
        
        stage('Release') {
            steps {
                script {
                    echo 'Promote to production (e.g., AWS CodeDeploy or any other method)'
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
