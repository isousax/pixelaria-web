import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  Card
} from "../../../shared/components/ui/Card";
import { Button } from "../../../shared/components/ui/Button";
import { Input } from "../../../shared/components/ui/Input";
import { Badge } from "../../../shared/components/ui/Badge";
import { SEO } from "../../../shared/components/SEO";
import { projects } from "../../../data/projects";
import { PAGE_SEO, SCHEMAS } from "../../../config/seo";
import type { Project } from "../../../shared/types";

export const Projetos = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<"recent" | "featured" | "title">(
    "recent"
  );

  const projectsPerPage = 9;
  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === "featured") {
      result = [...result].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result = [...result].sort(
        (a, b) =>
          new Date(b.completedDate).getTime() -
          new Date(a.completedDate).getTime()
      );
    }

    return result;
  }, [categoryFilter, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Stats
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: projects.length,
      label: "Projetos Concluídos",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: projects.filter((p) => p.featured).length,
      label: "Projetos em Destaque",
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: categories.length - 1,
      label: "Categorias Atendidas",
    },
  ];

  return (
    <>
      <SEO
        title={PAGE_SEO.projetos.title}
        description={PAGE_SEO.projetos.description}
        canonical={PAGE_SEO.projetos.canonical}
        keywords={PAGE_SEO.projetos.keywords}
        schema={SCHEMAS.website}
      />

      <div className="bg-neutral-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-600 to-secondary-600 py-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge
                variant="default"
                size="lg"
                className="mb-6 bg-white/20 border-white/30"
              >
                <Star className="w-4 h-4" />
                Portfólio Completo
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-black mb-6">
                Nossos Projetos
              </h1>
              <p className="text-xl mb-8">
                Conheça os sites profissionais que já criamos para empresas de
                diversos segmentos
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black mb-1">
                      {stat.value}+
                    </div>
                    <div className="text-sm ">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container-custom py-16">
          {/* Filters Bar */}
          <Card variant="elevated" padding="lg" className="mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  leftIcon={<Search className="w-5 h-5" />}
                  variant="filled"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg font-medium hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="featured">Em Destaque</option>
                  <option value="title">Ordem Alfabética</option>
                </select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  leftIcon={<SlidersHorizontal className="w-5 h-5" />}
                ></Button>
              </div>
            </div>

            {/* Category Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-neutral-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Tag className="w-5 h-5 text-neutral-600" />
                      <h3 className="font-bold text-neutral-900">
                        Categorias:
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant={
                            categoryFilter === cat ? "primary" : "default"
                          }
                          size="lg"
                          onClick={() => {
                            setCategoryFilter(cat);
                            setCurrentPage(1);
                          }}
                          className="cursor-pointer hover:scale-105 transition-transform"
                        >
                          {cat === "all" ? "Todos os Projetos" : cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-neutral-600">
              Mostrando <strong>{currentProjects.length}</strong> de{" "}
              <strong>{filteredProjects.length}</strong> projeto
              {filteredProjects.length !== 1 ? "s" : ""}
            </p>
            {(searchQuery || categoryFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setCurrentPage(1);
                }}
              >
                Limpar Filtros
              </Button>
            )}
          </div>

          {/* Projects Grid */}
          {currentProjects.length === 0 ? (
            <Card variant="elevated" padding="xl" className="text-center">
              <p className="text-neutral-600 text-lg">
                Nenhum projeto encontrado com os filtros selecionados.
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card
                    hover="lift"
                    padding="none"
                    className="cursor-pointer h-full overflow-hidden group"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {project.featured && (
                        <Badge
                          variant="warning"
                          className="absolute top-3 right-3 shadow-lg"
                        >
                          <Star className="w-3 h-3" />
                          Destaque
                        </Badge>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                          variant="secondary"
                          size="sm"
                          fullWidth
                          leftIcon={<ExternalLink className="w-4 h-4" />}
                        >
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <Badge variant="primary" size="sm" className="mb-3">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                        {project.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(project.completedDate).toLocaleDateString(
                          "pt-BR",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Card variant="elevated" padding="lg">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  leftIcon={<ChevronLeft className="w-5 h-5" />}
                >
                  Anterior
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? "bg-primary-600 shadow-lg scale-110"
                            : "bg-white text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  Próxima
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-99"
              />
              <div className="fixed inset-0 z-100 overflow-y-auto">
                <div className="min-h-screen px-4 py-8 flex items-start justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-3 right-3 lg:top-6 lg:right-6 p-2 lg:p-3 bg-white rounded-full hover:bg-neutral-100 transition-all shadow-lg z-20 hover:scale-110"
                    >
                      <X className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>

                    {/* Hero Image */}
                    <div className="relative h-48 lg:h-80 overflow-hidden rounded-t-2xl">
                      <img
                        src={selectedProject.imageUrl}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                      {/* Badges Overlay */}
                      <div className="absolute top-3 left-3 lg:top-6 lg:left-6 flex gap-2">
                        <Badge
                          variant="primary"
                          size="sm"
                          className="lg:text-base bg-white"
                        >
                          {selectedProject.category}
                        </Badge>
                        {selectedProject.featured && (
                          <Badge
                            variant="warning"
                            size="sm"
                            className="lg:text-base"
                          >
                            <Star className="w-3 h-3 lg:w-4 lg:h-4" />
                            Destaque
                          </Badge>
                        )}
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 lg:bottom-6 lg:left-6 lg:right-6">
                        <div className="bg-black/50 text-white p-1.5 lg:p-4 rounded">
                          <h2 className="text-xl lg:text-3xl font-black mb-1 lg:mb-2">
                            {selectedProject.title}
                          </h2>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                            <span className="text-xs lg:text-sm">
                              {new Date(
                                selectedProject.completedDate
                              ).toLocaleDateString("pt-BR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 lg:p-8 max-h-[60vh] lg:max-h-none overflow-y-auto">
                      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                          <div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4 text-neutral-900">
                              Sobre o Projeto
                            </h3>
                            <p className="text-neutral-700 text-sm lg:text-lg leading-relaxed">
                              {selectedProject.description}
                            </p>
                          </div>

                          {selectedProject.url && (
                            <Button
                              onClick={() =>
                                window.open(selectedProject.url, "_blank")
                              }
                              variant="gradient"
                              size="lg"
                              leftIcon={<ExternalLink className="w-5 h-5" />}
                              fullWidth
                            >
                              Visitar Site do Projeto
                            </Button>
                          )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4 lg:space-y-6">
                          {/* Technologies */}
                          <Card
                            variant="elevated"
                            padding="none"
                            className="p-0.5"
                          >
                            <h4 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 text-neutral-900 flex items-center gap-2">
                              <Tag className="w-4 h-4 lg:w-5 lg:h-5 text-primary-600" />
                              Tecnologias Utilizadas
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="default"
                                  size="sm"
                                  className="lg:text-sm"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </Card>

                          {/* Project Info */}
                          <Card
                            variant="gradient"
                            padding="none"
                            className="p-0.5"
                          >
                            <h4 className="font-bold text-base lg:text-lg mb-3 lg:mb-4">
                              Informações do Projeto
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div>
                                  <p className="text-xs lg:text-sm">
                                    Data de Conclusão
                                  </p>
                                  <p className="font-semibold text-sm lg:text-base">
                                    {new Date(
                                      selectedProject.completedDate
                                    ).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                  <Tag className="w-4 h-4 lg:w-5 lg:h-5" />
                                </div>
                                <div>
                                  <p className="text-xs lg:text-sm">
                                    Categoria
                                  </p>
                                  <p className="font-semibold text-sm lg:text-base">
                                    {selectedProject.category}
                                  </p>
                                </div>
                              </div>

                              {selectedProject.featured && (
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                    <Star className="w-4 h-4 lg:w-5 lg:h-5" />
                                  </div>
                                  <div>
                                    <p className="text-xs lg:text-sm">Status</p>
                                    <p className="font-semibold text-sm lg:text-base">
                                      Projeto em Destaque
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </Card>

                          {/* CTA */}
                          <Card padding="md" className="lg:p-6 text-center">
                            <p className="text-neutral-700 mb-3 lg:mb-4 text-sm lg:text-base">
                              Gostou deste projeto? Vamos criar o seu!
                            </p>
                            <Button
                              variant="primary"
                              size="lg"
                              fullWidth
                              onClick={() =>
                                (window.location.href = "/onboarding")
                              }
                            >
                              Iniciar Meu Projeto
                            </Button>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
