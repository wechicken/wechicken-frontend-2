import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CreatedUser, LoginUser } from 'library/models';
import { saveUser } from 'library/store/saveUser';

function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const user: LoginUser | CreatedUser = JSON.parse(sessionStorage.getItem('USER') ?? '{}');

    if (!isEmpty(user)) {
      dispatch(saveUser(user));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default AuthProvider;
