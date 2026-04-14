import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  Globe, 
  Book, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Star, 
  Users,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  User,
  Menu,
  X,
  ThumbsUp
} from 'lucide-react';

// --- Types ---
interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'COURSE' | 'TRAIL' | 'RECORD';
  thumb: string;
  duration?: string;
  rating?: number;
  students?: number;
  progress?: number;
  grade?: number;
  price?: string;
  authors?: string;
}

interface Section {
  id: string;
  title: string;
  items: ContentItem[];
}

// --- Mock Data ---
const BANNERS = [
  {
    id: '1',
    url: 'https://picsum.photos/seed/banner1/1200/200',
    leftColor: '#324F7F',
    rightColor: '#FFFFFF'
  },
  {
    id: '2',
    url: 'https://picsum.photos/seed/banner2/1200/200',
    leftColor: '#324F7F',
    rightColor: '#324F7F'
  }
];

const SECTIONS: Section[] = [
  {
    id: 'adv1',
    title: 'AVANÇADO 1',
    items: [
      {
        id: 'c1',
        title: 'Treinamento Plano de Tutoria',
        description: 'Aprenda a criar planos de tutoria eficazes.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course1/400/225',
        duration: '01h00m',
        rating: 4.5,
        students: 120,
        authors: 'Equipe Lector'
      },
      {
        id: 'c2',
        title: 'Pássarinhos chatinhos',
        description: 'Um curso sobre comportamento aviário.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course2/400/225',
        duration: '00h15m',
        rating: 4.2,
        students: 85,
        authors: 'Dr. Silva'
      },
      {
        id: 'c3',
        title: 'Teste Bug',
        description: 'Identificação e resolução de bugs.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course3/400/225',
        price: 'Gratuito',
        authors: 'QA Team'
      }
    ]
  },
  {
    id: 'adv2',
    title: 'AVANÇADO 2',
    items: [
      {
        id: 'c4',
        title: 'Teste 1703',
        description: 'Conteúdo de teste para a vitrine.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course4/400/225',
        price: 'Gratuito'
      },
      {
        id: 'c5',
        title: 'Compra 3',
        description: 'Curso disponível para aquisição.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course5/400/225',
        price: 'R$1,00'
      },
      {
        id: 'c6',
        title: 'Compra 4',
        description: 'Mais uma opção de compra.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course6/400/225',
        price: 'R$1,00'
      }
    ]
  },
  {
    id: 'adv3',
    title: 'AVANÇADO 3',
    items: [
      {
        id: 'c7',
        title: 'Teste 1903',
        description: 'Exploração de novos recursos.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course7/400/225',
        price: 'Gratuito'
      },
      {
        id: 'c8',
        title: 'Teste todos os conteúdos 3',
        description: 'teste descrição',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course8/400/225',
        price: 'Gratuito',
        authors: '19/01 teste, teste ok'
      },
      {
        id: 'c9',
        title: 'Teste material complementar 22/01',
        description: 'Materiais de apoio para estudos.',
        type: 'COURSE',
        thumb: 'https://picsum.photos/seed/course9/400/225'
      }
    ]
  }
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ContentItem[]>([]);

  const navItems = ['Conteúdo', 'Social', 'Minha Área'];

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const allItems = SECTIONS.flatMap(section => section.items);
      const filtered = allItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setActiveTab('Conteúdo')}>
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-200">L</div>
              <span className="ml-3 font-display font-bold text-xl text-brand-secondary hidden sm:block tracking-tight">LECTOR</span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                    activeTab === item 
                      ? 'text-brand-primary' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {item}
                  {activeTab === item && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-primary/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary rounded-full text-sm transition-all duration-300 w-48 lg:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
              
              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      {suggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSearchQuery('');
                            setSuggestions([]);
                            // Here you could navigate to the item
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl flex items-center gap-3 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                              {item.type === 'COURSE' ? 'Treinamento' : item.type}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative group">
              <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Globe className="h-5 w-5" />
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pr-3 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary overflow-hidden">
                  <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden lg:block">Caio Gomes</span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-50 mb-2">
                      <div className="text-sm font-bold text-gray-900">Caio Gomes</div>
                      <div className="text-xs text-gray-500 truncate">suporte2@lectortec.com.br</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                      <User className="h-4 w-4" /> Perfil
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                      <LayoutDashboard className="h-4 w-4" /> Configurações
                    </button>
                    <div className="h-px bg-gray-50 my-2"></div>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                      <LogOut className="h-4 w-4" /> Sair
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveTab(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeTab === item ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary overflow-hidden">
                    <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">Caio Gomes</div>
                    <div className="text-sm text-gray-500">suporte2@lectortec.com.br</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SocialView = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-display font-bold text-brand-secondary">Social</h2>
        <button className="btn-primary">Nova Publicação</button>
      </div>
      
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                U{i}
              </div>
              <div>
                <div className="font-bold text-gray-900">Usuário Exemplo {i}</div>
                <div className="text-xs text-gray-400">Há {i * 2} horas</div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Este é um exemplo de publicação no feed social. Compartilhando conhecimentos e novidades com a rede Lector.
            </p>
            <div className="mt-6 flex items-center gap-6 text-gray-400 text-sm">
              <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                <Star className="h-4 w-4" /> 12 Curtidas
              </button>
              <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
                <MessageSquare className="h-4 w-4" /> 4 Comentários
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MyAreaView = () => {
  const tabs = ['Minhas Habilidades', 'Meus Treinamentos', 'Minhas Trilhas', 'Minhas Pontuações', 'Meus Certificados', 'Meu Calendário', 'Meu Cadastro', 'Minhas Compras'];
  const [activeSubTab, setActiveSubTab] = useState('Meus Treinamentos');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-display font-bold text-brand-secondary mb-8">Minha Área</h2>
      
      <div className="flex flex-wrap gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSubTab === tab 
                ? 'bg-brand-primary text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Book className="h-6 w-6" />
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                Em Andamento
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Treinamento de Exemplo {i}</h3>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progresso</span>
                <span>{i * 35}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${i * 35}%` }}
                  className="h-full bg-brand-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-secondary leading-tight">
              Encontre seu <span className="text-brand-primary">conteúdo</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Procure por conhecimento feito para te ajudar na sua área ou na sua carreira. 
              Você pode aprender escolhendo um treinamento, uma trilha, documento, evento gravado ou vídeo.
            </p>
            
            <div className="mt-10 relative max-w-lg">
              <input 
                type="text" 
                placeholder="Procure por treinamento, trilha, documento..." 
                className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-brand-primary/5 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300"
              />
              <Search className="absolute left-4 top-4.5 h-5 w-5 text-brand-primary" />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 rounded-xl font-medium transition-colors shadow-lg shadow-brand-primary/20">
                Buscar
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[16/9] lg:aspect-square xl:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={BANNERS[currentBanner].url} 
                  alt="Banner" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/40 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentBanner === i ? 'w-8 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex-shrink-0 w-64 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="relative h-36 overflow-hidden">
        <img 
          src={item.thumb} 
          alt={item.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-900 line-clamp-1 text-[15px]">
          {item.title}
        </h3>
        <span className="text-[11px] text-gray-400 mt-0.5">
          por {item.authors || '-'}
        </span>
        
        <p className="mt-2.5 text-[13px] text-gray-600 line-clamp-3 leading-snug flex-grow">
          {item.description}
        </p>
        
        <div className="mt-3 flex items-center gap-1.5 text-[12px] text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          {item.duration || '00h00m'}
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[10px] font-medium">
            <Book className="h-3 w-3" />
            {item.type === 'COURSE' ? 'Treinamentos' : item.type}
          </div>
          {item.price && (
            <div className="text-red-600 font-medium text-lg">
              {item.price}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SocialSidebar = ({ onSeeAll }: { onSeeAll: () => void }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-brand-secondary">Social</h2>
        <button 
          onClick={onSeeAll}
          className="text-xs font-medium text-brand-primary hover:text-brand-secondary transition-colors border border-brand-primary/20 hover:bg-brand-primary/5 px-3 py-1.5 rounded-lg"
        >
          Exibir todos os posts
        </button>
      </div>
      
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="text-[11px] text-gray-500 mb-3">
              09/09/2025 às 15:08:27
            </div>
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img src={`https://picsum.photos/seed/post${i}/400/225`} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">
              Conheça nossos cursos para Mercado!
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Clique aqui e aproveite!
            </p>
            
            <div className="flex items-center gap-2 mb-4 text-xs text-brand-primary font-medium">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3 fill-brand-primary" /> 6
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-brand-primary transition-colors">
                <ThumbsUp className="h-4 w-4" /> Curtir
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-brand-primary transition-colors">
                <MessageSquare className="h-4 w-4" /> Comentar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentSection: React.FC<{ section: Section }> = ({ section }) => {
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${section.id}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 border-b border-gray-200 last:border-0">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-brand-secondary tracking-tight">
            {section.title}
          </h2>
          <div className="mt-1 w-12 h-1 bg-brand-primary rounded-full"></div>
        </div>
        <button className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-1 group">
          Ver Tudo
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div 
          id={`scroll-${section.id}`}
          className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {section.items.map((item) => (
            <div key={item.id} className="snap-start">
              <ContentCard item={item} />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-secondary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-secondary font-bold text-xl">L</div>
              <span className="font-display font-bold text-xl tracking-wider">LECTOR</span>
            </div>
            <p className="mt-6 text-gray-400 text-sm leading-relaxed">
              Transformando o aprendizado através da tecnologia e inovação. 
              Sua plataforma completa de desenvolvimento profissional.
            </p>
            <div className="mt-8 flex gap-4">
              {['youtube', 'twitter', 'facebook', 'instagram'].map((social) => (
                <button key={social} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors group">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-gray-400 group-hover:bg-white transition-colors rounded-sm"></div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe aqui</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quem somos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Aviso de privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Fique por dentro das novidades.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/5 border-transparent focus:ring-1 focus:ring-white/20 rounded-lg px-4 py-2 text-sm w-full"
              />
              <button className="bg-brand-primary hover:bg-brand-primary/80 px-4 py-2 rounded-lg transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>© Lector Tecnologia, 2006 - 2025. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              Português (Brasil)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const THEMES = [
  { id: 'blue', primary: '#324F7F', secondary: '#062365', accent: '#3b82f6' },
  { id: 'green', primary: '#8dc63f', secondary: '#5c8a22', accent: '#a3e635' },
  { id: 'red', primary: '#b91c1c', secondary: '#7f1d1d', accent: '#ef4444' },
  { id: 'pink', primary: '#db2777', secondary: '#9d174d', accent: '#f472b6' },
  { id: 'orange', primary: '#ea580c', secondary: '#9a3412', accent: '#fb923c' },
];

const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme] = useState('blue');

  const applyTheme = (theme: typeof THEMES[0]) => {
    setActiveTheme(theme.id);
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 bg-white p-3 rounded-full shadow-2xl border border-gray-100 flex items-center gap-3 z-50"
    >
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => applyTheme(theme)}
          className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
            activeTheme === theme.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
          }`}
          style={{ backgroundColor: theme.primary }}
          aria-label={`Mudar para tema ${theme.id}`}
        />
      ))}
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Conteúdo');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'Conteúdo' && (
            <motion.div
              key="conteudo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero />
              <div className="bg-gray-50 py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Content Sections */}
                    <div className="flex-1 overflow-hidden">
                      {SECTIONS.map((section) => (
                        <ContentSection key={section.id} section={section} />
                      ))}
                    </div>
                    
                    {/* Right Column: Social Sidebar */}
                    <div className="w-full lg:w-80 xl:w-[400px] flex-shrink-0">
                      <SocialSidebar onSeeAll={() => setActiveTab('Social')} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SocialView />
            </motion.div>
          )}

          {activeTab === 'Minha Área' && (
            <motion.div
              key="minha-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MyAreaView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
