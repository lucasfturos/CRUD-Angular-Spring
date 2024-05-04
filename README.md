# CRUD em Angular e Spring

Repositório focado nas aulas da Loiane, onde ela ensinou a usar o Angular e o Spring em conjunto.

## Requisitos

Java 17
Maven >= (3.8.7)
npm >= (10.5.2)
Angular 17
MySQL >= (8.0.37)

## Executando o Servidor

### Angular

Entre na pasta do Angular:
```
cd crud-angular
```
E rode o comando para executar o serviço:
```
npm run start
```

Ou ```ng serve``` caso não precise usar o arquivo __proxy.conf.js__

### Spring

Entre na pasta do Spring:
```
cd crud-spring
```

**AVISO**: Antes de executar o servidor é necessário configurar as variáveis de ambiente, para isso, basta copiar o arquivo .env-example e mudar seu nome para .env e fazer as alterações dentro da pasta. Coloque os dados do banco de dados MySQL, informe o localhost, porta, nome do banco, seu usuário e senha.

Após configurar o arquivo .env, rode o comando para executar o serviço:
```
mvn spring-boot:run
```

## Referências

[CRUD Angular + Spring - loiane.training](https://loiane.training/curso/crud-angular-spring)