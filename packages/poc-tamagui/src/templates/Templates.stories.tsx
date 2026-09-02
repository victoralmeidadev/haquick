import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuthTemplate } from './AuthTemplate';
import { DashboardTemplate } from './DashboardTemplate';
import { DetailTemplate } from './DetailTemplate';
import { ListTemplate } from './ListTemplate';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { Chip } from '../components/Chip';
import { EmptyState } from '../components/EmptyState';
import { HelperText } from '../components/HelperText';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Link } from '../components/Link';
import { List, ListItem } from '../components/List';
import { Timeline, TimelineItem } from '../components/Timeline';
import { Typography } from '../components/Typography';
import { XStack, YStack } from '../components/Stack';

const meta: Meta = {
  title: 'Templates/Telas',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

export const Auth: Story = {
  name: 'AuthTemplate',
  render: () => (
    <AuthTemplate
      brand="Cross UI"
      title="Entrar"
      subtitle="Use seu e-mail corporativo."
      secondary={
        <Button variant="outline" intent="neutral" fullWidth>
          Continuar com SSO
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
      <YStack gap="$1">
        <Label required>E-mail</Label>
        <Input placeholder="voce@empresa.com" inputMode="email" />
      </YStack>

      <YStack gap="$1">
        <Label required>Senha</Label>
        <Input secure placeholder="••••••••" />
        <HelperText>Mínimo de 8 caracteres.</HelperText>
      </YStack>

      <Checkbox label="Manter conectado" defaultChecked />

      <Button fullWidth>Entrar</Button>
    </AuthTemplate>
  ),
};

const PEOPLE = [
  { name: 'Ana Silva', email: 'ana@empresa.com', status: 'Ativo' as const },
  { name: 'Bruno Costa', email: 'bruno@empresa.com', status: 'Pendente' as const },
  { name: 'Carla Nunes', email: 'carla@empresa.com', status: 'Ativo' as const },
];

export const ListPage: Story = {
  name: 'ListTemplate',
  render: () => {
    const [search, setSearch] = useState('');
    const visible = PEOPLE.filter((p) =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
      <ListTemplate
        title="Equipe"
        subtitle={`${PEOPLE.length} pessoas`}
        actions={<Button size="sm">Convidar</Button>}
        search={{ value: search, onChangeText: setSearch, placeholder: 'Buscar por nome...' }}
        filters={
          <>
            <Chip size="sm" variant="solid" intent="primary">
              Todos
            </Chip>
            <Chip size="sm">Ativos</Chip>
            <Chip size="sm">Pendentes</Chip>
          </>
        }
        empty={visible.length === 0}
        emptyState={
          <EmptyState
            icon="🔍"
            title="Nenhuma pessoa encontrada"
            description={`Nada corresponde a "${search}".`}
            action={<Button onPress={() => setSearch('')}>Limpar busca</Button>}
          />
        }
      >
        <List>
          {visible.map((p) => (
            <ListItem
              key={p.email}
              title={p.name}
              subtitle={p.email}
              leading={<Avatar size="sm" initials={p.name.slice(0, 2).toUpperCase()} />}
              trailing={
                <Badge intent={p.status === 'Ativo' ? 'success' : 'warning'}>{p.status}</Badge>
              }
            />
          ))}
        </List>
      </ListTemplate>
    );
  },
};

export const ListLoading: Story = {
  name: 'ListTemplate (carregando)',
  render: () => (
    <ListTemplate title="Equipe" subtitle="carregando..." loading>
      <List />
    </ListTemplate>
  ),
};

export const Detail: Story = {
  name: 'DetailTemplate',
  render: () => (
    <DetailTemplate
      title="Ana Silva"
      subtitle="ana@empresa.com"
      leading={<Avatar initials="AS" />}
      onBack={() => {}}
      actions={<Badge intent="success">Ativo</Badge>}
      sections={[
        {
          title: 'Dados',
          content: (
            <YStack gap="$2">
              <XStack justify="between">
                <Typography variant="body2" intent="neutral">
                  Cargo
                </Typography>
                <Typography variant="body2">Engenheira de plataforma</Typography>
              </XStack>
              <XStack justify="between">
                <Typography variant="body2" intent="neutral">
                  Entrada
                </Typography>
                <Typography variant="body2">março de 2024</Typography>
              </XStack>
            </YStack>
          ),
        },
        {
          title: 'Atividade',
          content: (
            <Timeline>
              <TimelineItem intent="success" title="Acesso concedido" subtitle="Hoje, 09:12" />
              <TimelineItem intent="primary" title="Perfil atualizado" subtitle="ontem" />
              <TimelineItem intent="neutral" variant="outlined" title="Conta criada" />
            </Timeline>
          ),
        },
      ]}
      footer={
        <>
          <Button variant="ghost" intent="error">
            Remover
          </Button>
          <Button>Salvar</Button>
        </>
      }
    />
  ),
};

export const Dashboard: Story = {
  name: 'DashboardTemplate',
  render: () => (
    <DashboardTemplate
      title="Visão geral"
      subtitle="Últimos 30 dias"
      actions={
        <Button size="sm" variant="outline" intent="neutral">
          Exportar
        </Button>
      }
      stats={[
        { label: 'Receita', value: 'R$ 128k', hint: '+12% vs. mês anterior', intent: 'success' },
        { label: 'Pedidos', value: '1.284', hint: '+3% vs. mês anterior' },
        { label: 'Ticket médio', value: 'R$ 99', hint: 'estável' },
        { label: 'Cancelamentos', value: '37', hint: '+8% vs. mês anterior', intent: 'error' },
      ]}
    >
      <XStack gap="$4" wrap align="start">
        <Card raised={1} flexGrow={1} flexBasis={320} gap="$3">
          <Typography variant="h6">Últimos pedidos</Typography>
          <List>
            <ListItem
              title="#1042 · Ana Silva"
              subtitle="R$ 240,00"
              trailing={<Badge intent="success">Pago</Badge>}
            />
            <ListItem
              title="#1041 · Bruno Costa"
              subtitle="R$ 89,90"
              trailing={<Badge intent="warning">Pendente</Badge>}
            />
          </List>
        </Card>

        <Card raised={1} flexGrow={1} flexBasis={280} gap="$3">
          <Typography variant="h6">Operação</Typography>
          <Timeline>
            <TimelineItem intent="success" title="Deploy concluído" subtitle="10:02" />
            <TimelineItem intent="warning" title="Fila acima do normal" subtitle="09:40" />
            <TimelineItem intent="neutral" variant="outlined" title="Janela de manutenção" />
          </Timeline>
        </Card>
      </XStack>
    </DashboardTemplate>
  ),
};
