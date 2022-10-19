
# Konecta test

Aca dejo las instrucciones para poder correr el sistema en local




## Environment Variables

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env


`NEXT_PUBLIC_API_KEY`

`NEXT_PUBLIC_AUTH_DOMAIN`

`NEXT_PUBLIC_PROJECT_ID`

`NEXT_PUBLIC_STORAGE_BUCKET`

`NEXT_PUBLIC_MESSAGING_SENDERID`

`NEXT_PUBLIC_APP_ID`

`NEXT_PUBLIC_MEASUREMENT_ID`


## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/as-techseven/test-konecta.git
```

Ir al directorio del proyecto

```bash
  cd test-konecta
```

Instalar dependencias

```bash
  yarn install
```

Inicie el servidor

```bash
  yarn dev
```


## Demo

Ingrese en este link para ir a la pagina del demo
https://test-konecta.vercel.app/


## Reglas para firebase-storage

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
    	allow read: if request.method == 'get';
    
      allow write: if request.method == 'create'
      && request.resource.size < 5 * 1024 * 1024
      && request.resource.contentType.matches(".*\\.sheet");
    }
  }
}
```

