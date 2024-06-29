"use client"
import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import { useRouter } from "next/navigation"; // Importer useRouter depuis next/navigation

const Hero = () => {
  const router = useRouter(); // Initialiser useRouter

  const handleButtonClick = () => {
    router.push("/vacation"); // Rediriger vers la page /vacation
  };

  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          The perfect vacation for you!
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Find the vacation of your dreams in just a few clicks
        </p>
        <button
          className="btn btn-primary btn-wide text-white"
          onClick={handleButtonClick} // Ajouter l'événement onClick
        >
          Organize your next vacation
        </button>

        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src="/vacance.webp"
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
