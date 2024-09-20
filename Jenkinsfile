peline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '''
                    sudo apt install npm
                    docker build -t my-node-app:1.0 .
                '''
            }
        }
        stage('Tests') {
            steps {
                sh '''
                        npm test
                '''
                }
                post {
                    always {
                        junit 'test-results.xml'
                    }
                }
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
