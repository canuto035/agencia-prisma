# Utilitários da agência

Use PowerShell 7. O coordenador pode executar os utilitários a partir de um pedido natural.

| Utilitário | Resultado |
|---|---|
| Novo-Cliente.ps1 | Cria pastas e treze documentos de contexto, incluindo integrações, governança, inteligência, Higgsfield, mensuração, publicação, atendimento e rentabilidade; preserva versões existentes |
| Inventariar-Ativos.ps1 | Lista ativos com tamanho e hash em inventário versionado; trata pasta vazia e identifica cópias iguais |
| Novo-Projeto.ps1 | Copia a base para pasta nova ou vazia, sem clientes ou históricos de outras marcas |
| Atualizar-Projeto.ps1 | Mostra diferenças e atualiza uma cópia antiga com backup; preserva clientes e configuração local |
| Ativar-Prisma-No-Projeto.ps1 | Registra a coordenação em um bloco das instruções do projeto em uso; preserva texto, cria backup e permite remover só o próprio bloco |
| Verificar-Projeto.ps1 | Confere catálogo, configuração de seleção implícita, entrada efetiva, referências e sintaxe dos scripts |
| Ativar-Prisma-No-Projeto.Tests.ps1 | Testa ancoragem em projetos fictícios, sem alterar clientes ou integrações |
| client-report/render-report.mjs | Monta HTML local de diagnóstico, antes/proposta e plano do cliente com fontes; não pesquisa nem publica |

Prisma-Caminhos.ps1 é a biblioteca de proteção de caminhos dos utilitários. Caminhos com links de sistema exigem revisão; nomes reservados do Windows são rejeitados. Inventariar metadados não equivale a abrir fotos, ouvir áudio ou verificar direitos de uso.

```powershell
.\scripts\Novo-Cliente.ps1 -Identificador cafe-aurora -NomeExibicao "Café Aurora"
.\scripts\Inventariar-Ativos.ps1 -Cliente cafe-aurora
.\scripts\Novo-Projeto.ps1 -Destino "C:\caminho\para\Novo-Projeto"
.\scripts\Verificar-Projeto.ps1
.\scripts\Ativar-Prisma-No-Projeto.Tests.ps1 -PastaTestes "C:\caminho\para\testes-isolados"
```

Para atualizar uma cópia em outro computador, entregue o ZIP atualizado da Agência Prisma. O comprador extrai o pacote em **uma pasta separada** e abre essa pasta ou o projeto antigo no Codex. O coordenador pode executar a prévia e aplicar a atualização após conferir que o destino é a cópia certa. O script reconhece também cópias antigas sem catálogo; preserva `clientes/`, `backups/`, arquivos extras e configurações `.codex/` já existentes. Se a configuração local não existir, instala a da base nova. Se houver skills adicionais, interrompe para revisão; mudanças em arquivos da base antiga são guardadas no backup antes da substituição. O ZIP no Drive é uma versão para distribuição, não sincronização automática.

```powershell
.\scripts\Atualizar-Projeto.ps1 -Destino "C:\caminho\do\projeto-antigo"
.\scripts\Atualizar-Projeto.ps1 -Destino "C:\caminho\do\projeto-antigo" -Aplicar
```

Não substitua políticas de execução ou permissões para rodar um script; use o terminal autorizado do projeto.

Na primeira ativação global em outro projeto, o coordenador usa internamente `Ativar-Prisma-No-Projeto.ps1 -Projeto <raiz confirmada>`. O utilitário acrescenta ou atualiza apenas o bloco `PRISMA:BEGIN` / `PRISMA:END` em `AGENTS.override.md` quando existir, senão `AGENTS.md`; o texto externo ao bloco e a codificação UTF-8 são preservados. Instruções anteriores ficam em `backups/prisma-ativacao-*`. Bloco incompleto ou duplicado é recusado. Não aplique à instalação compartilhada, à manutenção da base ou a testes como se fossem clientes. Se o usuário pedir desativação no projeto, use `-Desativar`, que remove apenas esse bloco; a pausa de uma entrega não equivale a desativar o método. Sem escrita disponível, retenha o método na conversa e avance no trabalho independente.

O arquivo de instruções ancora o método; a fila do cliente ancora as entregas e autorizações. Nenhum deles cria processo em segundo plano. A descoberta de skills depende da descrição e as instruções do projeto seguem a precedência `AGENTS.override.md` / `AGENTS.md` documentada no [guia oficial do Codex](https://learn.chatgpt.com/docs/agent-configuration/agents-md); mantenha o método disponível também nas [condições de uso da entrada](../SKILL.md).

O atualizador inclui `SKILL.md` e `agents/openai.yaml` da entrada global, além das especialidades. Em cópia de projeto que tenha um `AGENTS.override.md` próprio, a prévia verifica a ancoragem e a aplicação atualiza somente o bloco Prisma desse arquivo, com backup adicional; o restante do override permanece. Instalações compartilhadas da skill não recebem uma âncora de projeto. O verificador estrutural recusa uma entrada efetiva sem encaminhamento, mas somente um teste de conversa pode observar a execução das etapas.

Para apresentação de melhorias em formato de LP, consulte [o gerador de relatório](client-report/README.md). A coordenação coleta evidências e as especialidades criam as propostas; o comando somente organiza esses dados num HTML. Para arquivos finais de carrossel/Stories, siga a criação e exportação do formato, além da apresentação.
