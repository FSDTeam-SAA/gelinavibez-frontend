import Image from "next/image";
interface BannerProps {
    title: string;
    description?: string;
}

export function Banner({title, description}: BannerProps) {
  return (
    <section className="relative h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt="Hero Background"
          width={1000}
          height={1000}
          className="w-full h-full "
        />
      </div>
      <div className="absolute inset-0 bg-[#0F3D61]/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 container mx-auto">
        <h1 className="text-[#EFDACB] text-3xl lg:text-[56px] xl:text-6xl font-normal mb-6 leading-tight ">
          {title}
        </h1>

        <p className="text-[#DAE0E4] text-base lg:text-lg mb-12 w-full mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
