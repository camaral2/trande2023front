
export default interface ICompra {
  _id: string,
  user: string,
  acao: string,
  data: Date | string,
  valor: number,
  qtd: number,
  valueSale: number,
  qtdSale: number,
  dateSale: Date | string,
  valueSum: number,
  valueNow: number,
  dateValue: Date | string,
  saleSum: number,
  valueAdd: number,
  percentAdd: number,
}
