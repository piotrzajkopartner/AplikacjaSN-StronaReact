import { DEMO_DOCUMENTS, DEMO_ITEMS_BY_DOC_ID, DEMO_SERIAL_ROWS, DEMO_LICENSE, DEMO_LOCK } from './demoData';

const getClientId = () => {
  let clientId = localStorage.getItem('sn_client_id');
  if (!clientId) {
    clientId = `demo-${Math.random().toString(36).slice(2, 14)}`;
    localStorage.setItem('sn_client_id', clientId);
  }
  return clientId;
};

export const clientId = getClientId();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const httpError = (status, data, message) => {
  const err = new Error(message || data?.message || data?.error || 'Request failed');
  err.response = { status, data };
  return err;
};

const parseQuery = (url) => {
  const raw = url.includes('?') ? url.split('?')[1] : '';
  return new URLSearchParams(raw);
};

const paginate = (rows, page, limit) => {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.max(1, Number(limit) || 50);
  const start = (p - 1) * l;
  const end = start + l;
  return {
    data: rows.slice(start, end),
    total: rows.length,
    page: p,
    totalPages: Math.max(1, Math.ceil(rows.length / l))
  };
};

const filterByStatus = (rows, status) => {
  if (status === 'completed') {
    return rows.filter((doc) => doc.IsComplete || doc.IsExcess);
  }
  if (status === 'pending') {
    return rows.filter((doc) => !doc.IsComplete || doc.IsExcess);
  }
  return rows;
};

const demoDocuments = DEMO_DOCUMENTS.map((doc) => ({ ...doc }));

const getDocuments = (url) => {
  const query = parseQuery(url);
  const page = Number(query.get('page') || 1);
  const limit = Number(query.get('limit') || 50);
  const status = query.get('status') || '';
  const docType = query.get('docType') || 'PZ';

  const byType = demoDocuments.filter((doc) => doc.Symbol === docType);
  const byStatus = filterByStatus(byType, status);
  const sorted = [...byStatus].sort((a, b) => {
    if (a.IsExcess !== b.IsExcess) return a.IsExcess ? -1 : 1;
    return new Date(b.DataWprowadzenia) - new Date(a.DataWprowadzenia);
  });

  return paginate(sorted, page, limit);
};

const getDocument = (id) => {
  const doc = demoDocuments.find((item) => item.Id === Number(id));
  if (!doc) throw httpError(404, { error: 'NOT_FOUND', message: 'Nie znaleziono dokumentu.' });
  return { ...doc };
};

const getDocumentItems = (id) => {
  const items = DEMO_ITEMS_BY_DOC_ID[Number(id)];
  if (!items) throw httpError(404, { error: 'NOT_FOUND', message: 'Brak pozycji dokumentu.' });
  return items.map((item) => ({ ...item, savedSerials: [...(item.savedSerials || [])] }));
};

const getSerialSearch = (url) => {
  const query = parseQuery(url);
  const q = (query.get('q') || '').trim().toLowerCase();
  const scope = query.get('scope') || 'all';
  const page = Number(query.get('page') || 1);
  const pageSize = 12;

  if (!q) {
    return {
      data: [],
      meta: { totalDocs: 0, totalSerials: 0, page, hasMore: false }
    };
  }

  let docCandidates = demoDocuments;
  let serialCandidates = DEMO_SERIAL_ROWS;

  if (scope !== 'all' && scope !== 'sn') {
    docCandidates = docCandidates.filter((d) => d.Symbol === scope);
    serialCandidates = serialCandidates.filter((r) => r.docSymbol === scope);
  }

  const docMatches = scope === 'sn'
    ? []
    : docCandidates
      .filter((doc) => {
        const hay = `${doc.NumerWewnetrzny_PelnaSygnatura} ${doc.KlientNazwa} ${doc.KlientNIP}`.toLowerCase();
        return hay.includes(q);
      })
      .map((doc) => ({
        type: 'document',
        id: doc.Id,
        title: doc.NumerWewnetrzny_PelnaSygnatura,
        subtitle: `${doc.KlientNazwa} (${doc.KlientNIP || 'Brak NIP'})`
      }));

  const serialMatches = serialCandidates
    .filter((row) => row.serialNumber.toLowerCase().includes(q))
    .map((row) => ({
      type: 'serial',
      actionDocumentId: row.docId,
      title: row.serialNumber,
      subtitle: `${row.docSignature} | ${row.itemName} | ${row.customer}`
    }));

  const merged = [...docMatches, ...serialMatches];
  const start = (Math.max(1, page) - 1) * pageSize;
  const pageRows = merged.slice(start, start + pageSize);

  return {
    data: pageRows,
    meta: {
      totalDocs: docMatches.length,
      totalSerials: serialMatches.length,
      page: Math.max(1, page),
      hasMore: start + pageSize < merged.length
    }
  };
};

