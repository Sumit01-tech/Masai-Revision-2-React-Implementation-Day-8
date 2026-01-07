import { useRef, useState } from "react";

function OTPInput() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleClear = () => {
    setOtp(Array(6).fill(""));
    inputsRef.current[0].focus();
  };

  return (
    <div>
      <h2>OTP Input</h2>

      <div style={{ display: "flex", gap: "8px" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "18px"
            }}
          />
        ))}
      </div>

      <p>OTP: {otp.join("")}</p>

      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default OTPInput;
