pipeline {
agent any

```
environment {
    AWS_REGION = "us-west-1"
    AWS_ACCOUNT_ID = "975050024946"
    ECR_REPO = "shivani-capstone"
    CLUSTER_NAME = "capstone-eks"

    ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
            url: 'https://github.com/shivanisaurabh/shivani-capstone.git'
        }
    }

    stage('Check Docker') {
        steps {
            sh 'docker --version'
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

    stage('Debug Workspace') {
    steps {
        sh '''
        pwd
        ls -la
        echo "BACKEND CONTENTS"
        ls -la backend
        '''
    }
}

    stage('Login to ECR') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'shivani-aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )
            ]) {
                sh '''
                export AWS_DEFAULT_REGION=${AWS_REGION}

                aws ecr get-login-password --region ${AWS_REGION} \
                | docker login \
                --username AWS \
                --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }
    }

    stage('Tag Docker Image') {
        steps {
            sh '''
            docker tag shivani-capstone:latest ${ECR_URI}:latest
            '''
        }
    }

    stage('Push Image to ECR') {
        steps {
            sh '''
            docker push ${ECR_URI}:latest
            '''
        }
    }

    stage('Configure EKS') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'shivani-aws-creds',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )
            ]) {
                sh '''
                export AWS_DEFAULT_REGION=${AWS_REGION}

                aws eks update-kubeconfig \
                --region ${AWS_REGION} \
                --name ${CLUSTER_NAME}
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
            kubectl get nodes
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
```

}