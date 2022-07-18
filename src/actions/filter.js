import { createAction } from "redux-actions";

export const loader = createAction('[Filter] loader');
export const loaderMap = createAction('[Filter] loaderMap');
export const source = createAction('[Filter] source');
export const setMetro = createAction('[Filter] metro');
export const setExtra = createAction('[Filter] extra');
export const map = createAction('[Filter] map');
export const setIsMap = createAction('[Filter] setIsMap');
export const filter = createAction('[Filter] filter');
export const clearFilter = createAction('[Filter] clearFilter');

