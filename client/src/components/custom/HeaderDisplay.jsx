import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeaderDisplay = () => {
  const imagesData = [
    "https://images.pexels.com/photos/2046807/pexels-photo-2046807.jpeg",
    "https://images.pexels.com/photos/8294677/pexels-photo-8294677.jpeg",
    "https://images.pexels.com/photos/8294672/pexels-photo-8294672.jpeg",
    "https://images.pexels.com/photos/132539/pexels-photo-132539.jpeg",
  ];

  return (
    <div>
      <Carousel className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible">
        <CarouselContent>
          {imagesData.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                loading="lazy"
                className="object-cover w-full h-[60vh] rounded-3xl"
                alt={`Slide ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeaderDisplay;
