import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <section className="container py-[80px] md:py-[100px] lg:py-[120px] px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-6">
        {/* Left Side Images */}
        <div>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[540px]">
            <Image
              src="/assets/about2.png"
              alt="about"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <div className="w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[213px]">
              <Image
                src="/assets/about3.png"
                alt="about"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[213px]">
              <Image
                src="/assets/about4.png"
                alt="about"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[213px]">
              <Image
                src="/assets/about5.png"
                alt="about"
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div>
          <h1 className="text-[22px] sm:text-[24px] text-[#0F3D61] font-normal">
            About Us
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#929292] font-normal leading-[170%] mt-4">
            At The Bridge Point Solution, we firmly believe that real estate is
            far more than just buildings—it is about creating spaces that
            inspire, foster meaningful connections, and elevate the lifestyles
            of those who live, work, and thrive within them. Every property we
            design and deliver embodies a harmonious blend of sophistication,
            comfort, and long-term value, carefully crafted to meet the evolving
            needs and aspirations of modern life. From contemporary apartments
            and stylish townhouses to luxurious residences, we aim to provide
            living spaces that reflect elegance, functionality, and timeless
            appeal.
          </p>

          <p className="text-[16px] sm:text-[18px] text-[#929292] font-normal leading-[170%] mt-8 lg:mt-[45px]">
            With years of extensive experience in development, design, and
            construction, we have honed our expertise in bringing visionary
            projects to life. Our portfolio spans a wide spectrum—from
            residential complexes that offer a sense of community and belonging
            to large-scale industrial developments such as factories,
            warehouses, and commercial hubs. Every project is approached with
            meticulous attention to detail, ensuring superior craftsmanship,
            innovation, and practical solutions that stand the test of time.
          </p>

          <p className="text-[16px] sm:text-[18px] text-[#929292] font-normal leading-[170%] mt-8 lg:mt-[45px]">
            At the heart of everything we do are our core values: integrity,
            innovation, and a deep sense of community. These principles guide us
            in setting new benchmarks for design excellence, functionality, and
            sustainability, ensuring that every development is not only
            aesthetically impressive but also environmentally responsible and
            socially enriching. We leverage the latest technologies,
            sustainable building practices, and forward-thinking designs to
            create spaces that are both efficient and inspiring, reflecting a
            commitment to modern urban living that is adaptable, resilient, and
            future-ready. Our journey is driven by passion, guided by
            experience, and inspired by the belief that the spaces we create
            today shape the experiences of tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
