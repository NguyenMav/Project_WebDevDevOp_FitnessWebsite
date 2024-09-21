pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
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
                    sh 'npm install -g netlify-cli'
                    sh 'netlify login --auth NETLIFY_AUTH_TOKEN"' 
                    def netlifyDir = "${env.WORKSPACE}/netlify_deploy"
                    sh "mkdir -p ${netlifyDir}"
                    sh "docker run --rm mynodeapp:latest cp -r /app/public_html/. ${netlifyDir}/"
                    sh "netlify deploy --prod --dir=${netlifyDir}"
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
