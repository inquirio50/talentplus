pipeline {
    agent any
    
    environment {
        SERVICE_NAME = "talent"
        DOCKERHUB_USERNAME = "justicebxj"
        REPOSITORY_TAG = "${DOCKERHUB_USERNAME}/${SERVICE_NAME}:${BUILD_ID}"
    }

    
    
    stages {
//         stage ('Preparing') {
//             steps {
//                 cleanWs()
//                 git credentialsId: 'Github', url: "git@github.com:wasp-networks/Arca.UserManagement.git" //${ORGANIZATION_NAME}/${SERVICE_NAME}"
//             }
//         }
        
        stage ('Build and Push Image') {
            steps {
                 withDockerRegistry([credentialsId: 'DOCKERHUB_USERNAME', url: ""]) {
                   sh 'docker build -t ${REPOSITORY_TAG} ./src'
                   sh 'docker push ${REPOSITORY_TAG}'          
            }
          }
       }
        
        stage('Remove Unused docker image') {
          steps{
            script {
             // sh "docker rmi -f  ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
              echo "passed"
                    }
          }
        }

       stage("Install kubectl"){
            steps {
                sh """
                    curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
                    chmod +x ./kubectl
                    ./kubectl version --client
                """
            }
        }
        

        stage ('Deploy to Cluster') {
            steps {
                sh "aws eks update-kubeconfig --region eu-west-1 --name reelcruit-cluster"
                sh " envsubst < ${WORKSPACE}/deploy.yaml | ./kubectl apply -f - "
            }
        }
    }
}