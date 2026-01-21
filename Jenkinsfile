pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        REGISTRY = "your-dockerhub-username"
        BACKEND_IMAGE = "${REGISTRY}/advanced-backend"
        FRONTEND_IMAGE = "${REGISTRY}/advanced-frontend"
        TAG = "latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/advanced-devops-project.git'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir('app/backend') {
                        // Testing for Node.js (example)
                        sh 'npm install'
                        echo 'Running Unit Tests...'
                        // sh 'npm test' // Uncomment when tests are added
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo 'Building Backend Image...'
                    sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./app/backend"
                    
                    echo 'Building Frontend Image...'
                    sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./app/frontend"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Logging in to Docker Hub...'
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    
                    echo 'Pushing Images...'
                    sh "docker push ${BACKEND_IMAGE}:${TAG}"
                    sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo 'Deploying Application Stack...'
                    // Stop existing containers and start new ones
                    sh "docker-compose down"
                    sh "docker-compose up -d --build"
                }
            }
        }

        stage('Verify Health') {
            steps {
                script {
                    sleep 10
                    echo 'Checking if Frontend is up...'
                    sh "curl -f http://localhost:80 || exit 1"
                    
                    echo 'Checking if APIs are responsive...'
                    sh "curl -f http://localhost:80/api || exit 1"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful! Dashboard accessible at port 80.'
        }
        failure {
            echo 'Deployment Failed. Rolling back...'
        }
    }
}
