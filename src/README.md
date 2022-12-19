## Run
Run message server first:
- Have an elasticsearch node running
  - https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html
- Run npm i
- node src/index.js
Run user service:
- Have a PostgreSQL server running create a database called chat-app
- Run npm i
- node src/index.js
Run chat server:
- Run npm i
- node index.js
Run ReactJS client (frontend):
- Run npm i
- npm start