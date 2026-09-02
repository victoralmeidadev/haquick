// O jsdom não implementa ResizeObserver, e Collapse e Accordion medem a altura
// do conteúdo para animar. Não é lacuna da biblioteca: a API existe em todo
// navegador que a gente suporta — é o ambiente de teste que não tem.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}
