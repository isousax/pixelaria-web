import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { projects } from '../mocks/projects';
import type { Project } from '../types';

export const Projetos = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-background-light py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Nossos Projetos</h1>
          <p className="section-subtitle mx-auto">
            Conheça alguns dos sites profissionais que já criamos
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === cat
                  ? 'bg-primary-600 text-white shadow-soft'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card
                padding="sm"
                className="cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-video">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      Destaque
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <span className="text-sm text-primary-600 font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{project.title}</h3>
                  <p className="text-neutral-600 text-sm line-clamp-2">{project.shortDescription}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative bg-white rounded-2xl shadow-soft-xl w-full max-w-4xl my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-lg hover:bg-neutral-100 transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-80 object-cover rounded-t-2xl"
                  />
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full">
                        {selectedProject.category}
                      </span>
                      {selectedProject.url && (
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                        >
                          Ver Site <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                    <p className="text-neutral-700 mb-6">{selectedProject.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Tecnologias:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span
                            key={tech}
                            className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button fullWidth onClick={() => setSelectedProject(null)}>
                      Fechar
                    </Button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
