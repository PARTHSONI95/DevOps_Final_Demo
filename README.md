# Bus booking App on Multi cloud architecture

Presenting mobile ready fully responsive UI application which can book bus ticket between given destinations and particular date. There is direct login feature using JWT which may save your worthy time. The complete automated deployment is handled using CircleCI. And vital point the application runs on multiple cloud. There is autoscaling feature enabled in cloud.

## Pre-requisites

1. [Terraform](https://www.terraform.io/downloads.html)
2. [Kubectl](https://kubernetes.io/docs/tasks/tools/) - Optional just for local testing

## Technology stack used

* Front End - [React](https://reactjs.org/) - uber-frontend folder
            - [Patternfly](https://www.patternfly.org/v4/)
* Back End  - [Flask](https://palletsprojects.com/p/flask/) - uber-backend folder
* Database  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* Cloud     - [AWS](https://aws.amazon.com/)
            - [Google Cloud PlatForm](https://cloud.google.com/)
* IaaS      - [Terraform](https://www.terraform.io/) - infrastructure folder
* Container Orchestration - [EKS](https://aws.amazon.com/eks/)
                            [GKS](https://cloud.google.com/kubernetes-engine)
* Automation - [CircleCI](https://circleci.com/)
* Load Testing - [Postman](https://www.postman.com/)

![Architecture](https://github.com/PARTHSONI95/DevOps_Final_Demo/blob/main/readme_image.png)

## How to run the project

### 1. Infra setup

Here we are using Amazon Elastic Kubernetes Service as Infrastructure where the Kubernetes pods will be made run.

Go to infrastucture\aws_infra folder and run the below steps:-
Firstly, please add your AWS account access key and secret key in `a-vpc-providers.tf` file

```bash
$ terraform init
```

```bash
$ terraform apply -auto-approve 
```

![Automation](https://github.com/PARTHSONI95/DevOps_Final_Demo/blob/main/circleci.png)

### 2. CI/CD automation using CircleCI

Once the infrastructure is UP and running >>>

Then go to [CircleCI](https://circleci.com/) and link it with your Github account. Add following environment variables - 

1. AWS_ACCESS_KEY_ID - Your AWS account access key
2. AWS_DEFAULT_REGION - AWS account default region e.g us-east-1
3. AWS_REGION - similar to AWS_DEFAULT_REGION
4. AWS_SECRET_ACCESS_KEY - Your AWS account secret access key
5. DockerUsername - your docker hub repo username
6. DockerPassword - your docker hub repo password
7. GCLOUD_KEY - your Google account cloud key
8. GCLOUD_SERVICE_KEY - your Google account service key


Configuring local machine with the infrastructure created
```bash
$ terraform output kubeconfig > C:/Users/<username>/.kube/config-terraform-eks-demo
$ terraform output config_map_aws_auth > ./config-map-aws-auth.yml
```

Take the backup of already present kube config file
```bash
$ cp C:/Users/<username>/.kube/config C:/Users/<username>/.kube/config.bak
```

```bash
$ cp C:/Users/<username>/.kube/config-terraform-eks-demo C:/Users/<username>/.kube/config
```

To check your local machine connected with EKS cluster 
```bash
$ kubectl get nodes
```

Now these files (config-map-aws-auth.yml and config) needs to be present in the root folder of github repository. Push this files to github repository
```bash
$ git add --all
$ git commit -m "Adding kube config & config-map-aws-auth.yml"
$ git push origin <branch name>
```
It will automatically trigger CircleCI pipeline. And the dashboard of CircleCI will help you understand the code build stats very crystal and clear.

Detailed work implemented in config.yml (.cicleci folder) -

After any application code update pushed in Github repo will initiate the steps below: 

Workflow 1:

* Code checkout from Github
* Installions
* Creating docker image for backend and pushing it to docker hub image repo
* Kubectl configuration to apply deployments and load balancer to back-end layer
* Similarly, creating docker image for frontend and pushing to docker hub
* Kubectl configuration to apply deployments and load balancer to front-end layer which will be automatically linked with back-end layer

Workflow 2:

* Code checkout from Github
* Connecting with Google cloud cluster
* Deploy the front-end image created before on the cluster along with load balancer.
* Autoscaling is configured in Terraform to scale them up or down

### Testing Application

From Circle CI output - we will pick up the load balancer endpoint to see the application.

For instance - something like http://a537ed5ea4a954fc6aaa7e4286224543-1806997337.us-east-1.elb.amazonaws.com

### Output 

Login Page - i.e the initial page of the application

![Login Page](https://github.com/PARTHSONI95/DevOps_Final_Demo/blob/main/mainPage.PNG)

![Search Page](https://github.com/PARTHSONI95/DevOps_Final_Demo/blob/main/searchPage.PNG)

This shows the fully responsive UI which can be logged in with direct sign-in using JWT functionality.

### Developers

* Parth Soni - soni.pa@northeastern.edu
* Yash Thakkar - thakkar.y@northeastern.edu

### THANK YOU :)