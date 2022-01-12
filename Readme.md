# Microservices with Node JS and React

## E-Commerce app using Microservices built with Node, React, Docker and Kubernetes

### Installation

#### Install Packages using the node package manager

```bash
npm install
```

#### Install Kubernetes

- Install Docker Desktop
- Enable Kubernetes
- Verify your Kubernetes cluster

```bash
kubectl get nodes
```

##### You should see a single node in the output called docker-desktop

#### Install Ingress-nginx

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml
```

#### Install Skaffold

Skaffold can be installed using the Chocolatey package manager

```bash
choco install -y skaffold
```

### RUN

```bash
skaffold dev
```
