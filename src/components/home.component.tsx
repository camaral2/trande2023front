import { Component } from "react";

import AcaoDataService from "../services/acao-dataservice";
import IAcaoConfig from "../types/acao-config.type";
import CompraAcao from "./compra-acao.component";

type Props = {};

type State = {
  acaoConfigs: Array<IAcaoConfig>;
  currentAcaoConfig: IAcaoConfig | null,
  currentIndex: number,
  content: string
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.refreshList = this.refreshList.bind(this);
    this.setActiveAcaoConfig = this.setActiveAcaoConfig.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      acaoConfigs: [],
      currentAcaoConfig: null,
      currentIndex: -1,
      content: ''
    };
  }

  refreshList() {
    this.setState({
      currentAcaoConfig: null,
      currentIndex: -1,
    });
  }
  setActiveAcaoConfig(acaoConfig: IAcaoConfig, index: number) {
    this.setState({
      currentAcaoConfig: acaoConfig,
      currentIndex: index,
    });
  }
  onDataChange(items: any) {
    let acaoConfigs = new Array<IAcaoConfig>();

    items.forEach((item: any) => {
      let key = item.key;
      let data = item.val();
      acaoConfigs.push({
        acao: key,
        desc: data.title,
      });
    });

    this.setState({
      acaoConfigs: acaoConfigs,
    });
  }



  componentDidMount() {
    AcaoDataService.getAllAcoes().then(
      response => {
        this.setState((prevState) => ({
          ...prevState,
          acaoConfigs: response.data.acoes
        }));
      },
      error => {
        this.setState({
          content: (error.response && error.response.data && error.response.data.message) ||
            error.toString()
        });

        // this.setState((prevState) => ({
        //   ...prevState,
        //   content: (error.response && error.response.data) ||
        //   error.message ||
        //   error.toString()
        // }));

      }
    );
  }

  render() {
    const { acaoConfigs, currentAcaoConfig, currentIndex, content } = this.state;

    return (
      <div className="container">
        {content && (
          <header className="jumbotron">
            <h3>{content}</h3>
          </header>
        )}
        <div className="list row">
          <div className="col-md-4">
            <h4>Compras Ações</h4>
            <ul className="list-group">
              {acaoConfigs &&
                acaoConfigs.map((acaoConfig, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveAcaoConfig(acaoConfig, index)}
                    key={index}
                  >
                    {acaoConfig.desc}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-8">
            {currentAcaoConfig ? (
              <CompraAcao
                acaoConfig={currentAcaoConfig}
                refreshList={this.refreshList}
              />
            ) : (
              <div>
                <br />
                <p>Please click on a Ação...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}