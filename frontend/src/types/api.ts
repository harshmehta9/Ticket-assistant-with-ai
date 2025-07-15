export interface SingupResponce {
    success: boolean,
    token?: string,
    user?:object,
    message?: string
}

export interface LoginResponse{
    success: boolean,
    token?:string, 
    user?: object,
    message?: string
}