pipeline {
    agent any

    environment {
        AWS_REGION   = "us-west-1"
        AWS_ACCOUNT  = "975050024946"
        ECR_REPO     = "shivani-capstone"
        ECR_URI      = "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
        CLUSTER_NAME = "capstone-eks"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/shivanisaurabh/shivani-capstone.git'
            }
        }

        stage('Debug Workspace') {
            steps {
                sh '''
                pwd
                ls -la
                ls -la backend
                ls -la k8s
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh '''
                    docker build -t shivani-capstone:latest .
                    '''
                }
            }
        }

        stage('Login To ECR') {
            steps {
                withCredentials([
                    [
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'shivani-aws-creds'
                    ]
                ]) {
                    sh '''
                    aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 975050024946.dkr.ecr.us-west-1.amazonaws.com
                    '''
                }
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag shivani-capstone:latest ${ECR_URI}:latest
                '''
            }
        }

        stage('Push Image To ECR') {
            steps {
                sh '''
                docker push ${ECR_URI}:latest
                '''
            }
        }

        stage('Configure EKS') {
            steps {
                withCredentials([
                    [
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'shivani-aws-creds'
                    ]
                ]) {
                    sh '''
                    aws sts get-caller-identity
                    aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}
                    kubectl get nodes
                    '''
                }
            }
        }

        stage('Deploy To EKS') {
            steps {
                withCredentials([
                    [
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'shivani-aws-creds'
                    ]
                ]) {
                    sh '''
                    aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}

                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl apply -f k8s/hpa.yaml
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                withCredentials([
                    [
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'shivani-aws-creds'
                    ]
                ]) {
                    sh '''
                    aws eks update-kubeconfig --region ${AWS_REGION} --name ${CLUSTER_NAME}

                    kubectl get deployments
                    kubectl get pods
                    kubectl get svc
                    kubectl get hpa
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Sprint 4 Deployment Successful'
        }

        failure {
            echo 'Sprint 4 Deployment Failed'
        }
    }
}