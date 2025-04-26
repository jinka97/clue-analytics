import { FaBrain, FaTools, FaChalkboardTeacher } from "react-icons/fa";

const services = [
  {
    icon: <FaBrain className="text-blue-600 text-4xl mb-4" />,
    title: "AI Strategy Consulting",
    description: "Align AI initiatives with your goals using proven frameworks and deep industry knowledge.",
  },
  {
    icon: <FaTools className="text-blue-600 text-4xl mb-4" />,
    title: "ML Development & Deployment",
    description: "Custom-built models, end-to-end pipelines, and scalable solutions tailored to your business.",
  },
  {
    icon: <FaChalkboardTeacher className="text-blue-600 text-4xl mb-4" />,
    title: "Training & Workshops",
    description: "Upskill your team with practical AI/ML workshops for all technical levels.",
  },
];

export default function ServicesSection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <h3 className="text-4xl font-bold text-center mb-16 text-blue-900">Our Core Services</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg p-8 bg-white border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <div className="text-center">
                {service.icon}
                <h4 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
