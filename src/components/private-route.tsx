// import { useAuth } from '@kit/hooks/use-auth';
// import { Navigate } from 'react-router-dom';
// import { PrivateRoutes } from './private-routes';

// export interface PrivateRouteProps {
//   loginPage: string;
// }


// export function PrivateRoute({
//   loginPage
// }: PrivateRouteProps) {
//   const { authUser: user, initialized } = useAuth();

//   // Show loading or wait until auth context is initialized
//   if (!initialized) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Only redirect to login if we're initialized and there's no user
//   return user ? <PrivateRoutes loginPage={loginPage} /> : <Navigate to={loginPage} replace />;
// }