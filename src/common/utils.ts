import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateToBrazilian(date: Date | string): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
}

export function formatCurrencyToBrazilian(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currencyDisplay: 'symbol',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
}

export function formatNumberToBrazilian(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currencyDisplay: 'symbol',
    currency: 'BRL',
    minimumFractionDigits: 0
  }).format(value);
}