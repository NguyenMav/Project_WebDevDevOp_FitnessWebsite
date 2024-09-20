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
                    docker run --rm \
                        -e SONAR_HOST_URL=http://host.docker.internal:9000 \
                        -e SONAR_LOGIN=sqp_4eb127acc5df34ca8f919317288697931face948 \
                        -v $(pwd):/usr/src \
                        --workdir=/usr/src \
                        sonarsource/sonar-scanner-cli
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
