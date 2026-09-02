import type { GetProps } from '@tamagui/core';
import { Text, styled } from '@tamagui/core';

const LabelText = styled(Text, {
  name: 'Label',
  color: '$color',
  fontSize: 13,
  fontWeight: '600',
  lineHeight: 18,

  variants: {
    size: {
      sm: { fontSize: 12, lineHeight: 16 },
      md: { fontSize: 13, lineHeight: 18 },
      lg: { fontSize: 15, lineHeight: 20 },
    },
    disabled: {
      true: { opacity: 0.5 },
    },
  } as const,

  defaultVariants: { size: 'md' },
});

export type LabelProps = GetProps<typeof LabelText> & {
  /** Acrescenta o asterisco de campo obrigatório. */
  required?: boolean;
};

// Rótulo de campo de formulário — normalmente usado acima de <Input /> e
// junto de <HelperText /> para mensagem de erro/ajuda.
export function Label({ required, children, ...rest }: LabelProps) {
  return (
    <LabelText {...rest}>
      {children}
      {required ? <LabelText color="$error"> *</LabelText> : null}
    </LabelText>
  );
}

// displayName: o `styled()` envolve em React.memo, e sem nome o Storybook
// serializa o componente como `<React.Memo>` no "Show code".
LabelText.displayName = 'LabelText';
