import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

import { useSelector } from 'react-redux'


import { RootState } from '../features/swaggers/swaggerSlice'
import SwaggerName from "./SwaggerName";

import '../styles/swagger-container.scss'
import { useState, useEffect } from "react";

export default function ShowSwagger() {
  const swagger = useSelector((state: RootState) => state.swagger.selectedSwagger);
  const [swaggerData, setSwaggerData] = useState(swagger?.data);

  useEffect(() => {
    setSwaggerData(swagger?.data);
  }, [swagger]);

  if (swagger == null) {
    return <h2>Select a swagger</h2>
  }

  if (swaggerData == null) {
    return <h2>No data</h2>
  }

  return (
    <div className="swagger-main">
      <SwaggerName />
      <div>
        <SwaggerUI
          spec={swaggerData}
        />
      </div>
    </div>
  )
}
