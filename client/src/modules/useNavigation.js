import { useNavigate, useLocation } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const goToHome = () => navigate('/home');
  const goToacctStats = () => navigate('/account/stats');
  const goToacctActivity= () => navigate('/account/activity');
  const goToLogin = () => navigate('/login');
  const goToThreadList = () => navigate('/');
  const goToSignUp = () => navigate('/signup');
  const goToNewThread = () => navigate('/newthread');
  const goToThread = (threadId) => navigate(`/thread/${threadId}`);

  const isActive = (path) => location.pathname === path;

  return { 
    goToHome, 
    goToacctStats, 
    goToacctActivity,
    goToLogin, 
    goToThreadList,
    goToSignUp, 
    goToThread,
    goToNewThread,
    isActive
  };
};

export default useNavigation;
