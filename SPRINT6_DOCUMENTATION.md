# Sprint 6: Testing, Documentation, and Final Pipeline Automation

## Project Overview

This capstone project demonstrates a complete DevOps CI/CD pipeline for deploying a containerized application on AWS EKS using Terraform, Docker, Amazon ECR, Jenkins, Kubernetes, Prometheus, and Grafana.

---

# Architecture

GitHub Repository

↓

Jenkins CI/CD Pipeline

↓

Docker Build

↓

Amazon ECR

↓

Amazon EKS

↓

Kubernetes Deployment

↓

Prometheus Monitoring

↓

Grafana Dashboards & Alerts

---

# Sprint 1: Infrastructure Provisioning using Terraform

## Objective

Provision AWS infrastructure required for Kubernetes deployment.

## Resources Created

* VPC
* Public Subnets
* Internet Gateway
* Route Tables
* Security Groups
* EKS Cluster
* EKS Node Group

## Validation

Terraform commands executed successfully:

```bash
terraform init
terraform plan
terraform apply
```

Infrastructure resources were created successfully in AWS.

---

# Sprint 2: Dockerization and Amazon ECR

## Objective

Containerize the application and store images in Amazon ECR.

## Activities Performed

* Created Dockerfile
* Built Docker Image
* Created ECR Repository
* Tagged Docker Image
* Pushed Docker Image to ECR

## Commands Used

```bash
docker build -t shivani-capstone .
docker tag shivani-capstone:latest <ecr-repository>
docker push <ecr-repository>
```

## Validation

Docker image successfully stored in Amazon ECR.

---

# Sprint 3: Kubernetes Deployment on Amazon EKS

## Objective

Deploy application to Amazon EKS.

## Kubernetes Manifests

### deployment.yaml

Responsible for:

* Pod creation
* Replica management
* Container deployment

### service.yaml

Responsible for:

* LoadBalancer creation
* External application access

### hpa.yaml

Responsible for:

* Horizontal Pod Autoscaling

## Validation

```bash
kubectl get deployments
kubectl get pods
kubectl get svc
kubectl get hpa
```

Application deployed successfully.

---

# Sprint 4: Jenkins CI/CD Pipeline

## Objective

Automate build, push, deployment, and verification.

## Jenkins Pipeline Stages

1. Checkout Source Code
2. Build Docker Image
3. Login To Amazon ECR
4. Tag Docker Image
5. Push Docker Image To ECR
6. Configure EKS
7. Deploy To EKS
8. Verify Deployment

## Validation

Jenkins pipeline executed successfully.

Deployment status:

SUCCESS

---

# Sprint 5: Monitoring and Alerting

## Objective

Monitor infrastructure and application health.

## Components Installed

### Prometheus

Used for:

* Infrastructure metrics
* Kubernetes metrics
* Application metrics

### Grafana

Used for:

* Visualization
* Dashboard creation

### AlertManager

Used for:

* Alert processing
* Notification management

### Node Exporter

Used for:

* Node CPU monitoring
* Node Memory monitoring

## Alert Rules Configured

### PodDownAlert

Expression:

```promql
up == 0
```

Purpose:

Trigger alert when monitored pod becomes unavailable.

## Validation

```bash
kubectl get pods
kubectl get svc
```

Grafana dashboard accessible through LoadBalancer URL.

---

# Sprint 6: Testing and Validation

## Application Test Cases

| Test Case               | Expected Result                | Status |
| ----------------------- | ------------------------------ | ------ |
| Application URL Access  | Application loads successfully | Passed |
| Pod Status Check        | Pods in Running state          | Passed |
| Service Validation      | LoadBalancer accessible        | Passed |
| Deployment Verification | Deployment available           | Passed |
| HPA Verification        | Autoscaler configured          | Passed |

## Infrastructure Test Cases

| Test Case             | Expected Result | Status |
| --------------------- | --------------- | ------ |
| EKS Cluster Health    | Active          | Passed |
| Worker Nodes          | Ready           | Passed |
| ECR Repository        | Available       | Passed |
| Prometheus Monitoring | Running         | Passed |
| Grafana Dashboard     | Accessible      | Passed |

## Jenkins Pipeline Test Cases

| Test Case          | Expected Result | Status |
| ------------------ | --------------- | ------ |
| Checkout Stage     | Success         | Passed |
| Build Stage        | Success         | Passed |
| Push Stage         | Success         | Passed |
| Deploy Stage       | Success         | Passed |
| Verification Stage | Success         | Passed |

---

# Automated CI/CD Workflow

GitHub Push

↓

Jenkins Trigger

↓

Docker Build

↓

Push To ECR

↓

Deploy To EKS

↓

Verify Deployment

↓

Monitoring via Prometheus & Grafana

---

# Troubleshooting Performed

## Issue 1

Docker image not found in ECR.

### Resolution

Built image correctly and pushed latest image to ECR repository.

---

## Issue 2

Kubernetes pods in ImagePullBackOff state.

### Resolution

Verified ECR image availability and redeployed application.

---

## Issue 3

Grafana service inaccessible.

### Resolution

Changed Grafana service type to LoadBalancer and verified ELB creation.

---

# Production Readiness Improvements

Future enhancements:

* Configure HTTPS using AWS ACM
* Enable Jenkins email notifications
* Integrate Slack notifications
* Configure Cluster Autoscaler
* Implement SonarQube Code Quality Analysis
* Store secrets in AWS Secrets Manager
* Enable Disaster Recovery strategy

---

# Final Outcome

Successfully implemented a complete DevOps CI/CD pipeline using:

* Terraform
* AWS EKS
* Docker
* Amazon ECR
* Jenkins
* Kubernetes
* Prometheus
* Grafana

The application deployment, monitoring, alerting, and automation pipeline have been validated and are operational.