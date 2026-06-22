// api/verify-license.js
// Verifica contra la API de Gumroad que el código de licencia ingresado
// corresponde a una compra real de tu producto.
// Documentación: https://gumroad.com/api  ->  POST /v2/licenses/verify

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Método no permitido' });
  }

  const { license_key } = req.body || {};
  if (!license_key) {
    return res.status(400).json({ valid: false, error: 'Falta el código de licencia' });
  }

  try {
    const params = new URLSearchParams({
      product_id: process.env.GUMROAD_PRODUCT_ID,
      license_key: license_key,
      increment_uses_count: 'false' // así una misma licencia puede reusarse para volver a descargar
    });

    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const data = await response.json();

    // Gumroad responde success:true solo si la licencia es válida y no fue reembolsada/cancelada
    const isValid = !!(data.success && data.purchase && !data.purchase.refunded && !data.purchase.disputed);

    return res.status(200).json({ valid: isValid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ valid: false, error: 'Error verificando la licencia' });
  }
}
