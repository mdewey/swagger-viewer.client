import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SwaggerItem {
  id: number
  name: string
  data: string 
}

export interface State {
  swaggers: SwaggerItem[]
  selectedSwagger?: SwaggerItem
}

export interface RootState {
  swagger: State
}

const initialState: State = {
  swaggers: [],
  selectedSwagger: undefined,
}

export const swaggerSlice = createSlice({
  name: 'swagger',
  initialState,
  reducers: {
    addSwagger: (state, action: PayloadAction<SwaggerItem>) => {
      state.swaggers.push(action.payload)
    },
    updateSwagger: (state, action: PayloadAction<SwaggerItem>) => {
      state.swaggers = state.swaggers.map(swagger => {
        if (swagger.id === action.payload.id) {
          return action.payload
        }
        return swagger
      })
    },    
    removeSwagger: (state, action: PayloadAction<SwaggerItem>) => {
      state.swaggers = state.swaggers.filter(swagger => swagger.id !== action.payload.id)
    },
    setSelectedSwagger: (state, action: PayloadAction<SwaggerItem>) => {
      state.selectedSwagger = action.payload
    },
    initSwaggers: (state, action: PayloadAction<SwaggerItem[]>) => {
      if (action.payload.length > 0) {
        state.swaggers = action.payload
      }
    }
  },
})

export const {initSwaggers,  addSwagger, setSelectedSwagger, removeSwagger, updateSwagger } = swaggerSlice.actions
export default swaggerSlice.reducer