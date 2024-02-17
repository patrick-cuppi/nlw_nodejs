## Sistema de enquetes de votação em real time desenvolvido durante a NLW da Rocketseat em fevereiro de 2024.

O projeto utiliza *websockets* para monitorar o resultado em tempo real da enquete. Utiliza PostgreSQL como Banco de dados e Redis para armazenar os votos.

Para utilizar o projeto você precisa ter o Node.js instalado na sua maquina. Feito a instalação iremos começar o projeto, rodando o comando: **npm init -y** e assim criaremos um arquivo **package.json**.

Agora é necessário instalar o TypeScript, rodando o seguinte comando: **npm install typescript @types/node -D**. O @types/node e necessário para integrar o TypeScript com o Node.js.

Para iniciarmos, precisamos rodar **npx tsc —init** e ele irá criar um arquivo **tsconfig.json**. Dentro desse arquivo, precisamos atualizar alguns parâmetros. Para trocarmos esses parâmetros é necessário ir no repositório de TypeScript da Microsoft e procurar por Target Mapping e substituir os parâmetros informados de acordo com a versão do Node que você possui instalado.

Como o Node não suporta TypeScript, precisamos instalar  uma biblioteca  para converter o TypeScript em Javascript, rodando o seguinte comando: **npm install tsx -D** para instalar como dependência de desenvolvimento. Após isso precisamos ir no arquivo package.json e criar o seguinte script :**“dev” : “tsx watch {e aqui o caminho de onde vai estar o arquivo server do projeto. Ex: src/http/server.ts}”**. Para testar se esta rodando, é só rodar o comando: **npm run dev**.

Para criarmos o servidor HTTP, iremos utilizar o fastify, rodando o seguinte comando: **npm install fastify**. Apos isso importamos ele dentro do arquivo **server.ts** para construir a aplicação.

Um dos banco de dados que iremos utilizar é o PostgreSQL. Para isso,  iremos utilizar no projeto o Docker e o conceito de contêiner, então precisaremos instalar o Docker.  Feito a instalação ou caso já tenho ele instalado, precisamos roda o seguinte comando: **docker ps** para ver se há contêiner em uso. Feito isso, é necessário a configuração do PostgreSQL e do Redis que estão no arquivo **docker-compose.yml**. Apos copiar os dados, rode o seguinte comando: **docker compose up -d**, e se você rodar o **docker ps** ele ira listar os dois bancos para você. Você também pode rodar **docker logs + Id do contêiner** e ele irá mostrar os dados do contêiner e se ele esta pronto para uso.

Para a construção do banco de dados, iremos utilizar um ORM, que no caso será o Prisma. Para isso, iremos instalá-lo como uma ferramenta de desenvolvimento, rodando o seguinte comando no terminal: **npm install -D prisma**, e após isso **npx prisma init** e ele ja irá criar alguns arquivos. Dentro do arquivo **.env**, será necessários trocar senha e usuário e nome do banco que esta no arquivo **docker-compose.yml**. Se você estiver utilizando o vscode, é necessário a instalação da extensão do Prisma nele.

Dentro do arquivo schema.prisma iremos inserir os campos da tabela. Feito isso, iremos rodar o comando para criação da tabela dentro do banco de dados, que é: **npx prisma migrate dev**. Se você quiser conferir a criação da tabela sem precisar baixar o PostgreSQL em sua maquina, você pode rodar o seguinte comando: **npx prisma studio**.

Para acompanhar se a rota estava funcionando, eu utilizei o *Postman* como client HTTP.

Para definirmos quais serão os elementos necessários no body da requisição, utilizaremos a biblioteca zod, instalando com o seguinte comando: **npm install zod** e importando para o o arquivo **server.ts**.

Após modificarmos o arquivo de roteamento e fazer as importações e exportações, adicionaremos uma tabela de options na tabela de Create poll para relação de 1ˆN. Feito isso, rodamos novamente o código **npx prisma migrate dev** para criação da migration dentro do PostgreSQL.

Para criação do arquivo vote-on-Poll.ts, além de precisar usar o randomUUID do Node.js, precisaremos instalar o modulo Cookie do fastify, rodando o comando no terminal: **npm install @fastify/cookie**.

Na criação de rota para os votos, após criarmos a tabela no banco de dados e fazermos as referências entre as tabelas, precisamos rodar novamente o comando npx prisma migrate dev.

Vamos precisar também utilizar o Redis para criar um cache da votação. Para isso vamos instalar o ioredis, que é uma biblioteca do Redis feita para minupulação dentro do Node. Para isso vamos rodar o seguinte comando: **npm install ioredis**.

Depois de conectar ao Redis e criar o modelo de store, precisamos instalar o fastify websocket, rodando o seguinte comando: **npm install @fastify/websocket**.

Após isso, o projeto estará pronto e funcionando.