import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const ImageCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        console.log('Fetching carousel data from /data/carousel.json');
        // For now, load from local JSON file
        // In production, this could be from an API
        const response = await fetch('/data/carousel.json');
        console.log('Carousel fetch response:', response.status);
        if (!response.ok) throw new Error('Failed to fetch carousel data');
        const data = await response.json();
        console.log('Carousel data loaded:', data);
        setCarouselItems(data);
      } catch (error) {
        console.error('Failed to fetch carousel items:', error);
        // Fallback to empty array
        setCarouselItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarouselItems();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (carouselItems.length > 0) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(timer);
    }
  }, [carouselItems.length]);

  if (isLoading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Loading carousel...</p>
          </div>
        </div>
      </section>
    );
  }

  if (carouselItems.length === 0) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">No carousel images available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          {/* Main carousel container */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-96"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselItems.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder.jpg'; // Fallback image
                  }}
                />
                {/* Overlay content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
                  <div className="text-center text-white max-w-2xl px-6">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      {item.title}
                    </h2>
                    <p className="text-xl sm:text-2xl opacity-95" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          {carouselItems.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-white'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;