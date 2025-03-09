
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl overflow-hidden h-96 w-full shadow-subtle">
        <img 
          src={images[selectedImage]} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`h-20 w-20 rounded-md overflow-hidden shadow-sm flex-shrink-0 transition-all ${
                selectedImage === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image} 
                alt={`${name} - view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
