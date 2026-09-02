import { describe, expect, it } from 'vitest';
import { sheetAction } from './sheet';

// O BottomSheet do Android abria no máximo uma vez, e a causa era esta regra.
// O Gorhom não tolera `dismiss()` fora de apresentação: não lança, mas deixa o
// modal surdo a todo `present()` seguinte. Como o sintoma é silencioso e só
// aparece em device, a regra virou função pura para caber num teste.

describe('sheetAction', () => {
  it('não faz nada quando o pedido já é o estado atual', () => {
    // Este é o caso que quebrava: a folha fecha sozinha, o estado volta a
    // false, e o efeito mandava um `dismiss()` num modal já fechado.
    expect(sheetAction(false, false)).toBe(null);
    expect(sheetAction(true, true)).toBe(null);
  });

  it('apresenta ao abrir e descarta ao fechar', () => {
    expect(sheetAction(true, false)).toBe('present');
    expect(sheetAction(false, true)).toBe('dismiss');
  });

  it('sobrevive ao ciclo que quebrava: abre, fecha por gesto, abre de novo', () => {
    let presented = false;
    const executed: (string | null)[] = [];

    // Cada passo é um render do efeito, com o estado que o app tinha ali.
    for (const open of [false, true, false, true]) {
      const action = sheetAction(open, presented);
      executed.push(action);
      if (action) presented = open;
    }

    // A montagem (false/false) não pode virar dismiss — era o primeiro veneno.
    expect(executed).toEqual([null, 'present', 'dismiss', 'present']);
  });
});
