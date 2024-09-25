# Sistema de Turmas e Atividades
### [Projetos, Aula07, 3DES, Senai2024](https://github.com/wellifabio/senai2024/tree/main/ds/3des/01-proj/aula07)

|<img src="./front/assets/icone.png" width="50px">|Tecnologia|Tarefa|
|:-:|-|-|
|[<img src="https://w7.pngwing.com/pngs/717/111/png-transparent-mysql-round-logo-tech-companies-thumbnail.png" style="width:50px;">](https://www.apachefriends.org/pt_br/index.html)|XAMPP|BD MySQL MariaDB
|[<img src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png" style="width:50px;">](https://nodejs.org/en)|**NodeJS**|API Back-End (Servidor)|
|[<img src="https://i.pinimg.com/originals/39/b2/e4/39b2e4ad77c23a2c11e5950a7dfa2aec.png" style="width:50px;">](https://www.prisma.io/)|Prisma|ORM BD MySQL|
|[<img src="https://logowik.com/content/uploads/images/visual-studio-code7642.jpg" style="width:50px;">](https://code.visualstudio.com/)|**VsCode**|IDE Back, Front|
|[<img src="https://cdn-icons-png.flaticon.com/512/919/919827.png" style="width:50px">](https://developer.mozilla.org/pt-BR/docs/Web/HTML)[<img src="https://cdn-icons-png.flaticon.com/512/919/919826.png" style="width:50px">](https://developer.mozilla.org/pt-BR/docs/Web/CSS)[<img src="https://cdn5.vectorstock.com/i/1000x1000/27/74/vanilla-javascript-language-vector-31602774.jpg" style="width:50px">](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)|HTML, CSS, **JS (Vanilla)**|Front-End|

- Aplicação WEB para gerenciamento de turmas e atividades.

## Para testar
1. Clone o repositório
2. Abra com o VsCode e abra um terminal **(Ctrl+")** CMD ou bash
3. Instale as dependências
```bash
npm install express cors @prisma/client bcrypt nodemon
```
4. Inicie o SGBD MySQL MariaDB
5. Na pasta **./api** crie o arquivo **.env** com o conteúdo:
```js
DATABASE_URL="mysql://root:@localhost:3306/escola"
```
```bash
npx prisma migrate dev --name init
```
6. Inicie o servidor
```bash
npx nodemon
```
7. Inicie o Front-End navegando até a pasta **front** e abrindo o arquivo **index.html** no navegador ou com Live Server do VsCode.

