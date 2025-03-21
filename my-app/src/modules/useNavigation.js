import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToAccount = () => navigate('/account');
  const goToLogin = () => navigate('/login');
  const goToSignUp = () => navigate('/signup');
  const goToThread = (threadId) => navigate(`/thread/${threadId}`);

  return { goToHome, goToAccount, goToLogin, goToSignUp, goToThread };
};

export default useNavigation;