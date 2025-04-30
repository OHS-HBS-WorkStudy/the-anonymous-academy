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
  const goToSignUp = () => navigate('/signup');
  const goToNewThread = () => navigate('/newthread');
  const goToThread = (threadId) => navigate(`/thread/${threadId}`);

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
    isActive
  };
};

export default useNavigation;
