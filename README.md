# Vesta ERP - Gestão Tática de Abrigos

> **Global Solution FIAP 2026 - Mobile Application Development**

O **Vesta App** é um aplicativo mobile focado na operação tática de abrigos emergenciais. Ele foi desenhado para auxiliar os operadores na ponta, oferecendo ferramentas rápidas e offline-first (quando aplicável) para o acolhimento de famílias, controle de suprimentos e comunicação de ocorrências.

---

## 🎯 Descrição da Solução (Global Solution)

Em cenários de desastres climáticos, a superlotação e a desorganização logística em abrigos provisórios são problemas críticos. A nossa solução ataca a ineficiência no controle de entrada/saída de desabrigados e a falta de visibilidade sobre os recursos disponíveis (água, comida, higiene). 

O Vesta App resolve esse problema descentralizando a operação: o gestor do abrigo utiliza o smartphone para registrar o **acolhimento de famílias** em tempo real, dar **saída em recursos do estoque** e disparar **alertas de ocorrências** (ex: falta de água, problemas de infraestrutura) diretamente para a central.

---

## 📺 Pitch e Demonstração

Assista ao vídeo demonstrando todas as funcionalidades, fluxos e a arquitetura do aplicativo:
**[Link do YouTube]**

---

## 🚀 Funcionalidades e Requisitos Atendidos

O aplicativo cumpre todos os requisitos de CRUD, navegação e autenticação:

* **Autenticação (Login):** Proteção de rotas, mantendo acesso seguro exclusivo para operadores cadastrados.
* **Dashboard (Home):** Visão geral da lotação do abrigo (ocupação vs. capacidade) e alertas automáticos de estoque crítico.
* **Acolhimento (Create):** Formulário complexo para registro de um responsável e múltiplos dependentes simultaneamente.
* **Gestão de Famílias (Read/Delete):** Listagem de famílias presentes, visualização de dependentes e registro de saída definitiva.
* **Gestão de Estoque (Read/Update):** Visualização de recursos por categoria, com fluxo de "Entrada" e "Saída" de itens do inventário.
* **Ocorrências e Solicitações (Create/Read):** Telas para relatar problemas no abrigo por grau de severidade e solicitar suprimentos emergenciais à central.
* **Configurações e Sobre:** Tela com informações sobre o aplicativo e o `hash` do commit de referência da versão.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

* **React Native & Expo:** Framework principal para o desenvolvimento híbrido.
* **Axios:** Para consumo e integração completa com a API RESTful (desenvolvida na nuvem Azure).
* **React Navigation:** Gerenciamento de rotas empilhadas (Stack) e abas (Bottom Tabs).
* **React Native Toast Message:** Para feedbacks visuais não-obstrutivos de sucesso e erro.
* **React Native Keyboard Aware Scroll View:** Para garantir uma navegação fluida em formulários grandes, evitando que o teclado cubra os inputs.

---

## 💻 Como Executar o Projeto Localmente

**Pré-requisitos:**
* Ter o [Node.js](https://nodejs.org/) instalado.
* Ter o aplicativo [Expo Go](https://expo.dev/client) instalado no seu dispositivo móvel (iOS ou Android).

**Passo a passo:**

1. Clone este repositório:
```bash
   git clone https://github.com/vesta-erp/vesta-mobile.git
```

2. Acesse a pasta do projeto:
```bash
   cd vesta-app
```

3. Instale as dependências:
```bash
   npm install
```

4. Inicie o Metro Bundler:
```bash
   npx expo start
```

5. **Para testar no celular:** Escaneie o QR Code exibido no terminal utilizando a câmera do celular (iOS) ou o aplicativo Expo Go (Android).

---

## 👥 Integrantes do Grupo

* [@gabrielCZz](https://github.com/orgs/vesta-erp/people/gabrielCZz) - Gabriel Cruz | RM 559613
* [@jvmadella](https://github.com/orgs/vesta-erp/people/jvmadella) - João Victor Madella | RM: 561007
* [@k-auaferreira](https://github.com/orgs/vesta-erp/people/k-auaferreira) - Kauã Ferreira | RM 560992
* [@naah-m](https://github.com/orgs/vesta-erp/people/gabrielCZz) - Nathália Mantovani | RM: 99904
* [@Vi-debu](https://github.com/orgs/vesta-erp/people/Vi-debu) - Vinicius Bitú | RM560227

---