# Documentação da API Baas

## Introdução

Este repositório oferece um exemplo prático de como implementar um serviço de backend utilizando Nest.js em conjunto com PostgreSQL. Este projeto foi desenvolvido para demonstrar as melhores práticas de arquitetura e desenvolvimento.

## Instruções de Instalação

Para instalar e configurar a API Baas em seu ambiente local, siga estas etapas:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone o repositório da API Baas:

```sh
git clone https://seurepositorio.com/api-baas.git

```

3. Navegue até o diretório do projeto:

4. Instale as dependências do projeto:

5. Após a instalação das dependências, você estará pronto para iniciar a API Baas localmente.
- Iniciar o Projeto em Modo de Produção:
```sh
npm start
```

Este comando inicia a aplicação em modo de produção.

- Iniciar o Projeto em Modo de Desenvolvimento com Observação de Alterações:

```sh
npm run start:dev
```

Este comando inicia a aplicação em modo de desenvolvimento com observação de alterações no código. Qualquer alteração no código resultará em uma reinicialização automática do servidor.

- Iniciar o Projeto em Modo de Depuração com Observação de Alterações:

```sh
npm run start:debug
```

Este comando inicia a aplicação em modo de depuração com observação de alterações no código. Ele permite que você depure seu código enquanto observa alterações no mesmo.

- Iniciar o Projeto em Modo de Produção a partir dos Arquivos Compilados:

```sh
npm run start:prod
```

Este comando inicia a aplicação em modo de produção a partir dos arquivos compilados. É útil quando você deseja executar a aplicação em um ambiente de produção sem a necessidade de recompilar o código.

- Executar Testes:

```sh
npm test
```

Este comando executa os testes usando o Jest. Ele procurará por arquivos de teste nos diretórios test e __tests__ e os executará.

- Executar Testes em Modo de Observação:

```sh
npm run test:watch
```

Este comando executa os testes em modo de observação. Ele continuará observando por alterações nos arquivos de teste e no código fonte, reexecutando os testes sempre que uma mudança for detectada.

- Executar Testes com Relatório de Cobertura:

```sh
npm run test:cov
```

Este comando executa os testes com relatório de cobertura usando o Jest. Ele fornecerá informações detalhadas sobre a cobertura de código durante a execução dos testes.

- Executar Linting no Código TypeScript:

```sh
npm run lint
```

Este comando executa a verificação de linting no código TypeScript usando o ESLint. Ele tentará corrigir automaticamente os problemas de lint encontrados.

## Scripts

A API Baas inclui os seguintes scripts npm para facilitar o desenvolvimento e o teste:


## Descrição

A API Baas oferece endpoints para manipulação de contas, endereços e transações financeiras. Abaixo está a descrição dos principais recursos oferecidos pela API:

### Contas (Accounts)

Os endpoints relacionados a contas permitem aos usuários:

- Listar todas as contas
- Criar uma nova conta
- Obter os detalhes de uma conta específica
- Atualizar uma conta existente
- Remover uma conta existente

### Endereços (Address)

Os endpoints relacionados a endereços permitem aos usuários:

- Criar um novo endereço
- Obter os detalhes de um endereço específico

### Transações Financeiras (Financial Transactions)

Os endpoints relacionados a transações financeiras permitem aos usuários:

- Obter uma lista de transações financeiras de uma conta específica

## Recursos

A API Baas oferece os seguintes recursos:

- **Company**: Representa uma empresa associada a uma conta.
- **Address**: Representa um endereço.
- **Account**: Representa uma conta.
- **SubAccount**: Representa uma conta subsidiária.
- **FinancialTransaction**: Representa uma transação financeira.

## Documentação Detalhada

Para obter informações detalhadas sobre os endpoints, parâmetros, códigos de resposta e modelos de dados, consulte a documentação OpenAPI fornecida abaixo.

[Documentação OpenAPI](swagger.json)
