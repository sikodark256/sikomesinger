# SikoChat v21 · Chat + Juegos para 2
Chat en vivo de Sikodark Radio con juegos integrados para 2 jugadores y reglas de Firestore seguras. Estilo WhatsApp profesional.

## Novedades v21
- Juegos para 2: Tres en Raya y Conecta 4 — en tiempo real por Firebase
- Auth anonima: el chat se autentica solo (sin login) para que las reglas seguras funcionen
- Reglas de Firestore seguras: validan campos, tamanos, y que solo el dueno borre sus mensajes
- Reto automatico: tocás Juegos, elegís el juego y retás a cualquier conectado
- Coleccion chat_juegos incluida en las reglas

## Como funcionan los juegos
1. Tocá el boton Juegos (arriba de la barra de acciones)
2. Elegis el juego (Tres en Raya o Conecta 4)
3. Retas a cualquier usuario conectado
4. El otro recibe el aviso y la partida se abre automaticamente
5. Juegan en tiempo real

## Reglas de Firestore (firestore-reglas.txt)
- chat_usuarios: crear con campos validos, actualizar solo el propio perfil
- chat_mensajes: crear con validacion (max 500 chars), NO editar, borrar solo el dueno
- chat_juegos: crear partida valida, mover solo si es tu turno
- Todas requieren request.auth != null (auth anonima lo cumple)

## Instalacion
1. Subi todos los archivos a la raiz del repo en GitHub Pages
2. En Firebase Console -> Authentication -> habilita Anonymous (anonima)
3. Pega las reglas de firestore-reglas.txt en Firestore Rules
4. Listo!
