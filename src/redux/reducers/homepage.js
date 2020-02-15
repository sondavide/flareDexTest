import actions from '../actions/homepage';


const loading= (state = {loading:false, ascend:true, key:'amount'}, action)=>{
    switch (action.type) {
        case actions.GET_GRID_BY_LINK:
            return {
                loading: true,
                key: action.key,
                url: action.url
            };
        case actions.DASHBOARD_UPDATE_SUCCESS:
            return {
                loading: false,
                grid: action.value,
                key: state.key,
                url:state.url
            };
        case actions.DASHBOARD_UPDATE_ERROR:
            return {
                loading: false,
                payload: action.error
            };
        case actions.CHANGE_SORT:
            let ascend= !state.ascend;
            let g = Object.assign([],state.grid);
            g.sort(function(a,b){
                if(a[state.key]>b[state.key]){
                    return ascend? 1: -1
                }
                if(a[state.key]<b[state.key]){
                    return ascend? -1:1
                }
                return 0
            });
            return {
                ascend: !state.ascend,
                grid: g,
                key: state.key,
                url:state.url

            }
        default:
            return state
    }
}

export default loading;