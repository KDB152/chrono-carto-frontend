"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Globe, MapPin, Clock, BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loginError, setLoginError] = useState('');

  // Citations éducatives qui changent
  const quotes = [
    { text: "L'histoire est le témoin du passé, la lumière de la vérité", author: "Cicéron" },
    { text: "La géographie, c'est ce qui reste quand on a tout oublié", author: "Paul Vidal de La Blache" },
    { text: "Celui qui ne connaît pas l'histoire est condamné à la répéter", author: "George Santayana" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    try {
      console.log('🔍 Debug - Tentative de connexion avec:', formData.email);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('🔍 Debug - Réponse de l\'API:', result);

      if (response.ok) {
        if (result.requiresVerification) {
          console.log('⚠️ Debug - Email non vérifié, redirection vers:', result.redirectUrl);
          // Rediriger vers la page de vérification d'email
          router.push(result.redirectUrl);
        } else if (result.success) {
          console.log('✅ Debug - Connexion réussie, redirection vers dashboard spécifique');
          // Connexion réussie, rediriger vers le dashboard spécifique selon le rôle
          localStorage.setItem('userDetails', JSON.stringify(result.user));
          
          // Redirection basée sur le rôle de l'utilisateur
          const userRole = result.user.role;
          let dashboardUrl = '/dashboard';
          
          switch (userRole) {
            case 'admin':
              dashboardUrl = '/dashboard/admin';
              break;
            case 'student':
              dashboardUrl = '/dashboard/student';
              break;
            case 'parent':
              dashboardUrl = '/dashboard/parent';
              break;
            default:
              console.warn('⚠️ Debug - Rôle inconnu:', userRole, 'redirection vers dashboard par défaut');
              dashboardUrl = '/dashboard';
          }
          
          console.log('🔀 Debug - Redirection vers:', dashboardUrl, 'pour le rôle:', userRole);
          router.push(dashboardUrl);
        }
      } else {
        console.log('❌ Debug - Erreur de connexion:', result.error);
        setLoginError(result.error || 'Erreur de connexion');
      }
    } catch (error) {
      console.error('💥 Debug - Erreur lors de la connexion:', error);
      setLoginError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animations de fond - Éléments historiques flottants */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cartes anciennes en arrière-plan */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-yellow-300/20 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-green-300/20 rounded-full animate-bounce blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-violet-300/20 rounded-full animate-ping blur-lg"></div>
        
        {/* Éléments décoratifs historiques */}
        <div className="absolute top-20 right-20 opacity-10">
          <Globe className="w-40 h-40 text-white animate-spin" style={{ animationDuration: '20s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <MapPin className="w-32 h-32 text-white animate-pulse" />
        </div>
        
        {/* Lignes de temps animées */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex min-h-screen">
        {/* Panneau gauche - Information et design */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 relative">
          <div className="max-w-md">
            {/* Logo et titre */}
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-white">Chrono-Carto</h1>
                <p className="text-blue-200">Plateforme Éducative</p>
              </div>
            </div>

            {/* Citation qui change */}
            <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-white/90 text-lg italic mb-3 transition-all duration-500">
                "{quotes[currentQuote].text}"
              </div>
              <div className="text-amber-300 font-medium">
                — {quotes[currentQuote].author}
              </div>
            </div>

            {/* Statistiques attractives */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-amber-300">2,500+</div>
                <div className="text-white/80 text-sm">Élèves actifs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-emerald-300">95%</div>
                <div className="text-white/80 text-sm">Taux de réussite</div>
              </div>
            </div>

            {/* Badges de matières */}
            <div className="flex space-x-3 mt-6">
              <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-400 text-white text-xs rounded-full font-medium">
                Histoire
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs rounded-full font-medium">
                Géographie
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-400 to-indigo-400 text-white text-xs rounded-full font-medium">
                EMC
              </span>
            </div>
          </div>
        </div>

        {/* Panneau droit - Formulaire de connexion */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
          <div className="w-full max-w-md">
            {/* En-tête du formulaire */}
            <div className="text-center mb-8">
              <div className="lg:hidden flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">Connexion</h2>
              <p className="text-blue-200 text-lg">
                Accédez à votre espace d'apprentissage
              </p>
            </div>

            {/* Formulaire */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    Adresse email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-300 group-focus-within:text-amber-300 transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    Mot de passe
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-300 group-focus-within:text-amber-300 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      placeholder="Votre mot de passe"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Lien mot de passe oublié */}
                <div className="text-right">
                  <a href="/forgot-password" className="text-sm text-amber-300 hover:text-amber-200 font-medium transition-colors">
                    Mot de passe oublié ?
                  </a>
                </div>

                {/* Message d'erreur */}
                {loginError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm">{loginError}</span>
                  </div>
                )}

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Connexion en cours...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Se connecter
                    </div>
                  )}
                </button>

                {/* Lien d'inscription */}
                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-white/80">
                    Vous n'avez pas de compte ?{' '}
                    <a href="/register" className="font-medium text-amber-300 hover:text-amber-200 transition-colors">
                      Créer un compte
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Note de sécurité */}
            <div className="mt-6 text-center">
              <p className="text-xs text-white/60">
                🔒 Connexion sécurisée • Données protégées RGPD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoginPage;