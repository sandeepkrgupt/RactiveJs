const initialState = {
	age :21
}

const reducer = (state = initialState, action) => {  // simple func which needs two parameters state and action.
	const newState = {...state};
	
	if(action.type === 'AGE_UP') {
		newState.age++
	}if(action.type === 'AGE_DOWN') {
		newState.age--
	}
	
	return newState;
}

export default reducer; // we need to set store globally so need to import this file and all other dependent packages in index.js