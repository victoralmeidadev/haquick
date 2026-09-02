import type { ReactNode } from 'react';
import { Typography, YStack } from 'haquick/web';

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} style={{ padding: '32px 0' }}>
      <YStack gap={4}>
        <YStack gap={2}>
          <Typography variant="h4">{title}</Typography>
          {subtitle ? (
            <Typography variant="body1" intent="neutral">
              {subtitle}
            </Typography>
          ) : null}
        </YStack>
        {children}
      </YStack>
    </section>
  );
}
