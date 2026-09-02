import { NAV } from '../pages/docs/nav';

export function DocsNav({
  section,
  anchor,
  onSelect,
}: {
  section: string;
  anchor?: string;
  onSelect: (section: string, anchor?: string) => void;
}) {
  return (
    <nav className="dnav" aria-label="Seções da documentação">
      {NAV.map((group) => (
        <div key={group.group} className="dnav-group">
          {/* Título do grupo: rótulo, não item clicável. */}
          <div className="dnav-label">{group.group}</div>

          {group.items.map((item) => {
            const active = item.id === section;

            return (
              <div key={item.id}>
                <button
                  type="button"
                  className="dnav-item"
                  aria-current={active ? 'true' : undefined}
                  onClick={() => onSelect(item.id)}
                >
                  {item.label}
                </button>

                {/* Âncoras só da seção aberta: o menu inteiro expandido teria
                    quase 30 linhas e deixaria de ajudar a localizar. */}
                {active && item.anchors ? (
                  <div className="dnav-subs">
                    {item.anchors.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        className="dnav-item dnav-sub"
                        aria-current={sub.id === anchor ? 'true' : undefined}
                        onClick={() => onSelect(item.id, sub.id)}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
