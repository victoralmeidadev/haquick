import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, Button, Card, Collapse, Fade, Typography, XStack, YStack } from '../index';

const meta: Meta = {
  title: 'Componentes/Transition',
};

export default meta;

type Story = StoryObj;

export const FadeAndCollapse: Story = {
  decorators: [
    (Story) => (
      <YStack gap={3} width={420}>
        <Story />
      </YStack>
    ),
  ],
  render: () => {
    const [fade, setFade] = useState(true);
    const [open, setOpen] = useState(false);

    return (
    <>
      <XStack gap={2}>
        <Button size="sm" onPress={() => setFade((v) => !v)}>Fade</Button>
        <Button size="sm" variant="outline" intent="neutral" onPress={() => setOpen((v) => !v)}>
          Collapse
        </Button>
      </XStack>

      <Fade visible={fade}>
        <Card raised={1}>
          <Typography variant="body2">Transição de opacidade.</Typography>
        </Card>
      </Fade>

      <Collapse open={open}>
        <Card raised={1}>
          <Typography variant="body2">Transição de altura.</Typography>
        </Card>
      </Collapse>
    </>
    );
  },
};

export const SingleOpenAccordion: Story = {
  decorators: [
    (Story) => (
      <YStack width={420}>
        <Story />
      </YStack>
    ),
  ],
  render: () => (
    <Accordion>
      <AccordionItem first title="Como altero o plano?" defaultOpen>
        Em Configurações, na aba Cobrança. A mudança vale a partir do próximo ciclo.
      </AccordionItem>
      <AccordionItem title="Posso cancelar a qualquer momento?">
        Sim. O acesso continua até o fim do período já pago.
      </AccordionItem>
      <AccordionItem title="Como exporto meus dados?">
        Em Configurações, na aba Dados, em qualquer formato aberto.
      </AccordionItem>
    </Accordion>
  ),
};
