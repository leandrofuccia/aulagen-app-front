# Documentação do Hackton - Fase 5

Atualmente, a maioria dos professores e professoras da rede pública enfrenta grandes desafios para planejar e compartilhar suas aulas de forma prática, centralizada e tecnológica. Para enfrentar essa realidade, desenvolvemos a AulaGen, uma plataforma inteligente que facilita a criação, edição e gestão de planos de aula alinhados à BNCC, integrando recursos modernos e o poder da inteligência artificial.

Como parte da solução, foi implementada uma aplicação front-end utilizando React, que oferece aos educadores uma interface gráfica responsiva, intuitiva e de fácil navegação. Por meio dessa interface, os usuários podem interagir diretamente com os endpoints REST da API, realizando operações como criação, edição e visualização de planos de aula com agilidade e autonomia.

---

## Arquitetura da Camada de Frontend (React + Next.js)
- **Tecnologias e Frameworks Utilizados:** 
 - React - Construção da interface interativa e reativa
 - Next.js - Roteamento, renderização SSR e otimização de performance
 - Styled Components - Estilização modular e dinâmica com suporte a temas
 - Formik + Yup - Gerenciamento e validação de formulários
 - Axios - Comunicação com a API via HTTP com suporte a autenticação
 - JWT (jsonwebtoken) - Decodificação e controle de sessão via token
 - React Markdown - Renderização de conteúdo pedagógico em formato Markdown
 - SimpleMDE Editor - Editor de texto com suporte a Markdown para planos de aula
 - TypeScript - Tipagem estática e segurança no desenvolvimento
 - ESLint - Padronização e qualidade de código
 - Docker + Docker Compose - Containerização e orquestração dos serviços
 - GitHub Actions - Pipeline de CI/CD para build e deploy automatizado

#### 1. **Componentização**
- A interface é baseada em **componentes reutilizáveis**, incluindo `Header`, `Loading` e vários elementos estilizados (`Button`, `Input`, `SuccessPopup`, etc.).
- Usa **Styled Components** para estilização modular, permitindo temas dinâmicos e melhor manutenção do código.

#### 2. **Gerenciamento de Estado**
- Utiliza `useState` para controle de estados locais (`errorMessage`, `successMessage`, `isLoading`).
- `useEffect` é utilizado para carregar dados e realizar verificações na montagem dos componentes (`fetchUserProfile`, `fetchPlanos`, etc).
- O **Formik** e **Yup** são usados para gerenciamento e validação de formulários, garantindo consistência nos dados.

#### 3. **Comunicação entre Componentes**
- Uso de `props` para comunicação entre componentes (`Header`).
- Implementação de manipulação de eventos e interação direta com formulários (`handleSubmit`).

#### 4. **Integração com Backend**
- Consumo de APIs usando **Axios**, com autenticação via `Bearer Token`.
- Comunicação com endpoints protegidos (`/api/usuario`, `/api/planoAula/gerar`, `/api/login`).
- Decodificação de JWT para validação de credenciais (`jwt.decode(token)`).

#### 5. **Roteamento e Navegação**
- Gerenciado com **Next.js Router** (`useRouter()`), facilitando redirecionamentos (`router.push('/posts')`).

#### 6. **Validação de Dados**
- **Yup** é utilizado para definir regras nos formulários (`validationSchema`).
- Garante que campos obrigatórios sejam preenchidos corretamente antes do envio.

#### 7. **Estilização e Temas**
- **Styled Components** usado para estilização global e tema dinâmico.
- Usa variáveis para controlar cores, espaçamentos e fontes.
  
#### 8. **Performance e Boas Práticas:**
- Uso de **Lazy Loading** (`Loading` para estados de carregamento).
- Prevenção de renderizações desnecessárias através do gerenciamento eficiente de estado.
- Uso de `localStorage` para persistência de credenciais sem necessidade de requisições constantes.

#### 9. **Automação e Deploy:**
- CI/CD com GitHub Actions para build automático, publicação de imagens Docker no Docker Hub e configuração com Dockerfile.

