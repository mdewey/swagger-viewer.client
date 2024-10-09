import { useState } from 'react';
import { useDispatch } from 'react-redux'

import { SwaggerItem, addSwagger } from '../features/swaggers/swaggerSlice'

import { useLocalStorage } from 'usehooks-ts'

import { LOCAL_STORAGE_KEY } from '../constants'

export default function AddSwagger() {
  const dispatch = useDispatch();

  const [swaggers, setLocalSwaggers] = useLocalStorage<SwaggerItem[]>(LOCAL_STORAGE_KEY, []);

  const [file, setFile] = useState<File | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const saveSwagger = async () => {
    // We will fill this out later
    console.log('save swagger', file);
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log("??? ", e.target?.result);
      const swaggerToAdd: SwaggerItem = {
        id: Date.now(),
        name: file?.name || 'unknown',
        data: e.target?.result as string,
        fileType: file?.type || 'unknown'
      }
      dispatch(addSwagger(swaggerToAdd));
      swaggers.push(swaggerToAdd);
      setLocalSwaggers(swaggers);
    }
    reader.readAsText(file as Blob);
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <section>
          <button onClick={saveSwagger}>Save</button>
        </section>
      )}
    </>
  )
}
