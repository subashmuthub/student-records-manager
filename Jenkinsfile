pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    sudo -u ec2-user -H bash -c "
                        cd /home/ec2-user/student-records-manager &&
                        git pull origin main &&
                        npm install &&
                        pm2 restart student-app
                    "
                '''
            }
        }
    }
}