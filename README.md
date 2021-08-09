# **iClinicChallenge**

## **Introdução**
Esse projeto é referente ao desafio da iClinic.

O [desafio](https://github.com/iclinic/iclinic-mobile-challenge) consiste em implementar um aplicativo em React Native para cadastrar prescrições médicas, mediante a um login na aplicação.


- [Configuração do ambiente](#configuração-do-ambiente)
- [Versão do React e React Native](#versão-do-react-e-react-native)
- [Instalação do aplicativo](#instalação-do-aplicativo)
- [Executar o aplicativo](#executar-o-aplicativo)



## **Configuração do ambiente**

Você precisará instalar e configurar as ferramentas que recomendamos abaixo.

| Interpretador | Gerenciador de pacote | IDE                | Android        | iOS       |
| ------------- | --------------------- | ------------------ | -------------- | --------- |
| Node JS       | NPM ou Yarn           | Visual Studio Code | Android Studio | XCode     |
| --            | --                    | --                 | JDK            | CocoaPods |

- [React Native - Instruções para configurar seu ambiente para desenvolvimento](https://reactnative.dev/docs/environment-setup)

- [Visual Studio Code - Licença grátis para download](https://code.visualstudio.com/?wt.mc_id=vscom_downloads)


## **Versão do React e React Native utilizado**

| React  | React Native |
| ------ | ------------ |
| 17.0.2 | 0.64.1       |

## **Instalação do aplicativo**

1) Faça o clone do projeto: 

``` sh
git clone https://github.com/NoahBergamoDev/iClinicChallenge.git 
```


2) Exclua os seguintes arquivos e pastas: 
``` 
node_modules/
package.lock
ios/Pods
ios/Podfile.lock
 ```

3) Para instalar os pacotes e dependências do React Native e fazer a instalação dos pods no projeto iOS, execute o seguinte comando no terminal dentro da raíz do projeto:
```sh
yarn setup-project-yarn
```
ou

```
npm run setup-project-npm
```

## **Executar o aplicativo**

- Build no Android
  - Abra o Android Studio e configure seu dispositivo virtual (Emulador)
  - Com o emulador configurado, execute o seguinte comando:

```sh
    yarn android
```
ou
```sh
    npm run android
```

> Você só vai precisar abrir o emulador Android antes de executar os comandos na primeira vez. Aí esse passo você pode fazer pelo Android Studio clicando no icone `AVD Manager` na barra superior de ferramentas. Ao clicar, uma janela será aberta, instale o emulador recomendado e depois clique no botão de `PLAY`.


- Build no iOS
  - Execute o seguinte comando:

```sh
    yarn ios
```
ou
```sh
    npm run ios
```
- Caso queria executar o app em um modelo de emulador específico, é só utilizar o sufixo 
```
--simulator="nome do simulador" 
``` 
por exemplo:
```
yarn ios --simulator="iPhone SE (1st generation)" 
```
ou
```
npm run ios --simulator="iPhone SE (1st generation)" 
```
