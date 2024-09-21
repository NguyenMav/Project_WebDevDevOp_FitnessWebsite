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
        
        //stage('Test') {
            //steps {
                //script {
                    //sh 'docker run --rm mynodeapp:latest npm test'
                //}
            //}
        //}
        
        //stage('Code Quality Analysis') {
            //steps {
                //script {
                    //nodejs(nodeJSInstallationName: 'NodeJs') {
                        //sh "npm install" 
                        //withSonarQubeEnv('SonarQube') { 
                            //sh "npm install sonar-scanner"
                            //sh "npm run sonar -Dsonar.verbose=true"
                        //}
                    //}
                //}
            //}
        //}
        
        stage('Deploy to Staging') {
            steps {
                script {
                    sh '''
                    docker info
                    docker version
                    docker compose version
                    curl --version
                    jq --version
                    '''
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
