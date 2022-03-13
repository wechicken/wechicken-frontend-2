import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CreatedUser, LoginUser } from 'library/models';
import { saveUser } from 'library/store/saveUser';

function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const USER: LoginUser | CreatedUser = JSON.parse(sessionStorage.getItem('USER') ?? '{}');

    if (!isEmpty(USER)) {
      dispatch(
        saveUser({
          token: USER.token,
          thumbnail: USER.thumbnail,
          myGroupStatus: USER.myGroupStatus,
          batch: USER.batch,
          is_manager: (USER as LoginUser).is_manager ?? false,
          is_group_joined: USER.is_group_joined,
        } as LoginUser),
      );
    }
  }, [dispatch]);

  return <div>{children}</div>;
}

export default AuthProvider;
