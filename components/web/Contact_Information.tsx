import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact_Information = () => {
  return (
    <section className="container">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 py-10 lg:py-[120px]">
     

        {/* Contact Info */}
        <div className="w-full ">
          <h1 className="text-2xl lg:text-[32px] font-normal text-[#0F3D61] mb-2">
            Contact Information
          </h1>
          <p className="text-sm lg:text-[16px] font-normal text-[#68706A] leading-relaxed">
            Find all the ways to reach us, including email, phone, and our office
            address, so you can get the support and answers you need quickly and
            easily.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-[#0F3D61]" />
              <span className="text-base lg:text-[18px] text-[#343A40]">
                 Info@mybridgepointsolutions.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-[#0F3D61]" />
              <span className="text-base lg:text-[18px] text-[#343A40]">
                +315-533-3918
              </span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 lg:h-6 lg:w-6 text-[#0F3D61] mt-1" />
              <span className="text-base lg:text-[18px] text-[#343A40]">
                418 Broadway suite 6217, Albany,N.Y.12207
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact_Information;
