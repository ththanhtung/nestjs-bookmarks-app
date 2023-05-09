import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { CreateBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userId: number) {
    return this.prisma.bookMark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookMark.findFirst({
        where: {
            userId,
            id: bookmarkId
        }
    })
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const newBookmark = await this.prisma.bookMark.create({
        data: {
            userId,
            ...dto
        }
    })

    return newBookmark
  }

  async editBookmark(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookMark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.bookMark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmark(userId: number, bookmarkId: number) {
     const bookmark = await this.prisma.bookMark.findUnique({
       where: {
         id: bookmarkId,
       },
     });

     // check if user owns the bookmark
     if (!bookmark || bookmark.userId !== userId)
       throw new ForbiddenException('Access to resources denied');

     await this.prisma.bookMark.delete({
       where: {
         id: bookmarkId,
       },
     });
  }
}
