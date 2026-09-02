import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionSingle } from './Accordion';
import { YStack } from '../Stack';

const meta: Meta<typeof Accordion> = {
  title: 'Common/Accordion',
  component: Accordion,
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <YStack width={420}>
      <Accordion>
        <AccordionItem first title="O que é universal?" defaultOpen>
          Um componente universal é o mesmo arquivo em web e mobile.
        </AccordionItem>
        <AccordionItem title="Preciso de react-native-web?">
          Não. O @tamagui/core renderiza DOM sozinho.
        </AccordionItem>
        <AccordionItem title="Como customizo o tema?">
          Com createCrossUIConfig: paleta, hover, bordas e sombras em um objeto.
        </AccordionItem>
      </Accordion>
    </YStack>
  ),
};

// Só um item aberto por vez.
export const SingleOpen: Story = {
  render: () => (
    <YStack width={420}>
      <AccordionSingle
        defaultOpen="a"
        items={[
          { id: 'a', title: 'Primeiro', content: 'Abrir outro fecha este.' },
          { id: 'b', title: 'Segundo', content: 'E fecha o primeiro.' },
          { id: 'c', title: 'Terceiro', content: 'Clicar no aberto fecha tudo.' },
        ]}
      />
    </YStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <YStack width={420}>
      <Accordion>
        <AccordionItem first title="Disponível">
          Este abre normalmente.
        </AccordionItem>
        <AccordionItem title="Indisponível" disabled>
          Este não responde ao clique.
        </AccordionItem>
      </Accordion>
    </YStack>
  ),
};
