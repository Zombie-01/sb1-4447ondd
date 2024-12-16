import React from "react";
import { Tabs } from "../../../components/ui/Tabs";
// import { FieldFees } from '../../../components/cargo/FieldFees';
// import { CargoExtension } from '../../../components/cargo/CargoExtension';
// import { CargoIssuance } from '../../../components/cargo/CargoIssuance';
// import { AutoExit } from '../../../components/cargo/AutoExit';
// import { WagonIssuance } from '../../../components/cargo/WagonIssuance';
// import { DebitReport } from '../../../components/cargo/DebitReport';

const tabs = [
  // { id: 'fees', name: 'Field Fees', component: FieldFees },
  // { id: 'extension', name: 'Cargo Extension', component: CargoExtension },
  // { id: 'issuance', name: 'Cargo Issuance', component: CargoIssuance },
  // { id: 'auto-exit', name: 'Auto Exit', component: AutoExit },
  // { id: 'wagon', name: 'Wagon Issuance', component: WagonIssuance },
  // { id: 'debit', name: 'Debit Report', component: DebitReport },
];

export function CashierCargoView() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Cargo Operations</h1>
      <div className="mt-4">
        {/* <Tabs tabs={tabs} /> */}
      </div>
    </div>
  );
}
