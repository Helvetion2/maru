async function calcularAlpha(tb, ts) {
  const response = await fetch('data/tabla_1.json');
  const tabla = await response.json();

  const tb_entero = Math.floor(tb);
  const tb_decimal = Math.round((tb - tb_entero) * 10);

  const valorTabla = tabla[tb_entero]?.[tb_decimal];
  if (valorTabla === undefined) {
    throw new Error(`TB fuera de rango en la tabla: ${tb}`);
  }

  const alpha = ts + valorTabla;
  return alpha;
}
