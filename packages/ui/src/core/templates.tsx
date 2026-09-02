import type { ComponentType, ReactNode } from 'react';
import type { ColorIntent } from './types';
import type { InputProps } from './form';
import type { ComposerProps } from './chat';
import type { ScreenProps, StackProps } from './layout';
import type {
  CardProps,
  DividerProps,
  EmptyStateProps,
  PageHeaderProps,
  SkeletonProps,
  StatCardProps,
  TypographyProps,
} from './components';

export type TemplateDeps = {
  Screen: ComponentType<ScreenProps>;
  XStack: ComponentType<StackProps>;
  YStack: ComponentType<StackProps>;
  Card: ComponentType<CardProps>;
  CardContent: ComponentType<{ children?: ReactNode; gap?: StackProps['gap'] }>;
  CardFooter: ComponentType<{
    children?: ReactNode;
    divided?: boolean;
    /** Mais estreito que o Justify das stacks — o rodapé do Card não distribui. */
    justify?: 'start' | 'center' | 'end' | 'between';
  }>;
  Typography: ComponentType<TypographyProps>;
  Divider: ComponentType<DividerProps>;
  PageHeader: ComponentType<PageHeaderProps>;
  Skeleton: ComponentType<SkeletonProps>;
  EmptyState: ComponentType<EmptyStateProps>;
  StatCard: ComponentType<StatCardProps>;
  Input: ComponentType<InputProps>;
  Composer: ComponentType<ComposerProps>;
};

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

export type ListTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  /** Ações do cabeçalho — normalmente o botão de criar. */
  actions?: ReactNode;
  /** Campo de busca acima da lista. Omita para não mostrar. */
  search?: InputProps;
  /** Filtros/chips entre a busca e a lista. */
  filters?: ReactNode;
  children?: ReactNode;
  /** Mostra esqueletos no lugar do conteúdo. */
  loading?: boolean;
  /** Quando `true`, mostra `emptyState` no lugar do conteúdo. */
  empty?: boolean;
  emptyState?: ReactNode;
  maxWidth?: number;
};

export type DetailSection = { title?: string; content: ReactNode };

export type DetailTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  /** Avatar ou ícone à esquerda do título. */
  leading?: ReactNode;
  actions?: ReactNode;
  /** Blocos de conteúdo, separados por divisória. */
  sections?: DetailSection[];
  children?: ReactNode;
  /** Ações principais no fim da tela. */
  footer?: ReactNode;
  maxWidth?: number;
};

export type DashboardStat = {
  label: string;
  value: ReactNode;
  hint?: string;
  intent?: ColorIntent;
  trailing?: ReactNode;
};

export type DashboardTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Linha de indicadores no topo. Envolve sozinha em telas estreitas. */
  stats?: DashboardStat[];
  children?: ReactNode;
  maxWidth?: number;
};

export type ChatTemplateProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => void;
  /** Avatar ou ícone do agente, ao lado do título. */
  leading?: ReactNode;
  actions?: ReactNode;
  /** A <MessageList> com as mensagens. */
  children?: ReactNode;
  /** Props repassadas ao <Composer> do rodapé. Omita para não mostrar. */
  composer?: ComposerProps;
  maxWidth?: number;
};

