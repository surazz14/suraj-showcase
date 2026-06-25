pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'cp -r build/* /var/www/html/'
                sh 'sudo systemctl reload nginx'
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully! ✅'
        }
        failure {
            echo 'Build failed ❌'
        }
    }
}