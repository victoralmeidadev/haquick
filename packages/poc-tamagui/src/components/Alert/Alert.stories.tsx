import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { IconButton } from '../IconButton';
import { YStack } from '../Stack';

const meta: Meta<typeof Alert> = {
  title: 'Common/Alert',
  component: Alert,
  args: { title: 'Tudo certo', children: 'Suas alterações foram salvas.' },
  argTypes: {
    variant: { control: 'select', options: ['outline', 'solid'] },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
  },
  render: (args) => (
    <YStack width={420}>
      <Alert {...args} />
    </YStack>
  ),
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const Intents: Story = {
  render: () => (
    <YStack gap="$3" width={420}>
      <Alert intent="info" title="Informação">
        A próxima cobrança acontece em 12 de setembro.
      </Alert>
      <Alert intent="success" title="Pagamento aprovado">
        O recibo foi enviado para o seu e-mail.
      </Alert>
      <Alert intent="warning" title="Atenção">
        Seu plano expira em 3 dias.
      </Alert>
      <Alert intent="error" title="Falha no envio">
        Não conseguimos processar o arquivo. Tente novamente.
      </Alert>
    </YStack>
  ),
};

export const Solid: Story = {
  render: () => (
    <YStack gap="$3" width={420}>
      <Alert variant="solid" intent="success" title="Publicado">
        A versão 2.1 já está no ar.
      </Alert>
      <Alert variant="solid" intent="error" title="Servidor indisponível">
        Tentando reconectar...
      </Alert>
    </YStack>
  ),
};

export const WithAction: Story = {
  render: () => (
    <YStack width={420}>
      <Alert
        intent="warning"
        title="Sessão expirando"
        action={
          <IconButton label="Fechar aviso" intent="warning" size="sm">
            ✕
          </IconButton>
        }
      >
        Você será desconectado em 2 minutos.
      </Alert>
    </YStack>
  ),
};
