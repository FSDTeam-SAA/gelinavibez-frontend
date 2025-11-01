"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ModalDisclaimer() {
  const [showModal, setShowModal] = useState(false);
  const [agree, setAgree] = useState(false);
  const timerStarted = useRef(false); // prevent re-runs on navigation

  useEffect(() => {
    // Don't show again if already accepted
    const hasAgreed = localStorage.getItem("globalDisclaimerAccepted");
    if (hasAgreed) return;

    // Only start timer once
    if (!timerStarted.current) {
      timerStarted.current = true;

      setTimeout(() => {
        setShowModal(true);
      }, 1000); // 40 seconds
    }
  }, []);

  const handleAgree = () => {
    if (!agree) return;
    localStorage.setItem("globalDisclaimerAccepted", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
      <div className="bg-white max-w-6xl p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>

        <div className=" space-y-2  overflow-y-auto text-base text-[#616161]">
          <p>• Submission of any application does not guarantee approval, placement, scheduling, or availability.</p>
          <p>• All decisions, approvals, timelines, pricing, and outcomes are determined by the responsible service provider or property owner.</p>
          <p>• You are responsible for reviewing all terms, verifying details, and performing due diligence before entering any agreement.</p>
          <p>• Fees paid for processing or scheduling are non-refundable unless explicitly stated otherwise in writing.</p>
          <p>• Tenants only: Background check and screening are required to process your application.</p>
         
        </div>

        <div className="mt-4 flex gap-2 items-center">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="w-4 h-4"
          />
          <label className="text-base">I have read and agree to the Application Disclaimer and <Link href="/terms" className="hover:underline"><span className="hover:underline">Terms & Conditions</span> </Link> , and (for tenant applications) I authorize a background check</label>
        </div>

        <button
          onClick={handleAgree}
          className={`mt-4 w-full h-[48px] rounded-[8px] text-white 
          ${agree ? "bg-[#0F3D61] hover:bg-[#0F3D61]/90 " : "bg-gray-400 cursor-not-allowed"}`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
