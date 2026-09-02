import { SCREEN_PADDING, type ScreenProps } from '../core/layout';
import { applyTheme } from './theme';
import './components.css';

export function Screen({ children, maxWidth, padded = true, scroll }: ScreenProps) {
  void scroll;
  applyTheme();

  return (
    <div className="haquick-screen" style={{ padding: padded ? SCREEN_PADDING : 0 }}>
      <div className="haquick-screen-inner" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
