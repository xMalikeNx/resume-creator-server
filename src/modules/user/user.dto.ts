export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdateProfileDto {
  firstName: string;
  lastName: string;
  about: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  profession: string;
  birthDate: string;
}
