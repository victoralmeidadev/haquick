// API normalizada, de propósito.
//
// Antes o Input estendia `TextInputProps` do React Native, o que obrigava o app
// web a ter `react-native-web` só para tipar/renderizar um campo de texto.
// Aqui as props são as do design system, e cada plataforma traduz para o seu
// primitivo (`<input>` no DOM, `TextInput` no native).
export type InputProps = {
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Pinta a borda de erro. A mensagem em si é responsabilidade do <HelperText />. */
  error?: boolean;
  /** Campo de senha: `type="password"` na web, `secureTextEntry` no native. */
  secure?: boolean;
  /** Teclado/validação sugeridos. Mapeia para `inputMode` na web e `keyboardType` no native. */
  inputMode?: 'text' | 'email' | 'numeric' | 'tel' | 'url' | 'search';
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Campo de várias linhas: <textarea> na web, TextInput multiline no native. */
  multiline?: boolean;
  /** Altura em linhas quando `multiline`. */
  rows?: number;
  /** Descrição para leitores de tela quando não há <Label> associado. */
  label?: string;
};

export const INPUT_FONT_SIZE = {
  sm: 13,
  md: 15,
  lg: 17,
} as const;
