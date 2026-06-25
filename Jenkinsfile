pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/surazz14/suraj-showcase.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'NODE_OPTIONS="--max-old-space-size=1024" npm run build'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                    rm -rf /var/www/html/*
                    cp -r dist/* /var/www/html/
                    echo "Deployed at $(date)" > /var/www/html/deploy-check.txt
                    sudo /bin/systemctl restart nginx
                '''
            }
        }
    }
}