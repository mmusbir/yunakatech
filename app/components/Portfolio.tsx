'use client'

export default function Portfolio() {
  const projects = [
    { title: 'E-commerce Platform', description: 'Full-stack online store', tech: ['React', 'Node.js'] },
    { title: 'Mobile Banking App', description: 'Secure financial application', tech: ['React Native', 'Firebase'] },
    { title: 'Cloud Migration', description: 'Enterprise cloud solution', tech: ['AWS', 'Docker'] }
  ]

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-12 text-center shadow-brutal">
          PORTFOLIO
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-yellow-300 p-6 border-4 border-black shadow-brutal">
              <h3 className="text-xl font-bold text-black mb-4">{project.title}</h3>
              <p className="text-black mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-black text-white px-2 py-1 text-sm font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}