<p align="center">
  <img src="src/app/icon.svg" width="96" height="96" alt="Conecta Escola Logo" style="border-radius: 8px;">
</p>

<h1 align="center">Conecta Escola</h1>

<p align="center">
  Projeto desenvolvido no contexto da disciplina de <strong>Engenharia de Requisitos</strong>.
  <br>
  Proposta acadêmica de plataforma integrada para aproximar famílias, professores, coordenação e apoio pedagógico no ambiente escolar público.
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React 19"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript" alt="TypeScript"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=flat-square&logo=node.js" alt="Node.js"></a>
  <img src="https://img.shields.io/badge/Disciplina-Engenharia_de_Requisitos-0e1a33?style=flat-square" alt="Engenharia de Requisitos">
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow?style=flat-square" alt="Licença"></a>
</p>

---

## Visão Geral do Projeto

No contexto escolar público, a comunicação entre a instituição e a comunidade frequentemente ocorre de forma fragmentada ou tardia: notas e faltas consolidadas apenas em reuniões bimestrais, recados em agendas de papel sujeitos a perdas e pouca visibilidade sobre a rotina de sala de aula.

Esse distanciamento torna-se ainda mais crítico no acompanhamento de **estudantes com necessidades específicas e neurodivergentes** (como TEA, TDAH e altas habilidades). Nesses cenários, informações sobre laudos, adaptações curriculares e orientações de especialistas multidisciplinares frequentemente não chegam a tempo a quem está na ponta do ensino.

O **Conecta Escola** nasce como uma proposta de software desenhada para atuar como ponte entre esses atores, centralizando informações acadêmicas, rotinas escolares e canais transparentes de comunicação.

---

## Elicitação e Pesquisa de Campo (Discovery)

Na fase atual de Engenharia de Requisitos, a aplicação opera prioritariamente como ferramenta de **validação de hipóteses e levantamento de necessidades reais** (Discovery). 

Em vez de assumir requisitos prévios em sala de aula, o projeto estruturou uma pesquisa de campo segmentada por ambiente para ouvir as dores dos diferentes perfis:

```text
[Ambiente Escolar]
  ├── Murais e Corredores       ──> [QR Code: Alunos]            ──> Questionário Discente
  ├── Portaria e Secretaria     ──> [QR Code: Pais/Responsáveis] ──> Questionário Familiar
  └── Sala dos Professores/AEE  ──> [QR Code: Equipe Escolar]    ──> Questionário Pedagógico
```

### Mecanismos de Integridade da Coleta
- **Triagem por Perfil:** Cada ponto físico da escola conta com um QR Code com identificador de perfil e código de acesso, assegurando que o entrevistado responda ao formulário correspondente à sua vivência.
- **Isolamento de Dados:** As URLs reais dos formulários de pesquisa permanecem isoladas no servidor, sem exposição no front-end.
- **Controle de Respostas:** O acesso utiliza assinaturas HMAC e cookies de sessão (`HttpOnly`) para inibir respostas duplicadas no mesmo dispositivo, mantendo a amostragem íntegra para análise quantitativa e qualitativa.

---

## Stakeholders e Requisitos do Sistema

O escopo do projeto contempla quatro papéis principais de usuários (stakeholders), com necessidades e requisitos funcionais mapeados:

### 1. Alunos
- **Acompanhamento de Desempenho:** Acesso simplificado a notas, médias e frequência por disciplina.
- **Gestão de Tarefas:** Visualização de prazos de entregas, trabalhos e atividades da semana em linguagem direta.
- **Canal de Avisos:** Recebimento de notificações da escola e comunicados sobre eventos e datas letivas.

### 2. Pais e Responsáveis
- **Visibilidade Contínua:** Acompanhamento do progresso acadêmico e assiduidade sem depender exclusivamente do boletim físico.
- **Histórico e Laudos:** Centralização do registro de laudos, recomendações de terapeutas e solicitações de adaptações.
- **Comunicação Direta:** Canal formal e organizado para alinhamento com professores e coordenação pedagógica.

### 3. Professores
- **Organização de Aulas:** Estrutura para planejamento de aulas alinhadas à Base Nacional Comum Curricular (BNCC).
- **Visão da Turma:** Panorama do ritmo de aprendizagem, engajamento e entregas dos estudantes ao longo do período.
- **Apoio Pedagógico:** Registro contínuo de observações individuais sobre dificuldades e evolução em sala.

### 4. Coordenação Pedagógica e Sala de Recursos (AEE)
- **Atendimento Educacional Especializado:** Acompanhamento individualizado e histórico de adaptações de provas e materiais para alunos neurodivergentes.
- **Comunicação Institucional:** Emissão de avisos gerais e agendamento de reuniões pedagógicas.
- **Articulação:** Conexão entre equipe gestora, especialistas (psicologia, psicopedagogia) e o corpo docente.

