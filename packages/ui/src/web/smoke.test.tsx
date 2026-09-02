// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import * as web from './index';

// Fumaça: monta cada componente exportado uma vez.
//
// Não valida aparência — valida que nenhum deles quebra ao montar, que é o tipo
// de regressão que um refactor de tema ou de tokens causa sem o typecheck
// perceber. O `data-intent` gerado, por exemplo, é montado em runtime.
//
// O último teste é o que dá valor ao arquivo: exige um caso para CADA
// componente exportado. Componente novo sem caso aqui falha a suíte.

afterEach(cleanup);

const columns = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'total', header: 'Total' },
];
const rows = [{ name: 'Ana', total: 10 }];

const CASES: Record<string, ReactElement> = {
  Accordion: (
    <web.Accordion>
      <web.AccordionItem title="Um">conteúdo</web.AccordionItem>
    </web.Accordion>
  ),
  AccordionItem: <web.AccordionItem title="Um">conteúdo</web.AccordionItem>,
  Alert: <web.Alert title="Atenção">texto</web.Alert>,
  AuthTemplate: <web.AuthTemplate title="Entrar">campos</web.AuthTemplate>,
  Avatar: <web.Avatar initials="AS" label="Ana Silva" />,
  Badge: <web.Badge>novo</web.Badge>,
  BottomSheet: <web.BottomSheet open={false} onOpenChange={() => {}} />,
  BottomSheetClose: (
    <web.BottomSheet open onOpenChange={() => {}}>
      <web.BottomSheetClose>fechar</web.BottomSheetClose>
    </web.BottomSheet>
  ),
  BottomSheetProvider: <web.BottomSheetProvider>filho</web.BottomSheetProvider>,
  BottomSheetTrigger: (
    <web.BottomSheet open={false} onOpenChange={() => {}}>
      <web.BottomSheetTrigger>abrir</web.BottomSheetTrigger>
    </web.BottomSheet>
  ),
  Button: <web.Button>ok</web.Button>,
  Card: <web.Card raised={2}>conteúdo</web.Card>,
  CardContent: <web.CardContent>conteúdo</web.CardContent>,
  CardFooter: <web.CardFooter>rodapé</web.CardFooter>,
  CardHeader: (
    <web.CardHeader>
      <web.CardTitle>Título</web.CardTitle>
    </web.CardHeader>
  ),
  CardMedia: <web.CardMedia src="/x.png" alt="x" />,
  CardTitle: <web.CardTitle>Título</web.CardTitle>,
  ChatTemplate: <web.ChatTemplate title="Agente">conversa</web.ChatTemplate>,
  Checkbox: <web.Checkbox label="aceito" />,
  Chip: <web.Chip>tag</web.Chip>,
  Collapse: <web.Collapse open>conteúdo</web.Collapse>,
  Composer: <web.Composer onSend={() => {}} placeholder="Escreva" />,
  DashboardTemplate: (
    <web.DashboardTemplate title="Painel" stats={[{ label: 'Total', value: '10' }]}>
      conteúdo
    </web.DashboardTemplate>
  ),
  DataTable: <web.DataTable data={rows} columns={columns} />,
  DetailTemplate: <web.DetailTemplate title="Item">conteúdo</web.DetailTemplate>,
  Dialog: <web.Dialog open={false} onOpenChange={() => {}} title="Oi" />,
  DialogClose: (
    <web.Dialog open onOpenChange={() => {}} title="Oi">
      <web.DialogClose>fechar</web.DialogClose>
    </web.Dialog>
  ),
  DialogTrigger: (
    <web.Dialog open={false} onOpenChange={() => {}} title="Oi">
      <web.DialogTrigger>abrir</web.DialogTrigger>
    </web.Dialog>
  ),
  Divider: <web.Divider />,
  EmptyState: <web.EmptyState title="Nada aqui" />,
  Fade: <web.Fade visible>conteúdo</web.Fade>,
  Grid: (
    <web.Grid container spacing={2}>
      <web.Grid size={{ xs: 12, md: 6 }}>coluna</web.Grid>
    </web.Grid>
  ),
  HelperText: <web.HelperText>ajuda</web.HelperText>,
  IconButton: <web.IconButton label="fechar">x</web.IconButton>,
  Input: <web.Input placeholder="nome" />,
  Label: <web.Label>Nome</web.Label>,
  Link: <web.Link href="/x">link</web.Link>,
  List: (
    <web.List>
      <web.ListItem title="um" />
    </web.List>
  ),
  ListItem: <web.ListItem title="um" />,
  ListTemplate: <web.ListTemplate title="Lista">conteúdo</web.ListTemplate>,
  Message: <web.Message role="user">oi</web.Message>,
  MessageList: (
    <web.MessageList>
      <web.Message role="user">oi</web.Message>
    </web.MessageList>
  ),
  PageHeader: <web.PageHeader title="Página" />,
  Progress: <web.Progress value={40} />,
  Radio: <web.Radio value="a" label="A" />,
  RadioGroup: (
    <web.RadioGroup value="a" onValueChange={() => {}}>
      <web.Radio value="a" label="A" />
    </web.RadioGroup>
  ),
  Screen: <web.Screen>conteúdo</web.Screen>,
  Skeleton: <web.Skeleton />,
  Spacer: <web.Spacer size="md" />,
  Spinner: <web.Spinner />,
  Stack: <web.Stack gap={2}>conteúdo</web.Stack>,
  StatCard: <web.StatCard label="Total" value="10" />,
  Suggestions: <web.Suggestions items={['a']} onSelect={() => {}} />,
  Switch: <web.Switch label="ligado" />,
  ThemeProvider: <web.ThemeProvider>filho</web.ThemeProvider>,
  Timeline: (
    <web.Timeline>
      <web.TimelineItem title="um" />
    </web.Timeline>
  ),
  TimelineItem: <web.TimelineItem title="um" />,
  ToolCall: <web.ToolCall name="busca" />,
  Tooltip: (
    <web.Tooltip label="dica">
      <web.Button>alvo</web.Button>
    </web.Tooltip>
  ),
  TypingIndicator: <web.TypingIndicator />,
  Typography: <web.Typography variant="h6">título</web.Typography>,
  XStack: <web.XStack gap={2}>conteúdo</web.XStack>,
  YStack: <web.YStack gap={2}>conteúdo</web.YStack>,
};

