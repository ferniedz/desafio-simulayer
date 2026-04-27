# desafio-simulayer

O presente projeto foi desenvolvido para o desafio proposto pela empresa Virtwell para a seleção de um estagiário e consiste em um programa inspirado na plataforma Simulayer para criação de ambientes imersivos que usam IA conversacional, onde o usuário pode criar cenas, personagens e adicionar personagens a cenas.


- - - - - FERRAMENTAS UTILIZADAS - - - - -

-> BACKEND:

- Node.js;
- Express.js;
- PostgreSQL;
- Prisma ORM;
- CORS para comunicação entre backend e frontend.

-> FRONTEND:

- React;
- Vite;
- Axios para integração com a API;
- Tailwind CSS;
- React Router DOM.


- - - - - COMO RODAR - - - - -

-> BACKEND

1) Clone o repositório (git clone (URL)); 
2) Entre na pasta do backend (cd backend);
3) Instale as dependências do backend citadas acima (npm install);
4) Faça um arquivo .env com as seguintes * VARIÁVEIS DE AMBIENTE *: 

- DATABASE_URL: URL do banco de dados
- PORT=3000 (porta onde roda o backend)

5) Execute o seguinte comando para criar as tabelas no banco de dados: npx prisma migrate dev;
6) Inicie o servidor com node server.js ou npm run dev;
7) Deverá aparecer uma mensagem que diz "The server is online and running on port 3000" para confirmar que está rodando;
8) O backend estará rodando em "http://localhost:3000"

-> FRONTEND

1) Crie um terminal separado e entre na pasta do frontend (cd .. e depois cd frontend);
2) Instale as dependências do frontend citadas acima (npm install);
3) Inicie com npm run dev;
4) O frontend estará rodando em "http://localhost:5173"

* OBS. 1: Rode o backend e o frontend simultaneamente e verifique se o banco de dados está ligado, ou seja, se não ficou inativo com o tempo.
** OBS. 2: Se a porta 5173 estiver ocupada, é possível que o frontend rode na porta 5174;


 - - - - - ENDPOINTS DA  API - - - - -
 
1) Criar uma cena: POST /scenes
2) Listar todas as cenas: GET /scenes
3) Lista uma cena com seus personagens: GET /scenes/:id
4) Deletar uma cena: DELETE /scenes/:id
4) Adicionar ou remover personagem de uma cena: POST /scenes/:idDaCena/characters (sendo as ações de adicionar ou remover um personagens diferenciadas no backend pelas actions "add" e "remove", respectivamente)
5) Criar personagem: POST /characters
6) Listar todos os personagens GET /characters (vide decisões técnicas item 8)
7) Listar um personagem por id: GET /characters/:id
8) Editar o nome e/ou prompt de personalidade de um personagem: PATCH /characters/:id (vide decisões técnicas item 9)
9) Deletar um personagem: DELETE /characters/:id


 - - - - - DECISÕES TÉCNICAS - - - - -

1) Backend estruturado em:

node modules, prisma (que contém migrations que contém o schema.prisma), src (que contém controllers, lib, middleware, routes e validators), .env, gitignore, package-lock.json.js, package.json.js, prisma.config.ts e server.js

2) Frontend estruturado em:

node modules, public (favicon.svg e icons.svg), src (que contém os assets, components, hooks, pages, services e styles), App.jsx, index.css, main.jsx, .gitignore, eslint.config.js, index.html, package-lock.json.js, package.json.js, postcss.config.js, README.md, tailwind.config.js e vite.config.js

3) Demais arquivos: .gitignore e README.md

4) Os comandos do tailwind foram guardados em variáveis dentro de um objeto importado para outras pastas para melhorar a visualização e a organização do código;

5) O programa faz a diferenciação entre remover um personagem de uma cena e deletá-lo do banco de dados, sendo possível remover um personagem de uma cena sem que isso implique deletá-lo do banco de dados. Por isso, a configuração de modelo onDelete: Cascade foi usada no modelo de SceneCharacter. Para remover um personagem de uma cena, no frontend, clique na cena e depois no botão "Remove this character from this scene" que aparece ao lado do personagem. Para deletá-lo do banco de dados, clique no botão "Delete character from database" que aparece na Home e depois no botão "Delete this character" que aparece embaixo de cada personagem, depois confirem a ação. Fazendo isso, o personagem será também deletado de todas as cenas em que estava.

6) Da mesma forma, é possível deletar uma cena sem que isso implique deletar seus personagens do banco de dados. Para deletar uma cena, no frontend, clique no botão "Details" que aparece embaixo da cena que se deseja deletar, rola até o fim da página e clique em "Delete scene", depois confirme a ação.

7) Há configurações do código que demonstram preocupação com escalabilidade, como a paginação na listagem de cenas, e também com boas práticas, como os commits e a organização do código.

8) GET /characters: endpoint NÃO solicitado pelo desafio, mas que foi feito para auxiliar na construção do formulário para adicionar personagem à cena, então foi implementado.

9) PATCH /characters/:id: Notei que nem toda a API é consumida no frontend, por exemplo, não há solicitação de desenvolver um formulário para editar o nome e/ou a personalidade de nenhum personagem, então eu não implementei isso para não deixar o código desnecessariamente complexo, já que não é expressamente solicitado pelo desafio, nem citado como um requisito obrigatório, então deixei apenas no backend.

10) Coloquei os textos do programa em inglês (textos de botões, mensagens de erro, coisas assim) porque pensei ser um padrão.


 - - - - - DIFERENCIAIS SOLICITADOS - - - - -

O programa implementa os seguintes diferenciais solicitados no desafio: 

- Interface polida e responsiva;
- Paginação na listagem de cenas e na lsitagem de personagens;
- README com decisões técnicas;
- Commits com mensagens claras.