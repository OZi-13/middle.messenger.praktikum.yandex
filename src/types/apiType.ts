export type ResponseErrorReason = string | null;

export type ResponseError = {
  reason: ResponseErrorReason | null;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  phone: string;
  email: string;
};
