# Dispendium

Aplicativo para registro de despesas.

## Dependências

* Node.js v9.1
* npm v6.4
* Ionic v4.1
* Cordova v8.0
* Android SDK
* Gradle v4.4
* Java v8

## Instalação

1. Clone este repositório: `git clone git@github.com:nrmm/Dispendium.git`
1. Instale o *ionic* e o *Cordova CLI*: `npm install -g ionic cordova`
1. Instale as dependências do Node.js via npm: `cd Dispendium; npm install`
1. Crie as variáveis de ambiente *JAVA_HOME*, *ANDROID_HOME* e *GRADLE_HOME*.
   Essas variáveis devem apontar, respectivamente, para o diretório de
   instalação do *Java*, do *Android SDK* e do *Gradle*
1. Certifique-se de colocar na variável *PATH* o caminho para os binários do
   *Gradle* e do *Java*; o script `gradle` precisa de permissão de execução.

## Executar o projeto

Há 2 formas de se executar o projeto: em um navegador ou em um dispositivo
móvel.

Para executá-lo em um navegador: `ionic serve`.

Num dispositivo móvel: `ionic cordova run android --verbose`, considerando que
se queira executar o aplicativo em um sistema **Android**; no **ios**: 
`ionic cordova run ios --verbose`.
