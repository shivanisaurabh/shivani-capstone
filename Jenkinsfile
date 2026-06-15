pipeline {
    agent any

    environment {
        AWS_REGION = 'us-west-1'
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
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'shivani-aws-creds']
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
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'shivani-aws-creds']
                ]) {
                    dir('terraform') {
                        sh '''
                            export AWS_DEFAULT_REGION=us-west-1
                            terraform init
                        '''
                    }
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'shivani-aws-creds']
                ]) {
                    dir('terraform') {
                        sh 'terraform validate'
                    }
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'shivani-aws-creds']
                ]) {
                    dir('terraform') {
                        sh 'terraform plan'
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'shivani-aws-creds']
                ]) {
                    dir('terraform') {
                        sh 'terraform apply -auto-approve'
                    }
                }
            }
        }

        stage('Check Ansible') {
            steps {
                sh 'ansible --version'
            }
        }

        stage('Check Docker') {
    steps {
        sh 'docker --version'
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