<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Node version recomendada: 18.12.0

O servidor roda na porta: http://localhost:3000/

Link para o swagger: http://localhost:3000/docs/

- Crie uma conexão local no banco e crie uma base de dados chamada 'db-mercado' 
- crie um arquivo .env seguindo o .env.example e substitua pelas credenciais do seu banco local
  
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Após rodar teste se as tabelas foram criadas na sua conexão no banco

## Descrição

Foi desenvolvida uma API para gerenciamento de usuários e produtos. Durante a implementação, foram identificadas oportunidades de melhoria, correções de bugs e a necessidade de novas implementações.


## Tarefas -- Usuario

- Teste algumas rotas para se familiarizar com o projeto e entender seu padrão de funcionamento, leve em consideração que há um exemplo de tudo a ser feito dentro do projeto.
- No arquivo *usuario.service.ts*, dentro da pasta de usuário, existe um método chamado listarUsuariosPorNome. No entanto, este método não possui uma rota correspondente no arquivo *usuario.controller.ts*. Implemente uma rota para acessar este método. DICA: Use como base a rota buscarUsuarioId e listarUsuarios.
- No método criarUsuario dentro da service, desejo que o usuário só possa inserir uma senha com mais de 6 dígitos e menos de 11 dígitos, contendo pelo menos um número e uma letra maiúscula. Além disso, não quero que seja possível adicionar um usuário com um email que já exista na base de dados. Ao finalizar com sucesso, desejo que retorne a mensagem "Usuário criado com sucesso".
- No método listarUsuarios, se não existir nenhum usuário cadastrado na base, desejo que retorne um erro 404 (NotFoundException) com a seguinte mensagem: 'Nenhum usuário cadastrado na base'.
- No método atualizarUsuario, desejo que seja possível encontrar o usuário pelo ID enviado na rota. Se o usuário não for encontrado, deve ser retornado um erro 404 com a mensagem 'Usuário não encontrado'. Além disso, as linhas comentadas nesse método devem ser descomentadas. A mesma regra da criação do usuário deve ser aplicada, ou seja, não deve ser aceito um email já existente na base. Caso seja bem-sucedido, gostaria que fosse retornado a mensagem 'Usuário editado com sucesso'.
- No método deletarUsuario, há um bug que, em um caso, retorna erro 500 da API. Desejo que seja identificado e corrigido

  ## Tarefas -- Produto
Tarefas serão realizadas na pasta produto na *produto.controller.ts* e na *produto.service.ts*
*Levar em conta que categorias já estão cadastradas na base com IDs correspondentes:*
1	Eletrônicos
2	Roupas
3	Livros
4	Alimentos

- Criar uma rota para listar todos os produtos da base ordenados pelo nome.
- Criar uma rota para buscar um produto por id
- Criar uma rota para cadastrar um produto, não pode ser cadastrado produtos com nomes iguais.
- Criar uma rota para deletar produto
- Criar uma rota para atualizar produto
- Criar uma rota que retorne produtos sem estoque
- No método totalProdutos, desejo que retorne o número total de produtos existentes na base de dados, ao invés de um número fixo.
- Existe uma rota e um método chamado listarProdutosCategoria, mas ainda não há implementação. Utilizando o response ListarProdutosCategoriaResponse, gostaria que fossem retornados os produtos por categoria.
