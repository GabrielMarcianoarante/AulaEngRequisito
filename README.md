 <p align="center">
  <a href="https://conecta-escola-sepia.vercel.app/">
    <img src="public/conecta-escola-logo.png" width="560" alt="Conecta Escola — Educação mais conectada, transparente e inclusiva">
  </a>
</p>

<p align="center">
  <strong>Uma escola mais conectada, transparente e inclusiva.</strong>
  <br>
  <a href="https://conecta-escola-sepia.vercel.app/">Acessar versão publicada</a>
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
  <a href="LICENSE"><img src="https://img.shields.io/badge/Licença-MIT-yellow?style=flat-square" alt="Licença"></a>
</p>

---

## Navegação

| Material | Descrição | Acesso |
|---|---|---|
| Diagrama de Casos de Uso — UML | Representação dos atores e das funcionalidades do sistema. | [Visualizar UML](./Unidade_5/UML) |
| Lean Canvas | Modelo visual da proposta de valor e estrutura do projeto. | [Acessar Lean Canvas](./Unidade_5/Lean_Canvas/Canvas.png) |
| Documentação do Projeto | Documentação acadêmica e especificação do projeto em PDF. | [Visualizar PDF](./Unidade_5/Documentação.pdf) |
---


## Visão Geral do Projeto

No contexto escolar público, a comunicação entre a instituição e a comunidade frequentemente ocorre de forma fragmentada ou tardia: notas e faltas consolidadas apenas em reuniões bimestrais, recados em agendas de papel sujeitos a perdas e pouca visibilidade sobre a rotina de sala de aula.

Esse distanciamento torna-se ainda mais crítico no acompanhamento de **estudantes com necessidades específicas e neurodivergentes**, como TEA, TDAH e altas habilidades. Nesses cenários, informações sobre laudos, adaptações curriculares e orientações de especialistas multidisciplinares frequentemente não chegam a tempo a quem está na ponta do ensino.

O **Conecta Escola** nasce como uma proposta de software desenhada para atuar como ponte entre esses atores, centralizando informações acadêmicas, rotinas escolares e canais transparentes de comunicação.

---

## Elicitação e Pesquisa de Campo (Discovery)

Na fase de Engenharia de Requisitos, a aplicação opera prioritariamente como ferramenta de **validação de hipóteses e levantamento de necessidades reais** (Discovery).

Em vez de assumir requisitos prévios em sala de aula, o projeto estruturou uma pesquisa de campo segmentada por ambiente para ouvir as necessidades dos diferentes perfis:

```text
[Ambiente Escolar]
  ├── Murais e Corredores       ──> [QR Code: Alunos]            ──> Questionário Discente
  ├── Portaria e Secretaria     ──> [QR Code: Pais/Responsáveis] ──> Questionário Familiar
  └── Sala dos Professores/AEE  ──> [QR Code: Equipe Escolar]    ──> Questionário Pedagógico
```

### Mecanismos de Integridade da Coleta

- **Triagem por Perfil:** cada ponto físico da escola conta com um QR Code com identificador de perfil e código de acesso, direcionando o entrevistado ao formulário correspondente à sua vivência.
- **Isolamento de Dados:** as URLs reais dos formulários de pesquisa permanecem isoladas no servidor, sem exposição no front-end.
- **Controle de Respostas:** o acesso utiliza assinaturas HMAC e cookies de sessão (`HttpOnly`) para inibir respostas duplicadas no mesmo dispositivo, mantendo a amostragem íntegra para análise quantitativa e qualitativa.

---

## Stakeholders e Requisitos do Sistema

O escopo do projeto contempla quatro papéis principais de usuários (*stakeholders*), com necessidades e requisitos funcionais mapeados.

### 1. Alunos

- **Acompanhamento de Desempenho:** acesso simplificado a notas, médias e frequência por disciplina.
- **Gestão de Tarefas:** visualização de prazos de entregas, trabalhos e atividades da semana em linguagem direta.
- **Canal de Avisos:** recebimento de notificações da escola e comunicados sobre eventos e datas letivas.

### 2. Pais e Responsáveis

- **Visibilidade Contínua:** acompanhamento do progresso acadêmico e assiduidade sem depender exclusivamente do boletim físico.
- **Histórico e Laudos:** centralização do registro de laudos, recomendações de terapeutas e solicitações de adaptações.
- **Comunicação Direta:** canal formal e organizado para alinhamento com professores e coordenação pedagógica.

### 3. Professores

- **Organização de Aulas:** estrutura para planejamento de aulas alinhadas à Base Nacional Comum Curricular (BNCC).
- **Visão da Turma:** panorama do ritmo de aprendizagem, engajamento e entregas dos estudantes ao longo do período.
- **Apoio Pedagógico:** registro contínuo de observações individuais sobre dificuldades e evolução em sala.

### 4. Coordenação Pedagógica e Sala de Recursos (AEE)