---

## Setup Inicial

Este guia orienta o usuário a baixar e executar a aplicação utilizando a imagem Docker disponível no Docker Hub.

#### **1. Requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas e aplicações instaladas e em execução no seu sistema:

- **Docker**:
  - Versão recomendada: 20.10.7 ou superior
  - [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**:
  - Versão recomendada: 2.0.0 ou superior
  - Incluído no Docker Desktop ou pode ser instalado separadamente:
    [Instalar Docker Compose](https://docs.docker.com/compose/install/)
- **Backend da aplicação Blogging Dinâmico**
  - A API do sistema deve estar em execução.
  - [Configurar API](https://github.com/leandrofuccia/aulagen-backend)

#### **2. Baixando a Imagem do Docker Hub**

A imagem da aplicação está disponível no repositório do Docker Hub [leandrofuccia/aulagen-app-front](https://hub.docker.com/r/leandrofuccia/aulagen-app-front).

1. Execute o seguinte comando para baixar a última versão da imagem:
   ```bash
   docker pull leandrofuccia/aulagen-app-front:latest
   ```

#### **3. Baixando o Arquivo Docker Compose**

O arquivo [docker-compose.yml](https://raw.githubusercontent.com/leandrofuccia/aulagen-app-front/refs/heads/master/docker-compose.yml) está disponível no repositório do GitHub [leandrofuccia/aulagen-app-front](https://github.com/leandrofuccia/aulagen-app-front). Faça o download em uma pasta local.

#### **4. Criando a rede compartilhada**

Antes de subir os serviços com docker-compose, crie a rede compartilhada:

   ```bash
   docker network create app-network
   ```

#### **5. Iniciando os Contêineres**

1. Na mesma pasta onde se encontra o arquivo `docker-compose.yml`, execute o comando abaixo para iniciar os contêineres:

   ```bash
   docker compose up -d
   ```
2. Após a execução, verifique se os contêineres estão funcionando:

   ```bash
   docker ps
   ```

> Os serviços devem incluir:
>
> - `aulagen-app-front`: Aplicação

#### **6. Testando a Aplicação**

1. Acesse a aplicação no navegador:

   ```
   http://localhost:3000/
   ```
2. Verifique se houve o redirecionamento automático para a página de login.

#### **7. Encerrando os Contêineres**

Para parar e remover os contêineres, execute:

```bash
docker compose down
```

---

## Guia de Uso da aplicação

Este guia tem como objetivo orientar o uso do sistema AulaGen, disponível após Setup Inicial no endereço: [http://localhost:3000/](http://localhost:3000/).

### **1. Página de Login (Tela Inicial)**
**Objetivo:** Autenticar o usuário antes de permitir o acesso ao sistema.  
#### **Passos do Usuário:**  
1. Acessar a página de login.
2. Preencher os campos:
   - **E-mail**
   - **Senha**
3. Clicar no botão **Entrar**.
4. Caso as credenciais sejam válidas, o usuário é redirecionado para a **Página Principal**.
5. Se o usuário ainda **não tiver uma conta**, clicar no link **"Criar Conta"** para ir à página de registro.

### **2. Página de Criação de Conta**
**Objetivo:** Permitir que novos usuários se registrem no sistema.  
#### **Passos do Usuário:**  
1. Acessar a página de criação de conta através do link na **Página de Login**.
2. Preencher os seguintes campos:
   - **Nome**
   - **Senha**
   - **E-mail**
3. Clicar no botão **Cadastrar**.
4. O sistema valida os dados e cria a conta.
5. Após o sucesso, o usuário é redirecionado para a **Página de Login** para autenticação.

### **3. Administração de Planos de Aula (Página Principal)**
**Objetivo:** Exibir a lista de todos os planos de aulas do usuário logado.  
#### **Passos do Usuário:**  
1. Após o login, o usuário acessa a **Administração de Planos de Aula**.
2. A página exibe:
   - Lista de todos os planos de aulas do usuário logado com título, código, ano/série, componente e etapa.
   - Um botão para **criar** um plano de aula.
   - Um campo de **busca** para filtrar o plano de aula por palavras-chave (título).
   - Um botão para **visualizar** um plano de aula específico.
   - Um botão para **editar** um plano de aula específico.
   - Um botão para **excluir** um plano de aula específico.

### **3. Página de Criação de um plano de aula**
**Objetivo:** Permitir que docentes criem o plano de aula.  
#### **Passos do Usuário:**  
1. Após login, o professor acessa a página **Administração de Postagens**.
2. Clica em "Criar Plano de aula".
3. Seleciona no formulário:
   - **Ano/Série**
   - **Componente Curricular**
   - **Descrição (Habilidades BNCC):**
4. Clica no botão **Gerar Plano Aula**.
5. Se o plano aula for criado com sucesso, o sistema exibe uma mensagem de confirmação.
6. O sistema redireciona automaticamente para a página **Página de Leitura do plano de aula**.

### **4. Página de Leitura do plano de aula**
**Objetivo:** Exibir o conteúdo completo de um plano de aula.
#### **Passos do Usuário:**  
1. Selecionar um plano de "Clique no botão visualizar" **Administração de Planos de Aula**.
2. A página do plano de aula carregará:
   - Título
   - Duração Total
   - Componente Curricular
   - Ano/Série
   - Código BNCC
   - Habilidade BNCC
   - Recursos Gerais
   - Detalhes do Plano
   - Avaliação
   - Aulas Planejadas
    - Atividades por Aula
3. Clica em Início para retornar à **Administração de Planos de Aula**.

### **5. Página de Criação de um plano de aula**
**Objetivo:** Permitir que docentes criem o plano de aula.  
#### **Passos do Usuário:**  
1. Após login, o professor acessa a página **Administração de Planos de Aula**.
2. Clica em "Criar Plano de aula".
3. Seleciona no formulário:
   - **Ano/Série**
   - **Componente Curricular**
   - **Descrição (Habilidades BNCC):**
4. Clica no botão **Gerar Plano Aula**
5. Se o plano aula for criado com sucesso, o sistema exibe uma mensagem de confirmação.
6. O sistema redireciona automaticamente para a página **Página de Leitura do plano de aula**.


### **6. Página de Edição de um plano de aula**
**Objetivo:** Permitir que docentes editem o plano de aula específico.  
#### **Passos do Usuário:**  
1. Após login, o professor acessa a página **Administração de Planos de Aula**.
2. Clica em "Editar" de um plano de aula específico.
3. Edita no formulário:
   - **Editar Recursos Gerais** incluir/excluir
   - **Editar Detalhes do Plano** editor markdow
   - **Editar Avaliação**
   - **Editar Aulas Planejadas** 
    - Título
    - Objetivo
   - **Atividades** 
    - Etapa
    - Descrição
4. Clica no botão **Salvar Aulterações**.
5. Se o plano aula for autalizado com sucesso, o sistema exibe uma mensagem de confirmação.
6. O sistema redireciona automaticamente para a página **Página de Leitura do plano de aula**.

3. Caso deseje excluir um plano de aula, clica no respectivo botão **Excluir**.


### **6. Página Administrativa** (Apenas para professores)
**Objetivo:** Gerenciar postagens.  
#### **Passos do Usuário:**  
1. O professor acessa a página **Administração de Postagens** clicando no menu "Administração".
2. Visualiza todas as postagens.
3. Caso deseje editar um post, clica no respectivo botão **Editar**.
4. Modifica os campos desejados e clica em **Salvar Alterações**.
5. O sistema atualiza a postagem, exibe uma mensagem de sucesso e retorna automaticamente para a página **Administração de Postagens**.

7. O sistema remove a postagem e exibe uma mensagem de sucesso.

### **7. Logout**
**Objetivo:** Encerrar a sessão do usuário.  
#### **Passos do Usuário:**  
1. Em qualquer página, o usuário pode clicar em **Logout**.
2. O sistema remove o token de autenticação e redireciona para a **Página de Login**.

---