export interface Movie {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  imgFullScreen: string;
  trailer: string;
  year: number;

  createdAt: Date;
  updatedAt: Date;
}
