import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-text-primary mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-theme-text-secondary">
        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">1. Introduction</h2>
          <p>This Privacy Policy explains how GenshinWishSimulator ("we," "us," or "our") collects, uses, and protects your personal information. By using our Service, you agree to the collection and use of information in accordance with this policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold text-theme-text-primary mb-2">2.1 Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Email address</li>
            <li>Username</li>
            <li>Profile information</li>
            <li>Game preferences and settings</li>
          </ul>

          <h3 className="text-xl font-semibold text-theme-text-primary mb-2">2.2 Usage Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent</li>
            <li>Device information</li>
            <li>Game interaction data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">3. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining the Service</li>
            <li>Improving user experience</li>
            <li>Processing transactions</li>
            <li>Sending service updates and notifications</li>
            <li>Analyzing usage patterns</li>
            <li>Preventing fraud and abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">4. Data Storage and Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">5. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">6. Third-Party Services</h2>
          <p>Our Service may contain links to third-party websites or services. We are not responsible for their privacy practices. We encourage you to review their privacy policies.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">7. Children's Privacy</h2>
          <p>Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">9. International Data Transfers</h2>
          <p>Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">10. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: privacy@fnafinrealtime.com</li>
            <li>Website: www.fnafinrealtime.com/contact</li>
          </ul>
        </section>

        <section>
          <p className="text-sm">Last updated: January 2024</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 