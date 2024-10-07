import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import { useSelector } from 'react-redux'


import { RootState } from '../features/swaggers/swaggerSlice'


export default function ShowSwagger() {
  const swagger = useSelector((state: RootState) => state.swagger.selectedSwagger);

  if (swagger == null) {
    return <h2>Select a swagger</h2>
  }

  return (
    <div className="main">
      <h2>{swagger.name}</h2>
      <div>
        <SwaggerUI spec={swagger.data} />
      </div>
    </div>
  )
}
