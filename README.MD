download docker
open terminal npm install
docker run -p 3306:3306 --name mysql-docker-local --network=internal -eMYSQL_ROOT_PASSWORD=123456 -d mysql:latest
npm start