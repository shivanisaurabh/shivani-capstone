pipeline {
agent any

environment {
    AWS_REGION = "us-west-1"
    AWS_ACCOUNT_ID = "975050024946"
    ECR_REPO = "shivani-capstone"
    CLUSTER_NAME = "capstone-eks"
    ECR_URI = "975050024946.dkr.ecr.us-west-1.amazonaws.com/shivani-capstone"
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
                aws eks update-kubeconfig --region us-west-1 --name capstone-eks
                '''
            }
        }
    }

    stage('Deploy To EKS') {
        steps {
            sh '''
            kubectl apply -f k8s/deployment.yaml
            kubectl apply -f k8s/service.yaml
            kubectl apply -f k8s/hpa.yaml
            '''
        }
    }

    stage('Verify Deployment') {
        steps {
            sh '''
            kubectl get deployments
            kubectl get pods
            kubectl get svc
            kubectl get hpa
            '''
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