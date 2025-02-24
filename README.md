<h2>TODO For You</h2>
Back-end para uma aplicação de lista de afazeres. 
Para iniciar o ambiente de desenvolvimento, crie um banco de dados PostgreSQL. Em seguida, crie um arquivo .env na raiz no projeto, seguindo o exemplo do arquivo .env.example. <br/>
Nesse arquivo informe:

<ul>
  <li>SECRET: A chave utilizada para geração de tokens JWT para autenticação dos usuários</li>
  <li>DATABASE_URL: A url para acessar o banco de dados, se for local, deve seguir o padrão 'postgresql://postgres:(SENHA DO BANCO)@(IP DO BANCO, localhost SE LOCAL):(PORTA DO ENDEREÇO DO BANCO)/(NOME DO BANCO)'</li>
  <li>NODE_ENV: Informar 'production' para inciar em ambiente de produção, ou 'development' para ambiente de desenvolvimento</li>
  <li>PORT: Porta que a aplicação usará</li>
</ul>

Com tudo pronto, utilize o comando "npm run migrate:up" para aplicar as migrações do diretório /migrations no banco de dados, criando a tabela de usuários e, em seguida, de tarefas. <br/>
Para iniciar a aplicação, utilize o comando "npm start", ou utilize "npm run swagger" para visualizar a documentação da API.
