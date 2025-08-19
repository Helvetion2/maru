async function calcularAlpha(tb, ts) {
  const response = await fetch('data/tabla_1.json');
  const tabla = await response.json();

  const tb_entero = Math.floor(tb);
  const tb_decimal = Math.round((tb - tb_entero) * 10);

  const fila = tabla.find(f => f.TB_entero === tb_entero);
  if (!fila || fila[tb_decimal] === undefined) {
    throw new Error(`TB fuera de rango: ${tb}`);
  }

  const valorTabla = fila[tb_decimal];
  return ts + valorTabla;
}

async function obtenerTdYpresionDesdeTabla2(alpha) {
  const response = await fetch('data/tabla_2.json');
  const tabla = await response.json();

  const alpha_entero = Math.floor(alpha);
  const alpha_decimal = Math.round((alpha - alpha_entero) * 10);

  const fila = tabla[alpha_entero];
  if (!fila) throw new Error(`Alpha fuera de rango (parte entera): ${alpha_entero}`);

  const datos = fila[alpha_decimal];
  if (!datos) throw new Error(`Alpha fuera de rango (decimal): ${alpha_decimal}`);

  return datos; // { td: ..., e: ... }
}

async function calcularTodo() {
  const tb = parseFloat(document.getElementById('tb').value);
  const ts = parseFloat(document.getElementById('ts').value);
  const resultado = document.getElementById('resultado');

  try {
    const alpha = await calcularAlpha(tb, ts);
    const datos = await obtenerTdYpresionDesdeTabla2(alpha);

    resultado.innerHTML = `
      <strong>Punto de Rocío:</strong> ${datos.td} °C<br>
      <strong>Tensión de vapor:</strong> ${datos.e} hPa
    `;
  } catch (error) {
    resultado.innerText = error.message;
  }
}
