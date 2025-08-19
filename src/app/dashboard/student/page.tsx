'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  MessageSquare, 
  User, 
  TrendingUp,
  Clock,
  Play,
  Download,
  CheckCircle,
  Star,
  Calendar,
  Target,
  Globe,
  MapPin,
  Scroll,
  Video,
  FileText,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  BarChart3,
  Loader2,
  Settings,
  LogOut,
  Home,
  Trophy,
  Users,
  Zap,
  Brain,
  Timer,
  Shield,
  Bookmark,
  Filter,
  SortAsc,
  MoreHorizontal,
  Share2,
  Heart,
  Eye,
  ChevronDown,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Activity,
  Flame,
  Medal,
  AlertTriangle
} from 'lucide-react';

// Hook pour récupérer les données utilisateur depuis le state (pas localStorage)
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUser(JSON.parse(storedUserDetails));
    }
    setIsLoading(false);
  }, []);

  return { user, isLoading, logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    setUser(null);
  } };
};

// Composant Modal de Déconnexion
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Confirmation de déconnexion</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="mb-8">
          <p className="text-blue-200 text-lg mb-2">
            Voulez-vous vraiment vous déconnecter ?
          </p>
          <p className="text-blue-300 text-sm">
            Vous devrez vous reconnecter pour accéder au tableau de bord.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold backdrop-blur-sm"
          >
            Non, rester connecté
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Oui, se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studentData, setStudentData] = useState(null);
  const [recentCourses, setRecentCourses] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Mise à jour de l'heure
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulation d'une API call avec données enrichies
  const fetchStudentData = async (userId) => {
    try {
      setLoading(true);
      
      // Remplacez ceci par un véritable appel API à votre backend
      // Exemple: const response = await fetch(`/api/students/${userId}`);
      // const data = await response.json();

      // Pour l'instant, utilisons les données de localStorage pour simuler
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        const userDetails = JSON.parse(storedUserDetails);
        setStudentData({
          id: userDetails.id,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          class: userDetails.studentDetails?.class || "Non spécifié",
          establishment: userDetails.studentDetails?.establishment || "Non spécifié",
          progress: userDetails.studentDetails?.progress || 0,
          totalCourses: userDetails.studentDetails?.totalCourses || 0,
          completedCourses: userDetails.studentDetails?.completedCourses || 0,
          totalQuizzes: userDetails.studentDetails?.totalQuizzes || 0,
          completedQuizzes: userDetails.studentDetails?.completedQuizzes || 0,
          averageScore: userDetails.studentDetails?.averageScore || 0,
          rank: userDetails.studentDetails?.rank || 0,
          totalStudents: userDetails.studentDetails?.totalStudents || 0,
          currentStreak: userDetails.studentDetails?.currentStreak || 0,
          weeklyGoal: userDetails.studentDetails?.weeklyGoal || 0,
          weeklyProgress: userDetails.studentDetails?.weeklyProgress || 0,
          studyTime: userDetails.studentDetails?.studyTime || 0,
          favoriteSubject: userDetails.studentDetails?.favoriteSubject || "Non spécifié",
          profilePicture: userDetails.profilePicture || null,
          recentCourses: userDetails.studentDetails?.recentCourses || [],
          upcomingQuizzes: userDetails.studentDetails?.upcomingQuizzes || [],
          achievements: userDetails.studentDetails?.achievements || [],
          weeklyStats: userDetails.studentDetails?.weeklyStats || {},
          fullName: `${userDetails.firstName} ${userDetails.lastName}`,
        });

        setRecentCourses(userDetails.studentDetails?.recentCourses || []);
        setUpcomingQuizzes(userDetails.studentDetails?.upcomingQuizzes || []);
        setAchievements(userDetails.studentDetails?.achievements || []);
      }

    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des données:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudentData(user.id);
    }
  }, [user]);

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return 'U';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bon après-midi";
    return "Bonsoir";
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // Nettoyer les données de session
    try {
      logout(); // Utilise la fonction logout du hook useAuth
      sessionStorage.clear();
    } catch (error) {
      console.log('Nettoyage du storage:', error);
    }

    // Redirection vers la page de login
    window.location.href = '/login';
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, color: 'text-blue-500' },
    { id: 'courses', label: 'Mes cours', icon: BookOpen, color: 'text-emerald-500' },
    { id: 'quizzes', label: 'Quiz & Évaluations', icon: Award, color: 'text-purple-500' },
    { id: 'progress', label: 'Ma progression', icon: TrendingUp, color: 'text-orange-500' },
    { id: 'achievements', label: 'Succès', icon: Trophy, color: 'text-yellow-500' },
    { id: 'community', label: 'Communauté', icon: Users, color: 'text-pink-500' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'text-indigo-500' }
  ];

  const subjectColors = {
    'Histoire': 'from-red-500 to-pink-600',
    'Géographie': 'from-emerald-500 to-blue-600', 
    'EMC': 'from-purple-500 to-indigo-600'
  };

  const subjectIcons = {
    'Histoire': Scroll,
    'Géographie': Globe,
    'EMC': Shield
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Facile': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moyen': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Difficile': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'border-slate-300 bg-slate-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50';
      default: return 'border-slate-300 bg-slate-50';
    }
  };

  // États de chargement et d'erreur
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <Loader2 className="w-3 h-3 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Chargement de votre espace</h2>
          <p className="text-blue-200 animate-pulse text-lg">Préparation de vos données personnalisées...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-red-300/30">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Accès non autorisé</h2>
          <p className="text-blue-200 mb-8">Vous devez être connecté pour accéder à cette page</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-red-300/30">
            <X className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Erreur de chargement</h2>
          <p className="text-blue-200 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <User className="w-20 h-20 text-blue-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-3">Utilisateur non trouvé</h2>
          <p className="text-blue-200">Aucune donnée disponible pour cet utilisateur</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex">
      {/* Sidebar moderne avec thème bleu */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-slate-800/95 to-blue-900/95 backdrop-blur-xl shadow-2xl border-r border-white/10 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header du sidebar */}
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 right-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 left-8 w-10 h-10 bg-white rounded-full animate-bounce"></div>
          </div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl">Chrono-Carto</span>
              <p className="text-blue-100 text-sm font-medium">Plateforme Éducative</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profil utilisateur moderne */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-br from-slate-800/50 to-blue-800/50">
          <div className="flex items-center space-x-4 mb-4">
            {studentData.profilePicture ? (
              <img 
                src={studentData.profilePicture} 
                alt={studentData.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white/20">
                <span className="text-white font-bold text-lg">
                  {getInitials(studentData.firstName, studentData.lastName)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-bold text-white text-lg">{studentData.fullName}</p>
              <p className="text-sm text-blue-200 font-medium">{studentData.email}</p>
              <p className="text-xs text-blue-300">{studentData.class} - {studentData.establishment}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-amber-300">{studentData.currentStreak}</span>
              </div>
              <span className="text-xs text-blue-300">jours</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Progression générale */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Progression</span>
                <span className="text-sm font-bold text-white">{studentData.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${studentData.progress}%` }}
                />
              </div>
            </div>

            {/* Classement */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Classement</span>
                <span className="text-sm font-bold text-white">#{studentData.rank}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-blue-300">sur {studentData.totalStudents} élèves</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation moderne */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105 border border-white/20'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'}`}>
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : item.color}`} />
              </div>
              <span className="font-semibold">{item.label}</span>
              {item.id === 'messages' && notifications > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Déconnexion avec modal */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center space-x-3 px-4 py-3 text-blue-200 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className="flex-1 lg:ml-0">
        {/* Header moderne */}
        <header className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white hover:text-blue-200 p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {getTimeOfDay()}, {studentData.firstName} ! 👋
                </h1>
                <p className="text-blue-200 text-sm font-medium">{formatDate(currentTime)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Barre de recherche moderne */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-64 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all bg-white/10 backdrop-blur-md text-white placeholder-blue-300"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button className="text-white hover:text-blue-200 p-2 hover:bg-white/10 rounded-lg transition-all">
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              {/* Paramètres */}
              <button className="text-white hover:text-blue-200 p-2 hover:bg-white/10 rounded-lg transition-all">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Statistiques clés modernisées */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/20 rounded-full -mr-10 -mt-10 group-hover:bg-blue-400/30 transition-colors"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-200 text-sm font-semibold">Progression générale</p>
                      <p className="text-3xl font-bold text-white mt-1">{studentData.progress}%</p>
                      <p className="text-blue-300 text-sm font-semibold flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{studentData.weeklyProgress}% cette semaine
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/20 rounded-full -mr-10 -mt-10 group-hover:bg-amber-400/30 transition-colors"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-200 text-sm font-semibold">Note moyenne</p>
                      <p className="text-3xl font-bold text-white mt-1">{studentData.averageScore}/20</p>
                      <p className="text-blue-300 text-sm font-semibold flex items-center mt-1">
                        <Star className="w-4 h-4 mr-1" />
                        Top {Math.round(100 - (studentData.rank / studentData.totalStudents) * 100)}%
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Star className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/20 rounded-full -mr-10 -mt-10 group-hover:bg-emerald-400/30 transition-colors"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-200 text-sm font-semibold">Série actuelle</p>
                      <p className="text-3xl font-bold text-white mt-1">{studentData.currentStreak}</p>
                      <p className="text-emerald-400 text-sm font-semibold flex items-center mt-1">
                        <Flame className="w-4 h-4 mr-1" />
                        jours consécutifs
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Flame className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/20 rounded-full -mr-10 -mt-10 group-hover:bg-purple-400/30 transition-colors"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-blue-200 text-sm font-semibold">Temps d'étude</p>
                      <p className="text-3xl font-bold text-white mt-1">{Math.floor(studentData.studyTime/60)}h {studentData.studyTime%60}min</p>
                      <p className="text-blue-300 text-sm font-semibold flex items-center mt-1">
                        <Timer className="w-4 h-4 mr-1" />
                        cette semaine
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Timer className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Activité hebdomadaire */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
                    Activité cette semaine
                  </h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 text-xs bg-white/10 text-blue-200 rounded-xl hover:bg-white/20 transition-all border border-white/20">
                      Étude
                    </button>
                    <button className="px-4 py-2 text-xs bg-blue-600 text-white rounded-xl hover:shadow-lg transition-all">
                      Quiz
                    </button>
                  </div>
                </div>
                <div className="flex items-end justify-between space-x-3 h-40">
                  {Object.entries(studentData.weeklyStats).map(([day, minutes], index) => (
                    <div key={day} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-indigo-400 rounded-lg transition-all duration-500 hover:shadow-lg relative group"
                        style={{ height: `${(minutes/100)*100}%`, minHeight: '8px' }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20">
                          {minutes}min
                        </div>
                      </div>
                      <span className="text-xs text-blue-200 mt-3 font-medium capitalize">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cours récents et Quiz à venir - Layout moderne */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Cours récents modernisés */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Sparkles className="w-6 h-6 text-amber-400 mr-3" />
                      Continuer l'apprentissage
                    </h2>
                    <button className="text-blue-300 hover:text-white text-sm font-semibold flex items-center transition-colors">
                      Voir tout <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentCourses.slice(0, 3).map((course, index) => {
                      const SubjectIcon = subjectIcons[course.subject] || FileText;
                      return (
                        <div key={course.id} className="group p-4 border border-white/20 rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <div className={`w-12 h-12 bg-gradient-to-br ${subjectColors[course.subject] || 'from-slate-400 to-slate-500'} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                                {course.type === 'vidéo' ? <Video className="w-6 h-6 text-white" /> : 
                                 course.type === 'quiz' ? <Award className="w-6 h-6 text-white" /> :
                                 <SubjectIcon className="w-6 h-6 text-white" />}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">{course.title}</h3>
                                <p className="text-xs text-blue-200 font-medium">{course.subject} • {course.duration}</p>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course.difficulty)}`}>
                                    {course.difficulty}
                                  </span>
                                  <div className="flex items-center space-x-1 text-xs text-blue-300">
                                    <Eye className="w-3 h-3" />
                                    <span>{course.views}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-xs text-blue-300">
                                    <Heart className="w-3 h-3" />
                                    <span>{course.likes}</span>
                                  </div>
                                  {course.isBookmarked && (
                                    <Bookmark className="w-3 h-3 text-amber-400 fill-current" />
                                  )}
                                </div>
                              </div>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-300 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-blue-200 font-medium">Progression</span>
                              <span className="text-xs font-bold text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div 
                                className={`bg-gradient-to-r ${subjectColors[course.subject] || 'from-slate-400 to-slate-500'} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quiz à venir modernisés */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Timer className="w-6 h-6 text-red-400 mr-3" />
                      Évaluations à venir
                    </h2>
                    <button className="text-blue-300 hover:text-white text-sm font-semibold flex items-center transition-colors">
                      Planning <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingQuizzes.slice(0, 3).map((quiz, index) => {
                      const SubjectIcon = subjectIcons[quiz.subject] || Award;
                      return (
                        <div key={quiz.id} className="group p-4 border border-white/20 rounded-xl hover:shadow-lg transition-all cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-sm relative">
                          {quiz.isImportant && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                          )}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <div className={`w-12 h-12 bg-gradient-to-br ${subjectColors[quiz.subject] || 'from-slate-400 to-slate-500'} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                                <SubjectIcon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-white text-sm group-hover:text-red-300 transition-colors">{quiz.title}</h3>
                                <p className="text-xs text-blue-200 font-medium">{quiz.subject} • {quiz.questions} questions</p>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                                    {quiz.difficulty}
                                  </span>
                                  <div className="flex items-center space-x-1 text-xs text-blue-300">
                                    <Clock className="w-3 h-3" />
                                    <span>{quiz.duration}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-xs text-blue-300">
                                    <Target className="w-3 h-3" />
                                    <span>{quiz.maxScore} pts</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-blue-200">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">Échéance : {quiz.dueDate}</span>
                            </div>
                            <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                              Commencer
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Succès et Progression par matière */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Mes succès modernisés */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
                      Mes succès
                    </h2>
                    <span className="text-sm text-blue-200 font-medium">
                      {achievements.filter(a => a.unlocked).length}/{achievements.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.slice(0, 6).map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer hover:scale-105 ${
                          achievement.unlocked 
                            ? `${getRarityColor(achievement.rarity)} border-opacity-50 shadow-sm` 
                            : 'border-white/20 bg-white/5 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className={`p-3 rounded-xl ${achievement.unlocked ? 'bg-white shadow-sm' : 'bg-white/10'}`}>
                            <Trophy className={`w-8 h-8 ${achievement.unlocked ? achievement.color : 'text-slate-400'}`} />
                          </div>
                          <div>
                            <span className={`text-sm font-bold block ${achievement.unlocked ? 'text-slate-900' : 'text-blue-300'}`}>
                              {achievement.title}
                            </span>
                            <span className={`text-xs ${achievement.unlocked ? 'text-slate-600' : 'text-blue-400'}`}>
                              {achievement.description}
                            </span>
                            {achievement.unlocked && (
                              <div className="flex items-center justify-center space-x-1 mt-1">
                                <Zap className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs font-bold text-yellow-600">{achievement.points} pts</span>
                              </div>
                            )}
                          </div>
                          {achievement.unlocked && (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progression par matière modernisée */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <Brain className="w-6 h-6 text-purple-400 mr-3" />
                      Progression par matière
                    </h2>
                    <button className="text-blue-300 hover:text-white text-sm font-semibold transition-colors">
                      Détails
                    </button>
                  </div>
                  <div className="space-y-6">
                    {[
                      { subject: 'Histoire', progress: 78, trend: '+5%', icon: Scroll, courses: 12, quizzes: 8 },
                      { subject: 'Géographie', progress: 65, trend: '+2%', icon: Globe, courses: 8, quizzes: 6 },
                      { subject: 'EMC', progress: 52, trend: '+8%', icon: Shield, courses: 6, quizzes: 4 }
                    ].map((subject, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${subjectColors[subject.subject]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                              <subject.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span className="font-bold text-white">{subject.subject}</span>
                              <div className="flex items-center space-x-3 text-xs text-blue-300">
                                <span>{subject.courses} cours</span>
                                <span>•</span>
                                <span>{subject.quizzes} quiz</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-white">{subject.progress}%</span>
                            <div className="flex items-center text-xs text-emerald-400 font-semibold">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {subject.trend}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-4 relative overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r ${subjectColors[subject.subject]} h-4 rounded-full transition-all duration-1000 shadow-sm relative`}
                            style={{ width: `${subject.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Autres sections avec design cohérent */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-white/20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Section {sidebarItems.find(item => item.id === activeTab)?.label}
              </h3>
              <p className="text-blue-200 mb-8 max-w-md mx-auto text-lg">
                Cette section sera bientôt disponible avec toutes les fonctionnalités avancées pour optimiser votre apprentissage.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  Retour au tableau de bord
                </button>
                <button className="px-8 py-4 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold backdrop-blur-sm">
                  En savoir plus
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de déconnexion */}
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default StudentDashboard;