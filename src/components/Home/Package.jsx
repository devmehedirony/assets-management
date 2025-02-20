import React from "react";
import { Link } from "react-router-dom";

const Package = () => {
  const packages = [
    { title: "5 Employees", price: "$5", description: "Perfect for small teams." },
    { title: "10 Employees", price: "$8", description: "Ideal for growing teams." },
    { title: "20 Employees", price: "$15", description: "Best for larger teams." },
  ];

  return (
    <section className=" py-10 xl:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Choose Your Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="bg-blue-500 text-white text-center py-6">
                <h3 className="text-xl font-bold">{pkg.title}</h3>
                <p className="text-4xl font-bold mt-2">{pkg.price}</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-700 mb-4">{pkg.description}</p>
                <Link to='/joinAsHrManager'>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer">
                    Start With HR
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Package;
