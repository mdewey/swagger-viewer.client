import { SwaggerItem } from "../features/swaggers/swaggerSlice";


export default function DownloadSwagger(swagger: SwaggerItem) {
  const downloadJson = () => {
    const data = swagger.data
    const blob = new Blob([data], { type: swagger.fileType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = swagger.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button onClick={() => downloadJson()}>download</button>
  )
}
