import { useState } from 'react';
import { Chip, XStack, YStack } from 'haquick/web';
import { CodeBlock } from './CodeBlock';

const MANAGERS = {
  pnpm: 'pnpm add',
  npm: 'npm install',
  yarn: 'yarn add',
  bun: 'bun add',
} as const;

type Manager = keyof typeof MANAGERS;

export function InstallCommand({ pkg = 'haquick' }: { pkg?: string }) {
  const [manager, setManager] = useState<Manager>('pnpm');

  return (
    <YStack gap={2}>
      <XStack gap={2} wrap>
        {(Object.keys(MANAGERS) as Manager[]).map((name) => (
          <Chip
            key={name}
            size="sm"
            variant={manager === name ? 'solid' : 'outline'}
            intent={manager === name ? 'primary' : 'neutral'}
            onPress={() => setManager(name)}
          >
            {name}
          </Chip>
        ))}
      </XStack>
      <CodeBlock>{`${MANAGERS[manager]} ${pkg}`}</CodeBlock>
    </YStack>
  );
}
