import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-[#ffffff99] py-12 px-4 h-screen sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl leading-9 font-extrabold text-gray-900 sm:text-2xl sm:leading-10">
          About the Organisation
        </h2>
        <p className="mt-3 text-lg leading-7 text-gray-600">
          Namaste! Welcome to Shri CSM Multipurpose Organisation, where we
          believe "Arogya hich Sampathi" - Health is true wealth. We are a humble
          group working for our villages, organizing free medical camps across
          Maharashtra.
          Our main office is in Amravati and Yavatmal. Our work is simple, we
          bring doctors and health services to your doorsteps.
          With the support of local hospitals, we aim to keep our villages
          healthy and strong. We want everyone to know how to take care of
          themselves and their families.
          Our mission is to make sure every person in our village has access to
          good health. Join us in our mission towards a healthier community.
        </p>
        <p className="mt-8">
          For any questions or if you want to join hands with us, call us at{" "}
          <span className="font-semibold">29813</span>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
