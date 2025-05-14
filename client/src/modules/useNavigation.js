import { useNavigate, useLocation } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const goToHome = () => navigate('/home');
  const goToAcct = () => navigate('/account/overview');
  const goToacctActivity= () => navigate('/account/activity');
  const goToacctSettings= () => navigate('/account/settings');
  const goToLogin = () => navigate('/login');
  const goToThreadList = () => navigate('/');
  const goToSignUp = () => navigate('/join');
  const goToLeaderboard = () => navigate('/leaderboard');
  const goToNewThread = () => navigate('/post');
  const goToThread = (threadId) => navigate(`/thread/${threadId}`);
  const goToAchievements = () => navigate('/achievements');

  const isActive = (path) => location.pathname === path;

  return { 
    goToHome, 
    goToAcct, 
    goToacctActivity,
    goToacctSettings,
    goToLogin, 
    goToThreadList,
    goToSignUp, 
    goToThread,
    goToNewThread,
    goToLeaderboard,
    goToAchievements,
    isActive
  };
};

export default useNavigation;
