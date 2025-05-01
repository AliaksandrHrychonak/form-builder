export interface IRequest {}

export interface IRequestSignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IRequestPaging {
    search?: string;
    page?: number;
    perPage?: number;
}
