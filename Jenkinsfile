pipeline{
    agent any
    stages{
        stage("Clone"){
            steps{
                git "https://github.com/iaced102/gms.git"

            }
            post{
                success{
                    echo "clone frontend code successful"
                }
                failure{
                    echo "clone frontend code fail"
                }
        
            }
        }
        stage("build"){
            steps{
                withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t gms-v1 .'
                    sh 'docker push gms-v1 .'
                }

            }
            post{
                success{
                    echo "build docker frontend code successful"
                }
                failure{
                    echo "build docker frontend code fail"
                }
        
            }
        }
    }
    post{
        always{
            emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: \nCheck console output at $BUILD_URL to view the results.',
            subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
            to: 'phucvu@aggregatoricapaci.com'
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
