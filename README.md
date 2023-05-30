<h1 align="center">
   Desafio fullstack
</h1>

## **Inicializando o projeto**

```
npm init
```

Após a inicialização, preencher as informações da variavel de ambiente e gerar as migrações

```
npm run typeorm migration:generate src/migrations/Initial -- -d src/data-source.ts
npm run typeorm migration:run -- -d src/data-source.ts
```

Para rodar o servidor:

```
npm run dev
```

## **Rota para a documentação da API**

```
http://localhost:3000/api-docs/
```