- **Atendimento Educacional Especializado:** acompanhamento individualizado e histórico de adaptações de provas e materiais para alunos neurodivergentes.
- **Comunicação Institucional:** emissão de avisos gerais e agendamento de reuniões pedagógicas.
- **Articulação:** conexão entre equipe gestora, especialistas e corpo docente.
---
## Documentação e Artefatos do Projeto

Esta seção reúne os materiais acadêmicos e técnicos produzidos durante o desenvolvimento do Conecta Escola.

## Documentação e Artefatos do Projeto

| Material | Descrição | Acesso |
|---|---|---|
| Diagrama de Casos de Uso — UML | Representação dos atores e das funcionalidades do sistema. | [Visualizar UML](./Unidade_5/Lean_Canvas) |
| Lean Canvas | Modelo visual da proposta de valor e estrutura do projeto. | [Acessar Lean Canvas](./Unidade_5/UML/uml.png) |
| Documentação do Projeto | Documentação acadêmica e especificação do projeto em PDF. | [Visualizar PDF](./Unidade_5/Documentação.pdf) |
---

## 3.2 Tecnologias Utilizadas

### Linguagens e Frameworks
- **[Java](https://www.java.com):** linguagem de programação utilizada no desenvolvimento de aplicações.
- **[Python](https://www.python.org):** linguagem utilizada para processamento de dados e funcionalidades de inteligência artificial.
- **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):** linguagem utilizada no desenvolvimento de funcionalidades interativas.
- **[TypeScript 5.6](https://www.typescriptlang.org):** tipagem estática para garantir maior segurança e consistência no código.
- **[Next.js 15](https://nextjs.org):** framework React com App Router, Server Components e rotas dinâmicas de API.
- **[React 19](https://react.dev):** construção declarativa de interfaces reativas e componentização.

### Banco de Dados
- **[MySQL](https://www.mysql.com):** sistema de gerenciamento de banco de dados relacional.
- **[PostgreSQL](https://www.postgresql.org):** banco de dados relacional utilizado para armazenamento e gerenciamento de informações.

### Ferramentas e Bibliotecas
- **[Figma](https://www.figma.com):** criação de protótipos e desenvolvimento de interfaces.
- **[Tailwind CSS v4](https://tailwindcss.com):** estilização de interfaces com abordagem utility-first e tokens semânticos.
- **[GSAP](https://gsap.com):** biblioteca para criação de animações e transições.
- **[Motion](https://motion.dev):** biblioteca de animações com suporte a preferências de acessibilidade.
- **[Lucide React](https://lucide.dev):** conjunto de ícones vetoriais.
- **[Node.js](https://nodejs.org):** ambiente de execução JavaScript utilizado na camada de servidor.
- **[ChatGPT](https://chatgpt.com):** ferramenta de apoio à inteligência artificial, pesquisa e desenvolvimento.

### Segurança
- **[HTTPS](https://developer.mozilla.org/pt-BR/docs/Glossary/HTTPS):** protocolo de comunicação segura entre cliente e servidor.
- **[Auth0](https://auth0.com):** plataforma de autenticação e gerenciamento de identidade.
- **[JWT](https://jwt.io):** padrão de tokens para transmissão segura de informações de autenticação.
- **HMAC-SHA256:** algoritmo de assinatura utilizado para validação da integridade e autenticidade de tokens.

### Base de Conhecimento da IA e do Sistema
- **BNCC:** Base Nacional Comum Curricular.
- **PEI:** Plano Educacional Individualizado.
- **PNAE:** Programa Nacional de Alimentação Escolar.

---

## Padrões de Design

A interface do sistema foi concebida sob os princípios do **Design Universal**, da **Psicologia Cognitiva aplicada à Educação** e das diretrizes internacionais de acessibilidade **WCAG 2.1 — nível AA**.

Considerando que o público final de estudantes compreende alunos do Ensino Fundamental II (6º ao 9º ano) e do Ensino Médio (1º ao 3º ano), na faixa etária entre 11 e 18 anos, a interface abandona elementos infantis e adota uma linguagem visual contemporânea, dinâmica e focada em autonomia, produtividade e inclusão.

###  Adaptação Etária e Interface para EF2 e Ensino Médio

- **Linguagem Visual Contemporânea e Não Infantilizada:** design baseado em cartões (*cards*), abas bem definidas e estética limpa (*Clean UI*), similar aos aplicativos de produtividade e organização cotidianos do público jovem, como [Notion](https://www.notion.com/), [Canva](https://www.canva.com/) e plataformas de *e-learning*.
- **Foco em Autonomia e Gestão do Tempo:**
  - **Painel de Bordo Centralizado:** visualização clara das tarefas pendentes, próximas avaliações e alertas organizados por ordem cronológica e nível de prioridade.
  - **Visualizações Flexíveis:** opção de alternar entre exibições em **Lista**, **Calendário** ou **Kanban** para o acompanhamento de trabalhos e projetos.
  - **Barras de Progresso e Indicadores Visuais:** indicadores gráficos de percentual de conclusão de tarefas e itinerários de estudo, estimulando a autorregulação do aprendizado sem poluição visual.

### Acessibilidade e Design Inclusivo para Neurodivergentes (TDAH, TEA e Dislexia)

Para garantir que alunos e pais neurodivergentes acompanhem as rotinas sem perda de informações ou sobrecarga sensorial, foram estabelecidos os seguintes padrões:

- **Modo de Foco (Redução de Carga Cognitiva):**
  - Mecanismo de alternância de tela que oculta menus laterais, notificações secundárias e elementos decorativos, mantendo visível apenas o conteúdo de leitura ou execução de tarefas atual.
  - Animações funcionais e suaves, com duração máxima de 200 ms, e opção de desativação global por meio de `prefers-reduced-motion`.
- **Tipografia e Ajustes Visuais:**
  - Família tipográfica de alta legibilidade, como [Inter](https://rsms.me/inter/) ou [Roboto](https://fonts.google.com/specimen/Roboto), com escala tipográfica hierárquica clara.
  - Suporte à ativação de fonte alternativa adaptada para dislexia, como [OpenDyslexic](https://opendyslexic.org/), e controles simples para aumento do tamanho da fonte e do espaçamento entre linhas.
- **Comunicação Multimodal e Código de Cores:**
  - A transmissão de informações e status, como "Pendente", "Concluído" e "Alerta de Alergia", nunca depende exclusivamente da cor. Todos os alertas combinam **ícones universais + rótulo de texto + padrão de cor contrastante**, atendendo também a usuários daltônicos.
  - Paleta de cores neutra e equilibrada no tema padrão, com tons suaves de azul e cinza, evitando cores saturadas ou estroboscópicas que possam causar hiperestimulação visual.

### Arquitetura de Informação e Padrões de Navegação

- **Regra dos 3 Cliques:** a arquitetura de navegação é estruturada de forma rasa, buscando garantir que qualquer funcionalidade principal, como boletim, diário de classe, envio de laudos ou consulta de frequência no refeitório, possa ser acessada em no máximo três interações a partir da tela inicial.
- **Abordagem Mobile-First e Responsividade:**
  - **Estudantes e Pais:** interfaces otimizadas primariamente para telas de smartphones, com alvos de toque (*touch targets*) de no mínimo **48 × 48 px**, facilitando o uso em trânsito e em dispositivos móveis mais simples.
  - **Professores e Coordenadores:** layouts expansíveis para telas de desktop e tablets, otimizando o fluxo de digitação de notas e elaboração de planos de aula.
  - **Ponto de Leitura do Refeitório:** interface dedicada de alta velocidade, ajustada para visualização em modo paisagem (*landscape*) em tablets, com contraste elevado para rápida identificação pelo operador.

### Feedback do Sistema e Prevenção de Erros

- **Microinterações e Feedback Instantâneo:** todas as ações do usuário, como envio de formulário, salvamento de nota e leitura de QR Code, recebem confirmação imediata por meio de notificações flutuantes (*toast notifications*), indicadores visuais de progresso (*skeleton screens* ou *spinners*) ou sinais sonoros discretos, no caso da validação no refeitório.
- **Prevenção e Mitigação de Erros:**
  - Formulários com validação em tempo real e mensagens de erro explicativas localizadas diretamente abaixo do campo com falha.
  - Telas de confirmação modal para ações destrutivas ou irreversíveis, como exclusão de laudo médico, efetivação de transferência ou remoção de aluno.
  - Salvamento automático do rascunho de planos de aula do professor e dos registros de trabalhos dos alunos, evitando perda de dados por queda de conexão.

### 4.2.5. Privacidade e Acessibilidade Complementar

- **Navegação por Teclado:** suporte à navegação por teclado, com foco visual identificável e atalhos de salto de conteúdo (*Skip Link*).
- **Respeito às Preferências do Usuário:** adaptação de transições e elementos visuais para usuários que ativam `prefers-reduced-motion`.
- **Privacidade por Padrão (*Privacy by Design*):** as telas conceituais utilizam dados fictícios. Informações pessoais ou diagnósticos sensíveis de estudantes não devem ser expostos publicamente.

**Referências de acessibilidade:** [Diretrizes WCAG 2.1 — W3C](https://www.w3.org/TR/WCAG21/).


---

## Estrutura do Repositório

A organização dos arquivos reflete a separação entre a camada de apresentação conceitual, os controladores de acesso da pesquisa e as rotas da aplicação.

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
│   │   └── ui.tsx               # Primitivas de interface reutilizáveis
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
├── forms.local.example.json     # Exemplo de mapeamento de formulários por perfil
├── render.yaml                  # Blueprint de infraestrutura para backend desacoplado
├── next.config.ts               # Configuração do Next.js e rewrites para microsserviços
└── tsconfig.json                # Configuração do compilador TypeScript
```

---

## Licença

Este projeto é desenvolvido para fins acadêmicos e distribuído sob a licença [MIT](LICENSE).
