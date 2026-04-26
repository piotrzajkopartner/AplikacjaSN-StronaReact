const CUSTOMERS = [
  { name: 'ALFA SYSTEMS SP. Z O.O.', nip: '5213498871' },
  { name: 'BETA SECURITY GROUP', nip: '1132984451' },
  { name: 'GAMMA TECH DISTRIBUTION', nip: '7812049912' },
  { name: 'DELTA MONITORING S.A.', nip: '5223110074' },
  { name: 'OMEGA PARTNER IT', nip: '7831755003' },
  { name: 'SIGMA INTEGRATOR', nip: '6172281900' }
];

const ITEM_CATALOG = [
  { name: 'Kamera IP 4MP', symbol: 'KAM-IP4', warrantyI0: 100001 },
  { name: 'Rejestrator 8CH', symbol: 'NVR-8CH', warrantyI0: 100002 },
  { name: 'Dysk 4TB', symbol: 'HDD-4TB', warrantyI0: 100000 },
  { name: 'Switch PoE 8P', symbol: 'SWT-POE8', warrantyI0: 100003 },
  { name: 'Zasilacz 12V', symbol: 'PSU-12V', warrantyI0: 100007 },
  { name: 'Akcesoria montazowe', symbol: 'AKC-MNT', warrantyI0: null }
];

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const makeSignature = (symbol, no, year = 2026) => `${symbol} ${no}/MAG/${String(year).slice(-2)}`;

const makeDocument = ({
  id,
  symbol,
  signature,
  date,
  customer,
  totalItems,
  savedItems,
  isExcess,
  isComplete,
  sourceZk,
  sourcePa,
  realizedBy,
  relatedDocument,
  flags
}) => ({
  Id: id,
  Symbol: symbol,
  NumerWewnetrzny_PelnaSygnatura: signature,
  DataWprowadzenia: date.toISOString(),
  KlientNazwa: customer.name,
  KlientNIP: customer.nip,
  TotalItems: totalItems,
  SavedItems: savedItems,
  IsExcess: Boolean(isExcess),
  IsComplete: Boolean(isComplete),
  ZrodloweZK: sourceZk || null,
  ZrodlowePA: sourcePa || null,
  RealizedByWzId: realizedBy?.id || null,
  RealizedByWzSymbol: realizedBy?.signature || null,
  DokumentPowiazany: relatedDocument || null,
  flags: flags || {}
});

const splitRequiredQuantities = (total) => {
  if (total <= 0) return [0, 0, 0];
  const first = Math.max(1, Math.round(total * 0.5));
  const second = Math.max(1, Math.round(total * 0.3));
  const third = Math.max(1, total - first - second);
  const sum = first + second + third;
  return [first, second, third - (sum - total)];
};

const serialToken = (doc, itemIdx, seq) => `${doc.Symbol}-${doc.Id}-${itemIdx + 1}-${String(seq + 1).padStart(3, '0')}`;

const buildItemsForDocument = (doc) => {
  const [q1, q2, q3] = splitRequiredQuantities(doc.TotalItems);
  const requiredQuantities = [q1, q2, q3];

  const requiredItems = requiredQuantities.map((qty, idx) => {
    const catalog = ITEM_CATALOG[idx % ITEM_CATALOG.length];
    return {
      LP: idx + 1,
      AsortymentId: doc.Id * 10 + (idx + 1),
      Nazwa: catalog.name,
      Symbol: catalog.symbol,
      Ilosc: Math.max(0, qty),
      requiresSerial: true,
      I0: catalog.warrantyI0,
      savedSerials: []
    };
  });

  requiredItems.push({
    LP: 99,
    AsortymentId: doc.Id * 10 + 99,
    Nazwa: ITEM_CATALOG[5].name,
    Symbol: ITEM_CATALOG[5].symbol,
    Ilosc: 2,
    requiresSerial: false,
    I0: null,
    savedSerials: []
  });

  let serialsToDistribute = doc.SavedItems;

  for (let idx = 0; idx < requiredItems.length; idx += 1) {
    const item = requiredItems[idx];
    if (!item.requiresSerial || item.Ilosc <= 0 || serialsToDistribute <= 0) continue;
    const canFill = Math.min(item.Ilosc, serialsToDistribute);
    for (let i = 0; i < canFill; i += 1) {
      const token = serialToken(doc, idx, i);
      item.savedSerials.push(i === 0 && doc.flags.usePlaceholder ? 'brak' : token);
    }
    serialsToDistribute -= canFill;
  }

  if (doc.IsExcess && serialsToDistribute > 0 && requiredItems[0]) {
    for (let i = 0; i < serialsToDistribute; i += 1) {
      requiredItems[0].savedSerials.push(serialToken(doc, 0, requiredItems[0].Ilosc + i));
    }
  }

  return requiredItems;
};

const documents = [];
let nextId = 400000;
let docNo = 10;

