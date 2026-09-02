import type { ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  HelperText,
  IconButton,
  Input,
  Label,
  Link,
  List,
  ListItem,
  Progress,
  Radio,
  RadioGroup,
  Skeleton,
  Spacer,
  Spinner,
  Switch,
  Accordion,
  AccordionItem,
  BottomSheet,
  DataTable,
  Dialog,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapse,
  Fade,
  Grid,
  Timeline,
  TimelineItem,
  Tooltip,
  Typography,
  XStack,
  YStack,
} from 'haquick/web';
import { useState } from 'react';
import type { ColumnDef } from 'haquick/web';
import { CodeBlock } from '../../components/CodeBlock';
import { Section } from '../../components/Section';

function Demo({
  id,
  name,
  description,
  code,
  children,
}: {
  id: string;
  name: string;
  description: string;
  code: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <YStack gap={2}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" intent="neutral">
          {description}
        </Typography>
        <Card raised={1} gap={3}>
          <XStack gap={3} wrap align="center">
            {children}
          </XStack>
        </Card>
        <CodeBlock>{code}</CodeBlock>
      </YStack>
    </section>
  );
}

export function ActionSection() {
  return (
    <Section
      title="Ação"
      subtitle="Dois eixos se repetem: intent (a cor semântica) e variant (o preenchimento). São independentes — intent error com variant outline dá um botão de borda vermelha, não um botão vermelho."
    >
      <YStack gap={6}>
        <Demo
          id="button"
          name="Button"
          description="variant solid/soft/outline/ghost × intent × size, mais loading, startIcon/endIcon e fullWidth."
          code={`<Button intent="primary">Confirmar</Button>
<Button variant="soft" intent="success">Aprovar</Button>
<Button variant="outline" intent="error">Excluir</Button>
<Button variant="ghost" intent="neutral">Cancelar</Button>
<Button loading>Salvando</Button>`}
        >
          <Button intent="primary">Confirmar</Button>
          <Button variant="soft" intent="success">
            Aprovar
          </Button>
          <Button variant="outline" intent="error">
            Excluir
          </Button>
          <Button variant="ghost" intent="neutral">
            Cancelar
          </Button>
          <Button loading>Salvando</Button>
        </Demo>

        <Demo
          id="icon-button"
          name="IconButton"
          description="Botão só de ícone. label é obrigatório: é o texto que o leitor de tela anuncia."
          code={`<IconButton label="Editar" variant="outline" intent="primary">✎</IconButton>
<IconButton label="Excluir" variant="solid" intent="error">✕</IconButton>`}
        >
          <IconButton label="Fechar">✕</IconButton>
          <IconButton label="Editar" variant="outline" intent="primary">
            ✎
          </IconButton>
          <IconButton label="Excluir" variant="solid" intent="error">
            ✕
          </IconButton>
        </Demo>

        <Demo
          id="link"
          name="Link"
          description="Com href renderiza uma âncora na web; no React Native, use onPress."
          code={`<Link href="https://www.radix-ui.com/primitives">Radix</Link>
<Link intent="error" underline="always">Cancelar assinatura</Link>`}
        >
          <Link href="https://www.radix-ui.com/primitives">Radix</Link>
          <Link intent="error" underline="always">
            Cancelar assinatura
          </Link>
        </Demo>
      </YStack>
    </Section>
  );
}

