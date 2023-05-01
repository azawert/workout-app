import { Auth } from "src/features/auth/Auth";
import { Home } from "src/features/home/Home";
import { NewWorkout } from "src/features/new-workout/NewWorkout";
import { Profile } from "src/features/profile/Profile";

interface IRoute {
  path: string;
  component: React.FunctionComponent;
  forAuthenticated: boolean;
}

export const routes: IRoute[] = [
  { component: Home, forAuthenticated: false, path: "/" },
  { component: Auth, forAuthenticated: false, path: "/auth" },
  { component: NewWorkout, forAuthenticated: true, path: "/new-workout" },
  { component: Profile, forAuthenticated: true, path: "/me" },
];
