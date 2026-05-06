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

Este projeto inclui um workflow em `.github/workflows/deploy-pages.yml` que compila o Vite e publica a pasta `dist` na branch `gh-pages`.

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Em **Branch**, selecione `gh-pages` e a pasta `/ (root)`.
4. Faça push para `work` ou `main` ou execute o workflow manualmente.

A aplicação usa `HashRouter`, caminhos relativos no Vite (`base: "./"`) e `.nojekyll` no build para evitar página em branco por assets não encontrados e para impedir processamento Jekyll dos arquivos gerados.

### Solução de problemas

- Se aparecer `Multiple artifacts named "github-pages"`, o deploy antigo via `actions/deploy-pages` ainda está sendo reexecutado. Este workflow não usa mais artifacts do GitHub Pages; ele publica direto na branch `gh-pages`. Rode o workflow mais recente e configure o Pages para **Deploy from a branch > gh-pages > / (root)**.
- Se a página publicada ficar em branco, limpe o cache do navegador e confirme que a URL está usando a publicação da branch `gh-pages`, não uma execução antiga do Pages por GitHub Actions ou `/docs`.
- A pasta `docs/` fica apenas como fallback para configurações antigas que apontem para `/docs`; o app React completo é publicado pela branch `gh-pages`.
