import { AuthPage } from "src/pages/auth-page/AuthPage";
import { HomePage } from "src/pages/home/HomePage";
import { ProfilePage } from "src/pages/profile/ProfilePage";

import { NewWorkout } from "src/features/new-workout/NewWorkout";

interface IRoute {
  path: string;
  component: React.FunctionComponent;
  isForAuthenticated: boolean;
}

export const routes: IRoute[] = [
  { component: HomePage, isForAuthenticated: false, path: "/" },
  { component: AuthPage, isForAuthenticated: false, path: "/auth" },
  { component: NewWorkout, isForAuthenticated: true, path: "/new-workout" },
  { component: ProfilePage, isForAuthenticated: true, path: "/me" },
];
