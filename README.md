# Bus booking App on Multi cloud architecture

Presenting mobile ready fully responsive UI application which can book bus ticket between given destinations and particular date. There is direct login feature using JWT which may save your worthy time. The complete automated deployment is handled using CircleCI. And vital point the application runs on multiple cloud. There is autoscaling feature enabled in cloud.

## Technology stack used

* Front End - [React](https://reactjs.org/)
            - [Patternfly](https://www.patternfly.org/v4/)
* Back End  - [Flask](https://palletsprojects.com/p/flask/)
* Database  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* Cloud     - [AWS](https://aws.amazon.com/)
            - [Google Cloud PlatForm](https://cloud.google.com/)
* IaaS      - [Terraform](https://www.terraform.io/)


![Architecture](https://github.com/PARTHSONI95/UberBusApp/blob/main/readme_image.png)

## How to run the project

### Infra setup

Here we are using Amazon Elastic Kubernetes Service as Infrastructure where the Kubernetes pods will be made run.

Go to infrastucture\aws_infra folder and run the below steps:-

```bash
$ terraform init
```

```bash
$ terraform apply -auto-approve 
```

To destroy the infrastucture -

```bash
$ terraform destroy -auto-approve 
```

![Automation](https://github.com/PARTHSONI95/UberBusApp/blob/main/circleci.png)

### CI/CD automation using CircleCI

Steps implemented in config.yml (.cicleci folder) -
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

### Output 



### THANK YOU :)