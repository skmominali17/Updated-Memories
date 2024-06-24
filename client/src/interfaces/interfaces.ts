export interface Post {
    _id: string;
    title: string;
    message: string;
    tags: string;
    image: string;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
}
