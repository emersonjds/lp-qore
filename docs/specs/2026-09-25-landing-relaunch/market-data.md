# Dados de mercado da landing

Todo número de mercado da página tem fonte e data visíveis logo abaixo dele. Copy aprovada pelo owner em 26/09/2026. Onde aparecem: faixa de números do Problema (`src/config/market-numbers.ts`), lead do Antes e depois (7.650) e banners de CTA (R$ 33 bi e R$ 42,4 bi, em `ctaBanners` de `src/config/home-content.ts`).

| Dado | Valor | Período | Fonte | URL |
| --- | --- | --- | --- | --- |
| Pregões eletrônicos publicados em SP | 7.650 | 26/08 a 25/09/2026 | PNCP — API de consulta | https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?dataInicial=20260826&dataFinal=20260925&codigoModalidadeContratacao=6&uf=SP&pagina=1&tamanhoPagina=10 |
| Compras do Governo do Estado de SP por ano | R$ 33 bi | consulta em 26/09/2026 | Portal de Compras do Governo de SP | https://compras.sp.gov.br/institucional/ |
| Vendas de pequenos negócios ao governo | R$ 42,4 bi | 2022 (publicado em 2023) | Agência Sebrae de Notícias | https://agenciasebrae.com.br/dados/vendas-confirmadas-dos-pequenos-negocios-para-o-governo-ultrapassam-r-17-bilhoes-em-2023/ |
| Compras públicas sobre o PIB | 12% do PIB | 2019 | IPEA | https://repositorio.ipea.gov.br/entities/publication/4230e7f3-90b0-4582-9f8e-0f8e8ae0beb9 |

## Como atualizar o número do PNCP

Pregão eletrônico é a modalidade 6. Troque as datas pela janela de 30 dias que termina na véspera e leia `totalRegistros` da resposta:

```bash
curl -s "https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?dataInicial=AAAAMMDD&dataFinal=AAAAMMDD&codigoModalidadeContratacao=6&uf=SP&pagina=1&tamanhoPagina=10" | jq .totalRegistros
```

Atualize o `value` e o `date` do primeiro item de `market-numbers.ts`, o número do lead em `timeSavedContent.description` e os testes que citam o valor.

## Dados que não entram na página (sem fonte)

- Percentual de desclassificação de propostas
- Tempo médio de leitura ou preparo de edital
- Número médio de participantes por pregão
- Quantidade de vencedores cadastrados no SICAF
