import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h2>Privacy Policy for Community Hub App</h2>
      <p><strong>Effective Date:</strong> 26/09/2025</p>

      <p>
        ItTakesAVillage (“we,” “our,” or “us”) respects your privacy and is
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, and safeguard the data you provide while
        using our app.
      </p>

      <h3>1. Information We Collect</h3>
      <ul>
        <li>
          <strong>Account Information:</strong> We collect your email and
          password securely via Firebase Authentication.
        </li>
        <li>
          <strong>Event Data:</strong> Users can create, edit, or delete events.
        </li>
        <li>
          <strong>Support Requests:</strong> Requests for help (e.g., food,
          clothes, therapy) are stored in Firebase and visible to volunteers.
        </li>
      </ul>

      <h3>2. How We Use Your Information</h3>
      <ul>
        <li>To authenticate and secure your account.</li>
        <li>To allow event creation, editing, and viewing.</li>
        <li>To enable support request submissions and volunteer responses.</li>
        <li>To improve app functionality and user experience.</li>
      </ul>

      <h3>3. Information Sharing</h3>
      <p>
        We do not share your email or password with third parties. Event details
        and support requests are visible only within the app to other users.
      </p>

      <h3>4. Security</h3>
      <p>
        We use Firebase to securely store data, but no method of storage is 100%
        secure. Use a strong password and keep it confidential.
      </p>

      <h3>5. User Responsibilities</h3>
      <p>
        Users are responsible for the content they post. Volunteers should
        respect user confidentiality.
      </p>

      <h3>6. Changes to This Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any significant changes via the app.
      </p>

      <h3>7. Contact Us</h3>
      <p>Email: ittksvllg@gmail.com</p>
    </div>
  );
};

export default PrivacyPolicy;
