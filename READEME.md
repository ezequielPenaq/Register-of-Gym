# App
GymPass style app.

## RFs( requisitos funcionais )

- [x] Deve ser possivel se cadastrar; 
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas;
- [x] Deve ser possivel buscas academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-ins numa academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia.



## RNs(regras de negocios)

- [x] o usuario não poderá se cadastrar com um email duplicado;
- [x] o usuario não pode fazer dois check-ins no mesmo dia;
- [x] o usuario não pode fazer check in se não estiver a 100M da academia;
- [x] o check-in só pode ser validado após 20min  após criado;
- [] o check-in só pode ser validado por admins;
- [] A academia só pode ser cadastrada por admins;


## RNFS(requisitos não funcionais )

-[x] A senha do usuario deve estar criptografada;
-[x] Os dados da aplicação precisam estar persistido em banco PostegreSQl;
-[x] Todas listas de dados precisam estar paginadas com 20 itens por paginas,
-[] O usuario deve ser identificado por um JWT( Json-Web-Token)