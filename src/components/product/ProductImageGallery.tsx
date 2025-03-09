
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl overflow-hidden h-96 w-full shadow-subtle relative">
        {/* Main image with loading indicator */}
        <div className="w-full h-full relative bg-gray-100">
          <img 
            src={images[selectedImage]} 
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imagesLoaded[selectedImage] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(selectedImage)}
            loading="eager"
          />
          
          {/* Loading spinner */}
          {!imagesLoaded[selectedImage] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`h-20 w-20 rounded-md overflow-hidden shadow-sm flex-shrink-0 transition-all relative bg-gray-100 ${
                selectedImage === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image} 
                alt={`${name} - view ${index + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
                loading="eager"
              />
              
              {/* Loading indicator for thumbnails */}
              {!imagesLoaded[index] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
