#!/bin/bash

# Aguardar a aplicação estar pronta
sleep 10

# Gerar o Swagger JSON
echo "Gerando o Swagger JSON..."
curl -o swagger.json http://localhost:3000/api-json

# Encerrar a aplicação
echo "Encerrando a aplicação..."
pkill -f "nest start"
