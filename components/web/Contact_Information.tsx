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
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13959.102296746623!2d-73.75970340835015!3d42.64991578276417!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0a2126a34f81%3A0xfbdcba57e4fa777!2s418%20Broadway%20%236217%2C%20Albany%2C%20NY%2012207%2C%20USA!5e0!3m2!1sen!2sbd!4v1761622949130!5m2!1sen!2sbd" 
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
