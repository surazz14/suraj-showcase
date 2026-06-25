pipeline {
    agent any

    tools {
        nodejs 'NodeJS 20'
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

        stage('Build') {
            steps {
                sh 'NODE_OPTIONS="--max-old-space-size=1024" npm run build'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                    rm -rf /var/www/html/*
                    cp -r dist/* /var/www/html/
                    sudo /bin/systemctl restart nginx
                '''
            }
        }
    }
}