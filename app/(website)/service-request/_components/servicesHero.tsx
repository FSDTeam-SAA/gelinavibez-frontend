import Image from "next/image"

export function ServicesHero() {
    return (
        <section className="relative h-[500px] md:h-[650px] lg:h-[800px] flex items-center justify-center overflow-hidden">
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
            <div className="absolute inset-0 bg-[#00000066]/40" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 md:px-6 lg:px-4 container mx-auto">
                {/* Logo */}
                <div className="flex flex-col justify-center items-center mb-6 md:mb-8 w-[150px]  h-[100px] md:w-[280px] md:h-[210px] lg:w-[324px] lg:h-[243px] mx-auto">
                    <Image src="/assets/logo2.png" alt="Logo" width={1000} height={1000} className="w-full h-full" />
                </div>

                <h1 className="text-[#EFDACB] text-2xl md:text-4xl lg:text-[56px] xl:text-6xl font-normal mb-4 md:mb-6 leading-tight px-2">
                    Apply to your new home pest control with bridge point solutions
                </h1>

                <p className="text-[#DAE0E4] text-sm md:text-base lg:text-lg mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto">
                    We accept voucher application! Fast and secured processing, upload required documents with ease.
                </p>

            </div>
        </section>
    )
}
