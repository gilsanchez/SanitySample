import { Store } from '@/types/store'

interface StorePageProps {
  store: Store
}

export default function StorePage({ store }: StorePageProps) {
  return ( 
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{store.title}</h1>
      <div className="prose max-w-none">
        {/* Add your store content rendering here */}
        {store.content}
      </div>
    </div>
  )
} 