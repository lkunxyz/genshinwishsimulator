import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-text-primary mb-8">Terms of Service</h1>
      
      <div className="space-y-8 text-theme-text-secondary">
        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using GenshinWishSimulator ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">2. Description of Service</h2>
          <p>GenshinWishSimulator is a gaming platform that provides access to various online games and related content. The Service may include interactive features, game downloads, updates, and communications.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">3. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 13 years old to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to provide accurate and complete information when creating an account.</li>
            <li>You are solely responsible for all activities that occur under your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service for any unlawful purpose</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Post inappropriate or offensive content</li>
            <li>Attempt to gain unauthorized access to the Service</li>
            <li>Interfere with or disrupt the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">5. Intellectual Property</h2>
          <p>All content on the Service, including but not limited to games, graphics, text, and software, is the property of GenshinWishSimulator or its licensors and is protected by intellectual property laws.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">6. User Content</h2>
          <p>By submitting content to the Service, you grant GenshinWishSimulator a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute the content.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">7. Third-Party Games</h2>
          <p>The Service may include games and content from third-party providers. These items are subject to their own terms of service and privacy policies.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">8. Limitation of Liability</h2>
          <p>GenshinWishSimulator is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">9. Modifications to Service</h2>
          <p>We reserve the right to modify or discontinue the Service at any time without notice. We may also update these terms from time to time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">10. Termination</h2>
          <p>We may terminate or suspend your access to the Service immediately for violations of these terms or for any other reason at our discretion.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">11. Governing Law</h2>
          <p>These terms are governed by and construed in accordance with the laws of the jurisdiction in which GenshinWishSimulator operates.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">12. Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us at support@fnafinrealtime.com</p>
        </section>

        <section>
          <p className="text-sm">Last updated: January 2024</p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 