export type User = {
  username: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginFieldErrors = {
  username?: string;
  password?: string;
};
