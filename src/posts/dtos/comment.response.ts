export class CommentUserResponseDto {
  id: number;
  nickName: string;
}

export class CommentResponseDto {
  id: number;
  content: string; // isDeleted면 '' 또는 '삭제된 댓글입니다' 정책 선택
  isDeleted: boolean;
  createdAt: Date;

  postId: number;
  userId: number;
  parentId: number | null;

  user: CommentUserResponseDto;

  children: CommentResponseDto[];
}
