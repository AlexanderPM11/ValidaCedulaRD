# Usa una imagen ligera de Nginx
FROM nginx:stable-alpine

# Copia los archivos del proyecto al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# El comando por defecto de la imagen de Nginx ya inicia el servidor
