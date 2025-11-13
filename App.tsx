import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SkinQuizScreen from './src/screens/SkinQuizScreen';
import SkinAnalysisResultScreen from './src/screens/SkinAnalysisResultScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RoutineScreen from './src/screens/RoutineScreen';
import JournalScreen from './src/screens/JournalScreen';
import StoreScreen from './src/screens/StoreScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import { RoutineProvider } from './src/context/RoutineContext';

type ScreenType = 'onboarding' | 'login' | 'register' | 'skinQuiz' | 'result' | 'home' | 'routine' | 'journal' | 'store' | 'profile' | 'community';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return (
          <LoginScreen
            onNavigateToRegister={() => setCurrentScreen('register')}
            onLoginSuccess={() => setCurrentScreen('skinQuiz')}
          />
        );
      case 'register':
        return <RegisterScreen onNavigateToLogin={() => setCurrentScreen('login')} />;
      case 'skinQuiz':
        return (
          <SkinQuizScreen
            onComplete={(answers) => {
              console.log('Quiz answers:', answers);
              setCurrentScreen('result');
            }}
            onSkip={() => setCurrentScreen('result')}
          />
        );
      case 'result':
        return <SkinAnalysisResultScreen 
          onContinue={() => setCurrentScreen('home')} 
          onNavigate={(screen) => setCurrentScreen(screen as ScreenType)}
        />;
      case 'home':
        return <DashboardScreen onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />;
      case 'routine':
        return <RoutineScreen onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />;
      case 'journal':
        return <JournalScreen onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />;
      case 'store':
        return <StoreScreen onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />;
      case 'profile':
        return <ProfileScreen onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />;
      case 'community':
        return <CommunityScreen onNavigate={(screen) => setCurrentScreen(screen as ScreenType)} />;
      default:
        return <OnboardingScreen onComplete={() => setCurrentScreen('login')} />;
    }
  };

  return (
    <RoutineProvider>
      {renderScreen()}
      <StatusBar style="dark" />
    </RoutineProvider>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 8,
  },
});