export function FormSection() {
  return (
    <Section title="Formulário" subtitle="">
      <YStack gap={6}>
        <Demo
          id="input"
          name="Input"
          description="API normalizada: onChangeText, secure e inputMode valem nas duas plataformas."
          code={`<Input placeholder="voce@empresa.com" inputMode="email" />
<Input secure placeholder="Senha" />
<Input error defaultValue="inválido" />`}
        >
          <YStack width={240} gap={2}>
            <Input placeholder="voce@empresa.com" inputMode="email" />
            <Input secure defaultValue="senha" />
            <Input error defaultValue="inválido" />
          </YStack>
        </Demo>

        <Demo
          id="label"
          name="Label + HelperText"
          description="Os dois átomos que completam um campo: rótulo com required e mensagem de ajuda ou de erro."
          code={`<Label required>E-mail</Label>
<Input placeholder="voce@empresa.com" error />
<HelperText error>Informe um e-mail válido.</HelperText>`}
        >
          <YStack width={260} gap={1}>
            <Label required>E-mail</Label>
            <Input placeholder="voce@empresa.com" error />
            <HelperText error>Informe um e-mail válido.</HelperText>
          </YStack>
        </Demo>

        <Demo
          id="controls"
          name="Checkbox, Radio e Switch"
          description="Funcionam controlados ou não-controlados. O Checkbox tem estado indeterminate."
          code={`<Checkbox label="Aceito" defaultChecked />
<Checkbox label="Parcial" indeterminate />
<Switch label="Notificações" checked={on} onCheckedChange={setOn} />

<RadioGroup defaultValue="pix" direction="row">
  <Radio value="pix" label="Pix" />
  <Radio value="boleto" label="Boleto" />
</RadioGroup>`}
        >
          <YStack gap={3}>
            <Checkbox label="Aceito" defaultChecked />
            <Checkbox label="Parcial" indeterminate />
            <Switch label="Notificações" defaultChecked />
            <RadioGroup defaultValue="pix" direction="row">
              <Radio value="pix" label="Pix" />
              <Radio value="boleto" label="Boleto" />
            </RadioGroup>
          </YStack>
        </Demo>
      </YStack>
    </Section>
  );
}

export function DataSection() {
  return (
    <Section title="Exibição de dados" subtitle="">
      <YStack gap={6}>
        <Demo
          id="badge-chip"
          name="Badge e Chip"
          description="Badge é status estático. Chip é a versão interativa: clicável (onPress) e removível (onRemove)."
          code={`<Badge intent="success">Ativo</Badge>
<Chip intent="primary" onRemove={() => {}}>tag</Chip>`}
        >
          <Badge intent="success">Ativo</Badge>
          <Badge intent="warning">Pendente</Badge>
          <Chip intent="primary" onRemove={() => {}}>
            haquick
          </Chip>
          <Chip variant="solid" intent="secondary">
            design-system
          </Chip>
        </Demo>

        <Demo
          id="avatar"
          name="Avatar"
          description="Imagem via src ou iniciais. Na web renderiza uma tag img; no native, o Image do React Native."
          code={`<Avatar initials="AS" />
<Avatar size="lg" initials="CN" intent="success" />`}
        >
          <Avatar size="sm" initials="AS" />
          <Avatar initials="BC" intent="secondary" />
          <Avatar size="lg" initials="CN" intent="success" />
        </Demo>

        <Demo
          id="list"
          name="List e ListItem"
          description="Lista com slots leading e trailing."
          code={`<List>
  <ListItem
    title="Ana Silva"
    subtitle="ana@empresa.com"
    leading={<Avatar size="sm" initials="AS" />}
    trailing={<Badge intent="success">Ativo</Badge>}
  />
</List>`}
        >
          <List width={320}>
            <ListItem
              title="Ana Silva"
              subtitle="ana@empresa.com"
              leading={<Avatar size="sm" initials="AS" />}
              trailing={<Badge intent="success">Ativo</Badge>}
            />
            <ListItem
              title="Bruno Costa"
              subtitle="bruno@empresa.com"
              leading={<Avatar size="sm" initials="BC" />}
              trailing={<Badge intent="warning">Pendente</Badge>}
            />
          </List>
        </Demo>

        <Demo
          id="timeline"
          name="Timeline"
          description="Linha do tempo com marcador e conector. Use TimelineItem dentro de Timeline: o último item não desenha o conector."
          code={`<Timeline>
  <TimelineItem intent="success" title="Pedido criado" subtitle="10:32" />
  <TimelineItem intent="primary" title="Em separação" subtitle="11:05" />
  <TimelineItem intent="neutral" variant="outlined" title="A caminho" />
</Timeline>`}
        >
          <YStack width={300}>
            <Timeline>
              <TimelineItem intent="success" title="Pedido criado" subtitle="10:32" />
              <TimelineItem intent="primary" title="Em separação" subtitle="11:05" />
              <TimelineItem intent="neutral" variant="outlined" title="A caminho" />
            </Timeline>
          </YStack>
        </Demo>
      </YStack>
    </Section>
  );
}

