#!/bin/bash

# Função para iniciar o Docker
start_docker() {
    echo "Iniciando o docker..."
    docker compose up -d
}

# Função para encerrar o Docker
end_docker() {
    echo "Encerrando o docker..."
    docker compose down
}

# Função para iniciar a aplicação
start_app() {
    echo "Iniciando a aplicação..."
    npm start &
    PID=$!
}

# Função para abrir um novo terminal e executar o script para gerar o Swagger JSON
generate_swagger() {
    echo "Abrindo um novo terminal para gerar o Swagger JSON..."
    gnome-terminal -- bash -c 'sleep 10; curl -o swagger.json http://localhost:3000/api-json; sleep 5; kill -9 $PID; exit'
    end_app
}

# Função para encerrar a aplicação
end_app() {
    echo "Encerrando a aplicação..."
    kill $PID  # Encerra o processo da aplicação
}

# Iniciar o Docker, a aplicação, abrir um novo terminal para gerar o Swagger JSON e encerrar o Docker
start_docker
start_app
generate_swagger
end_docker