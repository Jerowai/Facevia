export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#090b14] pt-32 pb-24 text-white">
      <div className="container max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="mb-4">Last updated: March 10, 2026</p>
          <p className="mb-6">At Facevia, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share information about you when you use our website and services.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">1. Information We Collect</h2>
          <p className="mb-6">We collect information you provide directly to us, such as when you create an account, upload photos for AI generation, or communicate with us.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">2. How We Use Your Information</h2>
          <p className="mb-6">We use the information we collect to operate, maintain, and provide the features and functionality of our services, including to process your photos and generate dating-ready AI portraits.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">3. Data Security</h2>
          <p className="mb-6">We implement security measures to protect your personal information against unauthorized access, alteration, and destruction. All uploaded photos are securely processed and deleted according to our retention policies.</p>
        </div>
      </div>
    </div>
  );
}
