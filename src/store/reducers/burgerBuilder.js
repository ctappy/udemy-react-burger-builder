import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  loading: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.2,
  bacon: 0.7,
  meat: 1.0
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
  const removeIngredients = updateObject(state.ingredients, removeIngredient)
  const removeState = {
    ingredients: removeIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, removeState)
}

const setIngredient = (state, action) => {
  return updateObject(state, {
    // ingredients: action.ingredients,  // needs to had id for order or do the following
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false
  });
}

const fetchIngredient = (state, action) => {
      return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredient(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredient(state, action)
    default: return state
  }
}

export default reducer;