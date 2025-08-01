export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isAccepted: boolean;
  profilePicture?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  date?: string; // Added optional date field
}

export interface TestItem {
  id: string;
  title: string;
  description: string;
  type: 'mcq' | 'essay';
}