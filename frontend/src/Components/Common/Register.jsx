import React, { useState } from 'react';
import HttpnInstance from "../Api/nodeapi";

const RegistrationForm = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    Address: "",
    Taluka: "",
    District: "",
    Village: "",
    AadharNumber: "",
    Gender: "Male",
    Age: "",
    PhoneNumber: "",
  });

  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP sending
    try {
      const response = await HttpnInstance.post('/send-otp',
        { email },
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false);
      setStep('otp');
    } catch (error) {
      console.log('Error sending OTP:', error);
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP verification
    try {
      const response = await HttpnInstance.post('/verify-otp',
        { email, otp },
      );
      console.log(response.data);
      setLoading(false);
      setStep('registration');
    } catch (error) {
      console.log('Error verifying OTP:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some(value => value.toString().trim() === "")) {
      console.log("Please fill out all required fields");
      return;
    }
    if (formData.PhoneNumber.length !== 10) {
      console.log("Please enter a valid phone number");
      return;
    }
    if (formData.AadharNumber.length !== 12) {
      console.log("Please enter a valid Aadhar Number");
      return;
    }

    try {
      setLoading(true);
      HttpnInstance.post("/user/createUser", { ...formData, email }).then(() => {
        setLoading(false);
        console.log("Registration Successful. We will contact you soon.");
        alert("Registration Successful. An email will be sent with credentials to login");
        setFormData({
          FullName: "",
          Address: "",
          Taluka: "",
          District: "",
          Village: "",
          AadharNumber: "",
          Gender: "Male",
          Age: "",
          PhoneNumber: "",
        });
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    console.log("Registration Successful. We will contact you soon.");

    // Reset form
    setFormData({
      FullName: "",
      Address: "",
      Taluka: "",
      District: "",
      Village: "",
      AadharNumber: "",
      Gender: "Male",
      Age: "",
      PhoneNumber: "",
    });
    setEmail('');
    setOtp('');
    setStep('email');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 'email' && ""}
          {step === 'otp' && ""}
          {step === 'registration' && ""}
        </h2>

        {step === 'email' && (
          <form onSubmit={sendOTP} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOTP} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 'registration' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="FullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="FullName"
                name="FullName"
                value={formData.FullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="Address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                required
                placeholder="Enter your address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Village" className="block text-sm font-medium text-gray-700 mb-1">
                  Village
                </label>
                <input
                  id="Village"
                  name="Village"
                  value={formData.Village}
                  onChange={handleInputChange}
                  required
                  placeholder="Village"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="Taluka" className="block text-sm font-medium text-gray-700 mb-1">
                  Taluka
                </label>
                <input
                  id="Taluka"
                  name="Taluka"
                  value={formData.Taluka}
                  onChange={handleInputChange}
                  required
                  placeholder="Taluka"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="District" className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                id="District"
                name="District"
                value={formData.District}
                onChange={handleInputChange}
                required
                placeholder="District"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="AadharNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number
              </label>
              <input
                id="AadharNumber"
                name="AadharNumber"
                value={formData.AadharNumber}
                onChange={handleInputChange}
                required
                placeholder="12-digit Aadhar number"
                maxLength={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="Gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="Age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  id="Age"
                  name="Age"
                  type="number"
                  value={formData.Age}
                  onChange={handleInputChange}
                  required
                  placeholder="Age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="10-digit number"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;