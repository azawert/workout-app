interface IMenu {
  title: string;
  link: string;
}
export const menuData: IMenu[] = [
  { title: "Workouts", link: "/workouts" },
  { title: "Create new workout", link: "/new-workout" },
  { title: "Profile", link: "/me" },
];
