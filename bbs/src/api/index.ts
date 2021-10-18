export interface page {
  currentPage: number
  pageSize: number
}


export interface IGetCid {
  cid: string
}

export type IGetPosts = IGetCid & page

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  email: string
  password: string
  nickName: string
}

export interface ICreatePost {
  title?: string
  content?: string
  image?: string
  column?: string
  author?: string
}
