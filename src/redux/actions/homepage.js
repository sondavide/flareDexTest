const actions = {
    GET_GRID_BY_LINK: 'GET_GRID',
    DASHBOARD_UPDATE_SUCCESS: 'DASHBOARD_UPDATE_SUCCESS',
    DASHBOARD_UPDATE_ERROR: 'DASHBOARD_UPDATE_ERROR',
    CHANGE_SORT: "CHANGE_SORT",
    changeSort:()=>({
        type:actions.CHANGE_SORT
    }),
    getGridByLink: (key,url) => ({
        type: actions.GET_GRID_BY_LINK,
        key: key,
        url: url
    }),
    updateGridSuccess: (payload) => ({
        type: actions.DASHBOARD_UPDATE_SUCCESS,
        value: payload
    }),
    updateGridError: (error)=>({
        type: actions.DASHBOARD_UPDATE_ERROR,
        error: error
    })
};
export default actions;