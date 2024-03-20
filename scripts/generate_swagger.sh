#!/bin/bash

# Função para iniciar o Docker
start_docker() {
    echo "Iniciando o docker..."
    docker-compose up -d
}

# Função para encerrar o Docker
end_docker() {
    echo "Encerrando o docker..."
    docker-compose down
}

# Função para iniciar a aplicação
start_app() {
    echo "Iniciando a aplicação..."
    npm start &
    APP_PID=$!
}

# Função para encerrar a aplicação
end_app() {
    echo "Encerrando a aplicação..."
    kill $APP_PID  # Encerra o processo da aplicação
}

# Função para verificar se a aplicação está em execução
is_app_running() {
    if ps -p $APP_PID > /dev/null; then
        return 0  # Processo está em execução
    else
        return 1  # Processo não está em execução
    fi
}

# Iniciar o Docker e a aplicação
start_docker
start_app

# Aguardar um pouco para garantir que a aplicação esteja em execução
sleep 10

# Gerar o Swagger JSON
echo "Gerando o Swagger JSON..."
curl -o swagger.json http://localhost:3000/api-json

# Verificar se a aplicação está em execução e encerrar, se necessário
if is_app_running; then
    end_app
fi

# Encerrar o Docker
end_docker
