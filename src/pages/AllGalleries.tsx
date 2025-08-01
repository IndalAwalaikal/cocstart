import React from 'react';
import GalleryCard from '../components/GalleryCard';
import type { GalleryItem } from '../types'; // Use type-only import

const mockGallery: GalleryItem[] = [
  { id: '1', title: 'Workshop 2025', category: 'Workshop', imageUrl: '/assets/gallery/workshop.jpg' },
  { id: '2', title: 'Seminar Tech', category: 'Seminar', imageUrl: '/assets/gallery/seminar.jpg' },
  { id: '3', title: 'Hackathon 2025', category: 'Hackathon', imageUrl: '/assets/gallery/workshop.jpg' },
  { id: '4', title: 'Webinar AI', category: 'Webinar', imageUrl: '/assets/gallery/seminar.jpg' },
];

const AllGalleries: React.FC = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-light-blue mb-4">Semua Galeri</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {mockGallery.map(item => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default AllGalleries;