import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'haquick/web';
import { defaultPlusBrand } from '../theme';

export const globalTypes = {
  theme: {
    description: 'Tema global (light/dark)',
    defaultValue: 'light',
    toolbar: {
      title: 'Tema',
      icon: 'circlehollow',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  tags: ['autodocs'],

  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        language: 'tsx',
      },
    },
  },

  decorators: [
    (Story, context) => {
      const mode = (context.globals.theme as 'light' | 'dark') ?? 'light';
      return (
        <ThemeProvider mode={mode} themes={{ default: defaultPlusBrand }}>
          <div
            style={{
              padding: 24,
              minHeight: '100vh',
              background: 'var(--haquick-background)',
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
