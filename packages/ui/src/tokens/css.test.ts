import { describe, expect, it } from 'vitest';
import { createTheme, defaultThemeConfig } from './config';
import { DEFAULT_THEME, generateThemeCSS, selectorFor } from './css';

// A augmentation mora no app que cria a intenção — aqui o app é o teste.
declare module './palette' {
  interface CustomIntents {
    brand: true;
  }
}

// O CSS gerado é o contrato inteiro da web: componente nenhum tem cor própria,
// tudo aponta para `var(--haquick-*)`. Como sai de função pura, dá para travar aqui
// o que só se via medindo no navegador — e o que já quebrou antes: sombra
// idêntica nos dois schemes, intenção nova sem regra, e a ordem dos blocos, da
// qual a especificidade depende.

const css = () => generateThemeCSS();

function bloco(source: string, selector: string): string {
  const i = source.indexOf(`${selector} {`);
  if (i === -1) throw new Error(`bloco ${selector} não existe no CSS gerado`);
  return source.slice(i, source.indexOf('}', i));
}

describe('seletores', () => {
  it('põe o tema padrão em :root e o escuro só no atributo de scheme', () => {
    expect(selectorFor(DEFAULT_THEME, 'light', DEFAULT_THEME)).toBe(':root');
    expect(selectorFor(DEFAULT_THEME, 'dark', DEFAULT_THEME)).toBe('[data-scheme="dark"]');
  });

  it('não dá bloco keyed ao tema padrão', () => {
    // Se desse, os dois empatariam em especificidade e o keyed, vindo depois,
    // venceria o bloco escuro — o tema padrão nunca escureceria.
    expect(css()).not.toContain(`[data-theme="${DEFAULT_THEME}"]`);
  });

  it('qualifica o tema nomeado com os dois atributos no escuro', () => {
    expect(selectorFor('natal', 'light', DEFAULT_THEME)).toBe('[data-theme="natal"]');
    expect(selectorFor('natal', 'dark', DEFAULT_THEME)).toBe(
      '[data-theme="natal"][data-scheme="dark"]'
    );
  });

  it('emite o tema padrão antes dos nomeados', () => {
    // `[data-theme="natal"]` e `[data-scheme="dark"]` empatam em
    // especificidade, então quem vier depois vence. A ordem é o que faz o
    // theme nomeado claro ganhar do escuro padrão.
    const source = generateThemeCSS(
      { default: defaultThemeConfig, natal: createTheme({ colors: { primary: '#C8102E' } }) },
      'default'
    );
    expect(source.indexOf('[data-scheme="dark"] {')).toBeLessThan(
      source.indexOf('[data-theme="natal"] {')
    );
  });
});

describe('scheme', () => {
  it('declara color-scheme nos dois blocos', () => {
    // É o que faz o navegador desenhar scrollbar e controles nativos certos.
    expect(bloco(css(), ':root')).toContain('color-scheme: light;');
    expect(bloco(css(), '[data-scheme="dark"]')).toContain('color-scheme: dark;');
  });

  it('emite a geometria uma vez por tema, e não por scheme', () => {
    expect(bloco(css(), ':root')).toContain('--haquick-radiusLg:');
    expect(bloco(css(), '[data-scheme="dark"]')).not.toContain('--haquick-radiusLg:');
  });
});

describe('sombra', () => {
  it('inverte a cor entre claro e escuro', () => {
    // O bug original: a cor era um preto fixo no código e a sombra saía
    // idêntica nos dois temas, sumindo no escuro.
    expect(bloco(css(), ':root')).toContain('--haquick-shadow-3: 0 4px 14px rgba(11,11,12,');
    expect(bloco(css(), '[data-scheme="dark"]')).toContain(
      '--haquick-shadow-3: 0 4px 14px rgba(255,255,255,'
    );
  });

  it('aplica o fator de opacidade do scheme', () => {
    const forte = generateThemeCSS({
      [DEFAULT_THEME]: createTheme({ shadows: { opacityScale: { light: 1, dark: 0.5 } } }),
    });
    // 0.1 de opacidade no nível 3, vezes 0.5.
    expect(bloco(forte, '[data-scheme="dark"]')).toContain('rgba(255,255,255,0.05)');
  });

  it('respeita intensity: 0 desligando tudo', () => {
    const sem = generateThemeCSS({ [DEFAULT_THEME]: createTheme({ shadows: { intensity: 0 } }) });
    expect(sem).toContain('--haquick-shadow-3: 0 0px 0px');
  });
});

describe('cores por scheme', () => {
  const theme = createTheme({
    colors: { primary: '#C8102E' },
    schemes: { dark: { colors: { primary: '#F2617A' } } },
  });

  it('usa a cor do scheme quando ela existe', () => {
    const source = generateThemeCSS({ [DEFAULT_THEME]: theme });
    expect(bloco(source, ':root')).toContain('--haquick-primary: #C8102E;');
    expect(bloco(source, '[data-scheme="dark"]')).toContain('--haquick-primary: #F2617A;');
  });

  it('deriva os slots da cor daquele scheme, não da de fora', () => {
    // Se herdasse os derivados, o contraste do texto sobre o botão continuaria
    // calculado para a outra cor — que é o que torna o override inútil.
    const dark = theme.themes.dark as unknown as Record<string, string>;
    const light = theme.themes.light as unknown as Record<string, string>;
    expect(dark.primaryContrastText).toBeTruthy();
    expect(dark.primarySoft).not.toBe(light.primarySoft);
  });
});

describe('intenções', () => {
  it('gera regra para intenção criada pelo app', () => {
    // Escritas à mão, as regras cobriam só as embutidas: o `data-intent` era
    // renderizado, nenhuma regra casava e o componente saía sem cor.
    const source = generateThemeCSS({
      [DEFAULT_THEME]: createTheme({ colors: { brand: '#DB2777' } }),
    });
    expect(source).toContain('.haquick-btn[data-intent="brand"]');
    expect(source).toContain('--i-soft-text: var(--haquick-brandSoftText);');
  });

  it('cobre intenção que só existe num dos schemes', () => {
    const source = generateThemeCSS({
      [DEFAULT_THEME]: createTheme({ schemes: { dark: { colors: { brand: '#DB2777' } } } }),
    });
    expect(source).toContain('.haquick-btn[data-intent="brand"]');
  });

  it('não repete a regra quando dois temas têm a mesma intenção', () => {
    const source = generateThemeCSS({
      default: defaultThemeConfig,
      natal: createTheme({ colors: { primary: '#C8102E' } }),
    });
    expect(source.match(/\.haquick-btn\[data-intent="primary"\]/g)).toHaveLength(1);
  });
});

describe('mapa de temas', () => {
  it('cai no primeiro tema quando o default apontado não existe', () => {
    const source = generateThemeCSS({ natal: createTheme() }, 'inexistente');
    expect(source).toContain(':root {');
    expect(source).not.toContain('[data-theme="natal"]');
  });
});
