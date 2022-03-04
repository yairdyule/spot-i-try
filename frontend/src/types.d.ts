export type User = {
  name: string;
  id: number;
  loggedIn: boolean;
  authorizedWithSpotify: boolean; //todo - consolidate types
};

/**
 * represents a response from an axios api call
 */
export type ApiResult = {
  data: Data;
};

/**
 * the data comprising an ApiResponse
 */
export type Data = {
  user: User;
  success: boolean;
};