export function makeTemplates(ui: TemplateDeps) {
  const {
    Screen,
    XStack,
    YStack,
    Card,
    CardContent,
    CardFooter,
    Typography,
    Divider,
    PageHeader,
    Skeleton,
    EmptyState,
    StatCard,
    Input,
    Composer,
  } = ui;

  function AuthTemplate({ brand, title, subtitle, children, footer, secondary }: AuthTemplateProps) {
    return (
      <Screen>
        <YStack fill align="center" justify="center" padding={6}>
          <YStack width="100%" maxWidth={380} gap={4}>
            {brand ? (
              <YStack align="center">
                {typeof brand === 'string' ? (
                  <Typography variant="h5" intent="primary">
                    {brand}
                  </Typography>
                ) : (
                  brand
                )}
              </YStack>
            ) : null}

            <Card raised={2} gap={4}>
              <YStack gap={1}>
                <Typography variant="h5">{title}</Typography>
                {subtitle ? (
                  <Typography variant="body2" intent="neutral">
                    {subtitle}
                  </Typography>
                ) : null}
              </YStack>

              <CardContent gap={3}>{children}</CardContent>

              {secondary ? (
                <CardFooter divided justify="center">
                  {secondary}
                </CardFooter>
              ) : null}
            </Card>

            {footer ? (
              <XStack align="center" justify="center" gap={2}>
                {footer}
              </XStack>
            ) : null}
          </YStack>
        </YStack>
      </Screen>
    );
  }

  function ListTemplate({
    title,
    subtitle,
    onBack,
    actions,
    search,
    filters,
    children,
    loading,
    empty,
    emptyState,
    maxWidth = 900,
  }: ListTemplateProps) {
    return (
      <Screen maxWidth={maxWidth}>
        <YStack gap={3}>
          <PageHeader title={title} subtitle={subtitle} onBack={onBack} actions={actions} />

          {search ? <Input placeholder="Buscar..." {...search} /> : null}

          {filters ? (
            <XStack gap={2} wrap>
              {filters}
            </XStack>
          ) : null}

          {loading ? (
            <YStack gap={3}>
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" height={56} />
              ))}
            </YStack>
          ) : empty ? (
            (emptyState ?? <EmptyState icon="∅" title="Nada por aqui" />)
          ) : (
            children
          )}
        </YStack>
      </Screen>
    );
  }

  function DetailTemplate({
    title,
    subtitle,
    onBack,
    leading,
    actions,
    sections = [],
    children,
    footer,
    maxWidth = 780,
  }: DetailTemplateProps) {
    return (
      <Screen maxWidth={maxWidth}>
        <YStack gap={4}>
          <PageHeader
            divided
            title={title}
            subtitle={subtitle}
            onBack={onBack}
            leading={leading}
            actions={actions}
          />

          <YStack gap={5} fill>
            {sections.map((section, index) => (
              <YStack key={section.title ?? index} gap={3}>
                {section.title ? (
                  <Typography variant="overline" intent="neutral">
                    {section.title}
                  </Typography>
                ) : null}

                {section.content}

                {index < sections.length - 1 ? <Divider /> : null}
              </YStack>
            ))}

            {children}
          </YStack>

          {footer ? (
            <YStack gap={4}>
              <Divider />
              <XStack justify="end" gap={2}>
                {footer}
              </XStack>
            </YStack>
          ) : null}
        </YStack>
      </Screen>
    );
  }

  function DashboardTemplate({
    title,
    subtitle,
    actions,
    stats = [],
    children,
    maxWidth = 1100,
  }: DashboardTemplateProps) {
    return (
      <Screen maxWidth={maxWidth}>
        <YStack gap={4}>
          <PageHeader title={title} subtitle={subtitle} actions={actions} />

          {stats.length > 0 ? (
            <XStack gap={3} wrap>
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  hint={stat.hint}
                  intent={stat.intent}
                  trailing={stat.trailing}
                />
              ))}
            </XStack>
          ) : null}

          <YStack gap={4} fill>
            {children}
          </YStack>
        </YStack>
      </Screen>
    );
  }

  function ChatTemplate({
    title,
    subtitle,
    onBack,
    leading,
    actions,
    children,
    composer,
    maxWidth = 760,
  }: ChatTemplateProps) {
    return (
      <Screen maxWidth={maxWidth}>
        <YStack fill>
          <PageHeader
            divided
            title={title}
            subtitle={subtitle}
            onBack={onBack}
            leading={leading}
            actions={actions}
          />

          <YStack fill>{children}</YStack>

          {composer ? <Composer {...composer} /> : null}
        </YStack>
      </Screen>
    );
  }

  return { AuthTemplate, ListTemplate, DetailTemplate, DashboardTemplate, ChatTemplate };
}
