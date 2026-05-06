# StudyQuest

StudyQuest é uma plataforma pessoal de organização e gamificação de estudos criada com React, Vite, Tailwind CSS, React Router e persistência temporária em LocalStorage.

## Recursos

- Cadastro e login locais para proteger as páginas internas.
- Dashboard com XP, nível, sequência, prioridades, próximas tarefas, provas e calendário mensal clicável.
- CRUD de matérias, provas e tarefas/atividades.
- Página de detalhes por matéria com abas internas de conteúdos, tarefas, provas, questões e desempenho.
- Banco de questões com registro de resposta, acerto/erro e confiança percebida.
- Cálculos separados para prioridade, desempenho e XP.
- Gamificação com XP, níveis, conquistas, sequência e progresso por matéria.
- Tema claro/escuro persistido no LocalStorage.

## Rodando

```bash
npm install
npm run dev
```

## Publicando no GitHub Pages

Este projeto inclui um workflow em `.github/workflows/deploy-pages.yml` que compila o Vite e publica a pasta `dist` no GitHub Pages.

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions**.
3. Faça push para `work` ou `main` ou execute o workflow manualmente.

A aplicação usa `HashRouter` e um `404.html` de fallback para evitar erro 404 ao abrir ou recarregar rotas internas no GitHub Pages.

Se o GitHub Pages ainda estiver configurado como **Deploy from a branch** usando a pasta `/docs`, a pasta `docs/` deste repositório evita a falha de Jekyll `No such file or directory @ dir_chdir - /github/workspace/docs`. Mesmo assim, para publicar o app React completo, use **GitHub Actions** como fonte do Pages.
