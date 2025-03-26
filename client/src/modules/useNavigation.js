import { useNavigate, useLocation } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const goToHome = () => navigate('/');
  const goToAccount = () => navigate('/account/stats');
  const goToAccountactivity = () => navigate('/account/activity');
  const goToLogin = () => navigate('/login');
  const goToSignUp = () => navigate('/signup');
  const goToNewThread = () => navigate('/newthread');
  const goToThread = (threadId) => navigate(`/thread/${threadId}`);

  const isActive = (path) => location.pathname === path;

  return { 
    goToHome, 
    goToAccount, 
    goToAccountactivity,
    goToLogin, 
    goToSignUp, 
    goToThread,
    goToNewThread,
    isActive
  };
};

export default useNavigation;
