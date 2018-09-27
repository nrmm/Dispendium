import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { MesRef, Despesa } from '../../app/despesa';
import { DespesaProvider } from '../../providers/despesa/despesa';

@Component({
  selector: 'page-lista-despesas',
  templateUrl: 'lista-despesas.html'
})
export class ListaDespesasPage {
  mesRef: MesRef;
  despesas: Despesa[];
  despesasSelecionadas: Set<number> = new Set();
  total: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private despesaProvider: DespesaProvider,
    private toastCtrl: ToastController
  ) {
    this.setMesReferencia();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaDespesasPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ListaDespesasPage');

    this.getDespesas();
  }

  setTotalDespesas(): void {
    this.total = 0.0;

    this.despesas.forEach(despesa => {
      this.total += +despesa.valor;
    });
  }

  setMesReferencia(): void {
    if (!this.navParams.get('ano') || !this.navParams.get('mes')) {
      let data_atual = new Date();

      this.mesRef = {
        ano: data_atual.getFullYear(),
        mes: data_atual.getMonth() + 1
      };
    }
    else {
      this.mesRef = {
        ano: this.navParams.get('ano'),
        mes: this.navParams.get('mes')
      };
    }
  }

  itensSelecionados(): boolean {
    return this.despesasSelecionadas.size > 0;
  }

  itemSelecionado(despesa: Despesa): boolean {
    return this.despesasSelecionadas.has(despesa.id);
  }

  selecionarItem(despesa: Despesa): void {
    this.despesasSelecionadas.add(despesa.id);
  }

  removerSelecao(despesa: Despesa): void {
    this.despesasSelecionadas.delete(despesa.id);
  }

  removerItens(): void {
    this.despesaProvider.removerDespesas(this.mesRef, this.despesasSelecionadas)
      .then((despesas: Despesa[]) => {
        this.despesas = despesas;
        this.setTotalDespesas();
        this.despesasSelecionadas.clear();

        const toast = this.toastCtrl.create({
          message: 'Despesa(s) excluída(s) com sucesso.',
          duration: 3000
        });

        toast.present();
      }).catch(() => {
        console.log('Erro ao remover item.');
      });
  }

  getDespesas(): void {
    this.despesaProvider.getDespesas(this.mesRef).then((despesas: Despesa[]) => {
      console.log('Carregando lista de despesas...');

      this.despesas = despesas;
      this.setTotalDespesas();

      console.log('Lista carregada.');
    }).catch(() => {
      console.log('Erro ao carregar lista de despesas.');
    });
  }

  formatarMoeda(valor: number, exibirCifrao: boolean = false): string {
    if (exibirCifrao) {
      return (+valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }
    else {
      return (+valor).toLocaleString('pt-BR', {
        maximumFractionDigits: 2
      });
    }
  }

  novaDespesa(): void {
    this.navCtrl.push('nova-despesa', {
      ano: this.mesRef.ano,
      mes: this.mesRef.mes
    });
  }
}