export function FeedbackSection() {
  return (
    <Section title="Feedback" subtitle="">
      <YStack gap={6}>
        <Demo
          id="alert"
          name="Alert"
          description="Mensagem com title, corpo e slots icon/action. Variantes outline, soft e solid."
          code={`<Alert intent="success" variant="soft" title="Publicado">
  A versão 2.1 já está no ar.
</Alert>`}
        >
          <YStack gap={2} width="100%">
            <Alert intent="success" variant="soft" title="Publicado">
              A versão 2.1 já está no ar.
            </Alert>
            <Alert intent="error" title="Falha no envio">
              Não conseguimos processar o arquivo.
            </Alert>
          </YStack>
        </Demo>

        <Demo
          id="loading"
          name="Spinner, Progress e Skeleton"
          description="Spinner para carregamento sem percentual; Progress quando há valor conhecido; Skeleton como placeholder de conteúdo."
          code={`<Spinner intent="primary" />
<Progress value={65} intent="success" />
<Skeleton variant="text" width="70%" />`}
        >
          <YStack gap={3} width="100%">
            <XStack gap={3} align="center">
              <Spinner intent="primary" />
              <Spinner intent="success" size="lg" />
            </XStack>
            <Progress value={65} intent="success" />
            <Skeleton variant="text" width="70%" />
          </YStack>
        </Demo>
      </YStack>
    </Section>
  );
}

export function LayoutSection() {
  return (
    <Section
      title="Layout"
      subtitle="Primitivos de flexbox. O eixo vem de XStack/YStack; o espaçamento, da prop gap."
    >
      <YStack gap={6}>
        <Demo
          id="stacks"
          name="XStack e YStack"
          description="Atalhos de flexbox com align, justify, wrap e fill. gap e padding são passos da escala de espaçamento, não pixels — a escala é ancorada em 4px."
          code={`<XStack gap={3} align="center" justify="between">
  <Typography>Título</Typography>
  <Button size="sm">Ação</Button>
</XStack>`}
        >
          <YStack width="100%" gap={2}>
            <XStack gap={3} align="center" justify="between" width="100%">
              <Typography variant="subtitle2">Título</Typography>
              <Button size="sm">Ação</Button>
            </XStack>
          </YStack>
        </Demo>

        <Demo
          id="divider-spacer"
          name="Divider e Spacer"
          description="Divider é a linha; Spacer é espaço fixo (size) ou elástico (fill)."
          code={`<Divider />
<XStack align="center">
  <Typography>Início</Typography>
  <Spacer fill />
  <Typography>Fim</Typography>
</XStack>`}
        >
          <YStack width="100%" gap={3}>
            <Divider />
            <XStack align="center" width="100%">
              <Typography variant="body2">Início</Typography>
              <Spacer fill />
              <Typography variant="body2">Fim</Typography>
            </XStack>
          </YStack>
        </Demo>

        <Demo
          id="card"
          name="Card"
          description="Superfície base. A prop raised aceita uma elevação de 0 a 5 da escala de sombras."
          code={`<Card raised={2} gap={3}>...</Card>`}
        >
          {([0, 2, 4] as const).map((n) => (
            <Card key={n} raised={n} width={110}>
              <Typography variant="caption">raised={n}</Typography>
            </Card>
          ))}
        </Demo>

        <Demo
          id="card-parts"
          name="Partes do Card"
          description="CardHeader, CardContent, CardFooter e CardTitle, para quando cabeçalho, corpo e ações precisam de tratamento próprio."
          code={`<Card raised={2}>
  <CardHeader>
    <Avatar initials="AS" />
    <CardTitle subtitle="ana@empresa.com">Ana Silva</CardTitle>
    <Badge intent="success">Ativo</Badge>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter divided justify="end">
    <Button size="sm">Ver perfil</Button>
  </CardFooter>
</Card>`}
        >
          <Card raised={2} width={330}>
            <CardHeader>
              <Avatar initials="AS" />
              <CardTitle subtitle="ana@empresa.com">Ana Silva</CardTitle>
              <Badge intent="success">Ativo</Badge>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" intent="neutral">
                Engenheira de plataforma.
              </Typography>
            </CardContent>
            <CardFooter divided justify="end">
              <Button size="sm">Ver perfil</Button>
            </CardFooter>
          </Card>
        </Demo>
      </YStack>
    </Section>
  );
}

