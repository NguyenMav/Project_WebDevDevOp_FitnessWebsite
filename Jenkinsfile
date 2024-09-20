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
                    // Save the Docker image as a tar archive
                    sh 'docker save mynodeapp:latest -o mynodeapp.tar'

                    // Extract the tar archive to a temporary directory
                    sh 'mkdir extracted_image && tar -xf mynodeapp.tar -C extracted_image'

                    // Run SonarQube scanner on the extracted files
                    withSonarQubeEnv('SonarQube') {
                        sh "sonar-scanner -Dsonar.projectKey=mynodeapp -Dsonar.sources=extracted_image -Dsonar.projectKey=test -Dsonar.sources=. -Dsonar.host.url=http://192.168.1.109:9000/ -Dsonar.login=squ_11d673050fde432bbb8abaaf9e6138f7839bd1a4"
                    }
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