## Associação Revivendo — Site Institucional SPA

Projeto acadêmico de desenvolvimento web para apresentação institucional da Associação Revivendo

## Objetivo

Construir uma interface responsiva e acessível utilizando HTML5, CSS3 e JavaScript puro, aplicando navegação SPA, manipulação do DOM, tratamento de eventos, validação de formulários e armazenamento local.

## Tecnologias

- **HTML5:** estrutura semântica, formulários e templates das páginas.
- **CSS3:** identidade visual, responsividade, estados de foco e hover.
- **JavaScript (Vanilla JS):** navegação SPA, eventos, validação e feedback.
- **Web Storage API (`localStorage`):** persistência da última rota e do rascunho do cadastro.

Não é necessário instalar dependências NPM nem carregar bibliotecas por CDN.

## Estrutura do projeto

```text
site/
├── index.html          # Documento único com as cinco páginas em <template>
├── css/
│   └── style.css       # Estilos e responsividade
├── js/
│   ├── script.js       # Roteamento e renderização SPA
│   └── feedback.js     # Cadastro, validação, eventos e armazenamento
├── img/                # Imagens e identidade visual
└── README.md           # Documentação
```

## Páginas da aplicação

A aplicação usa **um único `index.html`** e apresenta cinco páginas virtuais por meio das rotas:

| Seção | Rota |
| --- | --- |
| Início | `#inicio` |
| O Instituto | `#instituto` |
| Projetos | `#projetos` |
| Cadastro | `#cadastro` |
| Contato | `#contato` |

Cada seção está em um `<template>` HTML. O roteador, em `js/script.js`, localiza o template, clona seu conteúdo com `cloneNode(true)` e substitui a área `#app` usando `replaceChildren()`. A mudança de rota usa o hash da URL e o evento `hashchange`, sem recarregar o documento.

## Como executar

1. Extraia o arquivo ZIP do projeto.
2. Abra a pasta `site`.
3. Abra `index.html` em um navegador moderno.
4. Navegue pelo menu e teste o formulário em **Cadastro**.

O projeto não exige servidor para a demonstração básica. Para testes de desenvolvimento, também é possível executar um servidor local (por exemplo, a extensão Live Server do VS Code).

## Eventos e manipulação do DOM

- `DOMContentLoaded`: inicializa o roteamento.
- `click`: delegação de eventos nos links internos do menu e rodapé, com `preventDefault()` quando aplicável.
- `hashchange`: atualiza a página virtual exibida.
- `submit`: bloqueia o envio padrão e valida os campos.
- `input` e `change`: verificam os campos durante o preenchimento.
- `reset`: limpa os campos, mensagens de erro e o rascunho armazenado.
- `click` nos botões **Salvar rascunho** e **Editar**: grava dados ou orienta a edição.

O cadastro é inicializado novamente quando sua seção é renderizada, pois a SPA substitui os elementos dentro de `#app`.

## Validação do cadastro

As regras combinam a API nativa de validação HTML com verificações JavaScript:

- Campos obrigatórios (`required`).
- Tamanho mínimo quando definido (`minlength`).
- Formato do e-mail (expressão regular simples).
- Formatos declarados nos atributos `pattern`, como CPF, telefone e CEP.
- Confirmação obrigatória no formulário.

**Atenção:** a máscara/padrão de CPF verifica o formato, **não** a validade matemática dos dígitos verificadores. Da mesma forma, o padrão do CEP não consulta uma base externa.

Em caso de erro, a interface aplica a classe `campo-invalido`, define `aria-invalid` e mostra mensagens em elementos `<small>` criados dinamicamente após os campos. Um alerta geral resume o resultado da validação.

## Armazenamento local (`localStorage`)

São utilizadas duas chaves:

| Chave | Conteúdo |
| --- | --- |
| `revivendo_ultima_pagina_v1` | Objeto com a última rota visitada |
| `revivendo_cadastro_rascunho_v1` | Objeto com nome, e-mail, endereço, número, bairro, cidade e estado |

A gravação usa `localStorage.setItem(chave, JSON.stringify(objeto))`. A recuperação usa `localStorage.getItem(chave)` e `JSON.parse(texto)`, com tratamento de erros por `try...catch`.

Ao carregar a aplicação, a última rota é restaurada se não houver hash na URL. Ao entrar em **Cadastro**, a função `restaurar()` preenche os campos disponíveis com o rascunho salvo.

**Privacidade:** CPF, data de nascimento, telefone, CEP e confirmação não integram o rascunho armazenado. O `localStorage` é local ao navegador, não é criptografado e não substitui banco de dados ou autenticação. Evite armazenar informações sensíveis nele.

## Acessibilidade e interface

- Estrutura semântica e campos com rótulos.
- Estado de navegação indicado por `aria-current="page"`.
- Mensagens associadas aos campos com `aria-describedby` e `aria-live="polite"`.
- Indicação de campos inválidos com `aria-invalid`.
- Estilos de hover e foco para facilitar a interação.

## Depuração e testes sugeridos

Abra as ferramentas do navegador (**F12 → Console**) para acompanhar mensagens de navegação, validação e armazenamento. Recomenda-se testar:

1. Todas as rotas e os botões de navegação.
2. A atualização da página em diferentes rotas.
3. O envio com campos vazios e com formatos incorretos.
4. O salvamento e a recuperação do rascunho após recarregar a página.
5. A limpeza do formulário e do rascunho.
6. A navegação por teclado e a exibição em telas menores.

## Limitações atuais

Este é um **projeto demonstrativo**: a validação acontece no navegador e o formulário **não envia cadastros a um servidor**. Não há banco de dados, autenticação nem persistência remota. A validação do lado do cliente não substitui a validação em um futuro backend.

## Organização acadêmica

O projeto demonstra competências em estruturação HTML, estilização CSS, JavaScript, eventos, delegação, DOM, roteamento SPA, validação, persistência local, acessibilidade e depuração.
