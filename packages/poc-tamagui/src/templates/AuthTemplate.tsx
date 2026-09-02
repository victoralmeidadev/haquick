import type { ReactNode } from 'react';
import { View } from '@tamagui/core';
import { Card, CardContent, CardFooter } from '../components/Card';
import { Screen } from '../components/Screen';
import { Typography } from '../components/Typography';

export type AuthTemplateProps = {
  /** Nome do produto, acima do título. */
  brand?: ReactNode;
  title: string;
  subtitle?: string;
  /** Os campos e o botão de envio. */
  children?: ReactNode;
  /** Linha abaixo do card — "Criar conta", "Esqueci a senha". */
  footer?: ReactNode;
  /** Ações dentro do card, abaixo dos campos (ex: login social). */
  secondary?: ReactNode;
};

// Tela de entrada: login, cadastro, recuperação de senha. Card centralizado
// vertical e horizontalmente, com largura fixa que funciona nas duas
// plataformas — em telas estreitas o card ocupa a largura disponível.
export function AuthTemplate({
  brand,
  title,
  subtitle,
  children,
  footer,
  secondary,
}: AuthTemplateProps) {
  return (
    <Screen>
      {/* `flexGrow` e não `flex`: `flex: 1` zera o flex-basis, o container pode
          ficar menor que o card e o `justifyContent: center` empurraria o topo
          para fora da tela, sem rolagem possível. */}
      <View flexGrow={1} alignItems="center" justifyContent="center" paddingVertical="$6">
        <View width="100%" maxWidth={380} gap="$4">
          {brand ? (
            <View alignItems="center">
              {typeof brand === 'string' ? (
                <Typography variant="h5" intent="primary">
                  {brand}
                </Typography>
              ) : (
                brand
              )}
            </View>
          ) : null}

          <Card raised={2} gap="$4">
            <View gap="$1">
              <Typography variant="h5">{title}</Typography>
              {subtitle ? (
                <Typography variant="body2" intent="neutral">
                  {subtitle}
                </Typography>
              ) : null}
            </View>

            <CardContent gap="$3">{children}</CardContent>

            {secondary ? (
              <CardFooter divided justify="center">
                {secondary}
              </CardFooter>
            ) : null}
          </Card>

          {footer ? (
            <View alignItems="center" flexDirection="row" justifyContent="center" gap="$2">
              {footer}
            </View>
          ) : null}
        </View>
      </View>
    </Screen>
  );
}
