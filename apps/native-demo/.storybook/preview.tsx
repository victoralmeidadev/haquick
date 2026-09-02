import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'haquick/native';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultMode="system">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'claro',
      values: [
        { name: 'claro', value: '#FFFFFF' },
        { name: 'escuro', value: '#0B0B0C' },
      ],
    },
  },
};

export default preview;
