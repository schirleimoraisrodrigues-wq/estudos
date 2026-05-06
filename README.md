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

Se o seu terminal tiver variáveis de proxy inválidas e o `npm install` retornar `403 Forbidden`, limpe `HTTP_PROXY`, `HTTPS_PROXY`, `npm_config_http_proxy` e `npm_config_https_proxy` antes de rodar o comando. O projeto também inclui `.npmrc` para fixar o registry público do npm no escopo do repositório.

## Publicando no GitHub Pages

Este projeto inclui um workflow em `.github/workflows/deploy-pages.yml` que compila o Vite, envia um único artifact `github-pages` e publica o app pelo GitHub Pages.

1. No GitHub, abra **Settings > Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions**.
3. Faça push para `work` ou `main` ou execute o workflow **Deploy StudyQuest to GitHub Pages** manualmente.

A aplicação usa `HashRouter`, caminhos relativos no Vite (`base: "./"`) e `.nojekyll` no build para evitar página em branco por assets não encontrados e para impedir processamento Jekyll dos arquivos gerados.

### Solução de problemas

- Se aparecer `Multiple artifacts named "github-pages"`, execute o workflow mais recente. Ele remove artifacts `github-pages` antigos antes do upload e também mantém apenas o artifact mais recente imediatamente antes do deploy, evitando conflito no `actions/deploy-pages@v5` mesmo quando você reexecuta apenas o job de deploy.
- Se a página publicada ficar em branco ou mostrar 404, confirme que **Settings > Pages > Build and deployment > Source** está como **GitHub Actions** e aguarde o workflow terminar com sucesso.
- A pasta `docs/` fica apenas como fallback para configurações antigas que apontem para `/docs`; o app React completo é publicado pelo workflow do GitHub Actions.
