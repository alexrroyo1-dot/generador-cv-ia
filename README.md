# Cómo publicar CVImpulso y cobrar por la descarga

## 1. Publicar el sitio en internet (Vercel)

Vercel es gratis para este tamaño de proyecto y es la forma más simple de tener
tu propio backend (necesario para que tu API key de Claude no quede expuesta).

1. Crea una cuenta en https://vercel.com (puedes entrar con GitHub).
2. Crea un repositorio en GitHub y sube estos 3 archivos manteniendo esta estructura:
   ```
   /generador-cv-ia.html   →  renómbralo a index.html
   /api/generate-cv.js
   /api/verify-license.js
   ```
3. En Vercel: "Add New Project" → importa ese repositorio → Deploy.
4. Cuando termine el deploy, ve a Settings → Environment Variables y agrega:
   - `ANTHROPIC_API_KEY` = tu API key de https://console.anthropic.com
   - `GUMROAD_PRODUCT_ID` = el ID de tu producto (lo obtienes en el paso 2 de abajo)
5. Vuelve a hacer un Redeploy para que tome las variables nuevas.
6. Tu sitio ya estará en una URL tipo `tu-proyecto.vercel.app`.

### Dominio propio (opcional pero recomendado para verse profesional)
- Compra un dominio en Namecheap, Google Domains o GoDaddy (~$10-12/año).
- En Vercel: Settings → Domains → agrega tu dominio y sigue las instrucciones
  de DNS que te da Vercel.

## 2. Configurar el cobro con Gumroad

Gumroad sí permite recibir pagos y transferirlos a una cuenta bancaria en Perú
(Stripe, en cambio, no opera directamente en Perú).

1. Crea una cuenta en https://gumroad.com.
2. Crea un nuevo producto: "Descarga de CV en PDF", precio $2.99 (o el que quieras).
   - No subas ningún archivo — el "producto" es solo el acceso, el PDF se genera
     en tu web con los datos de cada persona.
3. En la configuración del producto, activa: **"Generate a unique license key per sale"**.
   Esto hace que cada comprador reciba automáticamente un código por correo.
4. Copia el **Product ID** (lo encuentras en la URL del producto o en la pestaña
   "Settings" del producto) y ponlo en Vercel como `GUMROAD_PRODUCT_ID`.
5. Copia el link público de tu producto (algo como `https://tuusuario.gumroad.com/l/xxxxx`)
   y reemplázalo en `index.html` donde dice:
   ```html
   href="https://TU-USUARIO.gumroad.com/l/TU-PRODUCTO"
   ```

### Cómo funciona el flujo de pago para el usuario final
1. La persona genera y previsualiza su CV gratis.
2. Para descargarlo, hace clic en "Comprar acceso — $2.99" (se abre Gumroad en otra pestaña).
3. Paga con tarjeta. Gumroad le envía un correo automático con un código de licencia.
4. Vuelve a tu sitio, pega el código en el campo y hace clic en "Desbloquear y descargar PDF".
5. Tu backend verifica el código contra la API de Gumroad y, si es válido, se genera el PDF.

## 3. Notas importantes

- **Anuncios (AdSense):** una vez tengas tu dominio propio y algo de tráfico,
  puedes solicitar Google AdSense y poner los anuncios en los `div.ad-slot` que
  ya están marcados en el HTML (busca "ESPACIO PUBLICITARIO").
- Empieza generando tráfico orgánico (SEO, TikTok, comunidades de empleo) antes
  de esperar ingresos relevantes por publicidad — el cobro de $2-3 por descarga
  suele dar resultados más rápido que la publicidad mientras el tráfico es bajo.
- Revisa los términos de Gumroad/impuestos según tu situación, no es asesoría legal.
