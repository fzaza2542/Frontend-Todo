import { NextResponse } from 'next/server';
import { fetchGroupedUsers } from '@/services/fetchGroupedUsers';

export async function GET() {
  const data = await fetchGroupedUsers();
  return NextResponse.json(data);
}
