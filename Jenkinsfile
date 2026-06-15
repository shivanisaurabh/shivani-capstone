pipeline {
    agent any

    environment {
        AWS_REGION = 'us-west-1'
        DOCKER_IMAGE = 'travelmemory-backend'
        DOCKERHUB_USER = 'YOUR_DOCKERHUB_USERNAME'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/shivanisaurabh/shivani-capstone.git'
            }
        }

        stage('AWS Verify') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-creds',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=us-west-1
                        aws sts get-caller-identity
                    '''
                }
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir('terraform') {
                    sh 'terraform validate'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    sh 'terraform plan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${DOCKER_IMAGE}:latest .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                echo 'Docker login stage'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Docker push stage'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}