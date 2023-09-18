#!/bin/bash
docker build -t registry.aggregatoricapaci.com/cardoctor/gms-fe:$1 .
# docker tag cardoctor/gms-fe:$1 registry.aggregatoricapaci.com/cardoctor/gms-fe:$1
docker push registry.aggregatoricapaci.com/cardoctor/gms-fe:$1
