"use client";

import { use } from 'react';
import api from '@/api/apiConfig';

async function getData() {
  const { data } = await api.get('tip', {
        params: { page: 1, pageSize: 4 },
      });
  return data;
}

export default function TipsList() {
  const tips = use(getData());

  return JSON.stringify(tips);
}