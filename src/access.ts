/**
 * @see https://umijs.org/docs/max/access#access
 * */
const ADMIN = 1;

export default function access(initialState: { currentUser?: API.UserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === ADMIN,
  };
}