const checkDuplicate = (url) => {
  const query = parseQuery(url);
  const sn = (query.get('sn') || '').replace(/\s+/g, '').toLowerCase();
  const excludeDocId = Number(query.get('excludeDocId') || 0);

  if (!sn || sn === 'brak') {
    return { isDuplicate: false };
  }

  const hit = DEMO_SERIAL_ROWS.find((row) => row.serialNumber.toLowerCase() === sn && row.docId !== excludeDocId);
  if (!hit) return { isDuplicate: false };

  return {
    isDuplicate: true,
    existingDocument: `${hit.docSignature} (${hit.docSymbol})`
  };
};

const getPdfPreviewPath = (doc) => {
  if (!doc) return '/demo-pdfs/warranty-default.svg';
  if (doc.Symbol === 'PA') return '/demo-pdfs/warranty-pa.svg';
  if (doc.Symbol === 'WZ') return '/demo-pdfs/warranty-wz.svg';
  return '/demo-pdfs/warranty-default.svg';
};

export const openWarrantyPreview = (document) => {
  const url = getPdfPreviewPath(document);
  window.open(url, '_blank', 'noopener,noreferrer');
};

const api = {
  defaults: {
    baseURL: '/api'
  },

  async get(url) {
    await delay(120);

    if (url.startsWith('/documents?')) return { data: getDocuments(url) };

    const matchDocItems = url.match(/^\/documents\/(\d+)\/items$/);
    if (matchDocItems) return { data: getDocumentItems(matchDocItems[1]) };

    const matchDocLock = url.match(/^\/documents\/(\d+)\/lock/);
    if (matchDocLock) return { data: { ...DEMO_LOCK } };

    const matchDoc = url.match(/^\/documents\/(\d+)$/);
    if (matchDoc) return { data: getDocument(matchDoc[1]) };

    if (url.startsWith('/serials/search')) return { data: getSerialSearch(url) };
    if (url.startsWith('/serials/check-duplicate')) return { data: checkDuplicate(url) };

    if (url === '/license/status') {
      return {
        data: {
          status: 'ACTIVE',
          expirationDate: DEMO_LICENSE.expirationDate,
          hwid: DEMO_LICENSE.hwid
        }
      };
    }

    throw httpError(404, { error: 'NOT_FOUND', message: `Brak mocka dla endpointu GET ${url}` });
  },

  async post(url) {
    await delay(120);

    if (url.match(/^\/documents\/\d+\/lock$/)) {
      return {
        data: {
          lockedByMe: false,
          isLocked: true,
          message: 'Tryb demo: edycja zablokowana (read-only).'
        }
      };
    }

    if (url.match(/^\/documents\/\d+\/unlock$/)) {
      return { data: { success: true } };
    }

    if (url === '/serials') {
      throw httpError(423, {
        error: 'DEMO_READ_ONLY',
        message: 'Tryb demo: zapis numerów seryjnych jest wyłączony.'
      });
    }

    throw httpError(404, { error: 'NOT_FOUND', message: `Brak mocka dla endpointu POST ${url}` });
  },

  interceptors: {
    response: {
      use() {
        return 0;
      }
    }
  }
};

export const endpoints = {
  getDocuments: (page = 1, limit = 50, status = '', docType = 'PZ') =>
    api.get(`/documents?page=${page}&limit=${limit}&status=${status}&docType=${docType}`),
  getDocument: (id) => api.get(`/documents/${id}`),
  lockDocument: (id) => api.post(`/documents/${id}/lock`, { clientId }),
  unlockDocument: (id) => api.post(`/documents/${id}/unlock`, { clientId }),
  checkLock: (id) => api.get(`/documents/${id}/lock?clientId=${clientId}`)
};

export default api;
