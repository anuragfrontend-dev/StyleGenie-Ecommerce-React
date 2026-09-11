import { createContext, useContext, useEffect, useReducer } from "react";

export const FavouritesContext=createContext();

const initialState={
  like:JSON.parse(localStorage.getItem('like'))||[]
}

function favouriteReducer(state,action){
  switch (action.type){
    case 'ADD_TO_FAVOURITES':
     if(state.like.includes(action.payload)){
        return {like: state.like.filter((id)=>id!==action.payload)}
     }
     else{
      return {like:[ ...state.like, action.payload ]};
     }
    default:
      return state; 
  }
}

export function FavouritesProvider({children}){
   const[state,dispatch]=useReducer(favouriteReducer,initialState);

   useEffect(()=>{
    localStorage.setItem('like',JSON.stringify(state.like));
   },[state.like])


  return(
    <FavouritesContext.Provider value={{like:state.like,dispatch}}>
     { children }
    </FavouritesContext.Provider>
  )
}

export function useFavourites(){
  const context=useContext(FavouritesContext);
  if(!context){
    throw new Error('Please write all components inside FavouritesProvider');
  }
  return context;
}