export interface UserModel {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  user?: UserModel;
  message?: string;
}
