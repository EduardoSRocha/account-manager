## run docker compose
docker compose up

## run docker compose and use terminal
docker compose up -d

## run logs of docker compose
docker compose logs

## kill docker compose proccess
docker compose down

## Run docker sem SUDO [🐧Linux]
```sh
# Obtém o nome do usuário atual
ME=$(whoami)

# Adiciona o usuário ao grupo docker
sudo usermod -aG docker $ME
```

# Erro address already in use
```sh
Error response from daemon: driver failed programming external connectivity on endpoint nestjs-class-db-1 (66f846a87dfdd62fd18869360453f74141a3d26fa5700691b3f864ef5e4576c3): Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use
```

```sh
sudo lsof -i :5432
```
Anote o PID e substitua no comando abaixo:

```sh
sudo kill -9 $PID
```