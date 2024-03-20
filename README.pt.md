<style>
    .title {
        text-decoration:none; 
        border: none;
        padding: 0;
        margin: 0;
        margin-top: 5px;
    }
    
    .subtitle {
        text-decoration:none; 
        border: none;
        padding: 0;
        margin: 0;
        margin-top: 5px;
    }
    
    .nota-rodape {
        text-align: "justify";
        text-transform: "bold";
        font-size: 11px;
        font-weight: "italic";
    }
    
    h2 {
        border: none;
    }
</style>

<h1 class="title">Documentação da API Baas</h1>
<h2 class="subtitle"><i>API Portifólio - NestJs + Postgresql</i></h2>

![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)

<h2>Sumário</h2>
<ul>
    <li><a href="#principal_introduction">Introdução</a></li>
    <li><a href="#nestjs_introduction">Introdução ao NestJs</a></li>
    <li><a href="#instalation">Instruções de Instalação</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#app_description">Descrição da aplicação</a></li>
     

</ul>

<div>

<h2 id="principal_introduction">Introdução</h2>
<p>Este repositório oferece um exemplo prático de como implementar um serviço de backend utilizando Nest.js em conjunto com PostgreSQL e possui diversos arquivos README.md com explicações adicionais para proporcionar dicas e entendimento ao desenvolvedor que deseja aprender Nest.js. O compromisso desse repositório é buscar demonstrar as melhores práticas de arquitetura e desenvolvimento com um projeto "real"</p>

<p>Esse repositório faz parte de uma série de vídeos explicativos que tem a intenção de mostrar a um programador iniciante frontend uma aplicação do mundo real</p>

<p>em breve link com os vídeos...</p>
</div>

<div>
<h2 a="nestjs_introduction">Introdução ao NestJS</h2>

<p>
Nest (NestJS) é um framework para construção de aplicações eficientes e escaláveis no lado do servidor utilizando Node.js. Ele utiliza JavaScript progressivo, é construído com e totalmente compatível com TypeScript (ainda permitindo que desenvolvedores codifiquem em JavaScrip puro) e combina elementos de POO 1(Programação Orientada a Objetos), PF 2(Programação Funcional) e PFR 3(Programação Funcional Reativa).
</p>

<p class="nota-rodape">1. OOP (Programação Orientada a Objetos): Imagine que você está construindo uma casa com Lego. Cada
peça de Lego é como um objeto que tem suas próprias características (como cor e formato) e funções específicas (como se encaixar com outras peças). Na OOP, você organiza seu código pensando em objetos, que são como pequenos "pacotes" que contêm tanto dados quanto ações relacionadas a esses dados. Por exemplo, você pode ter um objeto "Carro" com características como cor e velocidade, e ações como "acelerar" e "frear" </p>

<p class="nota-rodape">2. FP (Programação Funcional): Agora, pense em matemática. Na matemática, você trabalha com funções que aceitam entradas, realizam algum tipo de operação nelas e produzem uma saída. A programação funcional é semelhante. Você trata suas operações como funções puras, que não alteram dados externos e sempre retornam o mesmo resultado para as mesmas entradas. É como uma receita de bolo: você mistura ingredientes (entradas), os processa de acordo com a receita (função) e obtém um bolo (saída), sempre com o mesmo resultado se seguir os passos corretamente. </p>

<p class="nota-rodape">3. FRP (Programação Funcional Reativa): Agora, vamos adicionar um toque de "tempo real" à equação. Imagine que você está assistindo a um jogo de futebol na TV. Enquanto assiste, você reage aos eventos que acontecem, como um gol marcado ou uma falta cometida. Na programação funcional reativa, você escreve seu código de forma a reagir automaticamente a mudanças de estado ou eventos. É como ter um sistema que observa continuamente o que está acontecendo e executa ações com base nisso, sem que você precise dizer explicitamente o que fazer a cada momento. </p>

<p>
Nest fornece uma arquitetura de aplicação pronta que permite aos desenvolvedores e equipes criarem aplicações altamente testáveis, escaláveis, fracamente acopladas e alta manutenibilidade
</p>


</div>

<h2 id="instalation"> Instruções de Instalação</h2>

Para instalar e configurar a API Baas em seu ambiente local, siga estas etapas:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone o repositório da API Baas:

```sh
git clone https://seurepositorio.com/api-baas.git

```

3. Navegue até o diretório do projeto:

4. Instale as dependências do projeto:

5. Após a instalação das dependências, você estará pronto para iniciar a API Baas localmente.

<h2 id="scripts">Scripts</h2>

A API Baas inclui os seguintes scripts npm para facilitar o desenvolvimento e o teste:

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

<h2 id="app_description">Descrição da aplicação</h2>

A API Baas oferece endpoints para manipulação de contas, endereços e transações financeiras. Abaixo está a descrição dos principais recursos oferecidos pela API:

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
