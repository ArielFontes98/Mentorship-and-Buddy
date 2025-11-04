# Talent & Development Hub

Plataforma de desenvolvimento de talentos e gestão de pessoas para Nubank.

## Objetivo

Centralizar e facilitar o desenvolvimento de talentos, onboarding, mentoria, rotações internas e gestão de pessoas através de uma plataforma única e integrada.

## Navegação e Abas

### 1. Profile (Perfil)

**Quem usa:** Todos os funcionários

**Objetivo:** Visualizar histórico pessoal, performance, skills, treinamentos completados e desenvolvimento.

**Funcionalidades:**
- **Overview:** Perfil completo, role atual, estatísticas rápidas
- **Performance:** Histórico de avaliações, ratings, feedbacks e achievements
- **History:** Histórico de BUs e Chapters que participou
- **Courses:** Lista de cursos completados
- **Mentorships:** Histórico de mentorships (ativos e concluídos)
- **Botão Leveling:** Acesso rápido para ver expectativas do seu nível

**Rota:** `#/profile`

---

### 2. Leveling (Expectativas por Nível)

**Quem usa:** Todos os funcionários

**Objetivo:** Entender o que é esperado em cada nível (IC4, IC5, IC6, etc.) e função.

**Funcionalidades:**
- Filtros por Level e Function
- Skills esperadas com níveis (1-5) e descrições
- Expectativas por categoria (Technical Skills, Decision Making, Communication, Execution)
- Comparação entre seu nível atual e expectativas

**Rota:** `#/leveling`

---

### 3. Buddy (Programa Buddy)

**Quem usa:** New Joiners e Buddies

**Objetivo:** Facilitar o onboarding de novos funcionários através de um sistema de buddy pairing.

**Sub-abas:**

#### New Joiner (`#/buddy/new-joiner`)
- **Quem usa:** Novos funcionários
- Dashboard com boas-vindas e jornada de 90 dias
- Visualização do Buddy atribuído
- Explicação do matching (por que este Buddy foi sugerido)
- Timeline de atividades (Week 1, Week 2-4, Month 2, Month 3)
- Formulário de feedback (desbloqueia após 80% de conclusão)

#### Buddy (`#/buddy/buddy`)
- **Quem usa:** Funcionários que são buddies
- Dashboard com capacidade (slots disponíveis)
- Lista de new joiners atribuídos
- Progresso de cada new joiner (On track / At risk / Not started)
- Jornada do buddy (treinamentos, missões)
- **Alocação de treinamentos:** Buddy pode alocar cursos para new joiners
- Feedback sobre o programa

**Rota:** `#/buddy/new-joiner` ou `#/buddy/buddy`

---

### 4. Courses (Treinamentos)

**Quem usa:** Todos os funcionários

**Objetivo:** Acesso a treinamentos estruturados e recomendados baseados em skills.

**Sub-abas:**

#### Onboarding (`#/courses/onboarding`)
- **Quem usa:** New joiners
- Paths de onboarding pré-definidos
- Sequência de cursos por path
- Tempo total estimado

#### Recommended Training (`#/courses/recommended`)
- **Quem usa:** Todos os funcionários
- Busca por título, descrição ou skills
- Filtros por categoria, nível e skills
- Recomendações baseadas em skills que você quer desenvolver
- Cards com detalhes de cada curso (duração, formato, nível)

**Rota:** `#/courses/onboarding` ou `#/courses/recommended`

---

### 5. Mentorship (Mentoria)

**Quem usa:** Mentees e Mentors

**Objetivo:** Estruturar jornadas de mentoria para desenvolvimento de carreira.

**Sub-abas:**

#### Mentee (`#/mentorship/mentee`)
- **Quem usa:** Funcionários recebendo mentoria
- Snapshot da mentoria (status, mentor, ciclo)
- Gestão de goals & ambitions (adicionar/remover)
- Timeline de jornada (trainings, missions, check-ins)
- Action Plan (itens compartilhados com mentor)
- **Sugestões de rotação do mentor:** Aceitar/rejeitar sugestões
- Sugestões automáticas de rotação baseadas em skills
- Feedback end-of-cycle

#### Mentor (`#/mentorship/mentor`)
- **Quem usa:** Mentores e managers
- Dashboard com capacidade (mentees ativos)
- Lista de mentees com progresso
- Detalhes de cada mentee (ambições, skills, target)
- Jornada de mentoria
- **Sugerir rotações:** Mentor pode sugerir rotações para mentees
- Gestão de Action Plan (adicionar/modificar itens)
- Recomendações end-of-cycle
- Feedback do mentor

**Rota:** `#/mentorship/mentee` ou `#/mentorship/mentor`

---

### 6. Rotation (Rotação)

**Quem usa:** Todos os funcionários interessados em rotacionar

**Objetivo:** Facilitar rotações internas e matching de candidatos com oportunidades.

