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
                    sh '''
                        docker run --rm --network host \
                        -v $WORKSPACE:/app \
                        mynodeapp:latest /bin/sh -c "sonar-scanner \
                        -Dsonar.projectKey=mynodeapp \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://192.168.1.109:9000/ \
                        -Dsonar.login=squ_11d673050fde432bbb8abaaf9e6138f7839bd1a4"
                    '''
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