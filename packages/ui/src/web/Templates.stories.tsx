import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  AuthTemplate,
  Badge,
  Button,
  Card,
  ChatTemplate,
  Checkbox,
  Chip,
  DashboardTemplate,
  DetailTemplate,
  Divider,
  EmptyState,
  HelperText,
  IconButton,
  Input,
  Label,
  Link,
  List,
  ListItem,
  ListTemplate,
  Message,
  MessageList,
  Suggestions,
  ToolCall,
  Typography,
  TypingIndicator,
  XStack,
  YStack,
} from './index';

const meta: Meta = {
  title: 'Telas',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

export const Auth: Story = {
  render: () => (
    <AuthTemplate
      brand="Haquick"
      title="Entrar"
      subtitle="Use o e-mail da empresa."
      secondary={
        <Button variant="outline" intent="neutral" fullWidth>
          Continuar com Google
        </Button>
      }
      footer={
        <>
          <Typography variant="body2" intent="neutral">
            Não tem conta?
          </Typography>
          <Link>Criar agora</Link>
        </>
      }
    >
      <YStack gap={1}>
        <Label required>E-mail</Label>
        <Input placeholder="voce@empresa.com" inputMode="email" />
      </YStack>

      <YStack gap={1}>
        <Label required>Senha</Label>
        <Input secure defaultValue="senha123" />
        <HelperText>Mínimo de 8 caracteres.</HelperText>
      </YStack>

      <XStack justify="between" align="center">
        <Checkbox label="Lembrar de mim" defaultChecked />
        <Link>Esqueci a senha</Link>
      </XStack>

      <Button fullWidth>Entrar</Button>
    </AuthTemplate>
  ),
};

const PEOPLE = [
  { name: 'Ana Silva', email: 'ana@empresa.com', role: 'Engenheira', active: true },
  { name: 'Bruno Costa', email: 'bruno@empresa.com', role: 'Designer', active: false },
  { name: 'Carla Nunes', email: 'carla@empresa.com', role: 'Produto', active: true },
  { name: 'Diego Alves', email: 'diego@empresa.com', role: 'Dados', active: true },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('');

export const ListWithData: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const rows = PEOPLE.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <ListTemplate
        title="Pessoas"
        subtitle={`${rows.length} de ${PEOPLE.length}`}
        actions={<Button size="sm">Convidar</Button>}
        search={{ value: search, onChangeText: setSearch, placeholder: 'Buscar por nome' }}
        filters={
          <>
            <Chip size="sm" intent="primary" variant="soft">
              Ativos
            </Chip>
            <Chip size="sm" intent="neutral" variant="outline">
              Pendentes
            </Chip>
          </>
        }
        empty={rows.length === 0}
        emptyState={
          <EmptyState
            icon="🔍"
            title="Nenhum resultado"
            description="Tente outro termo de busca."
            action={<Button onPress={() => setSearch('')}>Limpar</Button>}
          />
        }
      >
        <List>
          {rows.map((p) => (
            <ListItem
              key={p.email}
              title={p.name}
              subtitle={`${p.role} · ${p.email}`}
              leading={<Avatar size="sm" initials={initials(p.name)} />}
              trailing={
                <Badge intent={p.active ? 'success' : 'warning'}>
                  {p.active ? 'ativo' : 'pendente'}
                </Badge>
              }
            />
          ))}
        </List>
      </ListTemplate>
    );
  },
};

export const ListLoading: Story = {
  render: () => (
    <ListTemplate title="Pessoas" subtitle="Carregando..." loading search={{}} />
  ),
};