describe('monta sem quebrar', () => {
  for (const [name, element] of Object.entries(CASES)) {
    it(name, () => {
      expect(() => render(element)).not.toThrow();
    });
  }
});

describe('o essencial chega ao DOM', () => {
  it('Button vira <button> com a classe e a intenção', () => {
    render(<web.Button intent="success">salvar</web.Button>);
    const button = screen.getByRole('button', { name: 'salvar' });
    expect(button.className).toContain('haquick-btn');
    expect(button.getAttribute('data-intent')).toBe('success');
  });

  it('Typography vira a tag semântica da variante', () => {
    render(<web.Typography variant="h2">título</web.Typography>);
    expect(screen.getByRole('heading', { level: 2 })).toBeTruthy();
  });

  it('Link com href vira <a>', () => {
    render(<web.Link href="/x">ir</web.Link>);
    expect(screen.getByRole('link').getAttribute('href')).toBe('/x');
  });

  it('o tema entra no <head> mesmo sem provider', () => {
    render(<web.Button>ok</web.Button>);
    // Em jsdom não há CSS importado, então o injetor de runtime precisa agir —
    // é o mesmo caminho de quem consome só o JS.
    expect(document.querySelector('style[data-haquick-theme]')).toBeTruthy();
  });
});

describe('cobertura', () => {
  it('tem um caso para cada componente exportado', () => {
    const exportados = Object.entries(web)
      .filter(([name, value]) => /^[A-Z][A-Za-z0-9]*$/.test(name) && typeof value === 'function')
      .map(([name]) => name)
      .sort();
    const semCaso = exportados.filter((name) => !(name in CASES));
    expect(semCaso, `sem caso de fumaça: ${semCaso.join(', ')}`).toEqual([]);
  });
});
