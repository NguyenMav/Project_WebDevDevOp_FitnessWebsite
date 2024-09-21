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
                            sh "npm install sonar-scanner"
                            sh "npm run sonar -Dsonar.verbose=true"
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                        docker stop mynodeapp || true
                        docker rm mynodeapp || true
                        docker run -p 3000:3000 --name mynodeapp mynodeapp:latest
                    '''
                }
            }
        }

        stage('Release') {
            steps {
                script {
                    sh '''
                        echo 'Release step executed'
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
    }

    post {
        always {
            deleteDir()
        }
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
