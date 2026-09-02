import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(new URL('../packages/ui/package.json', import.meta.url));
const ts = req('typescript');

const IGNORED = new Set(['node_modules', '.git', 'dist', 'storybook-static', '.tamagui', '.vite']);
const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    IGNORED.has(e.name) ? [] : e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]
  );

const WORDS = [
  'acao', 'acoes', 'alinhamento', 'altura', 'ancora', 'ancoras', 'aplicar', 'arquivo',
  'arquivos', 'atual', 'busca', 'buscar', 'caixa', 'campo', 'chave', 'codigo', 'conteudo',
  'cor', 'cores', 'descricao', 'duracao', 'duracoes', 'enviar', 'escolha', 'espaco',
  'estilo', 'estilos', 'fechar', 'fundo', 'geometria', 'grupo', 'grupos', 'imagem',
  'inativo', 'indice', 'itens', 'largura', 'linha', 'linhas', 'ligado', 'marcado',
  'medidas', 'mensagem', 'mensagens', 'montado', 'navegar', 'nome', 'nomes', 'opcao',
  'opcoes', 'pagina', 'passo', 'plataforma', 'preenchido', 'preenchimento', 'pressionado',
  'raio', 'raios', 'rota', 'rotulo', 'secao', 'secoes', 'selecionar', 'sombra', 'sombras',
  'tamanho', 'tema', 'temas', 'texto', 'titulo', 'transparente', 'valor', 'valores',
  'velocidade', 'visivel', 'aberto', 'fechado', 'primeiro', 'ultimo', 'anterior', 'proximo',
  'borda', 'bordas', 'destaque', 'injetado', 'reaproveitado', 'animada', 'pensando',
  'botao', 'botoes', 'caixas', 'carregando', 'centralizada', 'composicao', 'conversa',
  'desabilitado', 'desmontando', 'detalhe', 'dialogo', 'elevacao', 'estado', 'estados',
  'exclusivo', 'intencao', 'intencoes', 'lista', 'listas', 'nova', 'novo', 'padrao',
  'tamanhos', 'tela', 'vazio', 'coluna', 'colunas', 'sufixo', 'prefixo',
];
const NORM = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const SET = new Set(WORDS);

const wordsOf = (id) =>
  id
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[\s_]+/)
    .filter(Boolean);

const found = [];
for (const f of walk('.')) {
  if (!/\.(tsx?|mjs)$/.test(f)) continue;
  const src = readFileSync(f, 'utf8');
  const kind = f.endsWith('.tsx') ? ts.ScriptKind.TSX : f.endsWith('.mjs') ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, kind);

  const visit = (n) => {
    if (ts.isIdentifier(n)) {
      const bad = wordsOf(n.text).filter((p) => SET.has(NORM(p)));
      if (bad.length > 0) {
        const { line } = sf.getLineAndCharacterOfPosition(n.getStart());
        found.push(`${f.replace(/^\.[\\/]/, '')}:${line + 1}  ${n.text}`);
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
}

const unique = [...new Set(found)];
for (const a of unique) console.log(a);

if (unique.length > 0) {
  console.log(`\n${unique.length} identificador(es) fora do padrão inglês`);
  process.exit(1);
}
console.log('nomenclatura ok: nenhum identificador em português');
