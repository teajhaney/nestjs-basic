import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      title: 'First Blog',
      content: 'This is the content of the first blog',
    },
    {
      id: 2,
      title: 'Second Blog',
      content: 'This is the content of the second blog',
    },
  ];
  findAll() {
    return this.blogs;
  }

  findById(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }
}
