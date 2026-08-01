export const mobileDemoData = {
  company: {
    name: 'Firma demonstracyjna',
    taxId: 'XXX-XXX-XX-XX',
  },
  document: {
    id: 'zk-demo-08-2026',
    type: 'ZK',
    number: 'ZK DEMO/08/2026',
    date: '01.08.2026',
    relatedDocument: 'WZ DEMO/08/2026',
    salesDocument: 'FS DEMO/08/2026',
  },
  product: {
    id: 'net-demo-01',
    symbol: 'NET-DEMO-01',
    name: 'Router przemysłowy DEMO',
    requiredQuantity: 2,
    serialNumbers: ['SN-DEMO-2026-000123', 'SN-DEMO-2026-000124'],
  },
  documents: [
    {
      id: 'zk-demo-08-2026',
      type: 'ZK',
      number: 'ZK DEMO/08/2026',
      company: 'Firma demonstracyjna',
      progress: 0,
      required: 2,
      status: 'Do uzupełnienia',
    },
    {
      id: 'wz-demo-08-2026',
      type: 'WZ',
      number: 'WZ DEMO/08/2026',
      company: 'Klient testowy',
      progress: 3,
      required: 5,
      status: 'W trakcie',
    },
    {
      id: 'pz-demo-08-2026',
      type: 'PZ',
      number: 'PZ DEMO/08/2026',
      company: 'Dostawca demonstracyjny',
      progress: 4,
      required: 4,
      status: 'Uzupełnione',
    },
  ],
  pickingStates: [
    {
      pickedQuantity: 0,
      status: 'Do zebrania',
      message: 'Zeskanuj pierwszy produkt',
    },
    {
      pickedQuantity: 1,
      status: 'Częściowo',
      message: 'Zebrano pierwszą sztukę',
    },
    {
      pickedQuantity: 2,
      status: 'Zebrane',
      message: 'Pozycja jest kompletna',
    },
  ],
  scanner: {
    formats: ['Code 128', 'Code 39', 'EAN', 'UPC', 'QR'],
    singleModeLabel: 'Pojedynczy',
    seriesModeLabel: 'Seryjny',
    narrowTargetLabel: 'Wąski celownik',
    fullTargetLabel: 'Pełny kadr',
  },
}
