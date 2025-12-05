import CustomAxios from '../lib/CustomAxios';

export const recordApi = {
  create: async ({ recordType, cost, description, date }) => {
    return await CustomAxios.post('/record', { recordType, cost, description, date });
  },
  list: async ({ startDate, endDate }) => {
    return await CustomAxios.get('/record', {
      params: { startDate, endDate }
    });
  },
  update: async (id, updateData) => {
    return await CustomAxios.patch(`/record/${id}`, updateData);
  },
  delete: async (id) => {
    return await CustomAxios.delete(`/record/${id}`);
  },
};
