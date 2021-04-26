## 🪴 Plantmanager
![cover](capa.png?style=flat)

Aplicativo para lhe ajudar a lembrar de cuidar de suas plantas de forma fácil de acordo com cada tipo de plantinha.


## User Stories
O João ganhou um vaso de flor e não sabe qual é o melhor lugar da casa para colocar/decorar. 
João se questinou: será que essa platinha prefere ambiente externo? Sombra? Qual será a frequência ideal para regá-la? 


Além do mais, essa pessoa tem uma rotina bem agitada, então que tal ajudá-la a lembrar de regar a plantinha na frequência correta? 
Ou seja, o App ajuda o João a cuidar com carinho das platinhas que ele tem na sua casa. :heart:


## Features 

-   [ ] Salva a identificação do usuário no próprio dispositivo o usuário;
-   [ ] Consome de API os dados e características de cada planta;
-   [ ] Salva localmente a planta que o usuário possue;
-   [ ] Lembra o usuário quando regar e cuidar da plantinha de acordo com a frequência ideial das plantas que o usuário possui;


## Tecnologias 

-   [ ] React Native
-   [ ] Typescript
-   [ ] Expo
-   [ ] Expo Local Notifications
-   [ ] Async Storage
-   [ ] Vector Icons
-   [ ] Axios
-   [ ] Date Fns
-   [ ] Lottie
-   [ ] Expo Google Fonts
-   [ ] React Navigation Stack e Bottom Tabs
-   [ ] React Native Gesture Handler
-   [ ] Json Server


## Executando o projeto

Utilize o **yarn** ou o **npm install** para instalar as depedências do projeto.
Em seguida, inicie o projeto e a API fake com o Json Server.

```cl
expo start
json-server ./src/services/server.json --host 192.168.1.4 --port 3333 --delay 700
```

 Substitua o host pelo seu endereço IP local. Faça o mesmo no arquivo API dentro de services.
 
 
 ```ts
 import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.4:3333',
});

export default api;
```



<div align="center">
  <small>Desenvolvido por Rodrigo Gonçalves Santana - 2021</small>
</div>