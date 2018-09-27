import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { MesRefProvider } from '../../providers/mes-ref/mes-ref';
import { Despesa, MesRef } from '../../app/despesa';

@Injectable()
export class DespesaProvider {

  constructor(
    private storage: Storage,
    private mesRefProvider: MesRefProvider
  ) {
    console.log('DespesaProvider Provider');
  }

  getDespesas(mesRef: MesRef) {
    return this.storage.get(`${mesRef.ano}-${mesRef.mes}`)
      .then((registros: Despesa[]) => {
        registros.sort((a, b) => {
          if(a.dia < b.dia) {
            return 1;
          }
          else if(a.dia > b.dia) {
            return -1;
          }
          return 0;
        });

        return registros;
    }).catch(() => { return false; });
  }

  adicionarDespesa(mesRef: MesRef, despesa: Despesa) {
    return this.getDespesas(mesRef).then((despesas: Despesa[]) => {
      let registros = despesas? despesas : [];

      if(!despesas) {
        this.mesRefProvider.adicionarMesRef(mesRef).then((mesesRef: MesRef[]) => {
          console.log(`Mês referência cadastrado: ${mesRef.ano}-${mesRef.mes}`);
        }).catch(() => { 
          console.log('Erro ao registrar mês referência.');
        });
      }

      registros.push(despesa);

      return this.storage.set(`${mesRef.ano}-${mesRef.mes}`, registros);
    });
  }

  removerDespesas(mesRef: MesRef, idDespesas: Set<number>) {
    return this.getDespesas(mesRef).then((despesas: Despesa[]) => {
      let registros = despesas.filter(despesa => {
        return !idDespesas.has(despesa.id);
      });

      return this.storage.set(`${mesRef.ano}-${mesRef.mes}`, registros);
    });    
  }
}
