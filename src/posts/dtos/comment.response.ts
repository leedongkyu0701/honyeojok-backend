export class CommentUserResponseDto {
  id: number;
  nickName: string;
}

export class CommentResponseDto {
  id: number;
  content: string;
  isDeleted: boolean;
  createdAt: Date;

  postId: number;
  userId: number;
  parentId: number | null;

  user: CommentUserResponseDto;

  children: CommentResponseDto[];
}
