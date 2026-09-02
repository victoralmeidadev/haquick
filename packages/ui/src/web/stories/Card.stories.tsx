import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Typography, XStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Card',
};

export default meta;

type Story = StoryObj;

export const Elevation: Story = {
  render: () => (
    <XStack gap={4} wrap>
      {([0, 1, 2, 3, 4, 5] as const).map((n) => (
        <Card key={n} raised={n} width={130}>
          <Typography variant="subtitle2">raised={n}</Typography>
        </Card>
      ))}
    </XStack>
  ),
};

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
          Engenheira de plataforma, time de Infra.
        </Typography>
      </CardContent>
      <CardFooter divided justify="end">
        <Button size="sm" variant="ghost" intent="neutral">Remover</Button>
        <Button size="sm">Ver perfil</Button>
      </CardFooter>
    </Card>
  ),
};
