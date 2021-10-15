export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: GlobalColumnsProps
  posts: GlobalPostsProps
  user: UserProps
}

interface GlobalPostsProps {
  data: ListProps<PostProps>
  loadedColumns: string[] // 加载过的columnId放在数组中
}

export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?: string
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

interface GlobalColumnsProps {
  // 扩展接口类型，添加一个是否请求后台的判断
  data: ListProps<ColumnProps>
  currentPage: number
  total: number
}

// 泛型定义的通用接口
interface ListProps<P> {
  [id: string]: P
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
