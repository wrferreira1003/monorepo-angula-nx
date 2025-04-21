# Guia de Referência: Estrutura de Projetos Angular com NX

Este documento serve como referência para a estrutura padrão dos projetos Angular desenvolvidos com NX em nosso monorepo. Consulte-o sempre que tiver dúvidas sobre onde um componente, serviço ou outro elemento deve ser criado, incluindo a distinção entre componentes inteligentes e componentes burros.

## Comandos Básicos NX

### Criar um novo app no monorepo
```bash
nx g @nx/angular:app apps/appName
```

### Subir o projeto
```bash
npx nx s nome_do_projeto
```

## Estrutura de Diretórios

```
apps/src/app/
    domain/       # Módulos do sistema (cada domain = um módulo específico)
    core/         # Elementos compartilhados por TODOS os módulos
    widget/       # Componentes reutilizáveis entre diferentes módulos
    shared/       # Elementos compartilhados entre domains específicos
```

## Componentes Inteligentes vs. Componentes Burros

Na arquitetura Angular, é importante distinguir entre dois tipos de componentes:

### Componentes Inteligentes (Smart Components)
- **Características**: Contêm lógica de negócios, gerenciam estado, interagem com serviços, fazem chamadas API
- **Onde criar**: Tipicamente em `domain/pages/` ou `domain/components/`
- **Exemplos**: Páginas completas, componentes de dashboard que gerenciam dados
- **Convenção de nome**: Geralmente possuem sufixo `.page.ts` ou `.component.ts`

### Componentes Burros (Dumb Components)
- **Características**: Focados apenas na apresentação, recebem dados via `@Input()`, emitem eventos via `@Output()`
- **Onde criar**: Tipicamente em `widget/components/` ou `shared/components/`
- **Exemplos**: Botões personalizados, cards, inputs customizados, tabelas reutilizáveis
- **Convenção de nome**: Sempre possuem sufixo `.component.ts`

## Comparativo entre Diretórios Semelhantes

| Diretório | Propósito | Tipo de Componente | Quando Usar | Exemplo |
|-----------|-----------|---------------------|-------------|---------|
| **domain/pages/** | Páginas completas do módulo | Inteligente | Páginas que representam rotas do módulo | Página de dashboard, página de login |
| **domain/components/** | Componentes específicos para um módulo | Inteligente ou Burro | Componentes que serão usados apenas dentro do módulo atual | Formulário de cadastro de usuário |
| **widget/components/** | Componentes genéricos reutilizáveis | Burro | Componentes de UI reutilizáveis sem lógica de negócios | Seletor de data, botão personalizado |
| **core/components/** | Componentes estruturais do sistema | Inteligente ou Burro | Componentes que definem a estrutura da aplicação | Header, Footer, Sidebar |
| **shared/components/** | Componentes compartilhados entre domains | Geralmente Burro | Componentes que são usados em mais de um módulo específico | Componente de seleção de usuário |

### Diferenças Principais

- **domain/**: Contém módulos completos e isolados do sistema. Cada domain deve ser independente e representar uma funcionalidade ou área do sistema.
  
- **core/**: Contém componentes e serviços fundamentais para o funcionamento da aplicação. Elementos neste diretório são usados em todos os módulos e representam a estrutura básica da aplicação.
  
- **widget/**: Contém componentes reutilizáveis e independentes de contexto. Os componentes aqui devem ser genéricos o suficiente para serem usados em qualquer parte da aplicação.
  
- **shared/**: Contém elementos que são compartilhados entre domains específicos, mas não são genéricos o suficiente para serem colocados em widget nem fundamentais o suficiente para serem colocados em core.

## Organização Interna dos Módulos

Cada módulo (domain) pode conter as seguintes pastas:

```
domain/auth/
    apis/        # Requisições ao backend
    constants/   # Constantes específicas deste módulo
    enums/       # Enums específicos deste módulo
    interfaces/  # Interfaces específicas deste módulo
    dialogs/     # Diálogos específicos deste módulo
    pages/       # Páginas finais para o usuário
    components/  # Componentes específicos deste módulo
    services/    # Serviços específicos deste módulo
```

## Regras de Nomenclatura

### Sufixos para Arquivos

- Componentes regulares: `.component.ts`
- Componentes de página: `.page.ts`
- Diálogos: `.dialog.ts`
- Serviços: `.service.ts`

### Prefixos para Interfaces e Enums

- Interfaces: `i` (ex: `iUsuario`)
- Enums: `e` (ex: `eTipoUsuario`)

## Exemplos

### Enum e Interface

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
```

### Estrutura de Páginas

```
apps/src/app/domain/auth/pages/login/login.page.ts
apps/src/app/domain/auth/pages/cadastro/cadastro.page.ts
apps/src/app/domain/auth/pages/recuperacao/recuperacao.page.ts
```

## Configurações Necessárias

### Ajustar ESLint para aceitar sufixos personalizados

```json
'@angular-eslint/component-class-suffix': [
  'error',
  {
    'suffixes': [
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

### Ajustar tsconfig.json para configurar paths

```json
"@features/*": ["apps/estrutura_projeto/src/app/widgets/*"],
```

## Diretrizes de Uso

1. **Constants**: Use sempre que tiver valores fixos no sistema
2. **Enums**: Use para definir conjuntos de valores predefinidos
3. **Interfaces**: Use para definir contratos de dados
4. **Dialogs**: Use para janelas modais ou de confirmação
5. **Services**: Use para lógica de negócios e comunicação com APIs
6. **Pages**: Use para componentes que representam páginas completas

## Quando criar em cada diretório?

- **domain/**: Quando o elemento é específico para um módulo do sistema
- **core/**: Quando o elemento é fundamental e será usado em toda a aplicação
- **widget/**: Quando o elemento é genérico e pode ser reutilizado em diferentes módulos
- **shared/**: Quando o elemento é compartilhado entre alguns módulos específicos

## Diagrama de Decisão para Diretórios

```
É usado em toda a aplicação?
├── Sim → core/
└── Não → É genérico e reutilizável?
    ├── Sim → widget/
    └── Não → É usado em mais de um módulo?
        ├── Sim → shared/
        └── Não → domain/módulo-específico/
```

## Diagrama de Decisão para Componentes Inteligentes vs. Burros

```
O componente gerencia estado ou faz chamadas a serviços/APIs?
├── Sim → Componente Inteligente
│      └── É uma página completa?
│          ├── Sim → domain/pages/
│          └── Não → domain/components/ ou core/components/ (dependendo do escopo)
└── Não → Componente Burro
       └── É específico para um módulo?
           ├── Sim → domain/components/
           └── Não → É usado em toda a aplicação?
                 ├── Sim → widget/components/
                 └── Não → shared/components/
```

## Exemplos Práticos

### Componente Inteligente (Smart)

```typescript
// apps/src/app/domain/auth/pages/login/login.page.ts
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        success => this.router.navigate(['/dashboard']),
        error => console.error('Erro no login', error)
      );
    }
  }
}
```

### Componente Burro (Dumb)

```typescript
// apps/src/app/widget/components/custom-button/custom-button.component.ts
@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() label: string;
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary';
  @Output() clicked = new EventEmitter<void>();
  
  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
```
