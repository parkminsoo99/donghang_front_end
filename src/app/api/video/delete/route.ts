import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { videoUrl } = await req.json();

    const res = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/video/delete`,
      data: {
        videoUrl: videoUrl,
      },
    });
    return NextResponse.json({ message: 'Delete Success', res });
  } catch (e) {
    console.log('Delete Error: ' + e);
    return NextResponse.json({ message: 'Delete Fail', e }, { status: 500 });
  }
}