**Funcionalidades:**
- **Open Opportunities:** Lista de vagas abertas para rotação
  - Match score (0-100) para cada oportunidade
  - Explicação do match (skills, level, function, history, interests)
  - Filtros por busca, BU e Function
  - Botão "Apply" para se candidatar
- **My Applications:** Status das aplicações (Pending/Reviewing/Accepted/Rejected)
- **My Interests:** Expressar interesse em rotacionar (BU, Chapter, Function, prioridade)

**Rota:** `#/rotation`

---

### 7. Manager (Dashboard Gerencial)

**Quem usa:** Managers e Chapter Leads

**Objetivo:** Visão completa do time: skills, progresso, programas e mobilidade.

**Funcionalidades:**
- **Team Snapshot:** Métricas do time
  - Team size, Countries, Chapters
  - % com Buddy ativo, % com Mentorship ativo
  - % com interesse em rotação nos próximos 12 meses
- **Skills & Leveling Overview:** Tabela/heatmap
  - Membros (linhas) vs Skills (colunas)
  - Nível atual vs esperado por skill
  - Alertas de gaps (ex: "2 IC4s below expected Decision Making level")
- **Programs Participation:** Status de cada membro
  - Buddy status e progresso
  - Mentorship status e progresso
  - Key courses (em progresso/completados)
  - Alertas (ex: "Lucas is late on 2 Buddy missions")
- **Mobility & Rotations:** Membros interessados em rotacionar
  - Top 3 matches de rotação por membro
  - Tags de readiness (Ready soon / Exploring / Early days)

**Rota:** `#/manager/dashboard`

---

### 8. People (Dashboard de People/TA)

**Quem usa:** Time de People/TA

**Objetivo:** Visão agregada organizacional de talento, métricas e gaps.

**Funcionalidades:**
- **Key Metrics:**
  - % de vagas preenchidas internamente
  - Tempo médio para preencher vagas
  - % de funcionários com Buddy/Mentorship ativo
  - Taxa de rotação (últimos 12 meses)
  - NPS do programa Buddy e Mentorship
- **Mobility & Rotation Overview:**
  - Por BU: demanda vs candidatos (High Demand / Balanced / High Applicants)
  - Por Chapter: demanda vs candidatos
- **Skills & Gaps Overview:**
  - Gaps de skills por chapter/country
  - Ex: "Short on advanced BA skills in Country X"
  - Ex: "Plenty of DS/ML skills in Country Y, good pool for future rotations"

**Rota:** `#/people/talent-dashboard`

---

## Funcionalidades Principais

### Matching Engines

1. **Buddy Matching:** Algoritmo que sugere buddies para new joiners baseado em:
   - Mesmo BU (+30 pontos)
   - Mesma função (+25 pontos)
   - Overlap de skills (+25 pontos)
   - Mesmo país/timezone (+10 pontos)
   - Capacidade disponível (+10 pontos)

2. **Mentorship Matching:** Algoritmo que sugere mentores baseado em:
   - Chapter/function compatibility (+30 pontos)
   - Level gap apropriado (+20 pontos)
   - Alinhamento de ambições e strengths (+30 pontos)
   - Proximidade BU/country (+20 pontos)

3. **Rotation Matching:** Algoritmo que calcula match para oportunidades:
   - Required skills match (+40 pontos)
   - Preferred skills match (+20 pontos)
   - Level match (+15 pontos)
   - Function match (+10 pontos)
   - BU/Chapter history (+15 pontos)
   - Country match (+5 pontos)
   - Interests alignment (+10 pontos)

### Estado e Persistência

- Gerenciamento de estado com Zustand
- Tudo funciona com mock data (sem backend)
- Dados persistentes via localStorage (opcional)

---

## Design

- **Estilo:** Nubank (purple #820AD1)
- **Componentes:** Cards rounded-2xl, sombras suaves, gradientes sutis
- **Layout:** Dashboard clean e moderno, responsivo (desktop-first)
- **Ícones:** lucide-react
- **Tipografia:** System fonts, hierarquia clara

---

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS 3
- Zustand (state management)
- lucide-react (ícones)
- Hash-based routing

---

## Deploy

Aplicação deployada no GitHub Pages: `https://arielfontes98.github.io/Mentorship-and-Buddy/`

Deploy automático via GitHub Actions a cada push na branch `main`.

---

## Como Usar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## Estrutura de Dados

Todos os dados são mockados e estão em:
- `src/mock/buddyData.ts` - Dados de Buddy/New Joiner
- `src/mock/mentorshipData.ts` - Dados de Mentorship
- `src/mock/coursesData.ts` - Cursos e paths
- `src/mock/profileData.ts` - Perfil do usuário
- `src/mock/rotationData.ts` - Oportunidades de rotação
- `src/mock/managerData.ts` - Dados gerenciais
- `src/mock/peopleData.ts` - Métricas de People/TA
- `src/mock/levelingData.ts` - Expectativas por nível

---

## Licença

MIT
