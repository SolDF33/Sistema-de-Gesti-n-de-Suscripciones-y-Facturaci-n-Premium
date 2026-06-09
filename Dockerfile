# 1. Usamos una imagen oficial de Node con Alpine (liviana)
FROM node:20-alpine

# 2. Creamos y definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de configuración de dependencias
COPY package*.json tsconfig.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código fuente (la carpeta src)
COPY src ./src

# 6. Comando por defecto para ejecutar nuestra app con ts-node
CMD ["npx", "ts-node", "src/main.ts"]