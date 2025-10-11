import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact_Information = () => {
  return (
    <section className="container">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 py-10 lg:py-[120px]">
        {/* Map Section */}
        <div className="w-full lg:w-[68%]">
          <iframe
            title="Google Map — Dhaka"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69477.08275918876!2d90.40404542069504!3d23.76736380769399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2z4Kai4Ka-4KaV4Ka-!5e0!3m2!1sbn!2sbd!4v1760161575343!5m2!1sbn!2sbd"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </div>

        {/* Contact Info */}
        <div className="w-full lg:w-[32%]">
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
                support@bridgepointsolution.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-[#0F3D61]" />
              <span className="text-base lg:text-[18px] text-[#343A40]">
                +1 (555) 123-4567
              </span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 lg:h-8 lg:w-8 text-[#0F3D61] mt-1" />
              <span className="text-base lg:text-[18px] text-[#343A40]">
                123 Care Street, City, State, ZIP
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact_Information;