export function WebOnlySection() {
  return (
    <Section
      title="Exclusivo de web"
      subtitle="Componentes que só existem em uma plataforma saem apenas do entry point dela."
    >
      <YStack gap={6}>
      <Demo
        id="grid"
        name="Grid"
        description="Grade de 12 colunas com a API do Grid v2 do MUI: container, size, offset, spacing e columns. size aceita um número ou um valor por breakpoint — xs 0, sm 600, md 900, lg 1200 e xl 1536. Estreite a janela para ver os cortes."
        code={`<Grid container spacing={3}>
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>…</Grid>
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>…</Grid>
  <Grid size={6} offset={{ md: 3 }}>…</Grid>
  <Grid size="grow">…</Grid>

  {/* aninhado: um container também é item */}
  <Grid container spacing={2} size={{ xs: 12, md: 8 }}>
    <Grid size={6}>…</Grid>
    <Grid size={6}>…</Grid>
  </Grid>
</Grid>`}
      >
        <YStack width="100%" gap={4}>
          <Grid container spacing={2}>
            {['12 / 6 / 3', '12 / 6 / 3', '12 / 6 / 3', '12 / 6 / 3'].map((label, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card raised={1} padding={3}>
                  <Typography variant="subtitle2">{label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2}>
            <Grid size={6}>
              <Card raised={1} padding={3}>
                <Typography variant="subtitle2">size 6</Typography>
              </Card>
            </Grid>
            <Grid size={4} offset={2}>
              <Card raised={1} padding={3}>
                <Typography variant="subtitle2">size 4, offset 2</Typography>
              </Card>
            </Grid>
            <Grid size="auto">
              <Card raised={1} padding={3}>
                <Typography variant="subtitle2">auto</Typography>
              </Card>
            </Grid>
            <Grid size="grow">
              <Card raised={1} padding={3}>
                <Typography variant="subtitle2">grow</Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid container spacing={2} size={{ xs: 12, md: 8 }}>
              <Grid size={6}>
                <Card raised={1} padding={3}>
                  <Typography variant="subtitle2">aninhado 6</Typography>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card raised={1} padding={3}>
                  <Typography variant="subtitle2">aninhado 6</Typography>
                </Card>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card raised={1} padding={3}>
                <Typography variant="subtitle2">lateral 4</Typography>
              </Card>
            </Grid>
          </Grid>
        </YStack>
      </Demo>

      <Demo
        id="table"
        name="DataTable"
        description="Ordenação, busca global, paginação e seleção, sobre o TanStack Table. Renderiza um elemento table, com th/scope e aria-sort."
        code={`const columns: ColumnDef<Order>[] = [
  { accessorKey: 'id', header: 'Pedido' },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'total', header: 'Total' },
];

<DataTable data={orders} columns={columns} sortable filterable pageSize={5} />`}
      >
        <YStack width="100%">
          <DataTable label="Pedidos" data={ORDERS} columns={ORDER_COLUMNS} sortable pageSize={3} />
        </YStack>
      </Demo>

      <Demo
        id="tooltip"
        name="Tooltip"
        description="Acionado por hover e por foco de teclado, com o comportamento do Radix."
        code={`import { Tooltip } from 'haquick/web';

<Tooltip label="Salva sem sair da página">
  <Button>Salvar</Button>
</Tooltip>`}
      >
        <Tooltip label="Salva sem sair da página">
          <Button>Salvar</Button>
        </Tooltip>
        <Tooltip label="Aparece abaixo" placement="bottom">
          <Button variant="outline" intent="neutral">
            Abaixo
          </Button>
        </Tooltip>
      </Demo>
      </YStack>
    </Section>
  );
}

type Order = { id: string; customer: string; total: string };

const ORDERS: Order[] = [
  { id: 'PED-1042', customer: 'Ana Silva', total: 'R$ 1.280,50' },
  { id: 'PED-1041', customer: 'Bruno Costa', total: 'R$ 340,00' },
  { id: 'PED-1040', customer: 'Carla Nunes', total: 'R$ 89,90' },
  { id: 'PED-1039', customer: 'Diego Alves', total: 'R$ 2.450,00' },
];

const ORDER_COLUMNS: ColumnDef<Order>[] = [
  { accessorKey: 'id', header: 'Pedido' },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'total', header: 'Total' },
];

export function OverlaySection() {
  const [dialog, setDialog] = useState(false);
  const [sheet, setSheet] = useState(false);

  return (
    <Section
      title="Sobreposição"
      subtitle="Os dois prendem o foco, fecham no Esc e travam a rolagem de fundo. Na web isso vem do Radix; no native, do Modal do React Native e do @gorhom/bottom-sheet."
    >
      <YStack gap={6}>
        <Demo
          id="dialog"
          name="Dialog"
          description="Diálogo centrado. Na web, o Radix cuida do portal, do foco preso, do retorno do foco ao fechar e do par aria-labelledby/aria-describedby."
          code={`<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Excluir projeto"
  description="Esta ação não pode ser desfeita."
  footer={<Button intent="error">Excluir</Button>}
/>`}
        >
          <Button onPress={() => setDialog(true)}>Abrir diálogo</Button>
          <Dialog
            open={dialog}
            onOpenChange={setDialog}
            title="Excluir projeto"
            description="Esta ação não pode ser desfeita."
            footer={
              <>
                <Button variant="ghost" intent="neutral" onPress={() => setDialog(false)}>
                  Cancelar
                </Button>
                <Button intent="error" onPress={() => setDialog(false)}>
                  Excluir
                </Button>
              </>
            }
          />
        </Demo>

        <Demo
          id="bottom-sheet"
          name="BottomSheet"
          description="Folha ancorada à base. No React Native, arraste com inércia e snap points pelo @gorhom/bottom-sheet; na web, um diálogo ancorado à base. A API é a mesma."
          code={`<BottomSheet
  open={open}
  onOpenChange={setOpen}
  title="Filtrar pedidos"
  snapPoints={['50%']}
/>`}
        >
          <Button variant="outline" intent="neutral" onPress={() => setSheet(true)}>
            Abrir folha
          </Button>
          <BottomSheet
            open={sheet}
            onOpenChange={setSheet}
            title="Filtrar pedidos"
            description="As escolhas valem só para esta sessão."
            snapPoints={['50%']}
            footer={<Button onPress={() => setSheet(false)}>Aplicar</Button>}
          >
            <YStack gap={2}>
              <Label>Cliente</Label>
              <Input placeholder="Nome ou e-mail" />
            </YStack>
          </BottomSheet>
        </Demo>
      </YStack>
    </Section>
  );
}

export function MotionSection() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <Section
      title="Movimento"
      subtitle="Transições de CSS na web, Animated no React Native. A API é a mesma: as velocidades quick, medium e slow valem 150, 300 e 450 ms nas duas plataformas."
    >
      <YStack gap={6}>
        <Demo
          id="fade"
          name="Fade"
          description="Transição de opacidade. Com unmountOnExit o elemento sai da árvore ao final e libera o espaço no layout; sem ele, fica montado e invisível."
          code={`<Fade visible={visivel} speed="medium">
  <Card raised={2}>...</Card>
</Fade>

<Fade visible={visivel} unmountOnExit>...</Fade>`}
        >
          <YStack gap={3} width={300}>
            <Button size="sm" onPress={() => setVisible((v) => !v)}>
              {visible ? 'Esconder' : 'Mostrar'}
            </Button>
            <Fade visible={visible}>
              <Card raised={2}>
                <Typography variant="body2">Some e volta pela opacidade.</Typography>
              </Card>
            </Fade>
          </YStack>
        </Demo>

        <Demo
          id="collapse"
          name="Collapse"
          description="Anima a altura de 0 até a altura do conteúdo, medida automaticamente."
          code={`<Collapse open={aberto}>
  <Card raised={1}>...</Card>
</Collapse>`}
        >
          <YStack gap={3} width={320}>
            <Button size="sm" onPress={() => setOpen((v) => !v)}>
              {open ? 'Fechar' : 'Abrir'}
            </Button>
            <Collapse open={open}>
              <Card raised={1}>
                <Typography variant="body2" intent="neutral">
                  A altura é medida e animada de 0 até o valor real.
                </Typography>
              </Card>
            </Collapse>
          </YStack>
        </Demo>

        <Demo
          id="accordion"
          name="Accordion"
          description="Construído sobre o Collapse. Use AccordionSingle quando só um item pode ficar aberto por vez."
          code={`<Accordion>
  <AccordionItem first title="Primeira" defaultOpen>
    Conteúdo.
  </AccordionItem>
  <AccordionItem title="Segunda">Conteúdo.</AccordionItem>
</Accordion>`}
        >
          <YStack width={360}>
            <Accordion>
              <AccordionItem first title="O que é universal?" defaultOpen>
                As props. Muda só de qual entry point você importa.
              </AccordionItem>
              <AccordionItem title="Preciso configurar alguma coisa?">
                Não. Importe a folha de estilo uma vez e use.
              </AccordionItem>
            </Accordion>
          </YStack>
        </Demo>
      </YStack>
    </Section>
  );
}
