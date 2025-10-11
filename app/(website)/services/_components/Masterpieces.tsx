import Image from 'next/image'
import React from 'react'

const Masterpieces = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        {/* Heading */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-[#0F3D61] font-normal mb-2 text-center md:text-left">
          Our Masterpieces
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#929292] font-normal text-center md:text-left max-w-2xl mx-auto md:mx-0">
          From modern residences to grand developments, our projects reflect artistry, trust.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-10 md:py-[60px]">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Two images side by side on md+, stacked on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="w-full h-[250px] sm:h-[300px] md:h-[355px]">
                <Image
                  src="/assets/masterpis4.jpg"
                  alt="Masterpiece 4"
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded-[8px] object-cover"
                />
              </div>
              <div className="w-full h-[250px] sm:h-[300px] md:h-[355px]">
                <Image
                  src="/assets/masterpis3.jpg"
                  alt="Masterpiece 3"
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded-[8px] object-cover"
                />
              </div>
            </div>

            {/* Bottom image */}
            <div className="w-full h-[200px] sm:h-[250px] md:h-[271px]">
              <Image
                src="/assets/masterpis2.jpg"
                alt="Masterpiece 2"
                width={1000}
                height={1000}
                className="w-full h-full rounded-[8px] object-cover"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px]">
            <Image
              src="/assets/masterpis1.jpg"
              alt="Masterpiece 1"
              width={1000}
              height={1000}
              className="w-full h-full rounded-[8px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Masterpieces