const pushDoc = (spec) => {
  const customer = CUSTOMERS[documents.length % CUSTOMERS.length];
  documents.push(
    makeDocument({
      id: nextId,
      symbol: spec.symbol,
      signature: spec.signature || makeSignature(spec.symbol, docNo),
      date: addDays(new Date('2026-01-10T08:00:00.000Z'), documents.length * 2),
      customer,
      totalItems: spec.totalItems,
      savedItems: spec.savedItems,
      isExcess: spec.isExcess,
      isComplete: spec.isComplete,
      sourceZk: spec.sourceZk,
      sourcePa: spec.sourcePa,
      realizedBy: spec.realizedBy,
      relatedDocument: spec.relatedDocument,
      flags: spec.flags
    })
  );
  nextId += 1;
  docNo += 1;
};

pushDoc({ symbol: 'PZ', totalItems: 14, savedItems: 0, isComplete: false });
pushDoc({ symbol: 'PZ', totalItems: 10, savedItems: 4, isComplete: false });
pushDoc({ symbol: 'PZ', totalItems: 8, savedItems: 8, isComplete: true });
pushDoc({ symbol: 'PZ', totalItems: 9, savedItems: 12, isComplete: true, isExcess: true });
pushDoc({ symbol: 'PZ', totalItems: 6, savedItems: 2, isComplete: false, flags: { usePlaceholder: true } });

pushDoc({ symbol: 'WZ', totalItems: 7, savedItems: 7, isComplete: true, sourceZk: 'ZK 201/MAG/26', sourcePa: 'PA 880/SPR/26' });
pushDoc({ symbol: 'WZ', totalItems: 11, savedItems: 6, isComplete: false, sourceZk: 'ZK 202/MAG/26' });
pushDoc({ symbol: 'WZ', totalItems: 5, savedItems: 0, isComplete: false });
pushDoc({ symbol: 'WZ', totalItems: 4, savedItems: 5, isComplete: true, isExcess: true, sourcePa: 'PA 881/SPR/26' });

const realizedWzSignature = makeSignature('WZ', 555);
pushDoc({
  symbol: 'ZK',
  totalItems: 6,
  savedItems: 6,
  isComplete: true,
  realizedBy: { id: nextId + 10, signature: realizedWzSignature }
});

pushDoc({ symbol: 'ZK', totalItems: 9, savedItems: 2, isComplete: false });
pushDoc({ symbol: 'ZK', totalItems: 4, savedItems: 0, isComplete: false });
pushDoc({ symbol: 'ZK', totalItems: 5, savedItems: 5, isComplete: true });

pushDoc({ symbol: 'WZ', signature: '[ANULOWANY] WZ 333/MAG/26', totalItems: 3, savedItems: 0, isComplete: true });
pushDoc({ symbol: 'PZ', signature: '[USUNIETY] PZ 777/MAG/26', totalItems: 2, savedItems: 2, isComplete: true });

for (let i = 0; i < 9; i += 1) {
  pushDoc({ symbol: 'PZ', totalItems: 5 + (i % 6), savedItems: i % 3, isComplete: false });
}

for (let i = 0; i < 8; i += 1) {
  const total = 6 + (i % 4);
  const saved = i % 2 === 0 ? total : Math.max(0, total - 2);
  pushDoc({ symbol: 'WZ', totalItems: total, savedItems: saved, isComplete: saved === total, sourceZk: `ZK ${320 + i}/MAG/26` });
}

for (let i = 0; i < 8; i += 1) {
  const total = 4 + (i % 5);
  const saved = i % 3 === 0 ? total : Math.max(0, total - 3);
  pushDoc({ symbol: 'ZK', totalItems: total, savedItems: saved, isComplete: saved === total });
}

export const DEMO_DOCUMENTS = documents.sort((a, b) => new Date(b.DataWprowadzenia) - new Date(a.DataWprowadzenia));

export const DEMO_ITEMS_BY_DOC_ID = Object.fromEntries(
  DEMO_DOCUMENTS.map((doc) => [doc.Id, buildItemsForDocument(doc)])
);

const serialSearchRows = [];
for (const doc of DEMO_DOCUMENTS) {
  const items = DEMO_ITEMS_BY_DOC_ID[doc.Id] || [];
  for (const item of items) {
    for (const sn of item.savedSerials || []) {
      if (!sn || String(sn).toLowerCase() === 'brak') continue;
      serialSearchRows.push({
        serialNumber: sn,
        docId: doc.Id,
        docSymbol: doc.Symbol,
        docSignature: doc.NumerWewnetrzny_PelnaSygnatura,
        customer: doc.KlientNazwa,
        itemName: item.Nazwa
      });
    }
  }
}

export const DEMO_SERIAL_ROWS = serialSearchRows;

export const DEMO_LICENSE = {
  status: 'ACTIVE',
  expirationDate: '2027-12-31T23:59:59.000Z',
  hwid: 'DEMO-HWID-8b7f4d12a9f0'
};

export const DEMO_LOCK = {
  isLocked: true,
  message: 'Tryb demo: dokument tylko do podgladu.',
  lockedBy: 'Operator DEMO'
};
