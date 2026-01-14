// app/contractors/page.tsx

import ExterminationServiceTable from "./_components/ExterminationServiceTable";

export default function ContractorsPage() {
  return (
    <div className="container mx-auto py-10 ">
      <h1 className="text-xl lg:text-3xl font-bold mb-8">Extermination Services Request</h1>
      <ExterminationServiceTable />
    </div>
  );
}