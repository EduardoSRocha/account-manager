import {
  // Injectable,
  Module,
} from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Company } from './entities/company.entity';
import { SubAccount } from './entities/subaccount.entity';
import { Address } from './entities/address.entity';
import { Event } from '../events/entities/event.entity';
import { FinancialTransaction } from './entities/financial-transaction.entity';

/**
 * E1.
 *
 * import { IDPB_LIST } from './account.constants';
 */

/**
 *  E2.
 *
 *  class ConfigService {}
 *  class DevelopmentConfigService {}
 *  class ProductionConfigService {}
 */

/**
 * E3.
 *
 * import { IDPB_LIST } from './account.constants';
 * @Injectable()
 * export class ISPBListFactory {
 *     create() {
 *         // ..do something ...
 *         return {
 *             "ispb": "00000000",
 *             "name": "BCO DO BRASIL S.A.",
 *             "code": 1,
 *             "fullName": "Banco do Brasil S.A."
 *         }
 *     }
 * }
 *
 */

// import { IDPB_LIST } from './account.constants';

// interface Bank {
//     ispb: string; // O número ISPB do banco, identificador único no sistema financeiro brasileiro.
//     name: string; // O nome abreviado ou sigla do banco.
//     code: number; // O código do banco, geralmente um número único atribuído pelo Banco Central do Brasil.
//     fullName: string; // O nome completo do banco.
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Company,
      SubAccount,
      Address,
      Event,
      FinancialTransaction,
    ]),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,

    /**
     * // E1. Injeção de dependência de constantes para fornecer valores estáticos.
     * //
     * // Neste exemplo, um valor constante (IDPB_LIST) é fornecido como uma dependência,
     * // representando uma lista de objetos contendo informações sobre bancos.
     * {
     *     provide: IDPB_LIST,
     *     useValue: [{
     *         "ispb": "00000000",
     *         "name": "BCO DO BRASIL S.A.",
     *         "code": 1,
     *         "fullName": "Banco do Brasil S.A."
     *     }]
     * }
     *
     */

    /**
     * // E2. Configuração dinâmica de dependência com base no ambiente de execução.
     * //
     * // ConfigService é fornecido como uma dependência, utilizando useClass para determinar
     * // qual implementação (DevelopmentConfigService ou ProductionConfigService) será usada
     * // dependendo do ambiente de execução (desenvolvimento ou produção).
     * {
     *     provide: ConfigService,
     *     useClass: process.env.NODE_ENV === 'development'
     *         ? DevelopmentConfigService
     *         : ProductionConfigService,
     * }
     */

    /**
     * // E3. Injeção de dependência usando FACTORY.
     * // Aqui, ISPBListFactory é fornecido como uma dependência para criar a lista de ISPBs.
     * // Isso permite maior flexibilidade na criação da lista,
     * // como adição de lógica adicional ou obtenção dinâmica de dados.
     *
     * ISPBListFactory,
     * {
     *    provide: IDPB_LIST,
     *    useFactory: (ispbFactory: ISPBListFactory) =>
     *        ispbFactory.create(),
     *    inject: [ISPBListFactory]
     * }
     *
     */

    /**
         * // E4.
         *  {
         *      provide: IDPB_LIST,
         *      useFactory:  async (): Promise<Bank[]> => {
         *          return new Promise(resolve => {
         *              setTimeout(async () => {
         *                  const ispb_list = await Promise.resolve([{
         *                      "ispb": "00000000",
         *                      "name": "BCO DO BRASIL S.A.",
         *                      "code": 1,
         *                      "fullName": "Banco do Brasil S.A."
         *                  }]);
         *                  resolve(ispb_list);
         *              }, 2000); // Definindo o setTimeout para 2 segundos (2000 milissegundos)
         *          });
         *      },
        },
         */
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