---

## Modelagem e Casos de Uso

Como parte dos entregáveis da disciplina de Engenharia de Requisitos, a modelagem conceitual e o diagrama de casos de uso estão disponíveis no link abaixo:

- **[Diagrama de Casos de Uso (ClickUp Whiteboard)](https://sharing.clickup.com/90171556243/wb/h/2kza9gck-1557/ab6c3f1d0e93ef5)**

---

## Tecnologias e Arquitetura

O projeto adota uma stack moderna, priorizando acessibilidade, modularidade e desempenho:

- **[Next.js 15](https://nextjs.org/)**: Framework React com App Router, Server Components e rotas dinâmicas de API.
- **[React 19](https://react.dev/)**: Construção declarativa de interfaces reativas e componentização limpa.
- **[TypeScript 5.6](https://www.typescriptlang.org/)**: Tipagem estática em toda a base de código, garantindo consistência entre front-end e APIs.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Motor de estilos utility-first de alta performance com design system baseado em alto contraste e tokens semânticos.
- **[Motion](https://motion.dev/)**: Biblioteca de animações físicas com suporte nativo a preferências de acessibilidade (`prefers-reduced-motion`).
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones vetoriais consistentes e semânticos.
- **[Node.js](https://nodejs.org/)**: Camada de backend leve para validação de tokens em tempo constante (`timingSafeEqual`), assinaturas HMAC-SHA256 e controle de fluxo.

---

## Princípios de Design e Acessibilidade

Para garantir que a plataforma seja acessível a todos os perfis da comunidade escolar, foram estabelecidas as seguintes diretrizes:

- **Acessibilidade Visual:** Contraste elevado, tipografia legível ([Atkinson Hyperlegible](https://brailleinstitute.org/freefont) e fontes legíveis para diferentes condições de visão) e suporte completo a navegação por teclado com atalhos de salto de conteúdo (`Skip link`).
- **Respeito ao Usuário (`prefers-reduced-motion`):** As transições e elementos visuais adaptam-se automaticamente para usuários sensíveis a movimento em tela.
- **Privacidade por Padrão (Privacy by Design):** As telas conceituais utilizam exclusivamente dados fictícios. Nenhuma informação pessoal ou diagnóstico sensível de estudantes é exposto publicamente.

---

## Estrutura do Repositório

A organização dos arquivos reflete a separação entre a camada de apresentação conceitual, os controladores de acesso da pesquisa e as rotas da aplicação:

```text
SiteProjetoFinal/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── acesso/          # Endpoint para validação de credenciais e redirecionamento seguro
│   │   │   └── health/          # Verificação de status do serviço
│   │   ├── globals.css          # Estilos globais, tokens de cores e temas
│   │   ├── layout.tsx           # Layout base, metadados e configuração de fontes
│   │   └── page.tsx             # Composição das seções da landing page conceitual
│   │
│   ├── components/
│   │   ├── Hero.tsx             # Apresentação principal do problema e da proposta
│   │   ├── Sections.tsx         # Seções: O Problema, A Proposta, Inclusão e Demonstração Visual
│   │   ├── Profiles.tsx         # Interface para inserção do código e seleção de perfil de pesquisa
│   │   ├── QrWelcome.tsx        # Recepção contextualizada do usuário vindo via QR Code
│   │   ├── Navbar.tsx           # Navegação principal e atalho para a pesquisa
│   │   ├── Art.tsx              # Componentes visuais e ilustrações
│   │   ├── Halftone.tsx         # Efeitos visuais e texturas gráficas
│   │   └── ui.tsx               # Primitivas de interface reutilizáveis (botões, modais, cards)
│   │
│   └── lib/
│       ├── acesso.ts            # Gerenciamento de estado de acesso e verificação de token no cliente
│       ├── config.ts            # Parâmetros e metadados gerais do projeto
│       └── motion.ts            # Configurações de transições e acessibilidade de animação
│
├── server/
│   ├── core.mjs                 # Regras de negócio de acesso, HMAC e rate limiting
│   ├── core.d.mts               # Tipagens estáticas do núcleo de acesso
│   └── index.mjs                # Servidor HTTP standalone para hospedagem independente
│
├── scripts/
│   └── cartazes.mjs             # Gerador de cartazes A4 com QR codes vetoriais para pesquisa de campo
│
├── forms.local.example.json     # Exemplo de mapeamento de formulários por perfil (mantido fora do git)
├── render.yaml                  # Blueprint de infraestrutura para backend desacoplado
├── next.config.ts               # Configuração do Next.js e rewrites para microsserviços
└── tsconfig.json                # Configuração do compilador TypeScript
```

---

## Licença

Este projeto é desenvolvido para fins acadêmicos e distribuído sob a licença [MIT](LICENSE).
