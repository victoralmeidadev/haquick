import { useEffect, type ReactNode } from 'react';
import { Button, Typography, YStack } from 'haquick/web';
import { DocsNav } from '../components/DocsNav';
import { DEFAULT_SECTION, ALL_ITEMS } from './docs/nav';
import {
  EntryPointsSection,
  InstallationSection,
  NativeSetupSection,
  WebSetupSection,
} from './docs/Installation';
import {
  ActionSection,
  DataSection,
  FeedbackSection,
  FormSection,
  LayoutSection,
  MotionSection,
  OverlaySection,
  WebOnlySection,
} from './docs/Components';
import {
  BordersSection,
  IntentsSection,
  NamedThemesSection,
  PaletteSection,
  ShadowsSection,
  ThemeSection,
  RuntimeThemesSection,
} from './docs/Customization';

const SECTIONS: Record<string, () => ReactNode> = {
  installation: InstallationSection,
  web: WebSetupSection,
  native: NativeSetupSection,
  'entry-points': EntryPointsSection,

  action: ActionSection,
  form: FormSection,
  data: DataSection,
  feedback: FeedbackSection,
  layout: LayoutSection,
  overlay: OverlaySection,
  motion: MotionSection,
  'web-only': WebOnlySection,

  theme: ThemeSection,
  'named-themes': NamedThemesSection,
  palette: PaletteSection,
  intents: IntentsSection,
  'runtime-themes': RuntimeThemesSection,
  borders: BordersSection,
  shadows: ShadowsSection,
};

export function Docs({
  section,
  anchor,
  onNavigate,
}: {
  section: string;
  anchor?: string;
  onNavigate: (section: string, anchor?: string) => void;
}) {
  const current = SECTIONS[section] ? section : DEFAULT_SECTION;
  const Content = SECTIONS[current];

  useEffect(() => {
    if (!anchor) {
      window.scrollTo({ top: 0 });
      return;
    }
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [current, anchor]);

  const index = ALL_ITEMS.findIndex((i) => i.id === current);
  const previous = ALL_ITEMS[index - 1];
  const next = ALL_ITEMS[index + 1];

  return (
    <div className="docs">
      <aside className="docs-side">
        <DocsNav section={current} anchor={anchor} onSelect={onNavigate} />
      </aside>

      <div className="docs-main">
        <Content />

        {/* Anterior/próximo, como nas docs do MUI e do shadcn. */}
        <div className="docs-footer">
          {previous ? (
            <YStack gap={1} align="start">
              <Typography variant="caption" intent="neutral">
                Anterior
              </Typography>
              <Button variant="outline" intent="neutral" onPress={() => onNavigate(previous.id)}>
                {previous.label}
              </Button>
            </YStack>
          ) : (
            <span />
          )}

          {next ? (
            <YStack gap={1} align="end">
              <Typography variant="caption" intent="neutral">
                Próximo
              </Typography>
              <Button variant="outline" intent="neutral" onPress={() => onNavigate(next.id)}>
                {next.label}
              </Button>
            </YStack>
          ) : null}
        </div>
      </div>
    </div>
  );
}
