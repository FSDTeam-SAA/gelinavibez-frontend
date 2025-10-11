import React from "react";

interface BannerProps {
    title: string;
    description?: string;
}

const MiniBanner = ({title, description}: BannerProps) => {
  return (
    <section className="bg-[#e8e8e8] py-10 sm:py-14 md:py-20">
      <div
        className="container mx-auto relative rounded-none md:rounded-[20px] overflow-hidden min-h-[272px] sm:min-h-[272px] md:h-[272px] flex items-center justify-center px-4"
        style={{
          backgroundImage: "url(/assets/contact.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              linear-gradient(274.66deg, rgba(0, 0, 0, 0) 15.7%, rgba(0, 0, 0, 0.2) 72.85%)
            `,
          }}
        />

        {/* Content */}
        <div className="relative text-center max-w-[700px] px-3">
          <h1 className="text-[#F8F9FA] text-2xl sm:text-3xl lg:text-[40px] font-normal mb-3 sm:mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-[#E6E7E6] font-normal leading-relaxed">
          {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MiniBanner;
