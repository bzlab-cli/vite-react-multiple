#!/bin/bash

rm -rf /var/lib/docker/volumes/react-jblog-admin-data/_data/*
docker volume create --driver local react-jblog-admin-data
docker-compose down
docker-compose build
docker-compose up -d

echo "构建成功"









