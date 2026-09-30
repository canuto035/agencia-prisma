# Utilitários da agência

Use PowerShell 7. O coordenador pode executar os utilitários a partir de um pedido natural.

| Utilitário | Resultado |
|---|---|
| Novo-Cliente.ps1 | Cria pastas e treze documentos de contexto, incluindo integrações, governança, inteligência, Higgsfield, mensuração, publicação, atendimento e rentabilidade; preserva versões existentes |
| Inventariar-Ativos.ps1 | Lista ativos com tamanho e hash em inventário versionado; trata pasta vazia e identifica cópias iguais |
| Novo-Projeto.ps1 | Copia a base para pasta nova ou vazia, sem clientes ou históricos de outras marcas |
| Atualizar-Projeto.ps1 | Mostra diferenças e atualiza uma cópia antiga com backup; preserva clientes e configuração local |
| Verificar-Projeto.ps1 | Confere catálogo, seleção automática, referências e sintaxe dos scripts |

Prisma-Caminhos.ps1 é a biblioteca usada pelos quatro utilitários. Caminhos com links de sistema exigem revisão; nomes reservados do Windows são rejeitados. Inventariar metadados não equivale a abrir fotos, ouvir áudio ou verificar direitos de uso.

```powershell
.\scripts\Novo-Cliente.ps1 -Identificador cafe-aurora -NomeExibicao "Café Aurora"
.\scripts\Inventariar-Ativos.ps1 -Cliente cafe-aurora
.\scripts\Novo-Projeto.ps1 -Destino "C:\caminho\para\Novo-Projeto"
.\scripts\Verificar-Projeto.ps1
```

Para atualizar uma cópia em outro computador, entregue o ZIP atualizado da Agência Prisma. O comprador extrai o pacote em **uma pasta separada** e abre essa pasta ou o projeto antigo no Codex. O coordenador pode executar a prévia e aplicar a atualização após conferir que o destino é a cópia certa. O script reconhece também cópias antigas sem catálogo; preserva `clientes/`, `backups/`, arquivos extras e configurações `.codex/` já existentes. Se a configuração local não existir, instala a da base nova. Se houver skills adicionais, interrompe para revisão; mudanças em arquivos da base antiga são guardadas no backup antes da substituição. O ZIP no Drive é uma versão para distribuição, não sincronização automática.

```powershell
.\scripts\Atualizar-Projeto.ps1 -Destino "C:\caminho\do\projeto-antigo"
.\scripts\Atualizar-Projeto.ps1 -Destino "C:\caminho\do\projeto-antigo" -Aplicar
```

Não substitua políticas de execução ou permissões para rodar um script; use o terminal autorizado do projeto.
