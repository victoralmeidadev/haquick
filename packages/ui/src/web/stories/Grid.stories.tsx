import type { Meta, StoryObj } from '@storybook/react';
import { Card, Grid, Typography } from '../index';

const meta: Meta<typeof Grid> = {
  title: 'Componentes/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          'Grade de 12 colunas, exclusiva da web. `container` liga a grade; `size` diz quantas colunas o item ocupa, com valor único ou um por breakpoint (xs 0, sm 600, md 900, lg 1200, xl 1536). Redimensione a janela para ver os cortes.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

function Cell({ label }: { label: string }) {
  return (
    <Card raised={1} padding={3}>
      <Typography variant="subtitle2">{label}</Typography>
    </Card>
  );
}

export const TwelveColumns: Story = {
  render: () => (
    <Grid container spacing={2}>
      {Array.from({ length: 12 }, (_, i) => (
        <Grid key={i} size={1}>
          <Cell label="1" />
        </Grid>
      ))}
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid container spacing={3}>
      {['A', 'B', 'C', 'D'].map((label) => (
        <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
          <Cell label={`${label} — 12 / 6 / 3`} />
        </Grid>
      ))}
    </Grid>
  ),
};

export const Offset: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Cell label="size 6" />
      </Grid>
      <Grid size={4} offset={2}>
        <Cell label="size 4, offset 2" />
      </Grid>
      <Grid size={3} offset={{ xs: 0, md: 9 }}>
        <Cell label="offset 9 a partir de md" />
      </Grid>
    </Grid>
  ),
};

export const AutoAndGrow: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid size="auto">
        <Cell label="auto: largura do conteúdo" />
      </Grid>
      <Grid size="grow">
        <Cell label="grow: fica com a sobra" />
      </Grid>
      <Grid size={{ xs: 12, md: 'grow' }}>
        <Cell label="linha inteira no xs, sobra no md" />
      </Grid>
    </Grid>
  ),
};

export const Nested: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Cell label="aninhado 6" />
          </Grid>
          <Grid size={6}>
            <Cell label="aninhado 6" />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Cell label="lateral 4" />
      </Grid>
    </Grid>
  ),
};

export const CustomColumns: Story = {
  render: () => (
    <Grid container spacing={2} columns={5}>
      {['1/5', '2/5', '2/5'].map((label, i) => (
        <Grid key={label} size={i === 0 ? 1 : 2}>
          <Cell label={label} />
        </Grid>
      ))}
    </Grid>
  ),
};
