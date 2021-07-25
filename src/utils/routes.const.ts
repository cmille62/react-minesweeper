export interface RouteType {
  path: string;
  roles?: string[];
}

const formatRoute: (path: string) => string = (path) => {
  return `/minesweeper${path}`;
};

type StructureRouteType = (
  route: RouteType,
  options: Record<string, string>
) => string;

export const structureRoute: StructureRouteType = (route, options) => {
  let result = route.path;

  Object.keys(options).forEach((key) => {
    result = result.replace(`:${key}`, options[key]);
  });

  return result;
};

export const Routes: Record<string, RouteType> = {
  Base: { path: formatRoute("/") },
  Home: { path: formatRoute("/home") },
  Gameplay: { path: formatRoute("/play/:width/:height/:mines/:uid?") },
};
