# Desenvolvimento

Este é o guia de quem mexe no repositório. Quem só usa a biblioteca precisa
apenas do [README do pacote](packages/ui/README.md).

O código não tem comentários de implementação. O que não é óbvio e custa caro
redescobrir está em [ARCHITECTURE.md](ARCHITECTURE.md), apontando para o teste
que prende cada decisão quando ele existe.

## Rodar

```bash
pnpm storybook       # componentes e telas na web
pnpm site            # documentação
pnpm native          # demo React Native (Expo)
pnpm check           # nomenclatura + typecheck
pnpm check:package   # build + verificação da embalagem publicável
node scripts/metrics.mjs
```

## Publicação

O build sai com `tsup`: três entradas independentes (`web`, `native`,
`tokens`), ESM e CJS, tipos e um `.css` extraído. São independentes de
propósito — empacotar junto faria um app web baixar código de React Native.

Em desenvolvimento os apps do monorepo consomem o **fonte** (`exports` aponta
para `src/`), então o HMR funciona sem passo de build. Na hora de publicar o
pnpm troca esses caminhos pelos de `dist/` via `publishConfig.exports`. Por
isso o publish precisa ser `pnpm publish`, e não `npm publish` — só o pnpm
aplica essa substituição.

`scripts/check-package.mjs` valida a *embalagem*, que é outra coisa do que o
typecheck valida: confere os campos obrigatórios, que cada caminho do
`publishConfig.exports` exista depois do build, e que os bundles ESM e CJS
carreguem de verdade.

O release é automático: `git tag v0.1.0 && git push --tags` dispara o workflow,
que confere se a tag bate com o `package.json`, roda os mesmos checks do CI e
publica com provenance. Requer o secret `NPM_TOKEN` no repositório.

### Cadência de versão

Enquanto o pacote está em validação, cada release sobe o **patch**:

```bash
pnpm version:patch                      # 0.1.0 -> 0.1.1, só o package.json
git commit -am "chore: v0.1.1"
git tag v0.1.1 && git push --tags       # dispara o release
```

O bump não cria tag nem commit sozinho de propósito — a tag é a fonte da
verdade do workflow, e criá-la é o gesto que publica.

Isso muda quando existirem consumidores. `^0.1.0` instala patches
automaticamente e trava o minor, então uma quebra publicada como patch chega
sozinha em quem já instalou. A partir daí, quebra sobe o minor
(`pnpm version:minor`) e o patch fica para correção compatível.
