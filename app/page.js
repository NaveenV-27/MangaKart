import Carousel from "./components/Carousel";

export default function Home() {
  const slides = [
    { image: '/images/slide1.jpg', alt: 'Slide 1', caption: 'Slide 1 Caption' },
    { image: '/images/slide2.jpg', alt: 'Slide 2', caption: 'Slide 2 Caption' },
    { image: '/images/slide3.jpg', alt: 'Slide 3', caption: 'Slide 3 Caption' },
  ];

  return (
    <>
      
      
      <div className="h-[89.7vh] text-3xl flex-center bg-gradient-to-r from-slate-900 to-slate-700">
        <Carousel slides={slides} interval={5000}/>
      </div>
    </>
  );
}
