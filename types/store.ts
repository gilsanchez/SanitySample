export interface Store {
  _id: string
  title: string
  slug: {
    current: string
  }
  section: string
  content: any // Replace with more specific type based on your content structure
} 