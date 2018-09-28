import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ListaDespesasPage} from '../pages/lista-despesas/lista-despesas';
import { ListaMesesReferenciaPage } from '../pages/lista-meses-referencia/lista-meses-referencia';
import { PopoverMenu } from '../pages/lista-meses-referencia/popover-menu';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MesRefProvider } from '../providers/mes-ref/mes-ref';
import { DespesaProvider } from '../providers/despesa/despesa';

@NgModule({
  declarations: [
    MyApp,
    ListaDespesasPage,
    ListaMesesReferenciaPage,
    PopoverMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(/*{
      name: 'despesasdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']      
    }*/)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListaDespesasPage,
    ListaMesesReferenciaPage,
    PopoverMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MesRefProvider,
    DespesaProvider
  ]
})
export class AppModule {}
