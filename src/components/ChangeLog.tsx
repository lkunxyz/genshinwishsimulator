import React from 'react';

const ChangeLog: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-theme-text-primary mb-8">Change Log</h1>
      
      <div className="space-y-8 text-theme-text-secondary">
        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">May 16, 2025 Update</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Added Multi-language Support: New support for Simplified Chinese, Traditional Chinese, and more languages</li>
            <li>Game Performance Optimization: Enhanced game running smoothness</li>
            <li>UI Improvements: Optimized user interface for better experience</li>
            <li>Bug Fixes: Resolved multiple game stability issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">May 14, 2025 Update</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>New Game Mode: Added brand new gameplay features</li>
            <li>Character System Update: Enhanced character customization options</li>
            <li>Social Features Optimization: Improved friend system and social interactions</li>
            <li>Technical Upgrade: Updated core game engine</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-theme-text-primary mb-4">May 12, 2025 Update</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Initial Public Release</li>
            <li>Basic Game Features Launch</li>
            <li>Multi-platform Support: Windows, MacOS, and Linux compatibility</li>
            <li>Account System: Implemented basic user registration and login functionality</li>
          </ul>
        </section>

        <section>
          <p className="text-sm mt-8">Last Updated: May 16, 2025</p>
        </section>
      </div>
    </div>
  );
};

export default ChangeLog; 