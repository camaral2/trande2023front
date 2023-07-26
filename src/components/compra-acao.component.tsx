import { Component, ChangeEvent } from "react";
import AcaoDataService from "../services/acao-dataservice";
import IAcaoConfig from "../types/acao-config.type";
import ICompra from "../types/compra.type";
import { formatCurrencyToBrazilian, formatDateToBrazilian, formatNumberToBrazilian } from "../common/utils";

type Props = {
  acaoConfig: IAcaoConfig,
  refreshList: Function
};

type State = {
  currentAcao: IAcaoConfig;
  compras: ICompra[];
  message: string;
}

export default class CompraAcao extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentAcao: {
        acao: "",
        desc: "",
      },
      compras: [],
      message: "",
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { acaoConfig } = this.props;

    if (acaoConfig.acao !== prevProps.acaoConfig.acao) {
      this.atualizaLista(acaoConfig);
    }
  }

  componentDidMount() {
    this.atualizaLista(this.props.acaoConfig);
  }

  atualizaLista(acaoConfig: IAcaoConfig) {
    AcaoDataService.getAllCompras(acaoConfig.acao)
    .then(response => {
      this.setState({
        currentAcao: acaoConfig,
        compras: response.data.compras,
        message: ""
      });
    })
    .catch(error => {
      this.setState({
        currentAcao: acaoConfig,
        compras: [],
        message: (error.response && error.response.data && error.response.data.message) || error.toString()
      });
    });
  }


  render() {
    const { currentAcao, compras, message } = this.state;

    return (
      <div>
        <h4>Relação de Compras da {currentAcao.acao}</h4>
        {currentAcao ? (
        <><div className="table-responsive">
          {compras ? (
          <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th className="text-center" scope="col">Data</th>
              <th className="text-right" scope="col">Compra</th>
              <th className="text-right" scope="col">Qtd</th>
              <th className="text-right" scope="col">Total</th>
              <th className="text-right" scope="col">Atual</th>
              <th className="text-right" scope="col">Total</th>
              <th className="text-right" scope="col">Dif</th>
            </tr>
          </thead>
          <tbody>
          {compras.map((compra) => (
            <tr>
              <td className="text-center">{formatDateToBrazilian(compra.data)}</td>
              <td className="text-right">{formatCurrencyToBrazilian(compra.valor)}</td>
              <td className="text-right">{formatNumberToBrazilian(compra.qtd)}</td>
              <td className="text-right">{formatCurrencyToBrazilian(compra.valueSum)}</td>
              <td className="text-right">{formatCurrencyToBrazilian(compra.valueNow)}</td>
              <td className="text-right">{formatCurrencyToBrazilian(compra.saleSum)}</td>
              <td className="text-right">{formatCurrencyToBrazilian(compra.valueAdd)}</td>
            </tr>
          ))}
          </tbody>
        </table>) : (
          <div>
            <br />
            <p>Nenhuma compra para a ação {currentAcao.acao}</p>
          </div>
        )}
        <p>{message}</p>
          </div><div className="edit-form">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentAcao.acao} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentAcao.desc} />
                </div>

                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {currentAcao.id ? "Published" : "Pending"}
                </div>
              </form>

              
            </div></>
        ) : (
          <div>
            <br />
            <p>Please click on a Ação...</p>
          </div>
        )}
      </div>
    );
  }
}