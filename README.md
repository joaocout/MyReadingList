# MyReadingList

A proposta do aplicativo é prover uma forma de organizar uma lista de leitura, com possibilidade de buscar livros (utilizando a api do Google - _Google Books API_), e adicioná-los a sua estante pessoal.

O aplicativo permite reordenar os livros presentes na estante, e mudar seu estado ("Quero ler", "Estou lendo", "Já li").

O desenvolvimento foi feito utilizando **EXPO**, e testes foram feitos somente em **ANDROID**. Então, para executar, é necessário instalar o Expo Go no celular, e o _expo-cli_ no computador. Feito isso, na pasta do projeto, basta rodar `yarn install` (ou `npm install`) e `npx expo start`, e ler, utilizando o Expo Go, o QR Code exibido.

### Foram utilizados:

- _Redux-Toolkit_ para gerenciamento de estado global;
- _Typescript_;
- _AsyncStorage_ para persistir alguns dados localmente;

### Limitações / Melhorias / Próximos passos:

- O tratamento de erros é um pouco limitado.

- Gostaria de ter adicionado um modal para exibir mais detalhes sobre um livro (com descrição mais detalhada, dados da Editora, e gênero do livro).

- Uma adição interessante poderia ser a possibildade de criar múltiplas listas de leitura.

- Outra adição interessante poderia ser dar ao usuário a possibilidade de buscar por alguns critérios, como por autor, por exemplo (já que a API permite), e personalizar o número de resultados por página.

- Adicionar algumas animções e suporte a alguns gestos poderia tornar a experiência de usuário mais interessante, como por exemplo, utilizar gestos para reordenar os livros da estante, ou arrastar para excluir um livro, etc.
