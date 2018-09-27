import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { MesRef } from '../../app/despesa';

const MES_REF = 'meses-ref';

@Injectable()
export class MesRefProvider {

  constructor(private storage: Storage) {
    console.log('MesRefProvider Provider');
  }

  getMesesReferencia() {
    return this.storage.get(MES_REF);
  }

  adicionarMesRef(mesRef: MesRef) {
    return this.getMesesReferencia().then((mesesRef: MesRef[]) => {
      let registros: MesRef[] = mesesRef? mesesRef : [];

      registros.push(mesRef);

      return this.storage.set(MES_REF, registros);
    });
  }
}
