## run docker compose
docker compose up

## run docker compose and use terminal
docker compose up -d

## run logs of docker compose
docker compose logs

## kill docker compose proccess
docker compose down

# Erro address already in use
Error response from daemon: driver failed programming external connectivity on endpoint nestjs-class-db-1 (66f846a87dfdd62fd18869360453f74141a3d26fa5700691b3f864ef5e4576c3): Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use

sudo lsof -i :5432
sudo kill -9 1094