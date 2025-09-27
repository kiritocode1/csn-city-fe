import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const ReCaptcha = ({ onVerify }) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
      onVerify(value); // Send token to parent form
    } else {
      setCaptchaVerified(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-3">
      <ReCAPTCHA
        sitekey="6LedNesqAAAAALBS1i89IfkdlPfQJMUjTtmubQFh"
        onChange={handleRecaptchaChange}
      />
    </div>
  );
};

export default ReCaptcha;
