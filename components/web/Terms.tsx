"use client";

import React from "react";

const Terms = () => {
  return (
    <div className="container mx-auto p-4 py-[60px]">
      <h4 className="text-2xl font-bold mb-4 text-[#424242]">
        Terms & Conditions 
      </h4>

      <ol className="list-decimal pl-5 space-y-4 text-[#616161] mt-[40px]">
        
        <li className="text-base">
          <strong>Use of Platform:</strong>{" "}
          Bridge Point Solutions LLC is a connecting and coordination platform.
        </li>

        <li className="text-base">
          <strong>No Guarantees:</strong>{" "}
          Listing an apartment or service does not guarantee approval, placement,
          or availability after application.
        </li>

        <li className="text-base">
          <strong>Third-Party Responsibility:</strong>{" "}
          BPS is not liable for services, actions, omissions, pricing,
          performance, warranties, or outcomes of any third parties you choose
          to engage through this platform.
        </li>

        <li className="text-base">
          <strong>User Due Diligence:</strong>{" "}
          Verify credentials, review contracts, and confirm scope, timeline, and
          pricing directly with the responsible party.
        </li>

        <li className="text-base">
          <strong>Fees & Refunds:</strong>{" "}
          Platform, application, and processing fees are non-refundable unless
          stated otherwise in writing.
        </li>

        <li className="text-base">
          <strong>Privacy & Security:</strong>{" "}
          We protect your data and restrict access through role-based
          permissions. See Privacy Policy.
        </li>
      </ol>

  
    </div>
  );
};

export default Terms;
