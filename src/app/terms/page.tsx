export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#090b14] pt-32 pb-24 text-white">
      <div className="container max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-gray-300">
          <p className="mb-4">Last updated: March 10, 2026</p>
          <p className="mb-6">Please read these Terms of Service carefully before using our website and services. By accessing or using our services, you agree to be bound by these Terms.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">1. Acceptance of Terms</h2>
          <p className="mb-6">By using Facevia, you agree to comply with all applicable laws and regulations and accept our Terms of Service.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">2. User Content</h2>
          <p className="mb-6">You retain ownership of any photos you upload. By uploading content, you grant us a temporary license to use, process, and modify it solely for the purpose of providing you with our AI photo generation services.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">3. Prohibited Conduct</h2>
          <p className="mb-6">You agree not to upload any content that is illegal, explicit, or violates the rights of others. We reserve the right to terminate accounts that violate our policies.</p>
        </div>
      </div>
    </div>
  );
}