export const Detail: Story = {
  render: () => (
    <DetailTemplate
      title="Ana Silva"
      subtitle="ana@empresa.com"
      onBack={() => {}}
      leading={<Avatar initials="AS" />}
      actions={
        <IconButton label="Mais opções" variant="ghost" intent="neutral">
          ⋯
        </IconButton>
      }
      sections={[
        {
          title: 'Perfil',
          content: (
            <YStack gap={2}>
              <Typography variant="body2">Engenheira de plataforma, time de Infra.</Typography>
              <XStack gap={2} wrap>
                <Chip size="sm" variant="soft" intent="primary">
                  infra
                </Chip>
                <Chip size="sm" variant="soft" intent="secondary">
                  on-call
                </Chip>
              </XStack>
            </YStack>
          ),
        },
        {
          title: 'Acesso',
          content: (
            <YStack gap={2}>
              <XStack justify="between">
                <Typography variant="body2" intent="neutral">
                  Função
                </Typography>
                <Typography variant="body2">Administradora</Typography>
              </XStack>
              <XStack justify="between">
                <Typography variant="body2" intent="neutral">
                  Último acesso
                </Typography>
                <Typography variant="body2">há 2 horas</Typography>
              </XStack>
            </YStack>
          ),
        },
      ]}
      footer={
        <>
          <Button variant="ghost" intent="neutral">
            Cancelar
          </Button>
          <Button intent="error">Remover acesso</Button>
        </>
      }
    />
  ),
};

export const Dashboard: Story = {
  render: () => (
    <DashboardTemplate
      title="Visão geral"
      subtitle="Setembro de 2026"
      actions={<Button size="sm">Exportar</Button>}
      stats={[
        { label: 'Receita', value: 'R$ 128k', hint: '+12% vs. mês anterior', intent: 'success' },
        { label: 'Pedidos', value: '1.284', hint: '+3%' },
        { label: 'Cancelamentos', value: '37', hint: '+8%', intent: 'error' },
        { label: 'Ticket médio', value: 'R$ 99,60', hint: '−1%' },
      ]}
    >
      <XStack gap={4} wrap align="start">
        <Card raised={1} width={360} fill gap={3}>
          <Typography variant="h6">Últimos pedidos</Typography>
          <Divider />
          <List>
            <ListItem title="PED-1042" subtitle="Ana Silva" trailing={<Badge intent="success">pago</Badge>} />
            <ListItem title="PED-1041" subtitle="Bruno Costa" trailing={<Badge intent="warning">pendente</Badge>} />
          </List>
        </Card>

        <Card raised={1} width={360} fill gap={3}>
          <Typography variant="h6">Alertas</Typography>
          <Divider />
          <Typography variant="body2" intent="neutral">
            Nenhum incidente aberto nas últimas 24 horas.
          </Typography>
        </Card>
      </XStack>
    </DashboardTemplate>
  ),
};

export const Chat: Story = {
  render: () => (
    <ChatTemplate
      title="Assistente"
      subtitle="Conectado à base de pedidos"
      onBack={() => {}}
      leading={<Avatar size="sm" initials="AI" intent="secondary" />}
      composer={{ onSend: () => {} }}
    >
      <MessageList>
        <Message role="system">Conversa iniciada</Message>
        <Message role="user" timestamp="10:32">
          Quantos pedidos foram cancelados em setembro?
        </Message>
        <Message
          role="assistant"
          avatar={<Avatar size="sm" initials="AI" intent="secondary" />}
          author="Assistente"
        >
          Vou consultar a base.
        </Message>
        <ToolCall
          name="consultar_pedidos"
          status="success"
          args={'{ "status": "cancelado", "mes": "2026-09" }'}
          result={'{ "total": 37, "valor": 4210.5 }'}
        />
        <Message role="assistant" avatar={<Avatar size="sm" initials="AI" intent="secondary" />}>
          Foram 37 cancelamentos, somando R$ 4.210,50 — 8% acima do mês anterior.
        </Message>
        <TypingIndicator />
      </MessageList>

      <Suggestions items={['Detalhar por motivo', 'Comparar com agosto']} onSelect={() => {}} />
    </ChatTemplate>
  ),
};
