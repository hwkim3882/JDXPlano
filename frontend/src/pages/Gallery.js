import React, { useState, useRef, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CheckIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

const Gallery = () => {
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [lastLoaded, setLastLoaded] = useState(null);

  const handleFileUpload = async (files) => {
    if (!files.length) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        const fileName = `${Date.now()}-${file.name}`;
        const storageRef = ref(storage, `images/${fileName}`);

        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setImages((prev) => [
          ...prev,
          {
            id: fileName,
            url: url,
            title: file.name,
          },
        ]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleImageSelection = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const loadMoreImages = async () => {
    try {
      const listRef = ref(storage, 'images');
      const result = await listAll(listRef);

      const newImages = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            id: item.name,
            url: url,
            title: item.name,
          };
        })
      );

      setImages((prev) => [...prev, ...newImages]);
      setLastLoaded(result.items[result.items.length - 1]?.name || null);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  useEffect(() => {
    loadMoreImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Gallery</h1>
        {selectedImages.size > 0 && (
          <p className="text-gray-600 mb-4">{selectedImages.size} images selected</p>
        )}

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-600 mb-2">
              {isUploading ? 'Uploading...' : 'Drag and drop images here'}
            </p>
            <p className="text-sm text-gray-500">or click to select files</p>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <InfiniteScroll
        dataLength={images.length}
        next={loadMoreImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer"
            onClick={() => toggleImageSelection(image.id)}
          >
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {selectedImages.has(image.id) && (
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                <CheckIcon className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
