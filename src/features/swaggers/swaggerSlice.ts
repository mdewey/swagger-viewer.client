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
  swaggers: [
    { id: 1, name: 'swagger 1', data: '{this:"thing"}' },
    { id: 2, name: 'swagger 2', data: '{this:"thing"}' },
    { id: 3, name: 'swagger 3', data: '{this:"thing"}' },
  ],
  selectedSwagger: undefined,
}

export const swaggerSlice = createSlice({
  name: 'swagger',
  initialState,
  reducers: {
    addSwagger: (state, action: PayloadAction<SwaggerItem>) => {
      state.swaggers.push(action.payload)
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

export const {initSwaggers,  addSwagger, setSelectedSwagger } = swaggerSlice.actions
export default swaggerSlice.reducer