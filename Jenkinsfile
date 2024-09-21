pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = 'nfp_LxhX6BkXcvy87uLJNBm59HGEW9r4bYvN2db0'
    }
    
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
                    sh '''
                    echo 'release'
                    '''
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
        post {
            always {
                deleteDir()
            }
            success {
                echo 'Pipeline Completed'
            }
            failure {
                echo 'Pipeline Failed'
            }
        }
    }
}
