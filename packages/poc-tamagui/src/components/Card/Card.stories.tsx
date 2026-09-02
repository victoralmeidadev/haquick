import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { CardContent, CardFooter, CardHeader, CardTitle } from './CardParts';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { XStack, YStack } from '../Stack';

const meta: Meta<typeof Card> = {
  title: 'Common/Card',
  component: Card,
  argTypes: {
    raised: { control: 'select', options: [0, 1, 2, 3, 4, 5] },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card width={280} gap="$2">
      <Typography variant="h6">Card</Typography>
      <Typography variant="body2" intent="neutral">
        Superfície base do design system.
      </Typography>
    </Card>
  ),
};

// Header, content e footer como peças separadas — o equivalente ao
// CardHeader/CardContent/CardActions do MUI.
export const Composition: Story = {
  render: () => (
    <Card raised={2} width={340}>
      <CardHeader>
        <Avatar initials="AS" />
        <CardTitle subtitle="ana@empresa.com">Ana Silva</CardTitle>
        <Badge intent="success">Ativo</Badge>
      </CardHeader>

      <CardContent>
        <Typography variant="body2" intent="neutral">
          Engenheira de plataforma. Entrou no time em março.
        </Typography>
      </CardContent>

      <CardFooter divided justify="end">
        <Button size="sm" variant="ghost" intent="neutral">
          Remover
        </Button>
        <Button size="sm">Ver perfil</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevation: Story = {
  render: () => (
    <XStack gap="$4" wrap padding="$4">
      {([0, 1, 2, 3, 4, 5] as const).map((level) => (
        <Card key={level} raised={level} width={150}>
          <YStack gap="$1">
            <Typography variant="subtitle2">raised={level}</Typography>
            <Typography variant="caption" intent="neutral">
              elevação {level}
            </Typography>
          </YStack>
        </Card>
      ))}
    </XStack>
  ),
};
