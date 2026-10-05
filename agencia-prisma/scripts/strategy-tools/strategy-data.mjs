import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import Papa from 'papaparse';
import { mean, median, sum } from 'simple-statistics';

const [command, ...args] = process.argv.slice(2);
const usage = `Uso:
  node strategy-data.mjs audit <arquivo.csv>
  node strategy-data.mjs summarize <arquivo.csv> <coluna> [dot|comma]
  node strategy-data.mjs rate <arquivo.csv> <grupo> <numerador> <denominador> [dot|comma]

Use dados agregados e confirme período, unidade e definição de cada coluna antes de interpretar.`;

function required(count) {
  if (args.length < count) throw new Error(usage);
}

function decimalMode(value) {
  if (!value || value === 'dot') return 'dot';
  if (value === 'comma') return 'comma';
  throw new Error('O separador decimal deve ser dot ou comma.');
}

function numeric(value, mode) {
  const raw = String(value ?? '').trim();
  if (!raw) return null;
  const valid = mode === 'comma'
    ? /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/u.test(raw)
    : /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/u.test(raw);
  if (!valid) throw new Error(`Valor não numérico para separador ${mode}; confira a coluna e o formato do CSV.`);
  const normalized = mode === 'comma' ? raw.replaceAll('.', '').replace(',', '.') : raw.replaceAll(',', '');
  const number = Number(normalized);
  if (!Number.isFinite(number)) throw new Error('Número fora da faixa válida.');
  return number;
}

async function loadCsv(filename, allowParseErrors = false) {
  const file = resolve(filename);
  if (!file.toLowerCase().endsWith('.csv')) throw new Error('Forneça um arquivo .csv local.');
  const size = (await stat(file)).size;
  if (size > 50 * 1024 * 1024) throw new Error('Arquivo acima de 50 MB; use ferramenta de dados adequada para este volume.');
  const contents = (await readFile(file, 'utf8')).replace(/^\uFEFF/u, '');
  const parsed = Papa.parse(contents, { header: true, skipEmptyLines: 'greedy' });
  if (!allowParseErrors && parsed.errors.length) throw new Error(`CSV com ${parsed.errors.length} erro(s) de leitura; rode audit antes de calcular.`);
  const columns = parsed.meta.fields ?? [];
  if (!columns.length) throw new Error('CSV sem cabeçalho identificável.');
  return { file, rows: parsed.data, columns, errors: parsed.errors, delimiter: parsed.meta.delimiter };
}

function requireColumn(columns, name) {
  if (!columns.includes(name)) throw new Error(`Coluna ausente: ${name}. Disponíveis: ${columns.join(', ')}`);
}

async function audit() {
  required(1);
  const data = await loadCsv(args[0], true);
  const missing = Object.fromEntries(data.columns.map(column => [column, data.rows.filter(row => String(row[column] ?? '').trim() === '').length]));
  process.stdout.write(`${JSON.stringify({ arquivo: data.file, linhas: data.rows.length, separador: data.delimiter, colunas: data.columns, ausenciasPorColuna: missing, errosDeLeitura: data.errors.length, observacao: 'Cabeçalhos e contagens não definem significado, período ou qualidade da coleta.' }, null, 2)}\n`);
}

async function summarize() {
  required(2);
  const data = await loadCsv(args[0]);
  const column = args[1];
  requireColumn(data.columns, column);
  const mode = decimalMode(args[2]);
  const values = data.rows.map(row => numeric(row[column], mode));
  const valid = values.filter(value => value !== null);
  process.stdout.write(`${JSON.stringify({ arquivo: data.file, coluna: column, linhas: data.rows.length, validos: valid.length, ausentes: values.length - valid.length, soma: valid.length ? sum(valid) : null, media: valid.length ? mean(valid) : null, mediana: valid.length ? median(valid) : null, minimo: valid.length ? valid.reduce((low, value) => Math.min(low, value), Infinity) : null, maximo: valid.length ? valid.reduce((high, value) => Math.max(high, value), -Infinity) : null, separadorDecimal: mode }, null, 2)}\n`);
}

async function rate() {
  required(4);
  const data = await loadCsv(args[0]);
  const [groupColumn, numeratorColumn, denominatorColumn] = args.slice(1, 4);
  for (const column of [groupColumn, numeratorColumn, denominatorColumn]) requireColumn(data.columns, column);
  const mode = decimalMode(args[4]);
  const groups = new Map();
  let excluded = 0;
  for (const row of data.rows) {
    const group = String(row[groupColumn] ?? '').trim();
    const numerator = numeric(row[numeratorColumn], mode);
    const denominator = numeric(row[denominatorColumn], mode);
    if (!group || numerator === null || denominator === null) { excluded++; continue; }
    if (numerator < 0 || denominator < 0) throw new Error('Taxas exigem numerador e denominador não negativos.');
    const item = groups.get(group) ?? { grupo: group, linhas: 0, numerador: 0, denominador: 0 };
    item.linhas++;
    item.numerador += numerator;
    item.denominador += denominator;
    groups.set(group, item);
  }
  const rows = [...groups.values()].map(item => ({ ...item, taxa: item.denominador === 0 ? null : item.numerador / item.denominador }));
  const totalNumerator = rows.reduce((total, item) => total + item.numerador, 0);
  const totalDenominator = rows.reduce((total, item) => total + item.denominador, 0);
  process.stdout.write(`${JSON.stringify({ arquivo: data.file, grupo: groupColumn, numerador: numeratorColumn, denominador: denominatorColumn, linhasExcluidasPorAusencia: excluded, segmentos: rows, geral: { numerador: totalNumerator, denominador: totalDenominator, taxa: totalDenominator === 0 ? null : totalNumerator / totalDenominator }, observacao: 'Taxa geral calculada por totais; confirme que períodos, populações e definições são comparáveis.' }, null, 2)}\n`);
}

try {
  switch (command) {
    case 'audit': await audit(); break;
    case 'summarize': await summarize(); break;
    case 'rate': await rate(); break;
    case 'help': process.stdout.write(`${usage}\n`); break;
    default: throw new Error(usage);
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
