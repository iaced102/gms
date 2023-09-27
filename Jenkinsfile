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
    }
    post{
        always{
            emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS: \nCheck console output at $BUILD_URL to view the results.',
            subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
            to: 'hoangnd@symper.vn'
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
