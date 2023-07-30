import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('name is required', { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse('Images is required', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('categoryId is required', { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse('sizeId is required', { status: 400 });
    }
    if (!colorId) {
      return new NextResponse('colorId is required', { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorised');
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[Billboards_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[Billboards_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
