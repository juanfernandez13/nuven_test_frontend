<h1 align="center">
   Desenvolvimento de uma lista de tarefas 
</h1>


![Linguagem](https://img.shields.io/github/languages/top/juanfernandez13/nuven_test_frontend?color=yellow&style=for-the-badge)
![Tamanho](https://img.shields.io/github/languages/code-size/juanfernandez13/nuven_test_frontend?color=yellow&style=for-the-badge)
![última atualização](https://img.shields.io/github/last-commit/juanfernandez13/nuven_test_frontend?color=yellow&style=for-the-badge)

## Sobre o projeto :man_technologist:
O projeto consiste na criação de uma interface integrada ao banco de dados para realizar um CRUD de tarefas.

<h2>
  Tecnologias
</h2>
 - ReactJS
 - NextJS
 - Tailwind
 - MUI
 - PostgresSQL
 - Prisma ORM
 - Docker
 - Viteste

 ## Como inicializar?
 Primeiro você deve ter o Yarn instalado em sua máquina, caso não tenha execute o seguinte comando ``npm install -g yarn``.

 Configure 2 arquivos, o ``.env`` e o ``.env.test``, onde serão armazenadas a URL do banco de dados e o banco de teste. Vou deixar as URLs aqui só para facilitar.

 No arquivo ``.env`` coloque a seguinte chave: ``` DATABASE_URL="postgresql://postgres:root@localhost:5432/postgres?schema=public" ```

 Já no ``.env.test`` coloque ``DATABASE_URL="postgresql://postgres:root@localhost:5433/postgres?schema=public"``

 Execute ``yarn`` no terminal para instalar as dependências do projeto.

 Após isso, você precisar ter o docker instalado e configurado em sua máquina. A partir disso é possível executar alguns scripts configurados no package.json.

 Então execute o comando ``yarn docker:db`` para inicializar o banco de dados no docker, com a inicialização podemos rodar nossas migrations, então execute ```yarn prisma migrate dev``

Com isso seu projeto já estará pronto para ser executado. Então execute o comando ``yarn dev``. Assim a Api e o Site já estão disponíveis, visto que foi tudo realizado com NextJS.

Acesse http://localhost:3000 para integir com a aplicação.

## Rotas 🚩
| Métodos |    Rotas     |               Descrição               |
| ------- | :----------: | :-----------------------------------: |
| GET     |   /api/list    |   Retorna todas as tarefas cadastradas |
| GET     | /api/list/id   |   Retorna a tarefa especificado por id   |
| POST    |   /api/list   |     Cria uma nova tarefa |
| POST    |   /api/list   |     Se houver no corpo o campo ``textSearch`` retorna as tarefas que contenham o ``textSearch`` no título ou descrição |
| PUT   | /api/list/id | Atualiza uma tarefa identificado por id |
| DELETE  | /api/list/id |  Deleta uma tarefa especificado por id  |

## Como realizar os testes
Para realizar os testes você pode executar o script ``yarn test`` onde será inicializado um banco independente só para a realização do teste. Após essa inicialização ele executará as migrations e realizar os testes da pasta ``tests`` e por fim ele elimina o banco de dados independente.
Caso você queira ver a cobertura desses testes é possível executar ``yarn coverage`` e vizualizar o arquivo ``ìndex.html`` criado na pasta coverage.