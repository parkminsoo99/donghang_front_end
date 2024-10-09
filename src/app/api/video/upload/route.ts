import { NextRequest, NextResponse } from 'next/server';
import isNil from 'lodash/isNil';

export async function POST(request: NextRequest) {
  try {
    const requestFromData = await request.formData();
    const avatarFile = requestFromData.get('avatar') as File | null;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: (await avatarFile.arrayBuffer()) as Buffer,
      }
    );
    const data = await res.json();
    console.log('data', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in upload:', error);
    return NextResponse.json(
      { message: 'Upload failed', error },
      { status: 500 }
    );
  }
}
