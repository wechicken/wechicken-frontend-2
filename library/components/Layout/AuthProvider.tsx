import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { CreatedUser, LoginUser } from 'library/models';
import { saveUser } from 'library/store/saveUser';

function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const USER: LoginUser | CreatedUser = JSON.parse(sessionStorage.getItem('USER') ?? '{}');
    !isEmpty(USER) &&
      dispatch(
        saveUser({
          token: USER.token,
          profile: USER.profile,
          myGroupStatus: USER.myGroupStatus,
          nth: USER.nth,
          master: (USER as LoginUser).master ?? false,
        } as LoginUser),
      );
  }, [dispatch]);

  return <div>{children}</div>;
}

export default AuthProvider;
