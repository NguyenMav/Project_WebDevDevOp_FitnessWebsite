pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22.9.0'  // NodeJS installation configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Set Permissions') {
            steps {
                // Set permissions for any necessary files or directories
                sh 'chmod -R +x node_modules/.bin'
            }
        }

        stage('Build') {
            steps {
                // Build the project
                sh 'npm run build'
            }
        }

        stage('Code analysis') {
            steps {
                script {
                    // Try to run the linting step, but don't fail the pipeline if it fails
                    try {
                        sh 'npm run lint'
                    } catch (err) {
                        echo 'Linting failed, but continuing with the pipeline...'
                    }
                }
            }
        }

        stage('Unit Test') {
            steps {
                // Run the unit tests using Mocha
                sh 'npx mocha'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application (modify the deploy command as needed)
                sh 'npm run start --port=3000 &'
            }
        }
    }

    post {
        always {
            // Clean up workspace after pipeline execution
            deleteDir()
        }
        success {
            echo 'Build, Test, and Deploy stages completed successfully!'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
