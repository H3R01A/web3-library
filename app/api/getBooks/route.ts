import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  try {
    const response = await getFavoritesFrmDB();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    );
  }
}
