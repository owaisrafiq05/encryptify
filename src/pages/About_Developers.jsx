import React from 'react';

const AboutDevelopers = () => {
  const developers = [
    {
      role: "OWAIS RAFIQ",
      image: "https://via.placeholder.com/150",
      details: "A skilled professional with a passion for building intuitive user interfaces. Responsible for designing the UI of this application, ensuring a seamless and responsive experience for users."
    },
    {
      role: "ABUBAKAR BIN HASSAN",
      image: "https://via.placeholder.com/150",
      details: "Specializes in building scalable APIs. Developed the server-side logic, integrating functionality and ensuring secure data transmission between the front-end and back-end."
    },
    {
      role: "MUHIB ALI", 
      image: "https://via.placeholder.com/150",
      details: "Expertise in both front-end and back-end development. Integrated the front-end interface with server-side logic, working on both the UI/UX design and application functionality."
    }
  ];

  return (
    <div className="relative rounded-lg bg-slate-900 p-8">
      <div className="relative flex text-center">
        <div className="flex pl-3.5 pt-3">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20"
          >
            <circle r="12" cy="12" cx="12"></circle>
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20"
          >
            <circle r="12" cy="12" cx="12"></circle>
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20"
          >
            <circle r="12" cy="12" cx="12"></circle>
          </svg>
        </div>
        <span className="absolute inset-x-0 top-2 text-xs text-slate-500"></span>
      </div>

      <div className="mt-5 space-y-4 px-5 pb-10">
        <div className="grid grid-cols-3 gap-4">
          {developers.map((developer, index) => (
            <div 
              key={index} 
              className="relative rounded-lg bg-slate-900 p-2 border border-slate-700"
            >
              <div className="relative flex text-center">
                <div className="flex pl-3.5 pt-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20"
                  >
                    <circle r="12" cy="12" cx="12"></circle>
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20"
                  >
                    <circle r="12" cy="12" cx="12"></circle>
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20"
                  >
                    <circle r="12" cy="12" cx="12"></circle>
                  </svg>
                </div>
                <span className="absolute inset-x-0 top-2 text-xs text-slate-500">
                  {developer.role}
                </span>
              </div>

              <div className="mt-5 space-y-1.5 px-5 pb-10 text-center">
                <img
                  src={developer.image}
                  alt={developer.role}
                  className="w-32 h-32 rounded-lg object-cover mx-auto mb-4"
                />
              </div>

              <div className="mt-4 font-mono tracking-wide text-violet-400">
                <p>
                  <span className="text-slate-500">&lt;</span>
                  <span className="text-pink-400">Card</span>
                  <span className="text-slate-500">&gt;</span>
                </p>
                <p className="ml-3">
                  <span className="text-slate-500">&lt;</span>
                  <span className="text-pink-400">Text</span>
                  <span className="text-slate-500">&gt;</span>
                  <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                    <span className="relative text-blue-400 text-base font-bold">{developer.role}</span>
                  </span>
                  <span className="text-slate-500">&lt;/</span>
                  <span className="text-pink-400">Text</span>
                  <span className="text-slate-500">&gt;</span>
                </p>
                <p className="ml-3">
                  <span className="text-slate-500">&lt;</span>
                  <span className="text-pink-400">Metric</span>
                  <span className="text-slate-500">&gt;</span>
                  <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                    <span className="relative text-blue-400 text-lg font-extrabold">Developer</span>
                  </span>
                  <span className="text-slate-500">&lt;/</span>
                  <span className="text-pink-400">Metric</span>
                  <span className="text-slate-500">&gt;</span>
                </p>
                <p className="ml-3">
                  <span className="text-slate-500">&lt;</span>
                  <span className="text-pink-400">Text</span>
                  <span className="text-slate-500">&gt;</span>
                  <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                    <span className="relative text-blue-400 text-sm">{developer.details}</span>
                  </span>
                  <span className="text-slate-500">&lt;/</span>
                  <span className="text-pink-400">Text</span>
                  <span className="text-slate-500">&gt;</span>
                </p>
                <p>
                  <span className="text-slate-500">&lt;/</span>
                  <span className="text-pink-400">Card</span>
                  <span className="text-slate-500">&gt;</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDevelopers;