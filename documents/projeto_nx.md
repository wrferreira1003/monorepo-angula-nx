# Criar projeto com nx

## Criar um novo app no monorepo do nx

```bash
nx g @nx/angular:app apps/appName
```

## Subir o projeto

```bash
npx nx s nome_do_projeto
```

## Configuracoes iniciais do projeto para o prettier e eslint

```bash
npm install --save-dev prettier@latest eslint-plugin-prettier eslint-config-prettier
```
## Acessar o eslint.config.mjs e ajustar o arquivo para o projeto

```bash
import nx from '@nx/eslint-plugin';
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended'); // Adiciona o plugin prettier

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  eslintPluginPrettierRecommended, // Adiciona o plugin prettier
  {
    ignores: ['**/dist'],
  },
  ... continue the config
```

## Ajustar o arquivo .prettierrc para o projeto

```json
{
  "singleQuote": true,
  "printWidth": 180,
  "arrowParens": "avoid",
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "html"
      }
    }
  ]
}
```
## Porque usar o husky

O husky é um gerenciador de hooks do git. Ele é usado para executar scripts antes de commitar, pushar, etc.

```bash
npm install husky -D husky lint-staged
```

Iniciar o husky

```bash
npx husky init
```

Criar o arquivo de .lintstagedrc no root do projeto

{
    "*.ts": ["eslint --fix", "prettier --write"],
    "*.html": ["prettier --write"]
}

```bash
npx husky add .husky/lint-staged
```





## Estrutura de um projeto em angular

```bash
apps/src/app/
    domain/ ## Fica os modulos do sistema. onde cada domain é um modulo do sistema
        auth/
            apis/ ## Requisicoes ao backend
            constants/ ## Constantes que serao utilizadas neste domain ex: URL_BASE
            enums/ ## Enums que serao utilizados neste domain ex: TipoUsuario
            interfaces/ ## Interfaces que serao utilizadas neste domain ex: Usuario
            dialogs/ ## Dialogs que serao utilizados neste domain ex: DialogoConfirmacao
            pages/ ## Paginas finais para o usuario
            components/ ## Componentes que serao utilizados somente neste domain, caso seja compartilhado com outros modulos, precisa ser criado em widget
            services/ ## Servicos de gerenciamento da aplicação
        user/
        admin/
        public/
    core/
        components/ ## Componentes que serao utilizados por todos os modulos do sistema,ex: header, footer, sidebar
        pipes/ ## Pipes que serao utilizados por todos os modulos do sistema, ex: datePipe
        directives/ ## Diretivas que serao utilizadas por todos os modulos do sistema, ex: highlight
    widget/ ## Fica os componentes, pipes, diretivas
        components/
        pipes/
        directives/
    shared/ ## Fica os modulos compartilhado entre os domains, tem praticamente todas as pastas que tem dentro do modulo de domain
        components/
        services/
        Utils/
        apis/
        constants/
        enums/
        interfaces/
        guards/
          
```

### Domain - Fica os modulos do sistema. onde cada domain é um modulo do sistema

### Shared - Fica os modulos compartilhado entre os domains

### Widget - Fica os componentes, pipes, diretivas, etc

### Core - Fica os modulos compartilhado entre os sistemas

## Constants - Sempre que tenha algum valor fixo no sistema, precisa ser criado em constants

## Enums - Sempre que tenha algum enum no sistema, precisa ser criado em enums

## Interfaces - Sempre que tenha alguma interface no sistema, precisa ser criada em interfaces

## Dialogs - Sempre que tenha algum dialog no sistema, precisa ser criado em dialogs

## Services - Sempre que tenha algum serviço no sistema, precisa ser criado em services

## Pages - Sempre que tenha alguma pagina no sistema, precisa ser criada em pages

## Em enums, interfaces, sempre usar a primeira letra como:

- Enum: e
- Interface: i

ex:

```typescript
enum eTipoUsuario {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface iUsuario {
  id: number;
  nome: string;
  email: string;
  tipo: eTipoUsuario;
}

## Pages

No modulo de autenticacao, teremos uma pagina de login, cadastro, recuperação de senha. Sao 3 componentes de pagina.

```bash
apps/src/app/domain/auth/pages/login/login.page.ts
apps/src/app/domain/auth/pages/cadastro/cadastro.page.ts
apps/src/app/domain/auth/pages/recuperacao/recuperacao.page.ts
```

Precisamos ajustar o eslint para que ele aceite a diretiva page do componente de pagina.

```bash
 '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: [
            'Page',
            'Dialog',
            'Service',
            'Enum',
            'Interface',
            'Component',
          ],
        },
      ],
```
Precisamos ajustar no tsconfig.json do app  para que o angular aceite o uso de pages, dialogs, services, enums, interfaces e components.

```bash
"@features/*": ["apps/estrutura_projeto/src/app/widgets/*"],
```

