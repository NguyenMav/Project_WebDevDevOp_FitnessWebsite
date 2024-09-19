pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Stage 1: Build'
                echo 'Tool: Maven'
                echo 'Description: Compiles the source code and packages it into a deployable format. This stage ensures that the code is correctly built and ready for further testing and deployment.'
            }
        }
        stage('Unit and Integration Tests') {
            steps {
                echo 'Stage 2: Unit and Integration Tests'
                echo 'Tool: JUnit'
                echo 'Description: Runs unit tests to validate individual components of the application and integration tests to ensure that different parts of the application work together as expected. This stage helps to catch bugs early and ensures the code meets the functional requirements.'
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Stage 3: Code Analysis'
                echo 'Tool: SonarQube'
                echo 'Description: Analyzes the code for potential issues, including code smells, bugs, and vulnerabilities. It checks for adherence to coding standards and best practices, ensuring the code is maintainable and secure.'
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Stage 4: Security Scan'
                echo 'Tool: OWASP'
                echo 'Description: Performs a security scan on the application to identify common vulnerabilities such as SQL injection, cross-site scripting (XSS), and other security risks. This stage helps to ensure that the application is secure before deployment.'
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo 'Stage 5: Deploy to Staging'
                echo 'Tool: AWS EC2'
                echo 'Description: Deploys the application to a staging environment, which is a production-like environment where further testing can be conducted. This stage allows the team to verify the deployment process and catch any issues that might arise in a production setting.'
            }
        }
        stage('Integration Tests on Staging') {
            steps {
                echo 'Stage 6: Integration Tests on Staging'
                echo 'Tool: AWS EC2'
                echo 'Description: Runs integration tests in the staging environment to ensure that the application functions correctly in a production-like setting. This stage helps to catch environment-specific issues before going live.'
            }
        }
        stage('Deploy to Production') {
            steps {
                echo 'Stage 7: Deploy to Production'
                echo 'Tool: AWS EC2'
                echo 'Description: Deploys the application to the production environment where it will be accessible to end users. This is the final stage of the pipeline, making the application available for use.'
            }
        }
    }
}
