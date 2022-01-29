export interface IProduct {
  id: number,
  title: string,
  price: number,
  inventory: number
}

const list: IProduct[] = [
  {
    id: 1, title: "Ipad", price: 500, inventory: 2
  },
  {
    id: 2, title: "Mac", price: 90, inventory: 4
  },
  {
    id: 3, title: "Win", price: 12, inventory: 5
  }
]

export const getProducts = async () => {
  await wait(100)
  return list
}

export const buyProducts = async () => {
  await wait(100)
  return Math.random() > 0.5
}

async function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}